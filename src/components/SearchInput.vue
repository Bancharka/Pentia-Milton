<script setup>
defineProps({
    placeholder: {
        type: String,
        default: 'Søg...',
    },
})




const input = defineModel()
</script>
<template>
    <div class="searchinput">
        <span>
            <img
                src="@/assets/icons/magnifyingglass.svg"
                alt="Forstørrelsesglas"
                class="searchinput__icon"
            />
        </span>
        <input type="text" v-model="input" :placeholder="placeholder" />
    </div>
</template>
