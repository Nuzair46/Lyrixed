import React, { useEffect, useState } from "react";
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

const getTitle = (title, artist) => {
  return `${title} ${artist}`
    .toLowerCase()
    .replace(/ *\([^)]*\) */g, "")
    .replace(/ *\[[^\]]*]/, "")
    .replace(/feat.|ft./g, "")
    .replace(/\s+/g, " ")
    .trim();
};

const fetchTrackLyrics = async (track) => {
  const { title, artist_name } = track;
  const song = getTitle(title, artist_name);
  const reqUrl = `${init.corsUrl}${init.searchUrl}${encodeURIComponent(song)}`;
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

  return lyrics;
};

const fetchLyrics = async (trackId) => {};

export const Lyrics = () => {
  const track = Spicetify.Player.data.track.metadata;
  const [currentTrack, setCurrentTrack] = useState({});
  const [lyricsData, setLyricsData] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  Spicetify.Player.addEventListener("songchange", async (e) => {
    setIsLoading(true);
    const track = Spicetify.Player.data.track.metadata;
    setCurrentTrack(track);
  });

  useEffect(async () => {
    const lyrics = await fetchTrackLyrics(track);
    setLyricsData(lyrics);
    setIsLoading(false);
  }, [track]);

  if (isLoading) {
    return <div>Lyrixed is loading. Please wait...</div>;
  }

  return lyricsData ? (
    <div>
      {lyricsData.split("\n").map((str) => (
        <p>{str}</p>
      ))}
    </div>
  ) : (
    <div>Couldn't find lyrics for this one.</div>
  );
};
