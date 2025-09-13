import React from 'react'
import axios from "axios";
import {useState , useEffect} from "react"
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';
import gsap from "gsap";
const Login = () => {
    const [email, setemail] = useState("")
    const [password, setpassword] = useState("");
        
        useEffect(() => {
        gsap.from(".login-form", {
        opacity: 1,
        y: 70,
        duration: 3,
        ease: "power3.out"
        });
    }, []);

    const hangleLogin = async(e) => {
        e.preventDefault();
        try{
            const res = await axios.post("http://localhost:3000/login", {email , password});
            toast.success('Login Successfully', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });


        } catch(err) {
            toast.error('Something Went wrong', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light", 
        });
        }
    }
    return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 ">
       <form
          onSubmit={hangleLogin}
          className="login-form bg-white p-10 mb-20 w-full rounded-4xl shadow-2xl max-w-sm"
          style={{ minHeight: "500px" }}
       >
          <h2 className="text-2xl font-extrabold mb-6 text-center">Login Page</h2>
          <div className="mb-6">
              <label htmlFor="email" className="block text-gray-700 mb-2 font-extrabold">Email:</label>
              <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={e => setemail(e.target.value)}
                  placeholder='Ex.John'
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
          </div>
          <div className="mb-6">
              <label htmlFor="password" className="block text-gray-700 mb-2 font-extrabold" >Password:</label>
              <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={e => setpassword(e.target.value)}
                  placeholder='Ex.john@example.com'
                  required
                  className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 rounded-xl"
              />
          </div>
          <Link to="/register">
          <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 hover:bg-blue-700 transition-colors font-bold text-2xl rounded-2xl"
          >
              Sign In
          </button>
          </Link>
          <p className="mt-4 text-center text-gray-600">
              Don't have an account? 
              {/* <Link to="/Signup" className="text-blue-600 hover:underline mr-2">Sign Up</Link> */}
          </p>
       </form>
    </div>
  )
}

export default Login

