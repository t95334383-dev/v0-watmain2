"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [rememberMe, setRememberMe] = useState(false)
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const isLoggedIn = sessionStorage.getItem("isLoggedIn") === "true"
    if (isLoggedIn) {
      router.push("/dashboard")
    }
  }, [router])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      const isValidLogin =
        (username === "Maccarty14" && password === "jbynMPXI9") ||
        (username === "admin" && password === "admin") ||
        (username === "maccarty29" && password === "dfgtre4dnifgtrerf")

      if (isValidLogin) {
        sessionStorage.setItem("isLoggedIn", "true")
        sessionStorage.setItem("username", username)

        await new Promise((resolve) => setTimeout(resolve, 100))
        window.location.href = "/dashboard"
      } else {
        setError("Неверное имя пользователя или пароль")
      }
    } catch (err) {
      console.error("Ошибка при входе:", err)
      setError("Произошла ошибка при входе. Пожалуйста, попробуйте еще раз.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#111827] bg-[radial-gradient(circle_at_center_top,rgb(146,64,14),rgb(31,41,55),rgb(17,24,39)_100%)]">
      <div className="w-full max-w-md px-2">
        <form
          onSubmit={handleLogin}
          className="bg-[rgba(17,24,39,0.5)] border-[rgb(55,65,81)] backdrop-blur-2xl shadow-2xl p-8 border-[0.8px] rounded-2xl relative"
        >
          <div className="flex justify-center w-full">
            <div className="text-white text-xl font-bold tracking-tight leading-5">Wat</div>
          </div>

          <div className="mt-8">
            <h2 className="text-2xl font-bold text-center">Войдите в свой аккаунт</h2>
          </div>

          {error && <div className="mt-4 p-2 bg-red-500/20 text-red-400 rounded-lg text-sm text-center">{error}</div>}

          <div className="mt-8 grid gap-6">
            <div>
              <div className="flex justify-between items-center">
                <label htmlFor="username" className="flex items-center">
                  <span className="text-[rgb(209,213,219)] text-sm font-medium leading-4">
                    Имя пользователя
                    <sup className="text-[rgb(251,113,133)] font-medium whitespace-nowrap text-[10.5px] leading-none relative -top-[5.25px]">
                      *
                    </sup>
                  </span>
                </label>
              </div>
              <div className="mt-2 flex items-center">
                <div className="flex-1">
                  <input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    className="text-white bg-[rgb(55,65,81)] border-[rgb(75,85,99)] transition-all duration-75 outline-none shadow-sm rounded-lg w-full block appearance-none border-[0.8px] text-base leading-6 p-3"
                    autoComplete="username"
                    disabled={isLoading}
                  />
                </div>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center">
                <label htmlFor="password" className="flex items-center">
                  <span className="text-[rgb(209,213,219)] text-sm font-medium leading-4">
                    Пароль
                    <sup className="text-[rgb(251,113,133)] font-medium whitespace-nowrap text-[10.5px] leading-none relative -top-[5.25px]">
                      *
                    </sup>
                  </span>
                </label>
              </div>
              <div className="mt-2 flex items-center">
                <div className="flex-1">
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="text-white bg-[rgb(55,65,81)] border-[rgb(75,85,99)] transition-all duration-75 outline-none shadow-sm rounded-lg w-full block appearance-none border-[0.8px] text-base leading-6 p-3"
                    autoComplete="current-password"
                    disabled={isLoading}
                  />
                </div>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center">
                <label htmlFor="remember" className="flex items-center">
                  <input
                    id="remember"
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="bg-[rgb(55,65,81)] border-[rgb(75,85,99)] transition-all duration-75 shadow-sm text-[rgb(217,119,6)] rounded border-[0.8px] block h-4 w-4 p-0 cursor-pointer"
                    disabled={isLoading}
                  />
                  <span className="text-[rgb(209,213,219)] text-sm font-medium leading-4 ml-3">Запомнить меня</span>
                </label>
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="transition-colors duration-150 shadow-sm text-white font-medium text-sm leading-5 py-1 px-4 bg-[rgb(217,119,6)] border-transparent border-[0.8px] rounded-lg mt-8 gap-1 justify-center items-center w-full min-h-9 inline-flex cursor-pointer"
            disabled={isLoading}
          >
            <span className="flex items-center gap-1">
              <span>{isLoading ? "Вход..." : "Войти"}</span>
            </span>
          </button>
        </form>
      </div>
    </div>
  )
}
