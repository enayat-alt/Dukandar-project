import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white mt-10">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {/* Customer Care */}
        <div>
          <h3 className="font-bold mb-4 text-lg">Customer Care</h3>
          <ul className="space-y-2 text-sm">
            <li>Contact Us</li>
            <li>FAQ</li>
            <li>Shipping</li>
            <li>Returns</li>
            <li>Order Status</li>
          </ul>
        </div>

        {/* About */}
        <div>
          <h3 className="font-bold mb-4 text-lg">About</h3>
          <ul className="space-y-2 text-sm">
            <li>About Us</li>
            <li>Careers</li>
            <li>Press</li>
            <li>Blog</li>
            <li>Affiliate</li>
          </ul>
        </div>

        {/* Social Links */}
        <div>
          <h3 className="font-bold mb-4 text-lg">Follow Us</h3>
          <ul className="space-y-2 text-sm">
            <li>Facebook</li>
            <li>Instagram</li>
            <li>Twitter</li>
            <li>LinkedIn</li>
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
              className="p-2 rounded-l text-black flex-1"
            />
            <button className="bg-pink-600 px-4 rounded-r hover:bg-pink-700">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-gray-700 mt-6 py-4 text-center text-sm">
        &copy; {new Date().getFullYear()} Dukandar.com All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
