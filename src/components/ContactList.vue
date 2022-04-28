<template>
    <div class="contact-list">
        <ul>
            <li v-for="contact in contacts" class="clean-list">
                <div class="contact-preview">
                    <div class="img-container">
                        <img :src="`https://robohash.org/${contact._id}`" alt />
                    </div>
                    <ContactPreview :contact="contact" :filterBy="filterBy" :key="contact._id" />
                    <div class="actions">
                        <el-popconfirm title="Are you sure to delete this?" @confirm="onRemoveContact(contact._id)"
                            :hideIcon="true">
                            <template #reference>
                                <button>Remove</button>
                            </template>
                        </el-popconfirm>
                        <router-link :to="`/contact/${contact._id}`" class="btn">Details</router-link>
                    </div>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
import ContactPreview from "./ContactPreview.vue";
export default {
    props: {
        contacts: Array,
        filterBy: Object
    },
    components: {
        ContactPreview
    },
    methods: {
        onRemoveContact(id) {
            this.$emit('removeContact', id)
        }
    },

}
</script>

<style lang="scss" >
.contact-list {
    ul {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(14rem, 1fr));
        place-items: center;
        gap: 1.5rem 0;
    }
}

.contact-preview {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 1rem;
    border-radius: 0.25rem;
    background-color: #deecfd;
    box-shadow: 0 10px 25px #00000020;

    .img-container {
        width: 3rem;

        img {
            width: 100%;
            border-radius: 50%;
            background-color: white;
        }
    }

    .actions {
        display: flex;
        justify-content: center;
        margin-top: 0.75rem;
        gap: 0.5rem;
        width: 100%;
    }
}
</style>