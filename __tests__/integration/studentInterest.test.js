import destroyModelData from "../../utils/destroyModelData";
import app from "./../../src/app";
import { describe, expect, test, it, beforeEach } from "vitest";
import supertest from "supertest";

describe("Student Interest", () => {
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
    await destroyModelData();
    await server.post("/user").send(data).expect(200);
    const loginRes = await server.post("/user/login").send(data).expect(200);
    token = loginRes._body.token;
    await server
      .post("/student")
      .set("Authorization", "bearer " + token)
      .send(studentData)
      .expect(200);
    await server
      .post("/interest")
      .set("Authorization", "bearer " + token)
      .send(interest);
  });
  it("should create a student intrest with valid data", async () => {
    const res = await server
      .post("/student/interest")
      .set("Authorization", "bearer " + token)
      .send(interest)
      .expect(200);

    expect(res._body).toHaveProperty("mentoringArea");
    expect(res._body.mentoringArea).toBe(interest.mentoringArea);
  });
  it("should not create a student intrest with invalid interest area", async () => {
    const res = await server
      .post("/student/interest")
      .set("Authorization", "bearer " + token)
      .send({ mentoringArea: "null" })
      .expect(400);

    expect(res._body).toHaveProperty("error");
  });
});
