<template>
    <div>
        <h2 class="title is-2"> My account</h2>
        <router-link :to="{ name: 'profile_settings'}">Settings</router-link>
    </div>
</template>

<script>
export default {
    data() {
        return {

        }
    }
}
</script>