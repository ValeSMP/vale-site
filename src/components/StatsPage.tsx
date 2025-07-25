'use client';

import React, { useState, useEffect } from 'react';
import { Crown, Clock, Search, ChevronLeft, Sword, Pickaxe, Map, Heart, Skull, Diamond, Hammer, Fish, Shield, Zap, Eye, LucideProps } from 'lucide-react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import Image from "next/image";
import { statsAPI, formatStatName, formatStatValue } from '@/lib/minecraft-stats';

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

// interface Event {
//   id: string;
//   name: string;
//   status: string;
//   winner: string;
//   endTime: string;
//   participants: number;
// }

interface ApiRanking {
  username: string;
  value: number;
}

interface StatCategory {
  id: string;
  name: string;
  icon: React.ComponentType<LucideProps>;
  statKeys: string[];
}

const StatsPage = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedAward, setSelectedAward] = useState<Award | null>(null);
  const [awards, setAwards] = useState<Award[]>([]);
  const [players, setPlayers] = useState<Player[]>([]);
  // const [events, setEvents] = useState<Event[]>([]); // TODO: Implement events later
  const [error, setError] = useState<string | null>(null);

  // Define stat categories with their corresponding Minecraft stat keys
  const statCategories: StatCategory[] = [
    {
      id: 'time',
      name: 'Dedication',
      icon: Clock,
      statKeys: ['minecraft:custom:minecraft:play_time', 'minecraft:custom:minecraft:time_since_rest']
    },
    {
      id: 'mining',
      name: 'Super Miner',
      icon: Pickaxe,
      statKeys: [
        'minecraft:mined:minecraft:stone',
        'minecraft:mined:minecraft:deepslate',
        'minecraft:mined:minecraft:coal_ore',
        'minecraft:mined:minecraft:iron_ore',
        'minecraft:mined:minecraft:gold_ore',
        'minecraft:mined:minecraft:diamond_ore',
        'minecraft:mined:minecraft:netherite_ore'
      ]
    },
    {
      id: 'building',
      name: 'Master Builder',
      icon: Hammer,
      statKeys: [
        'minecraft:used:minecraft:stone',
        'minecraft:used:minecraft:cobblestone',
        'minecraft:used:minecraft:oak_planks',
        'minecraft:used:minecraft:spruce_planks'
      ]
    },
    {
      id: 'exploration',
      name: 'World Explorer',
      icon: Map,
      statKeys: [
        'minecraft:custom:minecraft:walk_one_cm',
        'minecraft:custom:minecraft:sprint_one_cm',
        'minecraft:custom:minecraft:fly_one_cm'
      ]
    },
    {
      id: 'survival',
      name: 'Survivor',
      icon: Heart,
      statKeys: ['minecraft:custom:minecraft:deaths']
    },
    {
      id: 'combat',
      name: 'Monster Hunter',
      icon: Sword,
      statKeys: [
        'minecraft:killed:minecraft:zombie',
        'minecraft:killed:minecraft:skeleton',
        'minecraft:killed:minecraft:creeper',
        'minecraft:killed:minecraft:spider',
        'minecraft:killed:minecraft:enderman'
      ]
    },
    {
      id: 'diamonds',
      name: 'Diamond Collector',
      icon: Diamond,
      statKeys: ['minecraft:mined:minecraft:diamond_ore', 'minecraft:mined:minecraft:deepslate_diamond_ore']
    },
    {
      id: 'fishing',
      name: 'Master Fisherman',
      icon: Fish,
      statKeys: ['minecraft:custom:minecraft:fish_caught']
    },
    {
      id: 'sprinting',
      name: 'Speed Demon',
      icon: Zap,
      statKeys: ['minecraft:custom:minecraft:sprint_one_cm']
    },
    {
      id: 'dragon',
      name: 'Dragon Slayer',
      icon: Shield,
      statKeys: ['minecraft:killed:minecraft:ender_dragon']
    },
    {
      id: 'travel',
      name: 'Dimensional Traveler',
      icon: Eye,
      statKeys: ['minecraft:custom:minecraft:enter_nether_portal']
    },
    {
      id: 'creepers',
      name: 'Mob Grinder',
      icon: Skull,
      statKeys: ['minecraft:killed:minecraft:creeper']
    }
  ];

  useEffect(() => {
    loadAllData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const loadAllData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Load awards based on stat categories
      const loadedAwards = await Promise.all(
        statCategories.map(async (category) => {
          try {
            // For each category, get the top players for the primary stat
            const primaryStat = category.statKeys[0];
            const response = await statsAPI.getTopPlayers(primaryStat, 10);
            
            if (response && response.players && response.players.length > 0) {
              const rankings: Ranking[] = response.players.map((player: ApiRanking, index: number) => ({
                player: player.username,
                value: player.value,
                medal: index === 0 ? 'gold' : index === 1 ? 'silver' : index === 2 ? 'bronze' : undefined
              }));

              const winner = response.players[0];
              
              return {
                id: category.id,
                name: category.name,
                objective: formatStatObjective(category.statKeys[0]),
                icon: category.icon,
                winner: {
                  name: winner.username,
                  value: winner.value,
                  uuid: winner.uuid || 'unknown'
                },
                allRankings: rankings
              };
            }
          } catch (err) {
            console.error(`Failed to load award for ${category.name}:`, err);
          }
          return null;
        })
      );

      const validAwards = loadedAwards.filter((award): award is Award => award !== null);
      setAwards(validAwards);

      // Calculate hall of fame based on awards
      const hallOfFame = calculateHallOfFame(validAwards);
      setPlayers(hallOfFame);

      // For now, events are empty - you can implement event loading later
      // setEvents([]);

    } catch (err) {
      console.error('Failed to load stats data:', err);
      setError('Failed to load statistics. Please check if the stats API is running.');
    } finally {
      setLoading(false);
    }
  };

  const formatStatObjective = (statKey: string): string => {
    if (statKey.includes('play_time')) return 'most time played';
    if (statKey.includes('mined')) return 'most blocks mined';
    if (statKey.includes('used') || statKey.includes('placed')) return 'most blocks placed';
    if (statKey.includes('walk_one_cm')) return 'longest distance traveled';
    if (statKey.includes('deaths')) return 'fewest deaths';
    if (statKey.includes('killed')) return 'most hostile mobs killed';
    if (statKey.includes('diamond')) return 'most diamonds mined';
    if (statKey.includes('fish_caught')) return 'most fish caught';
    if (statKey.includes('sprint_one_cm')) return 'longest distance sprinted';
    if (statKey.includes('ender_dragon')) return 'ender dragons killed';
    if (statKey.includes('nether_portal')) return 'most nether portals used';
    if (statKey.includes('creeper')) return 'most creepers killed';
    return formatStatName(statKey).toLowerCase();
  };

  const calculateHallOfFame = (awards: Award[]): Player[] => {
    const playerScores: { [key: string]: { name: string; gold: number; silver: number; bronze: number; } } = {};

    awards.forEach(award => {
      award.allRankings.forEach(ranking => {
        if (!playerScores[ranking.player]) {
          playerScores[ranking.player] = { name: ranking.player, gold: 0, silver: 0, bronze: 0 };
        }

        if (ranking.medal === 'gold') playerScores[ranking.player].gold++;
        else if (ranking.medal === 'silver') playerScores[ranking.player].silver++;
        else if (ranking.medal === 'bronze') playerScores[ranking.player].bronze++;
      });
    });

    return Object.values(playerScores)
      .map(player => ({
        uuid: 'unknown', // We don't have UUIDs from leaderboards
        name: player.name,
        crownScore: player.gold * 3 + player.silver * 2 + player.bronze * 1,
        lastOnline: new Date().toISOString().split('T')[0],
        playtime: 0, // Would need to fetch individual player stats
        medals: {
          gold: player.gold,
          silver: player.silver,
          bronze: player.bronze
        }
      }))
      .sort((a, b) => b.crownScore - a.crownScore)
      .slice(0, 10);
  };

  const formatValue = (value: number, awardId: string): string => {
    // Use the formatStatValue function from minecraft-stats.js
    const category = statCategories.find(cat => cat.id === awardId);
    if (category && category.statKeys[0]) {
      return formatStatValue(category.statKeys[0], value);
    }
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

  const filteredPlayers: Player[] = players.filter(player =>
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

  if (error) {
    return (
      <div className="min-h-screen bg-[#0F1216] text-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-2xl font-ranyth-mixed text-red-400 mb-4">{error}</p>
          <Button onClick={loadAllData} className="bg-vale-blue-light hover:bg-vale-blue">
            Retry
          </Button>
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
          <TabsList className="grid w-full grid-cols-3 bg-[#262626] border-0 h-12">
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
          </TabsList>

          {/* Awards */}
          <TabsContent value="awards" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {awards.map(award => {
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
              {players.map((player, index) => (
                <Card 
                  key={player.name} 
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
                        src={`https://crafatar.com/avatars/${player.name}?size=64&overlay`}
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
                <Card key={player.name} className="overflow-hidden border-0 bg-[#262626] transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-vale-green/35">
                  <div className="p-6">
                    <div className="flex items-center space-x-4 mb-4">
                      <Image
                        src={`https://crafatar.com/avatars/${player.name}?size=64&overlay`}
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
                        <p className="text-muted-foreground text-base">Awards</p>
                        <p className="text-2xl font-semibold">
                          {getMedalEmoji('gold')}{player.medals.gold} {getMedalEmoji('silver')}{player.medals.silver} {getMedalEmoji('bronze')}{player.medals.bronze}
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