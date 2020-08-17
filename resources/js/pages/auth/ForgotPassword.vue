<template>
    <div>
        <div class="container">
            <div class="register">
                <header>
                    <b-icon
                            icon="account"
                    >
                    </b-icon>
                    <h1>{{ $t('app.forgot_password') }}</h1>
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

                            <b-field>
                                <b-button type="is-primary" :loading="loading" expanded native-type="submit">{{$t('app.send')}}</b-button>
                            </b-field>
                        </form>

                        <div class="divider"></div>

                        <p class="has-text-centered"><router-link :to="{name: 'login'}">{{$t('app.login')}}</router-link></p>
                    </template>

                    <div v-else class="has-text-centered">
                        <h4 class="title is-4">{{$t('app.done')}}</h4>
                        <p>{{$t('passwords.sent')}}</p>
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
                loading: false,
                form: new Form(),
            }
        },
        methods: {

            sendResetLink() {
                this.loading = true;
                this.form.post('/api/reset-password').then(response => {
                    this.completed = true;
                    this.loading = false;
                }).catch(error => {
                    this.loading = false;
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
        }
    }
</script>
