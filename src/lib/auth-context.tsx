import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";
import {
  createAdminUser,
  createRedeemForUser,
  createSubmissionForUser,
  findAccountRowById,
  loadAppSnapshot,
  loginAdminWithCredentials,
  loginUserWithPhone,
  logoutFirebaseSession,
  mapAccountRow,
  markRedeemAsPaid,
  resolveSessionUser,
  reviewSubmissionItem,
  signupAccount,
  subscribeToAppTables,
  subscribeToUserSession,
  updateSubmissionReviewStatus,
  type AppUser,
  type RedeemRequest,
  type SignupInput,
  type Submission,
  type SubmissionDraft,
  type SubmissionItemStatus,
  type SubmissionStatus,
} from "@/lib/supabase-app-service";

export type {
  AppUser,
  RedeemRequest,
  Submission,
  SubmissionDraft,
  SubmissionItemStatus,
  SubmissionStatus,
  SignupInput,
} from "@/lib/supabase-app-service";
export {
  ADMIN_EMAIL,
  MIN_REDEEM_POINTS,
  POINTS_PER_IMAGE,
  POINTS_PER_RUPEE,
} from "@/lib/supabase-app-service";

interface AuthCtx {
  user: AppUser | null;
  users: AppUser[];
  submissions: Submission[];
  redeems: RedeemRequest[];
  ready: boolean;
  signup: (data: SignupInput) => Promise<{ ok: boolean; error?: string }>;
  loginWithPhone: (phone: string, password: string) => Promise<{ ok: boolean; error?: string }>;
  loginAdmin: (email: string, password: string) => Promise<{ ok: boolean; error?: string }>;
  logout: () => void;
  addSubmission: (s: SubmissionDraft) => Promise<{ ok: boolean; error?: string }>;
  updateSubmissionStatus: (id: string, status: SubmissionStatus) => Promise<void>;
  reviewSubmissionItem: (
    submissionId: string,
    itemIndex: number,
    status: SubmissionItemStatus,
  ) => Promise<{ ok: boolean; error?: string }>;
  addRedeem: (r: Omit<RedeemRequest, "id" | "userId" | "date" | "status">) => Promise<void>;
  markRedeemPaid: (id: string) => Promise<void>;
  getUserById: (id: string) => AppUser | undefined;
  verifiedPointsFor: (userId: string) => number;
  availablePointsFor: (userId: string) => number;
}

