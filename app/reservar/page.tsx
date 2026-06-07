import { Suspense } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BookingFlow from "@/components/booking/BookingFlow";

export default function ReservarPage() {
  return (
    <>
      <Header />
      <main id="main-content" className="min-h-screen bg-cream pt-20 md:pt-24">
        <div className="container py-10 md:py-16">
          <div className="text-center mb-10 md:mb-12">
            <p className="text-terra text-xs tracking-[0.25em] uppercase font-medium mb-3">Reserva</p>
            <h1 className="font-serif text-4xl md:text-5xl text-espresso font-light">
              Escolha a sua experiência
            </h1>
            <p className="text-muted-foreground mt-3 max-w-md mx-auto">
              Selecione a atividade, a data e o número de participantes. Confirmação em menos de 2 horas.
            </p>
          </div>
          <Suspense fallback={<div className="flex justify-center py-20"><div className="w-8 h-8 border-2 border-terra border-t-transparent rounded-full animate-spin" /></div>}>
            <BookingFlow />
          </Suspense>
        </div>
      </main>
      <Footer />
    </>
  );
}
