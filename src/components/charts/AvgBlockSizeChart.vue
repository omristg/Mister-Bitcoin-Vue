<template>
    <div v-if="avgBlockSize" class="market-price-chart">
        <h2>Avarage Block Size</h2>
        <LineChart :chartData="avgBlockSizeData" :options="options" />
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
            avgBlockSize: null,
            period: {
                count: 1,
                segement: 'days'
            }
        }
    },
    async created() {
        this.avgBlockSize = await bitcoinService.getAvgBlockSize('1months')
    },
    methods: {
        async onSetPeriod(query) {
            this.avgBlockSize = await bitcoinService.getAvgBlockSize(query)
        }
    },
    computed: {
        avgBlockSizeData() {
            const { name, values } = this.avgBlockSize
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
            const { name, description, values } = this.avgBlockSize
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

