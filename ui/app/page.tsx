"use client"

import { useState } from "react"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { DashboardOverview } from "@/components/dashboard-overview"
import { GenerationHub } from "@/components/generation-hub"
import { TimetableViewer } from "@/components/timetable-viewer"
import { AnalyticsCenter } from "@/components/analytics-center"
import { ResourceManager } from "@/components/resource-manager"
import { UserManagement } from "@/components/user-management"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Moon, Sun } from "lucide-react"

export default function HomePage() {
  const [activeSection, setActiveSection] = useState("dashboard")
  const [darkMode, setDarkMode] = useState(false)

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
    document.documentElement.classList.toggle("dark")
  }

  const renderContent = () => {
    switch (activeSection) {
      case "dashboard":
        return <DashboardOverview />
      case "generation":
        return <GenerationHub />
      case "timetable":
        return <TimetableViewer />
      case "analytics":
        return <AnalyticsCenter />
      case "resources":
        return <ResourceManager />
      case "users":
        return <UserManagement />
      case "settings":
        return (
          <Card>
            <CardHeader>
              <CardTitle>Settings</CardTitle>
              <CardDescription>System configuration and preferences</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium">Dark Mode</h4>
                    <p className="text-sm text-muted-foreground">Toggle dark mode theme</p>
                  </div>
                  <Button variant="outline" size="sm" onClick={toggleDarkMode}>
                    {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )
      default:
        return <DashboardOverview />
    }
  }

  return (
    <div className="flex h-screen bg-background">
      <DashboardSidebar activeSection={activeSection} onSectionChange={setActiveSection} />

      <main className="flex-1 overflow-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-foreground">
                {activeSection === "dashboard"
                  ? "Dashboard"
                  : activeSection === "generation"
                    ? "Generation Hub"
                    : activeSection === "timetable"
                      ? "Timetable Viewer"
                      : activeSection === "analytics"
                        ? "Analytics Center"
                        : activeSection === "resources"
                          ? "Resource Manager"
                          : activeSection === "users"
                            ? "User Management"
                            : "Settings"}
              </h1>
              <p className="text-muted-foreground">
                {activeSection === "dashboard"
                  ? "Overview of your timetable optimization system"
                  : "Manage your academic scheduling efficiently"}
              </p>
            </div>
            <Badge variant="secondary" className="text-sm">
              Academic Year 2024-25
            </Badge>
          </div>

          {renderContent()}
        </div>
      </main>
    </div>
  )
}
