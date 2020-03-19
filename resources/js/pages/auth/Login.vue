<template>
    <div>
        <div class="container">
            <div class="login">
                <header>
                    <b-icon
                        icon="account"
                    >
                    </b-icon>
                    <h1>{{ $t('app.welcome_back') }}</h1>
                </header>
                <section class="main">
                    <b-message type="is-danger" has-icon v-if="error">
                        {{ $t('auth.failed') }}
                    </b-message>

                    <form @submit.prevent="auth">
                        <b-field :label="$t('app.username')">
                            <b-input
                                :placeholder="$t('app.username')"
                                icon="email"
                                v-model="username"
                            ></b-input>
                        </b-field>

                        <b-field :label="$t('app.password')">
                            <b-input
                                type="password"
                                :placeholder="$t('app.password')"
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
                                {{ $t('app.login_button') }}
                            </b-button>
                        </b-field>
                    </form>

                    <div class="divider"></div>

                    <p class="is-centered">{{ $t('app.no_account') }} - <router-link :to="{name: 'register'}">{{ $t('app.register_account') }}</router-link></p>

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
                email: this.username,
                password: this.password
            }).then(response => {
                this.loading = false;
                this.$buefy.snackbar.open("Welcome!");
                this.$router.push({ name: 'dashboard' });
            }).catch(e => {
                this.loading = false;
                self.error = true;
            });
        }
    }
}
</script>
