const { expect } = require("chai");
const axios = require("axios");
const loginUrl = "http://localhost:4100/login";

describe("/POST Login", () => {
  it("Login Success", async () => {
    // const generatedUser = getUser();
    // const { insertId } = await insertFakeUser(generatedUser);
    // const { affectedRows } = await insertFakePassword({
    //   userId: insertId,
    //   password: "CorrectPassword",
    // });
    const response = await axios.post(`${loginUrl}`, {
      userName: "stassii",
      password: "s123456",
    });
    const { token } = response.data;
    expect(response.status).to.be.equal(200);
    console.log(token);
    expect(token).to.be.string;
  });
});
