import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import FAQ from '../views/SSS.vue'
import Contact from '../views/Contact.vue'
import Product from '../views/Product.vue'
import About from '../views/About.vue'
//import Test from '../views/test.vue'
import Admin from '@/views/Admin.vue'
import User from '@/views/User.vue'
import Checkout from '@/views/Checkout.vue'
//import Test2 from '@/views/test2.vue'
import Forbidden from '@/views/403.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },

    {
      path: '/about',
      name: 'about',
      component: About,
    },

    {
      path: '/faq',
      name: 'faq',
      component: FAQ,
    },

    {
      path: '/contact',
      name: 'contact',
      component: Contact,
    },

    {
      path: '/product',
      name: 'product',
      component: Product,
    },

    // {
    //   path: '/test',
    //   name: 'test',
    //   component: Test,
    // },

    {
      path: '/admin',
      name: 'admin',
      component: Admin,
      meta: { requiresAuth: true, roles: ["1"] } //sayfaya giderken meta verisi ekledik
    },
    {
      path: '/user',
      name: 'user',
      component: User,
      meta: { requiresAuth: true, roles: ["0"] } //sayfaya giderken meta verisi ekledik
    },
    {
      path: '/checkout',
      name: 'checkout',
      component: Checkout
    },
    // {
    //   path: '/test2',
    //   name: 'test2',
    //   component: Test2
    // },
    {
      path: '/403',
      name: '403',
      component: Forbidden,
    }
  ],
})


// admin ve user sayfalarina giris yapmak isteyen kisinin tokenine bak. Veritabanina o token i iceren user i bul  rolune gore sayfaya yonlendir  


router.beforeEach(async (to) => {
  // Herkese açık sayfalarda kontrol gerekmiyor.
  if (!to.meta.requiresAuth) {
    return true;
  }

  const token = sessionStorage.getItem("token");

  // Token yoksa giriş sayfasına dön.
  if (!token) {
    return "/";
  }

  try {
    // Token üzerinden kullanıcının bilgilerini backend'den al.
    const res = await fetch("http://localhost:3001/api/me", {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });

    // Token geçersizse oturumu temizle.
    if (!res.ok) {
      sessionStorage.removeItem("token");
      return "/";
    }

    const user = await res.json();

    // Kullanıcının rolü bu sayfaya girmeye uygun mu?
    if (
      to.meta.roles &&
      !to.meta.roles.includes(String(user.u_role))
    ) {
      return "/403";
    }

    return true;

  } catch (error) {
    // Backend'e ulaşılamazsa korumalı sayfaya geçme.
    console.error("JWT kontrol hatası:", error);
    return false;
  }
});









export default router
