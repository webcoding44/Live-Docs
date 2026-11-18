import { SignIn } from '@clerk/nextjs'
import Image from 'next/image'

const SignInPage = () => {
  return (
    <main className="auth-page">
      <div className="auth-brand">
        <Image src="/assets/icons/logo.svg" alt="LiveDocs" width={132} height={36} />
      </div>
      <SignIn />
    </main>
  )
}

export default SignInPage