"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { toast } from "sonner";
import {
  Clock, Users, ChevronRight, Check, Minus, Plus,
  Phone, Mail, User, MessageSquare, CreditCard, Lock, ArrowLeft
} from "lucide-react";
import { services, type Service } from "@/data/services";
import { cn, formatDate } from "@/lib/utils";
import { addDays, isBefore, isWeekend, startOfDay } from "date-fns";

// Simulate some blocked dates
const blocked = new Set([
  addDays(new Date(), 3).toDateString(),
  addDays(new Date(), 7).toDateString(),
  addDays(new Date(), 10).toDateString(),
  addDays(new Date(), 14).toDateString(),
  addDays(new Date(), 18).toDateString(),
]);

const steps = ["Experiência", "Data & Grupo", "Seus Dados", "Confirmação"];

type FormData = {
  service: Service | null;
  date: Date | undefined;
  participants: number;
  name: string;
  email: string;
  phone: string;
  notes: string;
};

export default function BookingFlow() {
  const searchParams = useSearchParams();
  const preselected = searchParams.get("servico");

  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormData>({
    service: null,
    date: undefined,
    participants: 2,
    name: "",
    email: "",
    phone: "",
    notes: "",
  });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (preselected) {
      const s = services.find((x) => x.id === preselected);
      if (s) { setForm((f) => ({ ...f, service: s })); setStep(1); }
    }
  }, [preselected]);

  const price = form.service
    ? (form.service.perPerson
        ? form.service.price * form.participants
        : form.service.price)
    : 0;

  const isDateDisabled = (d: Date) =>
    isBefore(d, startOfDay(new Date())) || blocked.has(d.toDateString());

  const canNext = () => {
    if (step === 0) return !!form.service;
    if (step === 1) return !!form.date && form.participants > 0;
    if (step === 2) return !!form.name && !!form.email && !!form.phone;
    return false;
  };

  const next = () => {
    if (step < 3) setStep(step + 1);
  };
  const back = () => { if (step > 0) setStep(step - 1); };

  const submit = () => {
    toast.success("Reserva enviada! Confirmamos em menos de 2 horas por email.");
    setSubmitted(true);
  };

  if (submitted) return <SuccessScreen form={form} price={price} />;

  return (
    <div className="max-w-4xl mx-auto">
      {/* Step announcer for screen readers */}
      <div aria-live="polite" aria-atomic="true" className="sr-only">
        Passo {step + 1} de {steps.length}: {steps[step]}
      </div>

      {/* Progress */}
      <StepProgress current={step} steps={steps} />

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main area */}
        <div className="lg:col-span-2">
          {step === 0 && <StepService form={form} setForm={setForm} />}
          {step === 1 && <StepDateTime form={form} setForm={setForm} isDateDisabled={isDateDisabled} />}
          {step === 2 && <StepDetails form={form} setForm={setForm} />}
          {step === 3 && <StepReview form={form} price={price} onSubmit={submit} />}

          {/* Navigation */}
          {step < 3 && (
            <div className="flex gap-3 mt-6">
              {step > 0 && (
                <button
                  onClick={back}
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-espresso transition-colors px-4 py-3"
                >
                  <ArrowLeft size={16} /> Voltar
                </button>
              )}
              <button
                onClick={next}
                disabled={!canNext()}
                className={cn(
                  "flex-1 flex items-center justify-center gap-2 py-4 rounded-2xl font-medium text-sm transition-all",
                  canNext()
                    ? "bg-terra text-cream hover:bg-terra-dark shadow-sm"
                    : "bg-muted text-muted-foreground cursor-not-allowed"
                )}
              >
                {step === 2 ? "Rever Reserva" : "Continuar"}
                <ChevronRight size={16} />
              </button>
            </div>
          )}
        </div>

        {/* Summary sidebar */}
        <div className="lg:col-span-1">
          <BookingSummary form={form} price={price} />
        </div>
      </div>
    </div>
  );
}

