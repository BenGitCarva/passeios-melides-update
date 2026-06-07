"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bell, Menu, X, LayoutDashboard, BookOpen, CalendarDays, BarChart2 } from "lucide-react";
import { cn } from "@/lib/utils";

const pageTitle: Record<string, string> = {
  "/backoffice":            "Dashboard",
  "/backoffice/reservas":   "Reservas",
  "/backoffice/calendario": "Calendário",
  "/backoffice/analiticas": "Analíticas",
  "/backoffice/definicoes": "Definições",
};

const roles = ["Dono / Admin", "Gestor / Receção"] as const;

const mobileNav = [
  { href: "/backoffice",            label: "Dashboard",  icon: LayoutDashboard },
  { href: "/backoffice/reservas",   label: "Reservas",   icon: BookOpen },
  { href: "/backoffice/calendario", label: "Calendário", icon: CalendarDays },
  { href: "/backoffice/analiticas", label: "Analíticas", icon: BarChart2 },
];

export default function BackofficeHeader() {
  const pathname = usePathname();
  const [role, setRole] = useState<typeof roles[number]>("Dono / Admin");
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-30 bg-cream border-b border-border flex items-center justify-between h-14 px-4 md:px-6">
        {/* Mobile burger */}
        <button
          className="md:hidden p-1.5 rounded-lg hover:bg-muted transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-expanded={mobileOpen}
          aria-controls="mobile-backoffice-nav"
          aria-label={mobileOpen ? "Fechar menu" : "Abrir menu"}
        >
          {mobileOpen ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
        </button>

        <h1 className="font-serif text-espresso font-medium text-lg md:ml-0 ml-2">
          {pageTitle[pathname] || "Backoffice"}
        </h1>

        <div className="flex items-center gap-3">
          {/* Role selector */}
          <div className="hidden sm:flex items-center gap-2">
            <span className="text-xs text-muted-foreground">Papel:</span>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value as typeof roles[number])}
              aria-label="Selecionar papel de utilizador"
              className="text-xs font-medium border border-border rounded-lg px-2 py-1.5 bg-card text-espresso focus:outline-none focus:border-terra cursor-pointer"
            >
              {roles.map((r) => <option key={r}>{r}</option>)}
            </select>
          </div>

          {/* Notifications */}
          <button
            aria-label="Notificações (3 não lidas)"
            className="relative p-1.5 rounded-lg hover:bg-muted transition-colors"
          >
            <Bell size={18} className="text-espresso/70" aria-hidden="true" />
            <span className="absolute top-0.5 right-0.5 w-2 h-2 bg-terra rounded-full" aria-hidden="true" />
          </button>

          {/* Avatar */}
          <div
            aria-label="Luís Lamas — Dono"
            role="img"
            className="w-8 h-8 rounded-full bg-terra flex items-center justify-center text-cream text-xs font-semibold"
          >
            LL
          </div>
        </div>
      </header>

      {/* Mobile nav drawer */}
      {mobileOpen && (
        <nav
          id="mobile-backoffice-nav"
          aria-label="Navegação do backoffice (mobile)"
          className="md:hidden fixed inset-0 top-14 z-20 bg-espresso flex flex-col px-4 py-4"
        >
          {mobileNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              aria-current={pathname === item.href ? "page" : undefined}
              className={cn(
                "flex items-center gap-3 px-4 py-4 rounded-xl text-base font-medium mb-1 transition-colors",
                pathname === item.href
                  ? "bg-terra text-cream"
                  : "text-cream/70 hover:text-cream hover:bg-cream/10"
              )}
            >
              <item.icon size={20} aria-hidden="true" />
              {item.label}
            </Link>
          ))}
        </nav>
      )}
    </>
  );
}
