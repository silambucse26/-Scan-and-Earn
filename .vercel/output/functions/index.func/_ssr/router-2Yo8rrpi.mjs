import { Q as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { Q as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
import { b as createRouter, a as createRootRouteWithContext, L as Link, O as Outlet, H as HeadContent, S as Scripts, c as createFileRoute, l as lazyRouteComponent, u as useRouter } from "../_libs/tanstack__react-router.mjs";
import { I as notFound } from "../_libs/tanstack__router-core.mjs";
import { j as jsxRuntimeExports, r as reactExports } from "../_libs/react.mjs";
import { c as createClient } from "../_libs/supabase__supabase-js.mjs";
import { T as Toaster$1 } from "../_libs/sonner.mjs";
import { S as Slot } from "../_libs/radix-ui__react-slot.mjs";
import { c as cva } from "../_libs/class-variance-authority.mjs";
import { c as clsx } from "../_libs/clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { k as Leaf, W as Wallet, S as ShieldCheck, s as User, m as LogOut } from "../_libs/lucide-react.mjs";
import { o as objectType, c as coerce } from "../_libs/zod.mjs";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "node:stream";
import "../_libs/isbot.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
const appCss = "/assets/styles-BCXQKlLC.css";
function createSupabaseClient() {
  const supabaseUrl = "https://qzdibghgbtphmmpvspyt.supabase.co";
  const supabasePublishableKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF6ZGliZ2hnYnRwaG1tcHZzcHl0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAyODkyMDYsImV4cCI6MjA5NTg2NTIwNn0.8BU_RaDG72u_JVGe-vMnvIvynVqzDfYaXiVBd_tlEx0";
  return createClient(supabaseUrl, supabasePublishableKey, {
    auth: {
      storage: typeof window !== "undefined" ? localStorage : void 0,
      persistSession: true,
      autoRefreshToken: true
    }
  });
}
let supabaseClient;
const supabase = new Proxy({}, {
  get(_, prop, receiver) {
    if (!supabaseClient) supabaseClient = createSupabaseClient();
    return Reflect.get(supabaseClient, prop, receiver);
  }
});
const POINTS_PER_IMAGE = 20;
const SUBMISSION_IMAGES_BUCKET = "submission-images";
const POINTS_PER_RUPEE = 10;
const MIN_REDEEM_POINTS = 100;
const ADMIN_EMAIL = "sales@chimertech.com";
const ADMIN_PASS = "ChimerTech@123";
const mapAccount = (row) => ({
  id: row.id,
  fullName: row.full_name,
  phone: row.phone,
  userType: row.user_type,
  location: row.location,
  joinDate: row.join_date
});
function normalizeSubmissionItems(items) {
  if (!Array.isArray(items)) return [];
  return items.flatMap((item) => {
    if (!item || typeof item !== "object") return [];
    const imageUrl = typeof item.imageUrl === "string" ? item.imageUrl : "";
    const label = typeof item.label === "string" ? item.label : "";
    if (!imageUrl || !label) return [];
    return [
      {
        imageUrl,
        label,
        status: item.status === "accepted" || item.status === "rejected" ? item.status : "pending",
        reviewedAt: typeof item.reviewedAt === "string" ? item.reviewedAt : void 0
      }
    ];
  });
}
const mapSubmission = (row) => ({
  id: row.id,
  userId: row.user_id,
  category: row.category,
  diseaseName: row.disease_name ?? void 0,
  items: normalizeSubmissionItems(row.items),
  points: row.points,
  status: row.status,
  date: row.date
});
const mapRedeem = (row) => ({
  id: row.id,
  userId: row.user_id,
  points: row.points,
  amount: Number(row.amount),
  upiId: row.upi_id,
  status: row.status,
  date: row.date,
  paidDate: row.paid_date ?? void 0
});
function createAdminUser(email = ADMIN_EMAIL) {
  return {
    id: "__admin__",
    fullName: "Administrator",
    phone: "-",
    email,
    userType: "admin",
    location: "HQ",
    joinDate: (/* @__PURE__ */ new Date()).toISOString()
  };
}
function deriveSubmissionStatus(items) {
  if (items.some((item) => item.status === "pending")) return "pending";
  if (items.some((item) => item.status === "accepted")) return "verified";
  return "rejected";
}
function deriveSubmissionPoints(items) {
  return items.filter((item) => item.status === "accepted").length * POINTS_PER_IMAGE;
}
function safeFileName(fileName) {
  return fileName.replace(/[^a-zA-Z0-9._-]/g, "-");
}
async function uploadSubmissionItem(userId, file) {
  const filePath = `${userId}/${Date.now()}-${crypto.randomUUID()}-${safeFileName(file.name)}`;
  const { error } = await supabase.storage.from(SUBMISSION_IMAGES_BUCKET).upload(filePath, file, { upsert: false });
  if (error) {
    throw new Error(
      error.message.includes("Bucket not found") ? `Storage bucket "${SUBMISSION_IMAGES_BUCKET}" was not found in Supabase.` : error.message
    );
  }
  const { data } = supabase.storage.from(SUBMISSION_IMAGES_BUCKET).getPublicUrl(filePath);
  return data.publicUrl;
}
async function loadAppSnapshot() {
  const [{ data: accounts }, { data: submissions }, { data: redeems }] = await Promise.all([
    supabase.from("accounts").select("*").order("join_date", { ascending: false }),
    supabase.from("submissions").select("*").order("date", { ascending: false }),
    supabase.from("redeems").select("*").order("date", { ascending: false })
  ]);
  const accountRows = accounts ?? [];
  return {
    accountRows,
    users: accountRows.map(mapAccount),
    submissions: (submissions ?? []).map(mapSubmission),
    redeems: (redeems ?? []).map(mapRedeem)
  };
}
function subscribeToAppTables(onChange) {
  return supabase.channel("cse-all").on("postgres_changes", { event: "*", schema: "public", table: "accounts" }, onChange).on("postgres_changes", { event: "*", schema: "public", table: "submissions" }, onChange).on("postgres_changes", { event: "*", schema: "public", table: "redeems" }, onChange).subscribe();
}
function subscribeToUserSession(onChange) {
  onChange(null);
  return () => {
  };
}
async function logoutFirebaseSession() {
  return;
}
async function signupAccount(data) {
  if (!data.fullName.trim()) return { ok: false, error: "Full name is required" };
  if (!/^\d{10}$/.test(data.phone)) {
    return { ok: false, error: "Enter a valid 10-digit phone number" };
  }
  if (data.password.length < 6) {
    return { ok: false, error: "Password must be at least 6 characters" };
  }
  if (!data.location.trim()) return { ok: false, error: "Location is required" };
  const { data: existing } = await supabase.from("accounts").select("id").eq("phone", data.phone).maybeSingle();
  if (existing) {
    return {
      ok: false,
      error: "An account with this phone number already exists. Please login."
    };
  }
  const { data: inserted, error } = await supabase.from("accounts").insert({
    full_name: data.fullName.trim(),
    phone: data.phone,
    password: data.password,
    user_type: data.userType,
    location: data.location.trim()
  }).select("*").single();
  if (error || !inserted) {
    return { ok: false, error: error?.message ?? "Could not create account" };
  }
  const row = inserted;
  return { ok: true, row, user: mapAccount(row) };
}
async function loginUserWithPhone(phone, password) {
  const { data, error } = await supabase.from("accounts").select("*").eq("phone", phone).maybeSingle();
  if (error) return { ok: false, error: error.message };
  if (!data) return { ok: false, error: "No account found with this phone number" };
  const row = data;
  if (row.password !== password) return { ok: false, error: "Incorrect password" };
  return { ok: true, row, user: mapAccount(row) };
}
async function loginAdminWithCredentials(email, password) {
  if (email.trim().toLowerCase() !== ADMIN_EMAIL.toLowerCase() || password !== ADMIN_PASS) {
    return { ok: false, error: "Invalid admin credentials" };
  }
  return { ok: true, user: createAdminUser(email.trim()) };
}
async function createSubmissionForUser(userId, submission) {
  try {
    const uploadedItems = await Promise.all(
      submission.items.map(async (item) => ({
        imageUrl: await uploadSubmissionItem(userId, item.file),
        label: item.label.trim(),
        status: "pending"
      }))
    );
    const { data, error } = await supabase.from("submissions").insert({
      user_id: userId,
      category: submission.category,
      disease_name: submission.diseaseName ?? null,
      items: uploadedItems,
      points: submission.items.length * POINTS_PER_IMAGE,
      status: "pending"
    }).select("*").single();
    if (error || !data) {
      return { ok: false, error: error?.message ?? "Could not save submission" };
    }
    return { ok: true, submission: mapSubmission(data) };
  } catch (error) {
    return {
      ok: false,
      error: error instanceof Error ? error.message : "Could not upload images"
    };
  }
}
async function updateSubmissionReviewStatus(id, status) {
  const { data, error } = await supabase.from("submissions").update({ status }).eq("id", id).select("*").single();
  if (error || !data) return null;
  return mapSubmission(data);
}
async function reviewSubmissionItem(submissionId, itemIndex, status) {
  const { data, error } = await supabase.from("submissions").select("*").eq("id", submissionId).single();
  if (error || !data) {
    return { ok: false, error: error?.message ?? "Submission not found" };
  }
  const row = data;
  const items = normalizeSubmissionItems(row.items).map(
    (item, index) => index === itemIndex ? { ...item, status, reviewedAt: (/* @__PURE__ */ new Date()).toISOString() } : item
  );
  const nextStatus = deriveSubmissionStatus(items);
  const nextPoints = deriveSubmissionPoints(items);
  const { data: updated, error: updateError } = await supabase.from("submissions").update({ items, status: nextStatus, points: nextPoints }).eq("id", submissionId).select("*").single();
  if (updateError || !updated) {
    return {
      ok: false,
      error: updateError?.message ?? "Could not update item review"
    };
  }
  return { ok: true, submission: mapSubmission(updated) };
}
async function createRedeemForUser(userId, redeem) {
  const { data, error } = await supabase.from("redeems").insert({
    user_id: userId,
    points: redeem.points,
    amount: redeem.amount,
    upi_id: redeem.upiId,
    status: "pending"
  }).select("*").single();
  if (error || !data) return null;
  return mapRedeem(data);
}
async function markRedeemAsPaid(id) {
  const { data, error } = await supabase.from("redeems").update({ status: "paid", paid_date: (/* @__PURE__ */ new Date()).toISOString() }).eq("id", id).select("*").single();
  if (error || !data) return null;
  return mapRedeem(data);
}
function findAccountRowById(accountRows, id) {
  return accountRows.find((account) => account.id === id);
}
function mapAccountRow(accountRow) {
  return mapAccount(accountRow);
}
const Ctx = reactExports.createContext(null);
const ADMIN_SESSION_KEY = "cse_admin_session_v1";
const SESSION_KEY = "cse_session_v3";
function AuthProvider({ children }) {
  const [users, setUsers] = reactExports.useState([]);
  const [accountsRaw, setAccountsRaw] = reactExports.useState([]);
  const [user, setUser] = reactExports.useState(null);
  const [submissions, setSubmissions] = reactExports.useState([]);
  const [redeems, setRedeems] = reactExports.useState([]);
  const [ready, setReady] = reactExports.useState(false);
  reactExports.useEffect(() => {
    let cancelled = false;
    const loadData = async () => {
      const snapshot = await loadAppSnapshot();
      if (cancelled) return;
      setAccountsRaw(snapshot.accountRows);
      setUsers(snapshot.users);
      setSubmissions(snapshot.submissions);
      setRedeems(snapshot.redeems);
      const storedSessionId = typeof window !== "undefined" ? localStorage.getItem(SESSION_KEY) : null;
      if (storedSessionId) {
        const restoredUser = findAccountRowById(snapshot.accountRows, storedSessionId);
        if (restoredUser) setUser(mapAccountRow(restoredUser));
      }
    };
    void loadData();
    const hasAdminSession = typeof window !== "undefined" && localStorage.getItem(ADMIN_SESSION_KEY) === "__admin__";
    if (hasAdminSession) {
      setUser(createAdminUser());
      setReady(true);
    }
    const channel = subscribeToAppTables(async () => {
      await loadData();
    });
    subscribeToUserSession(async (nextUser) => {
      if (cancelled) return;
      const adminSession = typeof window !== "undefined" && localStorage.getItem(ADMIN_SESSION_KEY) === "__admin__";
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
    };
  }, []);
  const signup = async (data) => {
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
  const loginWithPhone = async (phone, password) => {
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
  const loginAdmin = async (email, password) => {
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
  const addSubmission = async (s) => {
    if (!user || user.userType === "admin") {
      return { ok: false, error: "Only signed-in users can upload submissions" };
    }
    const result = await createSubmissionForUser(user.id, s);
    if (!result.ok) return result;
    setSubmissions((prev) => [result.submission, ...prev]);
    return { ok: true };
  };
  const updateSubmissionStatus = async (id, status) => {
    const updated = await updateSubmissionReviewStatus(id, status);
    if (updated) {
      setSubmissions(
        (prev) => prev.map((submission) => submission.id === id ? updated : submission)
      );
    }
  };
  const reviewSubmissionItemStatus = async (submissionId, itemIndex, status) => {
    const result = await reviewSubmissionItem(submissionId, itemIndex, status);
    if (!result.ok) return result;
    setSubmissions(
      (prev) => prev.map((submission) => submission.id === submissionId ? result.submission : submission)
    );
    return { ok: true };
  };
  const addRedeem = async (r) => {
    if (!user) return;
    const created = await createRedeemForUser(user.id, r);
    if (created) setRedeems((prev) => [created, ...prev]);
  };
  const markRedeemPaid = async (id) => {
    const updated = await markRedeemAsPaid(id);
    if (updated) {
      setRedeems((prev) => prev.map((redeem) => redeem.id === id ? updated : redeem));
    }
  };
  const getUserById = (id) => users.find((account) => account.id === id);
  const verifiedPointsFor = (userId) => submissions.filter((submission) => submission.userId === userId && submission.status === "verified").reduce((sum, submission) => sum + submission.points, 0);
  const availablePointsFor = (userId) => {
    const earned = verifiedPointsFor(userId);
    const spent = redeems.filter((redeem) => redeem.userId === userId).reduce((sum, redeem) => sum + redeem.points, 0);
    return earned - spent;
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Ctx.Provider,
    {
      value: {
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
        availablePointsFor
      },
      children
    }
  );
}
function useAuth() {
  const ctx = reactExports.useContext(Ctx);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
const Toaster = ({ ...props }) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Toaster$1,
    {
      className: "toaster group",
      toastOptions: {
        classNames: {
          toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"
        }
      },
      ...props
    }
  );
};
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline: "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline"
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
const Button = reactExports.forwardRef(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Comp, { className: cn(buttonVariants({ variant, size, className })), ref, ...props });
  }
);
Button.displayName = "Button";
function Navbar() {
  const { user, logout } = useAuth();
  const router2 = useRouter();
  const [scrolled, setScrolled] = reactExports.useState(false);
  reactExports.useEffect(() => {
    const on = () => setScrolled(window.scrollY > 8);
    on();
    window.addEventListener("scroll", on);
    return () => window.removeEventListener("scroll", on);
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "header",
    {
      className: `sticky top-0 z-50 w-full transition-all ${scrolled ? "bg-background/80 backdrop-blur-xl shadow-soft" : "bg-transparent"}`,
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("nav", { className: "mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/", className: "flex items-center gap-2 font-semibold tracking-tight", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-primary to-primary-glow text-primary-foreground shadow-glow", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Leaf, { className: "h-5 w-5" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-lg", children: [
            "Cattle",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary", children: "Scan" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hidden items-center gap-8 md:flex", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Link,
            {
              to: "/",
              className: "text-sm text-muted-foreground hover:text-foreground transition",
              activeProps: { className: "text-foreground font-medium" },
              children: "Home"
            }
          ),
          user?.userType !== "admin" && /* @__PURE__ */ jsxRuntimeExports.jsx(
            Link,
            {
              to: "/select-role",
              className: "text-sm text-muted-foreground hover:text-foreground transition",
              activeProps: { className: "text-foreground font-medium" },
              children: "Upload"
            }
          ),
          user?.userType !== "admin" && /* @__PURE__ */ jsxRuntimeExports.jsx(
            Link,
            {
              to: "/redeem",
              className: "text-sm text-muted-foreground hover:text-foreground transition",
              activeProps: { className: "text-foreground font-medium" },
              children: "Rewards"
            }
          ),
          user?.userType === "admin" && /* @__PURE__ */ jsxRuntimeExports.jsx(
            Link,
            {
              to: "/admin",
              className: "text-sm text-muted-foreground hover:text-foreground transition",
              activeProps: { className: "text-foreground font-medium" },
              children: "Admin Dashboard"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-2", children: user ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          user.userType !== "admin" && /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/redeem", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "ghost", size: "sm", className: "gap-2 rounded-full", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Wallet, { className: "h-4 w-4" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:inline", children: "Wallet" })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: user.userType === "admin" ? "/admin" : "/profile", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "ghost",
              size: "icon",
              className: "rounded-full border border-border bg-background/80",
              children: user.userType === "admin" ? /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "h-4 w-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "h-4 w-4" })
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "ghost",
              size: "sm",
              onClick: () => {
                logout();
                router2.navigate({ to: "/" });
              },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { className: "h-4 w-4" })
            }
          )
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/login", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "sm", children: "Login" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/signup", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              size: "sm",
              className: "bg-gradient-to-r from-primary to-primary-glow shadow-glow",
              children: "Sign Up"
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "/admin-login", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "sm", className: "hidden sm:inline-flex", children: "Admin" }) })
        ] }) })
      ] })
    }
  );
}
function Footer() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("footer", { className: "border-t bg-secondary/40 mt-24", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto grid max-w-7xl gap-8 px-6 py-12 md:grid-cols-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 font-semibold", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-primary to-primary-glow text-primary-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Leaf, { className: "h-4 w-4" }) }),
          "CattleScan"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-sm text-muted-foreground", children: "A working cattle data collection app for farmers, veterinarians, and admin reviewers." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-medium mb-3 text-sm", children: "Application" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "space-y-2 text-sm text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", children: "Home" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/select-role", children: "Upload" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/redeem", children: "Rewards" }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-medium mb-3 text-sm", children: "For Users" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "space-y-2 text-sm text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Farmers" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Veterinarians" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Field teams" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-medium mb-3 text-sm", children: "Access" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "space-y-2 text-sm text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "/login", children: "User Login" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "/admin-login", children: "Admin Login" }) })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-t py-6 text-center text-xs text-muted-foreground", children: [
      "© ",
      (/* @__PURE__ */ new Date()).getFullYear(),
      " Cattle Scan & Earn. All rights reserved."
    ] })
  ] });
}
function NotFoundComponent() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-7xl font-bold text-gradient", children: "404" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-4 text-xl font-semibold", children: "Page not found" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "The page you're looking for doesn't exist." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", className: "inline-flex items-center justify-center rounded-xl bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:opacity-90 transition", children: "Go home" }) })
  ] }) });
}
function ErrorComponent({ error, reset }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-semibold", children: "Something went wrong" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: error.message }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: reset, className: "mt-6 rounded-xl bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground", children: "Try again" })
  ] }) });
}
const Route$i = createRootRouteWithContext()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Cattle Scan & Earn — Veterinary Data Platform" },
      { name: "description", content: "Upload cattle disease and feed images to help build the world's largest veterinary dataset and earn rewards." },
      { property: "og:title", content: "Cattle Scan & Earn — Veterinary Data Platform" },
      { name: "twitter:title", content: "Cattle Scan & Earn — Veterinary Data Platform" },
      { property: "og:description", content: "Upload cattle disease and feed images to help build the world's largest veterinary dataset and earn rewards." },
      { name: "twitter:description", content: "Upload cattle disease and feed images to help build the world's largest veterinary dataset and earn rewards." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/ca90d58c-cf9d-4b1c-8567-88a0dc99bc3b/id-preview-59eedc02--e68e9076-0ec1-479d-879c-075a152d2a7a.lovable.app-1780148776453.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/ca90d58c-cf9d-4b1c-8567-88a0dc99bc3b/id-preview-59eedc02--e68e9076-0ec1-479d-879c-075a152d2a7a.lovable.app-1780148776453.png" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:type", content: "website" }
    ],
    links: [{ rel: "stylesheet", href: appCss }]
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent
});
function RootShell({ children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("html", { lang: "en", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("head", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(HeadContent, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("body", { children: [
      children,
      /* @__PURE__ */ jsxRuntimeExports.jsx(Scripts, {})
    ] })
  ] });
}
function RootComponent() {
  const { queryClient } = Route$i.useRouteContext();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(QueryClientProvider, { client: queryClient, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AuthProvider, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen flex flex-col", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Navbar, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "flex-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {}) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Footer, {})
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Toaster, { richColors: true, position: "top-right" })
  ] }) });
}
const $$splitComponentImporter$h = () => import("./success-cDpyVVaj.mjs");
const searchSchema = objectType({
  points: coerce.number().optional()
});
const Route$h = createFileRoute("/success")({
  head: () => ({
    meta: [{
      title: "Submission Received"
    }]
  }),
  validateSearch: searchSchema,
  component: lazyRouteComponent($$splitComponentImporter$h, "component")
});
const $$splitComponentImporter$g = () => import("./signup-CdSwAWsv.mjs");
const Route$g = createFileRoute("/signup")({
  head: () => ({
    meta: [{
      title: "Sign Up — Cattle Scan & Earn"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$g, "component")
});
const $$splitComponentImporter$f = () => import("./select-role-DB5Jaolh.mjs");
const Route$f = createFileRoute("/select-role")({
  component: lazyRouteComponent($$splitComponentImporter$f, "component")
});
const $$splitComponentImporter$e = () => import("./redeem-BNzX99Q1.mjs");
const Route$e = createFileRoute("/redeem")({
  head: () => ({
    meta: [{
      title: "Redeem Points — Cattle Scan & Earn"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$e, "component")
});
const $$splitComponentImporter$d = () => import("./profile-B92OZZoD.mjs");
const Route$d = createFileRoute("/profile")({
  head: () => ({
    meta: [{
      title: "My Profile — Cattle Scan & Earn"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$d, "component")
});
const $$splitComponentImporter$c = () => import("./login-CSZEAEl9.mjs");
const Route$c = createFileRoute("/login")({
  head: () => ({
    meta: [{
      title: "Login — Cattle Scan & Earn"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$c, "component")
});
const $$splitComponentImporter$b = () => import("./contact-CYN6sTuy.mjs");
const Route$b = createFileRoute("/contact")({
  head: () => ({
    meta: [{
      title: "Home — Cattle Scan & Earn"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$b, "component")
});
const $$splitComponentImporter$a = () => import("./admin-login-nWMJ13bH.mjs");
const Route$a = createFileRoute("/admin-login")({
  head: () => ({
    meta: [{
      title: "Admin Login — Cattle Scan"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$a, "component")
});
const $$splitComponentImporter$9 = () => import("./admin-CWUFmdad.mjs");
const Route$9 = createFileRoute("/admin")({
  head: () => ({
    meta: [{
      title: "Admin Dashboard"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$9, "component")
});
const $$splitComponentImporter$8 = () => import("./about-CBojQm9v.mjs");
const Route$8 = createFileRoute("/about")({
  head: () => ({
    meta: [{
      title: "Home — Cattle Scan & Earn"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
const $$splitComponentImporter$7 = () => import("./index-DR0GTq_m.mjs");
const Route$7 = createFileRoute("/")({
  head: () => ({
    meta: [{
      title: "Cattle Scan & Earn — Scan, Submit, Earn Rewards"
    }, {
      name: "description",
      content: "Help build the world's largest cattle disease dataset. Farmers and vets earn rewards for verified image submissions."
    }, {
      property: "og:title",
      content: "Cattle Scan & Earn"
    }, {
      property: "og:description",
      content: "Premium veterinary data collection platform with rewards."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
const $$splitComponentImporter$6 = () => import("./vet.index-C9qU9H0a.mjs");
const Route$6 = createFileRoute("/vet/")({
  head: () => ({
    meta: [{
      title: "Veterinarian Dashboard"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
const $$splitComponentImporter$5 = () => import("./farmer.index-fhhs1-66.mjs");
const Route$5 = createFileRoute("/farmer/")({
  head: () => ({
    meta: [{
      title: "Farmer Dashboard — Upload"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
const $$splitComponentImporter$4 = () => import("./vet.upload--_gf7evc.mjs");
const Route$4 = createFileRoute("/vet/upload")({
  head: () => ({
    meta: [{
      title: "Upload Images — Veterinarian"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
const $$splitComponentImporter$3 = () => import("./farmer.feed-qyVbE4b7.mjs");
const Route$3 = createFileRoute("/farmer/feed")({
  head: () => ({
    meta: [{
      title: "Feed Image Upload — Farmer"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
const $$splitComponentImporter$2 = () => import("./farmer.disease-Yvuwvfss.mjs");
const Route$2 = createFileRoute("/farmer/disease")({
  head: () => ({
    meta: [{
      title: "Disease Image Upload — Farmer"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
const $$splitComponentImporter$1 = () => import("./vet.diseases.index-CgIjRLAq.mjs");
const Route$1 = createFileRoute("/vet/diseases/")({
  head: () => ({
    meta: [{
      title: "Select Disease — Veterinarian"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
const DISEASES = [
  {
    slug: "lumpy-skin-disease",
    name: "Lumpy Skin Disease",
    short: "Viral disease causing skin nodules and fever in cattle.",
    emoji: "🐄",
    symptoms: ["Firm skin nodules (2–5 cm)", "High fever", "Reduced milk yield", "Swollen lymph nodes", "Loss of appetite"],
    causes: ["Lumpy Skin Disease Virus (LSDV)", "Biting insects (flies, mosquitoes)", "Contaminated equipment", "Direct contact"],
    prevention: ["Vaccination programs", "Vector control", "Quarantine new animals", "Disinfection of sheds"],
    treatment: ["Supportive care", "Antibiotics for secondary infection", "Anti-inflammatory drugs", "Wound care"]
  },
  {
    slug: "mastitis",
    name: "Mastitis",
    short: "Inflammation of the udder, common in dairy cattle.",
    emoji: "🥛",
    symptoms: ["Swollen, hot udder", "Abnormal milk (clots, blood)", "Reduced milk yield", "Fever"],
    causes: ["Bacterial infection", "Poor milking hygiene", "Udder injuries"],
    prevention: ["Clean milking practices", "Post-milking teat dip", "Dry cow therapy"],
    treatment: ["Intramammary antibiotics", "Anti-inflammatories", "Frequent milking-out"]
  },
  {
    slug: "foot-and-mouth-disease",
    name: "Foot and Mouth Disease",
    short: "Highly contagious viral disease.",
    emoji: "🦶",
    symptoms: ["Blisters on mouth and feet", "Lameness", "Drooling", "Reluctance to eat"],
    causes: ["FMD virus (Aphthovirus)", "Airborne spread", "Contaminated feed/water"],
    prevention: ["Regular vaccination", "Movement restrictions", "Biosecurity"],
    treatment: ["No specific cure", "Supportive care", "Wound antiseptics"]
  },
  {
    slug: "pregnancy-related",
    name: "Pregnancy Related Diseases",
    short: "Conditions affecting pregnant cattle.",
    emoji: "🤰",
    symptoms: ["Abortion", "Retained placenta", "Milk fever", "Ketosis"],
    causes: ["Brucellosis", "Calcium deficiency", "Metabolic imbalance"],
    prevention: ["Balanced nutrition", "Vaccination", "Regular vet checks"],
    treatment: ["Calcium therapy", "Hormonal support", "Antibiotics where indicated"]
  },
  {
    slug: "tick-infestation",
    name: "Tick Infestation",
    short: "Ectoparasitic infestation causing anemia and disease.",
    emoji: "🪲",
    symptoms: ["Visible ticks on body", "Anemia", "Weight loss", "Skin irritation"],
    causes: ["Heavy tick load", "Poor housing hygiene"],
    prevention: ["Acaricide spraying", "Pasture rotation", "Regular grooming"],
    treatment: ["Topical/injectable acaricides", "Tick-borne disease treatment"]
  },
  {
    slug: "skin-infection",
    name: "Skin Infection",
    short: "Bacterial or fungal infections of the skin.",
    emoji: "🧴",
    symptoms: ["Hair loss", "Itching", "Crusty lesions"],
    causes: ["Ringworm", "Bacterial dermatitis", "Poor hygiene"],
    prevention: ["Clean dry housing", "Isolate affected animals"],
    treatment: ["Antifungals", "Topical antiseptics", "Antibiotics"]
  },
  {
    slug: "eye-infection",
    name: "Eye Infection",
    short: "Pink eye and related ocular issues.",
    emoji: "👁️",
    symptoms: ["Watery eyes", "Redness", "Cloudy cornea", "Squinting"],
    causes: ["Moraxella bovis", "Dust and UV", "Flies"],
    prevention: ["Fly control", "Shaded areas"],
    treatment: ["Antibiotic eye ointment", "Eye patches"]
  },
  {
    slug: "digestive-disorders",
    name: "Digestive Disorders",
    short: "Bloat, acidosis, and indigestion.",
    emoji: "🌾",
    symptoms: ["Distended abdomen", "Diarrhea", "Off-feed"],
    causes: ["Sudden feed change", "Excess grain", "Spoiled feed"],
    prevention: ["Gradual diet change", "Quality forage"],
    treatment: ["Rumen stimulants", "Antacids", "Fluid therapy"]
  },
  {
    slug: "hoof-diseases",
    name: "Hoof Diseases",
    short: "Foot rot and laminitis affecting mobility.",
    emoji: "🐾",
    symptoms: ["Lameness", "Swollen hooves", "Foul odor"],
    causes: ["Wet, dirty floors", "Trauma", "Bacterial infection"],
    prevention: ["Dry clean floors", "Hoof trimming", "Footbaths"],
    treatment: ["Hoof cleaning", "Topical antibiotics", "Pain relief"]
  },
  {
    slug: "other-diseases",
    name: "Other Diseases",
    short: "Submit images for less common conditions.",
    emoji: "🩺",
    symptoms: ["Varied"],
    causes: ["Varied"],
    prevention: ["Routine vet care"],
    treatment: ["Vet diagnosis required"]
  }
];
const getDisease = (slug) => DISEASES.find((d) => d.slug === slug);
const $$splitComponentImporter = () => import("./vet.diseases._slug-Dj7GCEXl.mjs");
const Route = createFileRoute("/vet/diseases/$slug")({
  head: ({
    params
  }) => ({
    meta: [{
      title: `${getDisease(params.slug)?.name ?? "Disease"} — Upload`
    }]
  }),
  loader: ({
    params
  }) => {
    const d = getDisease(params.slug);
    if (!d) throw notFound();
    return d;
  },
  component: lazyRouteComponent($$splitComponentImporter, "component")
});
const SuccessRoute = Route$h.update({
  id: "/success",
  path: "/success",
  getParentRoute: () => Route$i
});
const SignupRoute = Route$g.update({
  id: "/signup",
  path: "/signup",
  getParentRoute: () => Route$i
});
const SelectRoleRoute = Route$f.update({
  id: "/select-role",
  path: "/select-role",
  getParentRoute: () => Route$i
});
const RedeemRoute = Route$e.update({
  id: "/redeem",
  path: "/redeem",
  getParentRoute: () => Route$i
});
const ProfileRoute = Route$d.update({
  id: "/profile",
  path: "/profile",
  getParentRoute: () => Route$i
});
const LoginRoute = Route$c.update({
  id: "/login",
  path: "/login",
  getParentRoute: () => Route$i
});
const ContactRoute = Route$b.update({
  id: "/contact",
  path: "/contact",
  getParentRoute: () => Route$i
});
const AdminLoginRoute = Route$a.update({
  id: "/admin-login",
  path: "/admin-login",
  getParentRoute: () => Route$i
});
const AdminRoute = Route$9.update({
  id: "/admin",
  path: "/admin",
  getParentRoute: () => Route$i
});
const AboutRoute = Route$8.update({
  id: "/about",
  path: "/about",
  getParentRoute: () => Route$i
});
const IndexRoute = Route$7.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$i
});
const VetIndexRoute = Route$6.update({
  id: "/vet/",
  path: "/vet/",
  getParentRoute: () => Route$i
});
const FarmerIndexRoute = Route$5.update({
  id: "/farmer/",
  path: "/farmer/",
  getParentRoute: () => Route$i
});
const VetUploadRoute = Route$4.update({
  id: "/vet/upload",
  path: "/vet/upload",
  getParentRoute: () => Route$i
});
const FarmerFeedRoute = Route$3.update({
  id: "/farmer/feed",
  path: "/farmer/feed",
  getParentRoute: () => Route$i
});
const FarmerDiseaseRoute = Route$2.update({
  id: "/farmer/disease",
  path: "/farmer/disease",
  getParentRoute: () => Route$i
});
const VetDiseasesIndexRoute = Route$1.update({
  id: "/vet/diseases/",
  path: "/vet/diseases/",
  getParentRoute: () => Route$i
});
const VetDiseasesSlugRoute = Route.update({
  id: "/vet/diseases/$slug",
  path: "/vet/diseases/$slug",
  getParentRoute: () => Route$i
});
const rootRouteChildren = {
  IndexRoute,
  AboutRoute,
  AdminRoute,
  AdminLoginRoute,
  ContactRoute,
  LoginRoute,
  ProfileRoute,
  RedeemRoute,
  SelectRoleRoute,
  SignupRoute,
  SuccessRoute,
  FarmerDiseaseRoute,
  FarmerFeedRoute,
  VetUploadRoute,
  FarmerIndexRoute,
  VetIndexRoute,
  VetDiseasesSlugRoute,
  VetDiseasesIndexRoute
};
const routeTree = Route$i._addFileChildren(rootRouteChildren)._addFileTypes();
const getRouter = () => {
  const queryClient = new QueryClient();
  const router2 = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0
  });
  return router2;
};
const router = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getRouter
}, Symbol.toStringTag, { value: "Module" }));
export {
  Button as B,
  DISEASES as D,
  MIN_REDEEM_POINTS as M,
  POINTS_PER_RUPEE as P,
  Route as R,
  cn as c,
  router as r,
  useAuth as u
};
