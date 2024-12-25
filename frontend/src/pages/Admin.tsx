import { useEffect } from "react";
import { useGlobalContext } from "../components/context/GlobalContext";
// import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../components/dashboard/Sidebar";
import Header from "../components/dashboard/Header";

const Admin = () => {
  // const [currentPage, setCurrentPage] = useState(0);
  // const [approvalLoading, setApprovalLoading] = useState(false);
  // const [confirmWithdrawal, setConfirmWithdrawal] = useState(false);

  const navigate = useNavigate();

  // const closeModal = () => {
  //   setConfirmWithdrawal(!confirmWithdrawal);
  // };

  // const itemsPerPage = 10;

  const { allUsers, withdrawalsForAdmin, userProfileState } =
    useGlobalContext();

  useEffect(() => {
    if (userProfileState && userProfileState.role == "admin") {
      allUsers();
      withdrawalsForAdmin();
    } else {
      navigate("/");
    }
  }, []);

  // const handleNextPage = () => {
  //   if ((currentPage + 1) * itemsPerPage < allUsersState.length) {
  //     setCurrentPage(currentPage + 1);
  //   }
  // };

  // const handlePreviousPage = () => {
  //   if (currentPage > 0) {
  //     setCurrentPage(currentPage - 1);
  //   }
  // };

  // const dateFormatter = (date: string) => {
  //   const newDate = new Date(date);
  //   return newDate.toDateString();
  // }

  // const formatWallet = (wallet: string) => {
  //   if (wallet.length <= 8) return wallet;
  //   return `${wallet.slice(0, 4)}******${wallet.slice(-4)}`;
  // };

  // const processWithdrawal = (id: number) => {
  //   setApprovalLoading(true);
  //   approveWithdrawal(id);
  //   setApprovalLoading(false);
  // }

  return (
    <div className="flex bg-neutral-100 w-full h-screen">
      {userProfileState && userProfileState.role == "admin" ? (
        <>
          <Sidebar />
          <div className="w-full p-3 flex flex-col gap-5">
            <Header />
            <div className="h-full overflow-y-auto">
              <Outlet />
            </div>
          </div>
        </>
      ) : (
        <div className="text-center text-lg font-semibold">
          You are not authorized to view this content.
        </div>
      )}
    </div>
  );
};

export default Admin;

