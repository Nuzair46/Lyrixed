import cheerio from "cheerio-without-node-native";
import axios from "axios";

const proxyUrl = "https://api.allorigins.win/raw?url=";

module.exports = async function (url) {
  try {
    let { data } = await axios.get(`${proxyUrl}${url}`);
    console.log({ data });
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
