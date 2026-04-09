import { Navbar } from "@/components/public/Navbar";
import { Footer } from "@/components/public/Footer";
import { WhatsAppButton } from "@/components/public/WhatsAppButton";
import { getSiteSettings } from "@/lib/db";

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await getSiteSettings();
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar phone={settings.phone} />
      <main className="flex-1">{children}</main>
      <Footer settings={settings} />
      <WhatsAppButton link={settings.whatsapp_link} />
    </div>
  );
}
