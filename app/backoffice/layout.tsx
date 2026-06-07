import Sidebar from "@/components/backoffice/Sidebar";
import BackofficeHeader from "@/components/backoffice/BackofficeHeader";

export const metadata = {
  title: "Backoffice · Passeios Melides",
};

export default function BackofficeLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-muted/30">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <BackofficeHeader />
        <main id="main-content" className="flex-1 p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