const Ctx = createContext<AuthCtx | null>(null);
const ADMIN_SESSION_KEY = "cse_admin_session_v1";
const SESSION_KEY = "cse_session_v3";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [users, setUsers] = useState<AppUser[]>([]);
  const [accountsRaw, setAccountsRaw] = useState<Array<{ id: string }>>([]);
  const [user, setUser] = useState<AppUser | null>(null);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [redeems, setRedeems] = useState<RedeemRequest[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const loadData = async () => {
      const snapshot = await loadAppSnapshot();
      if (cancelled) return;
      setAccountsRaw(snapshot.accountRows);
      setUsers(snapshot.users);
      setSubmissions(snapshot.submissions);
      setRedeems(snapshot.redeems);

      const storedSessionId =
        typeof window !== "undefined" ? localStorage.getItem(SESSION_KEY) : null;
      if (storedSessionId) {
        const restoredUser = findAccountRowById(snapshot.accountRows, storedSessionId);
        if (restoredUser) setUser(mapAccountRow(restoredUser));
      }
    };

    void loadData();

    const hasAdminSession =
      typeof window !== "undefined" && localStorage.getItem(ADMIN_SESSION_KEY) === "__admin__";

    if (hasAdminSession) {
      setUser(createAdminUser());
      setReady(true);
    }

    const channel = subscribeToAppTables(async () => {
      await loadData();
    });

    const unsubscribeAuth = subscribeToUserSession(async (nextUser) => {
      if (cancelled) return;

      const adminSession =
        typeof window !== "undefined" && localStorage.getItem(ADMIN_SESSION_KEY) === "__admin__";
      if (adminSession) {
        setUser(createAdminUser());
        setReady(true);
        return;
      }

      setUser(nextUser);
      setReady(true);
    });

    return () => {
      cancelled = true;
      supabase.removeChannel(channel);
      unsubscribeAuth();
    };
  }, []);

  const signup: AuthCtx["signup"] = async (data) => {
    const result = await signupAccount(data);
    if (!result.ok) return result;

    if (typeof window !== "undefined") {
      localStorage.removeItem(ADMIN_SESSION_KEY);
      localStorage.setItem(SESSION_KEY, result.row.id);
    }
    setAccountsRaw((prev) => [result.row, ...prev]);
    setUsers((prev) => [result.user, ...prev]);
    setUser(result.user);
    setReady(true);
    return { ok: true };
  };

  const loginWithPhone: AuthCtx["loginWithPhone"] = async (phone, password) => {
    const result = await loginUserWithPhone(phone, password);
    if (!result.ok) return result;

    if (typeof window !== "undefined") {
      localStorage.removeItem(ADMIN_SESSION_KEY);
      localStorage.setItem(SESSION_KEY, result.row.id);
    }
    setUser(result.user);
    setReady(true);
    return { ok: true };
  };

  const loginAdmin: AuthCtx["loginAdmin"] = async (email, password) => {
    const result = await loginAdminWithCredentials(email, password);
    if (!result.ok) return result;

    if (typeof window !== "undefined") {
      localStorage.setItem(ADMIN_SESSION_KEY, "__admin__");
      localStorage.removeItem(SESSION_KEY);
    }
    setUser(result.user);
    setReady(true);
    return { ok: true };
  };

  const logout = () => {
    setUser(null);
    if (typeof window !== "undefined") {
      localStorage.removeItem(ADMIN_SESSION_KEY);
      localStorage.removeItem(SESSION_KEY);
    }
    void logoutFirebaseSession();
  };

  const addSubmission: AuthCtx["addSubmission"] = async (s) => {
    if (!user || user.userType === "admin") {
      return { ok: false, error: "Only signed-in users can upload submissions" };
    }

    const result = await createSubmissionForUser(user.id, s);
    if (!result.ok) return result;

    setSubmissions((prev) => [result.submission, ...prev]);
    return { ok: true };
  };

  const updateSubmissionStatus: AuthCtx["updateSubmissionStatus"] = async (id, status) => {
    const updated = await updateSubmissionReviewStatus(id, status);
    if (updated) {
      setSubmissions((prev) =>
        prev.map((submission) => (submission.id === id ? updated : submission)),
      );
    }
  };

  const reviewSubmissionItemStatus: AuthCtx["reviewSubmissionItem"] = async (
    submissionId,
    itemIndex,
    status,
  ) => {
    const result = await reviewSubmissionItem(submissionId, itemIndex, status);
    if (!result.ok) return result;

    setSubmissions((prev) =>
      prev.map((submission) => (submission.id === submissionId ? result.submission : submission)),
    );

    return { ok: true };
  };

  const addRedeem: AuthCtx["addRedeem"] = async (r) => {
    if (!user) return;
    const created = await createRedeemForUser(user.id, r);
    if (created) setRedeems((prev) => [created, ...prev]);
  };

  const markRedeemPaid: AuthCtx["markRedeemPaid"] = async (id) => {
    const updated = await markRedeemAsPaid(id);
    if (updated) {
      setRedeems((prev) => prev.map((redeem) => (redeem.id === id ? updated : redeem)));
    }
  };

  const getUserById = (id: string) => users.find((account) => account.id === id);
  const verifiedPointsFor = (userId: string) =>
    submissions
      .filter((submission) => submission.userId === userId && submission.status === "verified")
      .reduce((sum, submission) => sum + submission.points, 0);
  const availablePointsFor = (userId: string) => {
    const earned = verifiedPointsFor(userId);
    const spent = redeems
      .filter((redeem) => redeem.userId === userId)
      .reduce((sum, redeem) => sum + redeem.points, 0);
    return earned - spent;
  };

  return (
    <Ctx.Provider
      value={{
        user,
        users,
        submissions,
        redeems,
        ready,
        signup,
        loginWithPhone,
        loginAdmin,
        logout,
        addSubmission,
        updateSubmissionStatus,
        reviewSubmissionItem: reviewSubmissionItemStatus,
        addRedeem,
        markRedeemPaid,
        getUserById,
        verifiedPointsFor,
        availablePointsFor,
      }}
    >
      {children}
    </Ctx.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
