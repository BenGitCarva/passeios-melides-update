"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, CalendarDays, BookOpen,
  BarChart2, Settings, LogOut, ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/backoffice",           label: "Dashboard",    icon: LayoutDashboard, exact: true },
  { href: "/backoffice/reservas",  label: "Reservas",     icon: BookOpen },
  { href: "/backoffice/calendario",label: "Calendário",   icon: CalendarDays },
  { href: "/backoffice/analiticas",label: "Analíticas",   icon: BarChart2 },
];

export default function Sidebar() {
  const pathname = usePathname();

  const isActive = (href: string, exact?: boolean) =>
    exact ? pathname === href : pathname.startsWith(href);

  return (
    <aside className="hidden md:flex flex-col w-60 bg-espresso border-r border-cream/10 min-h-screen sticky top-0">
      {/* Logo */}
      <div className="px-5 pt-6 pb-5 border-b border-cream/10">
        <p className="font-serif text-cream font-semibold text-lg leading-tight">Passeios Melides</p>
        <p className="text-terra text-[10px] tracking-[0.15em] uppercase mt-0.5">Backoffice · Gestão</p>
      </div>

      {/* Nav */}
      <nav aria-label="Navegação do backoffice" className="flex-1 px-3 py-4 space-y-1">
        {navItems.map((item) => {
          const active = isActive(item.href, item.exact);
          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={active ? "page" : undefined}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all group",
                active
                  ? "bg-terra text-cream"
                  : "text-cream/60 hover:text-cream hover:bg-cream/5"
              )}
            >
              <item.icon size={17} className={cn(active ? "text-cream" : "text-cream/50 group-hover:text-cream")} aria-hidden="true" />
              {item.label}
              {active && <ChevronRight size={13} className="ml-auto" aria-hidden="true" />}
            </Link>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className="px-3 py-4 border-t border-cream/10 space-y-1">
        <Link href="/backoffice/definicoes"
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-cream/60 hover:text-cream hover:bg-cream/5 transition-all">
          <Settings size={17} aria-hidden="true" /> Definições
        </Link>
        <Link href="/"
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-cream/60 hover:text-cream hover:bg-cream/5 transition-all">
          <LogOut size={17} aria-hidden="true" /> Ver site público
        </Link>
      </div>
    </aside>
  );
}
