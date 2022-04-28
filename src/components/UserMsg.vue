<template>
	<section v-if="msg" class="user-msg" :class="msg.type">
		<p>{{ msg.txt }}</p>
	</section>
</template>

<script>
import { eventBus } from '@/services/eventBus.service.js';
export default {
	data() {
		return {
			msg: null,
			removeEventListener: null,
		};
	},
	created() {
		this.removeEventListener = eventBus.on('show-msg', this.showMsg);
	},
	methods: {
		showMsg(msg) {
			this.msg = msg;
			setTimeout(() => {
				this.msg = null;
			}, 3000);
		},
	},
	destroyed() {
		this.removeEventListener();
	},
};
</script>

<style lang="scss" scoped>
.user-msg {
	position: absolute;
	top: 16px;
	right: 16px;
	background-color: rgb(122, 209, 122);
	padding: 10px 20px;
	&.success {
		background-color: lightgreen;
	}
	&.error {
		background-color: red;
		color: white;
	}
}
</style>