"use client"

import { Shield, Home, User, Lock } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Link } from "react-router"
import CustomButton from "@/components/Button/CustomButton.jsx"
import { Button } from "@/components/ui/button.jsx"
import { ROUTES } from "@/shared/constants/routes.constant.js"
import LogoText from "@/components/brand/LogoText.sc.jsx"

const unauthorised_401_SVG_src =
  "https://res.cloudinary.com/ddzcbt9uh/image/upload/v1752134347/7967797_3819656_qm37hs.svg"

/**
 * Shows an Access Denied page to user when they don't have the required roles
 * @param allowedRoles - list of roles allowed to access the route
 * @param userRoles - user's current roles
 * @param requestedRoute - optional route they tried to access
 */
function AccessDeniedPage({ allowedRoles, userRoles, requestedRoute }) {
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
            Need different access?{" "}
            <Link href="/contact-admin" className="ml-2 font-medium text-primary hover:text-primary/80 hover:underline">
              Contact Administrator
            </Link>
          </div>
        </div>

        {/* Title and Description */}
        <div className="mb-8 text-center">
          <div className="mb-6 flex justify-center">
            <div className="rounded-full bg-amber-100 p-4">
              <Shield className="h-12 w-12 text-amber-600" />
            </div>
          </div>

          <h1 className="mb-4 text-4xl font-bold text-foreground">Access Restricted</h1>
          <p className="text-lg text-muted-foreground">
            You don't have the required permissions to access this resource
          </p>
        </div>

        {/* Illustration */}
        <div className="mb-8 flex justify-center">
          <img
            src={unauthorised_401_SVG_src || "/placeholder.svg"}
            alt="Access Denied Illustration"
            className="h-64 w-auto object-contain opacity-80"
          />
        </div>

        {/* Role Information Cards */}
        <div className="mb-8 space-y-6">
          {/* Required Roles */}
          <div className="rounded-lg border bg-card p-6">
            <div className="mb-4 flex items-center gap-2">
              <Lock className="h-5 w-5 text-destructive" />
              <h3 className="font-semibold text-foreground">Required Permissions</h3>
            </div>
            <p className="mb-3 text-sm text-muted-foreground">
              To access this resource, you need one of the following roles:
            </p>
            <div className="flex flex-wrap gap-2">
              {allowedRoles.map((role) => (
                <Badge key={role} variant="destructive" className="px-3 py-1">
                  {role}
                </Badge>
              ))}
            </div>
          </div>

          {/* Current Roles */}
          <div className="rounded-lg border bg-card p-6">
            <div className="mb-4 flex items-center gap-2">
              <User className="h-5 w-5 text-primary" />
              <h3 className="font-semibold text-foreground">Your Current Roles</h3>
            </div>
            <p className="mb-3 text-sm text-muted-foreground">You currently have the following permissions:</p>
            <div className="flex flex-wrap gap-2">
              {userRoles.length > 0 ? (
                userRoles.map((role) => (
                  <Badge key={role} variant="secondary" className="px-3 py-1">
                    {role}
                  </Badge>
                ))
              ) : (
                <Badge variant="outline" className="px-3 py-1 text-muted-foreground">
                  No roles assigned
                </Badge>
              )}
            </div>
          </div>

          {/* Requested Route Info */}
          {requestedRoute && (
            <div className="rounded-lg border bg-muted/30 p-4">
              <p className="text-sm text-muted-foreground">
                <span className="font-medium">Requested resource:</span>{" "}
                <code className="rounded bg-muted px-2 py-1 text-xs">{requestedRoute}</code>
              </p>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="space-y-4">
          {/* Primary Action - Go to Dashboard */}
          <div className="pt-2">
            <Link to={ROUTES.DASHBOARD} className="block">
              <CustomButton
                size="lg"
                className="w-full px-8 py-4 text-xl font-medium"
								icon={<Home className="mr-2 h-5 w-5" />}
								text="Go to Dashboard"
							/>
            </Link>
          </div>

          {/* Secondary Actions */}
          {/* <div className="grid gap-3 sm:grid-cols-2">
            <Link tp={ROUTES.PROFILE} className="block">
              <CustomButton
                size="lg"
                className="w-full px-6 py-3 text-lg font-medium bg-transparent"
                icon={<User className="mr-2 h-4 w-4" />} 
                text="View Profile"
              />
            </Link>

            <Link href="/contact-admin" className="block">
              <CustomButton
                size="lg"
                className="w-full px-6 py-3 text-lg font-medium bg-transparent"
                icon={<Shield className="mr-2 h-4 w-4" />}
                text="Request Access"
              />
            </Link> */}
          {/* </div> */}
        </div>

        {/* Help Section */}
        <div className="mt-12 rounded-lg border bg-muted/30 p-6 text-center">
          <h3 className="mb-2 font-semibold text-foreground">Need Help?</h3>
          <p className="mb-4 text-sm text-muted-foreground">
            If you believe you should have access to this resource, please contact your administrator or check your
            account permissions.
          </p>
          <div className="flex flex-col gap-2 sm:flex-row sm:justify-center">
            <Link href="/help">
              <Button variant="ghost" size="sm">
                View Help Center
              </Button>
            </Link>
            <Link href="/contact-admin">
              <Button variant="ghost" size="sm">
                Contact Administrator
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AccessDeniedPage
