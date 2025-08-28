import { Router } from "express";
import authController from "../controllers/auth.controller";
import { validateAuth } from "../middleware/validate-auth";
import { moderateProfile } from "../middleware/validation-register";
import { verifyToken } from "../middleware/auth.middleware";

const authRouter = Router();
// console.log("I'm in the router");
authRouter.post("/login", validateAuth, authController.login);
authRouter.post("/logout", authController.logout);

authRouter.post(
  "/register",
  validateAuth,
  moderateProfile,
  authController.register,
);

// New route to check authentication
authRouter.get("/check", verifyToken, (req, res) => {
  try {
    res.status(200).json({
      authenticated: true,
      user: req.user, // If user information is attached in the middleware
    });
  } catch (error) {
    res.status(401).json({
      authenticated: false,
      message: "Non authentifié",
    });
  }
});

export default authRouter;
