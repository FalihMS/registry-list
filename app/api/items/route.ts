import { NextResponse } from "next/server";

// Import the Firestore library
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { collection, getDocs } from "firebase/firestore"; 
import { Item } from "@/lib/types";

const firebaseConfig = {
  apiKey: "AIzaSyDpP6D-3CYuvvnSbjQU7Bb5PEPB4TNc4s0",
  authDomain: "registry-list.firebaseapp.com",
  projectId: "registry-list",
  storageBucket: "registry-list.appspot.com",
  messagingSenderId: "423592748554",
  appId: "1:423592748554:web:61aa905a9569cdd55ea1f3",
  measurementId: "G-SVFB3Q8207"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    const allDocs: Item[] = [];
    const querySnapshot = await getDocs(collection(db, `registry/gbhVPR3h0N3tx6G7moo2/categories/${id}/items`));
    querySnapshot.forEach((doc) => {
        const { name, brand, amount, link, image } = doc.data()
        allDocs.push({ name, brand, amount, link, image, id: doc.id });
    });
    
    console.log(`allDocs: ${allDocs}`);
    return NextResponse.json({
        data: allDocs
    });
  }