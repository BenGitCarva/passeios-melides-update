"use client";

import {
  ResponsiveContainer, LineChart, Line, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell, Legend,
} from "recharts";
import { format } from "date-fns";
import { pt } from "date-fns/locale";
import {
  TrendingUp, CalendarCheck, Users, Star,
  Clock, ArrowUpRight, ArrowDownRight, Euro,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  reservations, weeklyRevenue, byService, byCountry, occupancyByDay,
} from "@/data/reservations";

const now = new Date();

const todayRes = reservations.filter(
  (r) =>
    r.date.toDateString() === now.toDateString() &&
    r.status !== "cancelada"
);
const upcomingRes = reservations
  .filter((r) => r.date > now && r.status === "confirmada")
  .sort((a, b) => a.date.getTime() - b.date.getTime())
  .slice(0, 5);

const thisMonthRevenue = reservations
  .filter((r) => r.status === "concluida" || r.status === "confirmada")
  .reduce((sum, r) => sum + r.price, 0);

const statusColors: Record<string, string> = {
  confirmada: "bg-success/15 text-success",
  pendente:   "bg-warning/15 text-warning",
  cancelada:  "bg-danger/15 text-danger",
  concluida:  "bg-muted text-muted-foreground",
};

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* KPI cards */}
      <section aria-labelledby="kpi-heading">
        <h2 id="kpi-heading" className="sr-only">Indicadores principais</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <KPICard
            icon={Euro}
            label="Receita este mês"
            value={`€${thisMonthRevenue.toLocaleString("pt-PT")}`}
            trend="+22%"
            up
          />
          <KPICard
            icon={CalendarCheck}
            label="Reservas confirmadas"
            value={String(reservations.filter((r) => r.status === "confirmada").length)}
            trend="+15%"
            up
          />
          <KPICard
            icon={Users}
            label="Hóspedes este mês"
            value={String(reservations.filter(r => r.status !== "cancelada").reduce((s, r) => s + r.participants, 0))}
            trend="+8%"
            up
          />
          <KPICard
            icon={Star}
            label="Avaliação média"
            value="5.0"
            trend="Estável"
            up={null}
          />
        </div>
      </section>

      {/* Charts row */}
      <section aria-labelledby="charts-heading" className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <h2 id="charts-heading" className="sr-only">Gráficos de desempenho</h2>

        {/* Revenue line chart */}
        <div className="lg:col-span-2 bg-card rounded-2xl p-5 border border-border shadow-card">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="font-medium text-espresso text-sm">Receita semanal</p>
              <p className="text-xs text-muted-foreground">Últimas 8 semanas</p>
            </div>
            <TrendingUp size={18} className="text-terra" aria-hidden="true" />
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={weeklyRevenue}>
              <CartesianGrid strokeDasharray="3 3" stroke="#EDE3D3" />
              <XAxis dataKey="week" tick={{ fontSize: 11, fill: "#7A6A60" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "#7A6A60" }} axisLine={false} tickLine={false} tickFormatter={(v) => `€${v}`} />
              <Tooltip
                contentStyle={{ background: "#FAF7F2", border: "1px solid #EDE3D3", borderRadius: "12px", fontSize: 12 }}
                formatter={(v) => [`€${v}`, "Receita"]}
              />
              <Line type="monotone" dataKey="receita" stroke="#C17A56" strokeWidth={2.5} dot={{ r: 3, fill: "#C17A56" }} activeDot={{ r: 5 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Country pie */}
        <div className="bg-card rounded-2xl p-5 border border-border shadow-card">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="font-medium text-espresso text-sm">Origem dos clientes</p>
              <p className="text-xs text-muted-foreground">Por país (total)</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie data={byCountry} cx="50%" cy="50%" innerRadius={50} outerRadius={75} dataKey="value" paddingAngle={2}>
                {byCountry.map((entry, i) => (
                  <Cell key={i} fill={entry.fill} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{ background: "#FAF7F2", border: "1px solid #EDE3D3", borderRadius: "12px", fontSize: 12 }}
                formatter={(v, _, props) => [v, (props as { payload?: { country: string } }).payload?.country ?? ""]}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-2 space-y-1">
            {byCountry.slice(0, 4).map((c) => (
              <div key={c.country} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: c.fill }} aria-hidden="true" />
                  <span className="text-muted-foreground">{c.country}</span>
                </div>
                <span className="font-medium text-espresso">{c.value}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Occupancy + service bar */}
      <section aria-labelledby="detail-charts-heading" className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <h2 id="detail-charts-heading" className="sr-only">Ocupação e atividades</h2>

        {/* Occupancy by day */}
        <div className="bg-card rounded-2xl p-5 border border-border shadow-card">
          <p className="font-medium text-espresso text-sm mb-4">Taxa de ocupação por dia da semana</p>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={occupancyByDay} barSize={28}>
              <CartesianGrid strokeDasharray="3 3" stroke="#EDE3D3" vertical={false} />
              <XAxis dataKey="day" tick={{ fontSize: 11, fill: "#7A6A60" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "#7A6A60" }} axisLine={false} tickLine={false} tickFormatter={(v) => `${v}%`} />
              <Tooltip
                contentStyle={{ background: "#FAF7F2", border: "1px solid #EDE3D3", borderRadius: "12px", fontSize: 12 }}
                formatter={(v) => [`${v}%`, "Ocupação"]}
              />
              <Bar dataKey="pct" radius={[6, 6, 0, 0]}>
                {occupancyByDay.map((entry, i) => (
                  <Cell key={i} fill={entry.pct >= 80 ? "#C17A56" : "#D4B896"} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* By service */}
        <div className="bg-card rounded-2xl p-5 border border-border shadow-card">
          <p className="font-medium text-espresso text-sm mb-4">Receita por experiência</p>
          <div className="space-y-3" role="list" aria-label="Receita por experiência">
            {byService.map((s) => {
              const pct = Math.round((s.receita / Math.max(...byService.map((x) => x.receita))) * 100);
              return (
                <div key={s.name} role="listitem">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-muted-foreground truncate max-w-[60%]">{s.name}</span>
                    <span className="font-medium text-espresso">€{s.receita}</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden" role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100} aria-label={`${s.name}: ${pct}%`}>
                    <div className="h-full bg-terra rounded-full transition-all" style={{ width: `${pct}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Today + upcoming */}
      <section aria-labelledby="schedule-heading" className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-card rounded-2xl p-5 border border-border shadow-card">
          <h2 id="schedule-heading" className="font-medium text-espresso text-sm mb-4 flex items-center gap-2">
            <Clock size={16} className="text-terra" aria-hidden="true" />
            Hoje · {format(now, "d MMMM", { locale: pt })}
            <span className="ml-auto text-xs font-normal bg-terra/10 text-terra-text px-2 py-0.5 rounded-full">
              {todayRes.length} sessões
            </span>
          </h2>
          {todayRes.length === 0 ? (
            <p className="text-muted-foreground text-sm py-4 text-center">Sem sessões agendadas para hoje.</p>
          ) : (
            <ul className="space-y-3" aria-label="Sessões de hoje">
              {todayRes.map((r) => (
                <li key={r.id} className="flex items-center gap-3 p-3 rounded-xl bg-muted/50">
                  <span className="text-espresso font-medium text-sm w-12 shrink-0">{r.hour}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-espresso truncate">{r.serviceName}</p>
                    <p className="text-xs text-muted-foreground">{r.guest.name} · {r.participants} participantes</p>
                  </div>
                  <span className={cn("text-xs font-medium px-2 py-0.5 rounded-full", statusColors[r.status])}>
                    {r.status}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Upcoming */}
        <div className="bg-card rounded-2xl p-5 border border-border shadow-card">
          <h2 className="font-medium text-espresso text-sm mb-4 flex items-center gap-2">
            <CalendarCheck size={16} className="text-terra" aria-hidden="true" />
            Próximas reservas confirmadas
          </h2>
          <ul className="space-y-3" aria-label="Próximas reservas">
            {upcomingRes.map((r) => (
              <li key={r.id} className="flex items-center gap-3 p-3 rounded-xl bg-muted/50">
                <div className="text-center w-10 shrink-0">
                  <p className="text-lg font-serif font-semibold text-terra leading-none">{format(r.date, "d")}</p>
                  <p className="text-[10px] text-muted-foreground uppercase">{format(r.date, "MMM", { locale: pt })}</p>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-espresso truncate">{r.serviceName}</p>
                  <p className="text-xs text-muted-foreground">{r.guest.flag} {r.guest.name} · {r.participants}p</p>
                </div>
                <span className="font-medium text-espresso text-sm">€{r.price}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}

function KPICard({
  icon: Icon, label, value, trend, up,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  trend: string;
  up: boolean | null;
}) {
  return (
    <article className="bg-card rounded-2xl p-5 border border-border shadow-card">
      <div className="flex items-start justify-between mb-3">
        <p className="text-xs text-muted-foreground font-medium">{label}</p>
        <Icon size={18} className="text-terra" aria-hidden="true" />
      </div>
      <p className="font-serif text-2xl font-semibold text-espresso">{value}</p>
      {up !== null && (
        <p className={cn("text-xs font-medium flex items-center gap-1 mt-2", up ? "text-success" : "text-danger")}>
          {up ? <ArrowUpRight size={13} aria-hidden="true" /> : <ArrowDownRight size={13} aria-hidden="true" />}
          {trend} vs. mês anterior
        </p>
      )}
      {up === null && <p className="text-xs text-muted-foreground mt-2">{trend}</p>}
    </article>
  );
}
