import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 backdrop-blur-sm bg-white/90">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-600 to-secondary-500 rounded-lg flex items-center justify-center">
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-secondary-500 bg-clip-text text-transparent">
              ScholaX
            </span>
          </div>
          <div className="flex items-center gap-6">
            <a
              href="#features"
              className="text-gray-600 hover:text-primary-600 transition-colors"
            >
              Features
            </a>
            <a
              href="#how-it-works"
              className="text-gray-600 hover:text-primary-600 transition-colors"
            >
              How It Works
            </a>
            <a
              href="#benefits"
              className="text-gray-600 hover:text-primary-600 transition-colors"
            >
              Benefits
            </a>
            <Link href="/login">
              <Button variant="primary">Sign In</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="relative bg-gradient-to-br from-primary-100 via-white to-secondary-100 py-20 overflow-hidden">
        {/* Animated Background Decorative Elements with Glow */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-primary-300 rounded-full filter blur-3xl opacity-40 -translate-x-1/2 -translate-y-1/2 animate-pulse"></div>
        <div
          className="absolute bottom-0 right-0 w-96 h-96 bg-secondary-300 rounded-full filter blur-3xl opacity-40 translate-x-1/2 translate-y-1/2 animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/4 w-48 h-48 bg-purple-300 rounded-full filter blur-3xl opacity-30 animate-pulse"
          style={{ animationDelay: "0.5s" }}
        ></div>

        {/* Floating Particles */}
        <div className="absolute inset-0 overflow-hidden">
          <div
            className="absolute top-20 left-10 w-2 h-2 bg-primary-400 rounded-full animate-bounce"
            style={{ animationDuration: "3s", animationDelay: "0s" }}
          ></div>
          <div
            className="absolute top-40 right-20 w-3 h-3 bg-secondary-400 rounded-full animate-bounce"
            style={{ animationDuration: "4s", animationDelay: "0.5s" }}
          ></div>
          <div
            className="absolute bottom-40 left-1/4 w-2 h-2 bg-pink-400 rounded-full animate-bounce"
            style={{ animationDuration: "3.5s", animationDelay: "1s" }}
          ></div>
          <div
            className="absolute bottom-60 right-1/3 w-3 h-3 bg-purple-400 rounded-full animate-bounce"
            style={{ animationDuration: "4.5s", animationDelay: "0.3s" }}
          ></div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div>
              <div className="inline-block px-4 py-2 bg-primary-100 rounded-full mb-6 shadow-lg backdrop-blur-sm animate-pulse">
                <span className="text-primary-700 font-medium text-sm">
                  IIIT Ranchi
                </span>
              </div>
              <h1 className="text-5xl md:text-6xl font-bold text-primary-900 mb-6 leading-tight">
                ScholaX - Smart College Management Made Simple
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Streamline attendance tracking, student management, and
                administrative tasks for IIIT Ranchi
              </p>
              <div className="flex gap-4 flex-wrap">
                <Link href="/login">
                  <Button
                    variant="primary"
                    className="px-8 py-4 text-lg shadow-lg hover:shadow-2xl hover:scale-105 transition-all hover:-translate-y-1 relative group ripple-effect press-depth glow-pulse-hover"
                  >
                    <span className="absolute inset-0 bg-gradient-to-r from-primary-400 to-secondary-400 rounded-lg blur-lg opacity-50 group-hover:opacity-75 transition-opacity gradient-shift"></span>
                    <span className="relative">Get Started</span>
                  </Button>
                </Link>
                <button className="px-8 py-4 text-lg border-2 border-secondary-500 text-secondary-600 hover:bg-secondary-50 rounded-lg font-medium transition-all hover:scale-105 hover:-translate-y-1 hover:shadow-lg ripple-effect press-depth">
                  Watch Demo
                </button>
              </div>
            </div>

            {/* Right Hero Image with Glow Effect */}
            <div className="relative">
              <div className="relative aspect-square rounded-3xl overflow-hidden shadow-2xl hover:scale-105 transition-transform duration-500">
                {/* Glow Effect Behind Image */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary-400 to-secondary-400 blur-2xl opacity-50"></div>
                <Image
                  src="/hero.png"
                  alt="ScholaX Dashboard Preview - College Management System"
                  fill
                  className="object-cover relative z-10"
                  priority
                />
                {/* Glassmorphism Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-primary-900/20 to-transparent z-20"></div>
              </div>

              {/* Floating Elements with Animation */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary-500 rounded-full opacity-20 animate-pulse shadow-2xl shadow-primary-500/50"></div>
              <div
                className="absolute -bottom-4 -left-4 w-32 h-32 bg-secondary-500 rounded-full opacity-20 animate-pulse shadow-2xl shadow-secondary-500/50"
                style={{ animationDelay: "1s" }}
              ></div>

              {/* Additional Floating Orbs */}
              <div
                className="absolute top-1/4 -left-6 w-16 h-16 bg-purple-400 rounded-full opacity-30 animate-bounce"
                style={{ animationDuration: "4s" }}
              ></div>
              <div
                className="absolute bottom-1/3 -right-6 w-20 h-20 bg-pink-400 rounded-full opacity-30 animate-bounce"
                style={{ animationDuration: "5s", animationDelay: "0.5s" }}
              ></div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS SECTION with Glassmorphism */}
      <section className="py-16 bg-gradient-to-r from-primary-600 via-purple-600 to-secondary-600 relative overflow-hidden">
        {/* Animated Background Circles */}
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-white/10 rounded-full filter blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-0 right-1/4 w-64 h-64 bg-white/10 rounded-full filter blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center group cursor-pointer">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-xl group-hover:scale-110 group-hover:shadow-2xl group-hover:shadow-white/20 transition-all duration-300">
                <svg
                  className="w-10 h-10 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <div className="text-5xl font-bold text-white mb-2 group-hover:scale-110 transition-transform duration-300">
                1000+
              </div>
              <p className="text-purple-100 font-medium">Students Managed</p>
            </div>

            <div className="text-center group cursor-pointer">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-xl group-hover:scale-110 group-hover:shadow-2xl group-hover:shadow-white/20 transition-all duration-300">
                <svg
                  className="w-10 h-10 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <div className="text-5xl font-bold text-white mb-2 group-hover:scale-110 transition-transform duration-300">
                50+
              </div>
              <p className="text-purple-100 font-medium">Teachers Active</p>
            </div>

            <div className="text-center group cursor-pointer">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-xl group-hover:scale-110 group-hover:shadow-2xl group-hover:shadow-white/20 transition-all duration-300">
                <svg
                  className="w-10 h-10 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <div className="text-5xl font-bold text-white mb-2 group-hover:scale-110 transition-transform duration-300">
                99.9%
              </div>
              <p className="text-purple-100 font-medium">Uptime</p>
            </div>

            <div className="text-center group cursor-pointer">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-xl group-hover:scale-110 group-hover:shadow-2xl group-hover:shadow-white/20 transition-all duration-300">
                <svg
                  className="w-10 h-10 text-white animate-spin"
                  style={{ animationDuration: "3s" }}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
              </div>
              <div className="text-4xl font-bold text-white mb-2 group-hover:scale-110 transition-transform duration-300">
                Real-time
              </div>
              <p className="text-purple-100 font-medium">Updates</p>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS SECTION */}
      <section
        id="how-it-works"
        className="py-20 bg-gradient-to-br from-purple-50 via-pink-50 to-purple-50"
      >
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-primary-900 mb-4">
              How ScholaX Works
            </h2>
            <p className="text-xl text-gray-600">
              Simple workflows for every role
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* ADMIN WORKFLOW */}
            <div className="space-y-4">
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <svg
                    className="w-12 h-12 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-primary-900 mb-2">
                  Admin
                </h3>
              </div>

              <Card className="border-l-4 border-primary-500 bg-white hover:shadow-lg transition-shadow">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                    1
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">
                      Import Students
                    </h4>
                    <p className="text-sm text-gray-600">
                      Upload CSV/Excel files to add students in bulk
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="border-l-4 border-primary-500 bg-white hover:shadow-lg transition-shadow">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                    2
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">
                      Assign Teachers
                    </h4>
                    <p className="text-sm text-gray-600">
                      Add teachers and assign them to sections
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="border-l-4 border-primary-500 bg-white hover:shadow-lg transition-shadow">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                    3
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">
                      Monitor Statistics
                    </h4>
                    <p className="text-sm text-gray-600">
                      Track system-wide metrics and analytics
                    </p>
                  </div>
                </div>
              </Card>
            </div>

            {/* TEACHER WORKFLOW */}
            <div className="space-y-4">
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-secondary-500 to-secondary-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <svg
                    className="w-12 h-12 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-secondary-900 mb-2">
                  Teacher
                </h3>
              </div>

              <Card className="border-l-4 border-secondary-500 bg-white hover:shadow-lg transition-shadow">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-secondary-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                    1
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">
                      View Sections
                    </h4>
                    <p className="text-sm text-gray-600">
                      Access your assigned classes and subjects
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="border-l-4 border-secondary-500 bg-white hover:shadow-lg transition-shadow">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-secondary-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                    2
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">
                      Mark Attendance
                    </h4>
                    <p className="text-sm text-gray-600">
                      One-click marking with green/red buttons
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="border-l-4 border-secondary-500 bg-white hover:shadow-lg transition-shadow">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-secondary-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                    3
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">
                      Track Progress
                    </h4>
                    <p className="text-sm text-gray-600">
                      Monitor student attendance patterns
                    </p>
                  </div>
                </div>
              </Card>
            </div>

            {/* STUDENT WORKFLOW */}
            <div className="space-y-4">
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <svg
                    className="w-12 h-12 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-purple-900 mb-2">
                  Student
                </h3>
              </div>

              <Card className="border-l-4 border-purple-500 bg-white hover:shadow-lg transition-shadow">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-pink-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                    1
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">
                      Login Securely
                    </h4>
                    <p className="text-sm text-gray-600">
                      Use your college email for OTP login
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="border-l-4 border-purple-500 bg-white hover:shadow-lg transition-shadow">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-pink-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                    2
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">
                      View Dashboard
                    </h4>
                    <p className="text-sm text-gray-600">
                      See your overall attendance at a glance
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="border-l-4 border-purple-500 bg-white hover:shadow-lg transition-shadow">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-pink-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                    3
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">
                      Track Performance
                    </h4>
                    <p className="text-sm text-gray-600">
                      Subject-wise attendance percentages
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* KEY FEATURES SECTION */}
      <section id="features" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-primary-900 mb-4">
              Powerful Features for Everyone
            </h2>
            <p className="text-xl text-gray-600">
              Everything you need for efficient college management
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="hover:shadow-2xl transition-all bg-gradient-to-br from-primary-50 to-primary-100 border-primary-200 hover:scale-105 hover:-translate-y-2 duration-300 relative group overflow-hidden cursor-pointer">
              {/* Gradient Shift Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary-400 to-primary-600 opacity-0 group-hover:opacity-10 transition-opacity duration-300 gradient-shift"></div>
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg group-hover:shadow-2xl group-hover:shadow-primary-500/50 transition-all duration-300 bounce-hover">
                  <svg
                    className="w-10 h-10 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-primary-900 mb-3">
                  OTP-Based Authentication
                </h3>
                <p className="text-gray-600">
                  Secure login with email verification. No passwords to
                  remember.
                </p>
              </div>
            </Card>

            <Card className="hover:shadow-2xl transition-all bg-gradient-to-br from-secondary-50 to-secondary-100 border-secondary-200 hover:scale-105 hover:-translate-y-2 duration-300 relative group overflow-hidden cursor-pointer">
              <div className="absolute inset-0 bg-gradient-to-br from-secondary-400 to-secondary-600 opacity-0 group-hover:opacity-10 transition-opacity duration-300 gradient-shift"></div>
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-br from-secondary-500 to-secondary-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg group-hover:shadow-2xl group-hover:shadow-secondary-500/50 transition-all duration-300 bounce-hover">
                  <svg
                    className="w-10 h-10 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-secondary-900 mb-3">
                  CSV/Excel Import
                </h3>
                <p className="text-gray-600">
                  Bulk student data upload with automatic email generation.
                </p>
              </div>
            </Card>

            <Card className="hover:shadow-2xl transition-all bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200 hover:scale-105 hover:-translate-y-2 duration-300 relative group overflow-hidden cursor-pointer">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-400 to-purple-600 opacity-0 group-hover:opacity-10 transition-opacity duration-300 gradient-shift"></div>
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg group-hover:shadow-2xl group-hover:shadow-purple-500/50 transition-all duration-300 bounce-hover">
                  <svg
                    className="w-10 h-10 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-purple-900 mb-3">
                  Real-time Attendance
                </h3>
                <p className="text-gray-600">
                  Instant updates and tracking with live statistics.
                </p>
              </div>
            </Card>

            <Card className="hover:shadow-2xl transition-all bg-gradient-to-br from-pink-50 to-pink-100 border-pink-200 hover:scale-105 hover:-translate-y-2 duration-300 relative group overflow-hidden cursor-pointer">
              <div className="absolute inset-0 bg-gradient-to-br from-pink-400 to-pink-600 opacity-0 group-hover:opacity-10 transition-opacity duration-300 gradient-shift"></div>
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-pink-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg group-hover:shadow-2xl group-hover:shadow-pink-500/50 transition-all duration-300 bounce-hover">
                  <svg
                    className="w-10 h-10 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-pink-900 mb-3">
                  Subject-wise Analytics
                </h3>
                <p className="text-gray-600">
                  Detailed performance metrics for every subject.
                </p>
              </div>
            </Card>

            <Card className="hover:shadow-2xl transition-all bg-gradient-to-br from-primary-50 to-primary-100 border-primary-200 hover:scale-105 hover:-translate-y-2 duration-300 relative group overflow-hidden cursor-pointer">
              <div className="absolute inset-0 bg-gradient-to-br from-primary-400 to-secondary-400 opacity-0 group-hover:opacity-10 transition-opacity duration-300 gradient-shift"></div>
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-2xl flex items-center justify-center mb-4 shadow-lg group-hover:shadow-2xl group-hover:shadow-primary-500/50 transition-all duration-300 bounce-hover">
                  <svg
                    className="w-10 h-10 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-primary-900 mb-3">
                  Role-Based Access
                </h3>
                <p className="text-gray-600">
                  Separate portals for Admin, Teacher, and Student.
                </p>
              </div>
            </Card>

            <Card className="hover:shadow-2xl transition-all bg-gradient-to-br from-secondary-50 to-secondary-100 border-secondary-200 hover:scale-105 hover:-translate-y-2 duration-300 relative group overflow-hidden cursor-pointer">
              <div className="absolute inset-0 bg-gradient-to-br from-secondary-400 to-pink-400 opacity-0 group-hover:opacity-10 transition-opacity duration-300 gradient-shift"></div>
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-br from-secondary-500 to-pink-500 rounded-2xl flex items-center justify-center mb-4 shadow-lg group-hover:shadow-2xl group-hover:shadow-secondary-500/50 transition-all duration-300 bounce-hover">
                  <svg
                    className="w-10 h-10 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-secondary-900 mb-3">
                  Responsive Design
                </h3>
                <p className="text-gray-600">
                  Works seamlessly on all devices and screen sizes.
                </p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* BENEFITS SECTION */}
      <section
        id="benefits"
        className="py-20 bg-gradient-to-br from-primary-50 via-secondary-50 to-primary-50"
      >
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-primary-900 mb-4">
              Why Choose ScholaX?
            </h2>
            <p className="text-xl text-gray-600">
              Built for modern educational institutions
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left - How It Works Image */}
            <div className="relative">
              <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/how-it-works.png"
                  alt="How ScholaX Works"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Right - Benefits List */}
            <div className="space-y-6">
              <div className="flex items-start gap-4 group">
                <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg group-hover:shadow-2xl group-hover:shadow-primary-500/50 group-hover:scale-110 transition-all duration-300">
                  <svg
                    className="w-7 h-7 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div>
                  <h4 className="text-xl font-bold text-gray-900 mb-2">
                    Save Time
                  </h4>
                  <p className="text-gray-600">
                    Automated attendance and reporting reduce manual work by 80%
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 group">
                <div className="w-12 h-12 bg-gradient-to-br from-secondary-500 to-secondary-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg group-hover:shadow-2xl group-hover:shadow-secondary-500/50 group-hover:scale-110 transition-all duration-300">
                  <svg
                    className="w-7 h-7 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                    />
                  </svg>
                </div>
                <div>
                  <h4 className="text-xl font-bold text-gray-900 mb-2">
                    Stay Organized
                  </h4>
                  <p className="text-gray-600">
                    Centralized student data accessible from anywhere, anytime
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 group">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg group-hover:shadow-2xl group-hover:shadow-purple-500/50 group-hover:scale-110 transition-all duration-300">
                  <svg
                    className="w-7 h-7 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div>
                  <h4 className="text-xl font-bold text-gray-900 mb-2">
                    Improve Accuracy
                  </h4>
                  <p className="text-gray-600">
                    Digital records eliminate errors and manual mistakes
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 group">
                <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-pink-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg group-hover:shadow-2xl group-hover:shadow-pink-500/50 group-hover:scale-110 transition-all duration-300">
                  <svg
                    className="w-7 h-7 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div>
                  <h4 className="text-xl font-bold text-gray-900 mb-2">
                    Access Anywhere
                  </h4>
                  <p className="text-gray-600">
                    Cloud-based system accessible from any device
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 group">
                <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg group-hover:shadow-2xl group-hover:shadow-primary-500/50 group-hover:scale-110 transition-all duration-300">
                  <svg
                    className="w-7 h-7 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                </div>
                <div>
                  <h4 className="text-xl font-bold text-gray-900 mb-2">
                    Secure
                  </h4>
                  <p className="text-gray-600">
                    OTP authentication and role-based access control
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 group">
                <div className="w-12 h-12 bg-gradient-to-br from-secondary-500 to-pink-500 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg group-hover:shadow-2xl group-hover:shadow-pink-500/50 group-hover:scale-110 transition-all duration-300">
                  <svg
                    className="w-7 h-7 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div>
                  <h4 className="text-xl font-bold text-gray-900 mb-2">
                    Easy to Use
                  </h4>
                  <p className="text-gray-600">
                    Intuitive interface designed for all users
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-20 bg-gradient-to-r from-primary-600 via-purple-600 to-secondary-600 text-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" viewBox="0 0 100 100">
            <pattern
              id="dots"
              x="0"
              y="0"
              width="20"
              height="20"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="10" cy="10" r="2" fill="white" />
            </pattern>
            <rect width="100" height="100" fill="url(#dots)" />
          </svg>
        </div>

        <div className="container mx-auto px-6 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Transform Your College Management?
          </h2>
          <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
            Join IIIT Ranchi&apos;s digital revolution and experience seamless
            attendance tracking
          </p>
          <Link href="/login">
            <button className="px-12 py-4 bg-white text-primary-600 font-bold text-lg rounded-lg hover:shadow-2xl transition-all transform hover:scale-110 hover:-translate-y-1 inline-flex items-center gap-2 relative group ripple-effect press-depth glow-on-hover">
              <span className="absolute inset-0 bg-gradient-to-r from-primary-400 to-secondary-400 rounded-lg blur-xl opacity-50 group-hover:opacity-75 transition-opacity gradient-shift"></span>
              <span className="relative flex items-center gap-2">
                Get Started Now
                <svg
                  className="w-5 h-5 group-hover:translate-x-1 transition-transform icon-morph"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </span>
            </button>
          </Link>
          <p className="text-sm text-purple-200 mt-6">
            No credit card required • Free for IIIT Ranchi
          </p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-gradient-to-r from-primary-900 to-secondary-900 text-white py-12">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold">ScholaX</h3>
              </div>
              <p className="text-purple-200 text-sm">
                Smart College Management System for IIIT Ranchi
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm text-purple-200">
                <li>
                  <a
                    href="#features"
                    className="hover:text-white transition-colors"
                  >
                    Features
                  </a>
                </li>
                <li>
                  <a
                    href="#how-it-works"
                    className="hover:text-white transition-colors"
                  >
                    How It Works
                  </a>
                </li>
                <li>
                  <a
                    href="#benefits"
                    className="hover:text-white transition-colors"
                  >
                    Benefits
                  </a>
                </li>
                <li>
                  <Link
                    href="/login"
                    className="hover:text-white transition-colors"
                  >
                    Sign In
                  </Link>
                </li>
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h4 className="font-bold mb-4">Resources</h4>
              <ul className="space-y-2 text-sm text-purple-200">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Support
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Privacy Policy
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-bold mb-4">Contact</h4>
              <ul className="space-y-2 text-sm text-purple-200">
                <li>IIIT Ranchi</li>
                <li>Jharkhand, India</li>
                <li className="pt-2">
                  <div className="flex gap-3">
                    <a
                      href="#"
                      className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </a>
                    <a
                      href="#"
                      className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
                      </svg>
                    </a>
                    <a
                      href="#"
                      className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                      </svg>
                    </a>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* Copyright */}
          <div className="border-t border-white/10 pt-8 text-center">
            <p className="text-purple-200 text-sm">
              &copy; 2024 ScholaX - IIIT Ranchi. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
