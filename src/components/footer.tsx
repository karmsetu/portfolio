// components/footer.tsx
export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t bg-background mt-auto">
      <div className="container mx-auto px-4 md:px-6 py-6">
        <div className="text-center text-sm text-muted-foreground">
          &#64; {currentYear} Karmsetu.
        </div>
      </div>
    </footer>
  );
}
