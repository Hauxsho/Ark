"use client";

import { useState, useEffect } from "react";
import {
  Tabs, TabsContent, TabsList, TabsTrigger,
} from "@/components/ui/tabs";
import {
  Card, CardContent, CardHeader, CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Collapsible, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Textarea } from "@/components/ui/textarea";
import { ExternalLink, ChevronDown, ChevronsUp, BookOpen, Target, MessageSquare, StickyNote } from "lucide-react";
import type { Topic, Question, QuestionProgress } from "@/lib/types";
import { PROGRESS_STAGES } from "@/lib/types";
import {
  getQuestionProgress,
  updateQuestionProgress,
  getTopicProgress,
} from "@/lib/progress";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import "github-markdown-css/github-markdown-light.css";

interface TopicContentProps {
  topic: Topic;
  markdownContent: string;
}

export function TopicContent({ topic, markdownContent }: TopicContentProps) {
  console.log(markdownContent)
  const [activeTab, setActiveTab] = useState("learning");
  const [questionProgress, setQuestionProgress] = useState<Record<string, QuestionProgress>>({});
  const [expandedQuestions, setExpandedQuestions] = useState<Set<string>>(new Set());
  const [questionNotes, setQuestionNotes] = useState<Record<string, string>>({});
  const [topicProgress, setTopicProgress] = useState(0);
  const [globalNotes, setGlobalNotes] = useState("")

  useEffect(() => {
    const progress: Record<string, QuestionProgress> = {};
    const notes: Record<string, string> = {};

    topic.questions.forEach((question) => {
      progress[question.id] = getQuestionProgress(topic.id, question.id);
      const savedNotes = localStorage.getItem(`notes-${topic.id}-${question.id}`);
      if (savedNotes) notes[question.id] = savedNotes;
    });

    const savedGlobalNotes = localStorage.getItem(`global-notes-${topic.id}`)
    if (savedGlobalNotes) {
      setGlobalNotes(savedGlobalNotes)
    }

    setQuestionProgress(progress);
    setQuestionNotes(notes);
    setTopicProgress(getTopicProgress(topic.id, topic.questions.length));
  }, [topic]);

  const handleProgressChange = (questionId: string, stage: keyof QuestionProgress, checked: boolean) => {
    updateQuestionProgress(topic.id, questionId, stage, checked);

    setQuestionProgress((prev) => ({
      ...prev,
      [questionId]: {
        ...prev[questionId],
        [stage]: checked,
      },
    }));

    setTopicProgress(getTopicProgress(topic.id, topic.questions.length));
  };

  const toggleQuestionExpanded = (questionId: string) => {
    setExpandedQuestions((prev) => {
      const newSet = new Set(prev);
      newSet.has(questionId) ? newSet.delete(questionId) : newSet.add(questionId);
      return newSet;
    });
  };

  const handleNotesChange = (questionId: string, notes: string) => {
    setQuestionNotes((prev) => ({ ...prev, [questionId]: notes }));
    localStorage.setItem(`notes-${topic.id}-${questionId}`, notes);
  };

  const getQuestionProgressPercentage = (progress: QuestionProgress) => {
    const completed = Object.values(progress).filter(Boolean).length;
    return Math.round((completed / 6) * 100);
  };

  const getDifficultyColor = (difficulty: Question["difficulty"]) => {
    switch (difficulty) {
      case "Easy": return "bg-green-500";
      case "Medium": return "bg-yellow-500";
      case "Hard": return "bg-red-500";
      default: return "bg-gray-500";
    }
  }

  const tabs = [
    { id: "learning", label: "Chapter", icon: <BookOpen className="w-4 h-4" /> },
    { id: "questions", label: `Practice (${topic.questions.length})`, icon: <Target className="w-4 h-4" /> },
  ];

  const handleGlobalNotesChange = (notes: string) => {
    setGlobalNotes(notes)
    localStorage.setItem(`global-notes-${topic.id}`, notes)
  };

  return (
    <div className="h-full">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full flex flex-col">
        <div className="px-6 py-4 bg-white border-b border-gray-200">
          <TabsList className="w-full bg-gray-100 p-1 rounded-lg h-12 flex">
            {tabs.map((tab) => (
              <TabsTrigger
                key={tab.id}
                value={tab.id}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-2 rounded-md text-sm font-medium transition-all
                  data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=active]:shadow-sm
                  text-gray-600 hover:text-gray-900"
              >
                {tab.icon}
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>


        {/* Chapter Markdown Tab */}
        <TabsContent value="learning" className="flex-1 overflow-auto p-6 mt-0">
          <Card>
            <CardContent className="p-6">
              <div className="markdown-body px-6 py-4">

                <ReactMarkdown
                 remarkPlugins={[remarkGfm, remarkBreaks]}
                  components={{
                    code({ node, inline, className, children, ...props }) {
                      const match = /language-(\w+)/.exec(className || "");
                      console.log("node:",node,"inline:",inline,"className:", className,"children:", children, "props:",props)
                      return !inline && match ? (
                        <SyntaxHighlighter
                          style={oneDark}
                          language={match[1]}
                          PreTag="div"
                          {...props}
                        >
                          {String(children)}
                        </SyntaxHighlighter>
                      ) : (
                        <code className={className} {...props}>{children}</code>
                      );
                    },
                  }}
                >
                  {markdownContent}
                </ReactMarkdown>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Questions Tab */}
        <TabsContent value="questions" className="flex-1 overflow-auto p-6 mt-0">
          <div className="space-y-4">
            {topic.questions.map((question) => {
              const progress = questionProgress[question.id] || {
                learning: false, coding: false, rev1: false, rev2: false, rev3: false, rev4: false,
              };
              const progressPercentage = getQuestionProgressPercentage(progress);
              const isExpanded = expandedQuestions.has(question.id);
              const notes = questionNotes[question.id] || "";

              return (
                <Card key={question.id}>
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex items-center gap-2">
                            <CardTitle className="text-lg">{question.title}</CardTitle>
                            <Badge variant="outline" className={`${getDifficultyColor(question.difficulty)} text-white border-0`}>
                              {question.difficulty}
                            </Badge>
                            {question.link && (
                              <Button variant="ghost" size="sm" asChild>
                                <a href={question.link} target="_blank" rel="noopener noreferrer">
                                  <ExternalLink className="w-4 h-4" />
                                </a>
                              </Button>
                            )}
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium">Progress:</span>
                            <Badge variant="outline">{progressPercentage}%</Badge>
                          </div>
                        </div>

                        {question.tags && (
                          <div className="flex flex-wrap gap-1 mb-3">
                            {question.tags.map((tag) => (
                              <Badge key={tag} variant="secondary" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        )}

                        <div className="flex items-start justify-between gap-4">
                          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-12 mt-4">
                            {PROGRESS_STAGES.map((stage) => (
                              <div key={stage.key} className="flex items-center space-x-2">
                                <Checkbox
                                  id={`${question.id}-${stage.key}`}
                                  checked={progress[stage.key]}
                                  onCheckedChange={(checked) =>
                                    handleProgressChange(question.id, stage.key, checked as boolean)
                                  }
                                />
                                <label htmlFor={`${question.id}-${stage.key}`} className="text-sm font-medium cursor-pointer">
                                  {stage.label}
                                </label>
                              </div>
                            ))}
                          </div>

                          <Collapsible>
                            <CollapsibleTrigger asChild>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="self-start border border-black rounded-md"
                                onClick={() => toggleQuestionExpanded(question.id)}
                              >
                                {isExpanded ? (
                                  <ChevronsUp className="w-4 h-4" />
                                ) : (
                                  <ChevronDown className="w-4 h-4" />
                                )}
                              </Button>
                            </CollapsibleTrigger>
                          </Collapsible>
                        </div>
                      </div>
                    </div>
                  </CardHeader>

                  {isExpanded && (
                    <CardContent className="pt-0">
                      <div className="border-t border-gray-300 my-8" />
                      <div className="space-y-4">
                        <div className="mt-8">
                          <label className="text-sm font-medium mb-8 block">Notes & Solution</label>
                          <Textarea
                            placeholder="Add your notes, approach, or solution here..."
                            value={notes}
                            onChange={(e) => handleNotesChange(question.id, e.target.value)}
                            className="min-h-[100px]"
                          />
                        </div>
                      </div>
                    </CardContent>
                  )}
                </Card>
              );
            })}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

