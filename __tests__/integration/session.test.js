import supertest from "supertest";
import destroyModelData, { setAdminTrue } from "../../utils/destroyModelData";
import app from "../../src/app";

import { describe, expect, it, beforeEach, beforeAll } from "vitest";
describe("Session", () => {
  beforeAll(async () => {
    await setAdminTrue();
  });
  const server = supertest(app);
  const data = {
    email: "teste2@gmail.com",
    password: "1234567B",
    passwordConfirmation: "1234567B",
    user_type: "STUDENT",
  };
  beforeEach(async () => {
    await destroyModelData(["User"]);
  });

  it("should receive jwt token when authenticated with valid credentials", async () => {
    await server.post("/user").send(data).expect(201);
    const response = await server.post("/user/login").send(data).expect(200);
    expect(response.status).toBe(200);
    expect(response._body).toHaveProperty("token");
  });

  it("should not receive any token with invalid credentials", async () => {
    await server.post("/user").send(data).expect(201);
    const response = await server.post("/user/login").send({
      ...data,
      password: "1234678",
    });
    expect(response.status).toBe(400);
    expect(response._body).toHaveProperty("error");
  });
  it("should not able to login with invalid email", async () => {
    await server.post("/user").send(data).expect(201);
    const response = await server.post("/user/login").send({
      ...data,
      email: null,
    });
    expect(response.status).toBe(400);
    expect(response._body).toHaveProperty("error");
  });
  it("should not able to login with invalid password", async () => {
    await server.post("/user").send(data).expect(201);
    const response = await server.post("/user/login").send({
      ...data,
      password: null,
    });
    expect(response.status).toBe(400);
    expect(response._body).toHaveProperty("error");
  });
  it("should not able to login with not valid user", async () => {
    const response = await server.post("/user/login").send({
      ...data,
    });
    expect(response.status).toBe(404);
    expect(response._body).toHaveProperty("error");
  });
});
