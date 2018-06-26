import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import ReduxToastr from "react-redux-toastr";
import "semantic-ui-css/semantic.min.css";
import "react-redux-toastr/lib/css/react-redux-toastr.min.css";

import "./index.css";
import App from "./app/layout/App";
import registerServiceWorker from "./registerServiceWorker";
import { configureStore } from "./app/store/configureStore";
import ScrollToTop from "./app/common/util/ScrollToTop";

const store = configureStore();
// store.dispatch(loadEvents());

store.firebaseAuthIsReady.then(() => {
  ReactDOM.render(
    <Provider store={store}>
      <BrowserRouter>
        <ScrollToTop>
          <ReduxToastr
            position="bottom-right"
            transitionIn="fadeIn"
            transitionOut="fadeOut"
          />
          <App />
        </ScrollToTop>
      </BrowserRouter>
    </Provider>,
    document.getElementById("root")
  );
});

registerServiceWorker();

if (module.hot) {
  module.hot.accept();
}
