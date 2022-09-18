import bcrypt from "bcryptjs";
import destroyModelData from "../../utils/destroyModelData";
import app from "./../../src/app";
import User from "../../src/app/models/UserModel";
import { describe, expect, test, it, beforeEach } from "vitest";
import supertest from "supertest";

describe("User", () => {
  const server = supertest(app);
  const data = {
    email: "teste1@gmail.com",
    password: "1234567A",
    passwordConfirmation: "1234567A",
    user_type: "STUDENT",
  };
  beforeEach(async () => {
    await destroyModelData();
  });

  it("should create user", async () => {
    const response = await server.post("/user").send(data);
    const { body } = response;
    expect(body).toHaveProperty("id");
    expect(body.email).toBe(data.email);
  });

  it("should not be able to create an existing user", async () => {
    await server.post("/user").send(data);
    const response = await server.post("/user").send(data);

    expect(response._body).toHaveProperty("error");
  });

  it("should encrypt user password", async () => {
    const response = await server.post("/user").send(data);
    const user = await User.findByPk(response._body.id);
    const hash = await bcrypt.compare("1234567A", user.password_hash);
    expect(hash).toBe(true);
  });
  it("should not able to set a weak password", async () => {
    const newData = {
      ...data,
      password: "12345678",
      passwordConfirmation: "12345678",
    };
    const response = await server.post("/user").send(newData);
    expect(response._body).toHaveProperty("error");
  });
  it("should not able to create a user with invalid user type", async () => {
    const newData = {
      ...data,
      user_type: "invalid",
    };
    const response = await server.post("/user").send(newData);
    expect(response._body).toHaveProperty("error");
  });
  it("should not able to create a user with invalid email", async () => {
    const newData = {
      ...data,
      email: "teste1gmail.com",
    };
    const response = await server.post("/user").send(newData);
    expect(response._body).toHaveProperty("error");
  });
  // it("should not able to create a user with some error", async () => {
  //   const response = await server.post("/user").send(data);
  // });
  it("should  able to delete an user", async () => {
    await server.post("/user").send(data).expect(200);
    const loginRes = await server.post("/user/login").send(data).expect(200);
    const token = loginRes._body.token;
    const res = await server
      .delete("/user")
      .set("Authorization", "bearer " + token)
      .expect(200);

    expect(res._body).toHaveProperty("msg");
  });
  it("should  not able to delete an user that doesnt exist even more", async () => {
    await server.post("/user").send(data).expect(200);
    const loginRes = await server.post("/user/login").send(data).expect(200);
    const token = loginRes._body.token;
    await server
      .delete("/user")
      .set("Authorization", "bearer " + token)
      .send(data);
    const res = await server
      .delete("/user")
      .set("Authorization", "bearer " + token)
      .send(data);

    expect(res.status).toBe(404);
    expect(res._body).toHaveProperty("error");
  });
  it("should  able to get a list of  users", async () => {
    await server.post("/user").send(data).expect(200);
    await server
      .post("/user")
      .send({ ...data, email: "teste3@gmail.com" })
      .expect(200);
    const res = await server.get("/user").expect(200);
    const result = Array.isArray(res._body);
    expect(result).toBe(true);
  });
  it("should  able to get a list of  users with query", async () => {
    await server.post("/user").send(data).expect(200);
    await server
      .post("/user")
      .send({ ...data, email: "teste3@gmail.com" })
      .expect(200);
    const res = await server
      .get("/user")
      .query({
        email: data.email,
        createdBefore: "2999-12-12",
        createdAfter: "1965-01-01",
        updatedAfter: "1965-01-01",
        updatedBefore: "2999-12-12",
        sort: "id,email",
      })
      .expect(200);

    const result = Array.isArray(res._body);
    expect(result).toBe(true);
  });
  it("should  able to get one  user", async () => {
    const res = await server.post("/user").send(data).expect(200);
    const newRoute = `/user/${res._body.id}/show`;
    const resUser = await server.get(newRoute).expect(200);
    expect(resUser._body).toHaveProperty("id");
  });
  it("should  able to  update a  user", async () => {
    await server.post("/user").send(data).expect(200);
    const loginRes = await server.post("/user/login").send(data).expect(200);
    const token = loginRes._body.token;
    const res = await server
      .put("/user")
      .set("Authorization", "bearer " + token)
      .send({ ...data, email: "teste2@gmail.com" });
    expect(res._body.email).toBe("teste2@gmail.com");
  });
  it("should  not able to update a  user with an existing email", async () => {
    await server.post("/user").send(data).expect(200);
    await server
      .post("/user")
      .send({ ...data, email: "teste2@gmail.com" })
      .expect(200);
    const loginRes = await server.post("/user/login").send(data).expect(200);
    const token = loginRes._body.token;
    const res = await server
      .put("/user")
      .set("Authorization", "bearer " + token)
      .send({ ...data, email: "teste2@gmail.com" });

    expect(res._body).toHaveProperty("error");
  });
});
