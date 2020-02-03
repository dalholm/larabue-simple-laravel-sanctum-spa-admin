<template>
    <div class="columns">
        <div class="column">
            <b-field label="Choose base currency">
                <b-autocomplete
                    icon="earth"
                    v-model="base"
                    placeholder="EUR"
                    :open-on-focus="true"
                    :data="filterCurrencies"
                    field="currency"
                    @select="selectCurrency">
                </b-autocomplete>
            </b-field>
        </div>
        <div class="column">
            <b-table
                :data="data"
                :columns="columns"
                striped
                hoverable
                paginated
                :mobile-cards="false"
                per-page="10"
            >
                <template slot="empty">
                    <section class="section">
                        <div class="content has-text-grey has-text-centered">
                            <p>
                                <b-icon
                                    icon="emoticon-sad"
                                    size="is-large">
                                </b-icon>
                            </p>
                            <p>Nothing here.</p>
                        </div>
                    </section>
                </template>
            </b-table>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            data: [],
            base: '',
            selected: null,
            columns: [
                {
                    field: 'currency',
                    label: 'Currency',
                    width: '40',
                },
                {
                    field: 'rate',
                    label: 'Rate',
                    numeric: true
                },
            ]
        }
    },
    methods: {
        async currencies (base) {

            this.data = [];

            var str = '';
            if (base) {
                str = '?base=';
                str += base;
            }

            this.$store.commit('toggleLoading', true);

            const { data } = await this.axios
                .get('https://api.exchangeratesapi.io/latest' + str);

            var rates = data.rates;
            for (var rate in rates) {
                this.data.push({
                    currency: rate,
                    rate: rates[rate]
                });
            }

            this.base = data.base;
            this.$store.commit('loading', false);
        },
        selectCurrency(option) {
            this.currencies(option.currency)
        }
    },
    computed: {
        filterCurrencies() {
            return this.data.filter((option) => {
                return option.currency.toString()
                    .toLowerCase()
                    .indexOf(this.base.toLowerCase()) >= 0
            })
        }
    },
    created() {
        this.currencies();
    }
}
</script>
