<template>
    <section class="home-page">
        <div class="main-container">
            <template v-if="user">
                <div>Hello {{ user.fullname }}</div>
                <div>Your Balance is {{ balance }}</div>
            </template>
            <div>The current Bitcoin Rate is {{ currRate }}</div>
            <template v-if="!user">
                <div>Please login first</div>
                <el-button @click="onLogin" type="primary" plain>Login</el-button>
            </template>
        </div>
        <MoveList :user="user"  :isPerContact="false"/>
    </section>
</template>




<script>
import { bitcoinService } from "../services/bitcoin.service"
import MoveList from "./MoveList.vue"

export default {
    components: {
        MoveList
    },
    data() {
        return {
            currRate: null
        }
    },
    async created() {
        this.currRate = await bitcoinService.getRate(1)

    },
    methods: {
        onLogin() {
            this.$router.push('/login')
        }
    },
    computed: {
        user() {
            return this.$store.getters.loggedinUser
        },
        balance() {
            return bitcoinService.getFormattedCurrency(this.user.coins)

        }
    }

}
</script>


<style lang="scss">
.home-page {
    display: grid;
    place-items: center;
    min-height: calc(100vh - 113px);

    .main-container {
        background-color: #2c2c2c;
        padding: 1.5rem;
        border-radius: 4px;
        font-size: 1.2rem;
        color: white;
        text-align: center;
    }
}
</style>