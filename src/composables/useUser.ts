import { inject, type InjectionKey, type Ref } from "vue";
import type { User } from "@/types";

export const UserKey: InjectionKey<Ref<User | null>> = Symbol("user");

export const useUser = () => {
  const user = inject(UserKey);

  if (!user) {
    throw new Error("User context is being accessed outside of it's provider");
  }

  return user;
};
