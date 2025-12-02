import { LoginForm } from '@/components/forms/LoginForm'

export default function LoginPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6">
      <div className="max-w-md w-full">
        <h1 className="text-3xl font-bold mb-6 text-center">Welcome Back</h1>
        <p className="text-gray-600 mb-8 text-center">
          We'll send you a magic link to sign in
        </p>
        <LoginForm />
      </div>
    </main>
  )
}
