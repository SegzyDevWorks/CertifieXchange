import { Link } from "wouter";

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-300 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold text-white mb-4">GiftBit</h3>
            <p className="mb-4">
              Your trusted source for gift cards and Bitcoin purchases. Fast, secure, and reliable service.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/">
                  <a className="hover:text-white transition-colors">Home</a>
                </Link>
              </li>
              <li>
                <Link href="/#giftcards">
                  <a className="hover:text-white transition-colors">Gift Cards</a>
                </Link>
              </li>
              <li>
                <Link href="/#bitcoin">
                  <a className="hover:text-white transition-colors">Bitcoin</a>
                </Link>
              </li>
              <li>
                <Link href="/#faq">
                  <a className="hover:text-white transition-colors">FAQ</a>
                </Link>
              </li>
              <li>
                <Link href="#">
                  <a className="hover:text-white transition-colors">Terms & Conditions</a>
                </Link>
              </li>
              <li>
                <Link href="#">
                  <a className="hover:text-white transition-colors">Privacy Policy</a>
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Gift Cards */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Gift Cards</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#">
                  <a className="hover:text-white transition-colors">Amazon</a>
                </Link>
              </li>
              <li>
                <Link href="#">
                  <a className="hover:text-white transition-colors">Netflix</a>
                </Link>
              </li>
              <li>
                <Link href="#">
                  <a className="hover:text-white transition-colors">Steam</a>
                </Link>
              </li>
              <li>
                <Link href="#">
                  <a className="hover:text-white transition-colors">iTunes</a>
                </Link>
              </li>
              <li>
                <Link href="#">
                  <a className="hover:text-white transition-colors">Google Play</a>
                </Link>
              </li>
              <li>
                <Link href="#">
                  <a className="hover:text-white transition-colors">View All</a>
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <i className="fas fa-map-marker-alt mt-1 mr-3"></i>
                <span>123 Crypto Street, Digital City, 10010</span>
              </li>
              <li className="flex items-start">
                <i className="fas fa-envelope mt-1 mr-3"></i>
                <span>support@giftbit.com</span>
              </li>
              <li className="flex items-start">
                <i className="fab fa-whatsapp mt-1 mr-3"></i>
                <span>+1 234 567 8900</span>
              </li>
              <li className="flex items-start">
                <i className="fas fa-clock mt-1 mr-3"></i>
                <span>24/7 Customer Support</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-12 pt-8 text-center">
          <p>&copy; {new Date().getFullYear()} GiftBit. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
