import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faUserPen } from "@fortawesome/free-solid-svg-icons";
const apiUrl = import.meta.env.VITE_API_BASE_URL;

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserDetails = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const response = await fetch(`${apiUrl}/auth/user/me`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();
        if (response.ok) {
          setUser(data.user);
          console.log(data.user)
        } else {
          toast.error(data.message || "Failed to fetch user details");
          navigate("/login");
        }
      } catch (error) {
        console.error("Error:", error);
        toast.error("An error occurred while fetching user details");
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, [navigate]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-gray-700 text-lg">No user data available</p>
      </div>
    );
  }

  let deleteUser = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/auth/user/${id}`, {
        method: "DELETE"
      });

      const result = await response.json();
      if (response.ok) {
        console.log("User deleted:", result);
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
        navigate("/signup");
      } else {
        toast.error(data.message || "Failed to delete user");
      }
    }
    catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred while delete user");
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Card Header */}
        <div className="bg-gray-800 text-white p-6 flex">
          <p className="text-gray-300 w-64 flex-1 ">Welcome back, {user.name}!</p>
          <div>
            <FontAwesomeIcon
              icon={faUserPen}
              className="h-6 w-6 sm:h-8 sm:w-8 hover:text-[#4bf6d4] transition duration-300"
              onClick={() => navigate("/update")}
            />
            <FontAwesomeIcon
              icon={faTrash}
              className="h-6 w-6 sm:h-8 sm:w-8 hover:text-[#4bf6d4] transition duration-300"
              onClick={async () => { await deleteUser(user._id) }}
            />
          </div>
        </div>

        {/* Card Body */}
        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <p className="mt-1 p-2 bg-gray-50 rounded-md">{user.name}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <p className="mt-1 p-2 bg-gray-50 rounded-md">{user.email}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Joined On</label>
            <p className="mt-1 p-2 bg-gray-50 rounded-md">
              {new Date(user.created_at).toLocaleDateString()}
            </p>
          </div>
        </div>

        {/* Card Footer */}
        <div className="bg-gray-50 p-4">
   

          <button
            onClick={() => navigate("/")}
            className="w-full bg-gray-800 hover:bg-gray-900 text-white font-medium py-2 rounded-md transition-all duration-300"
          >
            Go to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;