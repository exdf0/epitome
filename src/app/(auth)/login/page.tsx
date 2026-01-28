'use client'

import { signIn } from 'next-auth/react'
import Link from 'next/link'
import { Button, Card, CardContent, CardHeader, CardTitle } from '@/components/ui'
import { MessageCircle, ArrowLeft } from 'lucide-react'

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-bg-primary p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          {/* Logo */}
          <Link href="/" className="inline-flex items-center justify-center gap-2 mb-4">
            <div className="w-12 h-12 bg-accent-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-2xl">E</span>
            </div>
          </Link>
          <CardTitle className="text-2xl">Welcome to Epitome Codex</CardTitle>
          <p className="text-text-secondary mt-2">
            Sign in to create builds, save favorites, and contribute to the community.
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Discord Login */}
          <Button
            onClick={() => signIn('discord', { callbackUrl: '/' })}
            className="w-full gap-2 bg-[#5865F2] hover:bg-[#4752C4]"
            size="lg"
          >
            <MessageCircle className="w-5 h-5" />
            Continue with Discord
          </Button>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border-primary" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="px-2 bg-bg-secondary text-text-muted">
                Why Discord?
              </span>
            </div>
          </div>

          {/* Info */}
          <div className="text-sm text-text-secondary space-y-2">
            <p>
              We use Discord for authentication because it's the most common platform
              for gaming communities. Benefits include:
            </p>
            <ul className="list-disc list-inside space-y-1 text-text-muted">
              <li>No need to remember another password</li>
              <li>Quick and secure sign-in</li>
              <li>Easy integration with Discord servers</li>
            </ul>
          </div>

          {/* Back to Home */}
          <Link href="/" className="block">
            <Button variant="ghost" className="w-full gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  )
}
