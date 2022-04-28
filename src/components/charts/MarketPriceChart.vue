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
                        data: values.map(value => value.y),
                        backgroundColor: bitcoinService.getPointColorsFromValues(values),
                        label: name,
                        pointRadius: 2,
                        pointHoverRadius: 8
                    },
                ],
            }
        },
        options() {
            const { name, description, values } = this.marketPrice
            const period = bitcoinService.getFormattedPeriod(values)
            return {
                plugins: {
                    title: {
                        display: true,
                        text: `${name} at ${period}`,
                    },
                    subtitle: {
                        display: true,
                        text: description
                    }
                }
            }
        }
    }
}
</script>

<style lang="scss" scoped>
</style>

