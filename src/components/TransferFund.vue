<template>
    <div class="transfer-fund">
        <div class="actions-top">
            <h4>Transfer coins</h4>
        </div>
        <div class="slider-block">
            <el-slider v-model="tranferVal" show-input :max="maxCoins"></el-slider>
            <el-popconfirm
                title="Are you sure about transfering the coins?"
                @confirm="onTransfer"
                :hideIcon="true"
            >
                <template #reference>
                    <el-button class="btn-transfer" type="primary">Transfer</el-button>
                </template>
            </el-popconfirm>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        maxCoins: Number,
        contact: Object,
        user: Object
    },
    data() {
        return {
            tranferVal: 0,
        }
    },
    created() {
    },
    methods: {
        async onTransfer() {
            const { name, _id } = this.contact
            const move = {
                toId: _id,
                to: name,
                at: Date.now(),
                amount: this.tranferVal
            }
            const userId = this.user._id
            await this.$store.dispatch({ type: 'addMove', move, userId })
            this.tranferVal = 0;

        }
    },
    computed: {
    }
}
</script>

<style lang="scss" >
.transfer-fund {
    padding: 1rem 0;

    .actions-top {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 0.5rem;
    }
    .slider-block {
        display: flex;
        align-items: center;
        .el-slider {
            margin-top: 0;
            margin-left: 12px;
        }

        .el-input-number__decrease,
        .el-input-number__increase {
            bottom: 2px;
        }

        .btn-transfer {
            margin-inline-start: 0.4rem;
        }
    }
}
</style>