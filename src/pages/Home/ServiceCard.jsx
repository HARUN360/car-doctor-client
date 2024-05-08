import { Link } from "react-router-dom";


const ServiceCard = ({service}) => {
    const {_id,title, img, price} = service;
    return (
        <div className="card  bg-base-100 shadow-xl">
        <figure className="px-10 pt-10">
          <img src={img} alt="Shoes" className="rounded-xl" />
        </figure>
        <div className="card-body items-start text-center">
          <h2 className="card-title">{title}</h2>
          <p className="text-[#FF3811] text-xl font-bold">Price: ${price}</p>
          <div className="card-actions">
           <Link to={`/book/${_id}`}> <button className="btn btn-primary">Book Now</button></Link>
          </div>
        </div>
      </div>
    );
};

export default ServiceCard;