<template>
    <form class="contact-filter ">
        <div>Filter By:</div>
        <label>
            <span>Name:</span>
            <input v-model="filterBy.name" @input="onSetFilter" />
        </label>
        <label>
            <span>Email:</span>
            <input v-model="filterBy.email" @input="onSetFilter" />
        </label>
        <label>
            <span>Phone:</span>
            <input type="text" v-model.text="filterBy.phone" @input="onSetFilter" />
        </label>
    </form>
</template>

<script>
export default {
    data() {
        return {
            filterBy: {
                name: '',
                email: '',
                phone: '',
            }
        }
    },
    methods: {
        onSetFilter() {
            this.$emit('set-filter', this.filterBy)
        }
    },
}
</script>

<style lang="scss" scoped>
.contact-filter {

    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-wrap: wrap;
    padding: 1rem 0;
    gap: 2rem;
    flex-grow: 1;

    >* {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        gap: .3rem;
    }

}
</style>