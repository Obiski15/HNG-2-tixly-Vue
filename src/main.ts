import { createApp } from "vue";
import "vue-sonner/style.css";
import App from "./App.vue";
import { installProviders } from "./plugins/providers";
import { router } from "./router";
import "./style.css";

const app = createApp(App);

app.use(router);
installProviders(app);

app.mount("#app");
