const axios = require("axios");

function Get() {
  // `${process.env.API_KEY}`
  let response = "hello";
  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: "https://api.b365api.com/v3/events/inplay?token=179024-3d6U7zylacO78f&sport_id=1",
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
