"use client";
import { useState } from "react";
import Image from "next/image";

export default function Home() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    contactNumber: "",
    location: "",
    businessName: "",
    teamSize: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const phone = process.env.NEXT_PUBLIC_PHONE_NUMBER;
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/submit-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        // Show success popup
        setShowSuccessPopup(true);
        // Reset form
        setFormData({
          fullName: "",
          email: "",
          contactNumber: "",
          location: "",
          businessName: "",
          teamSize: "",
        });
        // Auto-hide popup after 5 seconds
        setTimeout(() => {
          setShowSuccessPopup(false);
        }, 5000);
      } else {
        alert(`Error: ${data.error || 'Failed to submit form'}`);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Failed to submit form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white font-[family-name:var(--font-geist-sans)]">
      {/* Success Popup */}
      {showSuccessPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full transform animate-scale-in">
            <div className="text-center">
              {/* Success Icon */}
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4">
                <svg
                  className="h-10 w-10 text-[#00A651]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
              </div>
              
              {/* Success Message */}
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Thank You!
              </h3>
              <p className="text-gray-600 mb-6">
                We will contact you soon.
              </p>
              
              {/* Close Button */}
              <button
                onClick={() => setShowSuccessPopup(false)}
                className="w-full bg-[#00A651] text-white font-bold py-3 px-6 rounded-lg hover:bg-green-600 transition-colors shadow-lg"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Container */}
      <div className="container mx-auto px-4 py-4 lg:py-6 max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-8 items-start">
          
          {/* Left Section */}
          <div className="space-y-3">
            {/* Logo */}
            <div className="w-26 h-14 relative">
              <Image
                src="/logo2.png"
                alt="Company Logo"
                fill
                className="object-contain"
                priority
              />
            </div>

            {/* Badge */}
            <div className="inline-block">
              <span className="bg-gradient-to-r from-red-500 to-red-600 text-white px-3 py-1.5 rounded-full text-xs font-medium shadow-md">
                #1 Web Design & Development Company
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="text-2xl lg:text-3xl xl:text-4xl text-black font-bold leading-tight">
              Boost Your Course Sales by{" "}
              <span className="text-[#FF0000]">10X</span> with the{" "}
              <span className="text-[#FF0000]">Best Website Design Company</span>
            </h1>

            {/* Price Badge */}
            <div className="inline-block bg-[#00A651] text-white px-4 py-2 rounded-lg font-bold text-base shadow-lg">
              Starting from ₹4,999/- + GST
            </div>

            {/* Description */}
            <p className="text-gray-600 text-sm leading-relaxed">
              Transform your business with a stunning, high-converting website designed by experts. 
              We create custom solutions that drive results and help you stand out in the digital world.
            </p>

            {/* Info Boxes */}
            <div className="grid grid-cols-2 gap-2 py-2">
              <div className="flex items-center space-x-2 bg-gray-50 p-2 rounded-lg hover:shadow-md transition-shadow">
                <span className="text-xl">🏆</span>
                <span className="font-semibold text-gray-800 text-xs">Award Winning Team</span>
              </div>
              <div className="flex items-center space-x-2 bg-gray-50 p-2 rounded-lg hover:shadow-md transition-shadow">
                <span className="text-xl">💼</span>
                <span className="font-semibold text-gray-800 text-xs">4+ Years of Expertise</span>
              </div>
              <div className="flex items-center space-x-2 bg-gray-50 p-2 rounded-lg hover:shadow-md transition-shadow">
                <span className="text-xl">⏰</span>
                <span className="font-semibold text-gray-800 text-xs">24/7 Support</span>
              </div>
              <div className="flex items-center space-x-2 bg-gray-50 p-2 rounded-lg hover:shadow-md transition-shadow">
                <span className="text-xl">⭐</span>
                <span className="font-semibold text-gray-800 text-xs">Top Quality Work</span>
              </div>
            </div>

            {/* Call to Action */}
            <div className="bg-gradient-to-r from-red-50 to-green-50 border-l-4 border-[#FF0000] p-3 rounded-lg">
              <p className="text-sm font-semibold text-gray-800">
                Let&apos;s Discuss On Call at{" "}
                <a href={"tel:+91" + phone} className="text-[#00A651] hover:underline">
                  +91 {phone}
                </a>
              </p>
            </div>

          </div>

          {/* Right Section - Form & Image */}
          <div className="space-y-4">
            {/* Form Card */}
            <div className="bg-white rounded-xl shadow-xl p-5 border border-gray-100">
              <form onSubmit={handleSubmit} className="space-y-3">
                {/* Full Name */}
                <div>
                  <label htmlFor="fullName" className="block text-xs font-medium text-gray-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    required
                    value={formData.fullName}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border text-gray-500 border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00A651] focus:border-transparent outline-none transition-all text-sm"
                    placeholder="Enter your full name"
                  />
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-xs font-medium text-gray-700 mb-1">
                    Email Id *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border text-gray-500 border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00A651] focus:border-transparent outline-none transition-all text-sm"
                    placeholder="your@email.com"
                  />
                </div>

                {/* Contact Number */}
                <div>
                  <label htmlFor="contactNumber" className="block text-xs font-medium text-gray-700 mb-1">
                    Contact Number *
                  </label>
                  <div className="flex">
                    <span className="inline-flex items-center px-3 py-2 bg-gray-100 border border-r-0 border-gray-300 rounded-l-lg text-gray-700 font-medium text-sm">
                      🇮🇳 +91
                    </span>
                    <input
                      type="tel"
                      id="contactNumber"
                      name="contactNumber"
                      required
                      value={formData.contactNumber}
                      onChange={handleChange}
                      className="flex-1 px-3 py-2 border text-gray-500 border-gray-300 rounded-r-lg focus:ring-2 focus:ring-[#00A651] focus:border-transparent outline-none transition-all text-sm"
                      placeholder="1234567890"
                      pattern="[0-9]{10}"
                    />
                  </div>
                </div>

                {/* Location */}
                <div>
                  <label htmlFor="location" className="block text-xs font-medium text-gray-700 mb-1">
                    Your Location *
                  </label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    required
                    value={formData.location}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border text-gray-500 border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00A651] focus:border-transparent outline-none transition-all text-sm"
                    placeholder="City, State"
                  />
                </div>

                {/* Business Name */}
                <div>
                  <label htmlFor="businessName" className="block text-xs font-medium text-gray-700 mb-1">
                    Your Business Name
                  </label>
                  <input
                    type="text"
                    id="businessName"
                    name="businessName"
                    value={formData.businessName}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border text-gray-500 border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00A651] focus:border-transparent outline-none transition-all text-sm"
                    placeholder="Company or business name"
                  />
                </div>

                {/* Team Size */}
                <div>
                  <label htmlFor="teamSize" className="block text-xs font-medium text-gray-700 mb-1">
                    Your Company Team Size
                  </label>
                  <select
                    id="teamSize"
                    name="teamSize"
                    value={formData.teamSize}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 text-gray-500 rounded-lg focus:ring-2 focus:ring-[#00A651] focus:border-transparent outline-none transition-all bg-white text-sm"
                  >
                    <option value="">Select team size</option>
                    <option value="0-3">0 to 3</option>
                    <option value="4-10">4 to 10</option>
                    <option value="11-50">11 to 50</option>
                    <option value="51-200">51 to 200</option>
                    <option value="200+">200+</option>
                  </select>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#00A651] text-white font-bold py-3 rounded-lg hover:bg-green-600 transition-colors shadow-lg mt-4 text-sm disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Submitting...' : 'Get a FREE Quote'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl p-8 text-center shadow-2xl border-2 border-gray-200 hover:shadow-[0_20px_50px_rgba(0,166,81,0.3)] hover:scale-105 transition-all duration-300">
            <div className="text-5xl font-bold text-[#00A651] mb-3">4.9⭐</div>
            <div className="text-base text-gray-700 font-semibold">Ratings</div>
          </div>
          <div className="bg-white rounded-xl p-8 text-center shadow-2xl border-2 border-gray-200 hover:shadow-[0_20px_50px_rgba(0,166,81,0.3)] hover:scale-105 transition-all duration-300">
            <div className="text-5xl font-bold text-[#00A651] mb-3">4+</div>
            <div className="text-base text-gray-700 font-semibold">Years Experience</div>
          </div>
          <div className="bg-white rounded-xl p-8 text-center shadow-2xl border-2 border-gray-200 hover:shadow-[0_20px_50px_rgba(0,166,81,0.3)] hover:scale-105 transition-all duration-300">
            <div className="text-5xl font-bold text-[#00A651] mb-3">10+</div>
            <div className="text-base text-gray-700 font-semibold">Projects</div>
          </div>
        </div>
      </div>

      {/* WhatsApp Floating Button */}
      <a
        href={"https://wa.me/91" + process.env.NEXT_PUBLIC_PHONE_NUMBER}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-4 right-4 bg-[#25D366] text-white w-12 h-12 rounded-full shadow-xl flex items-center justify-center hover:scale-110 transition-transform z-50"
        aria-label="Chat on WhatsApp"
      >
        <svg
          className="w-6 h-6"
          fill="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
        </svg>
      </a>
    </div>
  );
}
