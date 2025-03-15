import { Bot } from "./deps.ts";
import { BOT_TOKEN, GEMINI_API_URL } from "./config.ts";

const bot = new Bot(BOT_TOKEN);

bot.command("start", (ctx) => ctx.reply("👋 Hello! Send an image and a prompt to edit it with Gemini AI."));

bot.on("message", async (ctx) => {
  if (!ctx.message.photo) {
    return ctx.reply("📷 Please send an image.");
  }

  const fileId = ctx.message.photo[ctx.message.photo.length - 1].file_id;
  const fileUrl = await ctx.api.getFileLink(fileId);

  const response = await fetch(GEMINI_API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ image_url: fileUrl, prompt: "Make it artistic" })
  });

  if (!response.ok) {
    return ctx.reply("❌ Failed to process image.");
  }

  const imageData = await response.json();
  await ctx.replyWithPhoto(imageData.edited_image_url);
});

export default bot;
