<template>
    <div class="period-inputs">
        <form @submit.prevent="onSubmitPeriod">
            <el-input-number
                v-model="period.count"
                controls-position="right"
                @change="(count) => period.count = count"
                :min="1"
                size="small"
            />
            <el-select v-model="period.segement" class="m-2" size="small">
                <el-option
                    v-for="item in selectOpts"
                    :key="item.value"
                    :label="item.label + suffix"
                    :value="item.value"
                ></el-option>
            </el-select>
            <el-button @click="onSubmitPeriod" size="small" type="primary">Set</el-button>
        </form>
        <el-radio-group v-model="groupRadioModel" @change="onSetPeriod" size="small">
            <el-radio-button v-for="item in groupRadioOps" :label="item.label">{{ item.txt }}</el-radio-button>
        </el-radio-group>
    </div>
</template>

<script>
export default {
    data() {
        return {
            period: {
                count: 1,
                segement: 'days'
            },
            groupRadioModel: '',
            groupRadioOps: [
                { label: '30days', txt: '30 Days' },
                { label: '60days', txt: '60 Days' },
                { label: '1years', txt: '1 Year' },
                { label: '3years', txt: '3 Years' },
                { label: '13years', txt: 'All Time' },
            ],
            selectOpts: [
                { label: 'Year', value: 'years' },
                { label: 'Month', value: 'months' },
                { label: 'Day', value: 'days' }
            ]
        }
    },
    methods: {
        onSetPeriod(value) {
            this.$emit('setPeriod', value)
        },
        async onSubmitPeriod() {
            const query = `${this.period.count}${this.period.segement}`
            this.$emit('setPeriod', query)
        },
    },
    computed: {
        suffix() {
            if (this.period.count === 1) return ''
            else return 's'
        }
    },
}
</script>

<style lang="scss" scoped>
.period-inputs {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 1.5rem auto;
    form {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 0.3rem;
    }
}
</style>