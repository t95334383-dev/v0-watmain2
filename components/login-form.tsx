"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/router"

const LoginForm = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    // Updated credentials as requested
    if (username === "maccarty29" && password === "dfgtre4dnifgtrerf") {
      // Store session
      sessionStorage.setItem("isLoggedIn", "true")
      sessionStorage.setItem("username", username)

      router.push("/")
    } else {
      setError("Неверные учетные данные")
    }

    setIsLoading(false)
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
      <button type="submit" disabled={isLoading}>
        {isLoading ? "Loading..." : "Login"}
      </button>
      {error && <p>{error}</p>}
    </form>
  )
}

export default LoginForm
