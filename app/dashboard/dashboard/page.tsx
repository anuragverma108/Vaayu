"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Gift, User as UserIcon, Wallet, FileText, Copy, CheckCircle, ArrowRight, Settings, Loader2 } from "lucide-react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { AQIAlertCard } from "@/components/AQIAlertCard"
import { getStoredWallet, getProfile, hasUserProfile, type HealthProfile } from "@/lib/aptos"
import { useUser } from "@civic/auth/react"

function ProfileDisplay({ profile }: { profile: HealthProfile }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <UserIcon className="w-5 h-5" />
          Your Health Profile
        </CardTitle>
        <CardDescription>This information is securely stored on the blockchain.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="font-medium text-gray-500">Name</p>
            <p>{profile.name}</p>
          </div>
          <div>
            <p className="font-medium text-gray-500">Age</p>
            <p>{profile.age}</p>
          </div>
          <div>
            <p className="font-medium text-gray-500">Gender</p>
            <p>{profile.gender}</p>
          </div>
          <div>
            <p className="font-medium text-gray-500">Location</p>
            <p>{profile.location}</p>
          </div>
        </div>
        <div>
          <p className="font-medium text-gray-500">Chronic Conditions</p>
          <div className="flex flex-wrap gap-2 mt-2">
            {profile.chronicCondition.map((condition) => (
              <Badge key={condition} variant="secondary">
                {condition}
              </Badge>
            ))}
          </div>
        </div>
        <div>
          <p className="font-medium text-gray-500">Preferred Walk Time</p>
          <p>{profile.preferredWalkTime}</p>
        </div>
        <div>
          <p className="font-medium text-gray-500">Pollution Sensitivity</p>
          <p>{profile.pollutionSensitivity}</p>
        </div>
        <div className="pt-4">
          <Link href="/onboarding">
            <Button variant="outline" className="w-full">
              Update Profile
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}

export default function DashboardPage() {
  const [copied, setCopied] = useState(false)
  const [profile, setProfile] = useState<HealthProfile | null | undefined>(undefined)
  const { user, isLoading: isUserLoading } = useUser()
  const router = useRouter()

  const wallet = getStoredWallet(user?.id)

  useEffect(() => {
    if (isUserLoading) {
      return // Wait until user is loaded
    }
    if (!user) {
      router.push("/login")
      return
    }
    if (!wallet) {
      console.error("No wallet found for user on dashboard, redirecting to login.")
      router.push("/login")
      return
    }

    async function checkProfile() {
      const { success: profileExists, hasProfile } = await hasUserProfile(wallet!)
      if (profileExists && hasProfile) {
        const { success: profileFetched, profile: fetchedProfile } = await getProfile(wallet!)
        if (profileFetched) {
          setProfile(fetchedProfile)
        } else {
          console.error("Failed to fetch user profile even though it should exist.")
          setProfile(null)
        }
      } else {
        setProfile(null) // No profile exists
      }
    }

    checkProfile()
  }, [user, isUserLoading, wallet, router])

  const handleCopyAddress = async () => {
    if (wallet?.address) {
      await navigator.clipboard.writeText(wallet.address)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  if (isUserLoading || profile === undefined) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin" />
        <p className="ml-2">Loading your dashboard...</p>
      </div>
    )
  }
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-green-500 rounded-full">
                <div className="w-4 h-4 text-white">🍃</div>
              </div>
              <h1 className="text-xl font-bold">Vaayu Dashboard</h1>
            </div>
            <div className="flex items-center gap-4">
              <a
                href="https://vaayu-voucher-hub.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="outline" size="sm" className="flex items-center gap-1">
                  <Gift className="w-4 h-4" />
                  Rewards
                </Button>
              </a>
              <Badge variant="secondary" className="flex items-center gap-1">
                <CheckCircle className="w-3 h-3" />
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
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome back!</h2>
            <p className="text-gray-600">Monitor your environmental health and manage your wellness profile.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Main Actions */}
            <div className="lg:col-span-2 space-y-6">
              {/* Wallet Info Card */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Wallet className="w-5 h-5" />
                    Your Aptos Wallet
                  </CardTitle>
                  <CardDescription>Your secure blockchain wallet for health data storage</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                    <code className="flex-1 text-sm font-mono break-all">{wallet?.address}</code>
                    <Button variant="ghost" size="sm" onClick={handleCopyAddress} className="shrink-0">
                      {copied ? <CheckCircle className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                    </Button>
                  </div>
                  <div className="text-xs text-gray-500">
                    This wallet is automatically generated and secured with your Civic identity
                  </div>
                </CardContent>
              </Card>

              {profile ? (
                <ProfileDisplay profile={profile} />
              ) : (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <UserIcon className="w-5 h-5" />
                      Health Profile Setup
                    </CardTitle>
                    <CardDescription>
                      Complete your health profile to receive personalized recommendations
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Create Your Health Profile</p>
                        <p className="text-sm text-gray-600">Tell us about your health conditions and preferences</p>
                      </div>
                      <Link href="/onboarding">
                        <Button>
                          Get Started
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="w-5 h-5" />
                    Quick Actions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Link href="/onboarding">
                      <Button variant="outline" className="w-full justify-start">
                        <FileText className="w-4 h-4 mr-2" />
                        Update Health Profile
                      </Button>
                    </Link>
                    <Button variant="outline" className="w-full justify-start" disabled>
                      <UserIcon className="w-4 h-4 mr-2" />
                      View Health History
                      <Badge variant="secondary" className="ml-auto text-xs">
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
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Account Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Civic ID:</span>
                    <span className="font-mono text-xs">
                      {isUserLoading ? "Loading..." : user?.id}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Wallet Address:</span>
                    <div className="flex items-center gap-2">
                      <code className="flex-1 text-sm font-mono break-all">{wallet?.address}</code>
                      <Button variant="ghost" size="sm" onClick={handleCopyAddress} className="shrink-0">
                        {copied ? <CheckCircle className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                      </Button>
                    </div>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Status:</span>
                    <Badge variant="secondary" className="text-xs">
                      Verified
                    </Badge>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Joined:</span>
                    <span className="text-xs">{new Date().toLocaleDateString()}</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
