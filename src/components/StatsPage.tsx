'use client';

import React, { useState, useEffect } from 'react';
import { Crown, Clock, Search, ChevronLeft, Sword, Pickaxe, Heart, Skull, Diamond, Fish, Shield, Zap, Eye, LucideProps, Footprints, TreePine, Wrench, Building, Users, Gamepad2, Mountain, Flame, Waves, Home, Target, Beef, Apple, Gem, Compass, Anchor, Train, Rocket } from 'lucide-react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import Image from "next/image";
import { statsAPI, formatStatValue } from '@/lib/minecraft-stats';

// Types (keep existing)
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

interface ApiRanking {
  username: string;
  value: number;
}

interface StatDefinition {
  id: string;
  name: string;
  objective: string;
  icon: React.ComponentType<LucideProps>;
  statKey: string; // Single stat key, not array
  category: string;
}

const StatsPage = () => {
  // State variables (keep existing)
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedAward, setSelectedAward] = useState<Award | null>(null);
  const [awards, setAwards] = useState<Award[]>([]);
  const [players, setPlayers] = useState<Player[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Individual statistics - each gets its own award
  const individualStats: StatDefinition[] = [
    // MOVEMENT & EXPLORATION
    {
      id: 'distance_walked',
      name: 'Slow Coach', 
      objective: 'longest distance walked',
      icon: Footprints,
      statKey: 'minecraft:custom:minecraft:walk_one_cm',
      category: 'Movement'
    },
    {
      id: 'distance_sprinted', 
      name: 'Marathon Runner', 
      objective: 'longest distance sprinted',
      icon: Zap,
      statKey: 'minecraft:custom:minecraft:sprint_one_cm',
      category: 'Movement'
    },
    {
      id: 'distance_crouched',
      name: 'Stealth Master', 
      objective: 'longest distance crouched',
      icon: Eye,
      statKey: 'minecraft:custom:minecraft:crouch_one_cm',
      category: 'Movement'
    },
    {
      id: 'jumps_made',
      name: 'Parkour Enthusiast',
      objective: 'most jumps made',
      icon: Mountain,
      statKey: 'minecraft:custom:minecraft:jump',
      category: 'Movement'
    },
    {
      id: 'distance_climbed',
      name: 'Wall Crawler',
      objective: 'longest distance climbed',
      icon: Mountain,
      statKey: 'minecraft:custom:minecraft:climb_one_cm',
      category: 'Movement'
    },
    {
      id: 'distance_fallen',
      name: 'Gravity Victim',
      objective: 'longest distance fallen',
      icon: Mountain,
      statKey: 'minecraft:custom:minecraft:fall_one_cm',
      category: 'Movement'
    },
    {
      id: 'distance_elytra',
      name: 'Minecraft Pilot',
      objective: 'longest distance flown with elytra',
      icon: Rocket,
      statKey: 'minecraft:custom:minecraft:aviate_one_cm',
      category: 'Movement'
    },
    {
      id: 'distance_swimming',
      name: 'Olympic Swimmer',
      objective: 'longest distance swum',
      icon: Waves,
      statKey: 'minecraft:custom:minecraft:swim_one_cm',
      category: 'Movement'
    },
    {
      id: 'distance_underwater',
      name: 'Deep Sea Diver', 
      objective: 'longest distance walked underwater',
      icon: Waves,
      statKey: 'minecraft:custom:minecraft:walk_under_water_one_cm',
      category: 'Movement'
    },
    {
      id: 'distance_water_surface',
      name: 'Water Walker',
      objective: 'longest distance walked on water',
      icon: Waves,
      statKey: 'minecraft:custom:minecraft:walk_on_water_one_cm',
      category: 'Movement'
    },

    // TRANSPORTATION
    {
      id: 'distance_horse',
      name: 'Cavalry Expert',
      objective: 'longest distance traveled by horse',
      icon: Compass,
      statKey: 'minecraft:custom:minecraft:horse_one_cm',
      category: 'Transportation'
    },
    {
      id: 'distance_boat',
      name: 'Blackbeard', 
      objective: 'longest distance traveled by boat',
      icon: Anchor,
      statKey: 'minecraft:custom:minecraft:boat_one_cm',
      category: 'Transportation'
    },
    {
      id: 'distance_minecart',
      name: 'Railway Engineer', 
      objective: 'longest distance traveled by minecart',
      icon: Train,
      statKey: 'minecraft:custom:minecraft:minecart_one_cm',
      category: 'Transportation'
    },
    {
      id: 'distance_pig',
      name: 'This Little Piggy Went To Market', 
      objective: 'longest distance traveled by pig',
      icon: Heart,
      statKey: 'minecraft:custom:minecraft:pig_one_cm',
      category: 'Transportation'
    },
    {
      id: 'distance_strider',
      name: 'Lava Surfer', 
      objective: 'longest distance traveled by strider',
      icon: Flame,
      statKey: 'minecraft:custom:minecraft:strider_one_cm',
      category: 'Transportation'
    },

    // MINING - PRECIOUS MATERIALS
    {
      id: 'diamonds_mined',
      name: 'Diamonds Are A Girls Best Friend', // Better than "Diamond Ore Mined"
      objective: 'most diamond ore mined',
      icon: Diamond,
      statKey: 'minecraft:mined:minecraft:diamond_ore',
      category: 'Mining'
    },
    {
      id: 'deep_diamonds_mined',
      name: 'Deep Diamond Hunter', // Better than "Deepslate Diamond Ore Mined"
      objective: 'most deepslate diamond ore mined',
      icon: Diamond,
      statKey: 'minecraft:mined:minecraft:deepslate_diamond_ore',
      category: 'Mining'
    },
    {
      id: 'emeralds_mined',
      name: 'Emerald Collector', 
      objective: 'most emerald ore mined',
      icon: Gem,
      statKey: 'minecraft:mined:minecraft:emerald_ore',
      category: 'Mining'
    },
    {
      id: 'gold_mined',
      name: 'Gold Prospector', 
      objective: 'most gold ore mined',
      icon: Gem,
      statKey: 'minecraft:mined:minecraft:gold_ore',
      category: 'Mining'
    },
    {
      id: 'iron_mined',
      name: 'Iron Miner', 
      objective: 'most iron ore mined',
      icon: Pickaxe,
      statKey: 'minecraft:mined:minecraft:iron_ore',
      category: 'Mining'
    },
    {
      id: 'coal_mined',
      name: 'Fossil Fuel Lover', 
      objective: 'most coal ore mined',
      icon: Pickaxe,
      statKey: 'minecraft:mined:minecraft:coal_ore',
      category: 'Mining'
    },
    {
      id: 'redstone_mined',
      name: 'Electrician', 
      objective: 'most redstone ore mined',
      icon: Zap,
      statKey: 'minecraft:mined:minecraft:redstone_ore',
      category: 'Mining'
    },
    {
      id: 'lapis_mined',
      name: 'Enchanter\'s Friend', 
      objective: 'most lapis ore mined',
      icon: Zap,
      statKey: 'minecraft:mined:minecraft:lapis_ore',
      category: 'Mining'
    },
    {
      id: 'copper_mined',
      name: 'Copper Extractor', 
      objective: 'most copper ore mined',
      icon: Gem,
      statKey: 'minecraft:mined:minecraft:copper_ore',
      category: 'Mining'
    },
    {
      id: 'ancient_debris_mined',
      name: 'Netherite Seeker', 
      objective: 'most ancient debris mined',
      icon: Flame,
      statKey: 'minecraft:mined:minecraft:ancient_debris',
      category: 'Mining'
    },

    // MINING - FOUNDATION MATERIALS
    {
      id: 'stone_mined',
      name: 'Stone Mason', 
      objective: 'most stone blocks mined',
      icon: Building,
      statKey: 'minecraft:mined:minecraft:stone',
      category: 'Mining'
    },
    {
      id: 'deepslate_mined',
      name: 'Deep Stone Mason', 
      objective: 'most deepslate mined',
      icon: Building,
      statKey: 'minecraft:mined:minecraft:deepslate',
      category: 'Mining'
    },
    {
      id: 'wood_mined',
      name: 'Lumberjack', 
      objective: 'most wood blocks mined',
      icon: TreePine,
      statKey: 'minecraft:mined:minecraft:oak_log',
      category: 'Mining'
    },
    {
      id: 'obsidian_mined',
      name: 'Obsidian Breaker', 
      objective: 'most obsidian mined',
      icon: Shield,
      statKey: 'minecraft:mined:minecraft:obsidian',
      category: 'Mining'
    },

    // COMBAT - BOSSES
    {
      id: 'ender_dragons_killed',
      name: 'Dragon Slayer', 
      objective: 'most ender dragons killed',
      icon: Crown,
      statKey: 'minecraft:killed:minecraft:ender_dragon',
      category: 'Combat'
    },
    {
      id: 'wardens_killed',
      name: 'Deep Dark Survivor',
      objective: 'most wardens killed',
      icon: Skull,
      statKey: 'minecraft:killed:minecraft:warden',
      category: 'Combat'
    },

    // COMBAT - MONSTERS
    {
      id: 'creepers_killed',
      name: 'Explosive Expert', 
      objective: 'most creepers killed',
      icon: Target,
      statKey: 'minecraft:killed:minecraft:creeper',
      category: 'Combat'
    },
    {
      id: 'zombies_killed',
      name: 'Zombie Exterminator', 
      objective: 'most zombies killed',
      icon: Skull,
      statKey: 'minecraft:killed:minecraft:zombie',
      category: 'Combat'
    },
    {
      id: 'skeletons_killed',
      name: 'Bone Collector', 
      objective: 'most skeletons killed',
      icon: Skull,
      statKey: 'minecraft:killed:minecraft:skeleton',
      category: 'Combat'
    },
    {
      id: 'spiders_killed',
      name: 'Arachnophobe', 
      objective: 'most spiders killed',
      icon: Target,
      statKey: 'minecraft:killed:minecraft:spider',
      category: 'Combat'
    },
    {
      id: 'endermen_killed',
      name: 'Void Warrior', 
      objective: 'most endermen killed',
      icon: Eye,
      statKey: 'minecraft:killed:minecraft:enderman',
      category: 'Combat'
    },
    {
      id: 'blazes_killed',
      name: 'Fire Fighter', 
      objective: 'most blazes killed',
      icon: Flame,
      statKey: 'minecraft:killed:minecraft:blaze',
      category: 'Combat'
    },
    {
      id: 'ghasts_killed',
      name: 'Protector of the Skies', 
      objective: 'most ghasts killed',
      icon: Target,
      statKey: 'minecraft:killed:minecraft:ghast',
      category: 'Combat'
    },

    // COMBAT - ANIMALS
    {
      id: 'cows_killed',
      name: 'Beefeater',
      objective: 'most cows killed',
      icon: Beef,
      statKey: 'minecraft:killed:minecraft:cow',
      category: 'Combat'
    },
    {
      id: 'pigs_killed',
      name: 'Bacon Maker',
      objective: 'most pigs killed',
      icon: Beef,
      statKey: 'minecraft:killed:minecraft:pig',
      category: 'Combat'
    },
    {
      id: 'chickens_killed',
      name: 'LA LA LA LAVA',
      objective: 'most chickens killed',
      icon: Beef,
      statKey: 'minecraft:killed:minecraft:chicken',
      category: 'Combat'
    },
    {
      id: 'sheep_killed',
      name: 'Sheep Hater', 
      objective: 'most sheep killed',
      icon: Beef,
      statKey: 'minecraft:killed:minecraft:sheep',
      category: 'Combat'
    },

    // COMBAT - PERFORMANCE
    {
      id: 'total_mobs_killed',
      name: 'Monster Hunter', 
      objective: 'most mobs killed',
      icon: Sword,
      statKey: 'minecraft:custom:minecraft:mob_kills',
      category: 'Combat'
    },
    {
      id: 'damage_dealt',
      name: 'Damage Dealer', 
      objective: 'most damage dealt',
      icon: Sword,
      statKey: 'minecraft:custom:minecraft:damage_dealt',
      category: 'Combat'
    },
    {
      id: 'damage_taken',
      name: 'Damage Sponge', 
      objective: 'most damage taken',
      icon: Shield,
      statKey: 'minecraft:custom:minecraft:damage_taken',
      category: 'Combat'
    },

    // FOOD & CONSUMPTION
    {
      id: 'raw_beef_eaten',
      name: 'Raw Beef Enthusiast', 
      objective: 'most raw beef consumed',
      icon: Beef,
      statKey: 'minecraft:used:minecraft:beef',
      category: 'Food'
    },
    {
      id: 'cooked_beef_eaten',
      name: 'Steak Lover', 
      objective: 'most cooked beef consumed',
      icon: Beef,
      statKey: 'minecraft:used:minecraft:cooked_beef',
      category: 'Food'
    },
    {
      id: 'bread_eaten',
      name: 'Bread Consumer', 
      objective: 'most bread consumed',
      icon: Apple,
      statKey: 'minecraft:used:minecraft:bread',
      category: 'Food'
    },
    {
      id: 'apples_eaten',
      name: 'Apple Muncher', 
      objective: 'most apples consumed',
      icon: Apple,
      statKey: 'minecraft:used:minecraft:apple',
      category: 'Food'
    },
    {
      id: 'fish_caught',
      name: 'Fishing Champion', 
      objective: 'most fish caught',
      icon: Fish,
      statKey: 'minecraft:custom:minecraft:fish_caught',
      category: 'Food'
    },

    // TOOLS & WEAPONS
    {
      id: 'bow_used',
      name: 'Archer', 
      objective: 'most bow shots',
      icon: Target,
      statKey: 'minecraft:used:minecraft:bow',
      category: 'Tools'
    },
    {
      id: 'crossbow_used',
      name: 'Marksman', 
      objective: 'most crossbow shots',
      icon: Target,
      statKey: 'minecraft:used:minecraft:crossbow',
      category: 'Tools'
    },
    {
      id: 'flint_steel_used',
      name: 'Fire Starter', 
      objective: 'most flint and steel uses',
      icon: Flame,
      statKey: 'minecraft:used:minecraft:flint_and_steel',
      category: 'Tools'
    },
    {
      id: 'shears_used',
      name: 'Shepherd', 
      objective: 'most shears used',
      icon: Wrench,
      statKey: 'minecraft:used:minecraft:shears',
      category: 'Tools'
    },
    {
      id: 'ender_pearls_used',
      name: 'Teleporter',
      objective: 'most ender pearls thrown',
      icon: Eye,
      statKey: 'minecraft:used:minecraft:ender_pearl',
      category: 'Tools'
    },
    {
      id: 'totem_used',
      name: 'Death Defying',
      objective: 'most totems of undying used',
      icon: Heart,
      statKey: 'minecraft:used:minecraft:totem_of_undying',
      category: 'Tools'
    },

    // LIFE MANAGEMENT
    {
      id: 'playtime',
      name: 'Dedicated', 
      objective: 'most time played',
      icon: Clock,
      statKey: 'minecraft:custom:minecraft:play_time',
      category: 'Life'
    },
    {
      id: 'deaths',
      name: 'Death Count',
      objective: 'most deaths',
      icon: Skull,
      statKey: 'minecraft:custom:minecraft:deaths',
      category: 'Life'
    },
    {
      id: 'time_since_death',
      name: 'Survival Streak', 
      objective: 'longest survival streak',
      icon: Heart,
      statKey: 'minecraft:custom:minecraft:time_since_death',
      category: 'Life'
    },
    {
      id: 'sleep_count',
      name: 'Well Rested',
      objective: 'most times slept in bed',
      icon: Home,
      statKey: 'minecraft:custom:minecraft:sleep_in_bed',
      category: 'Life'
    },

    // SOCIAL & INTERACTION
    {
      id: 'villager_trades',
      name: 'Merchant', 
      objective: 'most villager trades',
      icon: Users,
      statKey: 'minecraft:custom:minecraft:traded_with_villager',
      category: 'Social'
    },
    {
      id: 'animals_bred',
      name: 'Animal Breeder',
      objective: 'most animals bred',
      icon: Heart,
      statKey: 'minecraft:custom:minecraft:animals_bred',
      category: 'Social'
    },

    // MISCELLANEOUS
    {
      id: 'items_enchanted',
      name: 'Enchanter', 
      objective: 'most items enchanted',
      icon: Zap,
      statKey: 'minecraft:custom:minecraft:enchant_item',
      category: 'Misc'
    },
    {
      id: 'items_dropped',
      name: 'Litterbug', 
      objective: 'most items dropped',
      icon: Gamepad2,
      statKey: 'minecraft:custom:minecraft:drop',
      category: 'Misc'
    },
    {
      id: 'portal_travel',
      name: 'Portal Traveler',
      objective: 'most nether portal uses',
      icon: Eye,
      statKey: 'minecraft:custom:minecraft:enter_nether_portal',
      category: 'Travel'
    }
  ];

  // Rest of your existing functions
  useEffect(() => {
    loadAllData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const loadAllData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Load awards for each individual statistic
      const loadedAwards = await Promise.all(
        individualStats.map(async (stat) => {
          try {
            const response = await statsAPI.getTopPlayers(stat.statKey, 10);
            
            if (response && response.players && response.players.length > 0) {
              const rankings: Ranking[] = response.players.map((player: ApiRanking, index: number) => ({
                player: player.username,
                value: player.value,
                medal: index === 0 ? 'gold' : index === 1 ? 'silver' : index === 2 ? 'bronze' : undefined
              }));

              const winner = response.players[0];
              
              return {
                id: stat.id,
                name: stat.name,
                objective: stat.objective,
                icon: stat.icon,
                winner: {
                  name: winner.username,
                  value: winner.value,
                  uuid: winner.uuid || 'unknown'
                },
                allRankings: rankings
              };
            }
          } catch (err) {
            console.error(`Failed to load award for ${stat.name}:`, err);
          }
          return null;
        })
      );

      const validAwards = loadedAwards.filter((award): award is Award => award !== null);
      setAwards(validAwards);

      const hallOfFame = calculateHallOfFame(validAwards);
      setPlayers(hallOfFame);

    } catch (err) {
      console.error('Failed to load stats data:', err);
      setError('Failed to load statistics. Please check if the stats API is running.');
    } finally {
      setLoading(false);
    }
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
        uuid: 'unknown',
        name: player.name,
        crownScore: player.gold * 3 + player.silver * 2 + player.bronze * 1,
        lastOnline: new Date().toISOString().split('T')[0],
        playtime: 0,
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
    const stat = individualStats.find(s => s.id === awardId);
    if (stat && stat.statKey) {
      return formatStatValue(stat.statKey, value);
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

          {/* Hall of Fame - keep existing implementation */}
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

          {/* Players - keep existing implementation */}
          <TabsContent value="players" className="mt-6">
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