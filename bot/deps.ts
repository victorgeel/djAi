// deps.ts (inside the bot/ folder)

export { Bot, webhookCallback } from "https://deno.land/x/grammy@1.18.0/mod.ts";  // Grammy library for Telegram bot
export { serve } from "https://deno.land/std@0.196.0/http/server.ts";  // HTTP server functionality
export * as dotenv from "https://deno.land/std@0.196.0/dotenv/mod.ts";  // Loading environment variables
export { fetch } from "https://deno.land/x/fetch@v1.0.0/mod.ts";  // Fetch API for making HTTP requests
