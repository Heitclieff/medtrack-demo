import { NextRequest, NextResponse } from 'next/server';
import { getIronSession } from 'iron-session';
import { cookies } from 'next/headers';
import { sessionOptions, SessionData } from '@/lib/session';
import { apiClient } from '@/services/api/apiClient';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Call the actual backend via our internal apiClient setup (using httpAdapter inside or mockAdapter if mocked)
    // Note: If apiClient is using httpAdapter, it will call the backend.
    const response = await apiClient.post<any>('/auth/login', body);
    
    // We assume the backend returns { token, user } inside response.data
    const { token, user } = response.data;
    
    const cookieStore = await cookies();
    const session = await getIronSession<SessionData>(cookieStore, sessionOptions);
    
    session.token = token;
    session.userId = user?.id;
    session.role = user?.role;
    session.isLoggedIn = true;
    
    await session.save();
    
    return NextResponse.json({ user, message: 'Logged in successfully' });
  } catch (error: any) {
    return NextResponse.json(
      { message: error?.message || 'Authentication failed' },
      { status: error?.status || 401 }
    );
  }
}
