import { createWebHistory, createRouter } from "vue-router";
import Login from "../views/Login.vue";
import home from "../views/Home.vue";
import Register from "../views/Register.vue";
import Produk from "../views/Produk.vue";
import singleproduk from "../views/SingleProduk.vue"
import keranjang from "../views/keranjang.vue"
import category from "../views/Category.vue"
import brands from "../views/Brands.vue"
import profil from "../views/Profil.vue"
import checkout from "../views/Checkout.vue"
import order from "../views/Order-confirmed.vue"

const routes = [
    {
        path: "/",
        name: "Home",
        component: home,
    },
    {
        path: "/login",
        name: "Login",
        component: Login,
    },
    {
        path: "/register",
        name: "Register",
        component: Register,
    },
    {
        path: '/produk',
        name: 'Produk',
        component: Produk
    },

    {
        path: '/produk/:slug',
        name: 'SingleProduk',
        component: singleproduk
    },
    {
        path: '/keranjang',
        name: 'keranjang',
        component: keranjang
    },
    {
        path: '/category',
        name: 'Category',
        component: category
    },
    {
        path: '/checkout',
        name: 'Checkout',
        component: checkout
    },
    {
        path: '/brands',
        name: 'Brands',
        component: brands
    },
    {
        path: '/profil',
        name: 'Profil',
        beforeEnter: cekToken,
        component: profil
    },
    {
        path: '/order/:orderCode',
        name: 'Order',
        component: order,
        props: true
    },

]
function cekToken(to, from, next) {
    var isAuthenticated = false;
    if (localStorage.getItem('token')) {
        isAuthenticated = true;
        next();
    }
    else {
        isAuthenticated = false;
        next('/login')
    }


}

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;