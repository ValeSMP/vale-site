'use client';

import React, { useState, useEffect } from 'react';
import { Crown, Clock, Search, ChevronLeft, Sword, Pickaxe, Heart, Skull, Diamond, Fish, Shield, Zap, Eye, LucideProps, Footprints, TreePine, Wrench, Building, Users, Gamepad2, Mountain, Flame, Waves, Home, Target, Beef, Apple, Gem, Compass, Anchor, Train, Rocket, ChevronDown, ChevronRight } from 'lucide-react';
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
  category: string;
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
  statKey?: string; // Single stat key (optional)
  statKeys?: string[] // Multiple stat keys for combined stats (optional)
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
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set(['Mining','Combat','Movement']));

   const categoryConfig: Record<string, { icon: React.ComponentType<LucideProps>; color: string }> = {
    'Mining': { icon: Pickaxe, color: 'vale-green' },
    'Combat': { icon: Sword, color: 'red-500' },
    'Movement': { icon: Footprints, color: 'vale-blue' },
    'Food': { icon: Apple, color: 'orange-500' },
    'Tools': { icon: Wrench, color: 'blue-500' },
    'General': { icon: Heart, color: 'pink-500' }
   };

   const categoryOrder = [
    'General',
    'Combat', 
    'Mining',
    'Movement',
    'Tools',
    'Food',
  ];

  // Individual statistics - each gets its own individual award
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
    {
      id: 'distance_horse',
      name: 'Cavalry Expert',
      objective: 'longest distance traveled by horse',
      icon: Compass,
      statKey: 'minecraft:custom:minecraft:horse_one_cm',
      category: 'Movement'
    },
    {
      id: 'distance_boat',
      name: 'Blackbeard', 
      objective: 'longest distance traveled by boat',
      icon: Anchor,
      statKey: 'minecraft:custom:minecraft:boat_one_cm',
      category: 'Movement'
    },
    {
      id: 'distance_minecart',
      name: 'Railway Engineer', 
      objective: 'longest distance traveled by minecart',
      icon: Train,
      statKey: 'minecraft:custom:minecraft:minecart_one_cm',
      category: 'Movement'
    },
    {
      id: 'distance_pig',
      name: 'This Little Piggy Went To Market', 
      objective: 'longest distance traveled by pig',
      icon: Heart,
      statKey: 'minecraft:custom:minecraft:pig_one_cm',
      category: 'Movement'
    },
    {
      id: 'distance_strider',
      name: 'Lava Surfer', 
      objective: 'longest distance traveled by strider',
      icon: Flame,
      statKey: 'minecraft:custom:minecraft:strider_one_cm',
      category: 'Movement'
    },
    {
      id: 'distance_ghast',
      name: 'Happiest Pilot Around', 
      objective: 'longest distance traveled by happy ghast',
      icon: Flame,
      statKey: 'minecraft:custom:minecraft:happy_ghast_one_cm',
      category: 'Movement'
    },
    { id: 'portal_travel',
      name: 'Portal Traveler',
      objective: 'most nether portal uses',
      icon: Eye,
      statKey: 'minecraft:custom:minecraft:enter_nether_portal',
      category: 'Movement'
    },
    

    // MINING - PRECIOUS MATERIALS
    {
      id: 'diamonds_mined',
      name: 'Diamonds!', // Better than "Diamond Ore Mined"
      objective: 'most diamond ore mined',
      icon: Diamond,
      statKeys: ['minecraft:mined:minecraft:diamond_ore', 'minecraft:mined:minecraft:deepslate_diamond_ore'],
      category: 'Mining'
    },
    {
      id: 'emeralds_mined',
      name: 'Villager\'s Bestie', 
      objective: 'most emerald ore mined',
      icon: Gem,
      statKeys: ['minecraft:mined:minecraft:emerald_ore','minecraft:mined:minecraft:deepslate_emerald_ore'],
      category: 'Mining'
    },
    {
      id: 'gold_mined',
      name: 'Prospector', 
      objective: 'most gold ore mined',
      icon: Gem,
      statKeys: ['minecraft:mined:minecraft:gold_ore','minecraft:mined:minecraft:deepslate_gold_ore'],
      category: 'Mining'
    },
    {
      id: 'iron_mined',
      name: 'Iron Miner', 
      objective: 'most iron ore mined',
      icon: Pickaxe,
      statKeys: ['minecraft:mined:minecraft:iron_ore','minecraft:mined:minecraft:deepslate_iron_ore'],
      category: 'Mining'
    },
    {
      id: 'coal_mined',
      name: 'Fossil Fuel Lover', 
      objective: 'most coal ore mined',
      icon: Pickaxe,
      statKeys: ['minecraft:mined:minecraft:coal_ore','minecraft:mined:minecraft:deepslate_coal_ore'],
      category: 'Mining'
    },
    {
      id: 'redstone_mined',
      name: 'Electrician', 
      objective: 'most redstone ore mined',
      icon: Zap,
      statKeys: ['minecraft:mined:minecraft:redstone_ore','minecraft:mined:minecraft:deepslate_redstone_ore'],
      category: 'Mining'
    },
    {
      id: 'lapis_mined',
      name: 'Enchanter\'s Friend', 
      objective: 'most lapis ore mined',
      icon: Zap,
      statKeys: ['minecraft:mined:minecraft:lapis_ore','minecraft:mined:minecraft:deepslate_lapis_ore'],
      category: 'Mining'
    },
    {
      id: 'copper_mined',
      name: 'Copper Extractor', 
      objective: 'most copper ore mined',
      icon: Gem,
      statKeys: ['minecraft:mined:minecraft:copper_ore','minecraft:mined:minecraft:deepslate_copper_ore'],
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
      statKeys: ['minecraft:mined:minecraft:stone','minecraft:mined:minecraft:cobblestone'],
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
      id: 'lumberjack_combined',
      name: 'Lumberjack', 
      objective: 'most wood blocks mined',
      icon: TreePine,
      statKeys: ['minecraft:mined:minecraft:oak_log',
      'minecraft:mined:minecraft:birch_log',
      'minecraft:mined:minecraft:spruce_log',
      'minecraft:mined:minecraft:jungle_log',
      'minecraft:mined:minecraft:acacia_log',
      'minecraft:mined:minecraft:dark_oak_log',
      'minecraft:mined:minecraft:cherry_log',
      'minecraft:mined:minecraft:mangrove_log',
      'minecraft:mined:minecraft:pale_oak_log',
      'minecraft:mined:minecraft:bamboo'],
      category: 'Mining'
    },
    {
      id: 'obsidian_mined',
      name: 'Obsidian Breaker', 
      objective: 'most obsidian mined',
      icon: Shield,
      statKeys: ['minecraft:mined:minecraft:obsidian',
        'minecraft:mined:minecraft:crying_obsidian'],
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
    {
      id: 'withers_killed',
      name: 'Withering Heights',
      objective: 'most withers killed',
      icon: Skull,
      statKey: 'minecraft:killed:minecraft:wither',
      category: 'Combat'
    },

    // COMBAT - MONSTERS
    {id: 'creepers_killed',
      name: 'Explosive Expert', 
      objective: 'most creepers killed',
      icon: Target,
      statKey: 'minecraft:killed:minecraft:creeper',
      category: 'Combat'
    },
    {id: 'zombies_killed',
      name: 'Zombie Exterminator', 
      objective: 'most zombies killed',
      icon: Skull,
      statKeys: ['minecraft:killed:minecraft:zombie','minecraft:killed:minecraft:zombie_villager'],
      category: 'Combat'
    },
    {id: 'skeletons_killed',
      name: 'Bone Collector', 
      objective: 'most skeletons and strays killed',
      icon: Skull,
      statKeys: ['minecraft:killed:minecraft:skeleton', 'minecraft:killed:minecraft:stray'],
      category: 'Combat'
    },
    {id: 'spiders_killed',
      name: 'Arachnophobe', 
      objective: 'most spiders killed',
      icon: Target,
      statKeys: ['minecraft:killed:minecraft:spider', 'minecraft:killed:minecraft:cave_spider'],
      category: 'Combat'
    },
    {id: 'endermen_killed',
      name: 'Void Warrior', 
      objective: 'most endermen killed',
      icon: Eye,
      statKey: 'minecraft:killed:minecraft:enderman',
      category: 'Combat'
    },    
    {id: 'shulkers_killed',
      name: 'Simple Storage Solution', 
      objective: 'most shulkers killed',
      icon: Target,
      statKey: 'minecraft:killed:minecraft:shulker',
      category: 'Combat'
    },
    {id: 'wither_skeletons_killed',
      name: 'Skull Hunter', 
      objective: 'most wither skeletons killed',
      icon: Target,
      statKey: 'minecraft:killed:minecraft:wither_skeleton',
      category: 'Combat'
    },
    {id: 'phantoms_killed',
      name: 'I Blame Mumbo Jumbo', 
      objective: 'most phantoms killed',
      icon: Target,
      statKey: 'minecraft:killed:minecraft:phantom',
      category: 'Combat'
    },
    {id: 'raiders_killed',
      name: 'Protector of the Village', 
      objective: 'most raid mobs killed',
      icon: Target,
      statKeys: [
        'minecraft:killed:minecraft:pillager',
        'minecraft:killed:minecraft:vindicator',
        'minecraft:killed:minecraft:evoker',
        'minecraft:killed:minecraft:ravager',
        'minecraft:killed:minecraft:witch',
        'minecraft:killed:minecraft:vex'
      ],
      category: 'Combat'
    },
    {id: 'slimes_killed',
      name: 'Slimey Steve', 
      objective: 'most slimes killed',
      icon: Target,
      statKey: 'minecraft:killed:minecraft:slime',
      category: 'Combat'
    },
    {id: 'piglins_killed',
      name: 'Brutal Bastion Batterer', 
      objective: 'most piglin and piglin brutes killed',
      icon: Target,
      statKeys: ['minecraft:killed:minecraft:piglin', 'minecraft:killed:minecaft:piglin_brute'],
      category: 'Combat'
    },
    {id: 'blazes_killed',
      name: 'Fire Fighter', 
      objective: 'most blazes killed',
      icon: Flame,
      statKey: 'minecraft:killed:minecraft:blaze',
      category: 'Combat'
    },
    {id: 'arthropods_killed',
      name: 'Arthropod Annihilator', 
      objective: 'most silverfish and endermites killed',
      icon: Target,
      statKeys: ['minecraft:killed:minecraft:endermite','minecraft:killed:minecraft:silverfish'],
      category: 'Combat'
    },    
    {id: 'guardians_killed',
      name: 'Guardian of the Seas', 
      objective: 'most guardians killed',
      icon: Target,
      statKey: 'minecraft:killed:minecraft:guardian',
      category: 'Combat'
    },
    {id: 'hoglins_killed',
      name: 'Hoglin Hater', 
      objective: 'most hoglins killed',
      icon: Target,
      statKey: 'minecraft:killed:minecraft:hoglin',
      category: 'Combat'
    },
    {id: 'husks_killed',
      name: 'Husky', 
      objective: 'most husks killed',
      icon: Target,
      statKey: 'minecraft:killed:minecraft:husk',
      category: 'Combat'
    },
    {id: 'magma_cubes_killed',
      name: 'Magma-tastic', 
      objective: 'most magma cubes killed',
      icon: Target,
      statKey: 'minecraft:killed:minecraft:magma_cube',
      category: 'Combat'
    },
    {id: 'ghasts_killed',
      name: 'Protector of the Skies', 
      objective: 'most ghasts killed',
      icon: Target,
      statKeys: ['minecraft:killed:minecraft:ghast', 'minecraft:killed:minecraft:happy_ghast'],
      category: 'Combat'
    },
    {id: 'breeze_killed',
      name: 'Easy Breezy', 
      objective: 'most breeze killed',
      icon: Target,
      statKey: 'minecraft:killed:minecraft:breeze',
      category: 'Combat'
    },
    {id: 'bogged_killed',
      name: 'Bogged Down', 
      objective: 'most bogged killed',
      icon: Target,
      statKey: 'minecraft:killed:minecraft:bogged',
      category: 'Combat'
    },
    {id: 'creaking_killed',
      name: 'No Heart', 
      objective: 'most creaking killed',
      icon: Target,
      statKey: 'minecraft:killed:minecraft:creaking',
      category: 'Combat'
    },

    // COMBAT - ANIMALS
    {id: 'pigs_killed',
      name: 'Bacon Maker',
      objective: 'most pigs killed',
      icon: Beef,
      statKey: 'minecraft:killed:minecraft:pig',
      category: 'Combat'
    },
    {id: 'chickens_killed',
      name: 'LA LA LA LAVA',
      objective: 'most chickens killed',
      icon: Beef,
      statKey: 'minecraft:killed:minecraft:chicken',
      category: 'Combat'
    },
    {id: 'cows_killed',
      name: 'Beefeater',
      objective: 'most cows killed',
      icon: Beef,
      statKey: 'minecraft:killed:minecraft:cow',
      category: 'Combat'
    },
    {id: 'sheep_killed',
      name: 'Sheep Hater', 
      objective: 'most sheep killed',
      icon: Beef,
      statKey: 'minecraft:killed:minecraft:sheep',
      category: 'Combat'
    },
    {id: 'allays_killed',
      name: 'Anti-Allay',
      objective: 'most allays killed',
      icon: Beef,
      statKey: 'minecraft:killed:minecraft:allay',
      category: 'Combat'
    },
    {id: 'armadillos_killed',
      name: 'Armadillo Attacker',
      objective: 'most armadillos killed',
      icon: Beef,
      statKey: 'minecraft:killed:minecraft:armadillo',
      category: 'Combat'
    },
    {id: 'axolotls_killed',
      name: 'Axed-a-lot-l',
      objective: 'most axolotls killed',
      icon: Beef,
      statKey: 'minecraft:killed:minecraft:axolotl',
      category: 'Combat'
    },
    {id: 'bats_killed',
      name: 'Bat-Shit Crazy',
      objective: 'most bats killed',
      icon: Beef,
      statKey: 'minecraft:killed:minecraft:bat',
      category: 'Combat'
    },
    {id: 'bees_killed',
      name: 'Bee-stie', 
      objective: 'most bees killed',
      icon: Beef,
      statKey: 'minecraft:killed:minecraft:bee',
      category: 'Combat'
    },
    {id: 'camels_killed',
      name: 'Hump Day',
      objective: 'most camels killed',
      icon: Beef,
      statKey: 'minecraft:killed:minecraft:camel',
      category: 'Combat'
    },    
    {id: 'cats_killed',
      name: 'Cat Fighter',
      objective: 'most cats killed',
      icon: Beef,
      statKeys: ['minecraft:killed:minecraft:cat', 'minecraft:killed:minecraft:ocelot'],
      category: 'Combat'
    },
    {id: 'dolphins_killed',
      name: 'Big Brained Killer', 
      objective: 'most dolphins killed',
      icon: Beef,
      statKey: 'minecraft:killed:minecraft:dolphin',
      category: 'Combat'
    },
    {id: 'donkeys_killed',
      name: 'YOU DONKEY', 
      objective: 'most donkeys killed',
      icon: Beef,
      statKeys: ['minecraft:killed:minecraft:donkey','minecraft:killed:minecraft:mule'],
      category: 'Combat'
    },

    {id: 'fish_killed',
      name: 'Pescatarian Party', 
      objective: 'most fish killed',
      icon: Beef,
      statKeys: ['minecraft:killed:minecraft:cod', 'minecraft:killed:minecraft:salmon', 'minecraft:killed:minecraft:tropical_fish', 'minecraft:killed:minecraft:pufferfish','minecraft:killed:minecraft:tadpole'],
      category: 'Combat'
    },    
    {id: 'foxes_killed',
      name: 'Foxy Foe', 
      objective: 'most foxes killed',
      icon: Beef,
      statKey: 'minecraft:killed:minecraft:fox',
      category: 'Combat'
    },
    {id: 'frog_killed',
      name: 'Kermit\'s Nemesis', 
      objective: 'most frogs killed',
      icon: Beef,
      statKey: 'minecraft:killed:minecraft:frog',
      category: 'Combat'
    },    
    {id: 'goats_killed',
      name: 'G.O.A.T', 
      objective: 'most goats killed',
      icon: Beef,
      statKey: 'minecraft:killed:minecraft:goat',
      category: 'Combat'
    },
    {id: 'horse_killed',
      name: 'Smallishbeans?', 
      objective: 'most horses killed',
      icon: Beef,
      statKey: 'minecraft:killed:minecraft:horse',
      category: 'Combat'
    },
    {id: 'llamas_killed',
      name: 'No Traders Here Please', 
      objective: 'most llamas killed',
      icon: Beef,
      statKeys: ['minecraft:killed:minecraft:llama','minecraft:killed:minecraft:trader_llama'],
      category: 'Combat'
    },
    {id: 'mooshrooms_killed',
      name: 'Extinction Enabler',
      objective: 'most mooshrooms killed',
      icon: Beef,
      statKey: 'minecraft:killed:minecraft:mooshroom',
      category: 'Combat'
    },
    {id: 'pandas_killed',
      name: 'How could you?', 
      objective: 'most pandas killed',
      icon: Beef,
      statKey: 'minecraft:killed:minecraft:panda',
      category: 'Combat'
    },
    {id: 'parrot_killed',
      name: 'Parrot Party', 
      objective: 'most parrots killed',
      icon: Beef,
      statKey: 'minecraft:killed:minecraft:parrot',
      category: 'Combat'
    },
    {id: 'polar_bears_killed',
      name: 'Arctic Annoyance', 
      objective: 'most polar bears killed',
      icon: Beef,
      statKey: 'minecraft:killed:minecraft:polar_bear',
      category: 'Combat'
    },
    {id: 'rabbit_killed',
      name: 'It\'s Wabbit Hunting Season', 
      objective: 'most rabbits killed',
      icon: Beef,
      statKey: 'minecraft:killed:minecraft:rabbit',
      category: 'Combat'
    },
    {id: 'sniffers_killed',
      name: 'Sniff-er, Barely Know Her', 
      objective: 'most sniffers killed',
      icon: Beef,
      statKey: 'minecraft:killed:minecraft:sniffer',
      category: 'Combat'
    },
    {id: 'squid_killed',
      name: 'Calamari Connoisseur', 
      objective: 'most squid killed',
      icon: Beef,
      statKeys: ['minecraft:killed:minecraft:squid', 'minecraft:killed:minecraft:glow_squid'],
      category: 'Combat'
    },
    {id: 'striders_killed',
      name: 'Striding to Glory', 
      objective: 'most striders killed',
      icon: Beef,
      statKey: 'minecraft:killed:minecraft:strider',
      category: 'Combat'
    },    
    {id: 'traders_killed',
      name: 'No Cold Callers', 
      objective: 'most wandering traders killed',
      icon: Beef,
      statKey: 'minecraft:killed:minecraft:wandering_trader',
      category: 'Combat'
    },
    {id: 'turtles_killed',
      name: 'Turtley Intentional', 
      objective: 'most turtles killed',
      icon: Beef,
      statKey: 'minecraft:killed:minecraft:turtle',
      category: 'Combat'
    },
    {id: 'wolves_killed',
      name: 'Wolverine', 
      objective: 'most wolves killed',
      icon: Beef,
      statKey: 'minecraft:killed:minecraft:wolf',
      category: 'Combat'
    },

    // COMBAT - PERFORMANCE
    {id: 'total_mobs_killed',
      name: 'Monster Hunter', 
      objective: 'most mobs killed',
      icon: Sword,
      statKey: 'minecraft:custom:minecraft:mob_kills',
      category: 'Combat'
    },
    {id: 'damage_dealt',
      name: 'Damage Dealer', 
      objective: 'most damage dealt',
      icon: Sword,
      statKey: 'minecraft:custom:minecraft:damage_dealt',
      category: 'Combat'
    },
    {id: 'damage_taken',
      name: 'Damage Sponge', 
      objective: 'most damage taken',
      icon: Shield,
      statKey: 'minecraft:custom:minecraft:damage_taken',
      category: 'Combat'
    },
    {id: 'damage_blocked',
      name: 'Damage Blocker', 
      objective: 'most damage blocked with a shield',
      icon: Shield,
      statKey: 'minecraft:custom:minecraft:damage_blocked_by_shield',
      category: 'Combat'
    },
    {id: 'player_kills',
      name: 'PVP MVP', 
      objective: 'most CONSENSUAL PvP kills',
      icon: Shield,
      statKey: 'minecraft:custom:minecraft:player_kills',
      category: 'Combat'
    },
    {id: 'targets_hit',
      name: 'Target Practice', 
      objective: 'most targets hit',
      icon: Shield,
      statKey: 'minecraft:custom:minecraft:target_hit',
      category: 'Combat'
    },

    // FOOD & CONSUMPTION
    { id: 'keto',
      name: 'Keto King',
      objective: 'most cooked meat consumed',
      icon: Beef,
      statKeys: [
        'minecraft:used:minecraft:cooked_beef',
        'minecraft:used:minecraft:cooked_porkchop',
        'minecraft:used:minecraft:cooked_chicken',
        'minecraft:used:minecraft:cooked_mutton',
        'minecraft:used:minecraft:cooked_rabbit',
        'minecraft:used:minecraft:cooked_salmon',
        'minecraft:used:minecraft:cooked_cod'
      ],
      category: 'Food'
    },
    {id: 'carnivore',
      name: 'Carnivore', 
      objective: 'most damage taken',
      icon: Shield,
      statKeys: [
        'minecraft:used:minecraft:beef',
        'minecraft:used:minecraft:porkchop',
        'minecraft:used:minecraft:chicken',
        'minecraft:used:minecraft:mutton',
        'minecraft:used:minecraft:rabbit',
        'minecraft:used:minecraft:salmon',
        'minecraft:used:minecraft:cod'
      ],
      category: 'Combat'
    },
    { id: 'gluten_tolerant',
      name: 'Gluten Tolerant', 
      objective: 'most glutenous foods consumed',
      icon: Apple,
      statKeys: [
        'minecraft:used:minecraft:bread',
        'minecraft:used:minecraft:cookie'
      ],
      category: 'Food'
    },
    { id: 'vegetarian',
      name: 'One of your Five a Day',
      objective: 'most fruit/veg consumed',
      icon: Apple,
      statKeys: [
        'minecraft:used:minecraft:apple',
        'minecraft:used:minecraft:carrot',
        'minecraft:used:minecraft:potato',
        'minecraft:used:minecraft:baked_potato',
        'minecraft:used:minecraft:melon_slice',
        'minecraft:used:minecraft:golden_apple',
        'minecraft:used:minecraft:enchanted_golden_apple'
      ],
      category: 'Food'
    },
    { id: 'fish_caught',
      name: 'Gone Fishin\'', 
      objective: 'most fish caught',
      icon: Fish,
      statKey: 'minecraft:custom:minecraft:fish_caught',
      category: 'Food'
    },
    { id: 'sus_stew',
      name: 'Sus', 
      objective: 'most sus stew consumed',
      icon: Apple,
      statKey: 
        'minecraft:used:minecraft:suspicious_stew',
      category: 'Food'
    },

    // TOOLS & WEAPONS
    { id: 'bow_used',
      name: 'Archer', 
      objective: 'most bow shots',
      icon: Target,
      statKeys: ['minecraft:used:minecraft:bow','minecraft:used:minecraft:crossbow'],
      category: 'Tools'
    },
    { id: 'flint_steel_used',
      name: 'Fire Starter', 
      objective: 'most flint and steel uses',
      icon: Flame,
      statKey: 'minecraft:used:minecraft:flint_and_steel',
      category: 'Tools'
    },
    { id: 'shears_used',
      name: 'Shepherd', 
      objective: 'most shears used',
      icon: Wrench,
      statKey: 'minecraft:used:minecraft:shears',
      category: 'Tools'
    },
    { id: 'ender_pearls_used',
      name: 'Teleporter',
      objective: 'most ender pearls thrown',
      icon: Eye,
      statKey: 'minecraft:used:minecraft:ender_pearl',
      category: 'Tools'
    },
    { id: 'totem_used',
      name: 'Death Defying',
      objective: 'most totems of undying used',
      icon: Heart,
      statKey: 'minecraft:used:minecraft:totem_of_undying',
      category: 'Tools'
    },

    // GENERAL
    { id: 'playtime',
      name: 'Dedicated', 
      objective: 'most time played',
      icon: Clock,
      statKey: 'minecraft:custom:minecraft:play_time',
      category: 'General'
    },
    { id: 'deaths',
      name: 'Death Count',
      objective: 'most deaths',
      icon: Skull,
      statKey: 'minecraft:custom:minecraft:deaths',
      category: 'General'
    },
    { id: 'time_since_death',
      name: 'Survival Streak', 
      objective: 'longest survival streak',
      icon: Heart,
      statKey: 'minecraft:custom:minecraft:time_since_death',
      category: 'General'
    },
    { id: 'sleep_count',
      name: 'Well Rested',
      objective: 'most times slept in bed',
      icon: Home,
      statKey: 'minecraft:custom:minecraft:sleep_in_bed',
      category: 'General'
    },
    { id: 'villager_trades',
      name: 'Merchant', 
      objective: 'most villager trades',
      icon: Users,
      statKey: 'minecraft:custom:minecraft:traded_with_villager',
      category: 'General'
    },
    { id: 'animals_bred',
      name: 'Animal Breeder',
      objective: 'most animals bred',
      icon: Heart,
      statKey: 'minecraft:custom:minecraft:animals_bred',
      category: 'General'
    },
    { id: 'items_enchanted',
      name: 'Enchanter', 
      objective: 'most items enchanted',
      icon: Zap,
      statKey: 'minecraft:custom:minecraft:enchant_item',
      category: 'General'
    },
    { id: 'items_dropped',
      name: 'Litterbug', 
      objective: 'most items dropped',
      icon: Gamepad2,
      statKey: 'minecraft:custom:minecraft:drop',
      category: 'General'
    },
  ];

  // Rest of your existing functions
  useEffect(() => {
    loadAllData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

const loadAllData = async () => {
  setLoading(true);
  setError(null);
  
  try {
    
    const allStatKeys = new Set<string>();
    individualStats.forEach(stat => {
      if (stat.statKey) {
        allStatKeys.add(stat.statKey);
      }
      if (stat.statKeys) {
        stat.statKeys.forEach(key => allStatKeys.add(key));
      }
    });

    // Fetch data for all unique stat keys
    const statData: { [key: string]: ApiRanking[] } = {};
    await Promise.all(
      Array.from(allStatKeys).map(async (statKey) => {
        try {
          const response = await statsAPI.getTopPlayers(statKey, 50);
          if (response && response.players) {
            statData[statKey] = response.players;
          }
        } catch (err) {
          console.warn(`Failed to load stat ${statKey}:`, err);
          statData[statKey] = [];
        }
      })
    );

    const loadedAwards: Award[] = individualStats.map(stat => {
      const combinedPlayerData: { [username: string]: number } = {};

      if (stat.statKeys) {
        // Combined stat: sum values from multiple keys
        stat.statKeys.forEach(key => {
          const players = statData[key] || [];
          players.forEach(player => {
            if (!combinedPlayerData[player.username]) {
              combinedPlayerData[player.username] = 0;
            }
            combinedPlayerData[player.username] += player.value;
          });
        });
      } else if (stat.statKey) {
        // Single stat: use values directly
        const players = statData[stat.statKey] || [];
        players.forEach(player => {
          combinedPlayerData[player.username] = player.value;
        });
      } else {
        // Neither: default to empty (will be filtered out)
        return null;
      }

      // Sort players and create rankings
      const sortedPlayers = Object.entries(combinedPlayerData)
        .map(([username, value]) => ({ username, value }))
        .sort((a, b) => b.value - a.value)
        .slice(0, 10);

      if (sortedPlayers.length === 0) {
        // Placeholder for stats with no data
        return {
          id: stat.id,
          name: stat.name,
          objective: stat.objective,
          icon: stat.icon,
          category: stat.category,
          winner: {
            name: 'Nobody',
            value: 0,
            uuid: 'nobody'
          },
          allRankings: [{
            player: 'Nobody',
            value: 0,
            medal: undefined
          }]
        } as Award;
      }

      const rankings: Ranking[] = sortedPlayers.map((player, index) => ({
        player: player.username,
        value: player.value,
        medal: index === 0 ? 'gold' : index === 1 ? 'silver' : index === 2 ? 'bronze' : undefined
      }));

      return {
        id: stat.id,
        name: stat.name,
        objective: stat.objective,
        icon: stat.icon,
        category: stat.category,
        winner: {
          name: sortedPlayers[0].username,
          value: sortedPlayers[0].value,
          uuid: 'unknown'
        },
        allRankings: rankings
      } as Award;
    }).filter((award): award is Award => award !== null);

    setAwards(loadedAwards);
    setPlayers(calculateHallOfFame(loadedAwards));

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

  const groupedAwards = awards.reduce((acc, award) => {
    if (!acc[award.category]) {
      acc[award.category] = [];
    }
    acc[award.category].push(award);
    return acc;
  }, {} as Record<string, Award[]>);

  const toggleCategory = (category: string) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(category)) {
      newExpanded.delete(category);
    } else {
      newExpanded.add(category);
    }
    setExpandedCategories(newExpanded);
  };

  // Expand/collapse all categories
  const expandAllCategories = () => {
    setExpandedCategories(new Set(Object.keys(groupedAwards)));
  };

  const collapseAllCategories = () => {
    setExpandedCategories(new Set());
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
            
            {/* Category Controls */}
            <div className="mb-6 flex justify-between items-center">
              <div className="flex gap-2">
                <Button 
                  onClick={expandAllCategories}
                  variant="outline"
                  size="sm"
                  className="text-vale-blue-light border-vale-blue-light/30 hover:bg-vale-blue-light/10"
                >
                  Expand All
                </Button>
                <Button 
                  onClick={collapseAllCategories}
                  variant="outline"
                  size="sm"
                  className="text-vale-green border-vale-green/30 hover:bg-vale-green/10"
                >
                  Collapse All
                </Button>
              </div>
              <div className="text-sm text-muted-foreground">
                {Object.keys(groupedAwards).length} categories • {awards.length} awards
              </div>
            </div>
            
          {/* Categorized Awards */}
            <div className="space-y-6">
              {categoryOrder
                .filter(category => groupedAwards[category]) // Only show categories that have awards
                .map(category => {
                  const categoryAwards = groupedAwards[category];
                  const isExpanded = expandedCategories.has(category);
                  const config = categoryConfig[category] || { icon: Gamepad2, color: 'gray-500' };
                  const Icon = config.icon;

                  return (
                  <div key={category} className="bg-[#161b22] rounded-lg border border-white/10">
                    {/* Category Header */}
                    <button
                      onClick={() => toggleCategory(category)}
                      className="w-full p-4 flex items-center justify-between hover:bg-white/5 transition-colors rounded-t-lg"
                    >
                      <div className="flex items-center gap-3">
                        <div className={`inline-flex h-10 w-10 items-center justify-center rounded-lg bg-${config.color}/10`}>
                          <Icon className={`h-5 w-5 text-${config.color}`} />
                        </div>
                        <div className="text-left">
                          <h3 className="text-xl font-bold font-ranyth">{category}</h3>
                          <p className="text-sm text-muted-foreground">
                            {categoryAwards.length} award{categoryAwards.length !== 1 ? 's' : ''}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">
                          {isExpanded ? 'Hide' : 'Show'}
                        </span>
                        {isExpanded ? (
                          <ChevronDown className="h-5 w-5 text-muted-foreground" />
                        ) : (
                          <ChevronRight className="h-5 w-5 text-muted-foreground" />
                        )}
                      </div>
                    </button>

                    {/* Category Content */}
                    {isExpanded && (
                      <div className="p-4 pt-0">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                          {categoryAwards.map(award => {
                            const AwardIcon = award.icon;
                            return (
                              <div
                                key={award.id}
                                onClick={() => setSelectedAward(award)}
                                className={`bg-[#262626] rounded-lg p-4 transition-all duration-200 hover:scale-[1.02] hover:shadow-lg hover:shadow-vale-blue/25 cursor-pointer border border-transparent hover:border-vale-blue/30 ${
                                  award.winner.name === 'Nobody' ? 'opacity-50 cursor-default' : ''
                                }`}
                              >
                                <div className="flex items-center gap-3">
                                  <div className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-vale-blue-light/10 flex-shrink-0">
                                    <AwardIcon className={`h-6 w-6 ${award.winner.name === 'Nobody' ? 'text-gray-500' : 'text-vale-blue-light'}`} />
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <h4 className="text-base font-semibold font-ranyth truncate">{award.name}</h4>
                                    <div className="flex items-center justify-between gap-2">
                                      <span className={`text-base font-ranyth-mixed truncate ${
                                        award.winner.name === 'Nobody' ? 'text-gray-500 italic' : ''
                                      }`}>
                                        {award.winner.name}
                                      </span>
                                      <span className={`text-base font-semibold whitespace-nowrap ${
                                        award.winner.name === 'Nobody' ? 'text-gray-500' : 'text-vale-green'
                                      }`}>
                                        {award.winner.name === 'Nobody' ? '0' : formatValue(award.winner.value, award.id)}
                                      </span>
                                    </div>
                                    <p className="text-sm text-muted-foreground truncate">{award.objective}</p>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
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