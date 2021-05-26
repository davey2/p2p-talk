import Peer from "peerjs";
import { createApp } from "vue";
import App from "./App.vue";

const app = createApp(App);

app.config.globalProperties.peer = new Peer();

app.mount("#app");
