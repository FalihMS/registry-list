import { NextResponse } from "next/server";
import { initializeFirestore } from "@/lib/utils";

import { doc, getDoc } from "firebase/firestore"; 

const db = initializeFirestore()

export async function GET() {

    const docRef = doc(db, "registry/gbhVPR3h0N3tx6G7moo2");
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        return NextResponse.json({
            data:  docSnap.data()
        });
    } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
        return NextResponse.json({
            data: []
        });
    }
 }