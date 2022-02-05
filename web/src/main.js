import App from "./App.svelte";
import "./styles/main.scss";

const app = new App({
  target: document.body,
  props: {
    name: "Aether",
  },
});

export default app;
