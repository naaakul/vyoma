"use client";

const API_URL = process.env.NEXT_PUBLIC_API_URL!;

export default function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="w-full max-w-sm space-y-4 p-6 border border-white/10 rounded-xl">
        <h1 className="text-2xl font-bold text-center">Sign in to Vyoma</h1>

        <form
          className="space-y-3"
          onSubmit={async (e) => {
            e.preventDefault();
            const form = e.currentTarget;
            const email = (form.email as HTMLInputElement).value;
            const password = (form.password as HTMLInputElement).value;

            await fetch(`${API_URL}/auth/sign-in`, {
              method: "POST",
              credentials: "include",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ email, password }),
            });

            window.location.href = "/";
          }}
        >
          <input
            name="email"
            placeholder="Email"
            className="w-full p-2 bg-black border border-white/20 rounded"
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            className="w-full p-2 bg-black border border-white/20 rounded"
          />
          <button className="w-full bg-white text-black p-2 rounded">
            Sign in with Email
          </button>
        </form>

        <div className="flex gap-2">
          <a
            href={`${API_URL}/auth/sign-in/google`}
            className="w-full text-center border border-white/20 p-2 rounded"
          >
            Google
          </a>

          <a
            href={`${API_URL}/auth/sign-in/github`}
            className="w-full text-center border border-white/20 p-2 rounded"
          >
            GitHub
          </a>
        </div>
      </div>
    </div>
  );
}
