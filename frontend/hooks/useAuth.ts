import { useEffect, useState } from "react";
import { onAuthStateChanged, onIdTokenChanged, User } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { getDoc, doc } from "firebase/firestore";
import { firestore } from "@/lib/firebase";

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Sempre que o token mudar (login, refresh, logout), atualize o localStorage
    const unsubscribeToken = onIdTokenChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const token = await firebaseUser.getIdToken(true); // força refresh
        localStorage.setItem("token", token);

        // Busca o usuário no Firestore para pegar o role correto
        const userDoc = await getDoc(doc(firestore, "users", firebaseUser.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          localStorage.setItem("user", JSON.stringify({
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            role: userData.role,
          }));
        }
        window.dispatchEvent(new Event("userChanged"));
      } else {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        window.dispatchEvent(new Event("userChanged"));
      }
      localStorage.removeItem("userType");
      setUser(firebaseUser);
      setLoading(false);
    });

    return () => {
      unsubscribeToken();
    };
  }, []);

  return { user, loading };
}