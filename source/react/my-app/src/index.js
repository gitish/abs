import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import BookAppointment from './components/BookAppointment';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<BookAppointment />, document.getElementById('root'));
registerServiceWorker();
