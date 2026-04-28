<script setup>
import BottomNav from "@/components/BottomNav.vue";
import Header from "@/components/Header.vue";
import ProgressBar from "@/components/ProgressBar.vue";

import { getAuth } from "firebase/auth";

const auth = getAuth();
const user = auth.currentUser;


if (user !== null) {
  user.providerData.forEach((profile) => {
    console.log("Sign-in provider: " + profile.providerId);
    console.log("  Provider-specific UID: " + profile.uid);
    console.log("  Name: " + profile.displayName);
    console.log("  Email: " + profile.email);
    console.log("  Photo URL: " + profile.photoURL);
  });
}

</script>

<template>
  <div class="page-container">
    <Header />
  
  
  <ProgressBar/>
  <BottomNav />
  </div>  
  
</template>
