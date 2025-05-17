import React from "react";
import { FaCode, FaLaptopCode, FaRocket, FaBuilding, FaUsers, FaChartLine, FaLightbulb } from 'react-icons/fa';

function CompaniesPage() {
  const companies = [
    {
      name: " Digital Yak Labs",
      description: "Leading digital innovation and technology solutions",
      icon: FaCode,
      details: "A pioneering technology company focused on digital transformation and innovative solutions. We specialize in cutting-edge software development, AI integration, and digital infrastructure.",
      achievements: [
        "Developed 50+ enterprise solutions",
        "Serving 100+ clients nationwide",
        "Innovation award winner 2023"
      ]
    },
    {
      name: "Abhaya Solutions",
      description: "Custom software development and IT consulting",
      icon: FaLaptopCode,
      details: "Your trusted partner in custom software development and IT consulting. We deliver tailored solutions that drive business growth and operational efficiency.",
      achievements: [
        "Custom software development",
        "IT infrastructure management",
        "Cloud solutions expert"
      ]
    },
    {
      name: "Nepal Coding House Private Limited",
      description: "Empowering developers through education and innovation",
      icon: FaRocket,
      details: "Dedicated to nurturing the next generation of developers through comprehensive education programs and hands-on training in modern technologies.",
      achievements: [
        "Trained 1000+ developers",
        "Industry partnerships",
        "Job placement program"
      ]
    },
    {
      name: "Create Craters Group of Company",
      description: "Diversified business solutions and enterprise development",
      icon: FaBuilding,
      details: "A conglomerate of innovative businesses focused on creating sustainable growth and value across multiple sectors.",
      achievements: [
        "Multiple business verticals",
        "Strategic partnerships",
        "Market leadership"
      ]
    },
    {
      name: "Abhaya Infoys",
      description: "Innovative software solutions and IT services",
      icon: FaCode,
      details: "A leading provider of innovative software solutions and IT services, dedicated to helping businesses thrive in the digital age.",
      achievements: [
        "Award-winning software solutions",
        "Expert IT consulting",
        "Global client base"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 pt-20">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">
            Our Companies
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Leading the way in technology innovation and digital transformation across Nepal
          </p>
        </div>

        {/* Companies Grid */}
        <div className="grid gap-8 md:grid-cols-2">
          {companies.map((company, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-xl overflow-hidden transform hover:-translate-y-1 transition-all duration-300">
              <div className="p-8">
                <div className="flex items-center mb-6">
                  <div className="h-12 w-12 bg-blue-100 rounded-xl flex items-center justify-center mr-4">
                    <company.icon className="h-6 w-6 text-blue-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">{company.name}</h2>
                </div>
                <p className="text-gray-600 mb-6">{company.details}</p>
                <div className="space-y-3">
                  {company.achievements.map((achievement, idx) => (
                    <div key={idx} className="flex items-center text-gray-700">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                      {achievement}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-20 bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Our Impact</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <FaUsers className="h-8 w-8 text-blue-600 mx-auto mb-4" />
              <div className="text-3xl font-bold text-gray-900">1000+</div>
              <div className="text-gray-600">Developers Trained</div>
            </div>
            <div className="text-center">
              <FaChartLine className="h-8 w-8 text-blue-600 mx-auto mb-4" />
              <div className="text-3xl font-bold text-gray-900">50+</div>
              <div className="text-gray-600">Enterprise Solutions</div>
            </div>
            <div className="text-center">
              <FaBuilding className="h-8 w-8 text-blue-600 mx-auto mb-4" />
              <div className="text-3xl font-bold text-gray-900">4</div>
              <div className="text-gray-600">Companies</div>
            </div>
            <div className="text-center">
              <FaLightbulb className="h-8 w-8 text-blue-600 mx-auto mb-4" />
              <div className="text-3xl font-bold text-gray-900">100+</div>
              <div className="text-gray-600">Clients Served</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default CompaniesPage; 