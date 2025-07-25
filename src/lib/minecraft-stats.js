// lib/minecraft-stats.js
const STATS_API_URL = process.env.NEXT_PUBLIC_STATS_API_URL || 'http://localhost:8080';
const STATS_API_KEY = process.env.NEXT_PUBLIC_STATS_API_KEY || 'your-secret-api-key-here';

class MinecraftStatsAPI {
  async makeRequest(endpoint) {
    try {
      const response = await fetch(`${STATS_API_URL}${endpoint}`, {
        headers: {
          'Authorization': `Bearer ${STATS_API_KEY}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('Unauthorized - check API key');
        }
        throw new Error(`API request failed: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Stats API request failed:', error);
      throw error;
    }
  }

  async getPlayerStats(username) {
    return await this.makeRequest(`/api/stats/player/${encodeURIComponent(username)}`);
  }
  
  async getTopPlayers(statKey, limit = 10) {
    return await this.makeRequest(`/api/stats/top/${encodeURIComponent(statKey)}?limit=${limit}`);
  }
  
  async getEventLeaderboard(eventName) {
    return await this.makeRequest(`/api/stats/event/${encodeURIComponent(eventName)}`);
  }
  
  async getAllStats() {
    return await this.makeRequest('/api/stats/all');
  }

  async getHealthStatus() {
    try {
      const response = await fetch(`${STATS_API_URL}/health`);
      return response.ok;
    } catch {
      return false;
    }
  }
}

export const statsAPI = new MinecraftStatsAPI();

// Helper function to format stat names for display
export function formatStatName(statKey) {
  // minecraft:custom:minecraft:play_time -> Play Time
  // minecraft:mined:minecraft:diamond_ore -> Mined Diamond Ore
  
  if (!statKey) return 'Unknown Stat';
  
  const parts = statKey.split(':');
  if (parts.length < 3) return statKey;
  
  const category = parts[1]; // custom, mined, used, killed, etc.
  const item = parts[parts.length - 1]; // play_time, diamond_ore, etc.
  
  // Convert snake_case to Title Case
  const formatName = (str) => str
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
  
  // Special cases for custom stats
  if (category === 'custom') {
    const customStats = {
      'play_time': 'Play Time',
      'walk_one_cm': 'Distance Walked',
      'sprint_one_cm': 'Distance Sprinted',
      'fly_one_cm': 'Distance Flown',
      'swim_one_cm': 'Distance Swum',
      'fall_one_cm': 'Distance Fallen',
      'climb_one_cm': 'Distance Climbed',
      'crouch_one_cm': 'Distance Crouched',
      'minecart_one_cm': 'Distance by Minecart',
      'boat_one_cm': 'Distance by Boat',
      'pig_one_cm': 'Distance by Pig',
      'horse_one_cm': 'Distance by Horse',
      'aviate_one_cm': 'Distance by Elytra',
      'jump': 'Jumps',
      'drop': 'Items Dropped',
      'damage_dealt': 'Damage Dealt',
      'damage_taken': 'Damage Taken',
      'deaths': 'Deaths',
      'mob_kills': 'Mob Kills',
      'player_kills': 'Player Kills',
      'fish_caught': 'Fish Caught',
      'animals_bred': 'Animals Bred',
      'leave_game': 'Times Left Game',
      'sneak_time': 'Time Sneaking',
      'time_since_death': 'Time Since Death',
      'time_since_rest': 'Time Since Rest',
      'talked_to_villager': 'Times Talked to Villager',
      'traded_with_villager': 'Times Traded with Villager',
      'cake_slices_eaten': 'Cake Slices Eaten',
      'cauldron_filled': 'Cauldrons Filled',
      'cauldron_used': 'Cauldrons Used',
      'armor_cleaned': 'Armor Pieces Cleaned',
      'banner_cleaned': 'Banners Cleaned',
      'brewingstand_interaction': 'Brewing Stand Uses',
      'beacon_interaction': 'Beacon Interactions',
      'dropper_inspected': 'Droppers Inspected',
      'hopper_inspected': 'Hoppers Inspected',
      'dispenser_inspected': 'Dispensers Inspected',
      'noteblock_played': 'Note Blocks Played',
      'noteblock_tuned': 'Note Blocks Tuned',
      'flower_potted': 'Flowers Potted',
      'trapped_chest_triggered': 'Trapped Chests Triggered',
      'enderchest_opened': 'Ender Chests Opened',
      'item_enchanted': 'Items Enchanted',
      'record_played': 'Records Played',
      'furnace_interaction': 'Furnace Uses',
      'crafting_table_interaction': 'Crafting Table Uses',
      'chest_opened': 'Chests Opened',
      'sleep_in_bed': 'Times Slept in Bed',
      'shulker_box_opened': 'Shulker Boxes Opened'
    };
    
    return customStats[item] || formatName(item);
  }
  
  // Handle other categories
  const categoryNames = {
    'mined': 'Mined',
    'used': 'Used',
    'crafted': 'Crafted',
    'broken': 'Broken',
    'picked_up': 'Picked Up',
    'dropped': 'Dropped',
    'killed': 'Killed',
    'killed_by': 'Killed By'
  };
  
  const categoryName = categoryNames[category] || formatName(category);
  const itemName = formatName(item);
  
  return `${categoryName} ${itemName}`;
}

// Helper to format values (e.g., time, distance)
export function formatStatValue(statKey, value) {
  if (!statKey || value == null) return '0';
  
  // Time stats (in ticks - 20 ticks = 1 second)
  if (statKey.includes('time') || statKey.includes('one_minute')) {
    const seconds = Math.floor(value / 20);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    
    if (days > 0) return `${days}d ${hours % 24}h`;
    if (hours > 0) return `${hours}h ${minutes % 60}m`;
    if (minutes > 0) return `${minutes}m ${seconds % 60}s`;
    return `${seconds}s`;
  }
  
  // Distance stats (in cm)
  if (statKey.includes('one_cm') || statKey.includes('distance')) {
    const meters = value / 100;
    const km = meters / 1000;
    
    if (km >= 1) return `${km.toFixed(2)} km`;
    if (meters >= 1) return `${meters.toFixed(0)} m`;
    return `${value} cm`;
  }
  
  // Damage (in half-hearts, convert to hearts)
  if (statKey.includes('damage')) {
    const hearts = value / 2;
    return `${hearts.toFixed(1)} ❤`;
  }
  
  // Large numbers get comma formatting
  if (value >= 1000) {
    return value.toLocaleString();
  }
  
  // Default - just the number
  return value.toString();
}

// Helper to get stat category for grouping
export function getStatCategory(statKey) {
  if (!statKey) return 'other';
  
  if (statKey.includes('time')) return 'time';
  if (statKey.includes('distance') || statKey.includes('one_cm')) return 'movement';
  if (statKey.includes('mined')) return 'mining';
  if (statKey.includes('used') || statKey.includes('crafted')) return 'building';
  if (statKey.includes('killed')) return 'combat';
  if (statKey.includes('damage')) return 'combat';
  if (statKey.includes('fish')) return 'fishing';
  if (statKey.includes('food') || statKey.includes('eaten')) return 'food';
  
  return 'other';
}

// Helper to get icon for stat category
export function getStatIcon(statKey) {
  const category = getStatCategory(statKey);
  
  const icons = {
    'time': '⏰',
    'movement': '🏃',
    'mining': '⛏️',
    'building': '🔨',
    'combat': '⚔️',
    'fishing': '🎣',
    'food': '🍞',
    'other': '📊'
  };
  
  return icons[category] || icons.other;
}

// Get common stat keys for easy reference
export const COMMON_STATS = {
  // Time
  PLAY_TIME: 'minecraft:custom:minecraft:play_time',
  TIME_SINCE_DEATH: 'minecraft:custom:minecraft:time_since_death',
  TIME_SINCE_REST: 'minecraft:custom:minecraft:time_since_rest',
  SNEAK_TIME: 'minecraft:custom:minecraft:sneak_time',
  
  // Movement
  WALK_DISTANCE: 'minecraft:custom:minecraft:walk_one_cm',
  SPRINT_DISTANCE: 'minecraft:custom:minecraft:sprint_one_cm',
  FLY_DISTANCE: 'minecraft:custom:minecraft:fly_one_cm',
  SWIM_DISTANCE: 'minecraft:custom:minecraft:swim_one_cm',
  
  // Mining
  STONE_MINED: 'minecraft:mined:minecraft:stone',
  COAL_MINED: 'minecraft:mined:minecraft:coal_ore',
  IRON_MINED: 'minecraft:mined:minecraft:iron_ore',
  GOLD_MINED: 'minecraft:mined:minecraft:gold_ore',
  DIAMOND_MINED: 'minecraft:mined:minecraft:diamond_ore',
  
  // Combat
  MOB_KILLS: 'minecraft:custom:minecraft:mob_kills',
  PLAYER_KILLS: 'minecraft:custom:minecraft:player_kills',
  DEATHS: 'minecraft:custom:minecraft:deaths',
  DAMAGE_DEALT: 'minecraft:custom:minecraft:damage_dealt',
  DAMAGE_TAKEN: 'minecraft:custom:minecraft:damage_taken',
  
  // Specific mobs
  ZOMBIE_KILLS: 'minecraft:killed:minecraft:zombie',
  SKELETON_KILLS: 'minecraft:killed:minecraft:skeleton',
  CREEPER_KILLS: 'minecraft:killed:minecraft:creeper',
  SPIDER_KILLS: 'minecraft:killed:minecraft:spider',
  ENDERMAN_KILLS: 'minecraft:killed:minecraft:enderman',
  ENDER_DRAGON_KILLS: 'minecraft:killed:minecraft:ender_dragon',
  
  // Other
  FISH_CAUGHT: 'minecraft:custom:minecraft:fish_caught',
  JUMPS: 'minecraft:custom:minecraft:jump',
  ITEMS_DROPPED: 'minecraft:custom:minecraft:drop'
};

// Pre-defined award categories for easy setup
export const AWARD_CATEGORIES = [
  {
    id: 'dedication',
    name: 'Dedication Award',
    description: 'Most time played on the server',
    statKey: COMMON_STATS.PLAY_TIME,
    icon: '⏰'
  },
  {
    id: 'explorer',
    name: 'World Explorer',
    description: 'Longest distance traveled',
    statKey: COMMON_STATS.WALK_DISTANCE,
    icon: '🗺️'
  },
  {
    id: 'miner',
    name: 'Master Miner',
    description: 'Most blocks mined',
    statKey: COMMON_STATS.STONE_MINED,
    icon: '⛏️'
  },
  {
    id: 'diamond_hunter',
    name: 'Diamond Hunter',
    description: 'Most diamonds mined',
    statKey: COMMON_STATS.DIAMOND_MINED,
    icon: '💎'
  },
  {
    id: 'monster_slayer',
    name: 'Monster Slayer',
    description: 'Most hostile mobs killed',
    statKey: COMMON_STATS.MOB_KILLS,
    icon: '⚔️'
  },
  {
    id: 'survivor',
    name: 'Survivor',
    description: 'Fewest deaths (lower is better)',
    statKey: COMMON_STATS.DEATHS,
    icon: '💚',
    reverse: true // Lower values are better
  },
  {
    id: 'fisherman',
    name: 'Master Fisherman',
    description: 'Most fish caught',
    statKey: COMMON_STATS.FISH_CAUGHT,
    icon: '🎣'
  },
  {
    id: 'sprinter',
    name: 'Speed Demon',
    description: 'Longest distance sprinted',
    statKey: COMMON_STATS.SPRINT_DISTANCE,
    icon: '💨'
  }
];