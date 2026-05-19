/**
 * @component LoginInput
 * @description Renders a login form with email and password fields.
 * Validates inputs, authenticates via Firebase, loads the user store,
 * and redirects based on whether the logged-in user is a customer or employee.
 * Displays inline validation errors and a wrong credentials error if login fails.
 *
 * @requires firebase/auth - signInWithEmailAndPassword
 * @requires stores/userStore - loads user data post-login and checks customer status
 */
 <script setup>
import { reactive, ref } from 'vue'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '@/firebase'
import BaseButton from './BaseButton.vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/userStore'
const email = ref('')
const password = ref('')
const errors = reactive({email:'', password:''})
const router = useRouter()
const userStore = useUserStore()
/**
 * @function validate
 * @description Validates that both email and password fields are non-empty.
 * Clears previous errors before each validation run.
 * @returns {boolean} True if both fields are filled, false otherwise
 */
function validate() {
    errors.email=''
    errors.password=''
    errors.wrongEmailOrPassword=''
    let valid = true
    if (!email.value) {
        errors.email = 'Email mangler!'
        valid=false
    }
    if (!password.value) {
        errors.password = 'Kodeord mangler!'
        valid=false
    }
    return valid
}
/**
 * @function submitLogin
 * @async
 * @description Validates the form, then attempts Firebase email/password sign-in.
 * On success, loads the user store and redirects:
 * - customers → `/home-customer`
 * - employees → `/overview`
 * - incomplete profiles → shows an alert to contact customer service
 *
 * On failure, sets a wrong credentials error if the email or password is incorrect.
 * @returns {Promise<void>}
 */
const submitLogin = async () => {
    if (!validate()) return
    try {
        //Her loader vi userStoren, i stedet for onMounted, for at få informationen kommer ind i storen tilsvarende den user der logger ind, da den ellers aldrig vil få informationen
        await signInWithEmailAndPassword(auth, email.value, password.value)
        await userStore.loadUser()
        if(userStore.userData?.customer === true){
            router.push('/home-customer')}
        else if(userStore.userData?.customer === false) {
            router.push('/overview')
        }
        else {
            window.alert('Din profil er ikke færdigt oprettet i systemet, venligts kontakt kundeservice')
        }
    }
    catch (err) {
        if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password') {
            errors.wrongEmailOrPassword ='Forkert brugernavn eller adgangskode'
        }
    };
}
</script>
<template>
    <form @submit.prevent="submitLogin" class="login">
        <span v-if="errors.wrongEmailOrPassword" class="login__error"> {{ errors.wrongEmailOrPassword }}</span>
        <span v-if="errors.email" class="login__error"> {{ errors.email }}</span>
        <div :class="{'login__field--error': errors.email}" class="login__field">
            <span class="login__icon">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    stroke="#004552"
                    fill="none"
                    width="20"
                    height="20"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
                    />
                </svg>
            </span>
            <input  type="email" placeholder="Email" v-model="email" >
        </div>
        <span v-if="errors.password" class="login__error"> {{ errors.password }}</span>
        <div :class="{'login__field--error': errors.password}" class="login__field">
            <span class="login__icon">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    stroke="#004552"
                    fill="none"
                    width="20"
                    height="20"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M15.75 5.25a3 3 0 0 1 3 3m3 0a6 6 0 0 1-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1 1 21.75 8.25Z"
                    />
                </svg>
            </span>
            <input  type="password" placeholder="Adgangskode" v-model="password" >
        </div>
        <BaseButton type="submit" variant="outlinewhite" text="Log ind" />
    </form>
</template>
