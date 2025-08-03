// lib/chapterUtils.ts
import fs from "fs";
import path from "path";

export function getChapterContent(id: string): string {
  try {
    const filePath = path.join(process.cwd(), "chapters", `${id}.md`);
    return fs.readFileSync(filePath, "utf8");
  } catch (error) {
    console.error(`❌ Failed to load chapter "${id}":`, error);
    return "Content not found.";
  }
}
