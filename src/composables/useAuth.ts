import type { LoginInput, SignupInput } from "@/schema/auth.schema";
import {
  login as loginService,
  logout as logoutService,
  signup as signupService,
} from "@/services/auth.service";
import { inject, ref, type InjectionKey } from "vue";
import { toast } from "vue-sonner";

export type AuthStatus =
  | "isLoggingIn"
  | "isSigningUp"
  | "isLoggingOut"
  | "idle";

export interface Auth {
  status: AuthStatus;
  logout: () => Promise<void>;
  login: (data: LoginInput) => Promise<void>;
  signup: (data: SignupInput) => Promise<void>;
}

export const AuthSymbol: InjectionKey<Auth> = Symbol("Auth");

export function createAuth(): Auth {
  const status = ref<AuthStatus>("idle");

  const logout = async () => {
    try {
      status.value = "isLoggingOut";
      await logoutService();
      toast.success("Logged out successfully");
      window.location.href = "/login";
    } catch (e) {
      toast.error((e as Error).message);
    } finally {
      status.value = "idle";
    }
  };

  const signup = async (data: SignupInput) => {
    try {
      status.value = "isSigningUp";
      await signupService(data);
      toast.success("Account created successfully");
      window.location.href = "/dashboard";
    } catch (e) {
      toast.error((e as Error).message);
    } finally {
      status.value = "idle";
    }
  };

  const login = async (data: LoginInput) => {
    try {
      status.value = "isLoggingIn";
      await loginService(data);
      toast.success("Logged in successfully");
      window.location.href = "/dashboard";
    } catch (e) {
      toast.error((e as Error).message);
    } finally {
      status.value = "idle";
    }
  };

  return {
    get status() {
      return status.value;
    },
    login,
    logout,
    signup,
  };
}

export function useAuth(): Auth {
  const auth = inject(AuthSymbol);

  if (!auth) {
    throw new Error("Auth context is being accessed outside of its provider");
  }

  return auth;
}
