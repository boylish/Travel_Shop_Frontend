import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import { getToken, removeToken } from "../utils/auth";
import { API_PATHS } from "../utils/apiPath";
import { Search, TrendingUp, Users, DollarSign } from "lucide-react";
import { Button } from "../components/ui/button";
import { toast } from "react-hot-toast";
import { HiMenu, HiX, HiSearch } from "react-icons/hi";

function Home() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      const token = getToken();
      if (!token) {
        navigate("/");
        return;
      }

      try {
        const response = await axiosInstance.get(API_PATHS.AUTH.GET_PROFILE, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUser(response.data.user);
        toast.success(`Welcome Back, ${response.data.user.username}`);
      } catch (error) {
        console.error("Auth error:", error);
        removeToken();
        navigate("/");
      }
    };

    fetchUser();
  }, [navigate]);

const handleLogout = () => {
   localStorage.removeItem('token');
  window.location.href = '/'; 
};


  return (
    <div className="min-h-screen bg-white">
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4 md:space-x-8">
              <h1 className="text-xl font-bold text-gray-900">TRAVEL SHOP</h1>

              <button
                className="md:hidden text-gray-600 hover:text-gray-900 p-1 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? (
                  <HiX className="h-6 w-6" />
                ) : (
                  <HiMenu className="h-6 w-6" />
                )}
              </button>

              <nav className="hidden md:flex space-x-6">
                <a
                  href="#"
                  className="text-gray-600 hover:text-gray-900 transition-colors px-2 py-1 rounded-md hover:bg-gray-50"
                >
                  Buy
                </a>
                <a
                  href="#"
                  className="text-gray-600 hover:text-gray-900 transition-colors px-2 py-1 rounded-md hover:bg-gray-50"
                >
                  Curate
                </a>
              </nav>
            </div>

            <div className="flex items-center space-x-4">
              <div className="relative hidden sm:block">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <HiSearch className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search"
                  className="block w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent sm:text-sm"
                />
              </div>

              <a
                href="#"
                className="hidden md:inline-flex text-gray-600 hover:text-gray-900 transition-colors px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-50"
              >
                Contact Us
              </a>

              <div>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="bg-pink-500 rounded-lg text-white px-4 py-2 hover:underline font-semibold hover:cursor-pointer"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden bg-white shadow-lg">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <a
                href="#"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50"
              >
                Buy
              </a>
              <a
                href="#"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50"
              >
                Curate
              </a>
              <a
                href="#"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50"
              >
                Contact Us
              </a>

              <div className="px-3 py-2">
                <div className="relative mt-1">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <HiSearch className="h-4 w-4 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search"
                    className="block w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent sm:text-sm"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </header>

      <section
        className="relative h-[80vh] bg-cover bg-center bg-gray-800"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), url('https://images.unsplash.com/photo-1488646953014-85cb44e25828?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')`,
        }}
      >
        <div className="absolute inset-0 flex items-center justify-start px-2 sm:px-4">
          <div className="max-w-7xl mx-auto w-full">
            <div className="max-w-lg flex flex-col gap-6 sm:gap-8">
              <div className="bg-white px-4 sm:px-6 lg:px-8 py-4 sm:py-6 rounded-lg">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-pink-500 mb-4 text-center sm:text-left">
                  Login User Details
                </h2>
                <div className="flex flex-col gap-3 sm:gap-4">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 px-4 py-2 rounded-lg bg-pink-500">
                    <h3 className="text-base sm:text-lg md:text-xl text-white">
                      Username:
                    </h3>
                    <h3 className="text-base sm:text-lg md:text-xl text-white">
                      {user?.username}
                    </h3>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 px-4 py-2 rounded-lg bg-pink-500">
                    <h3 className="text-base sm:text-lg md:text-xl text-white">
                      ID:
                    </h3>
                    <h3 className="text-base sm:text-lg md:text-xl text-white">
                      {user?.id}
                    </h3>
                  </div>
                </div>
              </div>

              <Button className="bg-pink-500 hover:bg-pink-600 text-white px-4 sm:px-6 full w-fit py-2 sm:py-3 rounded-2xl font-medium transition-colors">
                Start Curating
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50 relative">
        <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_3px,transparent_1px)] [background-size:46px_46px]"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Lorem ipsum dolor sit amet
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[TrendingUp, Users, DollarSign].map((Icon, idx) => (
              <div
                key={idx}
                className="text-center bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon className="h-8 w-8 text-pink-500" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Lorem Ipsum
                </h3>
                <p className="text-gray-600">
                  Detailed description of the feature or service offering
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Lorem ipsum <span className="text-pink-500">dolor</span>
              </h2>
              <Button className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-2 rounded-2xl font-medium transition-colors">
                sit amet
              </Button>
            </div>
            <div className="space-y-8 ">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="bg-pink-200 p-4 rounded-xl w-[100%] sm:w-[50%]">
                  <h3 className="text-pink-600 text-4xl font-bold ">01</h3>
                  <h4 className="text-lg font-semibold">Sit Amet</h4>
                </div>
                <div className="bg-pink-200 p-4 rounded-xl w-[100%] sm:w-[50%]">
                  <h3 className="text-pink-600 text-4xl font-bold ">02</h3>
                  <h4 className="text-lg font-semibold">
                    {" "}
                    <span className="text-pink-600">Lorem </span>Ipsum Dolor Sit
                    Amet
                  </h4>
                </div>
              </div>

              <div className="bg-pink-200 p-4 rounded-xl">
                <h3 className="text-pink-600 text-4xl font-bold ">03</h3>
                <h4 className="text-lg font-semibold">
                  Consectetur <span className="text-pink-600">Adipiscing</span>{" "}
                  Elit, Ut Labore Et Dolore
                </h4>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-gray-100 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
          <div className="">
            <div className="flex flex-col sm:flex-row justify-between  ">
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  TRAVEL SHOP
                </h3>
              </div>

              <div className="flex flex-col sm:flex-row  w-[30%]">
                <div className=" flex flex-col gap-2 w-[50%]">
                  <p>sit amet</p>
                  <p>ipsum</p>
                  <p>ut labore</p>
                  <p>consectetur</p>
                </div>
                <div className="flex flex-col gap-2 w-[50%]">
                  <p>sit amet</p>
                  <p>ipsum</p>
                  <p>ut labore</p>
                  <p>consectetur</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;
