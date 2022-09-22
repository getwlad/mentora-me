import destroyModelData, { setAdminTrue } from "../../utils/destroyModelData";
import app from "./../../src/app";
import { describe, expect, it, beforeEach, beforeAll } from "vitest";
import supertest from "supertest";

describe("Student Interest", () => {
  beforeAll(async () => {
    await setAdminTrue();
  });
  const server = supertest(app);
  const data = {
    email: "teste1@gmail.com",
    password: "1234567A",
    passwordConfirmation: "1234567A",
    user_type: "STUDENT",
  };
  const studentData = {
    name: "Teste",
    cpf: "12345678900",
    phone: "+5562999887766",
  };
  const interest = {
    mentoringArea: "SEGURANÇA DA INFORMACÃO",
  };
  let token;

  beforeEach(async () => {
    await destroyModelData(["User", "InterestArea"]);
    await server.post("/user").send(data).expect(201);
    const loginRes = await server.post("/user/login").send(data).expect(200);
    token = loginRes._body.token;
    await server
      .post("/student")
      .set("Authorization", "bearer " + token)
      .send(studentData)
      .expect(201);
    await server
      .post("/interest")
      .set("Authorization", "bearer " + token)
      .send(interest);
  });
  it("should create a student interest with valid data", async () => {
    const res = await server
      .post("/student/interest")
      .set("Authorization", "bearer " + token)
      .send(interest)
      .expect(201);

    expect(res._body).toHaveProperty("mentoringArea");
    expect(res._body.mentoringArea).toBe(interest.mentoringArea);
  });
  it("should create a student interest without auth", async () => {
    const res = await server
      .post("/student/interest")
      .set("Authorization", "bearer " + "token")
      .send(interest)
      .expect(401);

    expect(res._body).toHaveProperty("error");
  });
  it("should not create a student interest with invalid data", async () => {
    const res = await server
      .post("/student/interest")
      .set("Authorization", "bearer " + token)
      .send({ mentoringArea: null })
      .expect(400);

    expect(res._body).toHaveProperty("error");
  });
  it("should not create a student interest with interest area not registered", async () => {
    const res = await server
      .post("/student/interest")
      .set("Authorization", "bearer " + token)
      .send({ mentoringArea: "teste" })
      .expect(404);

    expect(res._body).toHaveProperty("error");
  });
  it("should not create a student interest with student  not registered", async () => {
    await server
      .post("/user")
      .send({ ...data, email: "teste2@gmail.com" })
      .expect(201);
    const loginRes = await server
      .post("/user/login")
      .send({ ...data, email: "teste2@gmail.com" })
      .expect(200);
    const iToken = loginRes._body.token;
    const res = await server
      .post("/student/interest")
      .set("Authorization", "bearer " + iToken)
      .send(interest)
      .expect(404);

    expect(res._body).toHaveProperty("error");
  });
  it("should not delete a student interest with student  not registered", async () => {
    await server
      .post("/user")
      .send({ ...data, email: "teste2@gmail.com" })
      .expect(201);
    const loginRes = await server
      .post("/user/login")
      .send({ ...data, email: "teste2@gmail.com" })
      .expect(200);
    const iToken = loginRes._body.token;
    const res = await server
      .delete("/student/interest")
      .set("Authorization", "bearer " + iToken)
      .send(interest)
      .expect(404);

    expect(res._body).toHaveProperty("error");
  });
  it("should delete a student interest with valid data", async () => {
    await server
      .post("/student/interest")
      .set("Authorization", "bearer " + token)
      .send(interest)
      .expect(201);
    const res = await server
      .delete("/student/interest")
      .set("Authorization", "bearer " + token)
      .send(interest)
      .expect(200);
    expect(res._body).toHaveProperty("message");
  });
  it("should not delete a student interest without auth", async () => {
    await server
      .post("/student/interest")
      .set("Authorization", "bearer " + token)
      .send(interest)
      .expect(201);
    const res = await server
      .delete("/student/interest")
      .set("Authorization", "bearer " + "token")
      .send(interest)
      .expect(401);
    expect(res._body).toHaveProperty("error");
  });
  it("should not delete a student interest with student  interest not registered", async () => {
    const res = await server
      .delete("/student/interest")
      .set("Authorization", "bearer " + token)
      .send({ mentoringArea: "not exist" })
      .expect(404);

    expect(res._body).toHaveProperty("error");
  });
  it("should show student interest", async () => {
    await server
      .post("/student/interest")
      .set("Authorization", "bearer " + token)
      .send(interest)
      .expect(201);
    const res = await server
      .get("/student/interest")
      .set("Authorization", "bearer " + token)
      .expect(200);
    expect(res._body).toHaveProperty("interests");
  });
  it("should not show student interest without auth", async () => {
    await server
      .post("/student/interest")
      .set("Authorization", "bearer " + token)
      .send(interest)
      .expect(201);
    const res = await server
      .get("/student/interest")
      .set("Authorization", "bearer " + "token")
      .expect(401);
    expect(res._body).toHaveProperty("error");
  });
  it("should get erro when try to show interest not registered", async () => {
    const res = await server
      .get("/student/interest")
      .set("Authorization", "bearer " + token)
      .expect(404);
    expect(res._body).toHaveProperty("error");
  });
  it("should get erro when try to show student not registered", async () => {
    await server
      .post("/user")
      .send({ ...data, email: "teste2@gmail.com" })
      .expect(201);
    const loginRes = await server
      .post("/user/login")
      .send({ ...data, email: "teste2@gmail.com" })
      .expect(200);
    const iToken = loginRes._body.token;
    const res = await server
      .get("/student/interest")
      .set("Authorization", "bearer " + iToken)
      .expect(404);
    expect(res._body).toHaveProperty("error");
  });
});
