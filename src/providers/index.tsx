'use client'

import { AuthProvider } from './auth-provider'
import { QueryProvider } from './query-provider'
import { TooltipProvider } from '@/components/ui'

interface ProvidersProps {
  children: React.ReactNode
}

export function Providers({ children }: ProvidersProps) {
  return (
    <AuthProvider>
      <QueryProvider>
        <TooltipProvider>{children}</TooltipProvider>
      </QueryProvider>
    </AuthProvider>
  )
}
