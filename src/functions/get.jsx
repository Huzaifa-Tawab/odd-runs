const axios = require("axios");

function Get(uri) {
  // `${process.env.API_KEY}`
  let response = "hello";
  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `https://api.b365api.com/v3/${uri}`,
    headers: {},
  };

  axios
    .request(config)
    .then((response) => {
      console.log(JSON.stringify(response.data));
    })
    .catch((error) => {
      console.log(error);
    });
  return response;
}
