import { signInWithPassword, signInWithGoogle } from './actions'

const MESSAGES = {
  missing: 'Enter your email and password.',
  invalid: 'Wrong email or password.',
  not_registered: "This email isn't registered. Contact the examination section.",
  google: 'Google sign-in did not complete. Try again.',
  error: 'Something went wrong while signing you in. Try again.',
}

export const metadata = { title: 'Sign in | Academix' }

export default async function LoginPage({ searchParams }) {
  const { error } = await searchParams
  const message = error ? MESSAGES[error] || MESSAGES.error : null

  return (
    <main className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-sm">
        <h1 className="text-2xl font-bold tracking-tight">Academix</h1>
        <p className="mt-1 text-sm text-[var(--muted)]">
          Examination Management. Sign in with the email your examination section registered for you.
        </p>

        {message && (
          <p role="alert" className="mt-5 rounded-md border border-[var(--danger)] bg-[var(--danger-bg)] px-3 py-2 text-sm text-[var(--danger)]">
            {message}
          </p>
        )}

        <form action={signInWithGoogle} className="mt-6">
          <button type="submit" className="btn-secondary w-full">
            <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden="true">
              <path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9.1 3.6l6.8-6.8C35.8 2.4 30.3 0 24 0 14.6 0 6.5 5.4 2.6 13.3l7.9 6.1C12.4 13.6 17.7 9.5 24 9.5z"/>
              <path fill="#4285F4" d="M46.5 24.5c0-1.6-.1-3.1-.4-4.5H24v9h12.7c-.6 3-2.3 5.5-4.8 7.2l7.6 5.9c4.4-4.1 7-10.1 7-17.6z"/>
              <path fill="#FBBC05" d="M10.5 28.6a14.5 14.5 0 0 1 0-9.2l-7.9-6.1a24 24 0 0 0 0 21.4l7.9-6.1z"/>
              <path fill="#34A853" d="M24 48c6.5 0 11.9-2.1 15.9-5.8l-7.6-5.9c-2.1 1.4-4.9 2.3-8.3 2.3-6.3 0-11.6-4.1-13.5-9.9l-7.9 6.1C6.5 42.6 14.6 48 24 48z"/>
            </svg>
            Continue with Google
          </button>
        </form>

        <div className="my-5 flex items-center gap-3 text-xs text-[var(--muted)]">
          <span className="h-px flex-1 bg-[var(--line)]" />
          or use your password
          <span className="h-px flex-1 bg-[var(--line)]" />
        </div>

        <form action={signInWithPassword} className="space-y-4">
          <label className="block text-sm font-medium">
            Email
            <input name="email" type="email" required autoComplete="email" className="field mt-1" />
          </label>
          <label className="block text-sm font-medium">
            Password
            <input name="password" type="password" required autoComplete="current-password" className="field mt-1" />
          </label>
          <button type="submit" className="btn-primary w-full">Sign in</button>
        </form>

        <p className="mt-6 text-xs text-[var(--muted)]">
          Forgot your password? Ask the examination section to issue a new one.
        </p>
      </div>
    </main>
  )
}
