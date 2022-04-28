<template>
    <div >
        <div>{{ contact.name }}</div>
        <div v-if="filteredByEmail">{{ contact.email }}</div>
        <div v-if="filteredByPhone">{{ contact.phone }}</div>
    </div>
</template>

<script>
export default {
    props: {
        contact: Object,
        filterBy: Object
    },
    data() {
        return {
        }
    },
    computed: {
        filteredByEmail() {
            if (this.filterBy?.email) return true
            else return false
        },
        filteredByPhone() {
               if (this.filterBy?.phone) return true
            else return false
        }
    }
}
</script>

<style lang="scss">
</style>