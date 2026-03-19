<script setup>
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

const fetchTøj = async () => {
  const snapshot = await getDocs(collection(db, "Tøj")); // 👈 collection name must match exactly
  const tøj = snapshot.docs.map((doc) => ({
    id: doc.id, // "JCu7sTg5nY0NaOdAXqjw"
    ...doc.data(), // Name: "Grøn Polo T-Shirt", Price: 699
  }));
  console.log(tøj);
};

fetchTøj();
</script>

<template>
  <h1>Hejsa med dejsa</h1>
</template>
