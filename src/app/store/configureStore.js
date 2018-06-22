import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "../reducers/rootReducer";

export const configureStore = preloadedState => {
  // handle middlewares
  const middlewares = [thunk];
  const middlewareEnhancer = applyMiddleware(...middlewares);

  // put together enhancers
  const storeEnhancers = [middlewareEnhancer];
  const composedEnhancer = composeWithDevTools(...storeEnhancers);

  // create store
  const store = createStore(rootReducer, preloadedState, composedEnhancer);

  // hot reloading for redux
  if (process.env.NODE_ENV !== "production") {
    if (module.hot) {
      module.hot.accept("../reducers/rootReducer", () => {
        const newRootReducer = require("../reducers/rootReducer").default;
        store.replaceReducer(newRootReducer);
      });
    }
  }
  return store;
};
