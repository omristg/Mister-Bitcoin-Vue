<template>
	<div class="app-header-wrapper main-layout full">
		<section class="app-header flex space-between align-center">
			<h1 @click="onGoToHome">
				Mister
				<span class="fab bitcoin"></span> BitCoin
			</h1>
			<div class="hamburger-btn" @click="toggleIsOpen(true)">
				<div></div>
				<div></div>
				<div></div>
			</div>
			<div class="overlay" :class="{ open: isOpen }" @click="toggleIsOpen(false)"></div>
			<nav class="main-nav" :class="{ open: isOpen }">
				<RouterLink to="/" active-class="my-active">Home</RouterLink>
				<RouterLink to="/contact" active-class="my-active">Contacts</RouterLink>
				<RouterLink to="/statistic" active-class="my-active">Statistics</RouterLink>
				<RouterLink :to="{ name: 'About' }" active-class="my-active">About</RouterLink>
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
	data() {
		return {
			isOpen: false
		}
	},
	methods: {
		onGoToHome() {
			console.log(this.$router);
			this.$router.push('/')
		},
		toggleIsOpen(action) {
			this.isOpen = action
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

	nav>* {
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

	.hamburger-btn {
		display: none;
		cursor: pointer;

		>div {
			width: 25px;
			height: 3px;
			background-color: white;
			margin: 6px 0;
		}
	}

	.main-nav {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.overlay {
		position: fixed;
		width: 100vw;
		height: 100vh;
		inset: 0;
		z-index: 80;
		background-color: #00000060;
		cursor: pointer;
		pointer-events: none;
		opacity: 0;
		transition: 0.2s;

		&.open {
			opacity: 1;
			pointer-events: auto;
		}
	}

	@media (max-width: 700px) {
		.main-nav {
			background-color: #2c2c2c;
			position: fixed;
			transform: translateX(25rem);
			transition: 0.2s;
			right: 0;
			top: 0;
			height: 100vh;
			width: calc(min(18rem, 65%));
			flex-direction: column;
			justify-content: flex-start;
			padding-top: 3.5rem;
			gap: 1.5rem;
			z-index: 100;

			&.open {
				box-shadow: -10px 0 25px #00000060;
				transform: translateX(0px);
			}

		}

		.hamburger-btn {
			display: block;
		}
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

