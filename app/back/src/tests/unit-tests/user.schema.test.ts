import { describe, it, expect } from "vitest";
import userSchema from "../../schemas/user.schema";

describe("userSchema", () => {
  // Create a valid user object
  const validUser = {
    email: "user@example.com",
    firstname: "John",
    lastname: "Doe",
    street: "123 Rue de la paix",
    zipcode: "75001",
    city: "Paris",
    password: "securePassword123",
    profile_picture: "http://example.com/image.jpg",
    description: "Utilisateur actif",
    availability: "Lun-Ven",
  };

  it("accepte un utilisateur valide", () => {
    // Test if schema accepts a valid user
    const result = userSchema.safeParse(validUser);
    expect(result.success).toBe(true);
  });

  it("rejette un email invalide", () => {
    // Test if schema rejects an invalid email
    const invalidUser = { ...validUser, email: "pas-un-email" };
    const result = userSchema.safeParse(invalidUser);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].path).toContain("email");
    }
  });

  it("rejette un champ manquant", () => {
    // Test if schema rejects a user with a missing field (here firstname)
    const { firstname, ...partialUser } = validUser;
    const result = userSchema.safeParse(partialUser);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(
        result.error.issues.some((i) => i.path.includes("firstname")),
      ).toBe(true);
    }
  });

  it("rejette un champ de type incorrect", () => {
    // Test if schema rejects a field with incorrect type, here zipcode which must be a string, not a number:
    const invalidUser = { ...validUser, zipcode: 75001 };
    const result = userSchema.safeParse(invalidUser);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues.some((i) => i.path.includes("zipcode"))).toBe(
        true,
      );
    }
  });
});
