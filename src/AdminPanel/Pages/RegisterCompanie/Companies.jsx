import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import LeftSideBar from "../../LeftSideBar/LeftSideBar";
import Navbar from "../../Navbar/Navbar";
import GenericTable from "../../Components/Table/GenericTable";
import { fetchCompanies } from "../../Slice/CompanySlice";
import DeleteModal from "../../Components/DeleteModal";
import CompanyGraph from "../../Components/CompanyGraph";

const Companies = () => {
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [rowToShow, setRowsToShow] = useState(5);
    const [initialCount,setInitialCount]=useState(0);
    const [searchQuery, setSearchQuery] = useState("");

    const currentTheme = useSelector((state) => state.theme.theme);
    const dispatch = useDispatch();
    const { data: companiesData, loading, error } = useSelector((state) => state.companies);
    
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(fetchCompanies());
    }, [dispatch]);

    const handleRowChange = (e) => {
        setRowsToShow(parseInt(e.target.value, 10));
        setInitialCount(0);
    };

    const handleSearchQuery = (e) => {
        setSearchQuery(e.target.value.toLowerCase());
    };

    const handleDelete = () => {
        setIsDeleteModalOpen(true);
    };

    const handleEdit = (item) => {
        navigate("/register-form", { state: { mode: "edit", companies: item } });
    };

    const filterData = companiesData.filter((companies) =>
      companies.companyName.toLowerCase().includes(searchQuery) ||
      companies.ownerName.toLowerCase().includes(searchQuery) ||
      companies.address.toLowerCase().includes(searchQuery) ||
      companies.registrationNumber.toLowerCase().includes(searchQuery)
  );
  const showNext = () =>{
    if(initialCount + rowToShow <= filterData.length)
        setInitialCount(initialCount + rowToShow)
}

 const showPrevious = () =>{
if(initialCount - rowToShow >= 0)
    setInitialCount(initialCount -rowToShow)
 }

    const displayData = filterData.slice(initialCount,initialCount+ rowToShow);

    return (
        <div>
            <Navbar />
            <div className='flex flex-col lg:flex-row'>
                <LeftSideBar />
                <div className='flex flex-col lg:ml-10 w-full lg:w-[1000px] gap-3'>
                    <div className="para">
                        <p className={`underline text-xl ${currentTheme === 'dark' ? 'text-white' : 'text-black'}`}>Company Registration</p>
                    </div>

                    <div className="mt-1">                    
                    <CompanyGraph
                     registeredCompanies={companiesData.length}
                     totalCompanies={100} 
                     currentTheme={currentTheme}
                    />
                    </div>
                    <div className="mt-5 flex flex-col lg:flex-row justify-between items-center gap-2">
                        <div className='flex flex-col lg:flex-row gap-2 items-center w-full lg:w-[auto]'>
                            <div className={`flex items-center ${currentTheme === 'dark' ? 'text-white' : 'text-black'} gap-2`}>
                                <span>Show:</span>
                                <select
                                    className={`rounded-md px-4 py-1 ${currentTheme === 'dark' ? 'bg-[#404040]' : 'bg-[#F0FFF8]'} border border-gray-300 focus:outline-none focus:ring focus:ring-[#219b53]`}
                                    value={rowToShow}
                                    onChange={handleRowChange}
                                >
                                    {[...Array(10)].map((_, i) => (
                                        <option key={i + 1} value={i + 1}>{i + 1}</option>
                                    ))}
                                </select>
                            </div>
                            <div className={`flex items-center ${currentTheme === 'dark' ? 'text-white' : 'text-black'} gap-2`}>
                                <span>Entries:</span>
                                <input
                                    type="text"
                                    placeholder="Search by Company Name"
                                    className={`rounded-md px-4 py-1 ${currentTheme === 'dark' ? 'bg-[#404040]' : 'bg-[#F0FFF8]'} border border-gray-300 focus:outline-none focus:ring focus:ring-[#219b53]`}
                                    onChange={handleSearchQuery}
                                />
                            </div>
                        </div>
                        <div className='flex gap-2'>
                            <Link to="/admin">
                                <button className={`px-4 py-2 ${currentTheme === 'dark' ? 'bg-[#404040]' : 'bg-[#F0FFF8]'} ${currentTheme === 'dark' ? 'text-white' : 'text-black'} rounded border`}>Back</button>
                            </Link>
                            <Link to="/register-form">
                                <button className={`px-4 py-2 ${currentTheme === 'dark' ? 'bg-[#404040]' : 'bg-[#F0FFF8]'} ${currentTheme === 'dark' ? 'text-white' : 'text-black'} rounded border`}>Add Company</button>
                            </Link>
                        </div>
                    </div>
                    <div className="table-container overflow-x-auto">
                        {loading && <p>Loading...</p>}
                        {error && <p>Error: {error}</p>}
                        <GenericTable
                            headers={['Sno', 'companyName', 'email', 'ownerName', 'registrationNumber','createdAt','updatedAt', 'Actions']}
                            data={displayData}
                            currentTheme={currentTheme}
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                        />
                    </div>
                    <div className="pages flex justify-center gap-1 mt-4">
                        <button onChange={showPrevious} className={`px-4 py-2 ${currentTheme === 'dark' ? 'bg-[#404040]' : 'bg-[#F0FFF8]'} ${currentTheme === 'dark' ? 'text-white' : 'text-black'} rounded border`}>Previous</button>
                        <button className={`px-4 py-2 ${currentTheme === 'dark' ? 'bg-[#404040]' : 'bg-[#F0FFF8]'} ${currentTheme === 'dark' ? 'text-white' : 'text-black'} rounded border`}>
                        {Math.ceil((initialCount + rowToShow)/ (rowToShow))} of {Math.ceil((filterData.length)/rowToShow)}
                            </button>
                        <button onClick={showNext} className={`px-4 py-2 ${currentTheme === 'dark' ? 'bg-[#404040]' : 'bg-[#F0FFF8]'} ${currentTheme === 'dark' ? 'text-white' : 'text-black'} rounded border`}>Next</button>
                    </div>
                </div>
                <DeleteModal
                    isOpen={isDeleteModalOpen}
                    onClose={() => setIsDeleteModalOpen(false)}
                />
            </div>
        </div>
    );
};

export default Companies;
