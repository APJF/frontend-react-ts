import { RegisterForm } from "@/components/auth/Register-form"
import { Header } from "@/components/layout/header";
import { Helmet } from "react-helmet";

export default function RegisterPage() {
  return (
    <>
      <Helmet>
        <title>Login - Japanese Learning Web</title>
        <meta name="description" content="Sign in to your Japanese learning account" />
      </Helmet>

      <Header />
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-pink-50">
      <div className="container flex items-center justify-center min-h-screen py-12">
        <RegisterForm />
      </div>
    </div>
    </>
  )
}
