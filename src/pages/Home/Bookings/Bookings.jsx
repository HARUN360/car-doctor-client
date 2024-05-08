import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import BookingRow from "./BookingRow";
import axios from "axios";

const Bookings = () => {
    const { user } = useContext(AuthContext);
    const [bookings, setBookings] = useState([]);

    const url = `http://localhost:5000/bookings?email=${user?.email}`;
    useEffect(() => {
        axios.get(url, {withCredentials:true})
        .then(res => {
            setBookings(res.data)
        })
        // fetch(url)
        //     .then(res => res.json())
        //     .then(data => {
        //         setBookings(data);
        //     })
    }, [url]);

    const handleDelete = id => {
        const proceed = confirm('Are You Sure your want to delete');
        if(proceed){
            fetch(`http://localhost:5000/bookings/${id}`, {
                method: 'DELETE',

            })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if(data.deletedCount > 0){
                    alert('deleted succesfull');
                    const remaingin = bookings.filter(book => book._id !== id)
                    setBookings(remaingin)
                }
            })
        }
    }

    const handleConfirm = id => {
        fetch(`http://localhost:5000/bookings/${id}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({status: 'confirm'})
    
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            if(data.modifiedCount > 0){
                // updated state
                const remaingin = bookings.filter(booking => booking._id !== id);
                const update = bookings.find(booking => booking._id === id);
                update.status = 'confirm'
                const newBookings = [update, ...remaingin];
                setBookings(newBookings)
            }
        })
       }

    return (
        <div>
            <h1>this is booking: {bookings.length} </h1>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead className="uppercase">
                        <tr>
                            <th>Delete</th>
                            <th>Image</th>
                            <th>Service</th>
                            <th>Date</th>
                            <th>Price</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {
                            bookings.map(booking => <BookingRow 
                                key={booking._id} 
                                booking={booking} 
                                handleDelete={handleDelete} 
                                handleConfirm={handleConfirm}
                                ></BookingRow>)
                        }

                    </tbody>



                </table>
            </div>
        </div>
    );
};

export default Bookings;