<template>
    <div>
        <section>
            <h2 class="title is-2">{{user.name}}</h2>
            <div class="subtitle is-5">{{ $t('app.profile_subtitle') }}</div>

            <p>{{ $t('app.registred') }}: {{user.created_at}}</p>
            <p>{{ $t('app.last_updated') }}: {{user.updated_at}}</p>
            <div class="divider"></div>
        </section>
        <div class="columns" v-if="user">
            <div class="column">
                <h4 class="title is-4">{{ $t('app.update_profile') }}</h4>
                <form method="#" @submit.prevent="updateProfile">
                    <b-field :label="$t('app.name')"
                             :type="{'is-danger': hasError('name')}"
                             :message="errorLabel('name')">
                        <b-input
                            :placeholder="$t('app.name')"
                            icon="account"
                            v-model="form.name"
                        ></b-input>
                    </b-field>

                    <b-field :label="$t('app.email')"
                             :type="{'is-danger': hasError('email')}"
                             :message="errorLabel('email')">
                        <b-input
                            :placeholder="$t('app.email')"
                            icon="email"
                            v-model="form.email"
                        ></b-input>
                    </b-field>

                    <b-field>
                        <b-button
                            type="is-primary"
                            native-type="submit"
                            icon-left="content-save">
                            {{ $t('app.update') }}
                        </b-button>
                    </b-field>
                </form>
            </div>
            <div class="column">
                <section>
                    <h4 class="title is-4">{{ $t('app.update_password') }}</h4>
                    <form @submit.prevent="updatePassword">
                        <b-field :label="$t('app.password')"
                                 :type="{'is-danger': hasError('password')}"
                                 :message="errorLabel('password')">
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
                                 :message="errorLabel('password_confirmation')">
                            <b-input
                                type="password"
                                :placeholder="$t('app.password_confirmation')"
                                icon="lock"
                                password-reveal
                                v-model="form.password_confirmation"
                            ></b-input>
                        </b-field>
                        <b-field>
                            <b-button
                                type="is-primary"
                                native-type="submit"
                                icon-left="content-save">
                                {{ $t('app.update_password') }}
                            </b-button>
                        </b-field>

                    </form>
                </section>
            </div>
        </div>
    </div>
</template>

<script>
import {Form} from "vform";
import {mapState} from "vuex";

export default {
    data() {
        return {
            changePassword: false,
            form: new Form ({
                name: '',
                email: ''
            }),
            password: new Form({
                password: '',
                password_confirmation: '',
            })
        }
    },
    created() {
        this.form.name = this.user.name;
        this.form.email = this.user.email;
    },
    computed: {
        ...mapState(['user']),
    },
    methods: {
        updateProfile() {
            this.form.patch('/api/user').then(response => {
                this.$store.commit('set_user', response.data);
                this.$buefy.snackbar.open("Profile updated");
            }).catch(error => {
                console.log(error);
            });
        },
        updatePassword() {
            this.form.patch('/api/user/password').then(response => {
                this.$buefy.snackbar.open("Password updated");
                this.resetPasswordFields();
            }).catch(error => {
                if (error.response.status === 500) {
                    this.$buefy.snackbar.open({
                        duration: 5000,
                        message: 'Ops! Something went wrong',
                        type: 'is-danger',
                        position: 'is-top',
                        actionText: 'Retry',
                        onAction: () => {
                            this.updatePassword();
                        }
                    })
                }
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
        },
        resetPasswordFields() {
            this.form.password = '';
            this.form.password_confirmation = '';
        }
    }
}
</script>
