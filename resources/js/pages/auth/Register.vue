<template>
    <div>
        <div class="container">
            <div class="register">
                <header>
                    <b-icon
                        icon="account"
                    >
                    </b-icon>
                    <h1>Register</h1>
                </header>
                <section class="main" v-if="!registered">
                    <p>Become one of us, register today.</p>
                    <div class="divider"></div>
                    <form method="#" @submit.prevent="register">
                        <b-field label="Name"
                                 :type="{'is-danger': hasError('name')}"
                                 :message="errorLabel('name')"
                        >
                            <b-input
                                placeholder="Name"
                                icon="account"
                                v-model="form.name"
                            ></b-input>
                        </b-field>
                        <b-field label="Email"
                                 :type="{'is-danger': hasError('email')}"
                                 :message="errorLabel('email')"
                        >
                            <b-input
                                placeholder="Email"
                                icon="email"
                                v-model="form.email"
                            ></b-input>
                        </b-field>

                        <b-field label="Password"
                                 :type="{'is-danger': hasError('password')}"
                                 :message="errorLabel('password')"
                        >
                            <b-input
                                type="password"
                                placeholder="Password"
                                icon="lock"
                                password-reveal
                                v-model="form.password"

                            ></b-input>
                        </b-field>
                        <b-field>
                            <b-button type="is-primary" expanded native-type="submit">Register</b-button>
                        </b-field>
                    </form>

                    <div class="divider"></div>

                    <p class="is-centered">Already have an account? - <router-link :to="{name: 'login'}">Sign in</router-link></p>

                </section>

                <section class="main" v-else>
                    <h4 class="title is-center is-4">You are now registered!</h4>
                    <p>You can sign in here:
                    <router-link :to="{name:'login'}">Sign in</router-link>
                    </p>
                </section>

            </div>
        </div>
    </div>

</template>

<script>
    import { Form } from 'vform'

    export default {
        data() {
            return {
                registered: false,
                form: new Form ({
                    name: '',
                    email: '',
                    password: ''
                }),
            }
        },
        methods: {
            register() {
                this.form.post('/api/register', this.form).then(response => {
                    this.registered = true;
                }).catch(error => {
                    console.log(error);
                });

            },

            errorLabel(field) {
                if (this.hasError(field)) {
                    return this.form.errors.get(field)
                }
                return '';
            },
            hasError(field) {
                return this.form.errors.has(field);
            }
        }
    }
</script>
