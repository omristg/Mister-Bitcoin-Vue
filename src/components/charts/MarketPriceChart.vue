<template>
    <div v-if="marketPrice" class="market-price-chart">
        <h2>Market Price</h2>
        <LineChart :chartData="MarketPriceData" :options="options" />
        <PeriodInput @setPeriod="onSetPeriod" />
    </div>
</template>

<script>
import { LineChart } from 'vue-chart-3';
import { bitcoinService } from '../../services/bitcoin.service';
import PeriodInput from './PeriodInput.vue';
export default {
    components: {
        LineChart,
        PeriodInput
    },
    data() {
        return {
            marketPrice: null
        }
    },
    async created() {
        this.marketPrice = await bitcoinService.getMarketPrice('1months')
    },
    methods: {
        async onSetPeriod(query) {
            this.marketPrice = await bitcoinService.getMarketPrice(query)
        }
    },
    computed: {
        MarketPriceData() {
            const { name, values } = this.marketPrice
            return {

                labels: bitcoinService.getXTimeValues(values),
                datasets: [
                    {
                        label: name,
                        data: values.map(value => value.y),
                        backgroundColor: bitcoinService.getPointColorsFromValues(values),
                        pointRadius: 3,
                        pointHoverRadius: 8
                    },
                ],
            }
        },
        options() {
            const { name, description, values } = this.marketPrice
            const period = bitcoinService.getFormattedPeriod(values)
            return {
                scales: {
                    x: {
                        ticks: {
                            maxTicksLimit: 8,
                            maxRotation: 0,
                            minRotation: 0,
                            align: 'start'
                        }
                    },
                    y: {
                        ticks: {
                            callback: (value) => {
                                return (value / 1000) + 'K';
                            }
                        }
                    },
                },
                plugins: {
                    legend: {
                        display: false
                    },
                    title: {
                        display: true,
                        text: `${name} at ${period}`,
                        font: {
                            family: 'Roboto', weight: '800', size: 15
                        }
                    },
                    subtitle: {
                        display: true,
                        text: description,
                        padding: { bottom: 15 },
                        font: {
                            family: 'Roboto', weight: '500', size: 12
                        }
                    }
                }
            }
        }
    }
}
</script>

<style lang="scss" scoped>
</style>

