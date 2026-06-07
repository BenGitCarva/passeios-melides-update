"use client";

import { useState } from "react";
import { format } from "date-fns";
import { pt } from "date-fns/locale";
import { Search, Filter, Eye, Check, X, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { reservations, type ReservationStatus } from "@/data/reservations";

const statusConfig: Record<ReservationStatus, { label: string; cls: string }> = {
  confirmada: { label: "Confirmada", cls: "bg-success/15 text-success" },
  pendente:   { label: "Pendente",   cls: "bg-warning/15 text-warning" },
  cancelada:  { label: "Cancelada",  cls: "bg-danger/15 text-danger" },
  concluida:  { label: "Concluída",  cls: "bg-muted text-muted-foreground" },
};

const allStatuses: ReservationStatus[] = ["confirmada", "pendente", "cancelada", "concluida"];

export default function ReservasPage() {
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState<ReservationStatus | "todas">("todas");
  const [selected, setSelected] = useState<string | null>(null);

  const filtered = reservations
    .filter((r) => filterStatus === "todas" || r.status === filterStatus)
    .filter((r) =>
      !search ||
      r.guest.name.toLowerCase().includes(search.toLowerCase()) ||
      r.serviceName.toLowerCase().includes(search.toLowerCase()) ||
      r.id.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => b.date.getTime() - a.date.getTime());

  const detail = selected ? reservations.find((r) => r.id === selected) : null;

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="bg-card rounded-2xl border border-border p-4 flex flex-col sm:flex-row gap-3">
        {/* Search */}
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
          <label htmlFor="search-reservas" className="sr-only">Pesquisar reservas</label>
          <input
            id="search-reservas"
            type="search"
            placeholder="Pesquisar por nome, serviço ou ID…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-border bg-background text-sm text-espresso placeholder:text-muted-foreground focus:outline-none focus:border-terra transition-colors"
          />
        </div>

        {/* Status filter */}
        <div className="flex items-center gap-2 flex-wrap">
          <Filter size={14} className="text-muted-foreground hidden sm:block" aria-hidden="true" />
          <div role="group" aria-label="Filtrar por estado">
            {(["todas", ...allStatuses] as const).map((s) => (
              <button
                key={s}
                onClick={() => setFilterStatus(s)}
                aria-pressed={filterStatus === s}
                className={cn(
                  "px-3 py-1.5 rounded-lg text-xs font-medium mr-1.5 mb-1.5 transition-colors",
                  filterStatus === s
                    ? "bg-espresso text-cream"
                    : "bg-muted text-muted-foreground hover:bg-muted/70"
                )}
              >
                {s === "todas" ? "Todas" : statusConfig[s].label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <p className="text-xs text-muted-foreground px-1" aria-live="polite">
        {filtered.length} reserva{filtered.length !== 1 ? "s" : ""} encontrada{filtered.length !== 1 ? "s" : ""}
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        {/* Table */}
        <div className="lg:col-span-3 bg-card rounded-2xl border border-border overflow-hidden shadow-card">
          <div className="overflow-x-auto">
            <table className="w-full text-sm" aria-label="Lista de reservas">
              <thead>
                <tr className="border-b border-border bg-muted/30">
                  <th scope="col" className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">ID</th>
                  <th scope="col" className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">Hóspede</th>
                  <th scope="col" className="text-left px-4 py-3 text-xs font-medium text-muted-foreground hidden md:table-cell">Serviço</th>
                  <th scope="col" className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">Data</th>
                  <th scope="col" className="text-left px-4 py-3 text-xs font-medium text-muted-foreground hidden sm:table-cell">Valor</th>
                  <th scope="col" className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">Estado</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((r) => (
                  <tr
                    key={r.id}
                    onClick={() => setSelected(r.id === selected ? null : r.id)}
                    className={cn(
                      "border-b border-border cursor-pointer transition-colors hover:bg-muted/30",
                      selected === r.id && "bg-terra/5"
                    )}
                    aria-selected={selected === r.id}
                    tabIndex={0}
                    onKeyDown={(e) => e.key === "Enter" && setSelected(r.id === selected ? null : r.id)}
                    aria-label={`Reserva ${r.id} de ${r.guest.name}, ${r.serviceName}, ${format(r.date, "d MMM", { locale: pt })}`}
                  >
                    <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{r.id}</td>
                    <td className="px-4 py-3">
                      <div className="font-medium text-espresso">{r.guest.name}</div>
                      <div className="text-xs text-muted-foreground">{r.guest.flag} {r.guest.country}</div>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground hidden md:table-cell text-xs">{r.serviceName}</td>
                    <td className="px-4 py-3 text-xs">
                      <div className="text-espresso">{format(r.date, "d MMM", { locale: pt })}</div>
                      <div className="text-muted-foreground">{r.hour}</div>
                    </td>
                    <td className="px-4 py-3 font-medium text-espresso hidden sm:table-cell">€{r.price}</td>
                    <td className="px-4 py-3">
                      <span className={cn("text-xs font-medium px-2 py-0.5 rounded-full", statusConfig[r.status].cls)}>
                        {statusConfig[r.status].label}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filtered.length === 0 && (
              <p className="text-center text-muted-foreground text-sm py-10">Sem resultados para os filtros selecionados.</p>
            )}
          </div>
        </div>

        {/* Detail panel */}
        <div className="lg:col-span-2">
          {detail ? (
            <div className="bg-card rounded-2xl border border-border p-5 shadow-card sticky top-20" aria-label={`Detalhes da reserva ${detail.id}`}>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="font-mono text-xs text-muted-foreground">{detail.id}</p>
                  <h3 className="font-serif text-espresso text-lg font-medium mt-0.5">{detail.guest.name}</h3>
                </div>
                <span className={cn("text-xs font-medium px-2.5 py-1 rounded-full", statusConfig[detail.status].cls)}>
                  {statusConfig[detail.status].label}
                </span>
              </div>

              <dl className="space-y-3 mb-5">
                {[
                  { dt: "Serviço", dd: detail.serviceName },
                  { dt: "Data & Hora", dd: `${format(detail.date, "d MMMM yyyy", { locale: pt })} · ${detail.hour}` },
                  { dt: "Participantes", dd: `${detail.participants} pessoa${detail.participants > 1 ? "s" : ""}` },
                  { dt: "Canal", dd: detail.channel },
                  { dt: "Email", dd: detail.guest.email },
                  { dt: "Telefone", dd: detail.guest.phone },
                  { dt: "País", dd: `${detail.guest.flag} ${detail.guest.country}` },
                ].map(({ dt, dd }) => (
                  <div key={dt} className="flex justify-between gap-3 text-sm">
                    <dt className="text-muted-foreground">{dt}</dt>
                    <dd className="text-espresso font-medium text-right">{dd}</dd>
                  </div>
                ))}
              </dl>

              {detail.notes && (
                <div className="bg-muted/50 rounded-xl p-3 mb-5">
                  <p className="text-xs font-medium text-espresso mb-1">Notas</p>
                  <p className="text-xs text-muted-foreground">{detail.notes}</p>
                </div>
              )}

              <div className="border-t border-border pt-4 flex justify-between items-center mb-4">
                <span className="text-muted-foreground text-sm">Total</span>
                <span className="font-serif text-2xl text-terra font-semibold">€{detail.price}</span>
              </div>

              {detail.status === "pendente" && (
                <div className="flex gap-2">
                  <button className="flex-1 flex items-center justify-center gap-1.5 bg-success/15 text-success font-medium text-sm py-2.5 rounded-xl hover:bg-success/25 transition-colors">
                    <Check size={14} aria-hidden="true" /> Confirmar
                  </button>
                  <button className="flex-1 flex items-center justify-center gap-1.5 bg-danger/15 text-danger font-medium text-sm py-2.5 rounded-xl hover:bg-danger/25 transition-colors">
                    <X size={14} aria-hidden="true" /> Cancelar
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="bg-card rounded-2xl border border-border p-6 text-center text-muted-foreground">
              <Eye size={28} className="mx-auto mb-2 text-muted" aria-hidden="true" />
              <p className="text-sm">Clique numa reserva para ver os detalhes.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
