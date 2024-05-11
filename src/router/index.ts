import { createRouter, createWebHashHistory } from "vue-router";

export const routes = [
    {
        path: "/",
        name: "Entry",
        component: () => import("./Entry.vue"),
    },
    {
        path: "/modules",
        name: "All modules available",
        component: () => import("@/example/ExampleModule.vue"),
    },
    {
        path: "/transformer",
        name: "Transformer (Example)",
        component: () => import("@/example/ExampleTransformer.vue"),
    },
    {
        path: "/resnet",
        name: "Resnet (Example)",
        component: () => import("@/example/ExampleResnet.vue"),
    },
    {
        path: "/lenet",
        name: "Lenet (Example)",
        component: () => import("@/example/ExampleLenet.vue"),
    },
    {
        path: "/lstm",
        name: "LSTM (Example)",
        component: () => import("@/example/ExampleLSTM.vue"),
    }
];

export const router = createRouter({
    history: createWebHashHistory(),
    routes
});

export default router;