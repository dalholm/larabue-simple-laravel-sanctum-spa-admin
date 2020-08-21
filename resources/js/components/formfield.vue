<template>
    <b-field
            :label="label"
            :message="errorMessage"
            :type="customClass"
    >
        <slot/>
    </b-field>
</template>
<script>
    export default {
        name: 'form-field',
        props: {
            label: String,
            form: Object,
            field: String
        },
        data() {
            return  {

            }
        },
        computed: {
            hasError() {
                if (this.field) {
                    return this.form.errors.has(this.field)
                }
                return false;
            },
            errorMessage() {
                return this.form.errors.get(this.field)
            },
            customClass() {
                console.log(this.form.errors.has(this.field));
                if (this.hasError) {
                    return 'is-danger';
                }
                return '';
            }
        },
    }
</script>
