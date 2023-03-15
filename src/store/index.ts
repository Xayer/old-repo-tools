import { createStore, createLogger } from "vuex";
import tags from "./modules/tags";

const debug = process.env.NODE_ENV !== "production";

export default createStore({
  modules: {
    tags,
  },
  strict: debug,
  plugins: debug ? [createLogger()] : [],
});
