// Admin root layout — thin passthrough so /admin/login can opt out of the
// authenticated shell via route group `(dashboard)`.
export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
