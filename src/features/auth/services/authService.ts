export interface AuthResponse {
  token: string;
  user: {
    id: string;
    username: string;
    role: string;
  };
}

export class AuthService {
  async login(credentials: any): Promise<AuthResponse> {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.message || 'Login failed');
    }

    return res.json();
  }

  async logout(): Promise<void> {
    await fetch('/api/auth/logout', { method: 'POST' });
  }

  async me(): Promise<any> {
    const res = await fetch('/api/auth/me');
    if (!res.ok) throw new Error('Not authenticated');
    return res.json();
  }
}

export const authService = new AuthService();
