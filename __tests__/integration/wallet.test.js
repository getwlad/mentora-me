import destroyModelData, { setAdminTrue } from "../../utils/destroyModelData";
import app from "./../../src/app";
import { describe, expect, it, beforeEach, beforeAll } from "vitest";
import supertest from "supertest";

describe("Wallet", () => {
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
  let token;
  beforeEach(async () => {
    await destroyModelData(["User"]);
    await server.post("/user").send(data).expect(201);
    const loginRes = await server.post("/user/login").send(data).expect(200);
    token = loginRes._body.token;
  });
  it("should receive add balance to wallet", async () => {
    const res = await server
      .post("/balance")
      .set("Authorization", "bearer " + token)
      .send({
        holderName: "Teste Test",
        amount: 1200,
        number: 4000000000000010,
        expMonth: 12,
        expYear: 25,
        cvv: 234,
      })
      .expect(200);
    expect(res._body).toHaveProperty("sucess");
  });
  it("should not add balance to wallet withou auth", async () => {
    const res = await server
      .post("/balance")
      .set("Authorization", "bearer " + "token")
      .send({
        holderName: "Teste Test",
        amount: 1200,
        number: 4000000000000010,
        expMonth: 12,
        expYear: 25,
        cvv: 234,
      })
      .expect(401);
    expect(res._body).toHaveProperty("error");
  });
  it("should not add balance to wallet with invalid credit card", async () => {
    const res = await server
      .post("/balance")
      .set("Authorization", "bearer " + token)
      .send({
        holderName: "Teste Test",
        amount: 1200,
        number: 4000000000000010,
        expMonth: 15,
        expYear: 25,
        cvv: 234,
      })
      .expect(400);
    expect(res._body).toHaveProperty("error");
  });
  it("should get balance of wallet", async () => {
    const res = await server
      .get("/balance")
      .set("Authorization", "bearer " + token)
      .expect(200);
    expect(res._body).toHaveProperty("saldo");
  });
  it("should not get balance of wallet without auth", async () => {
    const res = await server
      .get("/balance")
      .set("Authorization", "bearer " + "token")
      .expect(401);
    expect(res._body).toHaveProperty("error");
  });
});
