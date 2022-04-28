<template>
    <div class="move-preview">
        <div v-if="!isPerContact" >
            <span>To:</span>
            <span>{{ move.to }}</span>
        </div>
        <div >
            <span>Amount:</span>
            <span>{{ formattedCoins }}</span>
        </div>
        <div >
            <span>At:</span>
            <span>{{ formattedTime }}</span>
        </div>
    </div>
</template>

<script>
import { bitcoinService } from "../services/bitcoin.service"
import { utils } from '../services/utils.service'
export default {
    props: {
        move: Object,
        isPerContact: Boolean
    },
    computed: {
        formattedTime() {
            return utils.getFullDate(this.move.at)
        },
        formattedCoins() {
            return bitcoinService.getFormattedCurrency(this.move.amount)
        }
    }
}
</script>

<style lang="scss" scoped>
.move-preview {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.5rem 0;
    border-bottom: 1px solid rgb(211, 211, 211);
    font-size: 0.95rem;
    > * span:first-child {
        font-weight: 600;
        margin-inline-end: 0.3rem;
    }
}
</style>