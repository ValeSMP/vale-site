"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card } from "@/components/ui/card"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function MapsPage() {
  return (
    <main className="min-h-screen bg-[#0F1216]">
      <div className="container mx-auto max-w-6xl px-4 py-8">
        {/* Back button */}
        <Link href="/">
          <Button 
            variant="ghost" 
            className="mb-0 text-vale-blue-light hover:bg-vale-blue/10 hover:text-vale-blue-light"
          >
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </Link>
        
        <div className="mx-auto">
          <h1 className="mb-4 text-center text-4xl font-bold font-ranyth">
            <span className="bg-gradient-to-r from-vale-blue-light to-vale-green bg-clip-text text-transparent">
              LIVE WORLD MAPS
            </span>
          </h1>
          <p className="mb-12 text-center text-xl text-muted-foreground">
            Explore our worlds in real-time with interactive maps
          </p>
         
          <Tabs defaultValue="smp" className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-[#262626] border-0">
              <TabsTrigger 
                value="smp" 
                className="data-[state=active]:bg-vale-blue-light data-[state=active]:text-white font-ranyth"
              >
                Survival
              </TabsTrigger>
              <TabsTrigger 
                value="creative" 
                className="data-[state=active]:bg-vale-green data-[state=active]:text-white font-ranyth"
              >
                Creative
              </TabsTrigger>
              <TabsTrigger 
                value="resource" 
                className="data-[state=active]:bg-vale-blue data-[state=active]:text-white font-ranyth"
              >
                Resource
              </TabsTrigger>
            </TabsList>
           
            <TabsContent value="smp" className="mt-6">
              <Card className="overflow-hidden border-0 bg-[#262626] transition-all duration-200 hover:shadow-lg hover:shadow-vale-blue-light/35">
                <div className="aspect-video bg-[#0d1117]">
                  <iframe
                    src="https://survival.valesmp.com"
                    className="h-full w-full"
                    title="SMP World Map"
                  />
                </div>
                <div className="p-6">
                  <h3 className="mb-2 text-2xl font-semibold font-ranyth">
                    <span className="bg-gradient-to-r from-vale-blue-light to-vale-blue bg-clip-text text-transparent">
                      Survival World
                    </span>
                  </h3>
                  <p className="text-muted-foreground">
                    Our main world where communities thrive. Build, trade, and explore with friends.
                  </p>
                </div>
              </Card>
            </TabsContent>
           
            <TabsContent value="creative" className="mt-6">
              <Card className="overflow-hidden border-0 bg-[#262626] transition-all duration-200 hover:shadow-lg hover:shadow-vale-green/35">
                <div className="aspect-video bg-[#0d1117]">
                  <iframe
                    src="https://creative.valesmp.com"
                    className="h-full w-full"
                    title="Creative World Map"
                  />
                </div>
                <div className="p-6">
                  <h3 className="mb-2 text-2xl font-semibold font-ranyth">
                    <span className="bg-gradient-to-r from-vale-green to-vale-green-dark bg-clip-text text-transparent">
                      Creative World
                    </span>
                  </h3>
                  <p className="text-muted-foreground">
                    Unlimited resources for your most ambitious builds. Let your creativity run wild.
                  </p>
                </div>
              </Card>
            </TabsContent>
           
            <TabsContent value="resource" className="mt-6">
              <Card className="overflow-hidden border-0 bg-[#262626] transition-all duration-200 hover:shadow-lg hover:shadow-vale-blue/35">
                <div className="aspect-video bg-[#0d1117]">
                  <iframe
                    src="https://resource.valesmp.com"
                    className="h-full w-full"
                    title="Resource World Map"
                  />
                </div>
                <div className="px-6">
                  <h3 className="mb-0 text-2xl font-semibold font-ranyth">
                    <span className="bg-gradient-to-r from-vale-blue to-vale-blue-light bg-clip-text text-transparent">
                      Resource World
                    </span>
                  </h3>
                  <p className="text-muted-foreground">
                    Fresh world that resets monthly. Gather resources without affecting the main world.
                  </p>
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </main>
  )
}