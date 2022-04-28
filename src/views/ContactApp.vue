
<template>
    <main class="contant-app">
        <h2>Contants</h2>
        <div class="top-actions-bar">
            <ContactFilter @set-filter="onSetFilter" />
            <el-button class="btn-add" type="primary" plain @click="onGoToAdd">
                <span class="fas plus"></span> Add contact
            </el-button>
        </div>
        <ContactList
            :contacts="contactsToShow"
            :filterBy="filterBy"
            @removeContact="onRemoveContact"
        />
    </main>
</template>


<script>
import ContactList from "../components/ContactList.vue";
import ContactFilter from "../components/ContactFilter.vue";

export default {
    components: {
        ContactList,
        ContactFilter,
    },
    data() {
        return {
            filterBy: null
        }
    },
    methods: {
        onSetFilter(filterBy) {
            this.filterBy = filterBy
        },
        async onRemoveContact(id) {
            await this.$store.dispatch({ type: 'removeContact', id })
        },
        onGoToAdd() {
            this.$router.push('/contact/edit')
        }
    },
    computed: {
        contacts() {
            return this.$store.getters.contacts
        },
        contactsToShow() {
            if (!this.filterBy) return this.contacts
            else {
                const nameRegex = new RegExp(this.filterBy.name, 'i')
                const emailRegex = new RegExp(this.filterBy.email, 'i')
                const phoneRegex = new RegExp(this.filterBy.phone, 'i')
                return this.contacts.filter(contact => {
                    return nameRegex.test(contact.name) &&
                        emailRegex.test(contact.email) &&
                        phoneRegex.test(contact.phone)
                })
            }
        },
    }

}
</script>

<style lang="scss" scoped>
.contant-app {
    margin-bottom: 1rem;
    .top-actions-bar{
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1.5rem;
    }
    .btn-add {
        span {
            padding-bottom: 3px;
            margin-inline-end: 0.3rem;
        }
    }
    h2 {
        text-align: center;
        margin: 1rem auto;
    }
}
</style>

