import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import allReducers from "../reducers";
import { createLogger } from "redux-logger";
import createSagaMiddleware from "redux-saga";
import rootSaga from "../sagas";

const logger = createLogger();
const sagaMiddleware = createSagaMiddleware();

export default function configureStore(initialState) {
  const store = createStore(
    allReducers,
    initialState,
    composeWithDevTools(applyMiddleware(logger, sagaMiddleware))
  );
  sagaMiddleware.run(rootSaga);

  return store;
}
