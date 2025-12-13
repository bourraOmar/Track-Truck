import React, { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  FaTruckMoving,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaShieldAlt,
  FaBolt,
  FaCreditCard,
  FaEnvelope,
} from "react-icons/fa";
import useAuth from "../hooks/useAuth";
import Background from "../assets/background.png";

const Home = () => {
  const { user, isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();

  // Removed auto-redirection logic to allow viewing the landing page

  return (
    <div className="font-sans text-gray-800">
      {/* Navigation Overlay */}
      <nav className="absolute top-0 left-0 right-0 z-20 flex justify-between items-center p-6 text-white">
        <div className="text-2xl font-bold flex items-center gap-2">
          <FaTruckMoving className="mr-3 text-3xl"/> TrackTruck
        </div>
        <div className="hidden md:flex space-x-8 font-medium">
          <a href="#" className="hover:text-indigo-400 transition">
            Home
          </a>
          <a href="#about" className="hover:text-indigo-400 transition">
            About Us
          </a>
          <a href="#services" className="hover:text-indigo-400 transition">
            Services
          </a>
          <a href="#contact" className="hover:text-indigo-400 transition">
            Contact Us
          </a>
        </div>
        <div>
          {isAuthenticated ? (
            <button
              onClick={() =>
                navigate(
                  user.role === "Admin" ? "/admin/dashboard" : "/driver/trips"
                )
              }
              className="bg-indigo-600 px-6 py-2 rounded-full font-bold hover:bg-indigo-700 transition shadow-lg"
            >
              Dashboard
            </button>
          ) : (
            <Link
              to="/login"
              className="bg-indigo-600 px-6 py-2 rounded-full font-bold hover:bg-indigo-700 transition shadow-lg"
            >
              Login
            </Link>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <header
        className="relative h-screen flex items-center text-white bg-cover bg-center"
        style={{ backgroundImage: `url(${Background})` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-70"></div>
        <div className="container mx-auto px-6 relative z-10 pt-20">
          <p className="text-indigo-400 font-bold tracking-widest mb-4 uppercase text-sm md:text-base">
            Leading Dispatch Service Experts
          </p>
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight max-w-4xl">
            YOUR TRUSTED PARTNER IN <br />{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">
              DISPATCH SERVICES
            </span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl leading-relaxed">
            At TrackTruck, we redefine logistics with precision and expertise.
            As industry leaders, we seamlessly navigate the complex world of
            transportation to ensure your goods reach their destination on time,
            every time.
          </p>
          <div className="flex flex-col md:flex-row gap-4">
            <a
              href="#services"
              className="bg-indigo-600 text-white px-8 py-4 rounded-lg font-bold hover:bg-indigo-700 transition shadow-lg text-center"
            >
              Our Services
            </a>
            <a
              href="#contact"
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-bold hover:bg-white hover:text-gray-900 transition text-center"
            >
              View Our Pricing
            </a>
          </div>

          <div className="mt-20 flex flex-col md:flex-row gap-8 text-sm text-gray-400 border-t border-gray-700 pt-8 max-w-3xl">
            <div className="flex items-center gap-3">
              <FaMapMarkerAlt className="text-xl text-indigo-400" />
              <span>30 North Gould Street, Sheridan, WY 82801</span>
            </div>
            <div className="flex items-center gap-3">
              <FaPhoneAlt className="text-xl text-indigo-400" />
              <span>(315) 400-1511</span>
            </div>
          </div>
        </div>
      </header>

      {/* Why Choose Us */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-extrabold mb-4 text-gray-900">
            Why Choose Us
          </h2>
          <p className="text-gray-500 mb-16 text-lg">
            Experience the difference with TrackTruck Dispatch
          </p>

          <div className="grid md:grid-cols-3 gap-10">
            {[
              {
                title: "Reliable",
                icon: <FaShieldAlt className="text-4xl" />,
                desc: "Our dispatch professionals find loads from reliable sources and well-known references.",
              },
              {
                title: "Fast & Secure",
                icon: <FaBolt className="text-4xl" />,
                desc: "Our services ensure a fast and secure journey from start to finish with real-time tracking.",
              },
              {
                title: "Flexible Pricing",
                icon: <FaCreditCard className="text-4xl" />,
                desc: "We offer versatile payment alternatives, including bank transfers, PayPal, and major credit cards.",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="p-10 bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100 transform hover:-translate-y-2"
              >
                <div className="text-5xl mb-6 bg-indigo-50 w-24 h-24 flex items-center justify-center rounded-full mx-auto text-indigo-600 shadow-inner">
                  {item.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-800">
                  {item.title}
                </h3>
                <p className="text-gray-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 bg-gray-50">
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center gap-16">
          <div className="md:w-1/2">
            <div className="inline-block px-4 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-bold mb-4">
              WHO WE ARE
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold mb-8 text-gray-900 leading-tight">
              About TrackTruck Dispatch
            </h2>
            <p className="text-gray-600 mb-6 leading-relaxed text-lg">
              TrackTruck Dispatch excels in delivering top-tier independent
              truck dispatch services. Our mission is to support individuals
              seeking lucrative loads, particularly owner-operators and small
              fleet owners.
            </p>
            <p className="text-gray-600 mb-10 leading-relaxed text-lg">
              Committed to excellence, we prioritize quality services and
              collaborate closely with you to formulate the most effective
              dispatching strategy tailored to your fleet.
            </p>
            <button className="bg-gray-900 text-white px-8 py-4 rounded-lg font-bold hover:bg-gray-800 transition shadow-lg">
              Read More About Us
            </button>
          </div>
          <div className="md:w-1/2 relative">
            <div className="absolute -inset-4 bg-indigo-600 rounded-2xl opacity-20 blur-lg"></div>
            <img
              src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              alt="Logistics worker"
              className="relative rounded-2xl shadow-2xl w-full object-cover h-[500px]"
            />
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-extrabold mb-6 text-gray-900">
              Our Services
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto text-lg">
              Comprehensive Dispatch Solutions Tailored For You. We deliver
              top-notch dispatching services at competitive rates.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "DRY VAN",
                img: "https://images.pexels.com/photos/2199293/pexels-photo-2199293.jpeg",
              },
              {
                name: "REEFER",
                img: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=600&q=80",
              },
              {
                name: "FLATBED",
                img: "https://images.pexels.com/photos/1267325/pexels-photo-1267325.jpeg",
              },
              {
                name: "POWER ONLY",
                img: "https://images.pexels.com/photos/13520550/pexels-photo-13520550.jpeg",
              },
              {
                name: "BOX TRUCK",
                img: "https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&w=600&q=80",
              },
              {
                name: "STRAIGHT BOX TRUCK",
                img: "https://images.pexels.com/photos/13961752/pexels-photo-13961752.jpeg",
              },
            ].map((service, idx) => (
              <div
                key={idx}
                className="group relative overflow-hidden rounded-2xl shadow-lg h-72 cursor-pointer"
              >
                <img
                  src={service.img}
                  alt={service.name}
                  className="w-full h-full object-cover transition duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90 group-hover:opacity-100 transition flex items-end p-8">
                  <h3 className="text-white text-2xl font-bold uppercase tracking-wider border-l-4 border-indigo-500 pl-4">
                    {service.name}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer / CTA */}
      <footer
        id="contact"
        className="bg-gray-900 text-white pt-24 pb-10 relative overflow-hidden"
      >
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-center mb-20 bg-indigo-900 rounded-3xl p-10 md:p-16 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-1/2 h-full bg-indigo-800 transform skew-x-12 translate-x-20 opacity-50"></div>
            <div className="md:w-1/2 mb-8 md:mb-0 relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Get A Free Estimate?
              </h2>
              <p className="text-indigo-200 mb-8 text-lg">
                Contact us today for our top-notch dispatch services. Let us
                tailor our needs and budget seamlessly.
              </p>
              <button className="bg-green-500 text-white px-8 py-4 rounded-lg font-bold hover:bg-green-600 transition shadow-lg transform hover:scale-105">
                Contact Us Now
              </button>
            </div>
            <div className="md:w-1/2 flex justify-end relative z-10">
              <img
                src="https://pngimg.com/d/truck_PNG16211.png"
                alt="Truck"
                className="w-full max-w-md object-contain drop-shadow-2xl transform hover:scale-105 transition duration-500"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-4 gap-12 border-t border-gray-800 pt-16">
            <div className="col-span-1 md:col-span-1">
              <div className="text-3xl font-bold flex items-center gap-2 mb-6">
                <FaTruckMoving className="text-3xl text-indigo-400" />{" "}
                TrackTruck
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                Your trusted partner in logistics and dispatch services. We move
                your business forward with reliability and speed.
              </p>
            </div>

            <div>
              <h4 className="text-lg font-bold mb-6 text-white">
                Contact Info
              </h4>
              <ul className="space-y-4 text-gray-400 text-sm">
                <li className="flex items-start gap-3">
                  <FaMapMarkerAlt className="mt-1 text-indigo-400" />
                  <span>
                    30 North Gould Street
                    <br />
                    Sheridan, WY 82801
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <FaPhoneAlt className="text-indigo-400" />
                  <span>(315) 400-1511</span>
                </li>
                <li className="flex items-center gap-3">
                  <FaEnvelope className="text-indigo-400" />
                  <span>support@tracktruck.com</span>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-bold mb-6 text-white">Quick Links</h4>
              <ul className="space-y-3 text-gray-400 text-sm">
                <li>
                  <a href="#" className="hover:text-indigo-400 transition">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#about" className="hover:text-indigo-400 transition">
                    About Us
                  </a>
                </li>
                <li>
                  <a
                    href="#services"
                    className="hover:text-indigo-400 transition"
                  >
                    Services
                  </a>
                </li>
                <li>
                  <a
                    href="#contact"
                    className="hover:text-indigo-400 transition"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-bold mb-6 text-white">Newsletter</h4>
              <p className="text-gray-400 text-sm mb-4">
                Subscribe to get the latest news and updates.
              </p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="bg-gray-800 text-white px-4 py-2 rounded-l-lg focus:outline-none w-full"
                />
                <button className="bg-indigo-600 px-4 py-2 rounded-r-lg hover:bg-indigo-700 transition">
                  Go
                </button>
              </div>
            </div>
          </div>

          <div className="text-center text-gray-600 text-xs mt-16 border-t border-gray-800 pt-8">
            &copy; 2025 TrackTruck Dispatch LLC. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
