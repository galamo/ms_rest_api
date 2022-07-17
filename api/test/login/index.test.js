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
      userName: "ziv@ziv.com",
      password: "123456",
    });
    const { token } = response.data;
    expect(response.status).to.be.equal(200);
    expect(token).to.be.string;
  });
});

function getUser() {
  const generatedNumber = Math.ceil(Math.random() * 9999);
  return {
    company: `company_${generatedNumber}`,
    last_name: `last_${generatedNumber}`,
    first_name: `first_${generatedNumber}`,
    email_address: `test${generatedNumber}@test.com`,
    job_title: `developer_${generatedNumber}`,
  };
}
