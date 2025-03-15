import { Bot } from "./deps.ts";
import { BOT_TOKEN, GEMINI_API_URL } from "./config.ts";

// Initialize the Telegram bot with the bot token
const bot = new Bot(BOT_TOKEN);

// Command to start the bot and show a welcome message
bot.command("start", (ctx) => ctx.reply("👋 Hello! Send an image and a prompt to edit it with Gemini AI."));

// Handle incoming messages (images and prompts)
bot.on("message", async (ctx) => {
  if (!ctx.message.photo) {
    return ctx.reply("📷 Please send an image.");
  }

  // Get the file ID of the image
  const fileId = ctx.message.photo[ctx.message.photo.length - 1].file_id;
  
  // Get the download URL of the image using the Telegram API
  const fileUrl = await ctx.api.getFileLink(fileId);

  // Call the Gemini API to process the image
  const response = await fetch(GEMINI_API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ image_url: fileUrl, prompt: "Make it artistic" })
  });

  // Handle Gemini API errors
  if (!response.ok) {
    return ctx.reply("❌ Failed to process image.");
  }

  // Get the edited image URL from Gemini API response
  const imageData = await response.json();
  
  // Send the edited image back to the user
  await ctx.replyWithPhoto(imageData.edited_image_url);
});

// Export the bot instance for use elsewhere
export default bot;
