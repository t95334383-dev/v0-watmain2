"use client"

import { useState, useEffect } from "react"
import MobileLayout from "@/components/mobile-layout"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { X } from "lucide-react"

export default function Profile() {
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [tokenName, setTokenName] = useState("")
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false)
  const [apiTokens, setApiTokens] = useState<Array<{ id: string; name: string; created_at: string; token: string }>>([])
  const [generatedToken, setGeneratedToken] = useState<string>("")
  const [showGeneratedToken, setShowGeneratedToken] = useState(false)
  const [showPasswordError, setShowPasswordError] = useState(false)
  const [showTwoFactorError, setShowTwoFactorError] = useState(false)

  useEffect(() => {
    const username = sessionStorage.getItem("username")
    if (username) {
      const savedTokens = localStorage.getItem(`apiTokens_${username}`)
      if (savedTokens) {
        try {
          const tokens = JSON.parse(savedTokens)
          setApiTokens(tokens)
        } catch (error) {
          console.error("Error loading tokens:", error)
        }
      }
    }
  }, [])

  useEffect(() => {
    const username = sessionStorage.getItem("username")
    if (username && apiTokens.length > 0) {
      localStorage.setItem(`apiTokens_${username}`, JSON.stringify(apiTokens))
    }
  }, [apiTokens])

  const handleCreateToken = async () => {
    if (!tokenName.trim()) {
      alert("Пожалуйста, введите имя токена")
      return
    }

    try {
      // Генерируем токен (в реальном приложении это должно происходить на сервере)
      const newToken = `${Date.now()}|${Math.random().toString(36).substring(2, 15)}${Math.random()
        .toString(36)
        .substring(2, 15)}`

      // Добавляем токен в список
      const newApiToken = {
        id: Date.now().toString(),
        name: tokenName,
        created_at: new Date().toISOString(),
        token: newToken,
      }

      setApiTokens((prev) => [newApiToken, ...prev])
      setGeneratedToken(newToken)
      setShowGeneratedToken(true)
      setTokenName("")
    } catch (error) {
      console.error("Error creating token:", error)
      alert("Произошла ошибка при создании токена")
    }
  }

  const handleDeleteToken = (tokenId: string) => {
    const updatedTokens = apiTokens.filter((t) => t.id !== tokenId)
    setApiTokens(updatedTokens)

    const username = sessionStorage.getItem("username")
    if (username) {
      if (updatedTokens.length === 0) {
        localStorage.removeItem(`apiTokens_${username}`)
      } else {
        localStorage.setItem(`apiTokens_${username}`, JSON.stringify(updatedTokens))
      }
    }
  }

  const handleUpdatePassword = () => {
    setShowPasswordError(true)
  }

  const handleEnableTwoFactor = () => {
    setShowTwoFactorError(true)
  }

  return (
    <MobileLayout title="Мой Профиль">
      {/* Password Section */}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-2">Пароль</h2>
        <p className="text-gray-400 text-sm mb-6">Должно быть минимум 8 символов.</p>

        <div className="bg-[#1a2332] p-6 rounded-lg">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Новый пароль <span className="text-red-500">*</span>
              </label>
              <Input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="bg-[#2a3441] border-0 text-white rounded-lg"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Подтверждение пароля <span className="text-red-500">*</span>
              </label>
              <Input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="bg-[#2a3441] border-0 text-white rounded-lg"
              />
            </div>

            <div className="flex justify-end">
              <Button onClick={handleUpdatePassword} className="bg-amber-600 hover:bg-amber-700 text-white rounded-lg">
                Обновить
              </Button>
            </div>

            {showPasswordError && <div className="text-red-500 text-sm mt-2 text-right">Токен не активен.</div>}
          </div>
        </div>
      </div>

      {/* Two-Factor Authentication */}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-2">Двухфакторная аутентификация</h2>
        <p className="text-gray-400 text-sm mb-6">
          Управление двухфакторной аутентификацией для вашей учетной записи (рекомендуется)
        </p>

        <div className="bg-[#1a2332] p-6 rounded-lg">
          <h3 className="text-lg font-bold mb-2">Вы не включили двухфакторную аутентификацию</h3>
          <p className="text-gray-400 text-sm mb-6">
            Если включена двухфакторная аутентификация, вам будет предложено ввести безопасный токен во время
            аутентификации. Вы можете получить этот токен из Google Authenticator
          </p>

          <div className="flex justify-end">
            <Button
              onClick={handleEnableTwoFactor}
              className="bg-amber-600 hover:bg-amber-700 text-white rounded-lg flex items-center gap-2"
            >
              <span>✓</span>
              Включить
            </Button>
          </div>

          {showTwoFactorError && <div className="text-red-500 text-sm mt-2 text-right">Токен не активен.</div>}
        </div>
      </div>

      {/* API Tokens */}
      <div>
        <h2 className="text-xl font-bold mb-2">API Токены</h2>
        <p className="text-gray-400 text-sm mb-6">
          Ваш токен отображается один раз при создании. Если вы потеряете свой токен, вам нужно будет удалить его и
          создать новый
        </p>

        {showGeneratedToken && (
          <div className="bg-[#1a2332] border border-gray-600 p-4 rounded-xl mb-6">
            <div className="bg-gray-900 p-3 rounded border">
              <input
                type="text"
                disabled
                value={generatedToken}
                className="w-full bg-gray-900 border-gray-700 text-gray-300 rounded-lg px-3 py-2 text-sm cursor-default"
              />
            </div>
          </div>
        )}

        <div className="bg-[#1a2332] p-6 mb-6 rounded-lg">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Имя токена <span className="text-red-500">*</span>
              </label>
              <Input
                type="text"
                value={tokenName}
                onChange={(e) => setTokenName(e.target.value)}
                className="bg-[#2a3441] border-0 text-white rounded-lg"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Доступ <span className="text-red-500">*</span>
              </label>
              <div className="flex items-center space-x-2">
                <Checkbox id="all" defaultChecked />
                <label htmlFor="all" className="text-sm">
                  all
                </label>
              </div>
            </div>

            <div className="flex justify-end">
              <Button onClick={handleCreateToken} className="bg-amber-600 hover:bg-amber-700 text-white rounded-lg">
                Создать
              </Button>
            </div>
          </div>
        </div>

        {/* Token List */}
        <div className="bg-[#1a2332] p-6 rounded-lg">
          <div className="mb-6">
            <input
              type="text"
              placeholder="Поиск"
              className="w-full bg-[#2a3441] border-0 rounded-lg px-4 py-3 text-white placeholder-gray-400"
            />
          </div>

          {apiTokens.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 rounded-full bg-[#2a3441] flex items-center justify-center mx-auto mb-4">
                <X className="text-amber-500" size={24} />
              </div>
              <p className="text-white text-lg">Не найдено записей</p>
            </div>
          ) : (
            <div className="space-y-3">
              {apiTokens.map((token) => (
                <div key={token.id} className="bg-[#2a3441] p-4 rounded-lg flex justify-between items-center">
                  <div>
                    <h3 className="text-white font-medium">{token.name}</h3>
                    <p className="text-gray-400 text-sm">
                      Создан: {new Date(token.created_at).toLocaleString("ru-RU")}
                    </p>
                  </div>
                  <button
                    onClick={() => handleDeleteToken(token.id)}
                    className="text-red-400 hover:text-red-300 transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </MobileLayout>
  )
}
