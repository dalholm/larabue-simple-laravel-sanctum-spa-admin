<template>
    <div>
        <section>
            <b-field label="Name">
                <b-input v-model="name"></b-input>
            </b-field>
        </section>
    </div>
</template>

<script>
export default {
    data() {
        return {
            name: ''
        }
    },
    methods: {
        async getsome() {
            const { data } = await this.axios
                .get('http://dummy.restapiexample.com/api/v1/employees');

            console.log(data);
        }
    },
    created() {
        this.getsome()
    }
}
</script>
