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
import { Switch } from "@/components/ui/switch"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Users, Shield, Plus, Search, Edit, Trash2, Mail, Key, UserCheck, UserX, Clock, Activity } from "lucide-react"

interface User {
  id: string
  name: string
  email: string
  phone: string
  role: "admin" | "department_head" | "faculty" | "coordinator" | "student"
  department: string
  status: "active" | "inactive" | "pending"
  lastLogin: string
  createdAt: string
  permissions: string[]
  avatar?: string
}

interface Role {
  id: string
  name: string
  description: string
  permissions: string[]
  userCount: number
}

interface Permission {
  id: string
  name: string
  description: string
  category: string
}

export function UserManagement() {
  const [activeTab, setActiveTab] = useState("users")
  const [searchTerm, setSearchTerm] = useState("")
  const [filterRole, setFilterRole] = useState("all")
  const [filterStatus, setFilterStatus] = useState("all")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [editingItem, setEditingItem] = useState<any>(null)

  const permissions: Permission[] = [
    { id: "view_dashboard", name: "View Dashboard", description: "Access to main dashboard", category: "General" },
    {
      id: "manage_timetables",
      name: "Manage Timetables",
      description: "Create and edit timetables",
      category: "Timetable",
    },
    {
      id: "view_analytics",
      name: "View Analytics",
      description: "Access analytics and reports",
      category: "Analytics",
    },
    { id: "manage_faculty", name: "Manage Faculty", description: "Add, edit, delete faculty", category: "Resources" },
    {
      id: "manage_subjects",
      name: "Manage Subjects",
      description: "Add, edit, delete subjects",
      category: "Resources",
    },
    { id: "manage_rooms", name: "Manage Rooms", description: "Add, edit, delete rooms", category: "Resources" },
    { id: "manage_users", name: "Manage Users", description: "User administration", category: "Administration" },
    {
      id: "system_settings",
      name: "System Settings",
      description: "Configure system settings",
      category: "Administration",
    },
  ]

  const roles: Role[] = [
    {
      id: "admin",
      name: "System Administrator",
      description: "Full system access and control",
      permissions: permissions.map((p) => p.id),
      userCount: 2,
    },
    {
      id: "department_head",
      name: "Department Head",
      description: "Manage department resources and timetables",
      permissions: ["view_dashboard", "manage_timetables", "view_analytics", "manage_faculty", "manage_subjects"],
      userCount: 4,
    },
    {
      id: "faculty",
      name: "Faculty Member",
      description: "View timetables and basic analytics",
      permissions: ["view_dashboard", "view_analytics"],
      userCount: 24,
    },
    {
      id: "coordinator",
      name: "Academic Coordinator",
      description: "Coordinate academic activities and schedules",
      permissions: ["view_dashboard", "manage_timetables", "view_analytics", "manage_rooms"],
      userCount: 6,
    },
    {
      id: "student",
      name: "Student",
      description: "View personal timetables and schedules",
      permissions: ["view_dashboard"],
      userCount: 450,
    },
  ]

  const [users, setUsers] = useState<User[]>([
    {
      id: "1",
      name: "John Admin",
      email: "admin@university.edu",
      phone: "+1-555-0001",
      role: "admin",
      department: "Administration",
      status: "active",
      lastLogin: "2024-01-15 09:30",
      createdAt: "2023-08-01",
      permissions: permissions.map((p) => p.id),
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "2",
      name: "Dr. Sarah Wilson",
      email: "sarah.wilson@university.edu",
      phone: "+1-555-0002",
      role: "department_head",
      department: "Computer Science",
      status: "active",
      lastLogin: "2024-01-15 08:45",
      createdAt: "2023-08-15",
      permissions: ["view_dashboard", "manage_timetables", "view_analytics", "manage_faculty", "manage_subjects"],
    },
    {
      id: "3",
      name: "Prof. Michael Brown",
      email: "michael.brown@university.edu",
      phone: "+1-555-0003",
      role: "faculty",
      department: "Computer Science",
      status: "active",
      lastLogin: "2024-01-14 16:20",
      createdAt: "2023-09-01",
      permissions: ["view_dashboard", "view_analytics"],
    },
    {
      id: "4",
      name: "Alice Coordinator",
      email: "alice.coord@university.edu",
      phone: "+1-555-0004",
      role: "coordinator",
      department: "Academic Affairs",
      status: "active",
      lastLogin: "2024-01-15 07:15",
      createdAt: "2023-08-20",
      permissions: ["view_dashboard", "manage_timetables", "view_analytics", "manage_rooms"],
    },
    {
      id: "5",
      name: "Bob Student",
      email: "bob.student@university.edu",
      phone: "+1-555-0005",
      role: "student",
      department: "Computer Science",
      status: "pending",
      lastLogin: "Never",
      createdAt: "2024-01-10",
      permissions: ["view_dashboard"],
    },
  ])

  const handleAddUser = () => {
    setEditingItem(null)
    setIsAddDialogOpen(true)
  }

  const handleEditUser = (user: User) => {
    setEditingItem(user)
    setIsAddDialogOpen(true)
  }

  const handleDeleteUser = (id: string) => {
    setUsers(users.filter((u) => u.id !== id))
  }

  const handleToggleUserStatus = (id: string) => {
    setUsers(users.map((u) => (u.id === id ? { ...u, status: u.status === "active" ? "inactive" : "active" } : u)))
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  const getRoleColor = (role: string) => {
    switch (role) {
      case "admin":
        return "bg-red-100 text-red-800 border-red-200"
      case "department_head":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "faculty":
        return "bg-green-100 text-green-800 border-green-200"
      case "coordinator":
        return "bg-purple-100 text-purple-800 border-purple-200"
      case "student":
        return "bg-gray-100 text-gray-800 border-gray-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const renderUsersTable = () => {
    const filteredUsers = users.filter((user) => {
      const matchesSearch =
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesRole = filterRole === "all" || user.role === filterRole
      const matchesStatus = filterStatus === "all" || user.status === filterStatus
      return matchesSearch && matchesRole && matchesStatus
    })

    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>User</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Department</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Last Login</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredUsers.map((user) => (
            <TableRow key={user.id}>
              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user.avatar || "/placeholder.svg"} />
                    <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{user.name}</div>
                    <div className="text-sm text-muted-foreground flex items-center gap-1">
                      <Mail className="h-3 w-3" />
                      {user.email}
                    </div>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <Badge className={getRoleColor(user.role)}>
                  {roles.find((r) => r.id === user.role)?.name || user.role}
                </Badge>
              </TableCell>
              <TableCell>{user.department}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Badge
                    variant={
                      user.status === "active" ? "default" : user.status === "inactive" ? "secondary" : "outline"
                    }
                  >
                    {user.status}
                  </Badge>
                  <Switch
                    checked={user.status === "active"}
                    onCheckedChange={() => handleToggleUserStatus(user.id)}
                    size="sm"
                  />
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-1 text-sm">
                  <Clock className="h-3 w-3" />
                  {user.lastLogin}
                </div>
              </TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm" onClick={() => handleEditUser(user)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => handleDeleteUser(user.id)}>
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

  const renderRolesTable = () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Role Name</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Users</TableHead>
          <TableHead>Permissions</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {roles.map((role) => (
          <TableRow key={role.id}>
            <TableCell className="font-medium">{role.name}</TableCell>
            <TableCell>{role.description}</TableCell>
            <TableCell>
              <Badge variant="secondary">{role.userCount}</Badge>
            </TableCell>
            <TableCell>
              <Badge variant="outline">{role.permissions.length} permissions</Badge>
            </TableCell>
            <TableCell>
              <div className="flex gap-2">
                <Button variant="ghost" size="sm">
                  <Edit className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )

  const renderPermissionsGrid = () => {
    const categories = [...new Set(permissions.map((p) => p.category))]

    return (
      <div className="space-y-6">
        {categories.map((category) => (
          <Card key={category}>
            <CardHeader>
              <CardTitle className="text-lg">{category}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {permissions
                  .filter((p) => p.category === category)
                  .map((permission) => (
                    <div key={permission.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <div className="font-medium">{permission.name}</div>
                        <div className="text-sm text-muted-foreground">{permission.description}</div>
                      </div>
                      <Switch />
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  const renderActivityLog = () => {
    const activities = [
      { id: 1, user: "John Admin", action: "Created new user", target: "Bob Student", time: "2 hours ago" },
      {
        id: 2,
        user: "Dr. Sarah Wilson",
        action: "Updated role permissions",
        target: "Faculty Role",
        time: "4 hours ago",
      },
      { id: 3, user: "Alice Coordinator", action: "Deactivated user", target: "Old Faculty", time: "1 day ago" },
      { id: 4, user: "John Admin", action: "Modified system settings", target: "User Permissions", time: "2 days ago" },
      { id: 5, user: "Dr. Sarah Wilson", action: "Bulk imported users", target: "25 new students", time: "3 days ago" },
    ]

    return (
      <div className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-center gap-4 p-4 border rounded-lg">
            <Activity className="h-5 w-5 text-muted-foreground" />
            <div className="flex-1">
              <div className="font-medium">
                {activity.user} {activity.action.toLowerCase()}
              </div>
              <div className="text-sm text-muted-foreground">
                Target: {activity.target} • {activity.time}
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  const renderAddEditDialog = () => (
    <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{editingItem ? "Edit User" : "Add New User"}</DialogTitle>
          <DialogDescription>
            {editingItem ? "Update user details and permissions" : "Create a new user account"}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" placeholder="John Doe" defaultValue={editingItem?.name} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="john.doe@university.edu" defaultValue={editingItem?.email} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input id="phone" placeholder="+1-555-0000" defaultValue={editingItem?.phone} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="department">Department</Label>
              <Select defaultValue={editingItem?.department}>
                <SelectTrigger>
                  <SelectValue placeholder="Select department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Computer Science">Computer Science</SelectItem>
                  <SelectItem value="Electrical Engineering">Electrical Engineering</SelectItem>
                  <SelectItem value="Mechanical Engineering">Mechanical Engineering</SelectItem>
                  <SelectItem value="Administration">Administration</SelectItem>
                  <SelectItem value="Academic Affairs">Academic Affairs</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="role">Role</Label>
            <Select defaultValue={editingItem?.role}>
              <SelectTrigger>
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
              <SelectContent>
                {roles.map((role) => (
                  <SelectItem key={role.id} value={role.id}>
                    {role.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
            Cancel
          </Button>
          <Button onClick={() => setIsAddDialogOpen(false)}>{editingItem ? "Update User" : "Create User"}</Button>
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
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-64"
            />
          </div>

          <Select value={filterRole} onValueChange={setFilterRole}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Filter by role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Roles</SelectItem>
              {roles.map((role) => (
                <SelectItem key={role.id} value={role.id}>
                  {role.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button onClick={handleAddUser}>
          <Plus className="h-4 w-4 mr-2" />
          Add User
        </Button>
      </div>

      {/* User Management Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="users" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Users
          </TabsTrigger>
          <TabsTrigger value="roles" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            Roles
          </TabsTrigger>
          <TabsTrigger value="permissions" className="flex items-center gap-2">
            <Key className="h-4 w-4" />
            Permissions
          </TabsTrigger>
          <TabsTrigger value="activity" className="flex items-center gap-2">
            <Activity className="h-4 w-4" />
            Activity Log
          </TabsTrigger>
        </TabsList>

        <TabsContent value="users" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                User Management
              </CardTitle>
              <CardDescription>Manage user accounts, roles, and permissions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">{renderUsersTable()}</div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="roles" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Role Management
              </CardTitle>
              <CardDescription>Define roles and their associated permissions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">{renderRolesTable()}</div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="permissions" className="space-y-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold">System Permissions</h3>
              <p className="text-sm text-muted-foreground">Configure available permissions for roles</p>
            </div>
            <Button variant="outline" className="bg-transparent">
              <Plus className="h-4 w-4 mr-2" />
              Add Permission
            </Button>
          </div>
          {renderPermissionsGrid()}
        </TabsContent>

        <TabsContent value="activity" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Activity Log
              </CardTitle>
              <CardDescription>Recent user management activities and system changes</CardDescription>
            </CardHeader>
            <CardContent>{renderActivityLog()}</CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <UserCheck className="h-8 w-8 text-green-600" />
              <div>
                <p className="text-2xl font-bold">{users.filter((u) => u.status === "active").length}</p>
                <p className="text-sm text-muted-foreground">Active Users</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <UserX className="h-8 w-8 text-red-600" />
              <div>
                <p className="text-2xl font-bold">{users.filter((u) => u.status === "inactive").length}</p>
                <p className="text-sm text-muted-foreground">Inactive Users</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Clock className="h-8 w-8 text-yellow-600" />
              <div>
                <p className="text-2xl font-bold">{users.filter((u) => u.status === "pending").length}</p>
                <p className="text-sm text-muted-foreground">Pending Approval</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Shield className="h-8 w-8 text-blue-600" />
              <div>
                <p className="text-2xl font-bold">{roles.length}</p>
                <p className="text-sm text-muted-foreground">System Roles</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {renderAddEditDialog()}
    </div>
  )
}
