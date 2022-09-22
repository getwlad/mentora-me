import destroyModelData, { setAdminTrue } from "../../utils/destroyModelData";
import app from "./../../src/app";
import { describe, expect, it, beforeEach, beforeAll } from "vitest";
import supertest from "supertest";

describe("Mentor mentorship", () => {
  beforeAll(async () => {
    await setAdminTrue();
  });
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
  const mentorship = {
    name: "JavaScript - Melhorando o seu código",
    price: "0.00",
  };
  let token;
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
    await server
      .post("/mentor")
      .set("Authorization", "bearer " + token)
      .send(mentorData)
      .expect(201);
  });
  it("should create a mentorship with valid data", async () => {
    const res = await server
      .post("/mentor/mentorship")
      .set("Authorization", "bearer " + token)
      .send(mentorship)
      .expect(201);
    expect(res._body).toHaveProperty("id");
  });
  it("should not create a mentorship with invalid data", async () => {
    const res = await server
      .post("/mentor/mentorship")
      .set("Authorization", "bearer " + token)
      .send({ ...mentorship, price: "teste" })
      .expect(400);
    expect(res._body).toHaveProperty("error");
  });
  it("should not create a mentorship without auth", async () => {
    const res = await server
      .post("/mentor/mentorship")
      .set("Authorization", "bearer " + "token")
      .send(mentorship)
      .expect(401);
    expect(res._body).toHaveProperty("error");
  });
  it("should not create a mentorship with  mentor unregistered", async () => {
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
      .post("/mentor/mentorship")
      .set("Authorization", "bearer " + iToken)
      .send(mentorship)
      .expect(404);
    expect(res._body).toHaveProperty("error");
  });
  it("should delete a mentorship", async () => {
    const mentorshipRes = await server
      .post("/mentor/mentorship")
      .set("Authorization", "bearer " + token)
      .send(mentorship)
      .expect(201);
    const mentorshipId = mentorshipRes._body.id;
    const res = await server
      .delete(`/mentor/mentorship/${mentorshipId}`)
      .set("Authorization", "bearer " + token)
      .expect(200);
    expect(res._body).toHaveProperty("message");
  });
  it("should not delete a mentorship without auth", async () => {
    const mentorshipRes = await server
      .post("/mentor/mentorship")
      .set("Authorization", "bearer " + token)
      .send(mentorship)
      .expect(201);
    const mentorshipId = mentorshipRes._body.id;
    const res = await server
      .delete(`/mentor/mentorship/${mentorshipId}`)
      .set("Authorization", "bearer " + "token")
      .expect(401);
    expect(res._body).toHaveProperty("error");
  });
  it("should not delete a mentorship that not exist", async () => {
    const res = await server
      .delete("/mentor/mentorship/0")
      .set("Authorization", "bearer " + token)
      .expect(404);
    expect(res._body).toHaveProperty("error");
  });
  it("should not delete a mentorship of a mentor that not exist", async () => {
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
      .delete("/mentor/mentorship/0")
      .set("Authorization", "bearer " + iToken)
      .expect(404);
    expect(res._body).toHaveProperty("error");
  });
  it("should list mentorships of a mentor", async () => {
    await server
      .get("/mentor/mentorship")
      .set("Authorization", "bearer " + token)
      .expect(200);
  });
  it("should not list mentorships of a mentor that not exists", async () => {
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
      .get("/mentor/mentorship")
      .set("Authorization", "bearer " + iToken)
      .expect(404);
    expect(res._body).toHaveProperty("error");
  });
  it("should not list mentorships of a mentor without auth", async () => {
    const res = await server
      .get("/mentor/mentorship")
      .set("Authorization", "bearer " + "token")
      .expect(401);
    expect(res._body).toHaveProperty("error");
  });
  it("should show a mentorship", async () => {
    const mentorshipRes = await server
      .post("/mentor/mentorship")
      .set("Authorization", "bearer " + token)
      .send(mentorship)
      .expect(201);
    const mentorshipId = mentorshipRes._body.id;
    const res = await server
      .get(`/mentor/mentorship/${mentorshipId}`)
      .set("Authorization", "bearer " + token)
      .expect(200);
    expect(res._body).toHaveProperty("id");
  });
  it("should not show a mentorship that not exists", async () => {
    const res = await server
      .get(`/mentor/mentorship/0`)
      .set("Authorization", "bearer " + token)
      .expect(404);
    expect(res._body).toHaveProperty("error");
  });
  it("should not show a mentorship without auth", async () => {
    const res = await server
      .get(`/mentor/mentorship/0`)
      .set("Authorization", "bearer " + "token")
      .expect(401);
    expect(res._body).toHaveProperty("error");
  });
  it("should not show a mentorship of a mentor that not exists", async () => {
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
      .get(`/mentor/mentorship/00`)
      .set("Authorization", "bearer " + iToken)
      .expect(404);
    expect(res._body).toHaveProperty("error");
  });
  it("should update a mentorship", async () => {
    const mentorshipRes = await server
      .post("/mentor/mentorship")
      .set("Authorization", "bearer " + token)
      .send(mentorship)
      .expect(201);
    const mentorshipId = mentorshipRes._body.id;
    const res = await server
      .put(`/mentor/mentorship/${mentorshipId}`)
      .set("Authorization", "bearer " + token)
      .send({ ...mentorship, price: "99.00" })
      .expect(200);
    expect(res._body).toHaveProperty("id");
  });
  it("should not update a mentorship that not exists", async () => {
    const res = await server
      .put(`/mentor/mentorship/0`)
      .set("Authorization", "bearer " + token)
      .send({ ...mentorship, price: "99.00" })
      .expect(404);
    expect(res._body).toHaveProperty("error");
  });
  it("should not update a mentorship with invalid data", async () => {
    const mentorshipRes = await server
      .post("/mentor/mentorship")
      .set("Authorization", "bearer " + token)
      .send(mentorship)
      .expect(201);
    const mentorshipId = mentorshipRes._body.id;
    const res = await server
      .put(`/mentor/mentorship/${mentorshipId}`)
      .set("Authorization", "bearer " + token)
      .send({ ...mentorship, price: "null" })
      .expect(400);

    expect(res._body).toHaveProperty("error");
  });
  it("should not update a mentorship without auth", async () => {
    const mentorshipRes = await server
      .post("/mentor/mentorship")
      .set("Authorization", "bearer " + token)
      .send(mentorship)
      .expect(201);
    const mentorshipId = mentorshipRes._body.id;
    const res = await server
      .put(`/mentor/mentorship/${mentorshipId}`)
      .set("Authorization", "bearer " + "token")
      .send({ ...mentorship, price: "99.00" })
      .expect(401);
    expect(res._body).toHaveProperty("error");
  });
  it("should not update a mentorship with an unregistered mentor", async () => {
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
      .put(`/mentor/mentorship/0`)
      .set("Authorization", "bearer " + iToken)
      .send({ ...mentorship, price: "99.00" })
      .expect(404);
    expect(res._body).toHaveProperty("error");
  });
});
