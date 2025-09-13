import React from 'react'
import {Link} from 'react-router-dom'

const Register = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-sm p-8 bg-white rounded-3xl shadow-2xl">
        <h2 className="mb-6 text-2xl font-bold text-center text-gray-800">Register</h2>
        <form className="rounded-xl">
          <div className="mb-4">
            <label htmlFor="name" className="block mb-1 text-sm font-medium text-gray-700">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder='Ex.John'
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-2xl focus:outline-none  focus:border-blue-400 items-center"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block mb-1 text-sm font-medium text-gray-700">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder='Ex.john@example.com'
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-2xl focus:outline-none focus:ring focus:border-blue-400 items-center"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block mb-1 text-sm font-medium text-gray-700">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder='Ex.johnXXXXX'
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-2xl focus:ring focus:border-blue-400 items-center"
            />
          </div>
          <button
            type="submit"
            className="w-full text-center py-2 font-semibold text-white bg-blue-600 rounded-2xl hover:bg-blue-700 transition"
          >
            Register
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link to='/' className="text-blue-600 hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Register;
