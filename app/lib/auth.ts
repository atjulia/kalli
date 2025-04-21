import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { FirestoreAdapter } from "@auth/firebase-adapter";
import { db, firebaseCert } from "@/app/lib/firebase";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google],
  adapter: FirestoreAdapter({
    credential: firebaseCert
  }),
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider === "google" && user?.id) {
        try {
          const userRef = db.collection('users').doc(user.id);
          const doc = await userRef.get();
          
          // if (!doc.exists) {
          //   await userRef.set({
          //     userId: user.id,
          //     email: user.email || '',
          //     name: user.name || '',
          //     signupCompleted: false,
          //     createdAt: new Date()
          //   }, { merge: true });
          // }

          const userData = doc.data() || {};
          if (!userData.signupCompleted) {
            return '/signup/complete';
          } else {
            return '/dashboard';
          }
        } catch (error) {
          console.error("Error creating user document:", error);
        }
      }
      return true;
    }
  },
});

export async function getUserById(userId: string) {
  try {
    const docRef = db.collection("users").doc(userId);
    const docSnap = await docRef.get();

    if (!docSnap.exists) {
      return null; // ou lançar erro se preferir
    }

    return docSnap.data();
  } catch (error) {
    console.error("Erro ao buscar usuário:", error);
    throw new Error("Erro ao buscar usuário");
  }
}