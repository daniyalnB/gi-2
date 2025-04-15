const axios = require("axios");
const appConfig = require("../client/appConfig.json");

const baseURL = `${appConfig["localhost"]}:${appConfig.serverPort}`;

function getSheetByPermalink(permalink) {
  axios
    .post(
      `${baseURL}/${"Public"}/GetInsightSheetByPermalink?permalink=${permalink}`
    )
    .then((res) => {
      console.log(res.data.data, "data");
      return res.data.data;
    })
    .catch((error) => {
      console.error(error);
    });
}

module.exports = { getSheetByPermalink };
