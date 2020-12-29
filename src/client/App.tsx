import React from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import { store } from "./stores";
// import Home from './containers/Home';
import Tags from "./containers/Tags";

const persistor = persistStore(store);

function App() {
  // persistor.purge();  /* Uncomment this line to purge store */

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Tags />
      </PersistGate>
    </Provider>
  );
}

export default App;
