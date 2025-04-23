import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { FirestoreAdapter } from "@auth/firebase-adapter";
import { db, firebaseCert } from "@/app/lib/firebase";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google],
  adapter: FirestoreAdapter({
    credential: firebaseCert
  }),
});

export async function getUserById(userId: string) {
  try {
    const docRef = db.collection("users").doc(userId);
    const docSnap = await docRef.get();

    if (!docSnap.exists) {
      return null
    }

    return docSnap.data();
  } catch (error) {
    console.error("Erro ao buscar usuário:", error);
    throw new Error("Erro ao buscar usuário");
  }
}