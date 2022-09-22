import destroyModelData from "../../utils/destroyModelData";
import app from "./../../src/app";
import { describe, expect, it, beforeEach, beforeAll } from "vitest";
import supertest from "supertest";
import { setAdminTrue } from "../../utils/destroyModelData";

describe("mentor", () => {
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
  let token;
  beforeAll(async () => {
    await setAdminTrue();
  });
  beforeEach(async () => {
    await destroyModelData(["User", "InterestArea"]);
    await server.post("/user").send(data).expect(201);
    const loginRes = await server.post("/user/login").send(data).expect(200);
    token = loginRes._body.token;
    await server
      .post("/interest")
      .set("Authorization", "bearer " + token)
      .send({
        mentoringArea: "SEGURANÇA DA INFORMAÇÃO",
      })
      .expect(201);
  });
  it("should create a mentor with valid data", async () => {
    const res = await server
      .post("/mentor")
      .set("Authorization", "bearer " + token)
      .send(mentorData)
      .expect(201);
    expect(res._body).toHaveProperty("id");
    expect(res._body.name).toBe(mentorData.name);
  });
  it("should not create a mentor more than once", async () => {
    await server
      .post("/mentor")
      .set("Authorization", "bearer " + token)
      .send(mentorData)
      .expect(201);
    const res = await server
      .post("/mentor")
      .set("Authorization", "bearer " + token)
      .send({ ...mentorData, cnpj: "12345678988" })
      .expect(400);
    expect(res._body).toHaveProperty("error");
  });
  it("should not create a mentor with invalid mentoring area ", async () => {
    const res = await server
      .post("/mentor")
      .set("Authorization", "bearer " + token)
      .send({ ...mentorData, mentoringArea: "not exist" })
      .expect(404);
    expect(res._body).toHaveProperty("error");
  });
  it("should  not create a mentor with cnpj  already registered", async () => {
    await server
      .post("/mentor")
      .set("Authorization", "bearer " + token)
      .send(mentorData)
      .expect(201);
    const res = await server
      .post("/mentor")
      .set("Authorization", "bearer " + token)
      .send(mentorData)
      .expect(400);
    expect(res._body).toHaveProperty("error");
  });

  it("should not create a mentor with a deleted user", async () => {
    await server
      .delete("/user")
      .set("Authorization", "bearer " + token)
      .expect(200);
    const res = await server
      .post("/mentor")
      .set("Authorization", "bearer " + token)
      .send(mentorData)
      .expect(404);
    expect(res._body).toHaveProperty("error");
  });
  it("should not create a mentor with a different user type", async () => {
    const newData = {
      email: "teste2@gmail.com",
      password: "1234567A",
      passwordConfirmation: "1234567A",
      user_type: "STUDENT",
    };
    await server.post("/user").send(newData).expect(201);
    const loginRes = await server.post("/user/login").send(newData).expect(200);
    const itoken = loginRes._body.token;
    const res = await server
      .post("/mentor")
      .set("Authorization", "bearer " + itoken)
      .send(mentorData)
      .expect(400);
    expect(res._body).toHaveProperty("error");
  });

  it("should not create a mentor  without auth", async () => {
    const res = await server.post("/mentor").send(mentorData).expect(401);
    expect(res._body).toHaveProperty("error");
  });
  it("should not create a mentor with invalid cnpj", async () => {
    const res = await server
      .post("/mentor")
      .set("Authorization", "bearer " + token)
      .send({ ...mentorData, cnpj: "12345678" })
      .expect(400);
    expect(res._body).toHaveProperty("error");
  });
  it("should not create a mentor with invalid name", async () => {
    const res = await server
      .post("/mentor")
      .set("Authorization", "bearer " + token)
      .send({ ...mentorData, name: null })
      .expect(400);
    expect(res._body).toHaveProperty("error");
  });
  it("should not create a mentor with invalid phone", async () => {
    const res = await server
      .post("/mentor")
      .set("Authorization", "bearer " + token)
      .send({ ...mentorData, phone: null })
      .expect(400);
    expect(res._body).toHaveProperty("error");
  });
  it("should get  a  list of mentors", async () => {
    const res = await server.get("/mentor").expect(200);
    const result = Array.isArray(res._body);
    expect(result).toBe(true);
  });
  it("should  able to get a list of  mentors with query", async () => {
    await server
      .post("/mentor")
      .set("Authorization", "bearer " + token)
      .send(mentorData)
      .expect(201);
    const res = await server.get("/mentor").query({
      name: mentorData.name,
      cnpj: mentorData.cnpj,
      phone: mentorData.phone,
      chavePix: mentorData.chavePix,
      publicEmail: mentorData.publicEmail,
      createdBefore: "2999-12-12",
      createdAfter: "1965-01-01",
      updatedAfter: "1965-01-01",
      updatedBefore: "2999-12-12",
      sort: "id,name",
    });
    const result = Array.isArray(res._body);
    expect(result).toBe(true);
  });
  it("should show one mentor ", async () => {
    const res = await server
      .post("/mentor")
      .set("Authorization", "bearer " + token)
      .send(mentorData)
      .expect(201);
    const id = res._body.id;
    const resUser = await server
      .get(`/mentor/${id}/show`)
      .set("Authorization", "bearer " + token)
      .expect(200);
    expect(resUser._body).toHaveProperty("id");
  });
  it("should  get error when show a mentor that not exist ", async () => {
    const resUser = await server
      .get("/mentor/0/show")
      .set("Authorization", "bearer " + token)
      .expect(404);
    expect(resUser._body).toHaveProperty("error");
  });
  it("should update a mentor details", async () => {
    await server
      .post("/mentor")
      .set("Authorization", "bearer " + token)
      .send(mentorData)
      .expect(201);
    const res = await server
      .put("/mentor")
      .set("Authorization", "bearer " + token)
      .send({ ...mentorData, name: "Teste 2" })
      .expect(200);
    expect(res._body).toHaveProperty("id");
    expect(res._body.name).toBe("Teste 2");
  });
  it("should not update with cnpj already registered", async () => {
    const existData = {
      email: "teste2@gmail.com",
      password: "1234567A",
      passwordConfirmation: "1234567A",
      user_type: "MENTOR",
    };
    const existmentor = {
      name: "Joao",
      chavePix: "24535112333",
      phone: "+5562889646868",
      publicEmail: "test1@gmail.com",
      cnpj: "12111668911",
      mentoringArea: "SEGURANÇA DA INFORMAÇÃO",
    };
    await server.post("/user").send(existData).expect(201);
    const loginRes = await server
      .post("/user/login")
      .send(existData)
      .expect(200);
    const iToken = loginRes._body.token;
    await server
      .post("/mentor")
      .set("Authorization", "bearer " + iToken)
      .send(existmentor)
      .expect(201);
    const reqe = await server
      .post("/mentor")
      .set("Authorization", "bearer " + token)
      .send(mentorData)
      .expect(201);

    const res = await server
      .put("/mentor")
      .set("Authorization", "bearer " + token)
      .send({ ...mentorData, cnpj: existmentor.cnpj })
      .expect(400);
    expect(res._body).toHaveProperty("error");
  });
  it("should not update a  mentor that not exist ", async () => {
    const res = await server
      .put("/mentor")
      .set("Authorization", "bearer " + token)
      .send({ ...mentorData, name: "Teste 2" })
      .expect(404);
    expect(res._body).toHaveProperty("error");
  });
  it("should not update a mentor  without auth", async () => {
    const res = await server.put("/mentor").send(mentorData).expect(401);
    expect(res._body).toHaveProperty("error");
  });
  it("should delete a mentor", async () => {
    await server
      .post("/mentor")
      .set("Authorization", "bearer " + token)
      .send(mentorData)
      .expect(201);

    const res = await server
      .delete("/mentor")
      .set("Authorization", "bearer " + token)
      .expect(200);
    expect(res._body).toHaveProperty("msg");
  });
  it("should get error trying to delete a mentor that not exist", async () => {
    await server
      .post("/mentor")
      .set("Authorization", "bearer " + token)
      .send(mentorData)
      .expect(201);
    await server
      .delete("/mentor")
      .set("Authorization", "bearer " + token)
      .expect(200);
    const res = await server
      .delete("/mentor")
      .set("Authorization", "bearer " + token)
      .expect(404);
    expect(res._body).toHaveProperty("error");
  });
  it("should not delete a mentor  without auth", async () => {
    const res = await server.delete("/mentor").send(mentorData).expect(401);
    expect(res._body).toHaveProperty("error");
  });
});
