import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Code2, Rocket, Wrench, Coffee, Github, Terminal } from "lucide-react"
import { Button } from "@/components/ui/button"
import LogoText from "@/components/brand/logoText.sc.jsx"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="topRow py-4 px-2">
				<LogoText />
			</div>
			
			<div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          {/* Header */}
          <div className="mb-8">
            <Badge variant="secondary" className="mb-4">
              <Terminal className="w-3 h-3 mr-1" />
              Development Mode
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-slate-900 dark:text-slate-100 mb-4">
              Under Construction
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-400 mb-8">
              Archeo is being built here. Check back soon!
            </p>
          </div>

          {/* Status Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <Card className="border-8 border-primary">
              <CardContent className="p-6 text-center">
                <Code2 className="w-12 h-12 mx-auto mb-4 text-blue-500" />
                <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-2">Coding in Progress</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">Building amazing features</p>
              </CardContent>
            </Card>

            <Card className="border-2 border-dashed border-slate-300 dark:border-slate-600">
              <CardContent className="p-6 text-center">
                <Wrench className="w-12 h-12 mx-auto mb-4 text-orange-500" />
                <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-2">Fine-tuning</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">Perfecting the details</p>
              </CardContent>
            </Card>

            <Card className="border-2 border-dashed border-slate-300 dark:border-slate-600">
              <CardContent className="p-6 text-center">
                <Rocket className="w-12 h-12 mx-auto mb-4 text-green-500" />
                <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-2">Almost Ready</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">Preparing for launch</p>
              </CardContent>
            </Card>
          </div>

          {/* Developer Info */}
          <div className="bg-white dark:bg-slate-800 rounded-lg p-8 shadow-lg border border-slate-200 dark:border-slate-700 mb-8">
            <div className="flex items-center justify-center mb-4">
              <Coffee className="w-6 h-6 mr-2 text-amber-600" />
              <span className="text-slate-600 dark:text-slate-400">Fueled by coffee and determination</span>
            </div>
            <div className="text-sm text-slate-500 dark:text-slate-500 space-y-1">
              <p>Environment: Development</p>
              <p>Status: Active Development</p>
              <p>Last Updated: {new Date().toLocaleDateString()}</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="outline" className="flex items-center gap-2 bg-transparent">
              <Github className="w-4 h-4" />
              View Progress
            </Button>
            <Button className="flex items-center gap-2">
              <Terminal className="w-4 h-4" />
              Developer Console
            </Button>
          </div>

          {/* Footer */}
          <div className="mt-16 pt-8 border-t border-slate-200 dark:border-slate-700">
            <p className="text-sm text-slate-500 dark:text-slate-500">
              This is a temporary page for development purposes only.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
