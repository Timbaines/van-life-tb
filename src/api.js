import { initializeApp } from "firebase/app";
// Real Time Websocket Connection To Database If Changes Are Made, Listeners Can Be Set Up For Updating The Data
import {
    getFirestore,
    collection, doc,
    getDocs,
    getDoc,
    query,
    where
} from "firebase/firestore/lite";

const firebaseConfig = {
    apiKey: "AIzaSyBU4XctK72SRzSCcTvx2huZR6Biv36caA0",
    authDomain: "vanlife-b28aa.firebaseapp.com",
    projectId: "vanlife-b28aa",
    storageBucket: "vanlife-b28aa.appspot.com",
    messagingSenderId: "891630022868",
    appId: "1:891630022868:web:6e9949b958fa9307478b41"
};


const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

const vansCollectionRef = collection(db, "vans")

export async function getVans() {
    const snapshot = await getDocs(vansCollectionRef)
    const vans = snapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
    }))
    return vans
}

export async function getVan(id) {
    const docRef = doc(db, "vans", id)
    const snapshot = await getDoc(docRef)
    return {
        ...snapshot.data(),
        id: snapshot.id
    }
}


export async function getHostVans() {
    const q = query(vansCollectionRef, where("hostId", "==", "123"))
    const snapshot = await getDocs(q)
    const vans = snapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
    }))
    return vans
}

// export async function getHostVans(id) {
//     const url = id ? `/api/host/vans/${id}` : "/api/host/vans"
//     const res = await fetch(url)
//     if (!res.ok) {
//         throw {
//             message: "Failed to fetch vans",
//             statusText: res.statusText,
//             status: res.status
//         }
//     }
//     const data = await res.json()
//     return data.vans
// }

export async function loginUser(creds) {
    const res = await fetch("/api/login",
        { method: "post", body: JSON.stringify(creds) }
    )
    const data = await res.json()

    if (!res.ok) {
        throw {
            message: data.message,
            statusText: res.statusText,
            status: res.status
        }
    }

    return data
}