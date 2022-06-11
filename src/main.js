import { createApp } from "vue";
import App from "./App.vue";

//import CSS Bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import Toast, { POSITION } from "vue-toastification";
// Import the CSS or use your own!
import "vue-toastification/dist/index.css";

const myApp = createApp(App);

const options = {
  position: POSITION.TOP_RIGHT,
};

myApp.use(Toast, options);

myApp.mount("#app");
