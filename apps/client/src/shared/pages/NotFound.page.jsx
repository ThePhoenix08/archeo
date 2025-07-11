"use client"

import { Search, Home, ArrowLeft, Compass } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { Link } from "react-router"
import CustomButton from "@/components/Button/CustomButton.jsx"
import LogoText from "@/components/brand/LogoText.sc.jsx"
import { ROUTES } from "@/shared/constants/routes.constant.js"

const notfound_404_SVG_src = "https://res.cloudinary.com/ddzcbt9uh/image/upload/v1752134352/20602755_6339705_evbxco.svg"

/**
 * Reusable 404 Not Found component that can be used anywhere in the app
 */
function NotFoundPage({
  title = "Page Not Found",
  description = "The page you're looking for doesn't exist or has been moved",
  showSearch = true,
  customActions,
}) {
  const [searchQuery, setSearchQuery] = useState("")

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      // You can customize this to match your search implementation
      window.location.href = `/search?q=${encodeURIComponent(searchQuery.trim())}`
    }
  }

  const handleGoBack = () => {
    if (typeof window !== "undefined") {
      if (window.history.length > 1) {
        window.history.back()
      } else {
        window.location.href = "/"
      }
    }
  }

  return (
    <div className="relative min-h-screen bg-background">
      {/* Logo/Brand Section */}
      <div className="w-full focus:outline-none">
        <div className="box pt-4 pl-4">
          <LogoText/>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-2xl px-6 py-2">
        {/* Navigation Helper */}
        <div className="heading my-4 flex items-center justify-center gap-4">
          <div className="text-muted-foreground">
            Lost your way?{" "}
            <Link href={ROUTES.SITEMAP} className="ml-2 font-medium text-primary hover:text-primary/80 hover:underline">
              View Sitemap
            </Link>
          </div>
        </div>

        {/* Title and Description */}
        <div className="mb-8 text-center">
          <div className="mb-6 flex justify-center">
            <div className="rounded-full bg-blue-100 p-4">
              <Compass className="h-12 w-12 text-blue-600" />
            </div>
          </div>

          <h1 className="mb-4 text-4xl font-bold text-foreground">{title}</h1>
          <p className="text-lg text-muted-foreground">{description}</p>
        </div>

        {/* 404 Illustration */}
        <div className="mb-8 flex justify-center">
          <img
            src={notfound_404_SVG_src || "/placeholder.svg"}
            alt="404 Page Not Found Illustration"
            className="h-64 w-auto object-contain opacity-80"
            onError={(e) => {
              e.currentTarget.src = "/placeholder.svg?height=256&width=256"
            }}
          />
        </div>

        {/* Search Section */}
        {showSearch && (
          <div className="mb-8 rounded-lg border bg-card p-6">
            <div className="mb-4 flex items-center gap-2">
              <Search className="h-5 w-5 text-primary" />
              <h3 className="font-semibold text-foreground">Search for what you need</h3>
            </div>
            <p className="mb-4 text-sm text-muted-foreground">
              Can't find what you're looking for? Try searching our site:
            </p>
            <form onSubmit={handleSearch} className="flex gap-2">
              <Input
                type="text"
                placeholder="Search pages, articles, help..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1"
              />
              <Button type="submit" variant="outline">
                <Search className="h-4 w-4" />
              </Button>
            </form>
          </div>
        )}

        {/* Custom Actions or Default Actions */}
        {customActions || (
          <div className="space-y-4">
            {/* Primary Action - Go Home */}
            <div className="pt-2">
              <Link to={ROUTES.HOME} className="block">
                <Button
                  size="lg"
                  className="w-full px-8 py-4 text-xl font-medium"
                  style={{
                    clipPath: "polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 16px 100%, 0 calc(100% - 16px))",
                  }}
                >
                  <Home className="mr-2 h-5 w-5" />
                  Go to Homepage
                </Button>
              </Link>
            </div>

            {/* Secondary Actions */}
            <div className="grid gap-3 sm:grid-cols-2">
              <Button
                onClick={handleGoBack}
                variant="outline"
                size="lg"
                className="w-full px-6 py-3 text-lg font-medium bg-transparent"
                style={{
                  clipPath: "polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))",
                }}
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Go Back
              </Button>

              <Link to={ROUTES.CONTACT} className="block">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full px-6 py-3 text-lg font-medium bg-transparent"
                  style={{
                    clipPath: "polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))",
                  }}
                >
                  <Search className="mr-2 h-4 w-4" />
                  Get Help
                </Button>
              </Link>
            </div>
          </div>
        )}

        {/* Popular Pages Section */}
        <div className="mt-12 rounded-lg border bg-muted/30 p-6">
          <h3 className="mb-4 font-semibold text-foreground">Popular Pages</h3>
          <div className="grid gap-2 sm:grid-cols-2">
            <Link to={ROUTES.DASHBOARD} className="block">
              <CustomButton text="Dashboard" variant="muted" size="sm" className="w-full justify-center"/>
            </Link>
            <Link to={ROUTES.PROFILE} className="block">
              <CustomButton text="Profile Settings" variant="muted" size="sm" className="w-full justify-center"/>
            </Link>
            <Link to={ROUTES.HELP} className="block">
              <CustomButton text="Help Center" variant="muted" size="sm" className="w-full justify-center"/>
            </Link>
            <Link to={ROUTES.CONTACT} className="block">
              <CustomButton text="Contact Support" variant="muted" size="sm" className="w-full justify-center"/>
            </Link>
          </div>
        </div>

        {/* Additional Help */}
        <div className="mt-8 text-center">
          <p className="text-sm text-muted-foreground">
            Still can't find what you're looking for?{" "}
            <Link to={ROUTES.CONTACT} className="font-medium text-primary hover:text-primary/80 hover:underline">
              Contact our support team
            </Link>{" "}
            and we'll help you out.
          </p>
        </div>
      </div>
    </div>
  )
}

export default NotFoundPage
