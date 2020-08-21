<template>
    <div v-if="user">
        <worker-component></worker-component>
        <div class="screen-lock" :class="{ 'lock' : appLoading}"></div>
        <header>
            <div class="navbar is-fixed-top" role="navigation" aria-label="main navigation">
                <div class="navbar-brand">
                    <div class="navbar-item logo">
                        <router-link :to="{name: 'dashboard'}">
                            LOGO
                        </router-link>
                    </div>
                    <a role="button" class="navbar-burger burger"
                       aria-label="menu"
                       aria-expanded="false"
                       @click="appMenuOpen = !appMenuOpen"
                    >
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                    </a>
                </div>
                <div class="navbar-menu" :class="{ 'is-active' : appMenuOpen }">
                    <router-link :to="{name: 'dashboard'}" class="navbar-item route">
                        <i class="mdi mdi-monitor-dashboard"></i>
                        {{$t('app.dashboard')}}
                    </router-link>

                    <div class="navbar-end">
                        <b-dropdown
                            class="profile"
                            position="is-bottom-left"
                            aria-role="menu"
                            v-if="user"
                        >
                            <a
                                class="navbar-item"
                                slot="trigger"
                                role="button">
                                <span>{{user.name}}</span>
                                <b-icon icon="menu-down"></b-icon>
                            </a>

                            <b-dropdown-item has-link>
                                <router-link :to="{name: 'profile'}">
                                    <b-icon icon="account"></b-icon>
                                    {{ $t('app.profile') }}
                                </router-link>
                            </b-dropdown-item>

                            <b-dropdown-item has-link>
                                <router-link :to="{name: 'settings'}" v-if="user.has_role['admin']">
                                    <b-icon icon="application-cog"></b-icon>
                                    {{ $t('app.settings') }}
                                </router-link>
                            </b-dropdown-item>

                            <hr class="dropdown-divider">
                            <b-dropdown-item has-link>
                                <router-link :to="{name: 'logout'}">
                                    <b-icon icon="logout"></b-icon>
                                    {{ $t('app.logout') }}
                                </router-link>
                            </b-dropdown-item>
                        </b-dropdown>
                    </div>
                </div>


            </div>
        </header>
        <div class="container app">
            <main>
                <section class="section main">
                    <breadcrumb/>
                    <div class="container">
                        <transition
                            name="fade"
                            mode="out-in"
                        >
                            <router-view/>
                        </transition>

                    </div>
                </section>

            </main>

            <footer class="footer">
                <div class="content has-text-centered">
                    <p>
                        <strong>Larabue</strong> by <a href="http://dalholm.se/">Mikael Dalholm</a>. The source code is licensed
                        <a href="http://opensource.org/licenses/mit-license.php">MIT</a>.
                    </p>
                </div>
            </footer>
        </div>

    </div>
</template>

<script>
    import WorkerComponent from '../components/worker'
    import Breadcrumb from "../components/breadcrumb";
    import {mapState} from "vuex";
    export default {
        components: {Breadcrumb, WorkerComponent},
        data() {
            return {
                appMenuOpen: false,
            }
        },
        computed: {
            ...mapState(['user', 'appLoading']),
        },
        mounted() {
            //console.log(JSON.parse(this.user));
        }
    }
</script>
