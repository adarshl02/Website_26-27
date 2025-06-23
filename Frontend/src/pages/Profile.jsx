import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Meteors } from "./../components/accertinityui/Meteor";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { Backdrop, CircularProgress } from "@mui/material";
import Membershiptrial from "./../components/general/Backdrops/Membershiptrial";
import { jsPDF } from "jspdf";
import Certificate from "./../components/general/Certificate";
import html2canvas from "html2canvas";
import Certificatetrial from "../components/general/Backdrops/Certificatetrial";
import { deleteAccount, getAttendeeStatus, getEventTicket, isMember, logoutUser } from "../service/api";
import { Ticket } from "../components/general/Ticket";
import { Ticketorg } from "../components/general/Ticketorg";
import Logout from "@mui/icons-material/Logout";
import { signOutFailure, signOutStart, signOutSuccess } from "../redux/user/userSlice";
import { deleteEvents } from "../redux/events/eventsSlice";
import { getAuth, signOut } from "firebase/auth";
import { toast } from "sonner";
import { Helmet } from "react-helmet-async";
import UpcomingEventNotReleased from "@/components/general/UpcomingEventNotReleased";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { logoutAdmin } from "@/service/api2";

export default function Profile() {
  const { rest: user, token } = useSelector((state) => state.user.currentUser); // Assuming user data is stored in the redux state
  const perks = useRef(null);
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [loading, setLoading] = useState(false);
  const [eventTicketData, setEventTicketData] = useState({});
  const [refresh, setRefresh] = useState(false);
  const [downloadcerificate, setDownloadcerificate] = useState(false);
  const [member, setMember] = useState("");
  const [showpopup, setShowpopup] = useState(false);
  const [loading2, setLoading2] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose2 = () => {
    setOpen2(false);
  };
  const handleOpen2 = () => {
    setOpen2(true);
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = getAuth();

  const scrollToPerks = () => {
    if (perks.current) {
      const yOffset = -80; // Adjust this value according to your navbar's height
      const yPosition =
        perks.current.getBoundingClientRect().top +
        window.pageYOffset +
        yOffset;
      window.scrollTo({ top: yPosition, behavior: "smooth" });
    }
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const downloadCertificate = () => {
    setLoading(true);
    const input = document.getElementById("certificate");

    html2canvas(input, {
      scrollX: 0,
      scrollY: 0,
      useCORS: true, // Allow cross-origin images
      scale: 2, // High-quality rendering
    }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("l", "px", [1123, 794]); // Match dimensions of the certificate

      pdf.addImage(imgData, "PNG", 0, 0, 1123, 794); // No margins
      pdf.save(`${user.name}_Certificate_of_Participation.pdf`);
      setLoading(false);
      toast.success("Certificate downloaded!")
    });
  };
  // const downloadTicket = () => {
  //   setLoading2(true);
  //   const input = document.getElementById("ticket");

  //   html2canvas(input, {
  //     scrollX: 0,
  //     scrollY: 0,
  //     useCORS: true, // Allow cross-origin images
  //     scale: 2, // High-quality rendering
  //   }).then((canvas) => {
  //     const imgData = canvas.toDataURL("image/png");
  //     const pdf = new jsPDF("l", "px", [1100, 500]); // Match dimensions of the certificate

  //     pdf.addImage(imgData, "PNG", 0, 0, 1100, 500); // No margins
  //     pdf.save(`${user.name}_Event_Ticket.pdf`);
  //     setLoading2(false);
  //     toast.success("Ticket downloaded!");
  //   });
  // };

  const handleLogout = async () => {
    try {
      // Start sign out process
      dispatch(signOutStart());
      dispatch(deleteEvents())
      // Call the logout API function
      const response = user?.email=="teampratibimb@admin.com"?await logoutAdmin(user?.name,token) :await logoutUser();

      // Check if the API call was successful
      if (!response.success) {
        dispatch(signOutFailure(response.message));
        toast.error(response.message);
        return;
      }

      // Sign out from Firebase authentication
      await signOut(auth);

      toast.success("You're Signed Out!");
      dispatch(signOutSuccess());
      navigate("/sign-up");
    } catch (error) {
      // Handle any errors during the sign out process
      dispatch(signOutFailure(error.message));
      toast.error("Logout error: " + error.message);
    }
  };

  const handleDeleteAccount = async () => {
    try {
      setLoading2(true);
      const data = {
        email: user.email,
      };
      const response = await deleteAccount(data, token);
      if (response.success) {
        await handleLogout();
        toast.success("Account deleted successfully!");
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Error deleting account: " + error.message);
    } finally {
      setLoading2(false);
      setShowpopup(false);
    }
  }


  useEffect(() => {
    const getTicket = async () => {
      try {
        const data = {
          email: user.email,
        };

        const response = await getEventTicket(data, token);

        if (response.success) {
          setEventTicketData(response.data);
        } else if (response.status === 204) {

        }
      } catch (error) {
        console.log(error);

      }
    };
    getTicket();
  }, [refresh]);

  useEffect(() => {
    const isMemberfunction = async () => {
      try {
        const data = {
          email: user.email,
        };

        const response = await isMember(data, token);

        if (response.success) {

          setMember(response.data);
        } else if (response.status === 204) {

        }
      } catch (error) {
        console.log(error);

      }
    };
    isMemberfunction();
  }, []);



  return (
    <div className="md:px-10 ">
      <Helmet>
        <title>Profile | Pratibimb</title>
        <meta name="description" content="Manage your PRATIBIMB profile at SGSITS, Indore. Access your event tickets, certificates, personal info, and membership details." />
        <link rel="canonical" href="https://www.clubpratibimb.com/profile" />
      </Helmet>
      <div className='py-1 md:mt-16 text-center bg-white md:bg-azure rounded-2xl fixed md:static top-0 w-full z-40' >
        <div className=" py-2  bg-gradient-to-br from-slate-400 to-slate-800 bg-clip-text text-3xl font-medium tracking-tight text-transparent md:text-7xl font-poppins">
          My Profile
        </div>
      </div>

      {/* Profile Section */}
      {/* Profile Card */}
      <div className="p-4" >
        <div className="relative w-full mt-14 md:mt-0 mb-4 md:mb-0">
          <div className="py-2 md:py-4 relative md:max-w-4xl md:mx-auto shadow-xl bg-gray-900 border rounded-full border-gray-800 flex justify-between items-center text-white overflow-hidden">
            <div className="pl-10 md:pl-24">
              {" "}
              <p className="text-sm font-poppins md:text-2xl font-medium  relative">
                {user.name}
              </p>
              <p className="text-xs md:text-lg text-slate-400  relative">
                {user.email}
              </p>
              {/* <p className="text-xs md:text-lg text-slate-400  relative">
              Batch: {user.batch}
            </p>
            <p className="text-xs md:text-lg text-slate-400 relative mb-1">
              Branch: {user.branch}
            </p> */}
              <div className="flex md:flex-col space-x-4 md:space-x-0 text-xs md:text-lg relative mt-6">
                <div className="text-slate-700 md:mb-1">
                  {member?.is_member ? (
                    <button className=" bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white px-2 md:px-4 md:py-1 rounded-full shadow-md transition duration-300 hover:opacity-90 hover:shadow-2xl">
                      Member
                    </button>
                  ) : (
                    <>
                      <span className="bg-slate-300 px-1 md:px-3 md:py-1 rounded-full">
                        Non-Member
                      </span>
                      <button
                        onClick={scrollToPerks}
                        className="hidden md:inline-flex text-xs items-center px-2 py-1 bg-yellow-400 text-slate-800 font-poppins rounded-2xl hover:bg-yellow-300 ml-2"
                      >
                        Claim your Membership now
                        <ArrowForwardIcon />
                      </button>
                    </>)}
                </div>

                <div className="flex  text-slate-700">
                  {member?.is_artist ? (
                    <button className=" bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white px-2 md:px-4 md:py-1 rounded-full shadow-md transition duration-300 hover:opacity-90 hover:shadow-2xl">
                      Artist
                    </button>
                  ) : (
                    <span className="bg-slate-300 px-1 md:px-3 md:py-1 rounded-full">
                      Non-Artist
                    </span>
                  )}

                  {!user.is_artist && (
                    <button
                      onClick={() => navigate("/art-community")}
                      className="hidden md:inline-flex text-xs items-center px-2 py-1 bg-yellow-400 text-slate-800 font-poppins rounded-2xl hover:bg-yellow-300 ml-7"
                    >
                      Become an Artist
                      <ArrowForwardIcon />
                    </button>
                  )}
                </div>
              </div>
            </div>

            <div className="pr-4 md:pr-10">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-24 h-24 md:w-44 md:h-44 rounded-full border-4 border-gray-700 shadow-md"
              />
            </div>

            {/* Meaty part - Meteor effect */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <Meteors number={20} />
            </div>
          </div>
        </div>

        {
          user.email === "teampratibimb@admin.com" && (
            <div className="flex justify-center my-6 md:my-10">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/admin-dashboard")}
              className="px-10 bg-red-500 text-white py-1 rounded-xl text-sm shadow-md transition duration-300 hover:opacity-90 hover:shadow-2xl"
            >
              Go to Admin routes

            </motion.button>
            </div>
          )
        }

        <div className="md:hidden mt-2 flex justify-between px-2 gap-2">
          <div>
            <button
              onClick={scrollToPerks}
              className="text-xs px-2 py-1 md:px-4 md:py-2 bg-yellow-400 text-slate-800  rounded-2xl hover:bg-yellow-300"
            >
              Claim your membership now
              <ArrowForwardIcon />
            </button>
          </div>
          {!user.is_artist && (
            <div>
              <button
                onClick={() => navigate("/art-community")}
                className="text-xs px-2 py-1 md:px-4 md:py-2 bg-yellow-400 text-slate-800 rounded-2xl hover:bg-yellow-300"
              >
                Become an Artist
                <ArrowForwardIcon />
              </button>
            </div>
          )}
        </div>

        <div className="w-4/5 mx-auto my-5 border-t border-slate-400"></div>


        {member !== "" && member?.order_id !== "FREE" && (
          <>
            <div className="md:mx-20 my-5 p-4 bg-gradient-to-r from-slate-200 to-slate-300 border-none rounded-xl shadow-lg text-center">
              <h3 className="text-xl md:text-3xl font-medium bg-gradient-to-br from-slate-600 to-slate-800 bg-clip-text tracking-tight text-transparent font-poppins">
                Congratulations on getting Pratibimb Club Membership!
              </h3>
              <p className="mt-2 text-sm md:text-lg text-slate-700">
                Further details of 1st round of Recruitment will be shared in whatsapp group.
              </p>
              <p className="mt-2 text-sm md:text-lg text-slate-700">
                🖼 Portfolio Submission: Carry a physical/offline portfolio showcasing your best work.

              </p>
              <p className="mt-3 text-sm md:text-lg text-slate-600">

              </p>
              <p className="mt-3 text-sm md:text-lg text-slate-600 font-semibold">
                P.S.: Join Whatsapp group: <a target="_blank"
                  rel="noopener noreferrer" href="https://chat.whatsapp.com/FcXCTHRyHjK2Sb4cFHodX1" className="text-blue-500" >Click here</a>
              </p>
            </div>
            <div className="w-4/5 mx-auto my-5 border-t border-slate-400"></div>

          </>
        )}

        {member?.order_id === "FREE" && (
          <>
            <div className="md:mx-20 my-5 p-4 bg-gradient-to-r from-slate-200 to-slate-300 border-none rounded-xl shadow-lg text-center">
              <h3 className="text-xl md:text-3xl font-medium bg-gradient-to-br from-slate-600 to-slate-800 bg-clip-text tracking-tight text-transparent font-poppins">
                Thanks for registering for recruitments!
              </h3>
              <p className="mt-2 text-sm md:text-lg text-slate-700">
                Further details of 1st round of Recruitment will be shared in whatsapp group.
              </p>
              <p className="mt-2 text-sm md:text-lg text-slate-700">
                🖼 Portfolio Submission: Carry a physical/offline portfolio showcasing your best work.

              </p>
              <p className="mt-3 text-sm md:text-lg text-slate-600">

              </p>
              <p className="mt-3 text-sm md:text-lg text-slate-600 font-semibold">
                P.S.: Join Whatsapp group: <a target="_blank"
                  rel="noopener noreferrer" href="https://chat.whatsapp.com/FcXCTHRyHjK2Sb4cFHodX1" className="text-blue-500" >Click here</a>
              </p>
            </div>
            <div className="w-4/5 mx-auto my-5 border-t border-slate-400"></div>

          </>
        )}

        {eventTicketData?.status === "Attended" && (
          <>
            <div className="md:mx-20 my-5 p-4 bg-gradient-to-r from-slate-200 to-slate-300 border-none rounded-xl shadow-lg text-center">
              <h3 className="text-xl md:text-3xl font-medium bg-gradient-to-br from-slate-600 to-slate-800 bg-clip-text tracking-tight text-transparent font-poppins">
                Thank You for Being a Part of Graffathon'25!
              </h3>
              <p className="mt-2 text-sm md:text-lg text-slate-700">
                We truly appreciate your participation and enthusiasm in making this event a success!
              </p>
              <p className="mt-2 text-sm md:text-lg text-slate-700">
                We hope your Graffathon experience was nothing short of amazing. This is just the beginning—many more incredible events await!
              </p>
              <p className="mt-3 text-sm md:text-lg text-slate-600">
                Stay connected with us for more exciting opportunities.
              </p>
              <p className="mt-3 text-sm md:text-lg text-slate-600 font-semibold">
                P.S.: Your participation certificates will be available soon!
              </p>
            </div>
            <div className="w-4/5 mx-auto my-5 border-t border-slate-400"></div>

          </>
        )}





        <div className="mt-4 px-2 py-2">
          <div className="bg-gradient-to-br from-slate-400 to-slate-800 bg-clip-text text-2xl font-medium tracking-tight text-transparent md:text-6xl font-poppins">
            Your Event Ticket
          </div>
          <>
            <div className="mt-2 text-slate-500 text-xs md:text-xl px-4 font-poppins">
              {/* Visit the event Page to register for a event. */}
              <br />
              {/* <Link to='/terms-and-conditions' >
              <div className="mt-2 text-slate-500 text-xs md:text-lg hover:underline font-poppins">
                Our Terms and Conditions
              </div>
              </Link> */}
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={handleOpen}
                // onClick={() => navigate("/upcoming-event-page")}
                className="mt-2 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white py-1 md:py-2 px-2 md:px-4 rounded-full shadow-md transition duration-300 hover:opacity-90 hover:shadow-2xl"
              >
                Go to Event Page
              </motion.button>
            </div>
            <img
              src="https://res.cloudinary.com/dhy548whh/image/upload/v1739046843/ticket_md08pw.png"
              className="mt-4 blur-sm w-[80%] md:w-[60%] mx-auto"
              alt="image"
            />
          </>

        </div>

        <div className="w-4/5 ml-3 my-5 border-t border-slate-400"></div>

        <div className="mt-4 px-2 py-2">
          <div className="bg-gradient-to-br from-slate-400 to-slate-800 bg-clip-text text-2xl font-medium tracking-tight text-transparent md:text-6xl font-poppins">
            Claim your Certificate
          </div>
          <div className="relative">
            {/* Blurred Image */}
            <img
              src="https://res.cloudinary.com/dhy548whh/image/upload/v1739046842/certificatetemplate_nvowmm.png"
              alt="template"
              className="mt-4 blur-sm w-[50%] md:w-[40%] mx-auto"
            />
            {/* Overlay Button */}
            <div className="absolute inset-0 flex items-center justify-center">
              {!downloadcerificate ? (
                <button
                  className="px-2 md:px-6 py-1 md:py-2 bg-slate-800 text-slate-200 rounded-xl text-sm "
                  onClick={handleOpen2}
                  disabled={loading}
                >
                  {loading ? (
                    <CircularProgress size={18} color="inherit" />
                  ) : (
                    <span>
                      Download <FileDownloadIcon />
                    </span>
                  )}
                </button>
              ) : (
                <button
                  className="w-36 px-2 md:px-6 py-1 md:py-2 bg-slate-800 text-slate-200 rounded-xl text-sm "
                  onClick={downloadCertificate}
                  disabled={loading}
                >
                  {loading ? (
                    <CircularProgress size={18} color="inherit" />
                  ) : (
                    <span>
                      Download <FileDownloadIcon />
                    </span>
                  )}
                </button>
              )}
            </div>
          </div>

          <div
            id="certificate"
            style={{
              position: "absolute",
              top: "-9999px", // Move it far off-screen
              left: "-9999px",
            }}
          >
            <Certificate user={user} />
          </div>
        </div>

        <div className="w-4/5 ml-3 my-5 border-t border-slate-400"></div>

        <div className="mt-4 px-2 py-2">
          <div
            ref={perks}
            className="bg-gradient-to-br from-slate-400 to-slate-800 bg-clip-text text-2xl font-medium tracking-tight text-transparent md:text-6xl font-poppins"
          >
            Membership Perks
          </div>

          <div className="mt-4 px-4 py-1 bg-slate-900 rounded-lg md:px-8">
            <ul className="mt-6 space-y-4 text-sm md:text-base text-slate-400 font-poppins ">
              <li>
                <span className="font-medium text-white">
                  Lifetime Membership
                </span>{" "}
                – No renewals, valid forever!
              </li>
              <li>
                <span className="font-medium text-white">Free Event Access</span>{" "}
                – Participate in events without extra registration costs.
              </li>
              <li>
                <span className="font-medium text-white">Auto Fee Deduction</span>{" "}
                – Event/workshop fees are automatically discounted when registered
                via the website.
              </li>
              <li>
                <span className="font-medium text-white">Join the Club</span> –
                First step to being recognized as a club member.
              </li>
              <li>
                <span className="font-medium text-white">All for ₹99</span> –
                One-time fee for lifelong benefits!
              </li>
            </ul>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() =>{}}
              className="my-4 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white py-1 md:py-2 md:px-4 px-2 rounded-full shadow-lg text-sm font-poppins transition duration-300 hover:opacity-90 hover:shadow-2xl"
            >
              Become a Member
              <ArrowForwardIcon />
            </motion.button>
          </div>
        </div>

        <div className="w-4/5 ml-3 my-5 border-t border-slate-400"></div>

        <div className="mt-4 px-4 py-4">
  {/* Dual Policy Section */}
  <div className="flex flex-col md:flex-row gap-6">
    {/* Terms and Conditions Card */}
    <div className="flex-1 p-4 border border-slate-200 rounded-xl bg-white shadow-sm">
      <div className="bg-gradient-to-br from-slate-400 to-slate-800 bg-clip-text text-2xl font-medium tracking-tight text-transparent md:text-4xl font-poppins">
        Terms & Conditions
      </div>
      <div className="mt-2 text-slate-500 text-sm md:text-base px-1 font-poppins">
        Review our policies .
      </div>
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={() => {}}
        className="w-full mt-4 text-xs md:text-sm bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-2 px-4 rounded-full shadow-md hover:shadow-lg transition-all"
      >
        View Terms
      </motion.button>
    </div>

    {/* Vertical Divider - Desktop Only */}
    {/* <div className="hidden md:block border-l border-slate-300 h-auto my-4"></div> */}

    {/* Account Deletion Card */}
    <div className="flex-1 p-4 border border-slate-200 rounded-xl bg-white shadow-sm">
  <div className="bg-gradient-to-br from-slate-400 to-slate-800 bg-clip-text text-2xl font-medium tracking-tight text-transparent md:text-4xl font-poppins">
    Account Deletion
  </div>

  <div className="mt-2 text-slate-500 text-sm md:text-base px-1 font-poppins">
    Read our account deletion policy before proceeding.
  </div>

  <div className="mt-4 flex flex-col md:flex-row gap-2 md:items-center">
    <motion.button
      whileTap={{ scale: 0.95 }}
      onClick={() => navigate("/delete-account")}
      className="w-full md:w-1/2 text-xs md:text-sm bg-gradient-to-r from-purple-500 to-red-500 text-white py-2 px-4 rounded-full shadow-md hover:shadow-lg transition-all "
    >
      Deletion Policy
    </motion.button>

    <motion.button
      whileTap={{ scale: 0.95 }}
      onClick={() => setShowpopup(true)}
      className="hidden md:inline-flex border-2  border-red-500 text-red-500 py-1 px-4 rounded-full text-sm transition duration-300 hover:opacity-90 w-1/2  items-center justify-center"
    >
      <span>Delete Account</span>
      <DeleteOutlineIcon className="ml-2" />
    </motion.button>
  </div>
</div>

  </div>

</div>
<div className="w-4/5 ml-3 my-5 border-t border-slate-400"></div>
        <div className="my-4 px-2 py-2">
          <div className="bg-gradient-to-br from-slate-400 to-slate-800 bg-clip-text text-2xl font-medium tracking-tight text-transparent md:text-6xl font-poppins">
            Features in Next Version(1.1.0)
          </div>
          <div className="mt-2 flex flex-col gap-4 font-poppins text-base md:text-lg">
            <div className="bg-slate-200 px-4 py-2 rounded-2xl">
              <div className="text-slate-700 font-medium">
                Website Access for all
              </div>
              <div className="text-slate-600 text-xs md:text-base">
                The website will now be open to everyone, making it accessible to
                a broader audience.
              </div>
            </div>

            <div className="bg-slate-200 px-4 py-2 rounded-2xl">
              <div className="text-slate-700 font-medium">
                Online Membership Registration
              </div>
              <div className="text-slate-600 text-xs md:text-base">
                Users can seamlessly register for membership directly through the
                website, ensuring a smooth and hassle-free process.
              </div>
            </div>
          </div>


        </div>

        <div className="flex justify-between gap-2 px-2 mt-4">

          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={handleLogout}
            className="w-full md:hidden  bg-red-500 text-white py-1 px-2 rounded-xl text-sm shadow-md transition duration-300 hover:opacity-90 hover:shadow-2xl"
          >
            Signout<Logout className="ml-2" />

          </motion.button>


          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowpopup(true)}
            className="w-full md:hidden border-2 border-red-500 text-red-500 py-1 px-2 rounded-xl text-sm  transition duration-300 hover:opacity-90 hover:shadow-2xl"
          >
            Delete Account<DeleteOutlineIcon className="ml-2" />

          </motion.button>

        </div>

        {
          showpopup && (
            <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 font-poppins min-w-32">
              <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                <h2 className="text-xl font-semibold mb-4">Are you sure?</h2>
                <p className="mb-4 ">This action cannot be undone.</p>
                <div className="inline-flex justify-center gap-4">
                  <button
                    onClick={() => setShowpopup(false)}
                    className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleDeleteAccount}
                    className="text-sm bg-red-500 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 w-full sm:w-auto min-w-[10rem]"
                    disabled={loading2}
                  >
                    {loading2 ? (
                      <CircularProgress size={18} color="inherit" />
                    ) : (
                      <>
                        <span>Delete Account</span>
                        <DeleteOutlineIcon className="text-white" />
                      </>
                    )}
                  </button>

                </div>
              </div>
            </div>
          )
        }

        <Backdrop
          sx={(theme) => ({
            color: "#fff",
            zIndex: theme.zIndex.drawer + 1,
          })}
          open={open}
          onClick={handleClose}
        >
          <div onClick={(e) => e.stopPropagation()}>
            <UpcomingEventNotReleased />
          </div>
        </Backdrop>
        <Backdrop
          sx={(theme) => ({
            color: "#fff",
            zIndex: theme.zIndex.drawer + 1,
          })}
          open={open2}
          onClick={handleClose2}
        >
          <div onClick={(e) => e.stopPropagation()}>
            <Certificatetrial />
          </div>
        </Backdrop>

      </div>
    </div>
  );
}
