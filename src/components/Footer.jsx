

import React from "react";
import { Facebook, Instagram, Twitter, YouTube } from "@mui/icons-material";
import GooglePlayIcon from "@mui/icons-material/Android";
import AppleIcon from "@mui/icons-material/Apple";

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-gray-800 mt-10">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">

        {/* Men */}
        <div>
          <h3 className="font-bold mb-4 text-lg">MEN</h3>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-gray-800 cursor-pointer">T-Shirts</li>
            <li className="hover:text-gray-800 cursor-pointer">Shirts</li>
            <li className="hover:text-gray-800 cursor-pointer">Jeans</li>
            <li className="hover:text-gray-800 cursor-pointer">Trousers</li>
            <li className="hover:text-gray-800 cursor-pointer">Shorts</li>
            <li className="hover:text-gray-800 cursor-pointer">Suits & Blazers</li>
            <li className="hover:text-gray-800 cursor-pointer">Activewear</li>
            <li className="hover:text-gray-800 cursor-pointer">Footwear</li>
          </ul>
          <p className="text-xs text-gray-600 mt-3">
            Dukandar offers a complete online shopping experience for men. From casual T-shirts, jeans, and shorts to formal suits, blazers, and smart shirts, Dukandar brings the best brands under one roof. Explore our collection of sportswear, shoes, watches, sunglasses, bags, and accessories to complete your style effortlessly.
          </p>
        </div>

        {/* Women */}
        <div>
          <h3 className="font-bold mb-4 text-lg">WOMEN</h3>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-gray-800 cursor-pointer">Tops</li>
            <li className="hover:text-gray-800 cursor-pointer">Dresses</li>
            <li className="hover:text-gray-800 cursor-pointer">Jeans & Trousers</li>
            <li className="hover:text-gray-800 cursor-pointer">Ethnic Wear</li>
            <li className="hover:text-gray-800 cursor-pointer">Footwear</li>
            <li className="hover:text-gray-800 cursor-pointer">Handbags</li>
            <li className="hover:text-gray-800 cursor-pointer">Jewellery</li>
            <li className="hover:text-gray-800 cursor-pointer">Activewear</li>
          </ul>
          <p className="text-xs text-gray-600 mt-3">
            Dukandar’s women’s collection offers versatile fashion for every occasion. Browse stylish tops, dresses, jeans, ethnic wear, and activewear. Complete your look with footwear, handbags, jewellery, and accessories from the best brands. Dukandar makes shopping convenient, trendy, and affordable for women everywhere.
          </p>
        </div>

        {/* Kids */}
        <div>
          <h3 className="font-bold mb-4 text-lg">KIDS</h3>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-gray-800 cursor-pointer">Boys Clothing</li>
            <li className="hover:text-gray-800 cursor-pointer">Girls Clothing</li>
            <li className="hover:text-gray-800 cursor-pointer">Toys</li>
            <li className="hover:text-gray-800 cursor-pointer">Footwear</li>
            <li className="hover:text-gray-800 cursor-pointer">School Supplies</li>
          </ul>
          <p className="text-xs text-gray-600 mt-3">
            Dukandar brings a fun and stylish collection for kids. From boys’ and girls’ clothing to toys, footwear, and school essentials, Dukandar ensures comfort, safety, and style for your little ones. Explore a wide range of brands that make online shopping easy and enjoyable for families.
          </p>
        </div>

        {/* Home & App */}
        <div>
          <h3 className="font-bold mb-4 text-lg">HOME & MORE</h3>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-gray-800 cursor-pointer">Home Decor</li>
            <li className="hover:text-gray-800 cursor-pointer">Kitchen & Dining</li>
            <li className="hover:text-gray-800 cursor-pointer">Bedding</li>
            <li className="hover:text-gray-800 cursor-pointer">Bath</li>
            <li className="hover:text-gray-800 cursor-pointer">Gadgets</li>
          </ul>
          <p className="text-xs text-gray-600 mt-3">
            Dukandar’s home collection offers everything to make your living space stylish and functional. From décor, kitchenware, bedding, and bath essentials to innovative gadgets, Dukandar makes home shopping convenient, curated, and affordable.
          </p>

          {/* Mobile App & Social */}
          <h3 className="font-bold mt-6 mb-2 text-lg">EXPERIENCE DUKANDAR APP ON MOBILE</h3>
          <div className="flex gap-2 mb-4">
            <button className="flex items-center gap-1 border rounded px-3 py-2 hover:bg-gray-200">
              <GooglePlayIcon /> Google Play
            </button>
            <button className="flex items-center gap-1 border rounded px-3 py-2 hover:bg-gray-200">
              <AppleIcon /> App Store
            </button>
          </div>

          <h3 className="font-bold mb-2 text-lg">KEEP IN TOUCH</h3>
          <div className="flex gap-3 mb-4">
            <Facebook className="cursor-pointer hover:text-gray-800" />
            <Instagram className="cursor-pointer hover:text-gray-800" />
            <Twitter className="cursor-pointer hover:text-gray-800" />
            <YouTube className="cursor-pointer hover:text-gray-800" />
          </div>

          {/* Guarantees */}
          <div className="space-y-2 text-sm">
            <p>✅ 100% ORIGINAL guarantee for all products at Dukandar.com</p>
            <p>↩️ Return within 14 days of receiving your order</p>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-gray-300 mt-6 py-4 text-center text-sm text-gray-600">
        &copy; {new Date().getFullYear()} Dukandar.com. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
