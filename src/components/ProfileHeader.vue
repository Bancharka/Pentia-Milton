<script setup>
import { ref, onMounted } from "vue";
import { auth, db, storage } from "@/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";
import { onAuthStateChanged } from "firebase/auth";
import defaultImg from "@/assets/img/builder.png";

const name = ref("");
const email = ref("");
const profileImage = ref(defaultImg);
const fileInput = ref(null);

onMounted(() => {
    onAuthStateChanged(auth, async (user) => {
        if (!user) return;

        email.value = user.email;

        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
            name.value = userDoc.data().name ?? "";
            profileImage.value = userDoc.data().profileImage ?? defaultImg;
        }
    });
});

async function handleImageChange(event) {
    const file = event.target.files[0];
    if (!file) return;

    const user = auth.currentUser;

    // upload to storage
    const imageRef = storageRef(storage, `profileImages/${user.uid}`);
    await uploadBytes(imageRef, file);
    const imageUrl = await getDownloadURL(imageRef);

    // save URL to users collection
    await updateDoc(doc(db, "users", user.uid), {
        profileImage: imageUrl
    });

    profileImage.value = imageUrl;
}
</script>
<template>
  <div class="profile-header">
    <div class="profile-header__imagecontainer" @click="fileInput.click()">
      <img class="profile-header__img" :src="profileImage" alt="Profilbillede" />
        <div class="profile-header__overlay">
          <img class="profile-header__change-img" src="@/assets/icons/changeimg.svg" alt="Skift billede">
        </div>
      <input ref="fileInput" type="file" accept="image/*" style="display: none" @change="handleImageChange">
    </div>
    <div class="profile-header__text">
      <h3>{{ name }}</h3>
      <p>{{ email }}</p>
    </div>
  </div>
</template>
