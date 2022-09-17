import request from "supertest";
const truncate = require("../../utils/truncate");
import app from "../../src/app";

describe("User", () => {
  beforeEach((done) => {
    truncate();
    done();
  });

  afterEach((done) => {
    truncate();
    done();
  });

  it("should receive jwt token when authenticated with valid credentials", async () => {
    await request(app).post("/user").send({
      email: "teste2@gmail.com",
      password: "1234567B",
      passwordConfirmation: "1234567B",
      user_type: "STUDENT",
    });

    const response = await request(app).post("/user/login").send({
      email: "teste2@gmail.com",
      password: "1234567B",
    });
    expect(response.status).toBe(200);
    expect(response._body).toHaveProperty("token");
  });

  it("should not receive any token with invalid credentials", async () => {
    await request(app).post("/user").send({
      email: "teste2@gmail.com",
      password: "1234567B",
      passwordConfirmation: "1234567B",
      user_type: "STUDENT",
    });

    const response = await request(app).post("/user/login").send({
      email: "teste2@gmail.com",
      password: "1234567A",
    });
    expect(response.status).toBe(400);
    expect(response._body).toHaveProperty("error");
  });
});
