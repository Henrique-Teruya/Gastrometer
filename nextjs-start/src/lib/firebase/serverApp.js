// src/lib/firebase/serverApp.js
import { initializeServerApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { cookies } from "next/headers";
// Importando o objeto que acabamos de criar
import { firebaseConfig } from "./config";

export async function getAuthenticatedAppForUser() {
  const authIdToken = (await cookies()).get("__session")?.value;

  console.log("DEBUG - API KEY EXISTE?:", !!firebaseConfig.apiKey);
  console.log("DEBUG - PROJECT ID:", firebaseConfig.projectId);

  const firebaseServerApp = initializeServerApp(
    firebaseConfig, // Agora o Firebase sabe qual projeto usar!
    {
      authIdToken,
    }
  );

  const auth = getAuth(firebaseServerApp);
  await auth.authStateReady();

  return { firebaseServerApp, currentUser: auth.currentUser };
}