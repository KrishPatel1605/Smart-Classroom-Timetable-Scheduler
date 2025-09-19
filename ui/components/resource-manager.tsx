"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Plus,
  Search,
  Edit,
  Trash2,
  Users,
  BookOpen,
  MapPin,
  GraduationCap,
  Filter,
  Download,
  Upload,
  Mail,
  Phone,
} from "lucide-react"

interface Faculty {
  id: string
  name: string
  email: string
  phone: string
  department: string
  designation: string
  maxHours: number
  subjects: string[]
  status: "active" | "inactive"
}

interface Subject {
  id: string
  code: string
  name: string
  type: "theory" | "practical" | "lab"
  credits: number
  hoursPerWeek: number
  department: string
  semester: number
  prerequisites: string[]
}

interface Room {
  id: string
  number: string
  name: string
  type: "classroom" | "laboratory" | "auditorium"
  capacity: number
  building: string
  floor: number
  equipment: string[]
  status: "available" | "maintenance" | "occupied"
}

interface Batch {
  id: string
  name: string
  department: string
  semester: number
  section: string
  strength: number
  classRepresentative: string
  advisor: string
  subjects: string[]
}

export function ResourceManager() {
  const [activeTab, setActiveTab] = useState("faculty")
  const [searchTerm, setSearchTerm] = useState("")
  const [filterDepartment, setFilterDepartment] = useState("all")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [editingItem, setEditingItem] = useState<any>(null)

  // Mock data
  const [faculty, setFaculty] = useState<Faculty[]>([
    {
      id: "1",
      name: "Mr. Vaibhav",
      email: "vaibhav@university.edu",
      phone: "98XXXXXX81",
      department: "Computer Science",
      designation: "Professor",
      maxHours: 20,
      subjects: ["Data Structures", "Algorithms"],
      status: "active",
    },
    {
      id: "2",
      name: "Mrs. Sunita",
      email: "sunita@university.edu",
      phone: "88XXXXXX78",
      department: "Computer Science",
      designation: "Associate Professor",
      maxHours: 18,
      subjects: ["Database Systems", "Software Engineering"],
      status: "active",
    },
    {
      id: "3",
      name: "Mrs. Vijyaya",
      email: "vijyaya@university.edu",
      phone: "81XXXXXX03",
      department: "Electrical Engineering",
      designation: "Assistant Professor",
      maxHours: 16,
      subjects: ["Digital Electronics", "Microprocessors"],
      status: "active",
    },
  ])

  const [subjects, setSubjects] = useState<Subject[]>([
    {
      id: "1",
      code: "CS301",
      name: "Data Structures",
      type: "theory",
      credits: 3,
      hoursPerWeek: 4,
      department: "Computer Science",
      semester: 3,
      prerequisites: ["Programming Fundamentals"],
    },
    {
      id: "2",
      code: "CS302",
      name: "Database Systems",
      type: "theory",
      credits: 3,
      hoursPerWeek: 4,
      department: "Computer Science",
      semester: 3,
      prerequisites: ["Data Structures"],
    },
    {
      id: "3",
      code: "CS303L",
      name: "Programming Lab",
      type: "lab",
      credits: 1,
      hoursPerWeek: 3,
      department: "Computer Science",
      semester: 3,
      prerequisites: [],
    },
  ])

  const [rooms, setRooms] = useState<Room[]>([
    {
      id: "1",
      number: "A-101",
      name: "Computer Science Classroom",
      type: "classroom",
      capacity: 60,
      building: "Academic Block A",
      floor: 1,
      equipment: ["Projector", "Whiteboard", "AC"],
      status: "available",
    },
    {
      id: "2",
      number: "Lab-1",
      name: "Programming Laboratory",
      type: "laboratory",
      capacity: 30,
      building: "Academic Block A",
      floor: 2,
      equipment: ["Computers", "Projector", "AC", "Network"],
      status: "available",
    },
    {
      id: "3",
      number: "AUD-1",
      name: "Main Auditorium",
      type: "auditorium",
      capacity: 200,
      building: "Administrative Block",
      floor: 1,
      equipment: ["Sound System", "Projector", "Stage", "AC"],
      status: "available",
    },
  ])

  const [batches, setBatches] = useState<Batch[]>([
    {
      id: "1",
      name: "CS-3A",
      department: "Computer Science",
      semester: 3,
      section: "A",
      strength: 45,
      classRepresentative: "Satyam Kharde",
      advisor: "Prof. Tanuja",
      subjects: ["Data Structures", "Database Systems", "Programming Lab"],
    },
    {
      id: "2",
      name: "CS-3B",
      department: "Computer Science",
      semester: 3,
      section: "B",
      strength: 42,
      classRepresentative: "Hridoy Chatterjee",
      advisor: "Dr. Sonali%",
      subjects: ["Data Structures", "Database Systems", "Programming Lab"],
    },
  ])

  const departments = ["Computer Science", "Electrical Engineering", "Mechanical Engineering", "Civil Engineering"]

  const handleAdd = (type: string) => {
    setEditingItem(null)
    setIsAddDialogOpen(true)
  }

  const handleEdit = (item: any) => {
    setEditingItem(item)
    setIsAddDialogOpen(true)
  }

  const handleDelete = (type: string, id: string) => {
    switch (type) {
      case "faculty":
        setFaculty(faculty.filter((f) => f.id !== id))
        break
      case "subjects":
        setSubjects(subjects.filter((s) => s.id !== id))
        break
      case "rooms":
        setRooms(rooms.filter((r) => r.id !== id))
        break
      case "batches":
        setBatches(batches.filter((b) => b.id !== id))
        break
    }
  }

  const renderFacultyTable = () => {
    const filteredFaculty = faculty.filter((f) => {
      const matchesSearch =
        f.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        f.email.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesDepartment = filterDepartment === "all" || f.department === filterDepartment
      return matchesSearch && matchesDepartment
    })

    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Department</TableHead>
            <TableHead>Designation</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Max Hours</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredFaculty.map((f) => (
            <TableRow key={f.id}>
              <TableCell className="font-medium">{f.name}</TableCell>
              <TableCell>{f.department}</TableCell>
              <TableCell>{f.designation}</TableCell>
              <TableCell>
                <div className="space-y-1">
                  <div className="flex items-center gap-1 text-sm">
                    <Mail className="h-3 w-3" />
                    {f.email}
                  </div>
                  <div className="flex items-center gap-1 text-sm">
                    <Phone className="h-3 w-3" />
                    {f.phone}
                  </div>
                </div>
              </TableCell>
              <TableCell>{f.maxHours}h/week</TableCell>
              <TableCell>
                <Badge variant={f.status === "active" ? "default" : "secondary"}>{f.status}</Badge>
              </TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm" onClick={() => handleEdit(f)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => handleDelete("faculty", f.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    )
  }

  const renderSubjectsTable = () => {
    const filteredSubjects = subjects.filter((s) => {
      const matchesSearch =
        s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.code.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesDepartment = filterDepartment === "all" || s.department === filterDepartment
      return matchesSearch && matchesDepartment
    })

    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Code</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Credits</TableHead>
            <TableHead>Hours/Week</TableHead>
            <TableHead>Department</TableHead>
            <TableHead>Semester</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredSubjects.map((s) => (
            <TableRow key={s.id}>
              <TableCell className="font-medium">{s.code}</TableCell>
              <TableCell>{s.name}</TableCell>
              <TableCell>
                <Badge variant={s.type === "theory" ? "default" : s.type === "lab" ? "secondary" : "outline"}>
                  {s.type}
                </Badge>
              </TableCell>
              <TableCell>{s.credits}</TableCell>
              <TableCell>{s.hoursPerWeek}</TableCell>
              <TableCell>{s.department}</TableCell>
              <TableCell>{s.semester}</TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm" onClick={() => handleEdit(s)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => handleDelete("subjects", s.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    )
  }

  const renderRoomsTable = () => {
    const filteredRooms = rooms.filter((r) => {
      const matchesSearch =
        r.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.number.toLowerCase().includes(searchTerm.toLowerCase())
      return matchesSearch
    })

    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Room Number</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Capacity</TableHead>
            <TableHead>Building</TableHead>
            <TableHead>Equipment</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredRooms.map((r) => (
            <TableRow key={r.id}>
              <TableCell className="font-medium">{r.number}</TableCell>
              <TableCell>{r.name}</TableCell>
              <TableCell>
                <Badge variant={r.type === "classroom" ? "default" : r.type === "laboratory" ? "secondary" : "outline"}>
                  {r.type}
                </Badge>
              </TableCell>
              <TableCell>{r.capacity}</TableCell>
              <TableCell>
                {r.building}, Floor {r.floor}
              </TableCell>
              <TableCell>
                <div className="flex flex-wrap gap-1">
                  {r.equipment.slice(0, 2).map((eq, idx) => (
                    <Badge key={idx} variant="outline" className="text-xs">
                      {eq}
                    </Badge>
                  ))}
                  {r.equipment.length > 2 && (
                    <Badge variant="outline" className="text-xs">
                      +{r.equipment.length - 2}
                    </Badge>
                  )}
                </div>
              </TableCell>
              <TableCell>
                <Badge
                  variant={
                    r.status === "available" ? "default" : r.status === "maintenance" ? "destructive" : "secondary"
                  }
                >
                  {r.status}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm" onClick={() => handleEdit(r)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => handleDelete("rooms", r.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    )
  }

  const renderBatchesTable = () => {
    const filteredBatches = batches.filter((b) => {
      const matchesSearch = b.name.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesDepartment = filterDepartment === "all" || b.department === filterDepartment
      return matchesSearch && matchesDepartment
    })

    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Batch Name</TableHead>
            <TableHead>Department</TableHead>
            <TableHead>Semester</TableHead>
            <TableHead>Strength</TableHead>
            <TableHead>Class Rep</TableHead>
            <TableHead>Advisor</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredBatches.map((b) => (
            <TableRow key={b.id}>
              <TableCell className="font-medium">{b.name}</TableCell>
              <TableCell>{b.department}</TableCell>
              <TableCell>{b.semester}</TableCell>
              <TableCell>{b.strength}</TableCell>
              <TableCell>{b.classRepresentative}</TableCell>
              <TableCell>{b.advisor}</TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm" onClick={() => handleEdit(b)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => handleDelete("batches", b.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    )
  }

  const renderAddEditDialog = () => (
    <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            {editingItem ? "Edit" : "Add"} {activeTab.slice(0, -1).charAt(0).toUpperCase() + activeTab.slice(1, -1)}
          </DialogTitle>
          <DialogDescription>
            {editingItem ? "Update the details below" : "Fill in the details to add a new item"}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {activeTab === "faculty" && (
            <>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" placeholder="Dr. John Smith" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="john.smith@university.edu" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" placeholder="+1-555-0101" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="department">Department</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent>
                      {departments.map((dept) => (
                        <SelectItem key={dept} value={dept}>
                          {dept}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="designation">Designation</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select designation" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="professor">Professor</SelectItem>
                      <SelectItem value="associate">Associate Professor</SelectItem>
                      <SelectItem value="assistant">Assistant Professor</SelectItem>
                      <SelectItem value="lecturer">Lecturer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="maxHours">Max Hours/Week</Label>
                  <Input id="maxHours" type="number" placeholder="20" />
                </div>
              </div>
            </>
          )}
          {activeTab === "subjects" && (
            <>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="code">Subject Code</Label>
                  <Input id="code" placeholder="CS301" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="name">Subject Name</Label>
                  <Input id="name" placeholder="Data Structures" />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="type">Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="theory">Theory</SelectItem>
                      <SelectItem value="practical">Practical</SelectItem>
                      <SelectItem value="lab">Laboratory</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="credits">Credits</Label>
                  <Input id="credits" type="number" placeholder="3" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="hours">Hours/Week</Label>
                  <Input id="hours" type="number" placeholder="4" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="department">Department</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent>
                      {departments.map((dept) => (
                        <SelectItem key={dept} value={dept}>
                          {dept}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="semester">Semester</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select semester" />
                    </SelectTrigger>
                    <SelectContent>
                      {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
                        <SelectItem key={sem} value={sem.toString()}>
                          Semester {sem}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </>
          )}
        </div>
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
            Cancel
          </Button>
          <Button onClick={() => setIsAddDialogOpen(false)}>{editingItem ? "Update" : "Add"}</Button>
        </div>
      </DialogContent>
    </Dialog>
  )

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex flex-wrap gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search resources..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-64"
            />
          </div>

          {(activeTab === "faculty" || activeTab === "subjects" || activeTab === "batches") && (
            <Select value={filterDepartment} onValueChange={setFilterDepartment}>
              <SelectTrigger className="w-48">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Departments</SelectItem>
                {departments.map((dept) => (
                  <SelectItem key={dept} value={dept}>
                    {dept}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </div>

        <div className="flex gap-2">
          <Button variant="outline" className="bg-transparent">
            <Upload className="h-4 w-4 mr-2" />
            Import
          </Button>
          <Button variant="outline" className="bg-transparent">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button onClick={() => handleAdd(activeTab)}>
            <Plus className="h-4 w-4 mr-2" />
            Add {activeTab.slice(0, -1)}
          </Button>
        </div>
      </div>

      {/* Resource Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="faculty" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Faculty
          </TabsTrigger>
          <TabsTrigger value="subjects" className="flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            Subjects
          </TabsTrigger>
          <TabsTrigger value="rooms" className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            Rooms
          </TabsTrigger>
          <TabsTrigger value="batches" className="flex items-center gap-2">
            <GraduationCap className="h-4 w-4" />
            Batches
          </TabsTrigger>
        </TabsList>

        <TabsContent value="faculty" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Faculty Management
              </CardTitle>
              <CardDescription>Manage faculty members, their details, and teaching assignments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">{renderFacultyTable()}</div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="subjects" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                Subject Management
              </CardTitle>
              <CardDescription>Manage subjects, courses, and their requirements</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">{renderSubjectsTable()}</div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="rooms" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Room Management
              </CardTitle>
              <CardDescription>Manage classrooms, laboratories, and their facilities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">{renderRoomsTable()}</div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="batches" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <GraduationCap className="h-5 w-5" />
                Batch Management
              </CardTitle>
              <CardDescription>Manage student batches, sections, and their details</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">{renderBatchesTable()}</div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Users className="h-8 w-8 text-chart-1" />
              <div>
                <p className="text-2xl font-bold">{faculty.length}</p>
                <p className="text-sm text-muted-foreground">Faculty Members</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <BookOpen className="h-8 w-8 text-chart-2" />
              <div>
                <p className="text-2xl font-bold">{subjects.length}</p>
                <p className="text-sm text-muted-foreground">Subjects</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <MapPin className="h-8 w-8 text-chart-3" />
              <div>
                <p className="text-2xl font-bold">{rooms.length}</p>
                <p className="text-sm text-muted-foreground">Rooms</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <GraduationCap className="h-8 w-8 text-chart-4" />
              <div>
                <p className="text-2xl font-bold">{batches.length}</p>
                <p className="text-sm text-muted-foreground">Batches</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {renderAddEditDialog()}
    </div>
  )
}
