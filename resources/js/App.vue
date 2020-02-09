<template>
    <div>
        <component v-bind:is="layout"></component>
    </div>
</template>

<script>
    import AppLayout from "./layouts/AppLayout";
    import SimpleLayout from "./layouts/SimpleLayout";

    import { mapState } from 'vuex';

    export default {
        computed: mapState(['layout', "expires"]),
        components: {
            'app-layout': AppLayout,
            'simple-layout': SimpleLayout
        },
        watch: {
            expires(newValue) {
                if (newValue <= 0) {
                    this.$router.push({name: 'logout'});
                }
                if (newValue > 0) {
                    this.timer();
                }
            },
        },
        methods: {
          timer() {
              if (!this.$store.getters.expiresTimerRunning &&
                  this.$store.getters.token
              ) {
                  this.$store.commit('start_timer', true);
                  var expiresTimer = setInterval(() => {
                      this.$store.dispatch('countdown');
                      console.log(new Date());
                      if (this.$store.getters.expires <= 0) {
                          this.$store.commit('start_timer', false);
                          clearInterval(expiresTimer);
                      }
                  }, this.$store.getters.timerInterval)
              }
          }
        },
        created() {
            this.timer();
        }
    }
</script>
