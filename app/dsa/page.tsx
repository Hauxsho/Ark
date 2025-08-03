// app/dsa/page.tsx
"use client"

import { useState } from "react"
import { TrackLayout } from "@/components/track-layout"
import { dsaTopics } from "@/data/dsa-topics"
export default function DSAPage() {
  const [selectedTopicId, setSelectedTopicId] = useState<string>(dsaTopics[0]?.id || "")

  return (
    <TrackLayout
      trackTitle="Data Structures & Algorithms"
      topics={dsaTopics}
      selectedTopicId={selectedTopicId}
      onTopicChange={setSelectedTopicId}
    />
  )
}
