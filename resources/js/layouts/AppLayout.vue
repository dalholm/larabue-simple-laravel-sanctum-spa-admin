<template>
    <div class="container app">
        <header>
            <div class="navbar" role="navigation" aria-label="main navigation">
                <div class="navbar-brand">
                    <div class="logo">
                        <router-link :to="{name: 'dashboard'}">
                            D
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
                        Dashboard
                    </router-link>
                    <router-link :to="{name: 'profile'}" class="navbar-item route">
                        <i class="mdi mdi-account"></i>
                        Profile
                    </router-link>

                    <div class="navbar-end">
                        <b-dropdown
                            class="profile"
                            position="is-bottom-left"
                            aria-role="menu">
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
                                    Profile
                                </router-link>
                            </b-dropdown-item>
                            <hr class="dropdown-divider">
                            <b-dropdown-item has-link>
                                <router-link :to="{name: 'logout'}">
                                    <b-icon icon="logout"></b-icon>
                                    Logout
                                </router-link>
                            </b-dropdown-item>
                        </b-dropdown>
                    </div>
                </div>


            </div>
        </header>
        <main>
            <worker-component></worker-component>
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
                <p>Session expires in: {{ expires }}</p>
            </div>
        </footer>

    </div>
</template>

<script>
    import WorkerComponent from '../components/worker'
    import Breadcrumb from "../components/breadcrumb";
    export default {
        components: {Breadcrumb, WorkerComponent},
        data() {
            return {
                appMenuOpen: false,
            }
        },
        computed: {
            expires() {
                return this.$store.getters.expireString;
            },
            user() {
                return this.$store.getters.user || 'no one';
            }
        }
    }
</script>
