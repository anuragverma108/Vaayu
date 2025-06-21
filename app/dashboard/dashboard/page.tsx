"use client"

import { useState } from "react"
import { Gift, User as UserIcon, Wallet, FileText, Copy, CheckCircle, ArrowRight, Settings } from "lucide-react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { AQIAlertCard } from "@/components/AQIAlertCard"
import { getStoredWallet } from "@/lib/aptos"
import { useUser } from "@civic/auth/react"

export default function DashboardPage() {
  const [copied, setCopied] = useState(false)
  const { user, isLoading } = useUser()

  const wallet = getStoredWallet(user?.id)

  const handleCopyAddress = async () => {
    if (wallet?.address) {
      await navigator.clipboard.writeText(wallet.address)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <div className="relative min-h-screen overflow-hidden">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
      >
        <source src="/dashboard.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="relative z-10">
        {/* Header */}
        <header className="bg-black/30 border-b border-gray-700 backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-white/10 rounded-full">
                  <div className="w-4 h-4 text-white">🍃</div>
                </div>
                <h1 className="text-xl font-bold text-white">Vaayu Dashboard</h1>
              </div>
              <div className="flex items-center gap-4">
                <a
                  href="https://vaayu-voucher-hub.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="outline" size="sm" className="flex items-center gap-1 text-white bg-white/10 border-white/30 hover:bg-white/20">
                    <Gift className="w-4 h-4" />
                    Rewards
                  </Button>
                </a>
                <Badge variant="secondary" className="flex items-center gap-1 bg-white/10 text-gray-200 border-none">
                  <CheckCircle className="w-3 h-3 text-green-400" />
                  Verified
                </Badge>
              </div>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="space-y-8">
            {/* Welcome Section */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">Welcome back!</h2>
              <p className="text-gray-300">Monitor your environmental health and manage your wellness profile.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column - Main Actions */}
              <div className="lg:col-span-2 space-y-6">
                {/* Wallet Info Card */}
                <Card className="bg-black/30 border border-gray-700 backdrop-blur-md text-white">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-white">
                      <Wallet className="w-5 h-5" />
                      Your Aptos Wallet
                    </CardTitle>
                    <CardDescription className="text-gray-300">Your secure blockchain wallet for health data storage</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-2 p-3 bg-white/10 rounded-lg">
                      <code className="flex-1 text-sm font-mono break-all text-gray-200">{wallet?.address}</code>
                      <Button variant="ghost" size="sm" onClick={handleCopyAddress} className="shrink-0 text-white hover:bg-white/20">
                        {copied ? <CheckCircle className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                      </Button>
                    </div>
                    <div className="text-xs text-gray-400">
                      This wallet is automatically generated and secured with your Civic identity
                    </div>
                  </CardContent>
                </Card>

                {/* Profile Setup Card */}
                <Card className="bg-black/30 border border-gray-700 backdrop-blur-md text-white">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-white">
                      <UserIcon className="w-5 h-5" />
                      Health Profile Setup
                    </CardTitle>
                    <CardDescription className="text-gray-300">
                      Complete your health profile to receive personalized recommendations
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-white">Create Your Health Profile</p>
                        <p className="text-sm text-gray-300">Tell us about your health conditions and preferences</p>
                      </div>
                      <Link href="/onboarding">
                        <Button className="bg-white text-black hover:bg-gray-200">
                          Get Started
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>

                {/* Quick Actions */}
                <Card className="bg-black/30 border border-gray-700 backdrop-blur-md text-white">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-white">
                      <Settings className="w-5 h-5" />
                      Quick Actions
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Link href="/onboarding">
                        <Button variant="outline" className="w-full justify-start text-white bg-white/10 border-white/30 hover:bg-white/20">
                          <FileText className="w-4 h-4 mr-2" />
                          Update Health Profile
                        </Button>
                      </Link>
                      <Button variant="outline" className="w-full justify-start text-white bg-white/10 border-white/30 hover:bg-white/20" disabled>
                        <UserIcon className="w-4 h-4 mr-2" />
                        View Health History
                        <Badge variant="secondary" className="ml-auto text-xs bg-white/10 text-gray-200 border-none">
                          Soon
                        </Badge>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Right Column - AQI and Alerts */}
              <div className="space-y-6">
                <AQIAlertCard />

                {/* Account Info */}
                <Card className="bg-black/30 border border-gray-700 backdrop-blur-md text-white">
                  <CardHeader>
                    <CardTitle className="text-base text-white">Account Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-300">Civic ID:</span>
                      <span className="font-mono text-xs text-gray-200">
                        {isLoading ? "Loading..." : user?.id}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-300">Status:</span>
                      <Badge variant="secondary" className="text-xs bg-white/10 text-gray-200 border-none">
                        Verified
                      </Badge>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-300">Joined:</span>
                      <span className="text-xs text-gray-200">{new Date().toLocaleDateString()}</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
