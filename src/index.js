import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App/App';
import './index.css';

const store = createStore(rootReducer);

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));