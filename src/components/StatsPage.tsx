'use client';

import React, { useState, useEffect } from 'react';
import { Crown, Clock, Search, ChevronLeft, Sparkles, Sword, Pickaxe, Map, Heart, Skull, Diamond, Hammer, Fish, Shield, Zap, Eye, LucideProps } from 'lucide-react';
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import Image from "next/image";

// Types
interface Player {
  uuid: string;
  name: string;
  crownScore: number;
  lastOnline: string;
  playtime: number;
  medals: {
    gold: number;
    silver: number;
    bronze: number;
  };
}

interface Ranking {
  player: string;
  value: number;
  medal?: 'gold' | 'silver' | 'bronze';
}

interface Award {
  id: string;
  name: string;
  objective: string;
  icon: React.ComponentType<LucideProps>;
  winner: {
    name: string;
    value: number;
    uuid: string;
  };
  allRankings: Ranking[];
}

interface Event {
  id: string;
  name: string;
  status: string;
  winner: string;
  endTime: string;
  participants: number;
}

const StatsPage = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedAward, setSelectedAward] = useState<Award | null>(null);

  // Mock data until API sorted
  const mockData: {
    players: Player[];
    awards: Award[];
    events: Event[];
  } = {
    players: [
      { uuid: '1', name: 'ValeCraft_Pro', crownScore: 142, lastOnline: '2025-01-14', playtime: 3456789, medals: { gold: 4, silver: 8, bronze: 15 } },
      { uuid: '2', name: 'BlockMaster42', crownScore: 128, lastOnline: '2025-01-14', playtime: 2987654, medals: { gold: 3, silver: 7, bronze: 14 } },
      { uuid: '3', name: 'MinecraftLegend', crownScore: 115, lastOnline: '2025-01-13', playtime: 2654321, medals: { gold: 2, silver: 9, bronze: 12 } },
      { uuid: '4', name: 'DiamondHunter', crownScore: 98, lastOnline: '2025-01-14', playtime: 2345678, medals: { gold: 2, silver: 5, bronze: 11 } },
      { uuid: '5', name: 'RedstoneWizard', crownScore: 87, lastOnline: '2025-01-12', playtime: 2123456, medals: { gold: 1, silver: 6, bronze: 13 } },
    ],
    awards: [
      {
        id: 'dedication',
        name: 'Dedication',
        objective: 'most time played',
        icon: Clock,
        winner: { name: 'ValeCraft_Pro', value: 3456789, uuid: '1' },
        allRankings: [
          { player: 'ValeCraft_Pro', value: 3456789, medal: 'gold' },
          { player: 'BlockMaster42', value: 2987654, medal: 'silver' },
          { player: 'MinecraftLegend', value: 2654321, medal: 'bronze' },
          { player: 'DiamondHunter', value: 2345678 },
          { player: 'RedstoneWizard', value: 2123456 },
        ]
      },
      {
        id: 'miner',
        name: 'Super Miner',
        objective: 'most blocks mined',
        icon: Pickaxe,
        winner: { name: 'DiamondHunter', value: 156789, uuid: '4' },
        allRankings: [
          { player: 'DiamondHunter', value: 156789, medal: 'gold' },
          { player: 'MinecraftLegend', value: 134567, medal: 'silver' },
          { player: 'ValeCraft_Pro', value: 123456, medal: 'bronze' },
        ]
      },
      {
        id: 'builder',
        name: 'Master Builder',
        objective: 'most blocks placed',
        icon: Hammer,
        winner: { name: 'BlockMaster42', value: 234567, uuid: '2' },
        allRankings: [
          { player: 'BlockMaster42', value: 234567, medal: 'gold' },
          { player: 'RedstoneWizard', value: 198765, medal: 'silver' },
          { player: 'ValeCraft_Pro', value: 187654, medal: 'bronze' },
        ]
      },
      {
        id: 'explorer',
        name: 'World Explorer',
        objective: 'longest distance traveled',
        icon: Map,
        winner: { name: 'MinecraftLegend', value: 987654, uuid: '3' },
        allRankings: [
          { player: 'MinecraftLegend', value: 987654, medal: 'gold' },
          { player: 'ValeCraft_Pro', value: 876543, medal: 'silver' },
          { player: 'DiamondHunter', value: 765432, medal: 'bronze' },
        ]
      },
      {
        id: 'survivor',
        name: 'Survivor',
        objective: 'fewest deaths',
        icon: Heart,
        winner: { name: 'BlockMaster42', value: 3, uuid: '2' },
        allRankings: [
          { player: 'BlockMaster42', value: 3, medal: 'gold' },
          { player: 'MinecraftLegend', value: 7, medal: 'silver' },
          { player: 'RedstoneWizard', value: 12, medal: 'bronze' },
        ]
      },
      {
        id: 'monster_hunter',
        name: 'Monster Hunter',
        objective: 'most hostile mobs killed',
        icon: Sword,
        winner: { name: 'DiamondHunter', value: 4567, uuid: '4' },
        allRankings: [
          { player: 'DiamondHunter', value: 4567, medal: 'gold' },
          { player: 'ValeCraft_Pro', value: 3987, medal: 'silver' },
          { player: 'BlockMaster42', value: 3456, medal: 'bronze' },
        ]
      },
      {
        id: 'diamond_collector',
        name: 'Diamond Collector',
        objective: 'most diamonds mined',
        icon: Diamond,
        winner: { name: 'DiamondHunter', value: 342, uuid: '4' },
        allRankings: [
          { player: 'DiamondHunter', value: 342, medal: 'gold' },
          { player: 'ValeCraft_Pro', value: 298, medal: 'silver' },
          { player: 'MinecraftLegend', value: 276, medal: 'bronze' },
        ]
      },
      {
        id: 'fisherman',
        name: 'Master Fisherman',
        objective: 'most fish caught',
        icon: Fish,
        winner: { name: 'BlockMaster42', value: 1876, uuid: '2' },
        allRankings: [
          { player: 'BlockMaster42', value: 1876, medal: 'gold' },
          { player: 'RedstoneWizard', value: 1543, medal: 'silver' },
          { player: 'MinecraftLegend', value: 1234, medal: 'bronze' },
        ]
      },
      {
        id: 'sprinter',
        name: 'Speed Demon',
        objective: 'longest distance sprinted',
        icon: Zap,
        winner: { name: 'MinecraftLegend', value: 567890, uuid: '3' },
        allRankings: [
          { player: 'MinecraftLegend', value: 567890, medal: 'gold' },
          { player: 'ValeCraft_Pro', value: 456789, medal: 'silver' },
          { player: 'DiamondHunter', value: 345678, medal: 'bronze' },
        ]
      },
      {
        id: 'dragon_slayer',
        name: 'Dragon Slayer',
        objective: 'ender dragons killed',
        icon: Shield,
        winner: { name: 'ValeCraft_Pro', value: 8, uuid: '1' },
        allRankings: [
          { player: 'ValeCraft_Pro', value: 8, medal: 'gold' },
          { player: 'BlockMaster42', value: 5, medal: 'silver' },
          { player: 'DiamondHunter', value: 3, medal: 'bronze' },
        ]
      },
      {
        id: 'traveler',
        name: 'Dimensional Traveler',
        objective: 'most nether portals used',
        icon: Eye,
        winner: { name: 'RedstoneWizard', value: 876, uuid: '5' },
        allRankings: [
          { player: 'RedstoneWizard', value: 876, medal: 'gold' },
          { player: 'MinecraftLegend', value: 654, medal: 'silver' },
          { player: 'ValeCraft_Pro', value: 543, medal: 'bronze' },
        ]
      },
      {
        id: 'mob_grinder',
        name: 'Mob Grinder',
        objective: 'most creepers killed',
        icon: Skull,
        winner: { name: 'DiamondHunter', value: 987, uuid: '4' },
        allRankings: [
          { player: 'DiamondHunter', value: 987, medal: 'gold' },
          { player: 'BlockMaster42', value: 876, medal: 'silver' },
          { player: 'ValeCraft_Pro', value: 765, medal: 'bronze' },
        ]
      },
    ],
    events: [
      {
        id: 'halloween2024',
        name: 'Halloween Skeleton Hunt',
        status: 'finished',
        winner: 'BlockMaster42',
        endTime: '2024-11-01',
        participants: 47,
      }
    ]
  };

  useEffect(() => {
    // Simulate loading
    setTimeout(() => setLoading(false), 1000);
  }, []);

  const formatPlaytime = (ticks: number): string => {
    const hours = Math.floor(ticks / 72000);
    const minutes = Math.floor((ticks % 72000) / 1200);
    return `${hours}h ${minutes}m`;
  };

  const formatValue = (value: number, awardId: string): string => {
    if (awardId === 'dedication') return formatPlaytime(value);
    if (awardId === 'explorer' || awardId === 'sprinter') return `${(value / 100).toFixed(1)} km`;
    if (awardId === 'survivor') return value.toString(); // Just the number for deaths
    return value.toLocaleString();
  };

  const getMedalEmoji = (medal: string): string => {
    switch (medal) {
      case 'gold': return '🥇';
      case 'silver': return '🥈';
      case 'bronze': return '🥉';
      default: return '';
    }
  };

  const filteredPlayers: Player[] = mockData.players.filter(player =>
    player.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0F1216] text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-vale-blue-light mx-auto mb-4"></div>
          <p className="text-2xl font-ranyth-mixed">Loading Vale SMP Stats...</p>
        </div>
      </div>
    );
  }

  // Modal for full detail view
  const AwardModal = ({ award, onClose }: { award: Award; onClose: () => void }) => {
    if (!award) return null;
    
    const Icon = award.icon;
    
    return (
      <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4" onClick={onClose}>
        <div className="bg-[#262626] rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
          <div className="sticky top-0 bg-[#262626] border-b border-white/10 p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="inline-flex h-14 w-14 items-center justify-center rounded-lg bg-vale-blue-light/10">
                  <Icon className="h-7 w-7 text-vale-blue-light" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold font-ranyth">{award.name}</h2>
                  <p className="text-base text-muted-foreground">{award.objective}</p>
                </div>
              </div>
              <button onClick={onClose} className="text-gray-400 hover:text-white text-2xl">
                ✕
              </button>
            </div>
          </div>
          
          <div className="p-6">
            <div className="space-y-3">
              {award.allRankings.map((ranking: Ranking, index: number) => (
                <div key={index} className="flex items-center justify-between p-4 bg-[#1a1a2a] rounded-lg hover:bg-[#1f1f3a] transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="text-2xl font-bold w-10">
                      {ranking.medal ? getMedalEmoji(ranking.medal) : `#${index + 1}`}
                    </div>
                    <span className="font-ranyth-mixed text-lg">{ranking.player}</span>
                  </div>
                  <span className="text-vale-blue-light font-semibold text-lg">
                    {formatValue(ranking.value, award.id)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <main className="min-h-screen bg-[#0F1216]">
      <div className="container mx-auto max-w-7xl px-4 py-8">
        {/* Back button */}
        <Link href="/">
          <Button 
            variant="ghost" 
            className="mb-0 text-vale-blue-light hover:bg-vale-blue/10 hover:text-vale-blue-light text-base"
          >
            <ChevronLeft className="mr-2 h-5 w-5" />
            Back to Home
          </Button>
        </Link>

        {/* Header */}
        <div className="mx-auto mb-12">
          <h1 className="mb-4 text-center text-5xl font-bold font-ranyth">
            <span className="bg-gradient-to-r from-vale-blue-light to-vale-green bg-clip-text text-transparent">
              PLAYER STATISTICS
            </span>
          </h1>
          <p className="mb-6 text-center text-2xl text-muted-foreground font-ranyth-mixed">
            Track achievements, compete for awards, and climb the leaderboard
          </p>
        </div>

        {/* Navigation Tabs */}
        <Tabs defaultValue="awards" className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-[#262626] border-0 h-12">
            <TabsTrigger 
              value="awards" 
              className="data-[state=active]:bg-vale-blue-light data-[state=active]:text-white font-ranyth-mixed text-base"
            >
              Awards
            </TabsTrigger>
            <TabsTrigger 
              value="hallOfFame" 
              className="data-[state=active]:bg-vale-green data-[state=active]:text-white font-ranyth-mixed text-base"
            >
              Hall of Fame
            </TabsTrigger>
            <TabsTrigger 
              value="players" 
              className="data-[state=active]:bg-vale-blue data-[state=active]:text-white font-ranyth-mixed text-base"
            >
              Players
            </TabsTrigger>
            <TabsTrigger 
              value="events" 
              className="data-[state=active]:bg-vale-green-dark data-[state=active]:text-white font-ranyth-mixed text-base"
            >
              Events
            </TabsTrigger>
          </TabsList>

          {/* Awards - moved to main tab */}
          <TabsContent value="awards" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {mockData.awards.map(award => {
                const Icon = award.icon;
                return (
                  <div
                    key={award.id}
                    onClick={() => setSelectedAward(award)}
                    className="bg-[#262626] rounded-lg p-4 transition-all duration-200 hover:scale-[1.02] hover:shadow-lg hover:shadow-vale-blue/25 cursor-pointer border border-transparent hover:border-vale-blue/30"
                  >
                    <div className="flex items-center gap-3">
                      <div className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-vale-blue-light/10 flex-shrink-0">
                        <Icon className="h-6 w-6 text-vale-blue-light" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-base font-semibold font-ranyth truncate">{award.name}</h3>
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-base font-ranyth-mixed truncate">{award.winner.name}</span>
                          <span className="text-base text-vale-green font-semibold whitespace-nowrap">
                            {formatValue(award.winner.value, award.id)}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground truncate">{award.objective}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </TabsContent>

          {/* Hall of Fame */}
          <TabsContent value="hallOfFame" className="mt-6">
            <div className="space-y-4">
              {mockData.players.map((player, index) => (
                <Card 
                  key={player.uuid} 
                  className={`overflow-hidden border-0 bg-[#262626] transition-all duration-200 hover:scale-[1.02] ${
                    index === 0 ? 'hover:shadow-lg hover:shadow-vale-blue-light/35' : 
                    index === 1 ? 'hover:shadow-lg hover:shadow-gray-300/35' :
                    index === 2 ? 'hover:shadow-lg hover:shadow-orange-600/35' :
                    'hover:shadow-lg hover:shadow-vale-blue/20'
                  }`}
                >
                  <div className="p-6 flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className={`text-4xl font-bold ${
                        index === 0 ? 'text-yellow-400' :
                        index === 1 ? 'text-gray-300' :
                        index === 2 ? 'text-orange-600' :
                        'text-gray-500'
                      }`}>
                        {index === 0 && '🥇'}
                        {index === 1 && '🥈'}
                        {index === 2 && '🥉'}
                        {index > 2 && `#${index + 1}`}
                      </div>
                      <Image
                        src={`https://crafatar.com/avatars/${player.uuid}?size=64&overlay`}
                        alt={player.name}
                        width={80}
                        height={80}
                        className="w-20 h-20 rounded"
                        unoptimized
                      />
                      <div>
                        <h3 className="text-2xl font-semibold font-ranyth-mixed">{player.name}</h3>
                        <p className="text-base text-muted-foreground">
                          {getMedalEmoji('gold')} {player.medals.gold} • 
                          {getMedalEmoji('silver')} {player.medals.silver} • 
                          {getMedalEmoji('bronze')} {player.medals.bronze}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center space-x-2 text-3xl font-bold">
                        <Crown className="h-7 w-7 text-yellow-400" />
                        <span className="bg-gradient-to-r from-vale-blue-light to-vale-green bg-clip-text text-transparent">
                          {player.crownScore}
                        </span>
                      </div>
                      <p className="text-base text-muted-foreground">Crown Score</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Players */}
          <TabsContent value="players" className="mt-6">
            {/* Search Bar */}
            <div className="mb-8">
              <div className="relative max-w-md mx-auto">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search players..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-[#262626] border border-white/10 rounded-lg focus:outline-none focus:border-vale-blue-light transition-colors text-white text-base"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPlayers.map(player => (
                <Card key={player.uuid} className="overflow-hidden border-0 bg-[#262626] transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-vale-green/35">
                  <div className="p-6">
                    <div className="flex items-center space-x-4 mb-4">
                      <Image
                        src={`https://crafatar.com/avatars/${player.uuid}?size=64&overlay`}
                        alt={player.name}
                        width={80}
                        height={80}
                        className="w-20 h-20 rounded"
                        unoptimized
                      />
                      <div>
                        <h3 className="text-xl font-semibold font-ranyth-mixed">{player.name}</h3>
                        <p className="text-base text-muted-foreground">Last online: {player.lastOnline}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-base">
                      <div>
                        <p className="text-muted-foreground text-base">Crown Score</p>
                        <p className="text-2xl font-semibold bg-gradient-to-r from-vale-blue-light to-vale-green bg-clip-text text-transparent">
                          {player.crownScore}
                        </p>
                      </div>
                      <div>
                        <p className="text-muted-foreground text-base">Playtime</p>
                        <p className="text-2xl font-semibold">{formatPlaytime(player.playtime)}</p>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Events */}
          <TabsContent value="events" className="mt-6">
            <div className="space-y-6">
              {mockData.events.map(event => (
                <Card key={event.id} className="overflow-hidden border-0 bg-[#262626]">
                  <div className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-2xl font-semibold font-ranyth">{event.name}</h3>
                          <Badge variant="outline" className="border-vale-green/50 text-sm">
                            <Sparkles className="mr-1 h-4 w-4" />
                            {event.status}
                          </Badge>
                        </div>
                        <p className="text-base text-muted-foreground">Ended: {event.endTime} • {event.participants} participants</p>
                      </div>
                      <div className="text-right">
                        <p className="text-base text-muted-foreground mb-1">Winner</p>
                        <p className="text-3xl font-bold bg-gradient-to-r from-vale-blue-light to-vale-green bg-clip-text text-transparent font-ranyth">
                          {event.winner}
                        </p>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Award Modal */}
        {selectedAward && <AwardModal award={selectedAward} onClose={() => setSelectedAward(null)} />}
      </div>
    </main>
  );
};

export default StatsPage;