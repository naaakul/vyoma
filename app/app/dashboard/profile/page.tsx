import { LogoutButton } from "@/components/ui/logout-button";
import { getServerSession } from "@/utils/getServerSession";


function formatFieldName(key: string): string {
  return key
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (str) => str.toUpperCase())
    .trim();
}

function formatValue(value: unknown): string {
  if (value === null || value === undefined) return "—";
  if (typeof value === "boolean") return value ? "Yes" : "No";
  if (typeof value === "string") {
    if (/^\d{4}-\d{2}-\d{2}T/.test(value)) {
      return new Date(value).toLocaleString();
    }
    return value;
  }
  if (typeof value === "object") return JSON.stringify(value);
  return String(value);
}

function useMonospace(key: string) {
  return /(id|token|key|ip|agent)/i.test(key);
}


export default async function ProfilePage() {
  const session = await getServerSession();

  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  const { user, session: sessionInfo } = session;

  const { image, ...safeUser } = user;

  return (
    <main className="flex flex-col gap-8 bg-background p-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Profile</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Account information
          </p>
        </div>

        <LogoutButton />
      </div>

      {/* User Info */}
      <div className="rounded-lg border border-border bg-background">
        <div className="border-b border-border px-6 py-4">
          <h2 className="text-sm font-semibold text-foreground">
            User Information
          </h2>
        </div>

        <div className="divide-y divide-border">
          {Object.entries(safeUser).map(([key, value]) => (
            <div
              key={key}
              className="flex items-start justify-between gap-6 px-6 py-4 hover:bg-muted/30"
            >
              <span className="min-w-40 text-sm text-muted-foreground">
                {formatFieldName(key)}
              </span>
              <span
                className={`text-sm text-foreground text-right break-all ${
                  useMonospace(key) ? "font-mono text-xs" : ""
                }`}
              >
                {formatValue(value)}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Session Info */}
      {/* <div className="rounded-lg border border-border bg-background">
        <div className="border-b border-border px-6 py-4">
          <h2 className="text-sm font-semibold text-foreground">
            Session Information
          </h2>
        </div>

        <div className="divide-y divide-border">
          {Object.entries(sessionInfo).map(([key, value]) => (
            <div
              key={key}
              className="flex items-start justify-between gap-6 px-6 py-4 hover:bg-muted/30"
            >
              <span className="min-w-40 text-sm text-muted-foreground">
                {formatFieldName(key)}
              </span>
              <span
                className={`text-sm text-foreground text-right break-all ${
                  useMonospace(key) ? "font-mono text-xs" : ""
                }`}
              >
                {formatValue(value)}
              </span>
            </div>
          ))}
        </div>
      </div> */}

      {/* Footer */}
      <div className="border-t border-border pt-6 text-xs text-muted-foreground">
        This information is read-only
      </div>
    </main>
  );
}
