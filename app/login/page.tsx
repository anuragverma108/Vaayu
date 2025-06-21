"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { UserButton } from "@civic/auth-web3/react"
import { Leaf, Shield, Wallet, Heart } from "lucide-react"
import Link from "next/link"
import ContinueToDashboardButton from "./ContinueToDashboardButton"

export default function LoginPage() {
  const [error, setError] = useState<string>("")

  const handleLoginSuccess = () => {
    // This will be handled by the ContinueToDashboardButton component
  }

  const handleLoginError = (errorMessage: string) => {
    setError(errorMessage)
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center p-4 overflow-hidden">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
      >
        <source src="/login_background.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="relative z-20 w-full max-w-md space-y-8">
        {/* App Header */}
        <div className="text-center space-y-2 animate-fade-in-up">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="p-2 bg-white/10 backdrop-blur-sm rounded-full">
              <Leaf className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-4xl font-extrabold text-white tracking-wide">Vaayu</h1>
          </div>
          <p className="text-gray-300 font-medium">Your personalized environmental health companion</p>
        </div>

        {/* Login Card */}
        <Card className="bg-black/60 border border-white/20 shadow-2xl backdrop-blur-lg">
          <CardHeader
            className="text-center animate-fade-in-up"
            style={{ animationDelay: "200ms" }}
          >
            <CardTitle className="text-white text-2xl font-semibold">Welcome to Vaayu</CardTitle>
            <CardDescription className="text-gray-300">
              Secure login with Civic to access your personalized health dashboard
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            {/* Features Preview */}
            <div
              className="space-y-3 text-gray-200 animate-fade-in-up"
              style={{ animationDelay: "300ms" }}
            >
              <div className="flex items-center gap-3 text-sm">
                <Shield className="w-4 h-4 text-gray-300" />
                <span>Secure identity verification with Civic</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Wallet className="w-4 h-4 text-gray-300" />
                <span>Personal Aptos wallet for data privacy</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Heart className="w-4 h-4 text-gray-300" />
                <span>Personalized health recommendations</span>
              </div>
            </div>

            {/* Error Alert */}
            {error && (
              <Alert
                variant="destructive"
                className="bg-red-900/50 border-red-500 text-white animate-fade-in-up"
                style={{ animationDelay: "400ms" }}
              >
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {/* Login Button */}
            <div
              className="animate-fade-in-up"
              style={{ animationDelay: "500ms" }}
            >
              <UserButton className="w-full bg-white hover:bg-gray-200 text-black font-bold py-2 rounded-lg transition-all duration-200" />
            </div>

            {/* Continue to Dashboard Link (client component) */}
            <div
              className="animate-fade-in-up"
              style={{ animationDelay: "600ms" }}
            >
              <ContinueToDashboardButton />
            </div>

            <div
              className="text-xs text-center text-gray-400 animate-fade-in-up"
              style={{ animationDelay: "700ms" }}
            >
              By logging in, you agree to our{" "}
              <a href="#" className="underline hover:text-white">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#" className="underline hover:text-white">
                Privacy Policy
              </a>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div
          className="text-center text-xs text-white/60 mt-4 tracking-wider animate-fade-in-up"
          style={{ animationDelay: '400ms' }}
        >
          Powered by Civic Identity & Aptos Blockchain
        </div>
      </div>
    </div>
  )
}
