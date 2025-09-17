"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Calendar, Clock, AlertTriangle, TrendingUp, Plus, FileText, BarChart3 } from "lucide-react"

export function DashboardOverview() {
  const overviewStats = [
    {
      title: "Total Timetables",
      value: "24",
      description: "Active schedules",
      icon: Calendar,
      trend: "+12%",
      color: "text-chart-1",
    },
    {
      title: "Active Schedules",
      value: "18",
      description: "Currently running",
      icon: Clock,
      trend: "+8%",
      color: "text-chart-2",
    },
    {
      title: "Conflicts Detected",
      value: "3",
      description: "Require attention",
      icon: AlertTriangle,
      trend: "-25%",
      color: "text-destructive",
    },
    {
      title: "Optimization Score",
      value: "94%",
      description: "System efficiency",
      icon: TrendingUp,
      trend: "+5%",
      color: "text-chart-4",
    },
  ]

  const quickActions = [
    { label: "Generate Timetable", icon: Calendar, variant: "default" as const },
    { label: "Import Data", icon: FileText, variant: "outline" as const },
    { label: "View Reports", icon: BarChart3, variant: "outline" as const },
  ]

  const recentNotifications = [
    { message: "New timetable generated for Computer Science Department", time: "2 hours ago", type: "success" },
    { message: "Room conflict detected in Block A-101", time: "4 hours ago", type: "warning" },
    { message: "Faculty workload optimization completed", time: "1 day ago", type: "info" },
    { message: "Weekly analytics report is ready", time: "2 days ago", type: "info" },
  ]

  return (
    <div className="space-y-6">
      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {overviewStats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <Card key={index} className="hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <Icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">{stat.description}</p>
                <div className="flex items-center pt-1">
                  <Badge variant="secondary" className="text-xs">
                    {stat.trend}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plus className="h-5 w-5" />
              Quick Actions
            </CardTitle>
            <CardDescription>Common tasks and operations</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {quickActions.map((action, index) => {
              const Icon = action.icon
              return (
                <Button key={index} variant={action.variant} className="w-full justify-start gap-2">
                  <Icon className="h-4 w-4" />
                  {action.label}
                </Button>
              )
            })}
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Recent Notifications</CardTitle>
            <CardDescription>Latest updates and system alerts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentNotifications.map((notification, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 rounded-lg bg-muted/50">
                  <div
                    className={`w-2 h-2 rounded-full mt-2 ${
                      notification.type === "success"
                        ? "bg-chart-1"
                        : notification.type === "warning"
                          ? "bg-chart-4"
                          : "bg-chart-2"
                    }`}
                  />
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none">{notification.message}</p>
                    <p className="text-xs text-muted-foreground">{notification.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* System Status */}
      <Card>
        <CardHeader>
          <CardTitle>System Status</CardTitle>
          <CardDescription>Current system performance and resource utilization</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Faculty Utilization</span>
                <span>87%</span>
              </div>
              <Progress value={87} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Room Occupancy</span>
                <span>73%</span>
              </div>
              <Progress value={73} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Schedule Efficiency</span>
                <span>94%</span>
              </div>
              <Progress value={94} className="h-2" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
