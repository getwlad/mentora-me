import destroyModelData, { setAdminTrue } from "../../utils/destroyModelData";
import app from "./../../src/app";
import { describe, expect, it, beforeEach, beforeAll } from "vitest";
import supertest from "supertest";

describe("Student mentorship", () => {
  const server = supertest(app);
  beforeAll(async () => {
    await setAdminTrue();
  });
  const studentUser = {
    email: "teste1@gmail.com",
    password: "1234567A",
    passwordConfirmation: "1234567A",
    user_type: "STUDENT",
  };
  const mentorUser = {
    email: "teste2@gmail.com",
    password: "1234567A",
    passwordConfirmation: "1234567A",
    user_type: "MENTOR",
  };
  const studentData = {
    name: "Teste",
    cpf: "12345678900",
    phone: "+5562999887766",
  };
  const mentorData = {
    name: "Joao",
    chavePix: "24535112333",
    phone: "+5562889646868",
    publicEmail: "joao@gmail.com",
    cnpj: "12111668910",
    mentoringArea: "PROGRAMAÇÃO",
  };
  const mentorshipData = {
    name: "JavaScript - Melhorando o seu código",
    price: "0.00",
  };
  let tokenStudent;
  let tokenMentor;
  let idMentorship;
  beforeEach(async () => {
    await destroyModelData(["User", "InterestArea"]);

    await server.post("/user").send(studentUser).expect(201);
    await server.post("/user").send(mentorUser).expect(201);
    const loginStudent = await server
      .post("/user/login")
      .send(studentUser)
      .expect(200);
    const loginMentor = await server
      .post("/user/login")
      .send(mentorUser)
      .expect(200);
    tokenStudent = loginStudent._body.token;
    tokenMentor = loginMentor._body.token;
    await server
      .post("/interest")
      .set("Authorization", "bearer " + tokenMentor)
      .send({
        mentoringArea: "PROGRAMAÇÃO",
      })
      .expect(201);
    await server
      .post("/student")
      .set("Authorization", "bearer " + tokenStudent)
      .send(studentData)
      .expect(201);
    await server
      .post("/mentor")
      .set("Authorization", "bearer " + tokenMentor)
      .send(mentorData);
    const resMentorship = await server
      .post("/mentor/mentorship")
      .set("Authorization", "bearer " + tokenMentor)
      .send(mentorshipData)
      .expect(201);
    idMentorship = resMentorship._body.id;
  });
  it("should student buy mentorship", async () => {
    const res = await server
      .post("/student/buymentorship")
      .set("Authorization", "bearer " + tokenStudent)
      .send({
        mentoringId: idMentorship,
      })
      .expect(200);
    expect(res._body).toHaveProperty("id");
  });
  it("should student  not buy mentorship with insufient balance", async () => {
    await server
      .put(`/mentor/mentorship/${idMentorship}`)
      .send({ ...mentorshipData, price: "1.00" })
      .set("Authorization", "bearer " + tokenMentor)
      .expect(200);
    const res = await server
      .post("/student/buymentorship")
      .set("Authorization", "bearer " + tokenStudent)
      .send({
        mentoringId: idMentorship,
      })
      .expect(401);
    expect(res._body).toHaveProperty("error");
  });
  it("should student not buy mentorship that not exists", async () => {
    const res = await server
      .post("/student/buymentorship")
      .set("Authorization", "bearer " + tokenStudent)
      .send({
        mentoringId: "0",
      })
      .expect(404);
    expect(res._body).toHaveProperty("error");
  });
  it("should get student buyed mentorship", async () => {
    await server
      .post("/student/buymentorship")
      .set("Authorization", "bearer " + tokenStudent)
      .send({
        mentoringId: idMentorship,
      })
      .expect(200);
    const res = await server
      .get("/student/mentorship")
      .set("Authorization", "bearer " + tokenStudent)
      .expect(200);
    expect(res._body).toHaveProperty("mentorships");
  });
  it("should not get student buyed mentorship without buyed any mentorships", async () => {
    const res = await server
      .get("/student/mentorship")
      .set("Authorization", "bearer " + tokenStudent)
      .expect(404);
    expect(res._body).toHaveProperty("error");
  });
  it("should not get student buyed mentorship without student not registeres", async () => {
    await server
      .post("/user")
      .send({ ...studentUser, email: "teste3@gmail.com" })
      .expect(201);
    const login = await server
      .post("/user/login")
      .send({ ...studentUser, email: "teste3@gmail.com" })
      .expect(200);
    const res = await server
      .get("/student/mentorship")
      .set("Authorization", "bearer " + login._body.token)
      .expect(404);
    expect(res._body).toHaveProperty("error");
  });
});
