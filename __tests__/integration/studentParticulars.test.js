import destroyModelData, { setAdminTrue } from "../../utils/destroyModelData";
import app from "./../../src/app";
import { describe, expect, it, beforeEach, beforeAll } from "vitest";
import supertest from "supertest";

describe("Student particulars", () => {
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
  const particulars = {
    theory: "2",
    practice: "3",
    mentoringInGroup: "2",
    mentoringIndividual: "2",
    libras: "1",
    minorityGroups: "1",
  };
  let token;

  beforeEach(async () => {
    await destroyModelData(["Particulars", "User"]);
    await server.post("/user").send(data).expect(201);
    const loginRes = await server.post("/user/login").send(data).expect(200);
    token = loginRes._body.token;
    await server
      .post("/student")
      .set("Authorization", "bearer " + token)
      .send(studentData)
      .expect(201);
  });
  it("should create a student particulars with valid data", async () => {
    const res = await server
      .post("/student/particulars")
      .set("Authorization", "bearer " + token)
      .send(particulars)
      .expect(201);

    expect(res._body).toHaveProperty("id");
    expect(res._body.theory).toBe(particulars.theory);
  });
  it("should not create a student particulars without auth", async () => {
    const res = await server
      .post("/student/particulars")
      .set("Authorization", "bearer " + "token")
      .send(particulars)
      .expect(401);

    expect(res._body).toHaveProperty("error");
  });
  it("should not create a student particulars with invalid data", async () => {
    const res = await server
      .post("/student/particulars")
      .set("Authorization", "bearer " + token)
      .send({
        mentoringInGroup: "5",
        mentoringIndividual: "2",
        libras: "1",
        minorityGroups: "1",
      })
      .expect(400);

    expect(res._body).toHaveProperty("error");
  });

  it("should not create a student particulars with student  not registered", async () => {
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
      .post("/student/particulars")
      .set("Authorization", "bearer " + iToken)
      .send(particulars)
      .expect(404);

    expect(res._body).toHaveProperty("error");
  });

  it("should show student particulars", async () => {
    await server
      .post("/student/particulars")
      .set("Authorization", "bearer " + token)
      .send(particulars)
      .expect(201);
    const res = await server
      .get("/student/particulars")
      .set("Authorization", "bearer " + token)
      .expect(200);

    expect(res._body).toHaveProperty("id");
  });
  it("should not show student particulars without auth", async () => {
    await server
      .post("/student/particulars")
      .set("Authorization", "bearer " + token)
      .send(particulars)
      .expect(201);
    const res = await server
      .get("/student/particulars")
      .set("Authorization", "bearer " + "token")
      .expect(401);

    expect(res._body).toHaveProperty("error");
  });
  it("should get erro when try to show particulars not registered", async () => {
    const res = await server
      .get("/student/particulars")
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
      .get("/student/particulars")
      .set("Authorization", "bearer " + iToken)
      .expect(404);
    expect(res._body).toHaveProperty("error");
  });
  it("should update a student particulars with valid data", async () => {
    await server
      .post("/student/particulars")
      .set("Authorization", "bearer " + token)
      .send(particulars)
      .expect(201);
    const res = await server
      .put("/student/particulars")
      .set("Authorization", "bearer " + token)
      .send({ ...particulars, theory: "1" })
      .expect(200);

    expect(res._body).toHaveProperty("id");
    expect(res._body.theory).toBe("1");
  });
  it("should not update a student particulars without auth", async () => {
    await server
      .post("/student/particulars")
      .set("Authorization", "bearer " + token)
      .send(particulars)
      .expect(201);
    const res = await server
      .put("/student/particulars")
      .set("Authorization", "bearer " + "token")
      .send({ ...particulars, theory: "1" })
      .expect(401);

    expect(res._body).toHaveProperty("error");
  });
  it("should not update a student particulars with invalid data", async () => {
    await server
      .post("/student/particulars")
      .set("Authorization", "bearer " + token)
      .send(particulars)
      .expect(201);
    const res = await server
      .put("/student/particulars")
      .set("Authorization", "bearer " + token)
      .send({ ...particulars, theory: "8" })
      .expect(400);
    expect(res._body).toHaveProperty("error");
  });
  it("should not update a student particulars with particulars  not registered", async () => {
    const res = await server
      .put("/student/particulars")
      .set("Authorization", "bearer " + token)
      .send(particulars)
      .expect(404);

    expect(res._body).toHaveProperty("error");
  });

  it("should not update a student particulars with student  not registered", async () => {
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
      .put("/student/particulars")
      .set("Authorization", "bearer " + iToken)
      .send(particulars)
      .expect(404);

    expect(res._body).toHaveProperty("error");
  });
});