/* ── Step Progress ── */
function StepProgress({ current, steps }: { current: number; steps: string[] }) {
  return (
    <div className="flex items-center gap-0">
      {steps.map((label, i) => (
        <div key={i} className="flex items-center flex-1 last:flex-none">
          <div className="flex flex-col items-center">
            <div className={cn(
              "w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold transition-all",
              i < current ? "bg-terra text-cream" :
              i === current ? "bg-espresso text-cream" :
              "bg-muted text-muted-foreground"
            )}>
              {i < current ? <Check size={14} /> : i + 1}
            </div>
            <span className={cn(
              "text-[10px] mt-1.5 font-medium hidden sm:block whitespace-nowrap",
              i === current ? "text-espresso" : "text-muted-foreground"
            )}>
              {label}
            </span>
          </div>
          {i < steps.length - 1 && (
            <div className={cn(
              "h-0.5 flex-1 mx-2 mt-[-12px] sm:mt-[-14px] transition-colors",
              i < current ? "bg-terra" : "bg-border"
            )} />
          )}
        </div>
      ))}
    </div>
  );
}

/* ── Step 0: Choose Service ── */
function StepService({ form, setForm }: { form: FormData; setForm: React.Dispatch<React.SetStateAction<FormData>> }) {
  return (
    <div className="space-y-3">
      <h2 className="font-serif text-2xl text-espresso mb-5">Que experiência deseja?</h2>
      {services.map((s) => (
        <button
          key={s.id}
          onClick={() => setForm(f => ({ ...f, service: s, participants: Math.max(f.participants, s.minParticipants || 1) }))}
          className={cn(
            "w-full flex items-center gap-4 p-4 rounded-2xl border-2 text-left transition-all hover:border-terra/50",
            form.service?.id === s.id ? "border-terra bg-terra/5" : "border-border bg-card"
          )}
        >
          <div className="relative w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
            <Image src={s.image} alt={s.name} fill className="object-cover" sizes="64px" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <div>
                {s.badge && (
                  <span className="text-[10px] bg-terra/10 text-terra px-2 py-0.5 rounded-full font-medium mr-2">
                    {s.badge}
                  </span>
                )}
                <span className="font-serif text-espresso font-medium">{s.name}</span>
              </div>
              <span className="font-serif text-terra font-semibold whitespace-nowrap text-sm">
                €{s.price}{s.perPerson ? "/pp" : ""}
              </span>
            </div>
            <p className="text-muted-foreground text-xs mt-1 line-clamp-1">{s.tagline}</p>
            <div className="flex gap-3 mt-2">
              <span className="text-xs text-muted-foreground flex items-center gap-1">
                <Clock size={10} /> {s.duration}
              </span>
              <span className="text-xs text-muted-foreground flex items-center gap-1">
                <Users size={10} /> máx. {s.maxParticipants}
              </span>
            </div>
          </div>
          {form.service?.id === s.id && (
            <div className="w-5 h-5 rounded-full bg-terra flex items-center justify-center flex-shrink-0">
              <Check size={12} className="text-cream" />
            </div>
          )}
        </button>
      ))}
    </div>
  );
}

