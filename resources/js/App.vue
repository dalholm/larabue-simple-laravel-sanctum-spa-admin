<template>
    <div>
        <component v-bind:is="layout"></component>
    </div>
</template>

<script>
    import AppLayout from "./layouts/AppLayout";
    import SimpleLayout from "./layouts/SimpleLayout";

    import { mapState } from 'vuex';

    export default {
        computed: mapState(['layout', 'token']),
        components: {
            'app-layout': AppLayout,
            'simple-layout': SimpleLayout
        },
        watch: {
            token(newVal, oldVal) {
                if (!newVal) {
                    this.$router.push({name: 'logout'});
                }
            }
        },
        created() {

        }
    }
</script>
