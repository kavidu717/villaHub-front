import { BsFillTelephoneFill } from "react-icons/bs";
import { MdAttachEmail } from "react-icons/md";
import { FaAddressBook } from "react-icons/fa6";
import { HiArrowLongRight } from "react-icons/hi2";
import { useState } from "react";
import { toast } from "react-hot-toast";

export default function Contact() {
    const [firstName, setFirstName]= useState('');
    const [lastName, setLastName]= useState('');
    const [email, setEmail]= useState('');
    const [phone, setPhone]= useState('');
    const [message, setMessage]= useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(firstName, lastName, email, phone, message);

         const text = `Hello, I have a new inquiry:

     Name: ${firstName} ${lastName}
     Email: ${email}
     Phone: ${phone}

     Message:${message}`;

     if (!firstName || !lastName || !email || !phone || !message) {
      toast.error("Please fill in all fields before submitting.");
      return;
    }

  const encodedText = encodeURIComponent(text);

  const whatsappNumber = "94773005419"; // 👉 your number (no +, no spaces)

  const url = `https://wa.me/${whatsappNumber}?text=${encodedText}`;

  window.open(url, "_blank");

    }
  

  return (
    <div className="min-h-screen bg-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="text-teal-600 font-bold uppercase tracking-[0.2em] text-xs mb-3">Get In Touch</h2>
          <h1 className="text-5xl font-black text-slate-900 tracking-tight">Contact Us</h1>
          <div className="h-1.5 w-20 bg-teal-500 mx-auto mt-6 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          
          {/* Left Column: Info & Map */}
          <div className="space-y-10">
            <div>
              <h3 className="text-2xl font-bold text-slate-900 mb-6">Villa Hub Headquarters</h3>
              <div className="space-y-6">
                {/* Phone */}
                <div className="flex items-start gap-5">
                  <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-teal-600 border border-slate-100 shadow-sm">
                    <BsFillTelephoneFill size={20} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Call Support</p>
                    <p className="text-slate-700 font-semibold">+94 300 5419</p>
                    <p className="text-slate-700 font-semibold">+94 300 5420</p>
                  </div>
                </div>

                {/* Address */}
                <div className="flex items-start gap-5">
                  <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-teal-600 border border-slate-100 shadow-sm">
                    <FaAddressBook size={20} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Our Location</p>
                    <p className="text-slate-700 font-semibold leading-relaxed">No 123, Anuradhapura, Sri Lanka</p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-5">
                  <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-teal-600 border border-slate-100 shadow-sm">
                    <MdAttachEmail size={22} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Email Queries</p>
                    <p className="text-slate-700 font-semibold">dushmanthakavidu143@gmail.com</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Google Map Implementation */}
            <div className="w-full h-[350px] rounded-[2rem] overflow-hidden shadow-2xl shadow-slate-200 border-8 border-slate-50">
              <iframe
                title="Villa Hub Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63137.95475373307!2d80.37032121356783!3d8.306530669274291!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3afcf4f995831631%3A0x66c8024479e497f!2sAnuradhapura!5e0!3m2!1sen!2slk!4v1713710000000!5m2!1sen!2slk"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="bg-slate-50/50 p-8 md:p-12 rounded-[3rem] border border-slate-100">
            <div className="mb-10">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">Send a Message</h2>
              <p className="text-slate-500 font-medium leading-relaxed">
                Have a question? Please fill out the form below and we will get back to you as soon as possible.
              </p>
            </div>

            <form action="" className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 ml-1">First Name</label>
                  <input 
                    type="text" 
                    required
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="John" 
                    className="w-full rounded-2xl border-none bg-white px-6 py-4 shadow-sm outline-none ring-1 ring-slate-200 focus:ring-2 focus:ring-teal-500 transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 ml-1">Last Name</label>
                  <input 
                    type="text" 
                    required
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Doe" 
                    className="w-full rounded-2xl border-none bg-white px-6 py-4 shadow-sm outline-none ring-1 ring-slate-200 focus:ring-2 focus:ring-teal-500 transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 ml-1">Email Address</label>
                <input 
                  type="email"
                  required 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="john@example.com" 
                  className="w-full rounded-2xl border-none bg-white px-6 py-4 shadow-sm outline-none ring-1 ring-slate-200 focus:ring-2 focus:ring-teal-500 transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 ml-1">Phone Number</label>
                <input 
                  type="text" 
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}

                  placeholder="+94 XX XXX XXXX" 
                  className="w-full rounded-2xl border-none bg-white px-6 py-4 shadow-sm outline-none ring-1 ring-slate-200 focus:ring-2 focus:ring-teal-500 transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 ml-1">Your Message</label>
                <textarea 
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell us how we can help you..." 
                  required
                  rows="5" 
                  className="w-full rounded-2xl border-none bg-white px-6 py-4 shadow-sm outline-none ring-1 ring-slate-200 focus:ring-2 focus:ring-teal-500 transition-all resize-none"
                />
              </div>

              <button 
                type="submit"
                
                className="group w-full flex items-center justify-center gap-3 bg-slate-900 text-white font-bold py-5 rounded-2xl hover:bg-teal-600 shadow-xl shadow-slate-200 transition-all active:scale-[0.98]"
              >
                <span>Send Message</span>
                <HiArrowLongRight className="text-xl group-hover:translate-x-2 transition-transform" />
              </button>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
}