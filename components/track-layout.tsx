"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { getTopicProgress } from "@/lib/progress";
import { TopicContent } from "@/components/topic-content"
import Link from "next/link";
import type { Topic } from "@/lib/types";

interface TrackLayoutProps {
  trackTitle: string;
  topics: Topic[];
  selectedTopicId: string;
  onTopicChange: (topicId: string) => void;
}

export function TrackLayout({
  trackTitle,
  topics,
  selectedTopicId,
  onTopicChange,
}: TrackLayoutProps) {
  const [topicProgress, setTopicProgress] = useState<Record<string, number>>({});
  const [markdownContent, setMarkdownContent] = useState("");
  console.log(markdownContent)
  const selectedTopic = topics.find((t) => t.id === selectedTopicId) || topics[0];

  // Load progress bar values
  useEffect(() => {
    const progress: Record<string, number> = {};
    topics.forEach((topic) => {
      progress[topic.id] = getTopicProgress(topic.id, topic.questions.length);
    });
    setTopicProgress(progress);
  }, [topics, selectedTopicId]);

  // Fetch markdown based on selected topic's chapterFileName
  useEffect(() => {
    const loadMarkdown = async () => {
      if (!selectedTopic?.chapterFileName) return;
      console.log(selectedTopic.chapterFileName)
      try {
        const res = await fetch(`/chapters/${selectedTopic.chapterFileName}`);
        console.log(res)
        const text = await res.text();
        console.log(text)
        setMarkdownContent(text);
      } catch (error) {
        setMarkdownContent("⚠️ Failed to load content.");
        console.error("Markdown load error:", error);
      }
    };
    loadMarkdown();
  }, [selectedTopic]);

  return (
    <div className="min-h-screen bg-gray-50 bg-[radial-gradient(circle_at_1px_1px,rgba(0,0,0,0.15)_1px,transparent_0)] bg-[length:20px_20px]">
      <div className="flex h-screen">
       
        {/* Right Sidebar */}
        <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
          <div className="p-6 border-b border-gray-200">
            <Link href="/">
              <Button variant="ghost" size="sm" className="mb-4 -ml-2">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </Link>
            <h2 className="text-xl font-bold text-gray-900">{trackTitle}</h2>
          </div>

          <div className="flex-1 overflow-y-auto">
            <div className="p-4">
              {topics.map((topic) => {
                const progress = topicProgress[topic.id] || 0;
                const isSelected = topic.id === selectedTopicId;

                return (
                  <button
                    key={topic.id}
                    onClick={() => onTopicChange(topic.id)}
                    className={`w-full text-left p-4 rounded-lg mb-2 transition-colors ${
                      isSelected
                        ? "bg-gray-100 border-2 border-gray-300"
                        : "hover:bg-gray-50 border-2 border-transparent"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-gray-900">{topic.name}</h3>
                      <span className="text-sm text-gray-500">{progress}%</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{topic.description}</p>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-gray-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Left Main Content */}
        <div className="flex-1 overflow-hidden">
          {selectedTopic && (
            <TopicContent topic={selectedTopic} markdownContent={markdownContent} />
          )}
        </div>


      </div>
    </div>
  );
}
