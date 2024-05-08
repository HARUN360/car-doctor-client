
import { Link } from 'react-router-dom';
import img from '../../assets/images/login/login.svg'
import { useContext } from 'react';
import { AuthContext } from '../../providers/AuthProvider';

const SignUp = () => {

    const {creatUser} = useContext(AuthContext)

    const handleSignUp = e => {
        
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;
        console.log(name,email,password);
        creatUser(email, password)
        .then(result => {
            console.log(result.user);
        })
        .catch(error => {
            console.error(error);
        })

    }

    return (
        <div className="hero min-h-screen bg-base-200 my-10 rounded-xl">
            <div className="hero-content flex-col lg:flex-row">
                <div className="md:mr-10 w-1/2">
                   <img src={img} alt="login img" />
                </div>
                <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <form onSubmit={handleSignUp} className="card-body">
                        <h1 className="text-5xl text-center font-bold">Sign Up</h1>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input type="text" placeholder="Enter Your Name" name='name' className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" placeholder="email" name='email' className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password" placeholder="password" name='password' className="input input-bordered" required />
                            <label className="label">
                                <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                            </label>
                        </div>
                        <div className="form-control mt-6">
                            
                            <input type='submit' value='SignUP' className='btn btn-primary' />
                        </div>
                    </form>
                    <p className='text-center my-4'>Already Have Your Account <Link to='/login' className='text-orange-600 font-bold'>Plsese Sign In</Link> </p>
                </div>
            </div>
        </div>
    );
};

export default SignUp;