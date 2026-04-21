import { HiOutlineShieldCheck, HiOutlineSupport, HiOutlineTicket } from "react-icons/hi";
import { RiHotelLine, RiCustomerService2Line, RiSecurePaymentLine } from "react-icons/ri";

export default function Service() {
    const services = [
        {
            icon: <RiHotelLine className="text-4xl text-primary" />,
            title: "Luxury Collections",
            description: "Handpicked premium villas and private estates designed for ultimate comfort and style."
        },
        {
            icon: <RiSecurePaymentLine className="text-4xl text-primary" />,
            title: "Secure Booking",
            description: "Your transactions are protected with industry-leading encryption and verified gateways."
        },
        {
            icon: <RiCustomerService2Line className="text-4xl text-primary" />,
            title: "24/7 Concierge",
            description: "Our dedicated support team is available around the clock to assist with your travel needs."
        }
    ];

    return (
        <section className="py-24 bg-taupe-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <h2 className="text-sm font-bold text-teal-600 uppercase tracking-widest mb-3">Why StayEase?</h2>
                    <p className="text-4xl font-extrabold text-slate-900 tracking-tight">
                        Experience World-Class Services
                    </p>
                </div>

                {/* Service Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-center">
                    {services.map((service, index) => (
                        <div 
                            key={index} 
                            className="group p-10 bg-white rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:shadow-teal-500/10 transition-all duration-300 hover:-translate-y-2"
                        >
                            <div className="mb-6 inline-block p-4 rounded-2xl bg-slate-50 group-hover:bg-teal-50 transition-colors">
                                {service.icon}
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-4 tracking-tight">
                                {service.title}
                            </h3>
                            <p className="text-slate-500 leading-relaxed text-sm">
                                {service.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}