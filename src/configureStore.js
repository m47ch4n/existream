import { createBrowserHistory } from 'history'
import { applyMiddleware, createStore } from 'redux'
import { routerMiddleware } from 'connected-react-router'
import { createLogger } from 'redux-logger'
import createSagaMiddleware from 'redux-saga'
import createRootReducer from './reducers'
import sagas from './sagas'

export const history = createBrowserHistory()

export default function configureStore(preloadedState) {
  const sagaMiddleware = createSagaMiddleware()
  let middleware = [
    routerMiddleware(history),
    sagaMiddleware,
  ]
  if (process.env.NODE_ENV !== 'production') {
    middleware = [
      ...middleware,
      createLogger({ collapsed: true, diff: true })
    ]
  }

  const store = createStore(
    createRootReducer(history),
    preloadedState,
    applyMiddleware(...middleware)
  )

  sagaMiddleware.run(sagas)

  return store
}
