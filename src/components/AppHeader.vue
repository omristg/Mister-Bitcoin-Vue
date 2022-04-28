<template>
	<div class="app-header-wrapper main-layout full">
		<section class="app-header flex space-between align-center">
			<h1 @click="onGoToHome">
				Mister
				<span class="fab bitcoin"></span> BitCoin
			</h1>
			<nav class="flex space-between align-center">
				<RouterLink to="/" active-class="my-active">Home</RouterLink>|
				<RouterLink to="/contact" active-class="my-active">Contacts</RouterLink>|
				<RouterLink to="/statistic" active-class="my-active">Statistics</RouterLink>|
				<RouterLink :to="{ name: 'About' }" active-class="my-active">About</RouterLink>|
				<RouterLink v-if="!loggedinUser" to="/login" active-class="my-active">Login</RouterLink>
				<button v-else @click="onLogout" class="btn-logout">Logout</button>
			</nav>
		</section>
	</div>
</template>

<script>
import { RouterLink } from "vue-router";
export default {
	components: {
		RouterLink
	},
	methods: {
		onGoToHome() {
			console.log(this.$router);
			this.$router.push('/')
		}
	},
	computed: {
		loggedinUser() {
			return this.$store.getters.loggedinUser
		},
		onLogout() {
			this.$store.commit({ type: 'logout' })
			this.$router.push('/login')
		}
	},
}
</script>


<style lang="scss" scoped>
.app-header-wrapper {
	background-color: #2c2c2c;
}

.app-header {
	padding: 2rem 0;
	color: white;

	h1 {
		font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
		font-size: 2em;
		cursor: pointer;
	}

	nav > * {
		font-size: 1rem;
		transition: 0.2s;
		line-height: 1rem;
		&:hover {
			color: #7ac8ff;
		}
	}

	.my-active {
		color: #7ac8ff;
	}

	.btn-logout {
		padding: 0.4rem;
		margin-inline-start: .6rem;
		color: white;
		border-color: white;
		&:hover {
			border-color: #7ac8ff;
		}
	}
}
</style>