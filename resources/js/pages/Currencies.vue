<template>
    <div>
        <div class="columns">
            <div class="column">
                <h2 class="title is-h2">{{ base }}</h2>
                <div class="content is-medium">
                    For {{ base_value }} {{ base }} you will get <span class="is-bold">{{target_currency_object.currency_value }}</span>
                </div>
            </div>
            <div class="column is-one-third">
                <section>
                    <h2 class="title is-h2">Settings</h2>
                    <b-field label="Base currency value">
                        <b-numberinput controls-position="compact" v-model="base_value"></b-numberinput>
                    </b-field>

                    <div class="columns">
                        <div class="column">
                            <b-field label="Choose base currency">
                                <b-autocomplete
                                    icon="earth"
                                    v-model="base"
                                    :placeholder="this.base"
                                    :open-on-focus="true"
                                    :keep-first="true"
                                    :data="filterBaseCurrencies"
                                    field="currency"
                                    @select="selectBaseCurrency"
                                >
                                </b-autocomplete>
                            </b-field>
                        </div>
                        <div class="column">
                            <b-field label="Target currency">
                                <b-autocomplete
                                    icon="earth"
                                    v-model="target_currency"
                                    :placeholder="this.target_currency"
                                    :keep-first="true"
                                    :open-on-focus="true"
                                    :data="filterTargetCurrencies"
                                    field="currency"
                                    @select="selectTargetCurrency"
                                >
                                </b-autocomplete>
                            </b-field>
                        </div>
                    </div>
                </section>
            </div>
        </div>
        <section>
            <h2 class="title is-4">Available Currencies </h2>
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
        </section>
    </div>
</template>

<script>
export default {
    data() {
        return {
            data: [],
            defaults: {
                base: 'EUR',
                target: 'USD'
            },
            tmp_base: '',
            base: 'EUR',
            target_currency: 'USD',
            target_currency_object: {
                currency_value: 0,
            },
            base_value: 100,
            selected: null,
            columns: [
                {
                    field: 'currency',
                    label: 'Currency',
                    width: '40',
                    searchable: true,
                }, {
                    field: 'rate',
                    label: 'Rate',
                    numeric: true
                }, {
                    field: 'currency_value',
                    label: 'Currency Value',
                    numeric: true
                }
            ]
        }
    },
    methods: {
        async currencies (base) {

            this.data = [];

            var str = '?base=' + this.defaults.base;
            if (base) {
                str = '?base=' + base;
            }

            this.$store.commit('toggleLoading', true);

            const { data } = await this.axios
                .get('https://api.exchangeratesapi.io/latest' + str);

            var rates = data.rates;
            for (var rate in rates) {
                this.data.push({
                    currency: rate,
                    rate: rates[rate],
                    currency_value: Math.round(this.base_value * rates[rate]) + ' ' + rate,
                });
            }

            this.target_currency = this.defaults.target;
            this.$store.commit('loading', false);
        },
        selectBaseCurrency(option) {
            this.currencies(option.currency)
        },
        selectTargetCurrency(option) {
            this.target_currency_object = option;
        },
    },
    watch: {
        base_value () {
            this.currencies();
        },
        target_currency: {
            handler(value) {
                var result = this.data.filter((currency) => {
                    return currency.currency.toString()
                        .toLowerCase()
                        .indexOf(this.target_currency.toLowerCase()) >= 0
                });

                if (result.length == 1) {
                    target_currency_object = result[0];
                }
            },
            immediate: true
        }
    },
    computed: {
        filterBaseCurrencies() {
            return this.data.filter((option) => {
                return option.currency.toString()
                    .toLowerCase()
                    .indexOf(this.base.toLowerCase()) >= 0
            })
        },
        filterTargetCurrencies() {
            return this.data.filter((option) => {
                return option.currency.toString()
                    .toLowerCase()
                    .indexOf(this.target_currency.toLowerCase()) >= 0
            })
        }
    },
    created() {
        this.currencies();
    }
}
</script>
