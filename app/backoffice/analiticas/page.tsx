"use client";

import {
  ResponsiveContainer, LineChart, Line, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell,
  RadarChart, Radar, PolarGrid, PolarAngleAxis,
} from "recharts";
import { weeklyRevenue, byService, byCountry, occupancyByDay, reservations } from "@/data/reservations";
import { TrendingUp, TrendingDown } from "lucide-react";

const conversionByChannel = [
  { channel: "Site direto", reservas: 10, receita: 4120 },
  { channel: "WhatsApp",    reservas: 5,  receita: 1230 },
  { channel: "Email",       reservas: 4,  receita: 2200 },
  { channel: "Telefone",    reservas: 2,  receita: 420 },
];

const radarData = [
  { metric: "Ocupação",   value: 78 },
  { metric: "Satisfação", value: 100 },
  { metric: "Conversão",  value: 65 },
  { metric: "Repetição",  value: 42 },
  { metric: "Captação",   value: 58 },
];

const totalRevenue = weeklyRevenue.reduce((s, w) => s + w.receita, 0);
const avgPerBooking = Math.round(totalRevenue / weeklyRevenue.reduce((s, w) => s + w.reservas, 0));

export default function AnaliticasPage() {
  return (
    <div className="space-y-6">

      {/* Summary banner */}
      <section aria-labelledby="analytics-summary" className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <h2 id="analytics-summary" className="sr-only">Resumo analítico</h2>
        {[
          { label: "Receita total (8 sem.)", value: `€${totalRevenue.toLocaleString("pt-PT")}`, trend: "+18%", up: true },
          { label: "Ticket médio",           value: `€${avgPerBooking}`,                         trend: "+5%",  up: true },
          { label: "Taxa de cancelamento",   value: "9.5%",                                      trend: "-2pp", up: true },
          { label: "Clientes internacionais",value: "75%",                                       trend: "+8pp", up: true },
        ].map((s) => (
          <article key={s.label} className="bg-card rounded-2xl p-4 border border-border shadow-card">
            <p className="text-xs text-muted-foreground mb-1">{s.label}</p>
            <p className="font-serif text-2xl font-semibold text-espresso">{s.value}</p>
            <p className={`text-xs font-medium flex items-center gap-0.5 mt-1.5 ${s.up ? "text-success" : "text-danger"}`}>
              {s.up ? <TrendingUp size={12} aria-hidden="true" /> : <TrendingDown size={12} aria-hidden="true" />}
              {s.trend} vs. período anterior
            </p>
          </article>
        ))}
      </section>

      {/* Revenue + Reservas combo */}
      <section className="bg-card rounded-2xl p-5 border border-border shadow-card">
        <h2 className="font-medium text-espresso text-sm mb-1">Receita e Reservas · 8 semanas</h2>
        <p className="text-xs text-muted-foreground mb-5">Tendência de crescimento semanal</p>
        <ResponsiveContainer width="100%" height={240}>
          <LineChart data={weeklyRevenue}>
            <CartesianGrid strokeDasharray="3 3" stroke="#EDE3D3" />
            <XAxis dataKey="week" tick={{ fontSize: 11, fill: "#7A6A60" }} axisLine={false} tickLine={false} />
            <YAxis yAxisId="left"  tick={{ fontSize: 11, fill: "#7A6A60" }} axisLine={false} tickLine={false} tickFormatter={(v) => `€${v}`} />
            <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 11, fill: "#7A6A60" }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={{ background: "#FAF7F2", border: "1px solid #EDE3D3", borderRadius: "12px", fontSize: 12 }} />
            <Line yAxisId="left"  type="monotone" dataKey="receita"  stroke="#C17A56" strokeWidth={2.5} name="Receita (€)" dot={{ r: 3 }} />
            <Line yAxisId="right" type="monotone" dataKey="reservas" stroke="#7A8C6E" strokeWidth={2}   name="Reservas" dot={{ r: 3 }} strokeDasharray="5 4" />
          </LineChart>
        </ResponsiveContainer>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* By service bar */}
        <section className="bg-card rounded-2xl p-5 border border-border shadow-card">
          <h2 className="font-medium text-espresso text-sm mb-4">Receita por experiência</h2>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={byService} layout="vertical" barSize={14}>
              <CartesianGrid strokeDasharray="3 3" stroke="#EDE3D3" horizontal={false} />
              <XAxis type="number" tick={{ fontSize: 10, fill: "#7A6A60" }} axisLine={false} tickLine={false} tickFormatter={(v) => `€${v}`} />
              <YAxis type="category" dataKey="name" tick={{ fontSize: 10, fill: "#7A6A60" }} axisLine={false} tickLine={false} width={100} />
              <Tooltip contentStyle={{ background: "#FAF7F2", border: "1px solid #EDE3D3", borderRadius: "12px", fontSize: 12 }} formatter={(v) => [`€${v}`, "Receita"]} />
              <Bar dataKey="receita" fill="#C17A56" radius={[0, 6, 6, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </section>

        {/* Country donut */}
        <section className="bg-card rounded-2xl p-5 border border-border shadow-card">
          <h2 className="font-medium text-espresso text-sm mb-4">Origem dos clientes</h2>
          <div className="flex items-center gap-4">
            <ResponsiveContainer width="50%" height={200}>
              <PieChart>
                <Pie data={byCountry} cx="50%" cy="50%" innerRadius={55} outerRadius={80} dataKey="value" paddingAngle={3}>
                  {byCountry.map((entry, i) => <Cell key={i} fill={entry.fill} />)}
                </Pie>
                <Tooltip contentStyle={{ background: "#FAF7F2", border: "1px solid #EDE3D3", borderRadius: "12px", fontSize: 12 }} formatter={(v, _, props) => [v, props.payload?.country ?? ""]} />
              </PieChart>
            </ResponsiveContainer>
            <ul className="flex-1 space-y-2">
              {byCountry.map((c) => (
                <li key={c.country} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ background: c.fill }} aria-hidden="true" />
                    <span className="text-muted-foreground">{c.country}</span>
                  </div>
                  <span className="font-medium text-espresso">{c.value}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Channel */}
        <section className="bg-card rounded-2xl p-5 border border-border shadow-card">
          <h2 className="font-medium text-espresso text-sm mb-4">Reservas por canal de aquisição</h2>
          <div className="space-y-3" role="list">
            {conversionByChannel.map((c) => {
              const pct = Math.round((c.reservas / conversionByChannel.reduce((s, x) => s + x.reservas, 0)) * 100);
              return (
                <div key={c.channel} role="listitem">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-muted-foreground">{c.channel}</span>
                    <div className="flex gap-3">
                      <span className="text-espresso font-medium">{c.reservas} reservas</span>
                      <span className="text-terra font-medium">€{c.receita}</span>
                    </div>
                  </div>
                  <div className="h-2 bg-muted rounded-full" role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100} aria-label={`${c.channel}: ${pct}%`}>
                    <div className="h-full bg-terra rounded-full" style={{ width: `${pct}%` }} />
                  </div>
                </div>
              );
            })}
            <p className="text-xs text-success font-medium pt-2">
              💡 Site direto gera {Math.round((conversionByChannel[0].receita / conversionByChannel.reduce((s,c)=>s+c.receita,0))*100)}% da receita — reforçar SEO e campanhas diretas.
            </p>
          </div>
        </section>

        {/* Radar */}
        <section className="bg-card rounded-2xl p-5 border border-border shadow-card">
          <h2 className="font-medium text-espresso text-sm mb-4">Performance global</h2>
          <ResponsiveContainer width="100%" height={220}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="#EDE3D3" />
              <PolarAngleAxis dataKey="metric" tick={{ fontSize: 11, fill: "#7A6A60" }} />
              <Radar name="Score" dataKey="value" stroke="#C17A56" fill="#C17A56" fillOpacity={0.25} />
              <Tooltip contentStyle={{ background: "#FAF7F2", border: "1px solid #EDE3D3", borderRadius: "12px", fontSize: 12 }} formatter={(v) => [`${v}%`]} />
            </RadarChart>
          </ResponsiveContainer>
          <p className="text-xs text-muted-foreground text-center mt-1">Score composto de desempenho operacional</p>
        </section>
      </div>
    </div>
  );
}
