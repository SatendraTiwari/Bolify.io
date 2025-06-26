import React from 'react';
import { Link } from 'react-router-dom';

  const values = [
    {
      id: 1,
      title: "Integrity",
      description: "We prioritize honesty and transparency in all our dealings, ensuring a fair and ethical auction experience for everyone."
    },
    {
      id: 2,
      title: "Innovation",
      description: "We continually enhance our platform with cutting-edge technology and features to provide users with a seamless and efficient auction process."
    },
    {
      id: 3,
      title: "Community",
      description: "We foster a vibrant community of buyers and sellers who share a passion for finding and offering exceptional items."
    },
    {
      id: 4,
      title: "Customer Focus",
      description: "We are committed to providing exceptional customer support and resources to help users navigate the auction process with ease."
    },
  ];


  const teamMembers = [
    {
      id: 1,
      name: "Satendra Sharma",
      position: "Frontend Developer & Backend Developer",
      image: "/api/placeholder/150/150"
    },
    {
      id: 2,
      name: "Rehan Khan",
      position: "Frontend Developer & Designer",
      image: "/api/placeholder/150/150"
    },
    {
      id: 3,
      name: "Mohmmad Rehan",
      position: "Backend Developer",
      image: "/api/placeholder/150/150"

    },
    {
      id: 4,
      name: "Garv Sukla",
      position: "Full Stack Developer",
      image: "/api/placeholder/150/150"
    }
  ]

const About = () => {


  return (
    <div className="bg-stone-50 min-h-screen section">
      <div className="px-5 max-w-7xl">
        {/* Hero Section */}
        <section className="mb-16 md:mb-24">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#D6482B] mb-6 relative">
            About Us
            <span className="absolute bottom-0 left-0 w-20 h-1 bg-[#D6482B]"></span>
          </h1>
          <p className="text-lg md:text-xl text-stone-600 max-w-3xl leading-relaxed">
            We're dedicated to creating exceptional auction experiences that connect sellers with passionate buyers. Our platform combines cutting-edge technology with personalized service to make buying and selling seamless and rewarding.
          </p>
        </section>

        {/* Mission Section */}
        <section className="mb-16 md:mb-24 bg-white rounded-lg p-8 shadow-sm">
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-6 flex items-center">
            <span className="w-8 h-8 bg-[#D6482B] rounded-full flex items-center justify-center text-white mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </span>
            Our Mission
          </h2>
          <p className="text-lg text-stone-600 leading-relaxed pl-11">
            We aim to revolutionize the auction industry by creating a trusted marketplace where exceptional items find new homes. Through innovation and integrity, we connect passionate collectors, savvy investors, and curious explorers in a vibrant community centered on discovery and value.
          </p>
        </section>

        {/* Values Section */}
        <section className="mb-16 md:mb-24">
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-8 flex items-center">
            <span className="w-8 h-8 bg-[#D6482B] rounded-full flex items-center justify-center text-white mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </span>
            Our Values
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {values.map((item) => (
              <div key={item.id} className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-[#D6482B] hover:shadow-md transition-shadow">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-stone-600 ">{item.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Team Section - Optional */}
        <section className="mb-16 md:mb-24">
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-8 flex items-center">
            <span className="w-8 h-8 bg-[#D6482B] rounded-full flex items-center justify-center text-white mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </span>
            Meet Our Team
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((id) => (
              <div key={id} className="text-center">
                <div className="w-24 h-24 md:w-32 md:h-32 bg-stone-200 rounded-full mx-auto mb-3 overflow-hidden">
                  <img src={`/api/placeholder/150/150`} alt="Team member" className="w-full h-full object-cover" />
                </div>
                <h4 className="font-medium text-gray-900">Team Member</h4>
                <p className="text-sm text-stone-500">Position</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="mb-16 bg-gradient-to-r from-[#D6482B] to-[#E67E22] rounded-lg p-8 text-white text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Join Our Community?</h2>
          <p className="mb-6 max-w-2xl mx-auto">Discover unique items, connect with passionate collectors, and experience the thrill of auction.</p>
          <Link to={'/sign-up'}  className="bg-white text-[#D6482B] font-medium py-2 px-6 rounded-full hover:bg-opacity-90 transition-colors">
            Sign Up Now
          </Link>
        </section>
      </div>
    </div>
  );
};

export default About;