/* ── Step 1: Date & Participants ── */
function StepDateTime({ form, setForm, isDateDisabled }: {
  form: FormData;
  setForm: React.Dispatch<React.SetStateAction<FormData>>;
  isDateDisabled: (d: Date) => boolean;
}) {
  const max = form.service?.maxParticipants || 8;
  const min = form.service?.minParticipants || 1;

  return (
    <div>
      <h2 className="font-serif text-2xl text-espresso mb-6">Quando e quantos?</h2>

      {/* Calendar */}
      <div className="bg-card border border-border rounded-3xl p-5 mb-5">
        <p className="text-sm font-medium text-espresso mb-3">Escolha a data</p>
        <DayPicker
          mode="single"
          selected={form.date}
          onSelect={(d) => setForm(f => ({ ...f, date: d }))}
          disabled={isDateDisabled}
          fromDate={new Date()}
          toDate={addDays(new Date(), 90)}
          className="mx-auto"
        />
      </div>

      {/* Participants */}
      <div className="bg-card border border-border rounded-3xl p-5">
        <p className="text-sm font-medium text-espresso mb-1">Número de participantes</p>
        <p className="text-xs text-muted-foreground mb-4">
          {min > 1 ? `Mínimo ${min}` : "Mínimo 1"} · Máximo {max}
        </p>
        <div className="flex items-center justify-between">
          <button
            onClick={() => setForm(f => ({ ...f, participants: Math.max(min, f.participants - 1) }))}
            disabled={form.participants <= min}
            className="w-11 h-11 rounded-full border border-border flex items-center justify-center hover:border-terra hover:text-terra disabled:opacity-30 transition-colors"
          >
            <Minus size={16} />
          </button>
          <span className="font-serif text-3xl text-espresso font-medium w-16 text-center">
            {form.participants}
          </span>
          <button
            onClick={() => setForm(f => ({ ...f, participants: Math.min(max, f.participants + 1) }))}
            disabled={form.participants >= max}
            className="w-11 h-11 rounded-full border border-border flex items-center justify-center hover:border-terra hover:text-terra disabled:opacity-30 transition-colors"
          >
            <Plus size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── Step 2: Personal Details ── */
function StepDetails({ form, setForm }: { form: FormData; setForm: React.Dispatch<React.SetStateAction<FormData>> }) {
  const field = (key: keyof FormData) => ({
    value: form[key] as string,
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm(f => ({ ...f, [key]: e.target.value })),
  });

  return (
    <div>
      <h2 className="font-serif text-2xl text-espresso mb-6">Os seus dados</h2>
      <div className="space-y-4">
        <div>
          <label htmlFor="booking-name" className="block text-xs font-medium text-espresso mb-1.5">
            Nome completo <span aria-label="obrigatório">*</span>
          </label>
          <div className="relative">
            <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
            <input
              id="booking-name"
              type="text"
              autoComplete="name"
              required
              aria-required="true"
              className="w-full pl-11 pr-4 py-4 rounded-2xl border border-border bg-card text-espresso placeholder:text-muted-foreground text-sm focus:outline-none focus:border-terra transition-colors"
              {...field("name")}
            />
          </div>
        </div>
        <div>
          <label htmlFor="booking-email" className="block text-xs font-medium text-espresso mb-1.5">
            Email <span aria-label="obrigatório">*</span>
          </label>
          <div className="relative">
            <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
            <input
              id="booking-email"
              type="email"
              autoComplete="email"
              required
              aria-required="true"
              className="w-full pl-11 pr-4 py-4 rounded-2xl border border-border bg-card text-espresso placeholder:text-muted-foreground text-sm focus:outline-none focus:border-terra transition-colors"
              {...field("email")}
            />
          </div>
        </div>
        <div>
          <label htmlFor="booking-phone" className="block text-xs font-medium text-espresso mb-1.5">
            Telemóvel (incl. indicativo) <span aria-label="obrigatório">*</span>
          </label>
          <div className="relative">
            <Phone size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
            <input
              id="booking-phone"
              type="tel"
              autoComplete="tel"
              required
              aria-required="true"
              className="w-full pl-11 pr-4 py-4 rounded-2xl border border-border bg-card text-espresso placeholder:text-muted-foreground text-sm focus:outline-none focus:border-terra transition-colors"
              {...field("phone")}
            />
          </div>
        </div>
        <div>
          <label htmlFor="booking-notes" className="block text-xs font-medium text-espresso mb-1.5">
            Notas ou pedidos especiais <span className="text-muted-foreground font-normal">(opcional)</span>
          </label>
          <div className="relative">
            <MessageSquare size={16} className="absolute left-4 top-4 text-muted-foreground" aria-hidden="true" />
            <textarea
              id="booking-notes"
              rows={3}
              className="w-full pl-11 pr-4 py-4 rounded-2xl border border-border bg-card text-espresso placeholder:text-muted-foreground text-sm focus:outline-none focus:border-terra transition-colors resize-none"
              {...field("notes")}
            />
          </div>
        </div>
      </div>

      <div className="mt-5 p-4 rounded-2xl bg-sage/10 border border-sage/20 flex gap-3">
        <Lock size={16} className="text-sage mt-0.5 shrink-0" />
        <p className="text-xs text-sage leading-relaxed">
          Os seus dados são protegidos e usados exclusivamente para a gestão da sua reserva.
          Não partilhamos informação com terceiros. RGPD.
        </p>
      </div>
    </div>
  );
}

/* ── Step 3: Review & Pay ── */
function StepReview({ form, price, onSubmit }: { form: FormData; price: number; onSubmit: () => void }) {
  const [method, setMethod] = useState<"card" | "mbway">("card");
  const [loading, setLoading] = useState(false);

  const submit = () => {
    setLoading(true);
    setTimeout(() => { setLoading(false); onSubmit(); }, 2200);
  };

  return (
    <div>
      <h2 className="font-serif text-2xl text-espresso mb-6">Confirmar reserva</h2>

      {/* Summary */}
      <div className="bg-card border border-border rounded-3xl p-5 mb-5 space-y-3">
        <SummaryRow label="Experiência" value={form.service?.name || "-"} />
        <SummaryRow label="Data" value={form.date ? formatDate(form.date) : "-"} />
        <SummaryRow label="Participantes" value={`${form.participants} pessoa${form.participants > 1 ? "s" : ""}`} />
        <SummaryRow label="Nome" value={form.name} />
        <SummaryRow label="Email" value={form.email} />
        <div className="border-t border-border pt-3 flex justify-between items-center">
          <span className="font-medium text-espresso">Total</span>
          <span className="font-serif text-2xl text-terra font-semibold">€{price}</span>
        </div>
      </div>

      {/* Payment method */}
      <div className="mb-5">
        <p className="text-sm font-medium text-espresso mb-3">Método de pagamento</p>
        <div className="grid grid-cols-2 gap-3">
          {[
            { id: "card", label: "Cartão", icon: "💳" },
            { id: "mbway", label: "MB WAY", icon: "📱" },
          ].map((m) => (
            <button
              key={m.id}
              onClick={() => setMethod(m.id as "card" | "mbway")}
              className={cn(
                "flex items-center gap-3 p-4 rounded-2xl border-2 text-sm font-medium transition-all",
                method === m.id ? "border-terra bg-terra/5 text-espresso" : "border-border bg-card text-muted-foreground"
              )}
            >
              <span className="text-xl">{m.icon}</span>
              {m.label}
            </button>
          ))}
        </div>

        {method === "card" && (
          <div className="mt-4 space-y-3">
            <input placeholder="Número do cartão" className="w-full px-4 py-3.5 rounded-2xl border border-border bg-card text-sm focus:outline-none focus:border-terra text-espresso placeholder:text-muted-foreground" />
            <div className="grid grid-cols-2 gap-3">
              <input placeholder="MM/AA" className="w-full px-4 py-3.5 rounded-2xl border border-border bg-card text-sm focus:outline-none focus:border-terra text-espresso placeholder:text-muted-foreground" />
              <input placeholder="CVV" className="w-full px-4 py-3.5 rounded-2xl border border-border bg-card text-sm focus:outline-none focus:border-terra text-espresso placeholder:text-muted-foreground" />
            </div>
          </div>
        )}
        {method === "mbway" && (
          <div className="mt-4">
            <input placeholder="Número de telemóvel MB WAY" className="w-full px-4 py-3.5 rounded-2xl border border-border bg-card text-sm focus:outline-none focus:border-terra text-espresso placeholder:text-muted-foreground" />
          </div>
        )}
      </div>

      <button
        onClick={submit}
        disabled={loading}
        className="w-full flex items-center justify-center gap-2 bg-terra text-cream font-medium py-4 rounded-2xl hover:bg-terra-dark transition-all text-sm shadow-sm disabled:opacity-70"
      >
        {loading ? (
          <span className="flex items-center gap-2">
            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
            </svg>
            A processar…
          </span>
        ) : (
          <>
            <Lock size={14} />
            Confirmar e Pagar · €{price}
          </>
        )}
      </button>

      <p className="text-center text-xs text-muted-foreground mt-3 flex items-center justify-center gap-1.5">
        <Lock size={11} /> Pagamento seguro · Stripe / MB WAY · Cancelamento gratuito até 48h antes
      </p>
    </div>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className="text-sm text-espresso font-medium text-right">{value}</span>
    </div>
  );
}

/* ── Booking Sidebar ── */
function BookingSummary({ form, price }: { form: FormData; price: number }) {
  if (!form.service) {
    return (
      <div className="bg-card border border-border rounded-3xl p-6 sticky top-24">
        <p className="font-serif text-espresso text-lg mb-2">Resumo da reserva</p>
        <p className="text-muted-foreground text-sm">Escolha uma experiência para ver o resumo.</p>
        <div className="mt-6 p-4 rounded-2xl bg-terra/5 border border-terra/20">
          <p className="text-xs text-terra font-medium mb-1">💬 Precisa de ajuda?</p>
          <a href="https://wa.me/351910477358" className="text-xs text-muted-foreground hover:text-terra transition-colors">
            WhatsApp · +351 910 477 358
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-3xl overflow-hidden sticky top-24">
      {form.service.image && (
        <div className="relative h-44">
          <Image src={form.service.image} alt={form.service.name} fill className="object-cover" sizes="400px" />
          <div className="absolute inset-0 bg-gradient-to-t from-espresso/60 to-transparent" />
          <div className="absolute bottom-3 left-4">
            <p className="font-serif text-cream text-lg font-medium">{form.service.name}</p>
            <p className="text-cream/70 text-xs">{form.service.duration}</p>
          </div>
        </div>
      )}
      <div className="p-5 space-y-3">
        {form.date && (
          <SummaryRow label="Data" value={formatDate(form.date)} />
        )}
        {form.participants > 0 && (
          <SummaryRow label="Participantes" value={`${form.participants}`} />
        )}
        {form.service.includes.map((inc, i) => (
          <div key={i} className="flex items-center gap-2 text-xs text-muted-foreground">
            <Check size={12} className="text-sage" />
            {inc}
          </div>
        ))}
        <div className="border-t border-border pt-3 flex justify-between items-center">
          <span className="text-sm text-muted-foreground">Total estimado</span>
          <span className="font-serif text-xl text-terra font-semibold">€{price}</span>
        </div>
        {form.service.priceNote && (
          <p className="text-xs text-muted-foreground">{form.service.priceNote}</p>
        )}
      </div>
    </div>
  );
}

/* ── Success Screen ── */
function SuccessScreen({ form, price }: { form: FormData; price: number }) {
  return (
    <div className="max-w-lg mx-auto text-center py-8">
      <div className="w-20 h-20 rounded-full bg-sage/20 flex items-center justify-center mx-auto mb-6">
        <Check size={36} className="text-sage" />
      </div>
      <h2 className="font-serif text-3xl text-espresso font-light mb-3">
        Reserva confirmada!
      </h2>
      <p className="text-muted-foreground leading-relaxed mb-8">
        Recebemos o seu pedido de reserva para{" "}
        <strong className="text-espresso">{form.service?.name}</strong>{" "}
        em <strong className="text-espresso">{form.date ? formatDate(form.date) : ""}</strong>.
        Enviaremos a confirmação final para{" "}
        <strong className="text-espresso">{form.email}</strong> em menos de 2 horas.
      </p>

      <div className="bg-card border border-border rounded-3xl p-6 text-left space-y-3 mb-8">
        <SummaryRow label="Experiência" value={form.service?.name || ""} />
        <SummaryRow label="Data" value={form.date ? formatDate(form.date) : ""} />
        <SummaryRow label="Participantes" value={`${form.participants}`} />
        <div className="border-t border-border pt-3 flex justify-between">
          <span className="font-medium text-espresso">Total pago</span>
          <span className="font-serif text-terra font-semibold text-xl">€{price}</span>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <a href="/" className="bg-terra text-cream font-medium py-4 rounded-2xl text-sm hover:bg-terra-dark transition-colors">
          Voltar ao início
        </a>
        <a
          href="https://wa.me/351910477358"
          className="border border-border text-espresso py-4 rounded-2xl text-sm hover:border-terra hover:text-terra transition-colors flex items-center justify-center gap-2"
        >
          <Phone size={14} /> Falar connosco no WhatsApp
        </a>
      </div>
    </div>
  );
}
