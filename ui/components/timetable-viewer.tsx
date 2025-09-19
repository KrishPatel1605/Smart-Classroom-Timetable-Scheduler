"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Calendar, Clock, Users, MapPin, BookOpen, AlertTriangle, Search, Download, Edit, Save } from "lucide-react"

interface TimeSlot {
  id: string
  time: string
  period: number
}

interface ClassSession {
  id: string
  subject: string
  faculty: string
  room: string
  type: "theory" | "practical" | "lab"
  duration: number
  color: string
  conflicts?: string[]
}

interface TimetableCell {
  timeSlot: TimeSlot
  day: string
  session?: ClassSession
}

export function TimetableViewer() {
  const [viewMode, setViewMode] = useState("week")
  const [selectedDepartment, setSelectedDepartment] = useState("cs")
  const [selectedBatch, setSelectedBatch] = useState("cs-3a")
  const [editMode, setEditMode] = useState(false)
  const [draggedSession, setDraggedSession] = useState<ClassSession | null>(null)
  const [searchTerm, setSearchTerm] = useState("")

  const timeSlots: TimeSlot[] = [
    { id: "1", time: "09:00-10:00", period: 1 },
    { id: "2", time: "10:00-11:00", period: 2 },
    { id: "3", time: "11:15-12:15", period: 3 },
    { id: "4", time: "12:15-13:15", period: 4 },
    { id: "5", time: "14:15-15:15", period: 5 },
    { id: "6", time: "15:15-16:15", period: 6 },
    { id: "7", time: "16:30-17:30", period: 7 },
    { id: "8", time: "17:30-18:30", period: 8 },
  ]

  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]

  const mockTimetable: { [key: string]: ClassSession } = {
    "Monday-1": {
      id: "m1",
      subject: "Data Structures",
      faculty: "Mrs. Vijyaya",
      room: "A-101",
      type: "theory",
      duration: 1,
      color: "bg-blue-100 text-blue-800 border-blue-200",
    },
    "Monday-2": {
      id: "m2",
      subject: "Database Systems",
      faculty: "Mrs. Sunita",
      room: "A-102",
      type: "theory",
      duration: 1,
      color: "bg-green-100 text-green-800 border-green-200",
    },
    "Monday-5": {
      id: "m5",
      subject: "Programming Lab",
      faculty: "Dr. Rakshita",
      room: "Lab-1",
      type: "lab",
      duration: 2,
      color: "bg-purple-100 text-purple-800 border-purple-200",
    },
    "Tuesday-1": {
      id: "t1",
      subject: "Algorithms",
      faculty: "Prof. Tanuja",
      room: "A-103",
      type: "theory",
      duration: 1,
      color: "bg-orange-100 text-orange-800 border-orange-200",
    },
    "Tuesday-3": {
      id: "t3",
      subject: "Software Engineering",
      faculty: "Dr. Sonali",
      room: "A-104",
      type: "theory",
      duration: 1,
      color: "bg-red-100 text-red-800 border-red-200",
      conflicts: ["Room conflict with CS-3B"],
    },
    "Wednesday-2": {
      id: "w2",
      subject: "Computer Networks",
      faculty: "Mr. Vaibhav",
      room: "A-105",
      type: "theory",
      duration: 1,
      color: "bg-teal-100 text-teal-800 border-teal-200",
    },
    "Thursday-1": {
      id: "th1",
      subject: "Operating Systems",
      faculty: "Dr. Rakshita",
      room: "A-106",
      type: "theory",
      duration: 1,
      color: "bg-indigo-100 text-indigo-800 border-indigo-200",
    },
    "Friday-4": {
      id: "f4",
      subject: "Database Lab",
      faculty: "Mrs. Sunita",
      room: "Lab-2",
      type: "lab",
      duration: 2,
      color: "bg-pink-100 text-pink-800 border-pink-200",
    },
  }

  const handleDragStart = (session: ClassSession) => {
    if (!editMode) return
    setDraggedSession(session)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const handleDrop = (day: string, timeSlot: TimeSlot) => {
    if (!editMode || !draggedSession) return

    // Remove from old position
    const oldKey = Object.keys(mockTimetable).find((key) => mockTimetable[key].id === draggedSession.id)
    if (oldKey) {
      delete mockTimetable[oldKey]
    }

    // Add to new position
    const newKey = `${day}-${timeSlot.period}`
    mockTimetable[newKey] = draggedSession

    setDraggedSession(null)
  }

  const renderTimetableCell = (day: string, timeSlot: TimeSlot) => {
    const key = `${day}-${timeSlot.period}`
    const session = mockTimetable[key]

    return (
      <div
        key={key}
        className="h-16 border border-border p-1 relative"
        onDragOver={handleDragOver}
        onDrop={() => handleDrop(day, timeSlot)}
      >
        {session ? (
          <div
            className={`h-full w-full rounded p-2 cursor-pointer border ${session.color} ${
              editMode ? "cursor-move" : ""
            }`}
            draggable={editMode}
            onDragStart={() => handleDragStart(session)}
          >
            <div className="text-xs font-medium truncate">{session.subject}</div>
            <div className="text-xs text-muted-foreground truncate">{session.faculty}</div>
            <div className="text-xs text-muted-foreground truncate">{session.room}</div>
            {session.conflicts && <AlertTriangle className="absolute top-1 right-1 h-3 w-3 text-destructive" />}
          </div>
        ) : (
          <div className="h-full w-full rounded border-2 border-dashed border-muted-foreground/20 flex items-center justify-center">
            {editMode && <span className="text-xs text-muted-foreground">Drop here</span>}
          </div>
        )}
      </div>
    )
  }

  const renderWeekView = () => (
    <div className="overflow-x-auto">
      <div className="min-w-[800px]">
        <div className="grid grid-cols-6 gap-0 border border-border">
          {/* Header */}
          <div className="bg-muted p-3 border-r border-border font-medium">Time</div>
          {days.map((day) => (
            <div key={day} className="bg-muted p-3 border-r border-border font-medium text-center">
              {day}
            </div>
          ))}

          {/* Time slots */}
          {timeSlots.map((timeSlot) => (
            <>
              <div key={`time-${timeSlot.id}`} className="bg-muted/50 p-3 border-r border-t border-border text-sm">
                <div className="font-medium">{timeSlot.time}</div>
                <div className="text-xs text-muted-foreground">Period {timeSlot.period}</div>
              </div>
              {days.map((day) => (
                <div key={`${day}-${timeSlot.id}`} className="border-r border-t border-border">
                  {renderTimetableCell(day, timeSlot)}
                </div>
              ))}
            </>
          ))}
        </div>
      </div>
    </div>
  )

  const renderDayView = () => {
    const selectedDay = "Monday" // This would be dynamic
    return (
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">{selectedDay} Schedule</h3>
        <div className="space-y-2">
          {timeSlots.map((timeSlot) => {
            const session = mockTimetable[`${selectedDay}-${timeSlot.period}`]
            return (
              <div key={timeSlot.id} className="flex items-center gap-4 p-3 border rounded-lg">
                <div className="w-24 text-sm font-medium">{timeSlot.time}</div>
                {session ? (
                  <div className={`flex-1 p-3 rounded border ${session.color}`}>
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">{session.subject}</div>
                        <div className="text-sm text-muted-foreground">
                          {session.faculty} • {session.room}
                        </div>
                      </div>
                      <Badge variant="outline">{session.type}</Badge>
                    </div>
                  </div>
                ) : (
                  <div className="flex-1 p-3 border-2 border-dashed border-muted-foreground/20 rounded text-center text-muted-foreground">
                    Free Period
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  const renderFacultyView = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {["Mrs. Sunita", "Prof. Vijya", "Dr. Sonali", "Mr. Vaibhav", "Prof. Tanuja", "Dr. Rakshita"].map((faculty) => (
          <Card key={faculty}>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">{faculty}</CardTitle>
              <CardDescription>Weekly Schedule</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Total Hours</span>
                  <Badge variant="secondary">18h</Badge>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Free Periods</span>
                  <Badge variant="outline">12</Badge>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Subjects</span>
                  <Badge variant="outline">3</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )

  const renderRoomView = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {["A-101", "A-102", "A-103", "Lab-1", "Lab-2", "A-104"].map((room) => (
          <Card key={room}>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">{room}</CardTitle>
              <CardDescription>Room Utilization</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Utilization</span>
                  <Badge variant="secondary">75%</Badge>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Capacity</span>
                  <Badge variant="outline">60</Badge>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Type</span>
                  <Badge variant="outline">{room.includes("Lab") ? "Laboratory" : "Classroom"}</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex flex-wrap gap-3">
          <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="cs">Computer Science</SelectItem>
              <SelectItem value="ee">Electrical Engineering</SelectItem>
              <SelectItem value="me">Mechanical Engineering</SelectItem>
            </SelectContent>
          </Select>

          <Select value={selectedBatch} onValueChange={setSelectedBatch}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="cs-3a">CS-3A</SelectItem>
              <SelectItem value="cs-3b">CS-3B</SelectItem>
              <SelectItem value="cs-4a">CS-4A</SelectItem>
            </SelectContent>
          </Select>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search sessions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-48"
            />
          </div>
        </div>

        <div className="flex gap-2">
          <Button
            variant={editMode ? "default" : "outline"}
            size="sm"
            onClick={() => setEditMode(!editMode)}
            className="bg-transparent"
          >
            {editMode ? <Save className="h-4 w-4 mr-2" /> : <Edit className="h-4 w-4 mr-2" />}
            {editMode ? "Save Changes" : "Edit Mode"}
          </Button>
          <Button variant="outline" size="sm" className="bg-transparent">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* View Tabs */}
      <Tabs value={viewMode} onValueChange={setViewMode}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="week">Week View</TabsTrigger>
          <TabsTrigger value="day">Day View</TabsTrigger>
          <TabsTrigger value="faculty">Faculty View</TabsTrigger>
          <TabsTrigger value="room">Room View</TabsTrigger>
          <TabsTrigger value="batch">Batch View</TabsTrigger>
        </TabsList>

        <TabsContent value="week" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Weekly Timetable - {selectedBatch.toUpperCase()}
              </CardTitle>
              <CardDescription>
                {editMode ? "Drag and drop sessions to reschedule" : "View weekly schedule"}
              </CardDescription>
            </CardHeader>
            <CardContent>{renderWeekView()}</CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="day" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Daily Schedule
              </CardTitle>
            </CardHeader>
            <CardContent>{renderDayView()}</CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="faculty" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Faculty Schedules
              </CardTitle>
              <CardDescription>View individual faculty timetables and workload</CardDescription>
            </CardHeader>
            <CardContent>{renderFacultyView()}</CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="room" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Room Utilization
              </CardTitle>
              <CardDescription>Monitor classroom and laboratory usage</CardDescription>
            </CardHeader>
            <CardContent>{renderRoomView()}</CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="batch" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                Batch Schedules
              </CardTitle>
              <CardDescription>Compare schedules across different batches</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {["CS-3A", "CS-3B", "CS-4A", "CS-4B", "EE-3A", "ME-3A"].map((batch) => (
                  <Card key={batch}>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base">{batch}</CardTitle>
                      <CardDescription>Batch Schedule Overview</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Total Hours</span>
                          <Badge variant="secondary">30h</Badge>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Free Periods</span>
                          <Badge variant="outline">10</Badge>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Conflicts</span>
                          <Badge variant={batch === "CS-3B" ? "destructive" : "default"}>
                            {batch === "CS-3B" ? "1" : "0"}
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Conflicts Alert */}
      {Object.values(mockTimetable).some((session) => session.conflicts) && (
        <Card className="border-destructive">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-destructive">
              <AlertTriangle className="h-5 w-5" />
              Schedule Conflicts Detected
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {Object.entries(mockTimetable)
                .filter(([, session]) => session.conflicts)
                .map(([key, session]) => (
                  <div key={key} className="flex items-center justify-between p-2 bg-destructive/10 rounded">
                    <div>
                      <span className="font-medium">{session.subject}</span>
                      <span className="text-sm text-muted-foreground ml-2">{session.conflicts?.[0]}</span>
                    </div>
                    <Button variant="outline" size="sm" className="bg-transparent">
                      Resolve
                    </Button>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
