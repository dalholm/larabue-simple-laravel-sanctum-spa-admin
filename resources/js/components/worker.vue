<template>
    <div class="worker" :class="{ 'loading' : loading}"></div>
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
        ...mapState(['appLoading']),
        loading() {
            if (this.appLoading > 0) {
                return true;
            }

            return false;
        }
    },
}
</script>
