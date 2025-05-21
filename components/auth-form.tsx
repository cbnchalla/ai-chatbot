import Form from 'next/form';
import { signIn } from 'next-auth/react';

import { Input } from './ui/input';
import { Label } from './ui/label';

export function AuthForm({
  action,
  children,
  defaultEmail = '',
}: {
  action: NonNullable<
    string | ((formData: FormData) => void | Promise<void>) | undefined
  >;
  children: React.ReactNode;
  defaultEmail?: string;
}) {
  return (
    <Form action={action} className="flex flex-col gap-4 px-4 sm:px-16">
      <div className="flex flex-col gap-2">
        <Label
          htmlFor="email"
          className="text-zinc-600 font-normal dark:text-zinc-400"
        >
          Email Address
        </Label>

        <Input
          id="email"
          name="email"
          className="bg-muted text-md md:text-sm"
          type="email"
          placeholder="user@acme.com"
          autoComplete="email"
          required
          autoFocus
          defaultValue={defaultEmail}
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label
          htmlFor="password"
          className="text-zinc-600 font-normal dark:text-zinc-400"
        >
          Password
        </Label>

        <Input
          id="password"
          name="password"
          className="bg-muted text-md md:text-sm"
          type="password"
          required
        />
      </div>

      {children}
      <button
        type="button"
        className="mt-2 bg-white border border-gray-300 rounded-md px-4 py-2 text-gray-700 hover:bg-gray-50 flex items-center justify-center gap-2"
        onClick={() => signIn('google')}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0_17_40)">
            <path
              d="M47.532 24.552c0-1.636-.146-3.2-.418-4.704H24.48v9.02h13.02c-.56 2.98-2.24 5.5-4.78 7.2v5.98h7.74c4.54-4.18 7.07-10.34 7.07-17.496z"
              fill="#4285F4"
            />
            <path
              d="M24.48 48c6.48 0 11.92-2.14 15.89-5.82l-7.74-5.98c-2.14 1.44-4.88 2.3-8.15 2.3-6.26 0-11.56-4.22-13.46-9.9H2.6v6.2C6.56 43.98 14.7 48 24.48 48z"
              fill="#34A853"
            />
            <path
              d="M11.02 28.6c-.48-1.44-.76-2.98-.76-4.6s.28-3.16.76-4.6v-6.2H2.6A23.97 23.97 0 000 24c0 3.98.96 7.76 2.6 11.2l8.42-6.6z"
              fill="#FBBC05"
            />
            <path
              d="M24.48 9.52c3.52 0 6.64 1.22 9.1 3.62l6.82-6.82C36.4 2.14 30.96 0 24.48 0 14.7 0 6.56 4.02 2.6 10.8l8.42 6.2c1.9-5.68 7.2-9.9 13.46-9.9z"
              fill="#EA4335"
            />
          </g>
          <defs>
            <clipPath id="clip0_17_40">
              <rect width="48" height="48" fill="white" />
            </clipPath>
          </defs>
        </svg>
        Continue with Google
      </button>
    </Form>
  );
}
