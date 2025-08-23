"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Link from "next/link"
import { ChevronLeft, Shield, Mail, Database, Cookie, ExternalLink, Lock } from "lucide-react"

export default function PrivacyPage() {
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
          <div className="inline-flex h-16 w-16 items-center justify-center rounded-lg bg-vale-blue-light/10 mb-4">
            <Shield className="h-8 w-8 text-vale-blue-light" />
          </div>
          <h1 className="text-4xl font-bold mb-4 font-ranyth">
            <span className="bg-gradient-to-r from-vale-blue-light to-vale-green bg-clip-text text-transparent">
              PRIVACY POLICY
            </span>
          </h1>
          <p className="text-muted-foreground">
            Last updated: August 24th, 2025
          </p>
        </div>

        {/* Content */}
        <div className="space-y-6">
          <Card className="bg-[#161b22] border-white/10 p-8">
            <h2 className="text-2xl font-bold text-vale-green mb-4 font-ranyth">Overview</h2>
            <p className="text-muted-foreground mb-4">
              ValeSMP (&quot;we&quot;, &quot;our&quot;, or &quot;the server&quot;) respects your privacy and is committed to protecting your personal data. 
              This privacy policy explains how we collect, use, and protect information when you use our website and Minecraft server.
            </p>
            <p className="text-muted-foreground">
              We&apos;re a community-run Minecraft server, not a big corporation. We only collect what&apos;s necessary to run the server 
              and provide you with the best experience possible.
            </p>
          </Card>

          <Card className="bg-[#161b22] border-white/10 p-8">
            <div className="flex items-center gap-3 mb-4">
              <Database className="h-5 w-5 text-vale-blue-light" />
              <h2 className="text-2xl font-bold text-vale-blue-light font-ranyth">Information We Collect</h2>
            </div>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-vale-green mb-2">Minecraft Server Data</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Your Minecraft username and UUID</li>
                  <li>• In-game statistics (blocks mined, distance traveled, etc.)</li>
                  <li>• Chat messages and commands used in-game for moderation purposes</li>
                  <li>• IP address for connection and security purposes</li>
                  <li>• Build locations and land claims you create</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-vale-green mb-2">Website Data</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Basic analytics (page views, general location by country)</li>
                  <li>• Technical information (browser type, device type)</li>
                  <li>• Preferences stored in your browser (theme settings, etc.)</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-vale-green mb-2">Discord Data</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Discord username linking to Minecraft username, for whitelist applications</li>
                  <li>• Messages sent in our Discord server</li>
                  <li>• Support ticket contents</li>
                </ul>
              </div>
            </div>
          </Card>

          <Card className="bg-[#161b22] border-white/10 p-8">
            <div className="flex items-center gap-3 mb-4">
              <Lock className="h-5 w-5 text-vale-green" />
              <h2 className="text-2xl font-bold text-vale-green font-ranyth">How We Use Your Information</h2>
            </div>
            
            <ul className="space-y-2 text-muted-foreground">
              <li>• To provide and maintain the Minecraft server</li>
              <li>• To enforce server rules and prevent griefing</li>
              <li>• To display player statistics and leaderboards</li>
              <li>• To restore inventories or investigate issues</li>
              <li>• To communicate important server updates</li>
              <li>• To improve server performance and features</li>
            </ul>
          </Card>

          <Card className="bg-[#161b22] border-white/10 p-8">
            <div className="flex items-center gap-3 mb-4">
              <Cookie className="h-5 w-5 text-vale-blue-light" />
              <h2 className="text-2xl font-bold text-vale-blue-light font-ranyth">Cookies & Storage</h2>
            </div>
            
            <p className="text-muted-foreground mb-4">
              Our website uses minimal cookies and local storage for:
            </p>
            <ul className="space-y-2 text-muted-foreground">
              <li>• Remembering your theme preference (dark/light mode)</li>
              <li>• Basic functionality of interactive features</li>
              <li>• No tracking cookies or advertising cookies are used</li>
            </ul>
          </Card>

          <Card className="bg-[#161b22] border-white/10 p-8">
            <h2 className="text-2xl font-bold text-vale-green mb-4 font-ranyth">Data Sharing</h2>
            
            <p className="text-muted-foreground mb-4">
              We do not sell, trade, or rent your personal information to others. We may share information only in these cases:
            </p>
            <ul className="space-y-2 text-muted-foreground">
              <li>• Public leaderboards (username and stats only)</li>
              <li>• With Mojang/Microsoft for authentication</li>
              <li>• When required by law or to protect the server</li>
              <li>• Server backups stored securely</li>
            </ul>
          </Card>

          <Card className="bg-[#161b22] border-white/10 p-8">
            <h2 className="text-2xl font-bold text-vale-blue-light mb-4 font-ranyth">Data Retention</h2>
            
            <ul className="space-y-2 text-muted-foreground">
              <li>• Game statistics: Kept indefinitely for historical records</li>
              <li>• Chat logs: Retained for 30 days for moderation</li>
              <li>• IP addresses: Retained for 90 days for security</li>
              <li>• Backups: Kept according to our backup rotation policy</li>
            </ul>
          </Card>

          <Card className="bg-[#161b22] border-white/10 p-8">
            <h2 className="text-2xl font-bold text-vale-green mb-4 font-ranyth">Your Rights</h2>
            
            <p className="text-muted-foreground mb-4">You have the right to:</p>
            <ul className="space-y-2 text-muted-foreground">
              <li>• Request a copy of your data</li>
              <li>• Request correction of inaccurate data</li>
              <li>• Request deletion of your data (may affect your ability to play)</li>
              <li>• Opt-out of public statistics display</li>
            </ul>
            <p className="text-muted-foreground mt-4">
              To exercise these rights, please contact a member of staff on Discord or submit a support ticket.
            </p>
          </Card>

          <Card className="bg-[#161b22] border-white/10 p-8">
            <h2 className="text-2xl font-bold text-vale-blue-light mb-4 font-ranyth">Children&apos;s Privacy</h2>
            
            <p className="text-muted-foreground">
              While Minecraft is enjoyed by players of all ages, we run a strict policy of 16+ for players on ValeSMP. This is for the protection of both the younger and the older players, and to keep a safe and moderated environment for everybody to enjoy. We take the safety of all our players, in particular those from 16-18 very seriously. Our staff team are on alert for any potential doxxing, be it intentional or not, as well keeping on top of stereotypical issues that public Minecraft servers and the internet in general, may bring with it.
            </p>
            <p>We do not knowingly or intentionally collect personal information from anybody on our server 
              under 18 beyond what&apos;s necessary for gameplay.</p>
          </Card>

          <Card className="bg-[#161b22] border-white/10 p-8">
            <h2 className="text-2xl font-bold text-vale-green mb-4 font-ranyth">Security</h2>
            
            <p className="text-muted-foreground">
              We implement appropriate security measures to protect your information, including:
            </p>
            <ul className="space-y-2 text-muted-foreground mt-4">
              <li>• Secure server hosting with regular updates</li>
              <li>• Extremely Limited access to sensitive data (Currently Owner only, even staff do not have access)</li>
              <li>• Regular backups stored securely, in multiple locations with secure storage systems and redundancy</li>
              <li>• Encrypted connections where possible, especially where sensitive data is being manouvered between locations or servers</li>
            </ul>
          </Card>

          <Card className="bg-[#161b22] border-white/10 p-8">
            <h2 className="text-2xl font-bold text-vale-blue-light mb-4 font-ranyth">Changes to This Policy</h2>
            
            <p className="text-muted-foreground">
              We may update this privacy policy from time to time. We will notify you of any significant changes 
              by posting an announcement on our Discord server and updating the &quot;Last updated&quot; date above.
            </p>
          </Card>

          <Card className="bg-[#161b22] border-white/10 p-8">
            <div className="flex items-center gap-3 mb-4">
              <Mail className="h-5 w-5 text-vale-green" />
              <h2 className="text-2xl font-bold text-vale-green font-ranyth">Contact Us</h2>
            </div>
            
            <p className="text-muted-foreground mb-4">
              If you have any questions about this privacy policy or our data practices, please contact us:
            </p>
            <div className="space-y-2">
              <Link href="https://discord.gg/ut7KJgANkY" target="_blank">
                <Button variant="outline" className="text-vale-blue-light border-vale-blue-light/30 hover:bg-vale-blue-light/10">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Discord Server
                </Button>
              </Link>
              <p className="text-sm text-muted-foreground mt-2">
                Submit a support ticket in #support-tickets
              </p>
            </div>
          </Card>
        </div>
      </div>
    </main>
  )
}