import Link from 'next/link'
import { Github, MessageCircle } from 'lucide-react'

export function Footer() {
  return (
    <footer className="border-t border-border-primary bg-bg-secondary">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-accent-primary rounded-md flex items-center justify-center">
                <span className="text-white font-bold text-lg">E</span>
              </div>
              <span className="text-lg font-bold text-text-primary">Epitome Codex</span>
            </Link>
            <p className="mt-3 text-sm text-text-secondary">
              The ultimate database and tool collection for Epitome MMORPG players.
            </p>
          </div>

          {/* Database */}
          <div>
            <h3 className="text-sm font-semibold text-text-primary mb-3">Database</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/items" className="text-sm text-text-secondary hover:text-text-primary transition-colors">
                  Items
                </Link>
              </li>
              <li>
                <Link href="/classes" className="text-sm text-text-secondary hover:text-text-primary transition-colors">
                  Classes
                </Link>
              </li>
              <li>
                <Link href="/map" className="text-sm text-text-secondary hover:text-text-primary transition-colors">
                  World Map
                </Link>
              </li>
            </ul>
          </div>

          {/* Community */}
          <div>
            <h3 className="text-sm font-semibold text-text-primary mb-3">Community</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/builds" className="text-sm text-text-secondary hover:text-text-primary transition-colors">
                  Builds
                </Link>
              </li>
              <li>
                <Link href="/guides" className="text-sm text-text-secondary hover:text-text-primary transition-colors">
                  Guides
                </Link>
              </li>
              <li>
                <Link href="/builds/planner" className="text-sm text-text-secondary hover:text-text-primary transition-colors">
                  Build Planner
                </Link>
              </li>
            </ul>
          </div>

          {/* Tools */}
          <div>
            <h3 className="text-sm font-semibold text-text-primary mb-3">Tools</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/tools/xp-table" className="text-sm text-text-secondary hover:text-text-primary transition-colors">
                  XP Table
                </Link>
              </li>
              <li>
                <Link href="/tools" className="text-sm text-text-secondary hover:text-text-primary transition-colors">
                  All Tools
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-8 pt-8 border-t border-border-primary flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-4">
            <a
              href="#"
              className="text-text-muted hover:text-text-primary transition-colors"
              aria-label="Discord"
            >
              <MessageCircle className="w-5 h-5" />
            </a>
            <a
              href="#"
              className="text-text-muted hover:text-text-primary transition-colors"
              aria-label="GitHub"
            >
              <Github className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-6 pt-6 border-t border-border-primary text-center">
          <p className="text-xs text-text-muted leading-relaxed">
            © 2026 EpitomeCodex - All intellectual property and assets related to Epitome Game are reserved by Epitome P.S.A..<br />
            This site is fan-made and not affiliated with Epitome Game or Epitome P.S.A..<br />
            Made with ❤️ for Epitome Game. This site is a work in progress and development is a moving train.
          </p>
        </div>
      </div>
    </footer>
  )
}
