<template>
    <sidebar v-if="isOpen" :active.sync="isOpen"
             @close="closeSidebar"
             :title="$t('app.role')"
             @confirm="save"
             :loading="loading"
    >
        <form-field :label="$t('app.name')" :form="form" field="name">
            <b-input v-model="form.name"/>
        </form-field>
    </sidebar>
</template>
<script>
    import {Form} from 'vform';
    import Sidebar from "../../components/sidebar";

    let inputDefaults = {
        name: '',
    }

    export default {
        name: 'role-form',
        components: {Sidebar},
        props: {
            role: {
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
            }
        },
        watch: {
            active: {
                handler(val) {
                    this.isOpen = val;
                }
            },
            role: {
                handler(val) {
                    if (val) {
                        Object.keys(val).forEach((key, index) => {
                            this.form[key] = val[key]
                        });
                        this.is_new = false;
                    } else {
                        this.reset();
                    }
                }
            }
        },
        methods: {
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
                    this.form.put('/api/users/roles').then(() => {
                        this.loading = false;
                        this.$successNotification(this.$t('app.saved'));
                        this.closeSidebar();
                    }).catch(e => {
                        this.$errorNotification(this.$t('app.error.general'))
                        this.loading = false;
                    })
                } else {
                    this.form.patch('/api/users/roles').then(() => {
                        this.loading = false;
                        this.$successNotification(this.$t('app.saved'));
                        this.closeSidebar();
                    }).catch(e => {
                        console.log(e);
                        this.$errorNotification(this.$t('app.error.general'))
                        this.loading = false;
                    })
                }
            }
        },
        mounted() {
        },
        beforeDestroy() {
            this.closeSidebar();
        }
    }
</script>
