export default function Footer() {
  return (
    <footer className="border-t py-6 md:py-8">
      <div className="container mx-auto px-4 text-center">
        <p className="text-sm text-muted-foreground italic">&quot;Heartfelt stories, quietly kept.&quot;</p>
        <p className="text-xs text-muted-foreground mt-2">© {new Date().getFullYear()} Soul&apos;s Keepsake Box</p>
      </div>
    </footer>
  )
}