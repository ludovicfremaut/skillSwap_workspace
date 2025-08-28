process.env.JWT_SECRET_KEY = "my-secret-key";

import { describe, it, expect, vi, beforeEach, afterEach, Mock } from "vitest";
import argon2 from "argon2";
import jwt from "jsonwebtoken";
import authController from "../../controllers/auth.controller";
import { User } from "../../models/associations";

vi.mock("jsonwebtoken", () => ({
  default: {
    sign: vi.fn(),
    verify: vi.fn(),
  },
}));
vi.mock("argon2");
vi.mock("../../models/associations", () => ({
  // Simulate Sequelize ORM methods for User model with fake functions
  User: {
    findOne: vi.fn(),
    create: vi.fn(),
  },
}));

// Simulate Express response by creating an object to verify that the function is called correctly
const mockResponse = () => {
  const res: any = {};
  res.status = vi.fn().mockReturnValue(res);
  res.json = vi.fn().mockReturnValue(res);
  res.cookie = vi.fn().mockReturnValue(res);
  res.clearCookie = vi.fn().mockReturnValue(res);
  return res;
};

describe("authController", () => {
  // Reset mocks before each test
  beforeEach(() => {
    vi.clearAllMocks();
  });

  // Tests for the authentication controller
  it("hash le mot de passe et crée un utilisateur", async () => {
    const req: any = {
      // Simulate incoming request
      body: {
        email: "test@example.com",
        password: "Secret_123",
        firstname: "John",
        lastname: "Doe",
        street: "1 rue de Paris",
        zipcode: "75000",
        city: "Paris",
        description: "dev",
        availability: ["weekdays"],
      },
    };
    // Simulate Express response
    const res = mockResponse();

    // Simulate behavior of argon2 and User
    (argon2.hash as any).mockResolvedValue("hashed_pw");
    (User.findOne as unknown as ReturnType<typeof vi.fn>).mockResolvedValue(
      null,
    );
    (User.create as unknown as ReturnType<typeof vi.fn>).mockResolvedValue({
      id: 1,
    });

    // Controller call
    await authController.register(req, res);
    // Check that the hash function was called with the original password:
    expect(argon2.hash).toHaveBeenCalledWith("Secret_123");
    // Check that the password was hashed
    expect(User.create).toHaveBeenCalledWith(
      expect.objectContaining({ password: "hashed_pw" }),
    );
    // Check that the user was created with status code 201:
    expect(res.status).toHaveBeenCalledWith(201);
    // Check that the JSON response contains a message and the created user:
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ message: expect.any(String), user: { id: 1 } }),
    );
  });

  // Tests for the connection with cookie creation
  it("connecte un utilisateur avec email/mdp corrects", async () => {
    const req: any = {
      body: {
        email: "test@example.com",
        password: "Secret_123",
      },
    };
    const res = mockResponse();

    const fakeUser = {
      id: 1,
      email: "test@example.com",
      password: "hashed_pw",
    };

    (User.findOne as any).mockResolvedValue(fakeUser);
    (argon2.verify as any).mockResolvedValue(true);
    // Mock jwt.sign
    (jwt.sign as Mock).mockImplementation(() => "mocked.token");

    await authController.login(req, res);

    expect(User.findOne).toHaveBeenCalledWith({
      where: { email: "test@example.com" },
    });
    expect(User.findOne).toHaveBeenCalledWith({
      where: { email: "test@example.com" },
    });
    expect(argon2.verify).toHaveBeenCalledWith("hashed_pw", "Secret_123");
    expect(jwt.sign).toHaveBeenCalledWith(
      { id: 1, email: "test@example.com" },
      "my-secret-key",
      { expiresIn: "4h" },
    );
    expect(res.cookie).toHaveBeenCalledWith(
      "accessToken",
      "mocked.token",
      expect.objectContaining({ httpOnly: true }),
    );
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        message: "Connexion réussie",
        user: expect.objectContaining({
          id: 1,
          email: "test@example.com",
        }),
      }),
    );
  });
});

// Tests for logout and cookie removal
it("removes the cookie on logout", () => {
  const req: any = {};
  const res = mockResponse();

  authController.logout(req, res);

  expect(res.clearCookie).toHaveBeenCalledWith("accessToken", {
    httpOnly: true,
    sameSite: "strict",
  });
  expect(res.status).toHaveBeenCalledWith(200);
  expect(res.json).toHaveBeenCalledWith({ message: "Déconnexion réussie" });
});
