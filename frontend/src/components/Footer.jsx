import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-10">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* About Section */}
        <div>
          <h2 className="text-xl font-semibold mb-4">About Us</h2>
          <p className="text-gray-400 text-sm">
            We provide high-quality products at the best prices.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Quick Links</h2>
          <ul className="space-y-2">
            <li><Link to="/products" className="text-gray-400 hover:text-white">Products</Link></li>
            <li><Link to="/about" className="text-gray-400 hover:text-white">About</Link></li>
            <li><Link to="/contact" className="text-gray-400 hover:text-white">Contact</Link></li>
            <li><Link to="/faq" className="text-gray-400 hover:text-white">FAQ</Link></li>
          </ul>
        </div>

        {/* Customer Service */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Customer Service</h2>
          <ul className="space-y-2">
            <li><Link to="/returns" className="text-gray-400 hover:text-white">Returns</Link></li>
            <li><Link to="/shipping" className="text-gray-400 hover:text-white">Shipping</Link></li>
            <li><Link to="/terms" className="text-gray-400 hover:text-white">Terms & Conditions</Link></li>
            <li><Link to="/privacy" className="text-gray-400 hover:text-white">Privacy Policy</Link></li>
          </ul>
        </div>

        {/* Follow Us */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Follow Us</h2>
          <div className="flex space-x-4">
            <Link to="https://facebook.com" className="text-gray-400 hover:text-white text-2xl">
              <FaFacebook />
            </Link>
            <Link to="https://twitter.com" className="text-gray-400 hover:text-white text-2xl">
              <FaTwitter />
            </Link>
            <Link to="https://instagram.com" className="text-gray-400 hover:text-white text-2xl">
              <FaInstagram />
            </Link>
            <Link to="https://linkedin.com" className="text-gray-400 hover:text-white text-2xl">
              <FaLinkedin />
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="text-center text-gray-500 text-sm mt-8 border-t border-gray-700 pt-4">
        © 2025 YourBrand. All Rights Reserved.
      </div>
    </footer>
  );
}
