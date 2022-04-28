<template>
    <section class="statistic-page">
        <MarketPriceChart />
        <AvgBlockSizeChart />
    </section>
</template>

<script>
import MarketPriceChart from "../components/charts/MarketPriceChart.vue";
import AvgBlockSizeChart from "../components/charts/AvgBlockSizeChart.vue";
import { bitcoinService } from "../services/bitcoin.service";
export default {
    components: { MarketPriceChart, AvgBlockSizeChart },
    data() {
        return {
            marketPrice: null,
            avgBlockSize: null,
            period: {
                count: 1,
                segement: 'days'
            }
        }
    },
    async created() {
        this.marketPrice = await bitcoinService.getMarketPrice('5days')

    },
    methods: {
        async onSubmitPeriod() {
            const query = `${this.period.count}${this.period.segement}`
            this.marketPrice = await bitcoinService.getMarketPrice(query)
        }
    },
}
</script>

<style lang="scss" scoped>
.statistic-page {
    padding: 1rem 0;
}
</style>

