"use client"

import { useState, useEffect } from "react"

export const useLinkPreview = (url) => {
  const [preview, setPreview] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!url || !isValidUrl(url)) {
      setPreview(null)
      setLoading(false)
      setError(null)
      return
    }

    const fetchPreview = async () => {
      setLoading(true)
      setError(null)

      try {
        // In a real implementation, you would call your backend API
        // For demo purposes, we'll simulate the preview data
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Mock preview data based on URL
        const mockPreview = generateMockPreview(url)
        setPreview(mockPreview)
      } catch (err) {
        setError(err.message)
        setPreview(null)
      } finally {
        setLoading(false)
      }
    }

    const debounceTimer = setTimeout(fetchPreview, 500)
    return () => clearTimeout(debounceTimer)
  }, [url])

  return { preview, loading, error }
}

const isValidUrl = (string) => {
  try {
    new URL(string)
    return true
  } catch (_) {
    return false
  }
}

const generateMockPreview = (url) => {
  const domain = new URL(url).hostname

  // Mock data based on common domains
  const mockData = {
    "github.com": {
      title: "GitHub Repository",
      description: "A place where developers build, ship, and maintain their software.",
      image: "/placeholder.svg?height=64&width=64",
      domain: "github.com",
    },
    "youtube.com": {
      title: "YouTube Video",
      description: "Watch videos and discover new content on YouTube.",
      image: "/placeholder.svg?height=64&width=64",
      domain: "youtube.com",
    },
    "twitter.com": {
      title: "Twitter Post",
      description: "See what's happening in the world right now.",
      image: "/placeholder.svg?height=64&width=64",
      domain: "twitter.com",
    },
  }

  return (
    mockData[domain] || {
      title: `Website Preview - ${domain}`,
      description: "This is a preview of the linked website content.",
      image: "/placeholder.svg?height=64&width=64",
      domain: domain,
    }
  )
}
