import { getUser } from "@civic/auth/nextjs";
import { redirect } from "next/navigation";
import DashboardClient from "./DashboardClient";
import Link from "next/link";
import ContinueToDashboardButton from "./ContinueToDashboardButton";

export default async function DashboardPage() {
  // Get user information on the server side
  const user = await getUser();

  // Redirect to login if user is not authenticated
  if (!user) {
    redirect("/");
  }

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="px-4 py-6 sm:px-0">
          <div className="bg-black/30 border border-white/10 rounded-lg p-6 backdrop-blur-lg">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-3xl font-bold text-white">Dashboard</h1>
              <DashboardClient user={user} />
            </div>

            {/* Welcome Section */}
            <div className="bg-black/30 border border-white/10 rounded-lg p-6 mb-6">
              <h2 className="text-xl font-semibold text-white mb-2">
                Welcome back, {user.name || user.email}!
              </h2>
              <p className="text-gray-300">
                You have successfully logged in to your dashboard.
              </p>
            </div>

            {/* User Information Card */}
            <div className="bg-black/30 border border-white/10 rounded-lg p-6 mb-6">
              <h3 className="text-lg font-medium text-white mb-4">
                User Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400">
                    User ID
                  </label>
                  <p className="mt-1 text-sm text-white">{user.id}</p>
                </div>
                {user.email && (
                  <div>
                    <label className="block text-sm font-medium text-gray-400">
                      Email
                    </label>
                    <p className="mt-1 text-sm text-white">{user.email}</p>
                  </div>
                )}
                {user.name && (
                  <div>
                    <label className="block text-sm font-medium text-gray-400">
                      Full Name
                    </label>
                    <p className="mt-1 text-sm text-white">{user.name}</p>
                  </div>
                )}
                {user.given_name && (
                  <div>
                    <label className="block text-sm font-medium text-gray-400">
                      Given Name
                    </label>
                    <p className="mt-1 text-sm text-white">{user.given_name}</p>
                  </div>
                )}
                {user.family_name && (
                  <div>
                    <label className="block text-sm font-medium text-gray-400">
                      Family Name
                    </label>
                    <p className="mt-1 text-sm text-white">{user.family_name}</p>
                  </div>
                )}
                {user.updated_at && (
                  <div>
                    <label className="block text-sm font-medium text-gray-400">
                      Last Updated
                    </label>
                    <p className="mt-1 text-sm text-white">
                      {new Date(user.updated_at).toLocaleDateString()}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-black/30 border border-white/10 rounded-lg p-6">
              <h3 className="text-lg font-medium text-white mb-4">
                Quick Actions
              </h3>
              <div className="grid grid-cols-1 gap-4">
                <ContinueToDashboardButton />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}