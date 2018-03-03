import React from 'react';
import ReactDOM from 'react-dom'

class BookAppointment extends React.Component{
    render(){
        return(
            <div>
                <h1>Book Appointment</h1>
            </div>
        );
    }
}

ReactDOM.render(<BookAppointment />, document.getElementById('root'));