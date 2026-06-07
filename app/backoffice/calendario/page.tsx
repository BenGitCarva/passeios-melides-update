"use client";

import { useState } from "react";
import { addDays, format, startOfWeek, isSameDay } from "date-fns";
import { pt } from "date-fns/locale";
import { ChevronLeft, ChevronRight, Users } from "lucide-react";
import { cn } from "@/lib/utils";
import { reservations } from "@/data/reservations";

const HOURS = ["08:00","09:00","10:00","11:00","12:00","13:00","14:00","15:00","16:00","17:00","18:00"];

const statusColors: Record<string, string> = {
  confirmada: "bg-terra/20 border-terra text-espresso",
  pendente:   "bg-warning/15 border-warning text-warning",
  cancelada:  "bg-danger/10 border-danger/40 text-danger line-through opacity-60",
  concluida:  "bg-muted border-border text-muted-foreground",
};

export default function CalendarioPage() {
  const [weekStart, setWeekStart] = useState(startOfWeek(new Date(), { weekStartsOn: 1 }));

  const days = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));
  const today = new Date();

  const prevWeek = () => setWeekStart(d => addDays(d, -7));
  const nextWeek = () => setWeekStart(d => addDays(d, 7));

  const getEvents = (day: Date, hour: string) =>
    reservations.filter(
      (r) => isSameDay(r.date, day) && r.hour === hour && r.status !== "cancelada"
    );

  return (
    <div className="space-y-4">
      {/* Nav */}
      <div className="flex items-center justify-between bg-card rounded-2xl border border-border px-4 py-3">
        <button
          onClick={prevWeek}
          className="p-1.5 rounded-lg hover:bg-muted transition-colors"
          aria-label="Semana anterior"
        >
          <ChevronLeft size={18} aria-hidden="true" />
        </button>
        <h2 className="font-medium text-espresso text-sm">
          {format(weekStart, "d")} – {format(addDays(weekStart, 6), "d MMMM yyyy", { locale: pt })}
        </h2>
        <button
          onClick={nextWeek}
          className="p-1.5 rounded-lg hover:bg-muted transition-colors"
          aria-label="Próxima semana"
        >
          <ChevronRight size={18} aria-hidden="true" />
        </button>
      </div>

      {/* Legend */}
      <div className="flex gap-3 flex-wrap" role="list" aria-label="Legenda">
        {[
          { label: "Confirmada", cls: "bg-terra/20 border-terra" },
          { label: "Pendente",   cls: "bg-warning/15 border-warning" },
          { label: "Concluída",  cls: "bg-muted border-border" },
        ].map((l) => (
          <div key={l.label} role="listitem" className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <span className={cn("w-3 h-3 rounded border", l.cls)} aria-hidden="true" />
            {l.label}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="bg-card rounded-2xl border border-border overflow-auto shadow-card">
        <table className="w-full text-xs min-w-[640px]" role="grid" aria-label="Calendário semanal de sessões">
          <thead>
            <tr>
              <th scope="col" className="w-16 border-b border-r border-border px-2 py-3 text-muted-foreground font-medium text-left">
                Hora
              </th>
              {days.map((day) => {
                const isToday = isSameDay(day, today);
                return (
                  <th
                    key={day.toISOString()}
                    scope="col"
                    className={cn(
                      "border-b border-r border-border px-2 py-3 text-center font-medium last:border-r-0",
                      isToday ? "bg-terra/5 text-terra" : "text-espresso"
                    )}
                    aria-current={isToday ? "date" : undefined}
                  >
                    <div className="uppercase text-[10px] tracking-wide">{format(day, "EEE", { locale: pt })}</div>
                    <div className={cn("text-lg font-serif mt-0.5", isToday && "text-terra font-semibold")}>
                      {format(day, "d")}
                    </div>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {HOURS.map((hour) => (
              <tr key={hour} className="border-b border-border last:border-b-0">
                <th scope="row" className="border-r border-border px-2 py-2 text-muted-foreground font-normal text-left align-top">
                  {hour}
                </th>
                {days.map((day) => {
                  const events = getEvents(day, hour);
                  return (
                    <td
                      key={day.toISOString() + hour}
                      className={cn(
                        "border-r border-border px-1 py-1 align-top last:border-r-0 min-h-[52px]",
                        isSameDay(day, today) && "bg-terra/[0.03]"
                      )}
                    >
                      {events.map((ev) => (
                        <div
                          key={ev.id}
                          className={cn(
                            "border-l-2 rounded px-1.5 py-1 mb-0.5 text-[10px] leading-tight cursor-default",
                            statusColors[ev.status]
                          )}
                          title={`${ev.serviceName} — ${ev.guest.name} (${ev.participants}p) — €${ev.price}`}
                        >
                          <div className="font-medium truncate">{ev.serviceName.split(" ").slice(0, 2).join(" ")}</div>
                          <div className="flex items-center gap-0.5 mt-0.5 opacity-80">
                            <Users size={9} aria-hidden="true" />
                            <span>{ev.participants}</span>
                            <span className="ml-1">{ev.guest.flag}</span>
                          </div>
                        </div>
                      ))}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
