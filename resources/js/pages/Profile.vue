<template>
    <div>
        <section>
            <h2 class="title is-2">{{user.name}}</h2>
            <div class="subtitle is-5">Profile and settings</div>

            <p>Registred: {{user.created_at}}</p>
            <p>Last updated: {{user.updated_at}}</p>
            <div class="divider"></div>
        </section>
        <div class="columns">
            <div class="column">
                <h4 class="title is-4">Update profile</h4>
                <form method="#" @submit.prevent="updateProfile">
                    <b-field label="Name"
                             :type="{'is-danger': hasError('name')}"
                             :message="errorLabel('name')">
                        <b-input
                            placeholder="Name"
                            icon="account"
                            v-model="form.name"
                        ></b-input>
                    </b-field>

                    <b-field label="Email"
                             :type="{'is-danger': hasError('email')}"
                             :message="errorLabel('email')">
                        <b-input
                            placeholder="Email"
                            icon="email"
                            v-model="form.email"
                        ></b-input>
                    </b-field>

                    <b-field>
                        <b-button
                            type="is-primary"
                            native-type="submit"
                            icon-left="content-save">
                            Update
                        </b-button>
                    </b-field>
                </form>
            </div>
            <div class="column">
                <section>
                    <h4 class="title is-4">Update password</h4>
                    <form @submit.prevent="updatePassword">
                        <b-field label="Password"
                                 :type="{'is-danger': hasError('password')}"
                                 :message="errorLabel('password')">
                            <b-input
                                type="password"
                                placeholder="Password"
                                icon="lock"
                                password-reveal
                                v-model="form.password"
                            ></b-input>
                        </b-field>

                        <b-field label="Repeat password"
                                 :type="{'is-danger': hasError('password_confirmation')}"
                                 :message="errorLabel('password_confirmation')">
                            <b-input
                                type="password"
                                placeholder="Password"
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
                                Update password
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
        const user = this.$store.getters.user;
        this.form.name = user.name;
        this.form.email = user.email;
    },
    computed: {
        user() {
            return this.$store.getters.user;
        }
    },
    methods: {
        updateProfile() {
            this.form.put('/api/user').then(response => {
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
