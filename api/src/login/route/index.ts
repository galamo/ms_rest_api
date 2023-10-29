import express from "express";
import loginUser from "../handlers/loginUser";
import { signToken } from "../handlers/signJwt";
import { sendToQueue } from "../../sender";
const router = express.Router();
const queue: string = "securityNotifications";

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
    const { userName, password } = req.body;
    const result = await loginUser({
      userName,
      password,
    });
    if (!result) {
      if (requests[ip] >= 3) {
        sendToQueue(queue, { ip, userName });
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
