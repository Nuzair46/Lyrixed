const react = Spicetify.React;
const { useState, useEffect, useCallback } = Spicetify.React;

import axios from "axios";
import extractLyrics from "./extractLyrics";

const searchUrl = "https://genius.com/api/search/song?";
const proxyUrl = "https://api.allorigins.win/raw?url=";

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
      const query = new URLSearchParams({
        per_page: 20,
        q: `${title} ${artist_name}`,
      });
      const url = encodeURIComponent(`${searchUrl}${query}`);
      const reqUrl = `${proxyUrl}${url}`;
      const trackResponse = await axios.get(reqUrl);

      if (trackResponse.status !== 200) {
        return null;
      }
      const result = trackResponse.data.response.sections[0].hits[0].result;

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
