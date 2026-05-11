export class SessionOptions {
  static readonly config = {
    password: process.env.SESSION_SECRET || 'complex_password_at_least_32_characters_long_for_dev',
    cookieName: 'medical-inventory-session',
    cookieOptions: {
      secure: process.env.NODE_ENV === 'production',
      httpOnly: true,
      sameSite: 'lax' as const,
      maxAge: 60 * 60 * 24,
    },
  };
}

export interface SessionData {
  token?: string;
  refreshToken?: string;
  userId?: string;
  role?: string;
  isLoggedIn: boolean;
}

export const defaultSession: SessionData = {
  isLoggedIn: false,
};

export const sessionOptions = SessionOptions.config;
