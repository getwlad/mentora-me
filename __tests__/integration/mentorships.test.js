import destroyModelData from "../../utils/destroyModelData";
import app from "./../../src/app";
import { describe, expect, test, it, beforeEach } from "vitest";
import supertest from "supertest";

describe("Mentorships", () => {
  const server = supertest(app);

  it("should receive list of mentorships", async () => {
    await server.get("/mentorships").expect(200);
  });
});
