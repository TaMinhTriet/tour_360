import { createWebHistory, createRouter } from "vue-router"; 
import TrangChu from '@/views/TrangChu.vue';
import FormAdminDangNhap from '@/components/FormAdminDangNhap.vue';
import AdminDashboard from '@/views/AdminDashboard.vue';
// import AdminLayout from '@/layouts/AdminLayout.vue';
// import AdminDashboard from '@/views/AdminDashboard.vue';
// import AdminLogin from '@/views/AdminLogin.vue';
// import AdminRegister from '@/views/AdminRegister.vue';
import NotFound from '@/views/NotFound.vue';
import CaNhan from '@/views/CaNhan.vue';
import store from '@/store';
// import Product360 from '@/views/360_Product.vue'

const routes = [
    {
        path: "/",
        name: "trangchu",
        component: TrangChu,
    },
    {
        path: "/admin",
        name: "admin",
        beforeEnter: (to, from, next) => {
            if (store.getters.isAdminLoggedIn) {
                next('/admin/dashboard');
            } else {
                next('/admin/login');
            }
        }
    },
    {
        path: "/admin/login",
        name: "adminLogin",
        component: FormAdminDangNhap,
        beforeEnter: (to, from, next) => {
            if (store.getters.isAdminLoggedIn && from.path === '/admin/dashboard') {
                next('/admin/dashboard');
            } else {
                next();
            }
        }
    },
    {
        path: "/admin/dashboard",
        name: "adminDashboard",
        component: AdminDashboard,
        beforeEnter: (to, from, next) => {
            if (store.getters.isAdminLoggedIn) {
                next();
            } else {
                next('/admin/login');
            }
        }
    },
    //
    {
        path: "/canhan",
        name: "canhan",
        component: CaNhan,
        meta: { requiresAuth: true },
        beforeEnter: (to, from, next) => {
            const token = localStorage.getItem('token');
            const userToken = localStorage.getItem('User_token');
            
            if (token && userToken) {
                next();
            } else {
                next("/dang-nhap");
            }
        },
    },
    {
        path: "/dang-nhap",
        name: "DangNhap",
        component: () => import("@/views/DangNhap.vue"),
        beforeEnter: (to, from, next) => {
            const sessionUser = store.state.session_user;
            if (sessionUser) {
                next("/");
            } else {
                next();
            }
            // const isAuthenticated = !!localStorage.getItem('user'); // Kiểm tra đăng nhập

            // if (to.meta.requiresAuth && !isAuthenticated) {
            //   next('/login'); // Chuyển hướng đến trang đăng nhập
            // } else if (to.path === '/login' && isAuthenticated) {
            //   next('/'); // Nếu đã đăng nhập mà vào login thì chuyển về home
            // } else {
            //   next(); // Tiếp tục điều hướng bình thường
            // }
        },
    },
    {
        path: "/dang-ky",
        name: "DangKy",
        component: () => import("@/views/DangKy.vue"),
        beforeEnter: (to, from, next) => {
            const sessionUser = store.state.session_user;
            if (sessionUser) {
                next("/");
            } else {
                next();
            }
        },
        // beforeEnter: (to, from, next) => {
        //     const sessionUser = store.state.session_user;
        //     if (sessionUser) {
        //         next("/");
        //     } else {
        //         next();
        //     }
        // },
    },
    {
        path: '/360-product',
        name: 'product360',
        component: () => import("@/views/360_Product.vue"),
        beforeEnter: (to, from, next) => {
            const sessionUser = store.state.session_user;
            if (sessionUser) {
                next();
            } else {
                next('/dang-nhap');
            }
        },
    },
    {
        path: '/about',
        name: 'about',
        component: () => import("@/views/about.vue"),
        // beforeEnter: (to, from, next) => {
        //     const sessionUser = store.state.session_user;
        //     if (sessionUser) {
        //         next();
        //     } else {
        //         next('/dang-nhap');
        //     }
        // },
    },
    {
        path: '/3D-product',
        name: 'product3D',
        component: () => import("@/views/3D_Product.vue"),
        beforeEnter: (to, from, next) => {
            const sessionUser = store.state.session_user;
            if (sessionUser) {
                next();
            } else {
                next('/dang-nhap');
            }
        },
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'not-found',
        component: NotFound
    },
  
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

router.beforeEach((to, from, next) => {
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
    const sessionUser = store.state.session_user;

    if (requiresAuth && !sessionUser) {
        next('/dang-nhap');
    } else {
        next();
    }
});
// router.beforeEach((to, from, next) => {
//     const isAuthenticated = localStorage.getItem('token')
    
//     if (to.name !== 'DangNhap' && !isAuthenticated) {
//       next({ name: 'DangNhap' })
//     } else if (to.name === 'DangNhap' && isAuthenticated) {
//       next({ name: 'trangchu' })
//     } else {
//       next()
//     }
//   })

export default router;
