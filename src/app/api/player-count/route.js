export async function GET() {
  try {
    const response = await fetch('https://api.mcsrvstat.us/3/dev.hxrry27.co.uk', {
      headers: {
        'User-Agent': 'ValeSMP-Website/1.0 (https://valesmp.com)'
      }
    })
    
    if (!response.ok) {
      throw new Error(`API responded with status: ${response.status}`)
    }
    
    const data = await response.json()
    
    return Response.json({
      online: data.online,
      players: data.online ? data.players.online : 0,
      max: data.online ? data.players.max : 0,
      version: data.version || null,
      motd: data.motd?.clean?.[0] || null
    })
  } catch (error) {
    console.error('Failed to fetch server status:', error)
    return Response.json({ 
      online: false, 
      players: 0, 
      max: 0,
      version: null,
      motd: null
    }, { status: 500 })
  }
}