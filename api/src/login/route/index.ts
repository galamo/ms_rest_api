import express from "express";
import loginUser from "../handlers/loginUser";
import { signToken } from "../handlers/signJwt";
const router = express.Router();

router.post("/", loginHandler);

async function loginHandler(req, res, next) {
  try {
    const result = await loginUser({
      userName: req.body.userName,
      password: req.body.password,
    });
    if (!result) throw new Error("User is not authorized");
    const token = signToken({ userName: result.user_name });
    res.json({ token });
  } catch (ex) {
    return next(ex);
  }
}
export default router;
