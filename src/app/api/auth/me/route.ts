import { NextResponse } from 'next/server';
import { getIronSession } from 'iron-session';
import { cookies } from 'next/headers';
import { sessionOptions, SessionData } from '@/lib/session';
import { apiClient } from '@/services/api/apiClient';

export async function GET() {
  try {
    const cookieStore = await cookies();
    const session = await getIronSession<SessionData>(cookieStore, sessionOptions);
    
    if (!session.isLoggedIn || !session.token) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }
    
    // Fetch fresh user profile from backend using the stored token
    const response = await apiClient.get<any>('/auth/me');
    
    return NextResponse.json(response.data);
  } catch (error: any) {
    // If token is invalid or expired
    const cookieStore = await cookies();
    const session = await getIronSession<SessionData>(cookieStore, sessionOptions);
    session.destroy();
    
    return NextResponse.json(
      { message: error?.message || 'Session expired' },
      { status: 401 }
    );
  }
}
