import { supabase } from "@/integrations/supabase/client";

export type UserType = "farmer" | "veterinarian" | "admin";
export type SubmissionItemStatus = "pending" | "accepted" | "rejected";
export const POINTS_PER_IMAGE = 20;
export const SUBMISSION_IMAGES_BUCKET = "submission-images";

export interface AppUser {
  id: string;
  fullName: string;
  phone: string;
  email?: string;
  userType: UserType;
  location: string;
  joinDate: string;
}

export type SubmissionStatus = "pending" | "accepted" | "verified" | "rejected";

export interface SubmissionItem {
  imageUrl: string;
  label: string;
  status: SubmissionItemStatus;
  reviewedAt?: string;
}

export interface SubmissionUploadItem {
  file: File;
  label: string;
}

export interface SubmissionDraft {
  category: "feed" | "disease-farmer" | "disease-vet";
  diseaseName?: string;
  items: SubmissionUploadItem[];
}

export interface Submission {
  id: string;
  userId: string;
  category: "feed" | "disease-farmer" | "disease-vet";
  diseaseName?: string;
  items: SubmissionItem[];
  points: number;
  status: SubmissionStatus;
  date: string;
}

export type RedeemStatus = "pending" | "paid";

export interface RedeemRequest {
  id: string;
  userId: string;
  points: number;
  amount: number;
  upiId: string;
  status: RedeemStatus;
  date: string;
  paidDate?: string;
}

export interface SignupInput {
  fullName: string;
  phone: string;
  password: string;
  userType: "farmer" | "veterinarian";
  location: string;
}

export const POINTS_PER_RUPEE = 10;
export const MIN_REDEEM_POINTS = 100;

export const ADMIN_EMAIL = import.meta.env.VITE_ADMIN_EMAIL || "admin@cattlescan.app";
export const ADMIN_PASS = import.meta.env.VITE_ADMIN_PASSWORD || "adminadmin";

type AccountRow = {
  id: string;
  full_name: string;
  phone: string;
  password: string;
  user_type: "farmer" | "veterinarian";
  location: string;
  join_date: string;
};

type SubmissionRow = {
  id: string;
  user_id: string;
  category: string;
  disease_name: string | null;
  items: SubmissionItem[];
  points: number;
  status: SubmissionStatus;
  date: string;
};

type RedeemRow = {
  id: string;
  user_id: string;
  points: number;
  amount: number;
  upi_id: string;
  status: RedeemStatus;
  date: string;
  paid_date: string | null;
};

export type AppSnapshot = {
  accountRows: AccountRow[];
  users: AppUser[];
  submissions: Submission[];
  redeems: RedeemRequest[];
};

const mapAccount = (row: AccountRow): AppUser => ({
  id: row.id,
  fullName: row.full_name,
  phone: row.phone,
  userType: row.user_type,
  location: row.location,
  joinDate: row.join_date,
});

function normalizeSubmissionItems(items: unknown): SubmissionItem[] {
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
        reviewedAt: typeof item.reviewedAt === "string" ? item.reviewedAt : undefined,
      },
    ];
  });
}

const mapSubmission = (row: SubmissionRow): Submission => ({
  id: row.id,
  userId: row.user_id,
  category: row.category as Submission["category"],
  diseaseName: row.disease_name ?? undefined,
  items: normalizeSubmissionItems(row.items),
  points: row.points,
  status: row.status,
  date: row.date,
});

const mapRedeem = (row: RedeemRow): RedeemRequest => ({
  id: row.id,
  userId: row.user_id,
  points: row.points,
  amount: Number(row.amount),
  upiId: row.upi_id,
  status: row.status,
  date: row.date,
  paidDate: row.paid_date ?? undefined,
});

export function createAdminUser(email = ADMIN_EMAIL): AppUser {
  return {
    id: "__admin__",
    fullName: "Administrator",
    phone: "-",
    email,
    userType: "admin",
    location: "HQ",
    joinDate: new Date().toISOString(),
  };
}

