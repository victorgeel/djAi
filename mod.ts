import { serve } from "./deps.ts";
import bot from "./bot.ts";

console.log("🚀 Telegram bot is running...");

serve(async (req) => {
  if (req.method === "POST") {
    const update = await req.json();
    await bot.handleUpdate(update);
    return new Response("OK", { status: 200 });
  }
  return new Response("Hello from Deno!", { status: 200 });
});
