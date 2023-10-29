import express from "express";
import loginUser from "../handlers/loginUser";
import { signToken } from "../handlers/signJwt";
const router = express.Router();

router.post("/", loginHandler);
let requests = {};
async function loginHandler(req, res, next) {
  var ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
  if (requests[ip]) {
    requests[ip] = requests[ip] + 1;
  } else {
    requests[ip] = 1;
  }

  try {
    const result = await loginUser({
      userName: req.body.userName,
      password: req.body.password,
    });
    if (!result) {
      if (requests[ip] > 3) {
        // ????
        requests[ip] = 0;
      }
      throw new Error("User is not authorized");
    }
    const token = signToken({ userName: result.user_name });
    res.json({ token });
  } catch (ex) {
    return next(ex);
  }
}
export default router;
