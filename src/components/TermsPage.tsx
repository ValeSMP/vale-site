"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Link from "next/link"
import { ChevronLeft, ScrollText, AlertTriangle, Users, Heart, Ban, Sparkles, CreditCard, Scale } from "lucide-react"

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-[#0F1216]">
      <div className="container mx-auto max-w-4xl px-4 py-8">
        {/* Back button */}
        <Link href="/">
          <Button 
            variant="ghost" 
            className="mb-6 text-vale-blue-light hover:bg-vale-blue/10 hover:text-vale-blue-light"
          >
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </Link>

        {/* Header */}
        <div className="mb-8 text-center">
          <div className="inline-flex h-16 w-16 items-center justify-center rounded-lg bg-vale-green/10 mb-4">
            <ScrollText className="h-8 w-8 text-vale-green" />
          </div>
          <h1 className="text-4xl font-bold mb-4 font-ranyth">
            <span className="bg-gradient-to-r from-vale-green to-vale-blue-light bg-clip-text text-transparent">
              TERMS OF USE
            </span>
          </h1>
          <p className="text-muted-foreground">
            Last updated: August 23rd, 2025
          </p>
        </div>

        {/* Content */}
        <div className="space-y-6">
          <Card className="bg-[#161b22] border-white/10 p-8">
            <h2 className="text-2xl font-bold text-vale-blue-light mb-4 font-ranyth">Welcome to ValeSMP!</h2>
            <p className="text-muted-foreground mb-4">
              By accessing our website (valesmp.com) or joining our Minecraft server (play.valesmp.com), 
              you agree to these Terms of Use. If you don&apos;t agree with any part of these terms, 
              please don&apos;t use our services.
            </p>
            <p className="text-muted-foreground">
              We&apos;re a community-focused server, and these terms help ensure everyone has a great experience.
            </p>
          </Card>

          <Card className="bg-[#161b22] border-white/10 p-8">
            <div className="flex items-center gap-3 mb-4">
              <Users className="h-5 w-5 text-vale-green" />
              <h2 className="text-2xl font-bold text-vale-green font-ranyth">1. Acceptance of Terms</h2>
            </div>
            
            <ul className="space-y-2 text-muted-foreground">
              <li>• You must be at least 16 years old to use our services</li>
              <li>• If you&apos;re under 18, you should have parental permission</li>
              <li>• You&apos;re responsible for your account and all activity under it</li>
              <li>• Alt accounts are treated as your own account, and any action taken will be taken against all accounts attached to you</li>
            </ul>
          </Card>

          <Card className="bg-[#161b22] border-white/10 p-8">
            <div className="flex items-center gap-3 mb-4">
              <AlertTriangle className="h-5 w-5 text-vale-blue-light" />
              <h2 className="text-2xl font-bold text-vale-blue-light font-ranyth">2. Server Rules</h2>
            </div>
            
            <p className="text-muted-foreground mb-4">
              By playing on ValeSMP, you agree to follow our server rules:
            </p>
            <ul className="space-y-2 text-muted-foreground">
              <li>• Be respectful to all players and staff</li>
              <li>• No griefing, stealing, or destroying others&apos; builds</li>
              <li>• No cheating, hacking, or exploiting</li>
              <li>• No hate speech, discrimination, or harassment</li>
              <li>• Keep content appropriate (no NSFW)</li>
              <li>• English only in public chat for moderation purposes</li>
            </ul>
            <p className="text-sm text-vale-green mt-4">
              Full rules available at <Link href="/guide" className="underline hover:text-vale-green-dark">valesmp.com/guide</Link>
            </p>
          </Card>

          <Card className="bg-[#161b22] border-white/10 p-8">
            <div className="flex items-center gap-3 mb-4">
              <Heart className="h-5 w-5 text-vale-green" />
              <h2 className="text-2xl font-bold text-vale-green font-ranyth">3. Acceptable Use</h2>
            </div>
            
            <p className="text-muted-foreground mb-4">You agree NOT to:</p>
            <ul className="space-y-2 text-muted-foreground">
              <li>• Impersonate staff or other players</li>
              <li>• Share personal information of others without consent</li>
              <li>• Attempt to access restricted areas or admin commands</li>
              <li>• Disrupt server performance or other players&apos; experiences</li>
              <li>• Use the server for commercial purposes without permission</li>
              <li>• Create inappropriate builds or use offensive skins</li>
              <li>• Abuse bugs or glitches instead of reporting them</li>
            </ul>
          </Card>

          <Card className="bg-[#161b22] border-white/10 p-8">
            <div className="flex items-center gap-3 mb-4">
              <Sparkles className="h-5 w-5 text-vale-blue-light" />
              <h2 className="text-2xl font-bold text-vale-blue-light font-ranyth">4. User Content</h2>
            </div>
            
            <p className="text-muted-foreground mb-4">
              When you create content on our server (builds, messages, etc.):
            </p>
            <ul className="space-y-2 text-muted-foreground">
              <li>• You retain ownership of your creative builds</li>
              <li>• You grant us permission to include your builds in promotional content</li>
              <li>• Your builds may appear in server tours, videos, or screenshots</li>
              <li>• We may showcase exceptional builds on our website or social media</li>
              <li>• We reserve the right to remove inappropriate content without warning or notification</li>
            </ul>
          </Card>

          <Card className="bg-[#161b22] border-white/10 p-8">
            <div className="flex items-center gap-3 mb-4">
              <CreditCard className="h-5 w-5 text-vale-green" />
              <h2 className="text-2xl font-bold text-vale-green font-ranyth">5. Donations & Ranks</h2>
            </div>
            
            <ul className="space-y-2 text-muted-foreground">
              <li>• Donations are voluntary and help keep the server running</li>
              <li>• Patron perks are cosmetic and quality-of-life improvements only</li>
              <li>• We maintain a strict non-pay-to-win environment</li>
              <li>• Donations are non-refundable</li>
              <li>• Perks may change as we balance server features, existing patron members would be notified in advance and their views considered before any change is made</li>
              <li>• Breaking rules can result in loss of patron status without refund</li>
            </ul>
          </Card>

          <Card className="bg-[#161b22] border-white/10 p-8">
            <div className="flex items-center gap-3 mb-4">
              <Ban className="h-5 w-5 text-vale-red" />
              <h2 className="text-2xl font-bold text-vale-red font-ranyth">6. Enforcement & Consequences</h2>
            </div>
            
            <p className="text-muted-foreground mb-4">
              Violations of these terms or server rules may result in:
            </p>
            <ul className="space-y-2 text-muted-foreground">
              <li>• Warnings (verbal or written)</li>
              <li>• Temporary mute or restriction</li>
              <li>• Temporary ban from the server</li>
              <li>• Permanent ban for severe or repeated violations</li>
              <li>• Removal of builds or rolled back changes</li>
              <li>• Loss of privileges or patron status</li>
            </ul>
            <p className="text-sm text-vale-blue-light mt-4">
              Staff decisions are final, but you may appeal through our Discord ticket system.
            </p>
          </Card>

          <Card className="bg-[#161b22] border-white/10 p-8">
            <h2 className="text-2xl font-bold text-vale-blue-light mb-4 font-ranyth">7. Disclaimers</h2>
            
            <ul className="space-y-2 text-muted-foreground">
              <li>• The server is provided &quot;as is&quot; without warranties</li>
              <li>• We&apos;re not responsible for data loss or downtime</li>
              <li>• We may have maintenance or unexpected outages, but will inform you as much as we can in advance</li>
              <li>• Gameplay experience may vary based on your connection</li>
              <li>• We&apos;re not liable for player interactions or disputes, but please contact staff in case of serious issues</li>
            </ul>
          </Card>

          <Card className="bg-[#161b22] border-white/10 p-8">
            <h2 className="text-2xl font-bold text-vale-green mb-4 font-ranyth">8. Intellectual Property</h2>
            
            <ul className="space-y-2 text-muted-foreground">
              <li>• Minecraft is owned by Mojang Studios/Microsoft</li>
              <li>• We&apos;re not affiliated with Mojang or Microsoft</li>
              <li>• ValeSMP branding and custom content belongs to us</li>
              <li>• Respect copyrights when creating builds or content</li>
              <li>• Please don&apos;t use our branding without permission</li>
            </ul>
          </Card>

          <Card className="bg-[#161b22] border-white/10 p-8">
            <h2 className="text-2xl font-bold text-vale-blue-light mb-4 font-ranyth">9. Privacy</h2>
            
            <p className="text-muted-foreground">
              Your privacy is important to us. Please review our{' '}
              <Link href="/privacy" className="text-vale-blue-light underline hover:text-vale-blue">
                Privacy Policy
              </Link>
              {' '}to understand how we collect and use information.
            </p>
          </Card>

          <Card className="bg-[#161b22] border-white/10 p-8">
            <h2 className="text-2xl font-bold text-vale-green mb-4 font-ranyth">10. Changes to Terms</h2>
            
            <p className="text-muted-foreground">
              We may update these terms occasionally. Significant changes will be announced on our 
              Discord server. Continued use of our services after changes means you accept the new terms.
            </p>
          </Card>

          <Card className="bg-[#161b22] border-white/10 p-8">
            <div className="flex items-center gap-3 mb-4">
              <Scale className="h-5 w-5 text-vale-blue-light" />
              <h2 className="text-2xl font-bold text-vale-blue-light font-ranyth">11. Governing Law</h2>
            </div>
            
            <p className="text-muted-foreground">
              These terms are governed by the laws of the United Kingdom. Any disputes will be 
              resolved through good faith discussion in our community first.
            </p>
          </Card>

          <Card className="bg-[#161b22] border-white/10 p-8">
            <h2 className="text-2xl font-bold text-vale-green mb-4 font-ranyth">12. Contact Information</h2>
            
            <p className="text-muted-foreground mb-4">
              Questions about these terms? Reach out to us:
            </p>
            <div className="space-y-2">
              <p className="text-muted-foreground">• Discord: Submit a ticket in #support-tickets</p>
              <p className="text-muted-foreground">• Website: valesmp.com</p>
              <Link href="https://discord.gg/ut7KJgANkY" target="_blank">
                <Button className="mt-4 bg-vale-green hover:bg-vale-green-dark">
                  Join our Discord
                </Button>
              </Link>
            </div>
          </Card>

          {/* Final message */}
          <Card className="bg-gradient-to-r from-vale-blue/10 to-vale-green/10 border-vale-green/30 p-8">
            <div className="text-center">
              <Heart className="h-8 w-8 text-vale-green mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2 font-ranyth">Thank You!</h3>
              <p className="text-muted-foreground">
                Thanks for taking the time to read our terms. We&apos;re excited to have you as part of 
                the ValeSMP community! Let&apos;s build something amazing together.
              </p>
            </div>
          </Card>
        </div>
      </div>
    </main>
  )
}