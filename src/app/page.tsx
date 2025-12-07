"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { HeroBackground } from "@/components/hero-background"
import { 
  Users, 
  Map,
  Sparkles,
  BarChart3,
  BookOpen,
  Image as ImageIcon
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function Home() {
  const [playerCount, setPlayerCount] = useState("-/-") // Default fallback
  const [isOnline, setIsOnline] = useState(true)

  useEffect(() => {
    const fetchPlayerCount = async () => {
      try {
        const url = 'https://api.mcsrvstat.us/2/play.valesmp.com'
        console.log('Fetching player count from:', url)
        
        // Simple fetch with no headers
        const response = await fetch(url)
        console.log('Response status:', response.status)
        
        const data = await response.json()
        console.log('API Response:', data)
        
        if (data.online) {
          console.log('Server online, players:', data.players.online)
          setPlayerCount(data.players.online)
          setIsOnline(true)
        } else {
          console.log('Server offline')
          setIsOnline(false)
        }
      } catch (error) {
        console.error('Failed to fetch player count:', error)
        // Keep the default value on error
      }
    }

    // Fetch immediately
    fetchPlayerCount()
    
    // Refresh every 2 minutes
    const interval = setInterval(fetchPlayerCount, 120000)
    
    return () => clearInterval(interval)
  }, [])

  return (
    <main className="min-h-screen bg-[#0F1216]">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
      <HeroBackground />
      <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-b from-transparent to-[#0d1117] z-[1]" />      

        <div className=" container relative mx-auto px-4 py-24">
          <div className="mx-auto max-w-4xl text-center">
            <Badge variant="outline" className="mb-6 border-vale-green/50">
              <Sparkles className="mr-1 h-3 w-3" />
              Season 1 Live
            </Badge>
            
            <h1 className="mb-6 text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl font-ranyth">
              <span className="bg-gradient-to-r from-vale-blue-light to-vale-green bg-clip-text text-transparent">
                VALESMP
              </span>
            </h1>
            
            <p className="mb-8 text-xl text-muted-foreground">
              A vanilla+ survival experience with custom features, 
              three unique worlds, and an amazing community.
            </p>

            {/* CTA Button */}
            <div className="flex justify-center">
              <Link href="https://discord.gg/ut7KJgANkY" target="_blank" rel="noopener noreferrer">
                <Button 
                  size="lg" 
                  className="bg-vale-blue-light hover:bg-vale-blue-light/90 transition-all duration-200 hover:scale-105 px-10 py-7 text-xl font-bold tracking-wide shadow-lg font-ranyth"
                >
                  <svg className="mr-1 h-8 w-8" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z"/>
                  </svg>
                  Join the Discord!
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="py-2">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="rounded-lg bg-[#262626] p-8">
            <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
              <div className="text-center">
                <div className="text-3xl font-bold bg-gradient-to-r from-vale-blue to-vale-blue-light bg-clip-text text-transparent">
                  {isOnline ? playerCount : '---'}
                </div>
                <div className="text-sm text-muted-foreground">
                   {isOnline ? 'Players Online' : 'Server is Offline'}
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold bg-gradient-to-r from-vale-green to-vale-green-dark bg-clip-text text-transparent">1.21.10</div>
                <div className="text-sm text-muted-foreground">Latest Version</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold bg-gradient-to-r from-vale-blue-light to-vale-blue bg-clip-text text-transparent">24/7</div>
                <div className="text-sm text-muted-foreground">Uptime</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold bg-gradient-to-r from-vale-green-dark to-vale-green bg-clip-text text-transparent">3</div>
                <div className="text-sm text-muted-foreground">Unique Worlds</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 relative overflow-hidden">
        
        <div className="container mx-auto max-w-6xl px-4 relative z-10">
          <h2 className="mb-12 text-center text-4xl font-bold font-ranyth">THE VALESMP EXPERIENCE</h2>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Link 
              href="/maps"
              className="group"
            >
              <Card className="h-full border-0 bg-[#262626] transition-all duration-200 hover:scale-105 hover:bg-[#425368] hover:shadow-lg hover:shadow-vale-blue/35">
                <div className="p-6">
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-vale-blue/10">
                    <Map className="h-6 w-6 text-vale-blue-light" />
                  </div>
                  <h3 className="mb-2 text-lg font-semibold">Live Maps</h3>
                  <p className="text-sm text-muted-foreground">
                    Real-time Pl3xmap integration for all worlds
                  </p>
                </div>
              </Card>
            </Link>

            <Link 
              href="https://discord.gg/valesmp"
              target="_blank"
              rel="noopener noreferrer"
              className="group"
            >
              <Card className="h-full border-0 bg-[#262626] transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-vale-green/35 hover:bg-[#4E784C]">
                <div className="p-6">
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-vale-green/10">
                    <Users className="h-6 w-6 text-vale-green" />
                  </div>
                  <h3 className="mb-2 text-lg font-semibold">Active Community</h3>
                  <p className="text-sm text-muted-foreground">
                    Friendly players and regular community events
                  </p>
                </div>
              </Card>
            </Link>

            <Link 
              href="/guide"
              className="group"
            >
              <Card className="h-full border-0 bg-[#262626] transition-all duration-200 hover:scale-105 hover:bg-[#425368] hover:shadow-lg hover:shadow-vale-blue/35">
                <div className="p-6">
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-vale-blue-light/10">
                    <BookOpen className="h-6 w-6 text-vale-blue-light" />
                  </div>
                  <h3 className="mb-2 text-lg font-semibold">Guide</h3>
                  <p className="text-sm text-muted-foreground">
                    To all our QoL improvements and custom features
                  </p>
                </div>
              </Card>
            </Link>

            <Link 
              href="/stats"
              className="group"
            >
              <Card className="h-full border-0 bg-[#262626] transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-vale-green/35 hover:bg-[#4E784C]">
                <div className="p-6">
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-vale-green-dark/10">
                    <BarChart3 className="h-6 w-6 text-vale-green" />
                  </div>
                  <h3 className="mb-2 text-lg font-semibold">Server Stats</h3>
                  <p className="text-sm text-muted-foreground">
                    Track player activity and server performance
                  </p>
                </div>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* Server Showcase */}
      <section className="pb-24">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 font-ranyth">SERVER SHOWCASE</h2>
            <p className="text-xl text-muted-foreground">
              Explore the amazing builds created by our community
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {/* Placeholder for server images */}
            <Card className="overflow-hidden border-0 bg-[#161b22]">
              <div className="aspect-video bg-[#0d1117] flex items-center justify-center">
                <ImageIcon className="h-12 w-12 text-muted-foreground" />
              </div>
              <div className="p-4">
                <h3 className="font-semibold font-ranyth">Spawn Area</h3>
                <p className="text-sm text-muted-foreground">Our beautiful spawn build</p>
              </div>
            </Card>

            <Card className="overflow-hidden border-0 bg-[#161b22]">
              <div className="aspect-video bg-[#0d1117] flex items-center justify-center">
                <ImageIcon className="h-12 w-12 text-muted-foreground" />
              </div>
              <div className="p-4">
                <h3 className="font-semibold font-ranyth">Shopping District</h3>
                <p className="text-sm text-muted-foreground">Player-run economy hub</p>
              </div>
            </Card>

            <Card className="overflow-hidden border-0 bg-[#161b22]">
              <div className="aspect-video bg-[#0d1117] flex items-center justify-center">
                <ImageIcon className="h-12 w-12 text-muted-foreground" />
              </div>
              <div className="p-4">
                <h3 className="font-semibold font-ranyth">Community Projects</h3>
                <p className="text-sm text-muted-foreground">Collaborative mega builds</p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      <footer className="bg-[#16191d] border-t border-white/10">
        {/* Main Footer Content */}
        <div className="container mx-auto max-w-6xl px-4 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
            
            {/* Brand Column */}
            <div className="col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <Image src="/logo.png" alt="ValeSMP" width={40} height={40} className="h-10 w-10" />
                <span className="text-xl font-bold font-ranyth">ValeSMP</span>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                A semi-vanilla survival experience with custom features.
              </p>
              <div className="flex items-center gap-2">
                <a 
                  href="https://github.com/valesmp" 
                  className="text-sm text-vale-green hover:underline flex items-center gap-1"
                >
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  Open Source
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-semibold mb-3 font-ranyth">About</h3>
              <ul className="space-y-2 text-sm">
                {/* <li><a href="/news" className="text-muted-foreground hover:text-white">News</a></li>
                <li><a href="/changelog" className="text-muted-foreground hover:text-white">Changelog</a></li>
                <li><a href="/team" className="text-muted-foreground hover:text-white">Team</a></li>*/}
                <li><a href="https://patreon.com/valesmp" className="text-muted-foreground hover:text-white">Support Us</a></li>
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h3 className="font-semibold mb-3 font-ranyth">Resources</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="/guide" className="text-muted-foreground hover:text-white">Guide</a></li>
                <li><a href="/maps" className="text-muted-foreground hover:text-white">Maps</a></li>
                <li><a href="/stats" className="text-muted-foreground hover:text-white">Stats</a></li>
                {/* <li><a href="/api" className="text-muted-foreground hover:text-white">API</a></li> */}
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h3 className="font-semibold mb-3 font-ranyth">Legal</h3>
              <ul className="space-y-2 text-sm">
                {/* <li><a href="/rules" className="text-muted-foreground hover:text-white">Content Rules</a></li> */}
                <li><a href="/terms" className="text-muted-foreground hover:text-white">Terms of Use</a></li>
                <li><a href="/privacy" className="text-muted-foreground hover:text-white">Privacy Policy</a></li>
                {/* <li><a href="/security" className="text-muted-foreground hover:text-white">Security</a></li> */}
              </ul>
            </div>

            {/* Socials */}
            <div>
              <h3 className="font-semibold mb-3 font-ranyth">Socials</h3>
              <div className="flex gap-3">
                <a href="https://discord.gg/valesmp" className="text-muted-foreground hover:text-white">
                  {/* Discord icon */}
                </a>
                <a href="https://twitter.com/valesmp" className="text-muted-foreground hover:text-white">
                  {/* Twitter icon */}
                </a>
                <a href="https://youtube.com/@valesmp" className="text-muted-foreground hover:text-white">
                  {/* YouTube icon */}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10">
          <div className="container mx-auto max-w-6xl px-4 py-4">
            <div className="flex flex-col md:flex-row justify-between items-center text-xs text-muted-foreground">
              <p>© 2025 ValeSMP. Not affiliated with Mojang Studios or Microsoft in any way.</p>
              <p>Made with <Image src="/heart.png" alt="love" width={16} height={16} className="inline-block h-4 w-4 mx-1 hover:scale-110 transition-transform"/> by the ValeSMP Team </p>
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}