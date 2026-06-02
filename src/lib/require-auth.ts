import { toast } from "sonner";
import { useAuth } from "@/lib/auth-context";
import { useRouter } from "@tanstack/react-router";

export function useRequireAuth() {
  const { user } = useAuth();
  const router = useRouter();
  return (action?: () => void) => {
    if (!user) {
      toast.error("Please login to continue", {
        description: "Login is required to upload data and earn rewards.",
        action: { label: "Login", onClick: () => router.navigate({ to: "/login" }) },
        position: "top-right",
      });
      return false;
    }
    action?.();
    return true;
  };
}
