import React from 'react';
import './BookAppointment.css';

class BookAppointment extends React.Component{
    render(){
        return(
            <div>
                <h1 className="Alignment">Book Appointment</h1>
                <section className="Alignment">
                    <p> I am booking for:</p>
                    <p>API to be used: Get Patient details</p>
                    Search Doctor:
                    <select className="doctorMenu">
                        <option value="sharma">Dr. Sharma</option>
                    </select>
                    
                </section>
                        <br/><br/>
                <section className="layout">
                    <br/><br/>
                    <p>General Appointments</p>
                    <button className="routineappointmentButton">Routine Appointment</button>
                    <br/><br/><br/><br/>
                    <p>Need medical advice?</p>
                    <button className="helplineButton">Call the free 24/7 helpline</button>
                    <br/><br/><br/>
                </section>
                <section className="footer">
                   <table align="center">
                       <thead>
                       <tr>
                           <th width="90"><img src={process.env.PUBLIC_URL+'assets/images/home.png'} alt="Home" className="inline-block"></img></th>
                           <th width="90"><img src={process.env.PUBLIC_URL+'assets/images/profile.png'} alt="Profile" className="inline-block"></img></th>
                           <th width="90"><img src={process.env.PUBLIC_URL+'assets/images/message.png'} alt="Message" className="inline-block"></img></th>
                           <th width="90"><img src={process.env.PUBLIC_URL+'assets/images/settings.png'} alt="Settings" className="inline-block"></img></th>
                       </tr>
                       </thead>
                       <tbody>
                       <tr className="Alignment">
                       <td>Home</td>
                       <td>Profile</td>
                       <td>Message</td>
                       <td>Settings</td>
                       </tr>
                       </tbody>
                   </table>
                </section>
                
            </div>
        );
    }
}

export default BookAppointment;