<template>
    <sidebar v-if="isOpen" :active.sync="isOpen"
             @close="closeSidebar"
             :title="$t('app.user')"
             @confirm="save"
             :loading="loading"
    >
        <form-field :label="$t('app.name')" :form="form" field="name">
            <b-input v-model="form.name"/>
        </form-field>
        <form-field :label="$t('app.email')" :form="form" field="email">
            <b-input v-model="form.email"/>
        </form-field>

        <template v-if="roles.length > 0">
            <div class="divider"></div>
            <h3 class="title is-5">{{$t('app.roles')}}</h3>
            <div class="field" v-for="(role, index) in roles" :key="index">
                <b-checkbox v-model="form.userRoles" :native-value="role.name">
                    {{role.name}}
                </b-checkbox>
            </div>
        </template>

    </sidebar>
</template>
<script>
    import {Form} from 'vform';
    import Sidebar from "../../components/sidebar";

    let inputDefaults = {
        name: '',
        email: '',
        userRoles: [],
    }

    export default {
        name: 'user-form',
        components: {Sidebar},
        props: {
            user: {
                type: Object,
                default: null,
            },
            active: Boolean,
            title: String
        },
        data() {
            return  {
                isOpen: false,
                form: new Form(inputDefaults),
                is_new: true,
                loading: false,
                roles: [],
            }
        },
        watch: {
            active: {
                handler(val) {
                    this.isOpen = val;
                    if (this.isOpen == true) {
                        this.load();
                    }
                }
            },
            user: {
                handler(val) {
                    if (val) {
                        this.form.userRoles = [];
                        Object.keys(val).forEach((key, index) => {
                            this.form[key] = val[key]
                            if (key == 'roles') {
                                for (let i =0; i < val[key].length; i++) {
                                    this.form.userRoles.push(val[key][i].name)
                                }
                            }
                        });
                        this.is_new = false;
                    } else {
                        this.reset();
                    }
                }
            }
        },
        methods: {
            async load() {
                let {data} = await this.axios.get('/api/users/roles');
                this.roles = data;
            },
            closeSidebar() {
                this.isOpen = false;
                this.$emit('close');
                this.reset()
            },
            reset() {
                this.form = new Form(inputDefaults)
                this.is_new = true;
            },
            save() {
                this.loading = true;
                if (this.is_new) {
                    this.form.put('/api/users').then(() => {
                        this.loading = false;
                        this.$successNotification(this.$t('messages.user.new_user_created'));
                        this.closeSidebar();
                    }).catch(e => {
                        this.$errorNotification(this.$t('app.error.general'))
                        this.loading = false;
                    })
                } else {
                    this.form.patch('/api/users/update').then(() => {
                        this.loading = false;
                        this.$successNotification(this.$t('app.saved'));
                        this.$store.dispatch('fetchUser')
                        this.closeSidebar();
                    }).catch(e => {
                        console.log(e);
                        this.$errorNotification(this.$t('app.error.general') + '[1]')
                        this.loading = false;
                    })
                }
            }
        },
        mounted() {
            this.load();
        },
        beforeDestroy() {
            this.closeSidebar();
        }
    }
</script>
