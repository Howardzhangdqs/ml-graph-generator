import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
    {
        path: "/transformer",
        name: "Transformer (Example)",
        component: () => import("@/example/ExampleTransformer.vue"),
    },
    {
        path: "/modules",
        name: "All modules available",
        component: () => import("@/example/ExampleModule.vue"),
    },
    {
        path: "/resnet",
        name: "Resnet (Example)",
        component: () => import("@/example/ExampleResnet.vue"),
    },
];

export const router = createRouter({
    history: createWebHashHistory(),
    routes
});

export default router;