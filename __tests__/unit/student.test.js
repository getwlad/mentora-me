import destroyModelData, { setAdminTrue } from "../../utils/destroyModelData";
import app from "./../../src/app";
import { describe, expect, it, beforeEach, beforeAll } from "vitest";
import supertest from "supertest";

describe("Student", () => {
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
  let token;
  beforeAll(async () => {
    await setAdminTrue();
  });
  beforeEach(async () => {
    await destroyModelData(["User"]);
    await server.post("/user").send(data).expect(201);
    const loginRes = await server.post("/user/login").send(data).expect(200);
    token = loginRes._body.token;
  });
  it("should create a student with valid data", async () => {
    const res = await server
      .post("/student")
      .set("Authorization", "bearer " + token)
      .send(studentData)
      .expect(201);
    expect(res._body).toHaveProperty("id");
    expect(res._body.name).toBe(studentData.name);
  });
  it("should not create a student more than once", async () => {
    await server
      .post("/student")
      .set("Authorization", "bearer " + token)
      .send(studentData)
      .expect(201);
    const res = await server
      .post("/student")
      .set("Authorization", "bearer " + token)
      .send({ ...studentData, cpf: "12345678988" })
      .expect(400);
    expect(res._body).toHaveProperty("error");
  });

  it("should  not create a student with cpf  already registered", async () => {
    await server
      .post("/student")
      .set("Authorization", "bearer " + token)
      .send(studentData)
      .expect(201);
    const res = await server
      .post("/student")
      .set("Authorization", "bearer " + token)
      .send(studentData)
      .expect(400);
    expect(res._body).toHaveProperty("error");
  });

  it("should not create a student with a deleted user", async () => {
    await server
      .delete("/user")
      .set("Authorization", "bearer " + token)
      .expect(200);
    const res = await server
      .post("/student")
      .set("Authorization", "bearer " + token)
      .send(studentData)
      .expect(404);
    expect(res._body).toHaveProperty("error");
  });
  it("should not create a student with a different user type", async () => {
    const newData = {
      email: "teste2@gmail.com",
      password: "1234567A",
      passwordConfirmation: "1234567A",
      user_type: "MENTOR",
    };
    await server.post("/user").send(newData).expect(201);
    const loginRes = await server.post("/user/login").send(newData).expect(200);
    const itoken = loginRes._body.token;
    const res = await server
      .post("/student")
      .set("Authorization", "bearer " + itoken)
      .send(studentData)
      .expect(401);

    expect(res._body).toHaveProperty("error");
  });

  it("should not create a student  without auth", async () => {
    const res = await server.post("/student").send(studentData).expect(401);
    expect(res._body).toHaveProperty("error");
  });
  it("should not create a student with invalid cpf", async () => {
    const res = await server
      .post("/student")
      .set("Authorization", "bearer " + token)
      .send({ ...studentData, cpf: "12345678" })
      .expect(400);
    expect(res._body).toHaveProperty("error");
  });
  it("should not create a student with invalid name", async () => {
    const res = await server
      .post("/student")
      .set("Authorization", "bearer " + token)
      .send({ ...studentData, name: null })
      .expect(400);
    expect(res._body).toHaveProperty("error");
  });
  it("should not create a student with invalid phone", async () => {
    const res = await server
      .post("/student")
      .set("Authorization", "bearer " + token)
      .send({ ...studentData, phone: null })
      .expect(400);
    expect(res._body).toHaveProperty("error");
  });
  it("should get  a  list of students", async () => {
    const res = await server.get("/student").expect(200);
    const result = Array.isArray(res._body);
    expect(result).toBe(true);
  });
  it("should  able to get a list of  students with query", async () => {
    await server
      .post("/student")
      .set("Authorization", "bearer " + token)
      .send(studentData)
      .expect(201);
    const res = await server.get("/student").query({
      name: studentData.name,
      cpf: studentData.cpf,
      phone: studentData.phone,
      points: 0,
      createdBefore: "2999-12-12",
      createdAfter: "1965-01-01",
      updatedAfter: "1965-01-01",
      updatedBefore: "2999-12-12",
      sort: "id,name",
    });
    const result = Array.isArray(res._body);
    expect(result).toBe(true);
  });
  it("should show one student ", async () => {
    const res = await server
      .post("/student")
      .set("Authorization", "bearer " + token)
      .send(studentData)
      .expect(201);

    const resUser = await server
      .get("/student/show")
      .set("Authorization", "bearer " + token)
      .expect(200);
    expect(resUser._body).toHaveProperty("id");
  });
  it("should  get error when show a student that not exist ", async () => {
    const resUser = await server
      .get("/student/show")
      .set("Authorization", "bearer " + token)
      .expect(404);
    expect(resUser._body).toHaveProperty("error");
  });
  it("should update a student details", async () => {
    await server
      .post("/student")
      .set("Authorization", "bearer " + token)
      .send(studentData)
      .expect(201);
    const res = await server
      .put("/student")
      .set("Authorization", "bearer " + token)
      .send({ ...studentData, name: "Teste 2" })
      .expect(200);
    expect(res._body).toHaveProperty("id");
    expect(res._body.name).toBe("Teste 2");
  });
  it("should not update with cpf already registered", async () => {
    const existData = {
      email: "teste2@gmail.com",
      password: "1234567A",
      passwordConfirmation: "1234567A",
      user_type: "STUDENT",
    };
    const existStudent = {
      name: "Teste",
      cpf: "12345678999",
      phone: "+5562999887766",
    };
    await server.post("/user").send(existData).expect(201);
    const loginRes = await server
      .post("/user/login")
      .send(existData)
      .expect(200);
    const iToken = loginRes._body.token;
    await server
      .post("/student")
      .set("Authorization", "bearer " + iToken)
      .send(existStudent)
      .expect(201);
    await server
      .post("/student")
      .set("Authorization", "bearer " + token)
      .send(studentData)
      .expect(201);
    const res = await server
      .put("/student")
      .set("Authorization", "bearer " + token)
      .send({ ...studentData, cpf: existStudent.cpf })
      .expect(400);
    expect(res._body).toHaveProperty("error");
  });
  it("should not update a  student that not exist ", async () => {
    const res = await server
      .put("/student")
      .set("Authorization", "bearer " + token)
      .send({ ...studentData, name: "Teste 2" })
      .expect(404);
    expect(res._body).toHaveProperty("error");
  });
  it("should not update a student  without auth", async () => {
    const res = await server.put("/student").send(studentData).expect(401);
    expect(res._body).toHaveProperty("error");
  });
  it("should delete a student", async () => {
    await server
      .post("/student")
      .set("Authorization", "bearer " + token)
      .send(studentData)
      .expect(201);

    const res = await server
      .delete("/student")
      .set("Authorization", "bearer " + token)
      .expect(200);
    expect(res._body).toHaveProperty("msg");
  });
  it("should get error trying to delete a student that not exist", async () => {
    await server
      .post("/student")
      .set("Authorization", "bearer " + token)
      .send(studentData)
      .expect(201);
    await server
      .delete("/student")
      .set("Authorization", "bearer " + token)
      .expect(200);
    const res = await server
      .delete("/student")
      .set("Authorization", "bearer " + token)
      .expect(404);
    expect(res._body).toHaveProperty("error");
  });
  it("should not delete a student  without auth", async () => {
    const res = await server.delete("/student").send(studentData).expect(401);
    expect(res._body).toHaveProperty("error");
  });
});
