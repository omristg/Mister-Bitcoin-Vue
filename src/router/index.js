import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '@/views/HomePage.vue';
import About from '@/views/About.vue';
import ContactApp from '@/views/ContactApp.vue';
import ContactDetails from '@/views/ContactDetails.vue';
import StatisticPage from '../views/StatisticPage.vue';
import ContactEdit from '../views/ContactEdit.vue';
import LoginPage from '../views/LoginPage.vue';

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/',
			name: 'HomePage',
			component: HomePage
		},
		{
			path: '/about',
			name: 'About',
			component: About
		},
		{
			path: '/contact',
			name: 'ContactApp',
			component: ContactApp
		},
		{
			path: '/contact/edit/:id?',
			name: 'ContactEdit',
			component: ContactEdit
		},
		{
			path: '/contact/:id',
			name: 'ContactDetails',
			component: ContactDetails
		},
		{
			path: '/statistic',
			name: 'StatisticPage',
			component: StatisticPage
		},
		{
			path: '/login',
			name: 'LoginPage',
			component: LoginPage
		},
	]
})

export default router;
