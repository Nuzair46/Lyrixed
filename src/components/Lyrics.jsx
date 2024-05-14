const react = Spicetify.React;
const { useState, useEffect, useCallback } = Spicetify.React;
import axios from "axios";
import extractLyrics from "./extractLyrics";

const init = {
  searchUrl: "https://api.genius.com/search?q=",
  corsUrl: "https://proxy.cors.sh/",
};

const apiKey =
  "22jcx1liqiOP9FTUEly8UIRnpD-kAr0Vmvq8GQ8xzyDahhM2IkkGbCgM1TccbAKx";

const headers = {
  Authorization: "Bearer " + apiKey,
  "x-cors-api-key": "temp_e7329afcb73a45e7477057d88af764c1",
};

class Lyrics extends react.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTrack: {},
      lyricsData: "",
      isLoading: true,
    };
  }

  getTitle(title, artist) {
    return `${title} ${artist}`
      .toLowerCase()
      .replace(/ *\([^)]*\) */g, "")
      .replace(/ *\[[^\]]*]/, "")
      .replace(/feat.|ft./g, "")
      .replace(/\s+/g, " ")
      .trim();
  }

  async fetchTrackLyrics() {
    try {
      this.setState({ isLoading: true });
      const track = Spicetify.Player.data.item.metadata;
      const { title, artist_name } = track;
      const song = this.getTitle(title, artist_name);
      const reqUrl = `${init.corsUrl}${init.searchUrl}${encodeURIComponent(
        song
      )}`;
      const trackResponse = await axios.get(reqUrl, { headers });

      if (trackResponse.status !== 200) {
        Spicetify.showNotification(error, "Couldn't fetch track for lyrixed");
        return null;
      }

      const result = trackResponse.data.response.hits[0].result;

      if (!result) {
        return null;
      }

      const lyrics = await extractLyrics(result.url);

      this.setState({ lyricsData: lyrics });
    } catch (e) {
      console.error(e);
    } finally {
      this.setState({ isLoading: false });
    }
  }

  componentDidMount() {
    Spicetify.Player.addEventListener("songchange", async (e) => {
      await this.fetchTrackLyrics();
    });
    this.fetchTrackLyrics();
  }

  render() {
    const { isLoading, lyricsData } = this.state;

    if (isLoading) {
      return react.createElement(
        "div",
        null,
        "Lyrixed is finding the lyrics. Please wait..."
      );
    }

    return lyricsData
      ? react.createElement(
          "div",
          null,
          lyricsData
            .split("\n")
            .map((str) => react.createElement("p", null, str))
        )
      : react.createElement("div", null, "Couldn't find lyrics for this one.");
  }
}

export default Lyrics;
