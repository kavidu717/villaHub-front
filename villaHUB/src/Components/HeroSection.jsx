
import { HiSearch, HiCalendar, HiUsers } from "react-icons/hi";
import { Link } from "react-router-dom";

export default function HeroSection() {
    return (
        <section className="relative h-[90vh] w-full overflow-hidden">
            {/* Background Image with Zoom Effect */}
            <div className="absolute inset-0">
                <img 
                    src="https://res.cloudinary.com/doujmzgn3/image/upload/v1776769462/visualsofdana-T5pL6ciEn-I-unsplash_hu8urz.jpg"
                    alt="Luxury Villa Hero" 
                    className="h-full w-full object-cover transition-transform duration-[10s] scale-105 hover:scale-100"
                />
                {/* Dark Gradient Overlay for Readability */}
                <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 via-slate-900/40 to-transparent" />
            </div>

            {/* Content Container */}
            <div className="relative mx-auto flex h-full max-w-6xl flex-col justify-center px-4 sm:px-6 lg:px-8">
                <div className="max-w-2xl text-left">
                    <div className="mb-4 inline-flex items-center space-x-2 rounded-full bg-primary/20 px-4 py-1.5 backdrop-blur-md">
                        <span className="text-xs font-bold uppercase tracking-widest text-primary">Premium Villa Rentals</span>
                    </div>
                    
                    <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-7xl">
                        Find your next <br /> 
                        <span className="text-primary italic text-amber-500">Paradise stay. </span>
                    </h1>
                    
                    <p className="mt-6 max-w-md text-lg leading-relaxed text-slate-200">
                        Explore our curated collection of luxury villas, private estates, and unique getaways designed for your ultimate comfort.
                    </p>

                    <div className="mt-10 flex flex-wrap gap-4">
                        <Link 
                            to="/villas" 
                            className="rounded-2xl bg-yellow-400 px-8 py-4 text-sm font-bold text-slate-900 shadow-xl shadow-primary/20 transition-all hover:bg-yellow-500 active:scale-95"
                        >
                            Browse Villas
                        </Link>
                        <button className="rounded-2xl bg-white/10 px-8 py-4 text-sm font-bold text-white backdrop-blur-md transition-all hover:bg-white/20 border border-white/20">
                            Learn More
                        </button>
                    </div>
                </div>

                
               
            </div>
        </section>
    );
}