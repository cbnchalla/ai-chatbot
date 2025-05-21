'use client';

import { signIn } from 'next-auth/react';

export default function Page() {
  return (
    <div className="flex min-h-screen flex-col justify-center items-center bg-background">
      <div className="mx-auto w-full max-w-md space-y-8 rounded-2xl border border-border bg-card p-8 shadow-lg">
        <div className="flex flex-col items-center space-y-2 text-center">
          <h1 className="text-2xl font-bold tracking-tight">
            Sign in to your account
          </h1>
          <p className="text-sm text-muted-foreground">
            Continue with your Google account to access the app.
          </p>
        </div>
        <div className="flex flex-col gap-4">
          <button
            type="button"
            onClick={() => signIn('google')}
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-accent focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
          >
            <svg
              className="mr-2 h-5 w-5"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M21.805 10.023h-9.18v3.954h5.262c-.226 1.2-1.36 3.52-5.262 3.52-3.168 0-5.75-2.62-5.75-5.85s2.582-5.85 5.75-5.85c1.8 0 3.012.77 3.705 1.43l2.53-2.46C17.09 3.67 15.13 2.7 12.625 2.7 7.98 2.7 4.25 6.43 4.25 11.075s3.73 8.375 8.375 8.375c4.825 0 8.025-3.39 8.025-8.175 0-.55-.06-1.1-.17-1.65z" />
            </svg>
            Continue with Google
          </button>
        </div>
      </div>
    </div>
  );
}
