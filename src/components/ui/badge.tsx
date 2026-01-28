import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const badgeVariants = cva(
  'inline-flex items-center rounded-md px-2 py-1 text-xs font-medium',
  {
    variants: {
      variant: {
        default: 'bg-bg-tertiary text-text-primary border border-border-primary',
        primary: 'bg-accent-primary/20 text-accent-primary border border-accent-primary/30',
        secondary: 'bg-accent-secondary/20 text-accent-secondary border border-accent-secondary/30',
        // Rarity variants
        common: 'bg-rarity-common/20 text-rarity-common border border-rarity-common/30',
        uncommon: 'bg-rarity-uncommon/20 text-rarity-uncommon border border-rarity-uncommon/30',
        rare: 'bg-rarity-rare/20 text-rarity-rare border border-rarity-rare/30',
        epic: 'bg-rarity-epic/20 text-rarity-epic border border-rarity-epic/30',
        legendary: 'bg-rarity-legendary/20 text-rarity-legendary border border-rarity-legendary/30',
        mythic: 'bg-rarity-mythic/20 text-rarity-mythic border border-rarity-mythic/30',
        // Class variants
        warrior: 'bg-class-warrior/20 text-class-warrior border border-class-warrior/30',
        ninja: 'bg-class-ninja/20 text-class-ninja border border-class-ninja/30',
        shaman: 'bg-class-shaman/20 text-class-shaman border border-class-shaman/30',
        necromancer: 'bg-class-necromancer/20 text-class-necromancer border border-class-necromancer/30',
        // Status variants
        success: 'bg-green-500/20 text-green-400 border border-green-500/30',
        warning: 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30',
        error: 'bg-red-500/20 text-red-400 border border-red-500/30',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
