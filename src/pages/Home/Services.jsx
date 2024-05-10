// import { useEffect, useState } from "react";
import useServices from "../../hooks/useServices";
import ServiceCard from "./ServiceCard";


const Services = () => {

    const services = useServices();

    // const [services, setServices] = useState([])
    // useEffect(()=> {
    //     fetch('https://car-doctor-server-gamma-teal.vercel.app/services')
    //     .then(res => res.json())
    //     .then(data => setServices(data))
    // },[])
    return (
        <div className="my-10">
            <div>
                <h4 className="text-2xl text-center font-bold text-[#FF3811]">Service</h4>
                <h1 className="text-4xl text-center py-2 font-bold text-[#151515]">Our Service Area</h1>
                <p className="text-center md:mx-16  text-md">the majority have suffered alteration in some form, by injected humour, or randomised words which donot look even slightly believable. </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {
                    services.map(service => <ServiceCard key={service._id} service={service}></ServiceCard>)
                }
            </div>
        </div>
    );
};

export default Services;