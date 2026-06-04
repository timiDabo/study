import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'Home', component: () => import('../views/HomeView.vue') },
    { path: '/about', name: 'About', component: () => import('../views/AboutView.vue') },
    { path: '/projects', name: 'Projects', component: () => import('../views/ProjectsView.vue') },
    { path: '/dashboard', name: 'Dashboard', component: () => import('../views/DashboardView.vue') },
    { path: '/market-performance', name: 'MarketPerformance', component: () => import('../views/MarketPerformanceView.vue') },
    { path: '/insights', name: 'Insights', component: () => import('../views/InsightsView.vue') },
    { path: '/InsightDetail', name: 'InsightDetail', component: () => import('../views/InsightDetailView.vue') },
    { path: '/newsletter', name: 'Newsletter', component: () => import('../views/NewsletterView.vue') },
    { path: '/competition', name: 'Competition', component: () => import('../views/CompetitionView.vue') },
    { path: '/contact', name: 'Contact', component: () => import('../views/ContactView.vue') },
  ],
  scrollBehavior() {
    return { top: 0 }
  },
})

export default router
