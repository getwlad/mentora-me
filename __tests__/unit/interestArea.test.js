import destroyModelData from "../../utils/destroyModelData";
import app from "./../../src/app";
import { describe, expect, it, beforeEach, beforeAll } from "vitest";
import supertest from "supertest";
import { setAdminTrue, setAdminFalse } from "../../utils/destroyModelData";

describe("Interest", () => {
  const server = supertest(app);
  const data = {
    email: "teste1@gmail.com",
    password: "1234567A",
    passwordConfirmation: "1234567A",
    user_type: "STUDENT",
  };
  let token;
  beforeAll(async () => {
    await setAdminTrue();
  });
  beforeEach(async () => {
    await destroyModelData(["User", "InterestArea"]);
    await server.post("/user").send(data).expect(201);
    const loginRes = await server.post("/user/login").send(data).expect(200);
    token = loginRes._body.token;
  });
  it("should create an interest area", async () => {
    const res = await server
      .post("/interest")
      .set("Authorization", "bearer " + token)
      .send({
        mentoringArea: "Teste",
      })
      .expect(201);
    expect(res._body).toHaveProperty("id");
    expect(res._body.mentoringArea).toBe(data.mentoringArea);
  });

  it("should not create an interest area that already exists", async () => {
    await server
      .post("/interest")
      .set("Authorization", "bearer " + token)
      .send({
        mentoringArea: "Teste",
      })
      .expect(201);
    const res = await server
      .post("/interest")
      .set("Authorization", "bearer " + token)
      .send({
        mentoringArea: "Teste",
      })
      .expect(400);
    expect(res._body).toHaveProperty("error");
  });
  it("should get a list of interest area", async () => {
    const res = await server.get("/interest").expect(200);
    const result = Array.isArray(res._body);
    expect(result).toBe(true);
  });
  it("should delete an interest area", async () => {
    const resInterest = await server
      .post("/interest")
      .set("Authorization", "bearer " + token)
      .send({
        mentoringArea: "Teste",
      })
      .expect(201);
    const newRoute = `/interest/${resInterest._body.id}`;
    const res = await server
      .delete(newRoute)
      .set("Authorization", "bearer " + token)
      .expect(200);
    expect(res._body).toHaveProperty("sucess");
  });

  it("should get error when an interest area not found to delete", async () => {
    const resInterest = await server
      .post("/interest")
      .set("Authorization", "bearer " + token)
      .send({
        mentoringArea: "Teste",
      })
      .expect(201);
    const newRoute = `/interest/123`;
    const res = await server
      .delete(newRoute)
      .set("Authorization", "bearer " + token)
      .expect(400);
    expect(res._body).toHaveProperty("error");
  });
  it("should get error tryng to create interest area without permission", async () => {
    await setAdminFalse();
    await server
      .post("/user")
      .send({ ...data, email: "testit@gmail.com" })
      .expect(201);
    const loginRes = await server
      .post("/user/login")
      .send({ ...data, email: "testit@gmail.com" })
      .expect(200);
    const iToken = loginRes._body.token;
    const res = await server
      .post("/interest")
      .set("Authorization", "bearer " + iToken)
      .send({
        mentoringArea: "Teste",
      })
      .expect(403);
    await setAdminTrue();
    expect(res._body).toHaveProperty("error");
  });
  it("should get error tryng to delete interest area without permission", async () => {
    const resInterest = await server
      .post("/interest")
      .set("Authorization", "bearer " + token)
      .send({
        mentoringArea: "Teste",
      })
      .expect(201);
    await setAdminFalse();
    const newRoute = `/interest/${resInterest._body.id}`;
    await server
      .post("/user")
      .send({ ...data, email: "testit@gmail.com" })
      .expect(201);
    const loginRes = await server
      .post("/user/login")
      .send({ ...data, email: "testit@gmail.com" })
      .expect(200);
    const iToken = loginRes._body.token;
    const res = await server
      .delete(newRoute)
      .set("Authorization", "bearer " + iToken)
      .expect(403);
    await setAdminTrue();
    expect(res._body).toHaveProperty("error");
  });
});
