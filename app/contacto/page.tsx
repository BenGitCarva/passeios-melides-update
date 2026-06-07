"use client";

import { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Phone, Mail, MapPin, Send, Check, MessageCircle } from "lucide-react";
import { toast } from "sonner";

const locations = [
  {
    label: "Passeios na Praia",
    address: "Estrada da Praia da Vigia, Melides",
    gps: "38.139211°N · 8.780192°W",
    mapSrc: "https://maps.google.com/maps?q=38.139211,-8.780192&z=14&output=embed",
    mapLink: "https://maps.google.com/?q=38.139211,-8.780192",
  },
  {
    label: "Passeios na Serra",
    address: "Monte da Marra, Estrada da Boavista, 7570-635 Melides",
    gps: "38.128580°N · 8.673275°W",
    mapSrc: "https://maps.google.com/maps?q=38.128580,-8.673275&z=14&output=embed",
    mapLink: "https://maps.google.com/?q=38.128580,-8.673275",
  },
];

export default function ContactoPage() {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSent(true);
      toast.success("Mensagem enviada! Respondemos em menos de 24 horas.");
    }, 1500);
  };

  return (
    <>
      <Header />
      <main id="main-content">
        {/* Hero strip */}
        <div className="bg-espresso pt-28 pb-12 md:pt-36 md:pb-16">
          <div className="container">
            <p className="text-terra text-xs tracking-[0.25em] uppercase font-medium mb-3">Contacto</p>
            <h1 className="font-serif text-4xl md:text-5xl text-cream font-light">Fale connosco</h1>
            <p className="text-cream/60 mt-3 max-w-md">
              Respondemos a todos os contactos em menos de 24 horas. Para reservas urgentes, use o WhatsApp.
            </p>
          </div>
        </div>

        <section className="bg-cream py-16 md:py-20">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16">

              {/* Info + maps */}
              <div className="space-y-8">
                {/* Contact cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <a href="tel:+351910477358"
                    className="group flex items-center gap-4 p-5 bg-card rounded-2xl border border-border hover:border-terra/30 hover:shadow-card transition-all">
                    <div className="w-11 h-11 rounded-2xl bg-terra/10 flex items-center justify-center shrink-0 group-hover:bg-terra/20 transition-colors">
                      <Phone size={18} className="text-terra" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-0.5">Luís Lamas</p>
                      <p className="font-medium text-espresso text-sm">+351 910 477 358</p>
                      <p className="font-medium text-espresso text-sm">+351 917 474 865</p>
                    </div>
                  </a>

                  <a href="https://wa.me/351910477358?text=Ol%C3%A1%2C%20gostaria%20de%20saber%20mais%20sobre%20os%20passeios"
                    target="_blank" rel="noopener noreferrer"
                    className="group flex items-center gap-4 p-5 bg-card rounded-2xl border border-border hover:border-terra/30 hover:shadow-card transition-all">
                    <div className="w-11 h-11 rounded-2xl bg-terra/10 flex items-center justify-center shrink-0 group-hover:bg-terra/20 transition-colors">
                      <MessageCircle size={18} className="text-terra" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-0.5">WhatsApp</p>
                      <p className="font-medium text-espresso text-sm">Resposta rápida</p>
                      <p className="text-terra text-xs font-medium">Contactar →</p>
                    </div>
                  </a>

                  <a href="mailto:info@passeiosacavalomelides.com"
                    className="group flex items-center gap-4 p-5 bg-card rounded-2xl border border-border hover:border-terra/30 hover:shadow-card transition-all sm:col-span-2">
                    <div className="w-11 h-11 rounded-2xl bg-terra/10 flex items-center justify-center shrink-0 group-hover:bg-terra/20 transition-colors">
                      <Mail size={18} className="text-terra" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-0.5">Email</p>
                      <p className="font-medium text-espresso text-sm">info@passeiosacavalomelides.com</p>
                    </div>
                  </a>
                </div>

                {/* Two map locations */}
                <div className="space-y-4">
                  <h2 className="font-serif text-xl text-espresso font-light">Pontos de encontro</h2>
                  {locations.map((loc) => (
                    <div key={loc.label} className="rounded-3xl overflow-hidden border border-border">
                      <div className="p-4 bg-card flex items-start justify-between gap-3">
                        <div className="flex items-start gap-3">
                          <MapPin size={16} className="text-terra mt-0.5 shrink-0" aria-hidden="true" />
                          <div>
                            <p className="font-medium text-espresso text-sm">{loc.label}</p>
                            <p className="text-muted-foreground text-xs mt-0.5">{loc.address}</p>
                          </div>
                        </div>
                        <a href={loc.mapLink} target="_blank" rel="noopener noreferrer"
                          className="text-terra text-xs font-medium whitespace-nowrap hover:underline shrink-0">
                          Ver mapa →
                        </a>
                      </div>
                      <iframe
                        src={loc.mapSrc}
                        width="100%"
                        height="200"
                        loading="lazy"
                        style={{ border: 0 }}
                        referrerPolicy="no-referrer-when-downgrade"
                        title={`Mapa — ${loc.label}`}
                        aria-label={`Mapa de localização: ${loc.label}`}
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Form */}
              <div>
                {sent ? (
                  <div className="flex flex-col items-center justify-center h-full text-center py-16">
                    <div className="w-16 h-16 rounded-full bg-sage/20 flex items-center justify-center mb-4">
                      <Check size={28} className="text-sage" aria-hidden="true" />
                    </div>
                    <h3 className="font-serif text-2xl text-espresso mb-2">Mensagem enviada!</h3>
                    <p className="text-muted-foreground text-sm max-w-xs">
                      Obrigado pelo seu contacto. O Luís responde em menos de 24 horas.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={submit} className="space-y-4" noValidate>
                    <h2 className="font-serif text-2xl text-espresso mb-6">Enviar mensagem</h2>

                    <div>
                      <label htmlFor="contact-name" className="block text-xs font-medium text-espresso mb-1.5">
                        Nome <span aria-label="obrigatório">*</span>
                      </label>
                      <input id="contact-name" type="text" placeholder="O seu nome" required
                        value={form.name} onChange={(e) => setForm(p => ({ ...p, name: e.target.value }))}
                        className="w-full px-4 py-3.5 rounded-2xl border border-border bg-card text-espresso placeholder:text-muted-foreground text-sm focus:outline-none focus:border-terra transition-colors" />
                    </div>

                    <div>
                      <label htmlFor="contact-email" className="block text-xs font-medium text-espresso mb-1.5">
                        Email <span aria-label="obrigatório">*</span>
                      </label>
                      <input id="contact-email" type="email" placeholder="o-seu@email.com" required
                        value={form.email} onChange={(e) => setForm(p => ({ ...p, email: e.target.value }))}
                        className="w-full px-4 py-3.5 rounded-2xl border border-border bg-card text-espresso placeholder:text-muted-foreground text-sm focus:outline-none focus:border-terra transition-colors" />
                    </div>

                    <div>
                      <label htmlFor="contact-phone" className="block text-xs font-medium text-espresso mb-1.5">Telefone</label>
                      <input id="contact-phone" type="tel" placeholder="+351 9XX XXX XXX"
                        value={form.phone} onChange={(e) => setForm(p => ({ ...p, phone: e.target.value }))}
                        className="w-full px-4 py-3.5 rounded-2xl border border-border bg-card text-espresso placeholder:text-muted-foreground text-sm focus:outline-none focus:border-terra transition-colors" />
                    </div>

                    <div>
                      <label htmlFor="contact-message" className="block text-xs font-medium text-espresso mb-1.5">
                        Mensagem <span aria-label="obrigatório">*</span>
                      </label>
                      <textarea id="contact-message" rows={5}
                        placeholder="Descreva a sua dúvida ou pedido…" required
                        value={form.message} onChange={(e) => setForm(p => ({ ...p, message: e.target.value }))}
                        className="w-full px-4 py-3.5 rounded-2xl border border-border bg-card text-espresso placeholder:text-muted-foreground text-sm focus:outline-none focus:border-terra transition-colors resize-none" />
                    </div>

                    <button type="submit" disabled={loading}
                      className="w-full flex items-center justify-center gap-2 bg-terra text-cream font-medium py-4 rounded-2xl hover:bg-terra/90 transition-colors text-sm disabled:opacity-70">
                      {loading ? "A enviar…" : <><Send size={15} aria-hidden="true" /> Enviar Mensagem</>}
                    </button>

                    <p className="text-xs text-muted-foreground text-center pt-2">
                      Ou contacte directamente: <a href="tel:+351910477358" className="text-terra hover:underline">+351 910 477 358</a>
                    </p>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
