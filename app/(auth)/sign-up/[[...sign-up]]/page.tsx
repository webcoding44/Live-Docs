import { SignUp } from '@clerk/nextjs'
import Image from 'next/image'

const SignUpPage = () => {
  return (
    <main className="auth-page">
      <div className="auth-brand">
        <Image src="/assets/icons/logo.svg" alt="LiveDocs" width={132} height={36} />
      </div>
      <SignUp />
    </main>
  )
}

export default SignUpPage