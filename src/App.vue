<template>
	<div class="app main-layout">
		<AppHeader />
		<RouterView />
	</div>
</template>


<script>
import AppHeader from '@/components/AppHeader.vue';
import { RouterView } from 'vue-router';

export default {
	components: {
		AppHeader,
		RouterView
	},
	async created() {
		await this.$store.dispatch({ type: 'loadContacts' });
		await this.$store.dispatch({ type: 'loadUsers' });
		const user = this.$store.getters.loggedinUser
		if (user) {
			this.$store.dispatch({ type: 'setUpdatedUser', userId: user._id })
		}

	},
};
</script>

<style lang="scss" >
</style>

