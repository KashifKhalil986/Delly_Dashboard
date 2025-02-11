import { useEffect, useState } from "react";
import Navbar from "../../Navbar/Navbar";
import LeftSideBar from "../../LeftSideBar/LeftSideBar";
import { useSelector } from 'react-redux';
import { useLocation } from "react-router-dom";

const CategoryRegistrationForm = () => {
  const currentTheme = useSelector((state => state.theme.theme))
  const location = useLocation();

  const [formData, setFormData] = useState({
    categoryName: "",
    categoryDescription: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Category Submitted:", formData);
    alert("Category registered successfully!");
    setFormData({
      categoryName: "",
      categoryDescription: "",
    });
  };

  useEffect(()=>{
    if(location?.state?.category){
      console.log(location?.state?.category)
      setFormData({
        categoryName:location.state.category.categoryName,
        categoryDescription:location.state.category.categoryDescription,
      })
    }
  },[location.state])

  return (
    <>
      <Navbar />
      <div className="flex flex-col lg:flex-row">
        <LeftSideBar />
        <div className={`flex flex-col items-center lg:ml-10 w-full lg:w-[1000px] h-screen ${currentTheme === 'dark' ? 'text-white' : 'text-gray-600'} `}>
          <form
            onSubmit={handleSubmit}
            className={`${currentTheme === 'dark' ? 'bg-[#404040]' : 'bg-white'} mt-5 shadow-lg rounded-lg p-6 w-full lg:w-[800px] border border-gray-300`}
          >
            <h2 className={`text-2xl font-bold mb-6 text-center ${currentTheme === 'dark' ? 'text-white' : 'text-gray-700'} `}>
              Category Registration
            </h2>

            <div className="flex flex-col lg:flex-row justify-between">
              <div className="w-full lg:w-[350px]">
                <label
                  htmlFor="categoryName"
                  className="block text-sm font-medium "
                >
                  Category Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="categoryName"
                  id="categoryName"
                  value={formData.categoryName}
                  onChange={handleChange}
                  className={`w-full mt-2 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#013D29] ${currentTheme === 'dark' ? 'text-white' : 'text-black'} ${currentTheme === 'dark' ? 'bg-[#404040]' : 'white]'}`}
                  placeholder="Enter category name"
                  required
                />
              </div>
              <div className="w-full lg:w-[350px]">
                <label
                  htmlFor="categoryDescription"
                  className="block text-sm font-medium "
                >
                  Description <span className="text-red-500">*</span>
                </label>
                <input
                  name="categoryDescription"
                  id="categoryDescription"
                  value={formData.categoryDescription}
                  onChange={handleChange}
                  className={`w-full mt-2 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#013D29] ${currentTheme === 'dark' ? 'text-white' : 'text-black'} ${currentTheme === 'dark' ? 'bg-[#404040]' : 'white]'}`}
                  placeholder="Enter description"
                  required
                />
              </div>
            </div>

            <div className="flex justify-end mt-6">
              <button
                type="submit"
                className={`px-4 py-2 rounded ${currentTheme === 'dark' ? 'text-white' : 'text-black'} ${currentTheme === 'dark' ? 'bg-[#404040]' : 'bg-[#F0FFF8]'} border border-gray-300`}
              >
                Register Category
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default CategoryRegistrationForm;
