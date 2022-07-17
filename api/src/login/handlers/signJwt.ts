import jwt from "jsonwebtoken";
export function signToken(obj: { userName: string }) {
  const token = jwt.sign(
    {
      data: {
        ...obj,
        password: null,
        role: "viewer",
      },
    },
    process.env.SECRET || "mySecretForApplication1234567",
    { expiresIn: "10h" }
  );

  return token;
}
