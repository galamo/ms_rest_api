import { getConnection } from "../../db";
import md5 from "md5";
interface ILoginUser {
  userName: string;
  password: string;
}

export default async function loginUser(user: ILoginUser) {
  if (!user.password || !user.userName) throw new Error("Missing paramters");
  const query = `SELECT * FROM users where user_name = ? AND password = ? `;
  console.log(query);
  const [result] = await getConnection().execute(query, [
    user.userName,
    user.password,
  ]);
  return result[0];
}
