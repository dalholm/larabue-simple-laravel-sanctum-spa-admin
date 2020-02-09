<template>
    <div>
        <component v-bind:is="layout"></component>
    </div>
</template>

<script>
    import AppLayout from "./layouts/AppLayout";
    import SimpleLayout from "./layouts/SimpleLayout";
    export default {
        computed: {
            layout () {
                return this.$store.getters.layout
            }
        },
        components: {
            'app-layout': AppLayout,
            'simple-layout': SimpleLayout
            // define as many layouts you want for the application
        }
    }
</script>
