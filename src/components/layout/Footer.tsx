
export function Footer() {
  return (
    <footer className="border-t border-border/40 py-8 text-center text-muted-foreground">
      <div className="container mx-auto px-4">
        <p>&copy; {new Date().getFullYear()} CryptoPunks. All rights reserved.</p>
        <p className="text-sm mt-1">Inspired by CryptoPunks, built with Next.js and AI.</p>
      </div>
    </footer>
  );
}
