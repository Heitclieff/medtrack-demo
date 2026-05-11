import { useMutation, useQueryClient } from '@tanstack/react-query';
import { authService, AuthResponse } from '@/features/auth/services/authService';
import { useAuthStore } from '@/stores/authStore';

export function useLogin() {
  const setUser = useAuthStore((state) => state.setUser);
  
  return useMutation({
    mutationFn: (credentials: any) => authService.login(credentials),
    onSuccess: (data: AuthResponse) => {
      setUser({
        id: data.user.id,
        username: data.user.username,
        firstName: data.user.username,
        lastName: '',
        role: data.user.role,
      });
    },
  });
}
