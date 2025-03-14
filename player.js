const { exec } = require("child_process");

function play(url) {
  exec(`yt-dlp -q -f bestaudio -o - "${url}" | ffmpeg -i pipe:0 -f s16le -ar 48000 -ac 2 pipe:1`, (error, stdout, stderr) => {
    if (error) console.error(`yt-dlp error: ${error.message}`);
  });
}

function stop() {
  exec("pkill -f yt-dlp");
}

module.exports = { play, stop };
