<template>
    <div>
        <section>
            <h1 class="title is-h2">Hello</h1>
            <GChart
                type="ColumnChart"
                :data="chartData"
                :options="chartOptions"
                style="height: 500px;"
            />
            <div class="columns">
                <div class="column">

                </div>
                <div class="column"></div>
            </div>
        </section>

    </div>
</template>

<script>
    export default {
        data() {
            return {
                // Array will be automatically processed with visualization.arrayToDataTable function
                chartData: [
                    ['Month', 'Sales', 'Expenses', 'Profit'],
                    ['Jan', 1000, 400, 200],
                    ['Feb', 1170, 460, 250],
                    ['Mars', 660, 1120, 300],
                    ['Apr', 1030, 540, 350],
                    ['Jun', 1030, 540, 350],
                    ['Jul', 1030, 540, 350],
                    ['Aug', 2500, 540, 350],
                    ['Sep', 1030, 540, 350],
                    ['Oct', 1030, 540, 350],
                    ['Nov', 1030, 540, 350],
                    ['Dec', 1030, 540, 350],
                ],
                chartOptions: {
                    chart: {
                        title: 'Company Performance',
                        subtitle: 'Sales, Expenses, and Profit: 2014-2017',
                    }
                }
            }
        },
    }
</script>
