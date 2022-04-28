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
                        label: name,
                        backgroundColor: bitcoinService.getPointColorsFromValues(values),
                        pointRadius: 3,
                        pointHoverRadius: 8
                    },
                ],
            }
        },
        options() {
            const { name, description, values } = this.avgBlockSize
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
                                return value.toFixed(2) + ' MB';
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

