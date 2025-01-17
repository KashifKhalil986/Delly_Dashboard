// import React from 'react';
import Navbar from '../../Navbar/Navbar';
import LeftSideBar from '../../LeftSideBar/LeftSideBar';
import companydata from '../../../../public/companyregistration.json';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash  } from '@fortawesome/free-solid-svg-icons';

const Companies = () => {
  return (
    <div>
      <Navbar />
      <div className="flex flex-col lg:flex-row">
        <LeftSideBar />
        <div className="flex flex-col lg:ml-10 w-full lg:w-[1000px] gap-3">
          <div className="para">
            <p className="underline text-xl">Company Registration</p>
          </div>
          <div className="info flex flex-col lg:flex-row justify-between items-center gap-2">
            <div className="flex flex-col lg:flex-row gap-2 items-center w-full lg:w-[auto]">
              <div className="flex items-center gap-2">
                <span>Show:</span>
                <select
                  className="rounded-md px-4 py-1 bg-[#F0FFF8] border border-gray-300 focus:outline-none focus:ring focus:ring-[#219b53]"
                >
                  <option value="one">01</option>
                  <option value="two">02</option>
                  <option value="three">03</option>
                  <option value="four">04</option>
                  <option value="five">05</option>
                </select>
              </div>
              <div className="flex items-center gap-2">
                <span>Entries :</span>
                <input
                  type="text"
                  placeholder="Search by Company Name"
                  className="rounded-md px-4 py-1 bg-[#F0FFF8] border border-gray-300 focus:outline-none focus:ring focus:ring-[#219b53]"
                />
              </div>
            </div>
            <div className="flex gap-2">
            <Link to="/">
                           <button className="px-4 py-2  rounded bg-[#F0FFF8] border ">
                                Back
                            </button>
                           </Link>
              <Link to="/register-form">
                <button className="px-4 py-2 rounded bg-[#F0FFF8] border">Add Companies</button>
              </Link>
            </div>
          </div>
          <div className="table-container overflow-x-auto border border-3 ">
            <table className="border-collapse border border-gray-300 w-full  table-auto">
              <thead>
                <tr>
                  {companydata.headers.map((item, index) => (
                    <th key={index} className="bg-[#F0FFF8] px-2  py-2">{item}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {companydata.data.map((item, index) => (
                  <tr key={index} className="hover:bg-gray-100">
                    <td className="px-4 py-2 text-center">{item.companyName}</td>
                    <td className="px-4 py-2 text-center">{item.email}</td>
                    <td className="px-4 py-2 text-center">{item.password}</td>
                    <td className="px-4 py-2 text-center ">
                        <img src={item.image} alt={item.companyName}
                        className='w-8 h-8 rounded-full' />
                    </td>
                    <td className="px-4 py-2 text-center">{item.status}</td>
                    <td className="px-4 py-2 text-center">
                      <FontAwesomeIcon icon={faEdit} className="text-green-500 mr-2 cursor-pointer " />
                      <FontAwesomeIcon icon={faTrash } className="text-red-500 cursor-pointer " />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="pages flex justify-center gap-1 mt-4">
            <button className="px-4 py-2 rounded bg-[#F0FFF8] border">Previous</button>
            <button className="px-4 py-2 rounded bg-[#F0FFF8] border">1 of 1</button>
            <button className="px-4 py-2 rounded bg-[#F0FFF8] border">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Companies;