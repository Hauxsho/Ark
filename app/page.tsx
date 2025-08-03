"use client"

import Link from "next/link"
import { dsaTopics } from "@/data/dsa-topics"
import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Download, Upload } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { getCategoryProgress, exportProgress, importProgress } from "@/lib/progress"

const CATEGORIES = [
  {
    id: "dsa",
    name: "DSA",
    description: "Data Structures & Algorithms Tracker",
    color: "from-blue-500 to-blue-600",
  },
  {
    id: "lld",
    name: "LLD",
    description: "Low Level Design Practice",
    color: "from-green-500 to-green-600",
  },
  {
    id: "hld",
    name: "HLD",
    description: "High Level Design Scenarios",
    color: "from-orange-500 to-orange-600",
  },
  {
    id: "more",
    name: "More...",
    description: "Java, Spring Boot, AWS, etc.",
    color: "from-purple-500 to-purple-600",
  },
]

export default function HomePage() {
  const [mounted, setMounted] = useState(false)
  const [progressByCategory, setProgressByCategory] = useState<Record<string, number>>({})

useEffect(() => {
  setMounted(true)

  const calculateProgress = () => {
    const progress: Record<string, number> = {}

    setProgressByCategory(progress)
  }

  calculateProgress()
}, [])

  const handleExport = () => {
    const data = exportProgress()
    const blob = new Blob([data], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "all-progress.json"
    a.click()
    URL.revokeObjectURL(url)
  }

  const handleImport = () => {
    const input = document.createElement("input")
    input.type = "file"
    input.accept = ".json"
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0]
      if (file) {
        const reader = new FileReader()
        reader.onload = (e) => {
          const content = e.target?.result as string
          if (importProgress(content)) {
            window.location.reload()
          } else {
            alert("Invalid JSON file")
          }
        }
        reader.readAsText(file)
      }
    }
    input.click()
  }

  if (!mounted) {
    return <div className="container mx-auto p-6">Loading...</div>
  }

  return (
    <div className="container mx-auto p-6">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h1 className="text-2xl font-bold mb-2">Ark - Track your journey</h1>
            <p className="text-muted-foreground text-lg">Learn at your own pace across DSA, LLD, HLD and more</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleExport}>
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
            <Button variant="outline" onClick={handleImport}>
              <Upload className="w-4 h-4 mr-2" />
              Import
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {CATEGORIES.map((category) => {
          const progress = progressByCategory[category.id] || 0
          return (
            <Link key={category.id} href={`/${category.id}`}>
              <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer group">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">{category.name}</h3>
                      <p className="text-sm text-muted-foreground">{category.description}</p>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Progress</span>
                      <Badge variant={progress === 100 ? "default" : "secondary"}>{progress}%</Badge>
                    </div>
                    <Progress value={progress} className="h-2" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
