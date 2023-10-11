import axios from "axios";
import cheerio from "cheerio-without-node-native";

const init = {
  corsUrl: "https://proxy.cors.sh/",
};

const headers = {
  "x-cors-api-key": "temp_e7329afcb73a45e7477057d88af764c1",
};

module.exports = async function (url) {
  try {
    let { data } = await axios.get(`${init.corsUrl}${url}`, { headers });
    const $ = cheerio.load(data);
    let lyrics = $("[data-lyrics-container='true']")
      .find("br")
      .replaceWith("\n")
      .end()
      .text();

    if (!lyrics) return null;
    return lyrics;
  } catch (e) {
    throw e;
  }
};
