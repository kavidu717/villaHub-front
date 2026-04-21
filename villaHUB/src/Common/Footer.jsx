import { Link } from "react-router-dom";
// Importing specific icons from FontAwesome (fa) and HeroIcons (hi)
import { FaFacebookF, FaInstagram, FaXTwitter } from "react-icons/fa6";
import { HiMail, HiPhone, HiLocationMarker, HiGlobe } from "react-icons/hi";

export default function Footer() {
  return (
    <footer id="contact" className="bg-blue-700 text-slate-300 border-t border-slate-800 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          {/* Brand Section */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2">
              <span className="text-2xl font-extrabold text-white tracking-tighter">
                Stay<span className="text-primary">Ease</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-slate-400">
              Experience a cleaner booking journey for luxury villas and group vacations. We bring paradise closer to you.
            </p>
            <div className="flex space-x-4 pt-2">
              {/* Social Icons using FontAwesome 6 */}
              <a href="#" className="p-2.5 bg-slate-800 rounded-full hover:text-primary hover:bg-slate-700 transition-all">
                <FaFacebookF size={18} />
              </a>
              <a href="#" className="p-2.5 bg-slate-800 rounded-full hover:text-primary hover:bg-slate-700 transition-all">
                <FaInstagram size={18} />
              </a>
              <a href="#" className="p-2.5 bg-slate-800 rounded-full hover:text-primary hover:bg-slate-700 transition-all">
                <FaXTwitter size={18} />
              </a>
            </div>
          </div>

          {/* Platform Links */}
          <div>
            <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-6">Platform</h4>
            <ul className="space-y-4 text-sm font-medium">
              <li><a href="#featured" className="hover:text-primary transition-colors">Featured Villas</a></li>
              <li><a href="#benefits" className="hover:text-primary transition-colors">Why Choose Us</a></li>
              <li><Link to="/register" className="hover:text-primary transition-colors">Create Account</Link></li>
              <li><Link to="/villas" className="hover:text-primary transition-colors">Browse Stays</Link></li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-6">Contact</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-center space-x-3 group">
                <HiLocationMarker size={20} className="text-primary" />
                <span className="group-hover:text-white transition-colors">Colombo, Sri Lanka</span>
              </li>
              <li className="flex items-center space-x-3 group">
                <HiPhone size={20} className="text-primary" />
                <span className="group-hover:text-white transition-colors">+94 77 300 5419</span>
              </li>
              <li className="flex items-center space-x-3 group">
                <HiMail size={20} className="text-primary" />
                <span className="group-hover:text-white transition-colors">support@stayease.lk</span>
              </li>
            </ul>
          </div>

          {/* Trust Badge / Support Card */}
          <div className="bg-slate-800/40 p-6 rounded-2xl border border-slate-700/50 backdrop-blur-sm">
            <h4 className="text-white font-bold text-sm mb-3 flex items-center gap-2">
              <HiGlobe size={20} className="text-primary" /> Global Support
            </h4>
            <p className="text-xs text-slate-400 leading-5">
              Available 24/7 for booking assistance and villa management queries.
            </p>
            <button className="mt-4 w-full bg-primary text-slate-900 font-bold py-2.5 rounded-xl text-sm hover:bg-yellow-500 hover:shadow-lg hover:shadow-primary/20 transition-all active:scale-95">
              Live Chat
            </button>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center text-[11px] font-bold uppercase tracking-widest text-slate-500">
          <p>© {new Date().getFullYear()} StayEase VillaHub. All rights reserved.</p>
          <div className="flex space-x-8 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Use</a>
            <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}