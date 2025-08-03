"use client"

import type { Progress, QuestionProgress } from "./types"

const STORAGE_KEY = "dsa-tracker-progress"

export function getProgress(): Progress {
  if (typeof window === "undefined") return {}

  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) : {}
  } catch {
    return {}
  }
}

export function saveProgress(progress: Progress): void {
  if (typeof window === "undefined") return

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress))
  } catch (error) {
    console.error("Failed to save progress:", error)
  }
}

export function getCategoryProgress(categoryId: string, categoryTopics: { id: string; questions: { id: string }[] }[]): number {
  if (!Array.isArray(categoryTopics) || categoryTopics.length === 0) return 0

  let totalProgress = 0

  for (const topic of categoryTopics) {
    totalProgress += getTopicProgress(topic.id, topic.questions.length)
  }

  return Math.round(totalProgress / categoryTopics.length)
}



export function updateQuestionProgress(
  topicId: string,
  questionId: string,
  stage: keyof QuestionProgress,
  completed: boolean,
): void {
  const progress = getProgress()

  if (!progress[topicId]) {
    progress[topicId] = {}
  }

  if (!progress[topicId][questionId]) {
    progress[topicId][questionId] = {
      learning: false,
      coding: false,
      rev1: false,
      rev2: false,
      rev3: false,
      rev4: false,
    }
  }

  progress[topicId][questionId][stage] = completed
  saveProgress(progress)
}

export function getQuestionProgress(topicId: string, questionId: string): QuestionProgress {
  const progress = getProgress()
  return (
    progress[topicId]?.[questionId] || {
      learning: false,
      coding: false,
      rev1: false,
      rev2: false,
      rev3: false,
      rev4: false,
    }
  )
}

export function getTopicProgress(topicId: string, totalQuestions: number): number {
  if (totalQuestions === 0) return 0

  const progress = getProgress()
  const topicProgress = progress[topicId] || {}

  let completedQuestions = 0
  Object.values(topicProgress).forEach((questionProgress) => {
    // Consider a question completed if all stages are done
    const allStagesComplete = Object.values(questionProgress).every(Boolean)
    if (allStagesComplete) completedQuestions++
  })

  return Math.round((completedQuestions / totalQuestions) * 100)
}

export function exportProgress(): string {
  return JSON.stringify(getProgress(), null, 2)
}

export function importProgress(jsonData: string): boolean {
  try {
    const progress = JSON.parse(jsonData)
    saveProgress(progress)
    return true
  } catch {
    return false
  }
}
