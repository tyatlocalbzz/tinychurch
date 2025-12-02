import { SignupForm } from '@/components/forms/SignupForm'

export default function SignupPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6">
      <div className="max-w-md w-full">
        <h1 className="text-3xl font-bold mb-6 text-center">Start Your Church</h1>
        <p className="text-gray-600 mb-8 text-center">
          Create your church directory in minutes. Free for churches under 100 members.
        </p>
        <SignupForm />
      </div>
    </main>
  )
}
