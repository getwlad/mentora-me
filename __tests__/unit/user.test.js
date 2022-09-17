import bcrypt from "bcryptjs";
const truncate = require("../../utils/truncate");
import app from "./../../src/app";
import request from "supertest";
import User from "../../src/app/models/UserModel";

describe("User", () => {
  beforeEach((done) => {
    truncate();
    done();
  });

  afterEach((done) => {
    truncate();
    done();
  });

  it("should create user", async () => {
    const user = {
      email: "teste1@gmail.com",
      password: "1234567A",
      passwordConfirmation: "1234567A",
      user_type: "STUDENT",
    };
    const response = await request(app).post("/user").send(user);
    const { body } = response;
    expect(body).toHaveProperty("id");
    expect(body.email).toBe(user.email);
  });

  it("should not be able to create an existing user", async () => {
    const data = {
      email: "teste1@gmail.com",
      password: "1234567A",
      passwordConfirmation: "1234567A",
      user_type: "STUDENT",
    };
    await request(app).post("/user").send(data);
    const response = await request(app).post("/user").send(data);

    expect(response).toHaveProperty("error");
  });

  it("should encrypt user password", async () => {
    const data = {
      email: "teste1@gmail.com",
      password: "1234567A",
      passwordConfirmation: "1234567A",
      user_type: "STUDENT",
    };
    const response = await request(app).post("/user").send(data);
    const user = await User.findByPk(response._body.id);
    const hash = await bcrypt.compare("1234567A", user.password_hash);
    expect(hash).toBe(true);
  });
  it("should not able to set a weak password", async () => {
    const data = {
      email: "teste1@gmail.com",
      password: "12345678",
      passwordConfirmation: "1234567A",
      user_type: "STUDENT",
    };
    const response = await request(app).post("/user").send(data);
    expect(response).toHaveProperty("error");
  });
  it("should not able to create a user with invalid user type", async () => {
    const data = {
      email: "teste1@gmail.com",
      password: "1234567A",
      passwordConfirmation: "1234567A",
      user_type: "invalid",
    };
    const response = await request(app).post("/user").send(data);
    expect(response).toHaveProperty("error");
  });
  it("should not able to create a user with invalid email", async () => {
    const data = {
      email: "teste1gmail.com",
      password: "1234567A",
      passwordConfirmation: "1234567A",
      user_type: "STUDENT",
    };
    const response = await request(app).post("/user").send(data);
    expect(response).toHaveProperty("error");
  });
});
