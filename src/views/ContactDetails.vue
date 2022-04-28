<template>
    <section v-if="contact" class="contact-details">
        <div class="details-container flex column justify-center align-start">
            <div class="img-container">
                <img :src="`https://robohash.org/${contact._id}`" alt />
            </div>
            <div class="info-line">
                <span>Name:</span>
                <span>{{ contact.name }}</span>
            </div>
            <div class="info-line">
                <span>Email:</span>
                <span>{{ contact.email }}</span>
            </div>
            <div class="info-line">
                <span>Phone:</span>
                <span>{{ contact.phone }}</span>
            </div>
        </div>
        <template v-if="this.user">
            <TransferFund :maxCoins="user.coins" :user="user" :contact="contact" />
            <MoveList :user="user" :contact="contact" :isPerContact="true" />
        </template>
        <nav class="flex space-between align-center">
            <RouterLink class="check" to="/contact">
                <el-button>Return</el-button>
            </RouterLink>
            <RouterLink :to="`/contact/edit/${contact._id}`">
                <el-button>Edit</el-button>
            </RouterLink>
        </nav>
    </section>
</template>

<script>
import { contactService } from "../services/contact.service"
import { RouterLink } from "vue-router"
import TransferFund from "../components/TransferFund.vue"
import MoveList from "./MoveList.vue"
export default {
    components: {
        RouterLink,
        TransferFund,
        MoveList
    },
    data() {
        return {
            contact: null
        }
    },
    async created() {
        const { id } = this.$route.params
        this.contact = await contactService.getById(id)
    },
    computed: {
        user() {
            const user = this.$store.getters.loggedinUser || null
            return user
        }
    }
}
</script>

<style lang="scss" >
.contact-details {
    margin: 4rem auto 2rem;

    .check {
        border: none;
    }

    .details-container {
        gap: 1.2rem;
        border: 1px solid black;
        border-radius: 4px;
        padding: 1.5rem;

        .img-container {
            width: 100%;

            img {
                width: 100%;
                border-radius: 50%;
                background-color: white;
            }
        }

        .info-line {
            font-size: 1.2rem;

            span:first-child {
                font-weight: 600;
                margin-inline-end: 0.4rem;
            }
        }
    }

    nav {
        padding: 0.3rem 0;

        >* {
            padding: 0;
            // border: 1px solid black;
        }
    }
}
</style>