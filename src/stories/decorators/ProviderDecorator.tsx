import {Provider} from 'react-redux';
import {store} from '../../redux/store';

export const ReduxStoreProviderDecorator = (storeFn: any) => {
    return <Provider store={store}>{storeFn()}</Provider>
}