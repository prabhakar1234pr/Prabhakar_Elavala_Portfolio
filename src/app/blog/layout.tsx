export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto max-w-3xl px-6 py-12 prose dark:prose-invert">
      {children}
    </div>
  );
}


