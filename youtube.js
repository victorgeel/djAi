const axios = require("axios");
const { google } = require("googleapis");

// Directly inputting the API keys
const GEMINI_API_KEY = "AIzaSyDYbvvN4IUCIclgGT7AWDbBDWR75RvQGTg";
const YOUTUBE_API_KEY = "AIzaSyDYbvvN4IUCIclgGT7AWDbBDWR75RvQGTg";

async function getSuggestedSong(query) {
  try {
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
      { contents: [{ parts: [{ text: `Suggest a song for: ${query}` }] }] }
    );

    return response.data.candidates?.[0]?.content?.parts?.[0]?.text || null;
  } catch (error) {
    console.error("Gemini API error:", error);
    return null;
  }
}

async function searchYouTube(query) {
  try {
    const youtube = google.youtube({ version: "v3", auth: YOUTUBE_API_KEY });
    const response = await youtube.search.list({
      part: "snippet",
      q: query,
      maxResults: 5,
      type: "video",
    });

    return response.data.items.map((video) => ({
      title: video.snippet.title,
      url: `https://www.youtube.com/watch?v=${video.id.videoId}`,
    }));
  } catch (error) {
    console.error("YouTube API error:", error);
    return [];
  }
}

module.exports = { getSuggestedSong, searchYouTube };
