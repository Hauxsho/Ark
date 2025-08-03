// =======================
// Question & Topic Models
// =======================

export interface Question {
  id: string
  title: string
  difficulty: "Easy" | "Medium" | "Hard"
  link?: string
  notes?: string
  solution?: string
  tags?: string[]
}

export type CategoryId = "dsa" | "lld" | "hld" | "more"

export interface Topic {
  id: string
  name: string          // 👈 NEW: Belongs to which category
  description: string              // Tailwind gradient class (e.g., "from-blue-500 to-blue-600")
  chapterFileName: string         // Markdown content or external file path (if using dynamic MD loader)
  questions: Question[]
}

// =======================
// Progress Tracking Models
// =======================

export interface QuestionProgress {
  learning: boolean
  coding: boolean
  rev1: boolean
  rev2: boolean
  rev3: boolean
  rev4: boolean
}

export interface Progress {
  [topicId: string]: {
    [questionId: string]: QuestionProgress
  }
}

// =======================
// Progress Stage Metadata
// =======================

export const PROGRESS_STAGES = [
  {
    key: "learning" as const,
    label: "Learning",
    color: "bg-blue-500",
  },
  {
    key: "coding" as const,
    label: "Coding",
    color: "bg-green-500",
  },
  {
    key: "rev1" as const,
    label: "Rev1",
    color: "bg-yellow-500",
  },
  {
    key: "rev2" as const,
    label: "Rev2",
    color: "bg-orange-500",
  },
  {
    key: "rev3" as const,
    label: "Rev3",
    color: "bg-red-500",
  },
  {
    key: "rev4" as const,
    label: "Rev4",
    color: "bg-purple-500",
  },
] satisfies readonly {
  key: keyof QuestionProgress
  label: string
  color: string
}[]
