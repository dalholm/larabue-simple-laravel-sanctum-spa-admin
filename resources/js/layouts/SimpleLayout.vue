<template>
    <div class="container">
        <transition
            name="fade"
            mode="out-in"
        >
            <router-view/>
        </transition>
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
