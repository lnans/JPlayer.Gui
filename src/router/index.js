import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    {
        path: '/login',
        name: 'Login',
        component: () => import('@/layouts/Login.vue')
    },
    {
        path: '/',
        name: 'Main',
        component: () => import('@/layouts/Main.vue'),
        children: [
            {
                path: '',
                name: 'Dashboard',
                component: () => import('@/views/Dashboard.vue')
            }
        ]
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
