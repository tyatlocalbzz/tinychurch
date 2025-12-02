export default function ChurchLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { churchSlug: string }
}) {
  return (
    <div className="min-h-screen">
      {/* Navigation will be added in later phases */}
      {children}
    </div>
  )
}
