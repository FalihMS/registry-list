import { clsx, type ClassValue } from "clsx"
import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const firebaseConfig = {
  apiKey: process.env.GOOGLE_API_KEY,
  authDomain: process.env.GOOGLE_AUTH_DOMAIN,
  projectId: process.env.GOOGLE_PROJECT_ID,
  storageBucket: process.env.GOOGLE_STORAGE_BUCKET,
  messagingSenderId: process.env.GOOGLE_MESSAGING_SENDER_ID,
  appId: process.env.GOOGLE_APP_ID,
  measurementId: process.env.GOOGLE_MEASUREMENT_ID,
}

export function initializeFirestore(){
  return getFirestore(initializeApp(firebaseConfig))
}

export function numberToRupiah(amount: number){
  return (amount).toLocaleString('en-US')
}