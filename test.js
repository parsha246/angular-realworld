const callAPI = require("./callAPI");

exports.handler = async (event) => {
  try {
    const body = event.body;

    const resp = await callAPI({
      method: "POST",
      uri: "https://cb-nonprod.kotak.com/neobank/api/initsdk",
      body: body,
      json: true,
      headers: {
        "Content-Type": "application/json",
      },
    });

    const firstSuccess = {
      ...resp.body,
    };

    if (firstSuccess.statusCode === 200) {
      const resp = await callAPI({
        method: "POST",
        uri: "https://cb-nonprod.kotak.com/neobank/api/initsdk",
        body: body,
        json: true,
        headers: {
          "Content-Type": "application/json",
        },
      });

      return {
        ...resp.body,
      };
    } else {
      return firstSuccess;
    }
  } catch (e) {
    console.log(e);
    return {
      code: 500,
      message: "Internal Server Error",
    };
  }
};
