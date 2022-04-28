<template>
    <section v-if="contactToEdit" class="contact-edit">
        <h2>{{ pageTitle }}</h2>
        <form>
            <label>
                <div>Name:</div>
                <input type="text" placeholder="name" v-model="contactToEdit.name" />
            </label>
            <label>
                <div>Email:</div>
                <input type="text" placeholder="email" v-model="contactToEdit.email" />
            </label>
            <label>
                <div>Phone:</div>
                <input type="text" placeholder="phone" v-model="contactToEdit.phone" />
            </label>
        </form>

        <div class="btns-container flex space-between align-center">
            <RouterLink
                v-if="contactToEdit._id"
                class="btn"
                :to="`/contact/${contactToEdit._id}`"
            >Return</RouterLink>
            <RouterLink v-else class="btn" to="/contact/">Return</RouterLink>
            <button @click="onSave">Save</button>
        </div>
    </section>
</template>

<script>
import { RouterLink } from "vue-router"
import {contactService} from "../services/contact.service"
export default {
    components: {
        RouterLink
    },
    data() {
        return {
            contactToEdit: null,
        }
    },
    async created() {
        const { id } = this.$route.params
        if (id) this.contactToEdit = await contactService.getById(id)
        else this.contactToEdit = contactService.getEmptyContact()
    },
    methods: {
        async onSave() {
            await this.$store.dispatch({ type: 'saveContact', contact: this.contactToEdit })
            this.$router.push('/contact')
        }
    },
    computed: {
        pageTitle() {
            const { id } = this.$route.params;
            return id ? 'Edit contact' : 'Add contact';
        },
    }
}
</script>

<style lang="scss" scoped>
.contact-edit {
    margin: 2rem 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1rem;

    form {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 1rem;
        label {
            width: 100%;
            display: flex;
            justify-content: space-between;
            gap: 0.2rem;
        }
    }
    .btns-container {
        width: 20%;
        display: flex;
        justify-content: space-around;
        align-items: center;
        button {
            padding: 2px 7px;
        }
    }
}
</style>