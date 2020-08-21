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
        computed: mapState(['layout']),
        components: {
            'app-layout': AppLayout,
            'simple-layout': SimpleLayout
        },
        watch: {

        },
        created() {

        }
    }
</script>
