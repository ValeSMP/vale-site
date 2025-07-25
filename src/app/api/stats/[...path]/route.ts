// src/app/api/stats/[...path]/route.ts
import { NextRequest, NextResponse } from 'next/server';

const STATS_API_URL = process.env.STATS_API_URL || 'http://velocity-proxy:8080';
const STATS_API_KEY = process.env.STATS_API_KEY || 'your-api-key';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function GET(request: NextRequest, { params }: any) {
  try {
    // Get the path segments
    const path = params.path;
    
    // Reconstruct the API path
    const apiPath = path.join('/');
    const searchParams = request.nextUrl.searchParams.toString();
    const fullUrl = `${STATS_API_URL}/api/stats/${apiPath}${searchParams ? `?${searchParams}` : ''}`;

    console.log('Proxying request to:', fullUrl);

    const response = await fetch(fullUrl, {
      headers: {
        'Authorization': `Bearer ${STATS_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      console.error('API request failed:', response.status, response.statusText);
      return NextResponse.json(
        { error: `API request failed: ${response.status}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);

  } catch (error) {
    console.error('Stats API proxy error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function HEAD() {
  try {
    const response = await fetch(`${STATS_API_URL}/health`);
    return new NextResponse(null, { status: response.status });
  } catch {
    return new NextResponse(null, { status: 503 });
  }
}