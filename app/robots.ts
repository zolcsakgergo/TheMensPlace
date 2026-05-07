import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

// Bots that train and/or live-retrieve content for major LLMs / AI search.
// Explicitly allow them so the page is discoverable from ChatGPT, Claude,
// Perplexity, Gemini, Copilot, Apple Intelligence, etc.
const AI_BOTS = [
  "GPTBot", // OpenAI training crawler
  "ChatGPT-User", // ChatGPT user-initiated browse
  "OAI-SearchBot", // ChatGPT search index
  "ClaudeBot", // Anthropic crawler
  "anthropic-ai", // Anthropic legacy UA
  "Claude-Web", // Anthropic web tool
  "PerplexityBot", // Perplexity index
  "Perplexity-User", // Perplexity user-initiated browse
  "Google-Extended", // Gemini training opt-in
  "CCBot", // Common Crawl (powers many LLMs)
  "Applebot-Extended", // Apple Intelligence training
  "DuckAssistBot", // DuckDuckGo AI assist
  "Bytespider", // ByteDance / Doubao
  "Amazonbot", // Amazon AI assist
  "cohere-ai", // Cohere training
  "Diffbot", // Diffbot LLM Knowledge Graph
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // /studio is an authenticated editing surface — keep it out of indexes.
        disallow: ["/studio", "/studio/", "/api/"],
      },
      ...AI_BOTS.map((userAgent) => ({
        userAgent,
        allow: "/",
        disallow: ["/studio", "/studio/", "/api/"],
      })),
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