function deriveSubmissionStatus(items: SubmissionItem[]): SubmissionStatus {
  if (items.some((item) => item.status === "pending")) return "pending";
  if (items.some((item) => item.status === "accepted")) return "verified";
  return "rejected";
}

function deriveSubmissionPoints(items: SubmissionItem[]) {
  return items.filter((item) => item.status === "accepted").length * POINTS_PER_IMAGE;
}

function safeFileName(fileName: string) {
  return fileName.replace(/[^a-zA-Z0-9._-]/g, "-");
}

async function uploadSubmissionItem(userId: string, file: File) {
  const filePath = `${userId}/${Date.now()}-${crypto.randomUUID()}-${safeFileName(file.name)}`;

  const { error } = await supabase.storage
    .from(SUBMISSION_IMAGES_BUCKET)
    .upload(filePath, file, { upsert: false });

  if (error) {
    throw new Error(
      error.message.includes("Bucket not found")
        ? `Storage bucket "${SUBMISSION_IMAGES_BUCKET}" was not found in Supabase.`
        : error.message,
    );
  }

  const { data } = supabase.storage.from(SUBMISSION_IMAGES_BUCKET).getPublicUrl(filePath);
  return data.publicUrl;
}

export async function loadAppSnapshot(): Promise<AppSnapshot> {
  const [{ data: accounts }, { data: submissions }, { data: redeems }] = await Promise.all([
    supabase.from("accounts").select("*").order("join_date", { ascending: false }),
    supabase.from("submissions").select("*").order("date", { ascending: false }),
    supabase.from("redeems").select("*").order("date", { ascending: false }),
  ]);

  const accountRows = (accounts ?? []) as AccountRow[];

  return {
    accountRows,
    users: accountRows.map(mapAccount),
    submissions: ((submissions ?? []) as SubmissionRow[]).map(mapSubmission),
    redeems: ((redeems ?? []) as RedeemRow[]).map(mapRedeem),
  };
}

export function subscribeToAppTables(onChange: () => Promise<void> | void) {
  return supabase
    .channel("cse-all")
    .on("postgres_changes", { event: "*", schema: "public", table: "accounts" }, onChange)
    .on("postgres_changes", { event: "*", schema: "public", table: "submissions" }, onChange)
    .on("postgres_changes", { event: "*", schema: "public", table: "redeems" }, onChange)
    .subscribe();
}

export function subscribeToUserSession(onChange: (user: AppUser | null) => void) {
  onChange(null);
  return () => {};
}

export async function logoutFirebaseSession() {
  return;
}

export async function signupAccount(data: SignupInput) {
  if (!data.fullName.trim()) return { ok: false as const, error: "Full name is required" };
  if (!/^\d{10}$/.test(data.phone)) {
    return { ok: false as const, error: "Enter a valid 10-digit phone number" };
  }
  if (data.password.length < 6) {
    return { ok: false as const, error: "Password must be at least 6 characters" };
  }
  if (!data.location.trim()) return { ok: false as const, error: "Location is required" };

  const { data: existing } = await supabase
    .from("accounts")
    .select("id")
    .eq("phone", data.phone)
    .maybeSingle();

  if (existing) {
    return {
      ok: false as const,
      error: "An account with this phone number already exists. Please login.",
    };
  }

  const { data: inserted, error } = await supabase
    .from("accounts")
    .insert({
      full_name: data.fullName.trim(),
      phone: data.phone,
      password: data.password,
      user_type: data.userType,
      location: data.location.trim(),
    })
    .select("*")
    .single();

  if (error || !inserted) {
    return { ok: false as const, error: error?.message ?? "Could not create account" };
  }

  const row = inserted as AccountRow;
  return { ok: true as const, row, user: mapAccount(row) };
}

export async function loginUserWithPhone(phone: string, password: string) {
  const { data, error } = await supabase
    .from("accounts")
    .select("*")
    .eq("phone", phone)
    .maybeSingle();

  if (error) return { ok: false as const, error: error.message };
  if (!data) return { ok: false as const, error: "No account found with this phone number" };

  const row = data as AccountRow;
  if (row.password !== password) return { ok: false as const, error: "Incorrect password" };

  return { ok: true as const, row, user: mapAccount(row) };
}

