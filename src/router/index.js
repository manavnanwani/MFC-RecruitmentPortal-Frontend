import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import NProgress from 'nprogress';

Vue.use(VueRouter);

NProgress.configure({ showSpinner: false });

function loadView(view) {
	return () =>
		import(/* webpackChunkName: "view-[request]" */ `@/views/${view}.vue`);
}

const routes = [
	{
		path: '/',
		name: 'Home',
		component: Home,
		meta: { title: 'Home | MFC Recruitments 2020', authwall: false }
	},
	{
		path: '/profile',
		name: 'Profile',
		component: loadView('Profile'),
		meta: { title: 'Profile | MFC Recruitment 2020', authwall: true }
	},
	{
		path: '/login',
		name: 'Login',
		component: loadView('Login'),
		meta: { title: 'Login | MFC Recruitment 2020', authwall: false }
	},
	{
		path: '/register',
		name: 'Register',
		component: loadView('Register'),
		meta: { title: 'Register | MFC Recruitment 2020', authwall: false }
	},
	{
		path: '/test/technical',
		name: 'Technical',
		component: loadView('Technical'),
		meta: {
			title: 'Technical Round 1 | MFC Recruitment 2020',
			authwall: true
		}
	},
	{
		path: '/test/management',
		name: 'Management',
		component: loadView('Management'),
		meta: {
			title: 'Management Round 1 | MFC Recruitment 2020',
			authwall: true
		}
	},
	{
		path: '/test/design',
		name: 'Design',
		component: loadView('Design'),
		meta: { title: 'Design Round 1 | MFC Recruitment 2020', authwall: true }
	},
	{
		path: '/test/media',
		name: 'Media',
		component: loadView('Media'),
		meta: { title: 'Media Round 1 | MFC Recruitment 2020', authwall: true }
	},
	{
		path: '/test/editorial',
		name: 'Editorial',
		component: loadView('Editorial'),
		meta: {
			title: 'Editorial Round 1 | MFC Recruitment 2020',
			authwall: true
		}
	},
	{
		path: '/rules',
		name: 'Rules',
		component: loadView('Rules'),
		meta: { title: 'Rules | MFC Recruitment 2020', authwall: false }
	},
	{
		path: '/result',
		name: 'Result',
		component: loadView('Result'),
		meta: {
			title: 'View your Result | MFC Recruitment 2020',
			authwall: true
		}
	},
	{
		path: '/test',
		name: 'Test',
		component: loadView('Test'),
		meta: { title: 'Take Tests | MFC Recruitment 2020', authwall: true }
	},
	{
		path: '/contact',
		name: 'Contact',
		component: loadView('Contact'),
		meta: { title: 'Contact Us | MFC Recruitment 2020', authwall: true }
	}
];

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes,
	// eslint-disable-next-line no-unused-vars
	scrollBehavior(to, from, savedPosition) {
		return { x: 0, y: 0 };
	}
});

router.beforeResolve((to, from, next) => {
	if (to.path) {
		NProgress.start();
	}
	next();
});

router.afterEach(() => {
	NProgress.done();
});

router.beforeEach((to, from, next) => {
	const nearestWithTitle = to.matched
		.slice()
		.reverse()
		.find(r => r.meta && r.meta.title);
	if (nearestWithTitle) document.title = nearestWithTitle.meta.title;
	if (to.matched.some(record => record.meta.authwall)) {
		// this route requires auth, check if logged in
		// if not, redirect to login page.
		// Check if user is authenticated or not
		if (localStorage.getItem('user.auth') === 'true') {
			next();
		} else {
			next({
				path: '/login',
				query: { redirect: to.fullPath }
			});
		}
	} else {
		next();
	}
});

export default router;
