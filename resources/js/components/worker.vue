<template>
    <div class="worker" :class="{ 'loading' : isLoading || applicationLoading}"></div>
</template>

<script>
    import { mapState } from 'vuex';
export default {
    name: 'worker-component',
    data() {
        return {

        }
    },
    computed: {
        ...mapState(['isLoading', 'applicationLoading'])
    },
}
</script>
