import React, { Component } from 'react';
import { SafeAreaView } from 'react-native';
import { Root } from 'native-base';
import { Provider } from 'react-redux';
import storage from 'redux-persist/lib/storage';
import { persistStore, persistCombineReducers } from 'redux-persist';
import createSagaMiddleware from 'redux-saga';
import { PersistGate } from 'redux-persist/es/integration/react';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import MainScreen from './src/screens/MainScreen';
import reducers from './src/reducers';
import rootSaga from './src/sagas';


const config = {
    key: 'root',
    storage,
};

const reducer = persistCombineReducers(config, reducers);
const sagaMiddleware = createSagaMiddleware();

function configureStore() {
    const store = createStore(
        reducer,
        undefined,
        composeWithDevTools(
            applyMiddleware(sagaMiddleware)
        )
    );
    sagaMiddleware.run(rootSaga);
    const persistor = persistStore(store);

    return { persistor, store };
}

const { persistor, store } = configureStore();

export default class App extends Component {
    render() {
        return (
            <Root>
                <SafeAreaView style={{ flex: 1, backgroundColor: '#ddd' }} >
                    <Provider store={store} >
                        <PersistGate persistor={persistor}>
                            <MainScreen />
                        </PersistGate>
                    </Provider>
                </SafeAreaView>
            </Root>
        );
    }
}
