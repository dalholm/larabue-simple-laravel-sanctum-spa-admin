<template>
    <div>
        <section>
            <h1 class="title is-4">Dashboard</h1>
            <div class="subtitle is-5">With sample chart from apexchart</div>
            <div class="columns">
                <div class="column">
                    <apexchart type="line" :options="options" :series="series"></apexchart>
                </div>
                <div class="column">
                    <apexchart type="bar" :options="options" :series="series"></apexchart>
                </div>
            </div>
        </section>

    </div>
</template>

<script>
    import VueApexCharts from 'vue-apexcharts'
    export default {
        components: {
            apexchart: VueApexCharts,
        },
        data() {
            return {
                options: {
                    colors: ['#e3e8ee', 'rgb(84, 105, 212)', '#3c4257', '#180d18', '#FF9800'],
                    height: 'auto',
                    chart: {
                        id: 'basic-bar'
                    },
                    xaxis: {
                        categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998]
                    }
                },
                series: [{
                    name: 'series-1',
                    data: [30, 40, 45, 50, 49, 60, 70, 91]
                }]
            }
        },
    }
</script>
