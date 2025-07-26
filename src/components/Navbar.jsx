import React from 'react'

const Navbar = () => {
  return (
      <nav className="flex justify-between bg-slate-800 text-white py-2">
        <div className="logo">
            <span className="font-bold text-xl mx-8 text-orange-500">iTask</span>
        </div>
        <ul className="flex gap-16 mx-9">
            <li className="cursor-pointer transition-all hover:font-bold">Home</li>
            <li className="cursor-pointer transition-all hover:font-bold">Your Tasks</li>
        </ul>
      </nav>
  )
}

export default Navbar
