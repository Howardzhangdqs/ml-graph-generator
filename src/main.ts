import "./assets/main.css";
import "katex/dist/katex.min.css";

import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";

import { createI18n } from "vue-i18n";
import I18nMessages from "./i18n_messages";

const app = createApp(App);

const i18n = createI18n({
    messages: I18nMessages,
});

app.use(createPinia());
app.use(router);

app.use(i18n);

app.mount("#app");