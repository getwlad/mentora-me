import destroyModelData from "../../utils/destroyModelData";
import app from "./../../src/app";
import { describe, expect, test, it, beforeEach } from "vitest";
import supertest from "supertest";

describe("Mentor particulars", () => {
  const server = supertest(app);
  const data = {
    email: "teste1@gmail.com",
    password: "1234567A",
    passwordConfirmation: "1234567A",
    user_type: "MENTOR",
  };
  const mentorData = {
    name: "Joao",
    chavePix: "24535112333",
    phone: "+5562889646868",
    publicEmail: "teste@gmail.com",
    cnpj: "12111668910",
    mentoringArea: "SEGURANÇA DA INFORMAÇÃO",
  };
  const particulars = {
    extrovert: "3",
    theory: "2",
    practice: "3",
    mentoringInGroup: "2",
    mentoringIndividual: "2",
    libras: "1",
    minorityGroups: "1",
  };
  let token;

  beforeEach(async () => {
    await destroyModelData();
    await server.post("/user").send(data).expect(200);
    const loginRes = await server.post("/user/login").send(data).expect(200);
    token = loginRes._body.token;
    await server
      .post("/interest")
      .set("Authorization", "bearer " + token)
      .send({
        mentoringArea: "SEGURANÇA DA INFORMAÇÃO",
      })
      .expect(200);
    await server
      .post("/mentor")
      .set("Authorization", "bearer " + token)
      .send(mentorData)
      .expect(200);
  });
  it("should create a mentor particulars with valid data", async () => {
    const res = await server
      .post("/mentor/particulars")
      .set("Authorization", "bearer " + token)
      .send(particulars);

    expect(res._body).toHaveProperty("id");
    expect(res._body.theory).toBe(particulars.theory);
  });
  it("should not create a mentor particulars without auth", async () => {
    const res = await server
      .post("/mentor/particulars")
      .set("Authorization", "bearer " + "token")
      .send(particulars)
      .expect(401);
    expect(res._body).toHaveProperty("error");
  });
  it("should not create a mentor particulars with invalid data", async () => {
    const res = await server
      .post("/mentor/particulars")
      .set("Authorization", "bearer " + token)
      .send({
        extrovert: "5",
        mentoringInGroup: "2",
        mentoringIndividual: "2",
        libras: "1",
        minorityGroups: "1",
      })
      .expect(400);

    expect(res._body).toHaveProperty("error");
  });

  it("should not create a mentor particulars with mentor  not registered", async () => {
    await server
      .post("/user")
      .send({ ...data, email: "teste2@gmail.com" })
      .expect(200);
    const loginRes = await server
      .post("/user/login")
      .send({ ...data, email: "teste2@gmail.com" })
      .expect(200);
    const iToken = loginRes._body.token;
    const res = await server
      .post("/mentor/particulars")
      .set("Authorization", "bearer " + iToken)
      .send(particulars)
      .expect(404);

    expect(res._body).toHaveProperty("error");
  });

  it("should show mentor particulars", async () => {
    await server
      .post("/mentor/particulars")
      .set("Authorization", "bearer " + token)
      .send(particulars)
      .expect(200);
    const res = await server
      .get("/mentor/particulars")
      .set("Authorization", "bearer " + token);
    expect(res._body).toHaveProperty("id");
  });
  it("should  not show mentor particulars without auth", async () => {
    const res = await server
      .post("/mentor/particulars")
      .set("Authorization", "bearer " + "token")
      .send(particulars)
      .expect(401);
    expect(res._body).toHaveProperty("error");
  });
  it("should get erro when try to show particulars not registered", async () => {
    const res = await server
      .get("/mentor/particulars")
      .set("Authorization", "bearer " + token)
      .expect(404);
    expect(res._body).toHaveProperty("error");
  });
  it("should get erro when try to show mentor not registered", async () => {
    await server
      .post("/user")
      .send({ ...data, email: "teste2@gmail.com" })
      .expect(200);
    const loginRes = await server
      .post("/user/login")
      .send({ ...data, email: "teste2@gmail.com" })
      .expect(200);
    const iToken = loginRes._body.token;
    const res = await server
      .get("/mentor/particulars")
      .set("Authorization", "bearer " + iToken)
      .expect(404);
    expect(res._body).toHaveProperty("error");
  });
  it("should update a mentor particulars with valid data", async () => {
    await server
      .post("/mentor/particulars")
      .set("Authorization", "bearer " + token)
      .send(particulars)
      .expect(200);
    const res = await server
      .put("/mentor/particulars")
      .set("Authorization", "bearer " + token)
      .send({ ...particulars, theory: "1" })
      .expect(200);

    expect(res._body).toHaveProperty("id");
    expect(res._body.theory).toBe("1");
  });
  it("should not update a mentor without auth", async () => {
    await server
      .post("/mentor/particulars")
      .set("Authorization", "bearer " + token)
      .send(particulars)
      .expect(200);
    const res = await server
      .put("/mentor/particulars")
      .set("Authorization", "bearer " + "token")
      .send({ ...particulars, theory: "1" })
      .expect(401);

    expect(res._body).toHaveProperty("error");
  });
  it("should not update a mentor particulars with invalid data", async () => {
    await server
      .post("/mentor/particulars")
      .set("Authorization", "bearer " + token)
      .send(particulars)
      .expect(200);
    const res = await server
      .put("/mentor/particulars")
      .set("Authorization", "bearer " + token)
      .send({ ...particulars, theory: "8" })
      .expect(400);
    expect(res._body).toHaveProperty("error");
  });
  it("should not update a mentor particulars with particulars  not registered", async () => {
    const res = await server
      .put("/mentor/particulars")
      .set("Authorization", "bearer " + token)
      .send(particulars)
      .expect(404);

    expect(res._body).toHaveProperty("error");
  });

  it("should not update a mentor particulars with mentor  not registered", async () => {
    await server
      .post("/user")
      .send({ ...data, email: "teste2@gmail.com" })
      .expect(200);
    const loginRes = await server
      .post("/user/login")
      .send({ ...data, email: "teste2@gmail.com" })
      .expect(200);
    const iToken = loginRes._body.token;

    const res = await server
      .put("/mentor/particulars")
      .set("Authorization", "bearer " + iToken)
      .send(particulars)
      .expect(404);

    expect(res._body).toHaveProperty("error");
  });
});
