import { computed } from 'vue';
import { d as useNuxtApp, i as useState } from './server.mjs';

function extractUser(res) {
  return res?.user ?? res?.data?.user ?? res?.data ?? res ?? null;
}
function useAuth() {
  const { $api } = useNuxtApp();
  const state = useState("auth", () => {
    let cached = null;
    return { user: cached, ready: false };
  });
  const setUser = (u) => {
    state.value.user = u;
    return;
  };
  const loadUser = async () => {
    try {
      const res = await $api("/me", { method: "GET" });
      setUser(extractUser(res));
    } catch {
      setUser(null);
    }
  };
  const login = async (payloadOrEmail, maybePassword) => {
    const payload = typeof payloadOrEmail === "string" ? { email: payloadOrEmail, password: maybePassword } : payloadOrEmail;
    const res = await $api("/auth/login", { method: "POST", body: payload });
    res?.token || res?.data?.token;
    const u = extractUser(res);
    if (u) setUser(u);
    else await loadUser();
    return state.value.user;
  };
  const register = async (payload) => {
    const res = await $api("/auth/register", { method: "POST", body: payload });
    res?.token || res?.data?.token;
    const u = extractUser(res);
    if (u) setUser(u);
    else await loadUser();
    return state.value.user;
  };
  const logout = async () => {
    try {
      await $api("/auth/logout", { method: "POST" });
    } catch {
    }
    setUser(null);
  };
  return {
    user: computed(() => state.value.user),
    ready: computed(() => state.value.ready),
    isLoggedIn: computed(() => !!state.value.user || false),
    login,
    register,
    logout,
    reloadUser: loadUser
  };
}

export { useAuth as u };
//# sourceMappingURL=useAuth-DyorHlVq.mjs.map
