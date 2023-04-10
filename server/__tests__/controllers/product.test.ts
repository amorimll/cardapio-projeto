import request from "supertest";
import { Request, Response } from "express";
import { app } from "../../src/app";
import { connect, disconnect } from "../../src/database/db";
import Product from "../../src/models/Product";
import Category from "../../src/models/Category";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const token = jwt.sign({ role: "admin" }, process.env.JWT_SECRET ?? "");

beforeAll(async () => {
  await connect();

  const productData = {
    id: 999,
    categories: ["998", "999"],
    name: "Product to be deleted",
    qty: 10,
    price: 10.0,
  };

  const categoryData = [
    {
      id: 998,
      parent: "",
      name: "Category 1",
    },
    {
      id: 999,
      parent: "",
      name: "Category 2",
    },
  ];

  await Category.create(categoryData);
  await Product.create(productData);
});

afterAll(async () => {
  await Category.deleteMany({ id: { $in: ["998", "999"] } });
  await Product.findOneAndDelete({ id: "999" });

  await disconnect();
});

describe("GET /products", () => {
  it("should return a list of products", async () => {
    const res = await request(app)
      .get("/product")
      .set("Authorization", `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body).not.toHaveLength(0);
  });
});

describe("GET /product/:id", () => {
  it("should return a single product by ID", async () => {
    const res = await request(app)
      .get("/product/999")
      .set("Authorization", `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(typeof res.body).toBe("object");
  });

  it("should return an error if product is not found", async () => {
    const res = await request(app)
      .get("/product/998")
      .set("Authorization", `Bearer ${token}`);
    expect(res.status).toBe(404);
    expect(res.body.errorMessage).toBe(`No product found`);
  });

  it("should return an error if product id is not a number", async () => {
    const res = await request(app)
      .get("/product/invalid-id")
      .set("Authorization", `Bearer ${token}`);
    expect(res.status).toBe(400);
    expect(res.body.errorMessage).toBe(`ID must be a number`);
  });
});

describe("POST /products", () => {
  it("should create a new product", async () => {
    const productData = {
      id: 100,
      categories: ["998", "999"],
      name: "New Product",
      qty: 10,
      price: 10.0,
    };
    const res = await request(app)
      .post("/product")
      .set("Authorization", `Bearer ${token}`)
      .send(productData);
    expect(res.status).toBe(201);
    expect(res.body.responseMessage).toBe(`Product successfully created.`);

    const createdProduct = await Product.findOne({ id: productData.id });
    await Product.findByIdAndDelete(createdProduct);
  });

  it("should return an error if categories are not found", async () => {
    const productData = {
      id: 200,
      categories: [9999],
      name: "New Product",
      qty: 10,
      price: 10.0,
    };
    const res = await request(app)
      .post("/product")
      .set("Authorization", `Bearer ${token}`)
      .send(productData);
    expect(res.status).toBe(404);
    expect(res.body.errorMessage).toBe(`This category does not exist.`);
  });
});

describe("PATCH /products/:id", () => {
  it("should update an existing product", async () => {
    const updatedProductData = {
      categories: ["998", "999"],
      name: "Updated Product",
      qty: 20,
      price: 20.0,
    };
    const res = await request(app)
      .patch(`/product/999`)
      .set("Authorization", `Bearer ${token}`)
      .send(updatedProductData);
    expect(res.status).toBe(201);
    expect(res.body.responseMessage).toBe(`Product successfully updated.`);
  });

  it("should return an error if product id is not a number", async () => {
    const res = await request(app)
      .patch(`/product/invalid-id`)
      .set("Authorization", `Bearer ${token}`);
    expect(res.status).toBe(400);
    expect(res.body.errorMessage).toBe(`ID must be a number`);
  });

  it("should return an error if product is not found", async () => {
    const updatedProductData = {
      categories: ["998", "999"],
      name: "Updated Product",
      qty: 20,
      price: 20.0,
    };
    const res = await request(app)
      .patch("/product/998")
      .set("Authorization", `Bearer ${token}`)
      .send(updatedProductData);
    expect(res.status).toBe(404);
    expect(res.body.errorMessage).toBe(`No product found`);
  });

  it("should return an error if categories are not found", async () => {
    const updatedProductData = {
      categories: [9999],
      name: "Updated Product",
      qty: 20,
      price: 20.0,
    };
    const res = await request(app)
      .patch(`/product/999`)
      .set("Authorization", `Bearer ${token}`)
      .send(updatedProductData);
    expect(res.status).toBe(404);
    expect(res.body.errorMessage).toBe("This category does not exist.");
  });
});

describe("DELETE /products/:id", () => {
  it("should delete an existing product", async () => {
    const res = await request(app)
      .delete(`/product/999`)
      .set("Authorization", `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body.responseMessage).toBe(`Product successfully deleted.`);
  });

  it("should return an error if product id is not a number", async () => {
    const res = await request(app)
      .delete(`/product/invalid-id`)
      .set("Authorization", `Bearer ${token}`);
    expect(res.status).toBe(400);
    expect(res.body.errorMessage).toBe(`ID must be a number`);
  });

  it("should return an error if product id is not found", async () => {
    const res = await request(app)
      .delete(`/product/998`)
      .set("Authorization", `Bearer ${token}`);
    expect(res.status).toBe(404);
    expect(res.body.errorMessage).toBe(`No product found`);
  });
});
