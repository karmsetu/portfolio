// app/dashboard/page.tsx

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome to your content management dashboard
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6"></div>
    </div>
  );
}
