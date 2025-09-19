"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Area,
  AreaChart,
} from "recharts"
import {
  TrendingUp,
  TrendingDown,
  Users,
  MapPin,
  Clock,
  AlertTriangle,
  CheckCircle,
  BarChart3,
  Calendar,
  Target,
  Lightbulb,
} from "lucide-react"

export function AnalyticsCenter() {
  const [selectedPeriod, setSelectedPeriod] = useState("week")
  const [selectedDepartment, setSelectedDepartment] = useState("all")

  // Mock data for charts
  const facultyWorkloadData = [
    { name: "Mrs. Sunita", hours: 18, maxHours: 20, efficiency: 90 },
    { name: "Prof. Vijya", hours: 22, maxHours: 20, efficiency: 85 },
    { name: "Dr. Sonali", hours: 16, maxHours: 20, efficiency: 95 },
    { name: "Mr. Vaibhav", hours: 20, maxHours: 20, efficiency: 88 },
    { name: "Prof. Tanuja", hours: 19, maxHours: 20, efficiency: 92 },
    { name: "Dr. Rakshita", hours: 15, maxHours: 20, efficiency: 87 },
  ]

  const roomUtilizationData = [
    { name: "A-101", utilization: 85, capacity: 60, type: "Classroom" },
    { name: "A-102", utilization: 78, capacity: 60, type: "Classroom" },
    { name: "A-103", utilization: 92, capacity: 50, type: "Classroom" },
    { name: "Lab-1", utilization: 95, capacity: 30, type: "Laboratory" },
    { name: "Lab-2", utilization: 88, capacity: 30, type: "Laboratory" },
    { name: "A-104", utilization: 65, capacity: 80, type: "Classroom" },
  ]

  const weeklyTrendsData = [
    { day: "Mon", conflicts: 2, efficiency: 88, satisfaction: 85 },
    { day: "Tue", conflicts: 1, efficiency: 92, satisfaction: 89 },
    { day: "Wed", conflicts: 3, efficiency: 85, satisfaction: 82 },
    { day: "Thu", conflicts: 0, efficiency: 95, satisfaction: 94 },
    { day: "Fri", conflicts: 1, efficiency: 90, satisfaction: 88 },
  ]

  const departmentDistribution = [
    { name: "Computer Science", value: 35, color: "#3b82f6" },
    { name: "Electrical Eng.", value: 25, color: "#10b981" },
    { name: "Mechanical Eng.", value: 20, color: "#f59e0b" },
    { name: "Civil Engineering", value: 15, color: "#ef4444" },
    { name: "Others", value: 5, color: "#8b5cf6" },
  ]

  const optimizationSuggestions = [
    {
      id: 1,
      type: "Faculty Overload",
      priority: "High",
      description: "Dr. Rakshita has 22 hours/week (exceeds 20h limit)",
      impact: "Reduce faculty stress, improve teaching quality",
      action: "Redistribute 2 hours to Dr. Sonali",
    },
    {
      id: 2,
      type: "Room Underutilization",
      priority: "Medium",
      description: "Room A-104 only 65% utilized despite 80-seat capacity",
      impact: "Better space utilization, cost efficiency",
      action: "Move large classes from smaller rooms",
    },
    {
      id: 3,
      type: "Schedule Gap",
      priority: "Low",
      description: "CS-3A has 2-hour gap between morning classes",
      impact: "Improved student experience",
      action: "Reschedule Database Systems to 11:00 AM",
    },
    {
      id: 4,
      type: "Lab Congestion",
      priority: "High",
      description: "Programming Lab at 95% capacity during peak hours",
      impact: "Equipment availability, student learning",
      action: "Split lab sessions or add evening slots",
    },
  ]

  const kpiMetrics = [
    {
      title: "Overall Efficiency",
      value: "91%",
      change: "+3%",
      trend: "up",
      icon: Target,
      description: "System optimization score",
    },
    {
      title: "Faculty Satisfaction",
      value: "87%",
      change: "+5%",
      trend: "up",
      icon: Users,
      description: "Based on workload balance",
    },
    {
      title: "Room Utilization",
      value: "83%",
      change: "-2%",
      trend: "down",
      icon: MapPin,
      description: "Average across all rooms",
    },
    {
      title: "Schedule Conflicts",
      value: "7",
      change: "-12",
      trend: "up",
      icon: AlertTriangle,
      description: "Active conflicts detected",
    },
  ]

  const renderKPICards = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {kpiMetrics.map((metric, index) => {
        const Icon = metric.icon
        const isPositive = metric.trend === "up"
        const changeColor = isPositive ? "text-green-600" : "text-red-600"

        return (
          <Card key={index} className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
              <Icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metric.value}</div>
              <p className="text-xs text-muted-foreground">{metric.description}</p>
              <div className="flex items-center pt-1">
                <span className={`text-xs font-medium ${changeColor}`}>
                  {isPositive ? (
                    <TrendingUp className="inline h-3 w-3 mr-1" />
                  ) : (
                    <TrendingDown className="inline h-3 w-3 mr-1" />
                  )}
                  {metric.change}
                </span>
                <span className="text-xs text-muted-foreground ml-1">from last week</span>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )

  const renderFacultyAnalytics = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Faculty Workload Distribution
          </CardTitle>
          <CardDescription>Weekly teaching hours and efficiency metrics</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={facultyWorkloadData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="hours" fill="hsl(var(--chart-1))" name="Teaching Hours" />
              <Bar dataKey="maxHours" fill="hsl(var(--chart-2))" name="Max Hours" opacity={0.3} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Faculty Efficiency Scores</CardTitle>
            <CardDescription>Based on workload balance and student feedback</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {facultyWorkloadData.map((faculty, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>{faculty.name}</span>
                    <span className="font-medium">{faculty.efficiency}%</span>
                  </div>
                  <Progress value={faculty.efficiency} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Workload Alerts</CardTitle>
            <CardDescription>Faculty requiring attention</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-red-50 dark:bg-red-950/20 rounded-lg">
                <AlertTriangle className="h-4 w-4 text-red-600" />
                <div className="flex-1">
                  <p className="text-sm font-medium">Dr. Rakshita - Overloaded</p>
                  <p className="text-xs text-muted-foreground">22h/week (exceeds 20h limit)</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-yellow-50 dark:bg-yellow-950/20 rounded-lg">
                <Clock className="h-4 w-4 text-yellow-600" />
                <div className="flex-1">
                  <p className="text-sm font-medium">Prof. Tanuja - Underutilized</p>
                  <p className="text-xs text-muted-foreground">15h/week (can take 5h more)</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-950/20 rounded-lg">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <div className="flex-1">
                  <p className="text-sm font-medium">4 faculty members optimal</p>
                  <p className="text-xs text-muted-foreground">Within recommended workload</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )

  const renderRoomAnalytics = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Room Utilization Heatmap
          </CardTitle>
          <CardDescription>Classroom and laboratory usage patterns</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={roomUtilizationData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="utilization" fill="hsl(var(--chart-3))" name="Utilization %" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Room Categories</CardTitle>
            <CardDescription>Distribution by room type</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={[
                    { name: "Classrooms", value: 60, fill: "hsl(var(--chart-1))" },
                    { name: "Laboratories", value: 40, fill: "hsl(var(--chart-2))" },
                  ]}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={80}
                  dataKey="value"
                />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Capacity vs Usage</CardTitle>
            <CardDescription>Room efficiency analysis</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {roomUtilizationData.map((room, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>{room.name}</span>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">
                        {room.capacity} seats
                      </Badge>
                      <span className="font-medium">{room.utilization}%</span>
                    </div>
                  </div>
                  <Progress value={room.utilization} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )

  const renderTrendsAnalytics = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Weekly Performance Trends
          </CardTitle>
          <CardDescription>System efficiency and satisfaction over time</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={weeklyTrendsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="efficiency" stroke="hsl(var(--chart-1))" name="Efficiency %" />
              <Line type="monotone" dataKey="satisfaction" stroke="hsl(var(--chart-2))" name="Satisfaction %" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Department Load Distribution</CardTitle>
            <CardDescription>Teaching hours by department</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={departmentDistribution}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}%`}
                >
                  {departmentDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Conflict Resolution</CardTitle>
            <CardDescription>Daily conflict tracking</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={weeklyTrendsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="conflicts"
                  stroke="hsl(var(--destructive))"
                  fill="hsl(var(--destructive))"
                  fillOpacity={0.3}
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  )

  const renderOptimizationSuggestions = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5" />
            AI-Powered Optimization Suggestions
          </CardTitle>
          <CardDescription>Intelligent recommendations to improve your timetable</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {optimizationSuggestions.map((suggestion) => (
              <div key={suggestion.id} className="border rounded-lg p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Badge
                      variant={
                        suggestion.priority === "High"
                          ? "destructive"
                          : suggestion.priority === "Medium"
                            ? "default"
                            : "secondary"
                      }
                    >
                      {suggestion.priority}
                    </Badge>
                    <span className="font-medium">{suggestion.type}</span>
                  </div>
                  <Button variant="outline" size="sm" className="bg-transparent">
                    Apply Fix
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground">{suggestion.description}</p>
                <div className="bg-muted/50 p-3 rounded">
                  <p className="text-sm font-medium mb-1">Recommended Action:</p>
                  <p className="text-sm">{suggestion.action}</p>
                </div>
                <div className="bg-green-50 dark:bg-green-950/20 p-3 rounded">
                  <p className="text-sm font-medium mb-1 text-green-800 dark:text-green-200">Expected Impact:</p>
                  <p className="text-sm text-green-700 dark:text-green-300">{suggestion.impact}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex gap-3">
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
              <SelectItem value="semester">Semester</SelectItem>
            </SelectContent>
          </Select>

          <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Departments</SelectItem>
              <SelectItem value="cs">Computer Science</SelectItem>
              <SelectItem value="ee">Electrical Engineering</SelectItem>
              <SelectItem value="me">Mechanical Engineering</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button variant="outline" className="bg-transparent">
          <Calendar className="h-4 w-4 mr-2" />
          Export Report
        </Button>
      </div>

      {/* KPI Cards */}
      {renderKPICards()}

      {/* Analytics Tabs */}
      <Tabs defaultValue="faculty" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="faculty">Faculty Analytics</TabsTrigger>
          <TabsTrigger value="rooms">Room Analytics</TabsTrigger>
          <TabsTrigger value="trends">Trends & Insights</TabsTrigger>
          <TabsTrigger value="suggestions">AI Suggestions</TabsTrigger>
        </TabsList>

        <TabsContent value="faculty" className="space-y-4">
          {renderFacultyAnalytics()}
        </TabsContent>

        <TabsContent value="rooms" className="space-y-4">
          {renderRoomAnalytics()}
        </TabsContent>

        <TabsContent value="trends" className="space-y-4">
          {renderTrendsAnalytics()}
        </TabsContent>

        <TabsContent value="suggestions" className="space-y-4">
          {renderOptimizationSuggestions()}
        </TabsContent>
      </Tabs>
    </div>
  )
}
