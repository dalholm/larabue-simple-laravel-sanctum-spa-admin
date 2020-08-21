<template>
    <div>
        <section>
            <div class="columns is-mobile">
                <div class="column">
                    <b-field>
                        <b-input placeholder="Sök"
                                 v-debounce:500ms="load"
                                 v-model="search"
                                 icon-right="close-circle"
                                 icon-right-clickable
                                 @icon-right-click="clearSearch"
                        />
                    </b-field>

                </div>
                <div class="column">
                    <b-button @click="newUser"
                              :label="$t('app.user')"
                              icon-left="plus-circle"
                              type="is-primary"
                              class="is-pulled-right"
                    />
                </div>
            </div>
            <b-field>

            </b-field>

        </section>
        <section>
            <b-table
                    :data="users"
                    @page-change="onPageChange"
                    hoverable
                    :total="total"
                    :per-page="perPage"
                    :mobile-cards="false"
                    paginated
                    backend-pagination
                    backend-filtering
                    backend-sorting
                    @sort="onSort"
            >
                <b-table-column field="name" :label="$t('app.name')" v-slot="props">
                    {{ props.row.name }}
                </b-table-column>
                <b-table-column field="email" :label="$t('app.email')" v-slot="props">
                    {{ props.row.email }}
                </b-table-column>
                <b-table-column v-slot="props" numeric>
                    <b-button size="is-small" icon-left="pencil"
                              @click="selected = props.row"
                    />
                    <b-button size="is-small" icon-left="delete" type="is-danger"
                              @click="deleteUser(props.row)"
                    />
                </b-table-column>
            </b-table>
        </section>
        <user-form
                :active.sync="is_open"
                @close="closeUser"
                :title="$t('app.user')"
                :user.sync="selected"
        />
    </div>

</template>
<script>
    import Sidebar from "../../components/sidebar";
    import UserForm from "./UserForm";

    export default {
        components: {Sidebar, UserForm},
        data() {
            return {
                is_open: false,
                users: [],
                selected: null,
                activeTab: 0,

                // table
                search: '',
                total: 0,
                sortField: 'name',
                sortOrder: 'desc',
                page: 1,
                perPage: 25,
            }
        },
        methods: {
            async load() {
                try {
                    let {data} = await this.axios.post('/api/users', {
                        page: this.page,
                        per_page: this.perPage,
                        sort: {
                            field: this.sortField,
                            order: this.sortOrder,
                        },
                        search: this.search,
                    });
                    this.users = data.data;
                    this.total = data.total;
                } catch (e) {
                    this.$buefy.notification.open({
                        message: this.$t('app.error.general'),
                        type: 'is-danger'
                    })
                }
            },
            closeUser() {
                this.selected = null;
                this.is_open = false;
                this.load();
            },
            newUser() {
                this.is_open = true;
            },
            onPageChange(page) {
                this.page = page;
                this.load();
            },
            onSort(field, order) {
                this.sortField = field;
                this.sortOrder = order;
                this.load();
            },
            clearSearch() {
                this.search = '';
                this.load();
            },
            deleteUser(row) {
                this.$buefy.dialog.confirm({
                    title: this.$t('app.delete.title'),
                    message: this.$t('app.delete.message'),
                    confirmText: this.$t('app.delete.button'),
                    type: 'is-danger',
                    hasIcon: true,
                    onConfirm: () => {
                        this.axios.delete(`/api/users/${row.id}`).then(() => {
                            this.$successNotification(this.$t('app.deleted'))
                            this.load();
                        }).catch(() => {
                            this.$errorNotification(this.$t('app.error.general'));
                        })
                    }
                })

            }
        },
        watch: {
            selected(val) {
                if (val != null) {
                    this.is_open = true;
                }
            }
        },
        mounted() {
            this.load();
        }
    }
</script>
