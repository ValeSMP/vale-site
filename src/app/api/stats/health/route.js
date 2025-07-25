// src/app/api/stats/health/route.ts
import { NextResponse } from 'next/server';

const STATS_API_URL = process.env.STATS_API_URL || 'http://velocity-proxy:8080';

export async function GET() {
  try {
    const response = await fetch(`${STATS_API_URL}/health`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (response.ok) {
      const data = await response.json();
      return NextResponse.json({
        status: 'healthy',
        api_status: data.status || 'unknown',
        timestamp: new Date().toISOString()
      });
    } else {
      return NextResponse.json(
        { 
          status: 'unhealthy', 
          error: `API returned ${response.status}`,
          timestamp: new Date().toISOString()
        },
        { status: 503 }
      );
    }
  } catch (error) {
    console.error('Health check failed:', error);
    return NextResponse.json(
      { 
        status: 'unhealthy', 
        error: 'Connection failed',
        timestamp: new Date().toISOString()
      },
      { status: 503 }
    );
  }
}