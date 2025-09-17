"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import {
  Play,
  Plus,
  Trash2,
  Clock,
  Users,
  MapPin,
  BookOpen,
  Settings,
  Download,
  Eye,
  Star,
  AlertCircle,
} from "lucide-react"

interface TimetableAlternative {
  id: string
  name: string
  score: number
  conflicts: number
  efficiency: number
  status: "generated" | "optimizing" | "error"
}

export function GenerationHub() {
  const [isGenerating, setIsGenerating] = useState(false)
  const [generationProgress, setGenerationProgress] = useState(0)
  const [activeTab, setActiveTab] = useState("input")
  const [alternatives, setAlternatives] = useState<TimetableAlternative[]>([])

  // Form state
  const [formData, setFormData] = useState({
    semester: "",
    department: "",
    startDate: "",
    endDate: "",
    workingDays: "5",
    periodsPerDay: "8",
    breakDuration: "15",
    lunchDuration: "60",
  })

  const [constraints, setConstraints] = useState([
    { id: 1, type: "Faculty", description: "No faculty should have more than 6 hours per day", priority: "High" },
    { id: 2, type: "Room", description: "Lab sessions require specific equipment", priority: "Medium" },
    { id: 3, type: "Student", description: "No more than 2 consecutive theory classes", priority: "High" },
  ])

  const handleGenerate = async () => {
    setIsGenerating(true)
    setGenerationProgress(0)
    setActiveTab("results")

    // Simulate generation process
    const steps = [
      "Analyzing constraints...",
      "Processing faculty data...",
      "Optimizing room allocation...",
      "Generating alternatives...",
      "Calculating efficiency scores...",
    ]

    for (let i = 0; i < steps.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setGenerationProgress(((i + 1) / steps.length) * 100)
    }

    // Generate mock alternatives
    const mockAlternatives: TimetableAlternative[] = [
      { id: "1", name: "Optimal Solution", score: 94, conflicts: 0, efficiency: 96, status: "generated" },
      { id: "2", name: "Balanced Approach", score: 89, conflicts: 2, efficiency: 91, status: "generated" },
      { id: "3", name: "Faculty Optimized", score: 87, conflicts: 1, efficiency: 93, status: "generated" },
      { id: "4", name: "Room Efficient", score: 85, conflicts: 3, efficiency: 88, status: "generated" },
      { id: "5", name: "Student Friendly", score: 82, conflicts: 4, efficiency: 85, status: "generated" },
    ]

    setAlternatives(mockAlternatives)
    setIsGenerating(false)
  }

  const addConstraint = () => {
    const newConstraint = {
      id: constraints.length + 1,
      type: "Custom",
      description: "New constraint",
      priority: "Medium",
    }
    setConstraints([...constraints, newConstraint])
  }

  const removeConstraint = (id: number) => {
    setConstraints(constraints.filter((c) => c.id !== id))
  }

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="input">Data Input</TabsTrigger>
          <TabsTrigger value="constraints">Constraints</TabsTrigger>
          <TabsTrigger value="results">Results</TabsTrigger>
        </TabsList>

        <TabsContent value="input" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Basic Configuration
              </CardTitle>
              <CardDescription>Set up the fundamental parameters for timetable generation</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="semester">Semester</Label>
                  <Select
                    value={formData.semester}
                    onValueChange={(value) => setFormData({ ...formData, semester: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select semester" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fall-2024">Fall 2024</SelectItem>
                      <SelectItem value="spring-2025">Spring 2025</SelectItem>
                      <SelectItem value="summer-2025">Summer 2025</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="department">Department</Label>
                  <Select
                    value={formData.department}
                    onValueChange={(value) => setFormData({ ...formData, department: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cs">Computer Science</SelectItem>
                      <SelectItem value="ee">Electrical Engineering</SelectItem>
                      <SelectItem value="me">Mechanical Engineering</SelectItem>
                      <SelectItem value="ce">Civil Engineering</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="startDate">Start Date</Label>
                  <Input
                    id="startDate"
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="endDate">End Date</Label>
                  <Input
                    id="endDate"
                    type="date"
                    value={formData.endDate}
                    onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="workingDays">Working Days per Week</Label>
                  <Select
                    value={formData.workingDays}
                    onValueChange={(value) => setFormData({ ...formData, workingDays: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="5">5 Days</SelectItem>
                      <SelectItem value="6">6 Days</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="periodsPerDay">Periods per Day</Label>
                  <Select
                    value={formData.periodsPerDay}
                    onValueChange={(value) => setFormData({ ...formData, periodsPerDay: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="6">6 Periods</SelectItem>
                      <SelectItem value="7">7 Periods</SelectItem>
                      <SelectItem value="8">8 Periods</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Faculty Data
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span>Total Faculty</span>
                    <Badge variant="secondary">24</Badge>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Available</span>
                    <Badge variant="outline">22</Badge>
                  </div>
                  <Button variant="outline" size="sm" className="w-full bg-transparent">
                    <Plus className="h-4 w-4 mr-2" />
                    Import Faculty
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  Subjects
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span>Total Subjects</span>
                    <Badge variant="secondary">18</Badge>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Theory</span>
                    <Badge variant="outline">12</Badge>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Practical</span>
                    <Badge variant="outline">6</Badge>
                  </div>
                  <Button variant="outline" size="sm" className="w-full bg-transparent">
                    <Plus className="h-4 w-4 mr-2" />
                    Import Subjects
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Classrooms
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span>Total Rooms</span>
                    <Badge variant="secondary">15</Badge>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Lecture Halls</span>
                    <Badge variant="outline">8</Badge>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Labs</span>
                    <Badge variant="outline">7</Badge>
                  </div>
                  <Button variant="outline" size="sm" className="w-full bg-transparent">
                    <Plus className="h-4 w-4 mr-2" />
                    Import Rooms
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="constraints" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5" />
                Optimization Constraints
              </CardTitle>
              <CardDescription>Define rules and restrictions for timetable generation</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {constraints.map((constraint) => (
                  <div key={constraint.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant="outline" className="text-xs">
                          {constraint.type}
                        </Badge>
                        <Badge
                          variant={
                            constraint.priority === "High"
                              ? "destructive"
                              : constraint.priority === "Medium"
                                ? "default"
                                : "secondary"
                          }
                          className="text-xs"
                        >
                          {constraint.priority}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{constraint.description}</p>
                    </div>
                    <Button variant="ghost" size="sm" onClick={() => removeConstraint(constraint.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}

                <Button variant="outline" onClick={addConstraint} className="w-full bg-transparent">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Constraint
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="results" className="space-y-6">
          {isGenerating ? (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5 animate-spin" />
                  Generating Timetables
                </CardTitle>
                <CardDescription>Optimizing schedules based on your constraints</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Progress value={generationProgress} className="w-full" />
                  <p className="text-sm text-muted-foreground text-center">
                    {Math.round(generationProgress)}% Complete
                  </p>
                </div>
              </CardContent>
            </Card>
          ) : alternatives.length > 0 ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Generated Alternatives</h3>
                <Badge variant="secondary">{alternatives.length} Solutions</Badge>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {alternatives.map((alternative, index) => (
                  <Card key={alternative.id} className="hover:shadow-md transition-shadow">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-base">{alternative.name}</CardTitle>
                        {index === 0 && <Star className="h-4 w-4 text-yellow-500 fill-current" />}
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span>Overall Score</span>
                        <Badge
                          variant={
                            alternative.score >= 90 ? "default" : alternative.score >= 80 ? "secondary" : "outline"
                          }
                        >
                          {alternative.score}%
                        </Badge>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Conflicts</span>
                        <Badge variant={alternative.conflicts === 0 ? "default" : "destructive"}>
                          {alternative.conflicts}
                        </Badge>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Efficiency</span>
                        <span className="text-muted-foreground">{alternative.efficiency}%</span>
                      </div>
                      <Separator />
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                          <Download className="h-4 w-4 mr-1" />
                          Export
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ) : (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Clock className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">Ready to Generate</h3>
                <p className="text-muted-foreground text-center mb-6">
                  Configure your parameters and constraints, then start the optimization process
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>

      {/* Generate Button */}
      <div className="flex justify-center">
        <Button onClick={handleGenerate} disabled={isGenerating} size="lg" className="px-8">
          {isGenerating ? (
            <>
              <Clock className="h-4 w-4 mr-2 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Play className="h-4 w-4 mr-2" />
              Start Optimization
            </>
          )}
        </Button>
      </div>
    </div>
  )
}
