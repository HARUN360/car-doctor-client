import { useContext } from "react";
import { useLoaderData } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";

const Bookservice = () => {
    const service = useLoaderData();
    const {_id,title, img, price} = service;
    const {user} = useContext(AuthContext)


    const handleBookService = e => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const date = form.date.value;
        const email = form.email.value;
        const price = form.price.value;
        // console.log(name,date,email,price);
        const booking = {
            customerName: name,
            email,
            img,
            date,
            service: title,
            service_id: _id,
            price: price,
        }
        console.log(booking);

        fetch('http://localhost:5000/bookings', {
            method: 'POST',
            headers: {
               'content-type': 'application/json'
            },
            body: JSON.stringify(booking)
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            if(data.insertedId){
                alert('service booking succesfully')
            }
        })

    }

    return (
        <div>
            <h2 className="text-center text-4xl font-semibold">Book Service {title} </h2> 
   
      <form onSubmit={handleBookService} className="card-body">
     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
     <div className="form-control">
          <label className="label">
            <span className="label-text">Name</span>
          </label>
          <input type="text" name="name" defaultValue={user?.displayName} className="input input-bordered" required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Date</span>
          </label>
          <input type="date" name="date"   className="input input-bordered" required />
        
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input type="email" name="email" defaultValue={user?.email} className="input input-bordered" required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Due amount</span>
          </label>
          <input type="text" name="price" defaultValue={'$'+price} className="input input-bordered" required />
        
        </div>
     </div>
        <div className="form-control mt-6">
        
          <input className="btn btn-primary btn-block" type="submit" value="Order Conform" />
        </div>
      </form>
        </div>
    );
};

export default Bookservice;