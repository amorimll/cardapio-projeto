import request from "supertest";
import { app } from "../../src/app";
import { connect, disconnect } from "../../src/database/db";
import jwt from "jsonwebtoken";
import Category from "../../src/models/Category";

const token = jwt.sign({ role: "admin" }, "CARDAPIOJWTPASS");

beforeAll(async () => {
  await connect();

  const categoryData = {
    id: 1000,
    parent: "",
    name: "Category to be deleted",
  };
  await Category.create(categoryData);
});

afterAll(async () => {
  await Category.findOneAndDelete({ id: "1000" });

  await disconnect();
});

describe("GET /category", () => {
  it("should return a list of category", async () => {
    const res = await request(app)
      .get("/category")
      .set("Authorization", `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body).not.toHaveLength(0);
  });
});
