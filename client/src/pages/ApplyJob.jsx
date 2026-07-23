import React, { useContext, useEffect, useState } from "react";
import {Navigate, useNavigate, useParams} from 'react-router-dom'
import AppContext from "../context/AppContext";
import Loading from "../components/Loading";
import Navbar from "../components/Navbar";
import { assets } from "../assets/assets";
import kconvert from 'k-convert';
import moment from 'moment';
import JobCard from "../components/JobCard";
import Footer from "../components/Footer";
import { toast } from "react-toastify";
import axios from "axios";
import { useAuth } from "@clerk/react";
const ApplyJob = () => {

    const {id} = useParams() //According to this id we will find the job id and send the data to the stata variable.
    const {getToken} = useAuth()
    const navigate = useNavigate()
    const [JobData ,setJobData] = useState(null)
    const [isAlreadyApplied, setIsAlreadyApplied] = useState(false)

    const {jobs, backendUrl,userData, userApplications, fetchUserApplications } = useContext(AppContext);

    const fetchJob = async () =>{
       
        try {
            const {data} = await axios.get(backendUrl+ `/api/jobs/${id}`)

        if(data.success){
            setJobData(data.job)
        } else{
            toast.error(data.message)
        }
        } catch (error) {
            toast.error(error.message)
        }
        
    }

    const applyHandler = async () =>{
        try {
            
            if(!userData){
                return toast.error('Login to apply for jobs')
            }
            
            if(!userData.resume){
                navigate('/applications')
                return toast.error('Upload resume to apply')
            }

            const token = await getToken()

            const {data} = await axios.post(backendUrl+'/api/users/apply',
                {jobId:JobData._id},
                {headers:{Authorization:`Bearer ${token}`}}
            )
            if(data.success){
                toast.success(data.message)
                fetchUserApplications()
            } else{
                toast.error(data.message)
            }
        } catch (error) {
                toast.error(error.message)           
        }
    }

    const checkAlreadyApplied = () =>{
        const hasApplied = userApplications.some(item => item.jobId._id === JobData._id)
        setIsAlreadyApplied(hasApplied)

    }

    useEffect(() =>{
        fetchJob()
    },[id])

    useEffect(()=>{
        if(userApplications.length >0  && JobData){
            checkAlreadyApplied()
        }
    },[JobData,userApplications,id])
    return JobData ? ( // terninary operator so that to display the job data.
        <>
        <Navbar/>
        <div className="min-h-screen flex flex-col py-10 container px-4 2xl:px-20 mx-auto">
            <div className="bg-white text-black rounded-lg w-full">
                <div className="flex justify-between items-center flex-wrap gap-8 px-10 py-10 mb-8 bg-gradient-to-r from-sky-50 to-blue-50 border border-blue-200 rounded-2xl shadow-md">
                    <div className="flex flex-col md:flex-row items-center">
                        <img  className="w-24 h-24 object-contain bg-white rounded-xl p-4 mr-5 border shadow-sm" src={JobData.companyId.image} alt=""/>
                        <div className="text-center md:text-left text-neutral-700">
                            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">{JobData.title}</h1>
                            <div className="flex flex-row flex-wrap max-md:justify-center gap-y-2 gap-6 items-center text-gray-600 mt-2">
                                <span className="flex items-center gap-1">
                                    <img className="w-5 h-5" src={assets.suitcase_icon} alt="" />
                                    {JobData.companyId.name}
                               </span>
                               <span className="flex items-center gap-1">
                                <img className="w-5 h-5" src={assets.location_icon} alt="" />
                                {JobData.location}
                               </span>
                               <span className="flex items-center gap-1">
                                <img src={assets.person_icon} alt="" />
                                {JobData.level}
                               </span>
                               <span className="flex items-center gap-1">
                                <img src={assets.money_icon} alt="" />
                                CTC: {kconvert.convertTo(JobData.salary)}
                               </span>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col justify-center text-end text-sm max-md:mx-auto max-md:text-center">
                        <button onClick={applyHandler} className="bg-blue-600 p-2.5 px-10 text-white rounded"> {isAlreadyApplied? 'Already Applied':'ApplyNow'}</button>
                        <p className="mt-1 text-gray-600">Posted {moment(JobData.date).fromNow()}</p>
                    </div>

                </div>

            <div className="flex flex-col lg:flex-row justify-between items-start">
                <div className="w-full lg:w-2/3 bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
                    <h2 className="text-3xl font-bold text-gray-900 mb-6">Job description</h2>
                    <div
                        className="rich-text text-gray-700 leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: JobData.description }}
                    ></div>
                <button onClick={applyHandler} className="mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-10 py-3 rounded-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                    {isAlreadyApplied? 'Already Applied':'ApplyNow'}
                </button>
                </div>
                {/* Right section More Jobs */}
                <div className="w-full lg:w-1/3 mt-8 lg:mt-0 lg:ml-8 space-y-5">
                    <h2>More jobs from {JobData.companyId.name}</h2>
                    {jobs.filter(job => job._id !== JobData._id && job.companyId._id === JobData.companyId._id)
                    .filter(job => {
                        // Set of applied jobIds
                        const appliedJobsIds = new Set(userApplications.map(app => app.jobId && app.jobId._id))
                        //Return true if the user has not applied for this job
                        return !appliedJobsIds.has(job._id)
                    }).slice(0,4)
                    .map((job,index)=> <JobCard key={index} job={job} />)}
                </div>
            </div>

            </div>
        </div>
        <Footer/>
        </>
    ) : (
        <Loading/>
    )
}

export default ApplyJob