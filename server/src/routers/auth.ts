import {
  create,
  generateForgetPasswordLink,
  grantValid,
  logOut,
  sendProfile,
  sendReVerificationMail,
  signIn,
  updatePassword,
  updateProfile,
  verifyEmail,
} from "#/controllers/auth";
import {isValidPassResetToken, mustAuth} from "#/middleware/auth";
import fileParser, {RequestWithFiles} from "#/middleware/fileParser";
import {validate} from "#/middleware/validator";
import {
  CreateUserSchema,
  SignValidationSchema,
  TokenAndIdValidation,
  updatePasswordValidation,
} from "#/utils/validationSchema";
import {Router} from "express";

const router = Router();

router.post("/create", validate(CreateUserSchema), create);
router.post("/verify-email", validate(TokenAndIdValidation), verifyEmail);
router.post("/re-verify-email", sendReVerificationMail);
router.post("/forget-password", generateForgetPasswordLink);
router.post("/verify-pass-reset-token", validate(TokenAndIdValidation), isValidPassResetToken, grantValid);
router.post("/update-password", validate(updatePasswordValidation), isValidPassResetToken, updatePassword);
router.post("/sign-in", validate(SignValidationSchema), signIn);
router.get("/is-auth", mustAuth, sendProfile);
router.post("/update-profile", mustAuth, fileParser, updateProfile);
router.post("/logout", mustAuth, logOut);

export default router;
