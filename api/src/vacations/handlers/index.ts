import { getConnection } from "../../db";

export default async function getVacationsHandler() {
  const query = `SELECT * FROM vacations`;
  console.log(query);
  const [result] = await getConnection().execute(query);
  console.log("finished");
  console.log(result)
  return result;
}
