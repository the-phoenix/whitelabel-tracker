import React from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import { store } from "./stores";
// import Home from './containers/Home';
import Tags from "./containers/Tags";

const persistor = persistStore(store);

function App() {
  persistor.purge();

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Tags />
        <div className="bg-white dark:bg-gray-800">
          <h1 className="text-gray-900 dark:text-white">Dark mode is here!</h1>
          <p className="text-gray-600 dark:text-gray-300">Lorem ipsum...</p>
        </div>
      </PersistGate>
    </Provider>
  );
}

export default App;
