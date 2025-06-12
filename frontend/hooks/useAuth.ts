import { useEffect, useState } from "react"
import { onAuthStateChanged, User } from "firebase/auth"
import { auth } from "@/lib/firebase"
import { getDoc, doc } from "firebase/firestore"
import { firestore } from "@/lib/firebase" 

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser)
      setLoading(false)

      if (firebaseUser) {
        // Busca o usuário no Firestore para pegar o role correto
        const userDoc = await getDoc(doc(firestore, "users", firebaseUser.uid))
        if (userDoc.exists()) {
          const userData = userDoc.data()
          localStorage.setItem("user", JSON.stringify({
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            role: userData.role,
          }))
        }

        window.dispatchEvent(new Event("userChanged"));
      } else {
        localStorage.removeItem("user")
        window.dispatchEvent(new Event("userChanged"));
      }
      // Sempre remova o userType antigo
      localStorage.removeItem("userType")
    })

    return () => unsubscribe()
  }, [])

  return { user, loading }
}