export async function loginAdminWithCredentials(email: string, password: string) {
  if (email.trim().toLowerCase() !== ADMIN_EMAIL.toLowerCase() || password !== ADMIN_PASS) {
    return { ok: false as const, error: "Invalid admin credentials" };
  }

  return { ok: true as const, user: createAdminUser(email.trim()) };
}

export async function createSubmissionForUser(userId: string, submission: SubmissionDraft) {
  try {
    const uploadedItems = await Promise.all(
      submission.items.map(async (item) => ({
        imageUrl: await uploadSubmissionItem(userId, item.file),
        label: item.label.trim(),
        status: "pending" as const,
      })),
    );

    const { data, error } = await supabase
      .from("submissions")
      .insert({
        user_id: userId,
        category: submission.category,
        disease_name: submission.diseaseName ?? null,
        items: uploadedItems,
        points: submission.items.length * POINTS_PER_IMAGE,
        status: "pending",
      })
      .select("*")
      .single();

    if (error || !data) {
      return { ok: false as const, error: error?.message ?? "Could not save submission" };
    }

    return { ok: true as const, submission: mapSubmission(data as SubmissionRow) };
  } catch (error) {
    return {
      ok: false as const,
      error: error instanceof Error ? error.message : "Could not upload images",
    };
  }
}

export async function updateSubmissionReviewStatus(id: string, status: SubmissionStatus) {
  const { data, error } = await supabase
    .from("submissions")
    .update({ status })
    .eq("id", id)
    .select("*")
    .single();

  if (error || !data) return null;
  return mapSubmission(data as SubmissionRow);
}

export async function reviewSubmissionItem(
  submissionId: string,
  itemIndex: number,
  status: SubmissionItemStatus,
) {
  const { data, error } = await supabase
    .from("submissions")
    .select("*")
    .eq("id", submissionId)
    .single();

  if (error || !data) {
    return { ok: false as const, error: error?.message ?? "Submission not found" };
  }

  const row = data as SubmissionRow;
  const items = normalizeSubmissionItems(row.items).map((item, index) =>
    index === itemIndex ? { ...item, status, reviewedAt: new Date().toISOString() } : item,
  );

  const nextStatus = deriveSubmissionStatus(items);
  const nextPoints = deriveSubmissionPoints(items);

  const { data: updated, error: updateError } = await supabase
    .from("submissions")
    .update({ items, status: nextStatus, points: nextPoints })
    .eq("id", submissionId)
    .select("*")
    .single();

  if (updateError || !updated) {
    return {
      ok: false as const,
      error: updateError?.message ?? "Could not update item review",
    };
  }

  return { ok: true as const, submission: mapSubmission(updated as SubmissionRow) };
}

export async function createRedeemForUser(
  userId: string,
  redeem: Omit<RedeemRequest, "id" | "userId" | "date" | "status">,
) {
  const { data, error } = await supabase
    .from("redeems")
    .insert({
      user_id: userId,
      points: redeem.points,
      amount: redeem.amount,
      upi_id: redeem.upiId,
      status: "pending",
    })
    .select("*")
    .single();

  if (error || !data) return null;
  return mapRedeem(data as RedeemRow);
}

export async function markRedeemAsPaid(id: string) {
  const { data, error } = await supabase
    .from("redeems")
    .update({ status: "paid", paid_date: new Date().toISOString() })
    .eq("id", id)
    .select("*")
    .single();

  if (error || !data) return null;
  return mapRedeem(data as RedeemRow);
}

export function findAccountRowById(accountRows: AccountRow[], id: string) {
  return accountRows.find((account) => account.id === id);
}

export function mapAccountRow(accountRow: AccountRow) {
  return mapAccount(accountRow);
}

export async function resolveSessionUser() {
  return null;
}
