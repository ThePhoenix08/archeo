import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  BarChart3,
  Users,
  Settings,
  Bell,
  Search,
  MoreHorizontal,
  CheckCircle,
  Clock,
  Code2,
  Layout,
  Database,
  Zap,
} from "lucide-react"

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      {/* Header */}
      <header className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Dashboard</h1>
            <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
              <CheckCircle className="w-3 h-3 mr-1" />
              Authenticated
            </Badge>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon">
              <Search className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="icon">
              <Bell className="w-4 h-4" />
            </Button>
            <Avatar>
              <AvatarFallback>DEV</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 min-h-[calc(100vh-73px)]">
          <nav className="p-4 space-y-2">
            <div className="mb-6">
              <Badge variant="outline" className="w-full justify-center">
                <Code2 className="w-3 h-3 mr-1" />
                Development Mode
              </Badge>
            </div>

            {[
              { icon: Layout, label: "Overview", active: true },
              { icon: BarChart3, label: "Analytics" },
              { icon: Users, label: "Users" },
              { icon: Database, label: "Data" },
              { icon: Settings, label: "Settings" },
            ].map((item, index) => (
              <Button
                key={index}
                variant={item.active ? "secondary" : "ghost"}
                className="w-full justify-start"
                disabled={!item.active}
              >
                <item.icon className="w-4 h-4 mr-2" />
                {item.label}
              </Button>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            {/* Welcome Section */}
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-2">
                Welcome back, Developer! 👋
              </h2>
              <p className="text-slate-600 dark:text-slate-400">
                You're successfully authenticated. This is where your dashboard will live.
              </p>
            </div>

            {/* Status Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {[
                { title: "Total Users", value: "---", icon: Users, color: "text-blue-500" },
                { title: "Revenue", value: "$---", icon: BarChart3, color: "text-green-500" },
                { title: "Active Sessions", value: "---", icon: Zap, color: "text-yellow-500" },
                { title: "Conversion Rate", value: "---%", icon: BarChart3, color: "text-purple-500" },
              ].map((stat, index) => (
                <Card key={index} className="border-2 border-dashed border-slate-300 dark:border-slate-600">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-slate-600 dark:text-slate-400">{stat.title}</p>
                        <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">{stat.value}</p>
                      </div>
                      <stat.icon className={`w-8 h-8 ${stat.color}`} />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Dashboard Sections */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {/* Chart Placeholder */}
              <Card className="border-2 border-dashed border-slate-300 dark:border-slate-600">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="w-5 h-5" />
                    Analytics Chart
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 bg-slate-100 dark:bg-slate-700 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <BarChart3 className="w-12 h-12 mx-auto mb-4 text-slate-400" />
                      <p className="text-slate-500 dark:text-slate-400">Chart component will go here</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Activity Feed Placeholder */}
              <Card className="border-2 border-dashed border-slate-300 dark:border-slate-600">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="w-5 h-5" />
                    Recent Activity
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[1, 2, 3, 4].map((item) => (
                      <div key={item} className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-700 rounded-lg">
                        <div className="w-2 h-2 bg-slate-400 rounded-full"></div>
                        <div className="flex-1">
                          <p className="text-sm text-slate-600 dark:text-slate-400">
                            Activity item #{item} will appear here
                          </p>
                        </div>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Development Status */}
            <Card className="bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <Code2 className="w-8 h-8 text-blue-500" />
                  <div>
                    <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-1">Dashboard Under Development</h3>
                    <p className="text-sm text-blue-700 dark:text-blue-300">
                      This is a temporary placeholder. Real dashboard components, charts, and data will be implemented
                      here.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
