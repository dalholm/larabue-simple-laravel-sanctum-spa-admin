<template>
    <div class="container app">
        <header>
            <div class="navbar">
                <div class="navbar-brand">
                    <div class="logo">
                        <router-link :to="{name: 'dashboard'}">
                            LB
                        </router-link>
                    </div>
                </div>
                <div class="navbar-menu">
                    <ul>
                        <li>
                            <router-link :to="{name: 'forms'}">
                                <i class="mdi mdi-database"></i>
                                Forms
                            </router-link>
                        </li>
                        <li>
                            <router-link :to="{name: 'currencies'}">
                                <i class="mdi mdi-currency-eur"></i>
                                Currencies
                            </router-link>
                        </li>
                    </ul>
                </div>
            </div>
        </header>
        <main>
            <worker-component></worker-component>

            <section class="section main">
                <div class="container">
                    <router-view></router-view>
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
</template>

<script>
import WorkerComponent from "./components/worker";
export default {
    components: {WorkerComponent},
    data() {
        return {

        }
    }
}
</script>
