
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-gray-800 mt-10">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {/* About paragraph */}
        <div className="md:col-span-4 mb-6">
          <p className="text-sm text-gray-600">
            Dukandar.com is your one-stop online marketplace for quality products across multiple categories. 
            Enjoy a seamless shopping experience with curated collections, exclusive deals, and fast delivery. 
            We are committed to bringing you the best products at the best prices, right to your doorstep.
          </p>
        </div>

        {/* Customer Care */}
        <div>
          <h3 className="font-bold mb-4 text-lg">Customer Care</h3>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-pink-600 cursor-pointer">Contact Us</li>
            <li className="hover:text-pink-600 cursor-pointer">FAQ</li>
            <li className="hover:text-pink-600 cursor-pointer">Shipping</li>
            <li className="hover:text-pink-600 cursor-pointer">Returns</li>
            <li className="hover:text-pink-600 cursor-pointer">Order Status</li>
          </ul>
        </div>

        {/* About */}
        <div>
          <h3 className="font-bold mb-4 text-lg">About</h3>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-pink-600 cursor-pointer">About Us</li>
            <li className="hover:text-pink-600 cursor-pointer">Careers</li>
            <li className="hover:text-pink-600 cursor-pointer">Press</li>
            <li className="hover:text-pink-600 cursor-pointer">Blog</li>
            <li className="hover:text-pink-600 cursor-pointer">Affiliate</li>
          </ul>
        </div>

        {/* Social Links */}
        <div>
          <h3 className="font-bold mb-4 text-lg">Follow Us</h3>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-pink-600 cursor-pointer">Facebook</li>
            <li className="hover:text-pink-600 cursor-pointer">Instagram</li>
            <li className="hover:text-pink-600 cursor-pointer">Twitter</li>
            <li className="hover:text-pink-600 cursor-pointer">LinkedIn</li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="font-bold mb-4 text-lg">Newsletter</h3>
          <p className="text-sm mb-2">Subscribe to get updates and offers.</p>
          <div className="flex">
            <input
              type="email"
              placeholder="Enter your email"
              className="p-2 rounded-l border border-gray-300 flex-1 focus:outline-none"
            />
            <button className="bg-pink-600 px-4 rounded-r hover:bg-pink-700 text-white">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-gray-300 mt-6 py-4 text-center text-sm">
        &copy; {new Date().getFullYear()} Dukandar.com. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
