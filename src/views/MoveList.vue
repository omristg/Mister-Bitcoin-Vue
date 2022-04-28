<template>
    <div class="move-list">
        <h4>{{ title }}</h4>
        <MovePreview v-if="movesToShow" v-for="(move, idx) in movesToShow" :key="idx" :move="move"
            :isPerContact="isPerContact" />
        <div v-else>Please login first</div>
    </div>
</template>

<script>
import MovePreview from "./MovePreview.vue"
export default {
    props: {
        user: Object,
        contact: Object,
        isPerContact: Boolean
    },
    components: {
        MovePreview
    },
    computed: {
        movesToShow() {
            if (!this.user) return
            if (this.isPerContact) return this.user.moves.filter(move => {
                return move.toId === this.contact._id
            })
            else return this.user.moves.slice(0, 3)

        },
        title() {
            if (this.isPerContact) return 'Moves about this contact'
            else return 'Latest moves'
        },

    },
}
</script>

<style lang="scss" scoped>
.move-list {
    width: 30rem;
    margin-bottom: 0.5rem;
}
</style>