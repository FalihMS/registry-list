import { NextResponse } from "next/server";
import { doc, getDoc } from "firebase/firestore"; 
import { initializeFirestore } from "@/lib/utils";

const db = initializeFirestore()

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    const docRef = doc(db, "registry/gbhVPR3h0N3tx6G7moo2/categories/", id + "" );
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());

        const { name, image } = docSnap.data()
        const cat = { name, image, id: docSnap.id }
        return NextResponse.json({
            data:  cat
        });
    } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
        return NextResponse.json({
            data: []
        });
    }
  }