import { Link, useRouter } from "@tanstack/react-router";
import { useAuth } from "@/lib/auth-context";
import { Button } from "@/components/ui/button";
import { Leaf, LogOut, ShieldCheck, Upload, User as UserIcon, Wallet } from "lucide-react";
import { useEffect, useState } from "react";

export function Navbar() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 8);
    on();
    window.addEventListener("scroll", on);
    return () => window.removeEventListener("scroll", on);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all ${
        scrolled ? "bg-background/80 backdrop-blur-xl shadow-soft" : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link to="/" className="flex items-center gap-2 font-semibold tracking-tight">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-primary to-primary-glow text-primary-foreground shadow-glow">
            <Leaf className="h-5 w-5" />
          </span>
          <span className="text-lg">
            Cattle<span className="text-primary">Scan</span>
          </span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          <Link
            to="/"
            className="text-sm text-muted-foreground hover:text-foreground transition"
            activeProps={{ className: "text-foreground font-medium" }}
          >
            Home
          </Link>
          {user?.userType !== "admin" && (
            <Link
              to="/select-role"
              className="text-sm text-muted-foreground hover:text-foreground transition"
              activeProps={{ className: "text-foreground font-medium" }}
            >
              Upload
            </Link>
          )}
          {user?.userType !== "admin" && (
            <Link
              to="/redeem"
              className="text-sm text-muted-foreground hover:text-foreground transition"
              activeProps={{ className: "text-foreground font-medium" }}
            >
              Rewards
            </Link>
          )}
          {user?.userType === "admin" && (
            <Link
              to="/admin"
              className="text-sm text-muted-foreground hover:text-foreground transition"
              activeProps={{ className: "text-foreground font-medium" }}
            >
              Admin Dashboard
            </Link>
          )}
        </div>

        <div className="flex items-center gap-2">
          {user ? (
            <>
              {user.userType !== "admin" && (
                <Link to="/redeem">
                  <Button variant="ghost" size="sm" className="gap-2 rounded-full">
                    <Wallet className="h-4 w-4" />
                    <span className="hidden sm:inline">Wallet</span>
                  </Button>
                </Link>
              )}
              <Link to={user.userType === "admin" ? "/admin" : "/profile"}>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full border border-border bg-background/80"
                >
                  {user.userType === "admin" ? (
                    <ShieldCheck className="h-4 w-4" />
                  ) : (
                    <UserIcon className="h-4 w-4" />
                  )}
                </Button>
              </Link>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  logout();
                  router.navigate({ to: "/" });
                }}
              >
                <LogOut className="h-4 w-4" />
              </Button>
            </>
          ) : (
            <>
              <Link to="/login">
                <Button variant="ghost" size="sm">
                  Login
                </Button>
              </Link>
              <Link to="/signup">
                <Button
                  size="sm"
                  className="bg-gradient-to-r from-primary to-primary-glow shadow-glow"
                >
                  Sign Up
                </Button>
              </Link>
              <a href="/admin-login">
                <Button variant="ghost" size="sm" className="hidden sm:inline-flex">
                  Admin
                </Button>
              </a>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="border-t bg-secondary/40 mt-24">
      <div className="mx-auto grid max-w-7xl gap-8 px-6 py-12 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2 font-semibold">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-primary to-primary-glow text-primary-foreground">
              <Leaf className="h-4 w-4" />
            </span>
            CattleScan
          </div>
          <p className="mt-3 text-sm text-muted-foreground">
            A working cattle data collection app for farmers, veterinarians, and admin reviewers.
          </p>
        </div>
        <div>
          <h4 className="font-medium mb-3 text-sm">Application</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/select-role">Upload</Link>
            </li>
            <li>
              <Link to="/redeem">Rewards</Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="font-medium mb-3 text-sm">For Users</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>Farmers</li>
            <li>Veterinarians</li>
            <li>Field teams</li>
          </ul>
        </div>
        <div>
          <h4 className="font-medium mb-3 text-sm">Access</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>
              <a href="/login">User Login</a>
            </li>
            <li>
              <a href="/admin-login">Admin Login</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t py-6 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Cattle Scan & Earn. All rights reserved.
      </div>
    </footer>
  );
}
