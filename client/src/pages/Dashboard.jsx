import React from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";

const Dashboard = () => {

    const navigate = useNavigate()
    return(
        <div className="min-h-screen">
            
            {/* Navbar for Recruiter panel */}
            <div className="shadow py-4">
                <div className="px-5 flex justify-between items-center">
                    <img onClick = {e => navigate('/')}className = "max-sm:w-32 cursor-pointer "src={assets.logo} alt="" />
                    <div className="flex items-center gap-3">
                        <p className="max-sm:hidden">Welcome, GreatStack</p>
                        <div className="relative group">
                            <img className="w-8 border rounded-full" src={assets.company_icon} alt="" />
                            <div className="absolute hidden group-hover:block top-0 right-0 z-10 text-black rounded pt-12">
                                <ul className="list0none m-0 p-2 bg-white rounded-md border text-sm">
                                    <li className="py-1 px-2 cursor-pointer pr-10">Logout</li>
                                </ul>
                            </div> 
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex items-start">

                {/* left sidebar with option to add job, manage jobs, view applications*/}
                <div>
                    <ul>
                        <NavLink to={'/dashboard/add-job'}>
                            <img src={assets.add_icon} alt="" />
                            <p>Add Job</p>
                        </NavLink>

                        <NavLink to={'/dashboard/manage-jobs'}>
                            <img src={assets.home_icon} alt="" />
                            <p>Manage Jobs</p>
                        </NavLink>

                        <NavLink to={'/dashboard/view-applications'}>
                            <img src={assets.person_tick_icon} alt="" />
                            <p>View Applications</p>
                        </NavLink>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Dashboard