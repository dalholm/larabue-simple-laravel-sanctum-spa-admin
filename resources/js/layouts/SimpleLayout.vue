<template>
    <div class="container">
        <worker-component></worker-component>
        <transition
            name="fade"
            mode="out-in"
        >
            <router-view/>
        </transition>
    </div>
</template>

<script>
    import WorkerComponent from '../components/worker'
    export default {
        components: {WorkerComponent},
        data() {
            return {

            }
        }
    }
</script>
