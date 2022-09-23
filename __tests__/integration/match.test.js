import destroyModelData, { setAdminTrue } from "../../utils/destroyModelData";
import app from "./../../src/app";
import { describe, expect, it, beforeEach, beforeAll } from "vitest";
import supertest from "supertest";
import Mentor from "../../src/app/models/MentorModel";
import Particulars from "../../src/app/models/ParticularsModel";

describe("Student match", () => {
  beforeAll(async () => {
    await setAdminTrue();
  });
  const server = supertest(app);
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
  const mentorUser2 = {
    email: "teste3@gmail.com",
    password: "1234567A",
    passwordConfirmation: "1234567A",
    user_type: "MENTOR",
  };
  const mentorUser3 = {
    email: "teste4@gmail.com",
    password: "1234567A",
    passwordConfirmation: "1234567A",
    user_type: "MENTOR",
  };
  const studentData = {
    name: "Teste",
    cpf: "12345678900",
    phone: "+5562999887766",
  };
  const mentorshipData = {
    name: "JavaScript - Melhorando o seu código",
    price: "0.00",
  };
  const particulars = {
    theory: "2",
    practice: "2",
    mentoringInGroup: "2",
    mentoringIndividual: "2",
    libras: "2",
    minorityGroups: "2",
  };
  const particulars2 = {
    theory: "1",
    practice: "1",
    mentoringInGroup: "1",
    mentoringIndividual: "1",
    libras: "1",
    minorityGroups: "1",
  };
  const particulars3 = {
    theory: "3",
    practice: "3",
    mentoringInGroup: "3",
    mentoringIndividual: "3",
    libras: "3",
    minorityGroups: "3",
  };
  const interest = {
    mentoringArea: "SEGURANÇA DA INFORMACÃO",
  };
  const mentorData = {
    name: "Joao",
    chavePix: "24535112333",
    phone: "+5562889646868",
    publicEmail: "joao@gmail.com",
    cnpj: "12111668910",
    mentoringArea: interest.mentoringArea,
  };
  const mentorData2 = {
    name: "Carlos",
    chavePix: "24535114333",
    phone: "+5562879646868",
    publicEmail: "carlos@gmail.com",
    cnpj: "12115668910",
    mentoringArea: interest.mentoringArea,
  };
  const mentorData3 = {
    name: "Maria",
    chavePix: "24535112533",
    phone: "+5562889696868",
    publicEmail: "maria@gmail.com",
    cnpj: "12111668918",
    mentoringArea: interest.mentoringArea,
  };
  let tokenStudent;
  let tokenMentor;
  let tokenMentor2;
  let tokenMentor3;
  beforeEach(async () => {
    await destroyModelData([
      "Particulars",
      "Mentor",
      "Student",
      "InterestArea",
      "User",
    ]);
    //criando usuário estudante
    await server.post("/user").send(studentUser).expect(201);
    //criando usuário mentor
    await server.post("/user").send(mentorUser).expect(201);
    await server.post("/user").send(mentorUser2).expect(201);
    await server.post("/user").send(mentorUser3).expect(201);

    //login estudante
    const loginStudent = await server
      .post("/user/login")
      .send(studentUser)
      .expect(200);
    //login mentor
    const loginMentor = await server
      .post("/user/login")
      .send(mentorUser)
      .expect(200);
    const loginMentor2 = await server
      .post("/user/login")
      .send(mentorUser2)
      .expect(200);
    const loginMentor3 = await server
      .post("/user/login")
      .send(mentorUser3)
      .expect(200);
    //pegando tokens

    tokenStudent = loginStudent._body.token;
    tokenMentor = loginMentor._body.token;
    tokenMentor2 = loginMentor2._body.token;
    tokenMentor3 = loginMentor3._body.token;
    //Criando area de interesse
    await server
      .post("/interest")
      .set("Authorization", "bearer " + tokenMentor)
      .send(interest)
      .expect(201);
    //criando perfil estudante
    await server
      .post("/student")
      .set("Authorization", "bearer " + tokenStudent)
      .send(studentData)
      .expect(201);
    //criando perfil mentor
    await server
      .post("/mentor")
      .set("Authorization", "bearer " + tokenMentor)
      .send(mentorData);
    await server
      .post("/mentor")
      .set("Authorization", "bearer " + tokenMentor2)
      .send(mentorData2);
    await server
      .post("/mentor")
      .set("Authorization", "bearer " + tokenMentor3)
      .send(mentorData3);

    //criando mentoria
    await server
      .post("/mentor/mentorship")
      .set("Authorization", "bearer " + tokenMentor)
      .send(mentorshipData)
      .expect(201);

    //adicionado particularidades mentor
    await server
      .post("/mentor/particulars")
      .set("Authorization", "bearer " + tokenMentor)
      .send(particulars)
      .expect(201);
    await server
      .post("/mentor/particulars")
      .set("Authorization", "bearer " + tokenMentor2)
      .send(particulars2)
      .expect(201);
    await server
      .post("/mentor/particulars")
      .set("Authorization", "bearer " + tokenMentor3)
      .send(particulars3)
      .expect(201);
  });
  it("should student match", async () => {
    //adicionando particularidades estudante
    await server
      .post("/student/particulars")
      .set("Authorization", "bearer " + tokenStudent)
      .send(particulars)
      .expect(201);
    //adicionando interesse estudante
    await server
      .post("/student/interest")
      .set("Authorization", "bearer " + tokenStudent)
      .send(interest)
      .expect(201);
    //match
    await server
      .get("/student/match")
      .set("Authorization", "bearer " + tokenStudent)
      .expect(200);
  });
  it("should student not match without auth", async () => {
    const res = await server
      .get("/student/match")
      .set("Authorization", "bearer " + "tokenStudent")
      .expect(401);
    expect(res._body).toHaveProperty("error");
  });
  it("should student not match without registered interest", async () => {
    //adicionando particularidades estudante
    await server
      .post("/student/particulars")
      .set("Authorization", "bearer " + tokenStudent)
      .send(particulars)
      .expect(201);
    const res = await server
      .get("/student/match")
      .set("Authorization", "bearer " + tokenStudent)
      .expect(400);
    expect(res._body).toHaveProperty("error");
  });
  it("should student not match without registered particulars", async () => {
    //adicionando interesse estudante
    await server
      .post("/student/interest")
      .set("Authorization", "bearer " + tokenStudent)
      .send(interest)
      .expect(201);
    const res = await server
      .get("/student/match")
      .set("Authorization", "bearer " + tokenStudent)
      .expect(400);
    expect(res._body).toHaveProperty("error");
  });
  it("should student not have any match", async () => {
    await Particulars.destroy({ where: {} });
    await Mentor.destroy({ where: {} });
    //adicionando interesse estudante
    await server
      .post("/student/interest")
      .set("Authorization", "bearer " + tokenStudent)
      .send(interest)
      .expect(201);
    //adicionando particularidades estudante
    await server
      .post("/student/particulars")
      .set("Authorization", "bearer " + tokenStudent)
      .send(particulars)
      .expect(201);
    const res = await server
      .get("/student/match")
      .set("Authorization", "bearer " + tokenStudent)
      .expect(200);
    expect(res._body).toHaveProperty("message");
  });
});
