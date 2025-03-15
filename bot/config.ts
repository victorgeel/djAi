import { dotenv } from "./deps.ts";

dotenv.config();

export const BOT_TOKEN = Deno.env.get("BOT_TOKEN") || "";
export const GEMINI_API_URL = Deno.env.get("GEMINI_API_URL") || "https://your-python-api-url.com/process-image";
