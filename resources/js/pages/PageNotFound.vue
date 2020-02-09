<template>
    <div>
        <section class="section is-medium">
            <div class="container">
                <div class="columns is-vcentered">
                    <div class="column has-text-centered">
                        <h1 class="title">404 Page Not Found</h1>
                        <p class="subtitle">An unexpected error has occurred. Please contact the site owner if this is unexpected.</p>
                        <b-button
                            @click="$router.go(-1)"
                            type="is-primary">
                            Go back
                        </b-button>

                    </div>
                    <div class="column has-text-centered">
                        <img src="/img/404-robot.gif" />
                    </div>
                </div>
            </div>
        </section>
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
