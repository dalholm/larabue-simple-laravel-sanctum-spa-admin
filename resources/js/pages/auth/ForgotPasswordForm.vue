<template>
    <div>
        <div class="container">
            <div class="register">
                <header>
                    <b-icon
                            icon="account"
                    >
                    </b-icon>
                    <h1>{{ $t('app.change_password') }}</h1>
                </header>
                <section class="main" >

                    <template v-if="!completed">
                        <form method="#" @submit.prevent="sendResetLink">
                            <b-field :label="$t('app.email')"
                                     :type="{'is-danger': hasError('email')}"
                                     :message="errorLabel('email')"
                            >
                                <b-input
                                        :placeholder="$t('app.email')"
                                        icon="email"
                                        v-model="form.email"
                                ></b-input>
                            </b-field>

                            <b-field :label="$t('app.password')"
                                     :type="{'is-danger': hasError('password')}"
                                     :message="errorLabel('password')"
                            >
                                <b-input
                                        type="password"
                                        :placeholder="$t('app.password')"
                                        icon="lock"
                                        password-reveal
                                        v-model="form.password"

                                ></b-input>
                            </b-field>
                            <b-field :label="$t('app.password_confirmation')"
                                     :type="{'is-danger': hasError('password_confirmation')}"
                                     :message="errorLabel('password_confirmation')"
                            >
                                <b-input
                                        type="password"
                                        :placeholder="$t('app.password_confirmation')"
                                        icon="lock"
                                        password-reveal
                                        v-model="form.password_confirmation"

                                ></b-input>
                            </b-field>

                            <b-button type="is-primary" expanded native-type="submit">{{$t('app.change_password')}}</b-button>
                        </form>

                        <div class="divider"></div>

                        <p class="is-centered"><router-link :to="{name: 'login'}">{{$t('app.login')}}</router-link></p>
                    </template>

                    <div v-else class="has-text-centered">
                        <h4 class="title is-4">{{$t('app.done')}}!</h4>
                        <p>{{$t('passwords.reset')}}</p>
                        <div class="divider"></div>
                        <b-button tag="router-link" :to="{name:'login'}" :label="$t('app.login')" type="is-primary" icon-left="account-key"/>
                    </div>
                </section>
            </div>
        </div>
    </div>
</template>
<script>
    import { Form } from 'vform'
    export default {
        data() {
            return  {
                completed: false,
                form: new Form({
                    token: '',
                    email: '',
                    password: '',
                    password_confirmation: '',
                }),
            }
        },
        methods: {
            sendResetLink() {
                this.form.post('/api/reset/password').then(response => {
                    this.completed = true;
                })

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
        },
        mounted() {
            this.form.token = this.$route.params.token;
        }
    }
</script>
