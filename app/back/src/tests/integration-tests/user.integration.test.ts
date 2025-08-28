import { describe, it, expect, beforeAll, afterAll } from "vitest";
import request from "supertest";

// Use an isolated in-memory SQLite DB for tests to avoid touching Postgres.
process.env.NODE_ENV = process.env.NODE_ENV || "test";
process.env.PG_URL = process.env.PG_URL || "sqlite::memory:";

import app from "../../../app";
import { sequelize } from "../../models/associations";
import { User, Role } from "../../models/associations";

beforeAll(async () => {
  await sequelize.sync({ force: true }); // Clean database before tests
});

afterAll(async () => {
  await sequelize.close(); // Close connection after tests
});

describe("Test d'intégration - GET /users/:id", () => {
  let userId: number;
  let roleId: number;

  beforeAll(async () => {
    // Create a role
    const role = await Role.create({ name: "user" });
    roleId = role.id;
    // Create a real user in the database
    const user = await User.create({
      email: "profil@example.com",
      password: "Hashed_pw",
      firstname: "Jean",
      lastname: "Dupont",
      street: "123 rue Exemple",
      zipcode: "75001",
      city: "Paris",
      profile_picture: "https://example.com/profile.jpg",
      description: "Description test",
      availability: "Disponible",
      role_id: roleId,
    });
    userId = user.id;
  });

  it("doit retourner le profil de l'utilisateur", async () => {
    const res = await request(app).get(`/api/users/${userId}`);

    expect(res.status).toBe(200);
    expect(res.body.data).toMatchObject({
      id: userId,
      firstname: "Jean",
      lastname: "Dupont",
      city: "Paris",
      description: "Description test",
    });
  });
});
