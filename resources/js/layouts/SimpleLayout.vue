<template>
    <div class="container">
        <main>
            <transition
                name="fade"
                mode="out-in"
            >
                <router-view/>
            </transition>

        </main>
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
