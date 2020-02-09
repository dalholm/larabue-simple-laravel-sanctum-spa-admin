<template>
    <div>
        <div class="container">
            <div class="login">
                <header>
                    <b-icon
                        icon="account"
                    >
                    </b-icon>
                    <h1>Welcome Back!</h1>
                </header>
                <section class="main">
                    <b-message type="is-danger" has-icon v-if="error">
                        You have entered an invalid username or password
                    </b-message>

                    <form @submit.prevent="auth">
                        <b-field label="Username">
                            <b-input
                                placeholder="Username"
                                icon="email"
                                v-model="username"
                            ></b-input>
                        </b-field>

                        <b-field label="Password">
                            <b-input
                                type="password"
                                placeholder="Password"
                                icon="lock"
                                v-model="password"
                                password-reveal
                            ></b-input>
                        </b-field>
                        <b-field>
                            <b-button
                                type="is-primary"
                                expanded
                                native-type="submit"
                                :loading="loading"
                            >
                                Sign in
                            </b-button>
                        </b-field>
                    </form>

                    <div class="divider"></div>

                    <p class="is-centered">No account? - <router-link :to="{name: 'register'}">Register</router-link></p>

                </section>

            </div>
        </div>
    </div>

</template>

<script>
export default {
    data() {
        return {
            error: false,
            username: '',
            password: '',
            loading: false,
        }
    },

    methods: {
        auth() {
            this.error = false;

            this.loading = true;

            let self = this;

            this.$store.dispatch('login', {
                username: this.username,
                password: this.password
            }).then(response => {
                this.loading = false;
                this.$router.push({ name: 'dashboard' });
            }).catch(e => {
                this.loading = false;
                self.error = true;
            });
        }
    }
}
</script>
