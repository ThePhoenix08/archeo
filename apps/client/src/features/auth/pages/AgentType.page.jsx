"use client"

import { useState } from "react"
import { User, Building2, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Link, useNavigate } from "react-router"
import { ROUTES } from "@/shared/constants/routes.constant.js"
import LogoText from "@/components/brand/LogoText.sc.jsx"

const imagesURLs = {
  student: "https://res.cloudinary.com/ddzcbt9uh/image/upload/v1751523145/student_dy3qye.webp",
  university: "https://res.cloudinary.com/ddzcbt9uh/image/upload/v1751548969/university_xhosi3.webp",
}

export default function SelectAgentTypePage() {
  const [selectedType, setSelectedType] = useState("")
	const navigate = useNavigate();

  const handleContinue = () => {
    if (selectedType) {
      console.log("Selected agent type:", selectedType)
      // Handle navigation or form submission here
      navigate(ROUTES.REGISTER_AGENT_DETAILS);
    }
  }

  const clipPathStyle = {
    clipPath: "polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 16px 100%, 0 calc(100% - 16px))",
  }

  const smallClipPathStyle = {
    clipPath: "polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))",
  }

  return (
    <div className="relative min-h-screen bg-background">
      <div className="w-full">
        <div className="box pt-4 pl-4">
          <LogoText />
        </div>
      </div>
      <div className="mx-auto max-w-4xl px-6 py-2">
        {/* Header */}
        <div className="heading my-4 flex items-center justify-center gap-4">
          <div className="text-muted-foreground">
            Already have an account?{" "}
            <Link to={ROUTES.LOGIN} className="ml-2 font-medium text-primary hover:text-primary/80 hover:underline">
              Sign in
            </Link>
          </div>
        </div>

        {/* Title */}
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold text-foreground">Choose Your Agent Type</h1>
          <p className="text-lg text-muted-foreground">Select the type that best describes you to get started</p>
        </div>

        {/* Selection Cards */}
        <div className="mb-12 grid gap-8 md:grid-cols-2">
          {/* Individual Card */}
          <Card
            className={`relative cursor-pointer border-2 transition-all duration-200 hover:shadow-lg ${
              selectedType === "individual" ? "border-primary shadow-lg" : "border-border hover:border-muted-foreground"
            }`}
            style={clipPathStyle}
            onClick={() => setSelectedType("individual")}
          >
            <CardContent className="p-8">
              {/* Selection Indicator */}
              {selectedType === "individual" && (
                <div className="absolute top-4 right-4 bg-primary p-2" style={smallClipPathStyle}>
                  <div className="h-3 w-3 rounded-full bg-primary-foreground"></div>
                </div>
              )}

              <div className="text-center">
                {/* 3D Avatar Showcase */}
                <div className="mb-6 flex justify-center">
                  <div className="relative">
                    {/* Main featured avatar */}
                    <div
                      className="mx-auto flex h-32 w-32 items-center justify-center bg-muted p-4"
                      style={clipPathStyle}
                    >
                      <img
                        src={imagesURLs.student || "/placeholder.svg"}
                        alt="Student avatar"
                        className="h-24 w-24 object-contain"
                      />
                    </div>
                  </div>
                </div>

                {/* Title with Icon */}
                <div className="mb-4 flex items-center justify-center gap-2">
                  <User className="h-6 w-6 text-primary" />
                  <h3 className="text-2xl font-bold text-foreground">Individual</h3>
                </div>

                {/* Description */}
                <p className="mb-6 text-muted-foreground">
                  Perfect for students, professionals, and individuals managing their own credentials
                </p>

                {/* Features List */}
                <div className="space-y-3 text-left">
                  <div className="flex items-center gap-3">
                    <div
                      className="h-2 w-2 bg-primary"
                      style={{
                        clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
                      }}
                    ></div>
                    <span className="text-foreground">Personal document management</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div
                      className="h-2 w-2 bg-primary"
                      style={{
                        clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
                      }}
                    ></div>
                    <span className="text-foreground">Certificate verification</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div
                      className="h-2 w-2 bg-primary"
                      style={{
                        clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
                      }}
                    ></div>
                    <span className="text-foreground">Credential sharing</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Organization Card */}
          <Card
            className={`relative cursor-pointer border-2 transition-all duration-200 hover:shadow-lg ${
              selectedType === "organization"
                ? "border-primary shadow-lg"
                : "border-border hover:border-muted-foreground"
            }`}
            style={clipPathStyle}
            onClick={() => setSelectedType("organization")}
          >
            <CardContent className="p-8">
              {/* Selection Indicator */}
              {selectedType === "organization" && (
                <div className="absolute top-4 right-4 bg-primary p-2" style={smallClipPathStyle}>
                  <div className="h-3 w-3 rounded-full bg-primary-foreground"></div>
                </div>
              )}

              <div className="text-center">
                {/* 3D Building Showcase */}
                <div className="mb-6 flex justify-center">
                  <div className="relative">
                    {/* Main featured building */}
                    <div
                      className="mx-auto flex h-32 w-32 items-center justify-center bg-muted p-4"
                      style={clipPathStyle}
                    >
                      <img
                        src={imagesURLs.university || "/placeholder.svg"}
                        alt="University building"
                        className="h-24 w-24 object-contain"
                      />
                    </div>
                  </div>
                </div>

                {/* Title with Icon */}
                <div className="mb-4 flex items-center justify-center gap-2">
                  <Building2 className="h-6 w-6 text-primary" />
                  <h3 className="text-2xl font-bold text-foreground">Organization</h3>
                </div>

                {/* Description */}
                <p className="mb-6 text-muted-foreground">
                  Ideal for companies, educational institutions, and government agencies
                </p>

                {/* Features List */}
                <div className="space-y-3 text-left">
                  <div className="flex items-center gap-3">
                    <div
                      className="h-2 w-2 bg-primary"
                      style={{
                        clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
                      }}
                    ></div>
                    <span className="text-foreground">Bulk document management</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div
                      className="h-2 w-2 bg-primary"
                      style={{
                        clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
                      }}
                    ></div>
                    <span className="text-foreground">Digital signature authority</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div
                      className="h-2 w-2 bg-primary"
                      style={{
                        clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
                      }}
                    ></div>
                    <span className="text-foreground">Verification workflows</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Continue Button */}
        <div className="text-center">
          <Button
            onClick={handleContinue}
            disabled={!selectedType}
            size="lg"
            className="px-12 py-4 text-xl font-medium"
            style={clipPathStyle}
          >
            <div className="flex items-center justify-center gap-3">
              <span>Continue</span>
              <ArrowRight className="h-5 w-5" />
            </div>
          </Button>
        </div>

        {/* Additional Info */}
        <div className="mt-8 text-center">
          <p className="text-sm text-muted-foreground">
            You <span className="text-destructive">{"can't"}</span> change your agent later.
          </p>
        </div>
      </div>
    </div>
  )
}
