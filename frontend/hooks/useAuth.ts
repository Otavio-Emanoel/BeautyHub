import { useEffect, useState } from "react"
import { onAuthStateChanged, User } from "firebase/auth"
import { auth } from "@/lib/firebase"

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser)
      setLoading(false)

      if (firebaseUser) {
        const userData = {
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          role: "client", // ajuste conforme necessário
        }
        localStorage.setItem("user", JSON.stringify(userData))
      } else {
        localStorage.removeItem("user")
      }
    })

    return () => unsubscribe()
  }, [])

  return { user, loading }
}