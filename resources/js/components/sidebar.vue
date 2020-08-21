<template>
    <div class="quickview-wrapper" v-if="isOpen">
        <div class="quickview-overlay"></div>

        <div class="quickview" :class="[open ? 'is-active' : '', size ]">
            <header class="quickview-header">
                <p class="title">{{ title }}</p>
                <span class="delete" @click="close"></span>
            </header>

            <div class="quickview-body">
                <div class="quickview-block">
                    <slot/>
                </div>
            </div>

            <footer class="quickview-footer" v-if="footer">
                <template v-if="!hasFooterSlot">
                    <b-button @click="close">{{$t('app.cancel')}}</b-button>
                    <b-button type="is-primary" :loading="loading" @click="confirm">{{$t('app.save')}}</b-button>
                </template>
                <template v-else>
                    <slot name="footer"/>
                </template>
            </footer>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'sidebar',
        props: {
            active: {
                type: Boolean,
                default: false,
            },
            footer: {
                type: Boolean,
                default: true,
            },
            title: {
                type: String,
                default: '',
            },
            confirmText: {
                type: String,
                default: 'OK'
            },
            cancelText: {
                type: String,
                default: 'Avbryt'
            },
            size: {
                type: String,
                default: ''
            },
            loading: Boolean
        },
        watch: {
            active: {
                handler(val) {
                    this.isOpen = val;
                    this.addEventListner();
                }
            }
        },
        computed: {
            open() {
                return this.isOpen;
            },
            hasFooterSlot () {
                return !!this.$slots['footer']
            },
        },
        data() {
            return {
                isOpen: false
            }
        },

        methods: {
            close() {
                this.isOpen = false;
                this.$emit('close');
            },
            confirm() {
                this.$emit('confirm');
            },
            closeOnEsc(event) {
                if((event.key=='Escape'||event.key=='Esc'||event.keyCode==27)){
                    this.close()
                    return false;
                }
            },
            addEventListner() {
                if (this.active) {
                    window.addEventListener('keyup',this.closeOnEsc);
                }
            }
        },

        mounted() {
            this.isOpen = this.active;
            this.addEventListner();
        },
        beforeDestroy() {
            window.removeEventListener('keyup', this.closeOnEsc)
        }
    }
</script>
<style>

</style>
