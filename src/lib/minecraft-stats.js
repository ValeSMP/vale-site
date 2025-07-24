// lib/minecraft-stats.js
const STATS_API_URL = process.env.NEXT_PUBLIC_STATS_API_URL || 'http://localhost:8080';
const STATS_API_KEY = process.env.STATS_API_KEY;

class MinecraftStatsAPI {
  async getPlayerStats(username) {
    const response = await fetch(`${STATS_API_URL}/api/stats/player/${username}`, {
      headers: {
        'Authorization': `Bearer ${STATS_API_KEY}`
      }
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch stats for ${username}`);
    }
    
    return response.json();
  }
  
  async getTopPlayers(statKey, limit = 10) {
    const response = await fetch(`${STATS_API_URL}/api/stats/top/${statKey}?limit=${limit}`, {
      headers: {
        'Authorization': `Bearer ${STATS_API_KEY}`
      }
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch top players');
    }
    
    return response.json();
  }
  
  async getEventLeaderboard(eventName) {
    const response = await fetch(`${STATS_API_URL}/api/stats/event/${eventName}`, {
      headers: {
        'Authorization': `Bearer ${STATS_API_KEY}`
      }
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch event ${eventName}`);
    }
    
    return response.json();
  }
  
  // Get all stats for all players TODO: reconsider this
  async getAllStats() {
    const response = await fetch(`${STATS_API_URL}/api/stats/all`, {
      headers: {
        'Authorization': `Bearer ${STATS_API_KEY}`
      }
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch all stats');
    }
    
    return response.json();
  }
}

export const statsAPI = new MinecraftStatsAPI();

// Helper function to format stat names
export function formatStatName(statKey) {
  // minecraft:custom:minecraft:play_time -> Play Time
  // minecraft:mined:minecraft:diamond_ore -> Mined Diamond Ore
  
  const parts = statKey.split(':');
  const category = parts[0];
  const type = parts[1];
  const item = parts[parts.length - 1];
  
  // Convert snake_case to Title Case
  const formatName = (str) => str
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
  
  if (type === 'custom') {
    return formatName(item);
  }
  
  return `${formatName(type)} ${formatName(item)}`;
}

// Helper to format values (e.g., time, distance)
export function formatStatValue(statKey, value) {
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
  if (statKey.includes('walk_one_cm') || statKey.includes('distance')) {
    const meters = value / 100;
    const km = meters / 1000;
    
    if (km >= 1) return `${km.toFixed(2)} km`;
    return `${meters.toFixed(0)} m`;
  }
  
  // Default - just format with commas
  return value.toLocaleString();
}