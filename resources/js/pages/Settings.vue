<template>
    <div>
        <section>
            <div class="columns">
                <div class="column">
                    <h1 class="title is-4">{{$t('app.settings')}}</h1>
                </div>
            </div>
        </section>

        <div class="tabs">
            <ul>
                <router-link tag="li" :to="{name: 'users'}" exact><a>
                    {{$t('app.users')}}
                </a></router-link>
                <router-link tag="li" :to="{name: 'roles'}" exact><a>
                    {{$t('app.roles')}}
                </a></router-link>
            </ul>
        </div>
        <router-view></router-view>

    </div>
</template>
<script>
    export default {
        data() {
            return  {
            }
        },
    }
</script>
