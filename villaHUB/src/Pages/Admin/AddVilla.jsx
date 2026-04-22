import { useState } from "react"
import { toast } from "react-hot-toast";
import API from "../../api/axios";
import { 
  HiOutlineHome, 
  HiOutlineLocationMarker, 
  HiOutlineCurrencyDollar, 
  HiOutlineUserGroup,
  HiOutlineUpload,
  HiOutlineCheckCircle 
} from "react-icons/hi";
import { MdOutlineBedroomParent, MdOutlineBathtub } from "react-icons/md";
import { HiArrowLongRight } from "react-icons/hi2";

export default function AddVilla() {
  const [name, setName]= useState("");
  const [city, setCity]= useState("");
  const [address, setAddress]= useState("");
  const [description, setDescription]= useState("");
  const [maxGuests, setMaxGuests]= useState("");
  const [bedrooms, setBedrooms]= useState("");
  const [bathrooms, setBathrooms]= useState("");
  const [hasWifi, setHasWifi]= useState(false);
  const [hasPool, setHasPool]= useState(false);
  const [hasKitchen, setHasKitchen]= useState(false);
  const [hasAC, setHasAC]= useState(false);
  const [hasParking, setHasParking]= useState(false);
  const [isPetFriendly, setIsPetFriendly]= useState(false);
  const [isFeatured, setIsFeatured]= useState(false);
  const [photoes, setPhotoes]= useState(null);
  const [pricePerNight, setPricePerNight]= useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const villaData = new FormData();
    villaData.append("name", name);
    villaData.append("city", city);
    villaData.append("address", address);
    villaData.append("description", description);
    villaData.append("maxGuests", maxGuests);
    villaData.append("bedrooms", bedrooms);
    villaData.append("bathrooms", bathrooms);
    villaData.append("hasWifi", String(hasWifi));
    villaData.append("hasPool", String(hasPool));
    villaData.append("hasKitchen", String(hasKitchen));
    villaData.append("hasAC", String(hasAC));
    villaData.append("hasParking", String(hasParking));
    villaData.append("isPetFriendly", String(isPetFriendly));
    villaData.append("isFeatured", String(isFeatured));
    villaData.append("pricePerNight", pricePerNight);

    if (photoes) {
      villaData.append("photos", photoes);
    }

    try {
      await API.post("/villa", villaData);
      toast.success("Villa added successfully!");
      
      // Reset State
      setName(""); setCity(""); setAddress(""); setDescription("");
      setMaxGuests(""); setBedrooms(""); setBathrooms("");
      setHasWifi(false); setHasPool(false); setHasKitchen(false);
      setHasAC(false); setHasParking(false); setIsPetFriendly(false);
      setIsFeatured(false); setPhotoes(null); setPricePerNight("");
    } catch (error) {
      toast.error(error.response?.data?.message || "Error adding villa");
    }
  };

  return (
    <div className="w-full overflow-x-hidden bg-slate-50/60 px-3 py-4 sm:px-4 sm:py-8">
      <div className="mx-auto max-w-5xl">
        
        {/* Header Section */}
        <div className="mb-6 overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm sm:mb-8">
          <div className="grid gap-0 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="border-b border-slate-200 px-5 py-6 text-center sm:px-8 sm:py-8 lg:border-b-0 lg:border-r lg:text-left">
              <div className="inline-flex items-center space-x-2 rounded-full bg-teal-50 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-teal-700">
             <span>Property Management</span>
              </div>
              <h1 className="mt-4 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
                Add Villa
              </h1>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-500 sm:text-base">
                Create a polished villa listing with location, capacity, amenities, photo, and pricing details.
              </p>
            </div>

            <div className="bg-slate-900 px-5 py-6 text-white sm:px-8 sm:py-8">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-slate-300">
                Publishing Checklist
              </p>
              <div className="mt-5 grid gap-3 text-sm text-slate-200">
                <div className="rounded-2xl bg-white/8 px-4 py-3">Add a clear villa title and strong description</div>
                <div className="rounded-2xl bg-white/8 px-4 py-3">Include city, address, and guest capacity</div>
                <div className="rounded-2xl bg-white/8 px-4 py-3">Choose amenities and upload the main image</div>
                <div className="rounded-2xl bg-white/8 px-4 py-3">Set nightly price before submitting</div>
              </div>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Section 1: Essentials */}
          <section className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm sm:p-7 md:p-8">
            <div className="mb-6">
              <h2 className="text-sm font-bold uppercase tracking-widest text-slate-400 flex items-center gap-2">
               <HiOutlineHome className="text-teal-600 text-lg" /> Property Essentials
              </h2>
              <p className="mt-2 text-sm text-slate-500">Start with the core details guests will see first.</p>
            </div>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Villa Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e)=> setName(e.target.value)}
                  placeholder="e.g. Blue Lagoon Estate"
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 px-4 py-3.5 outline-none transition-all focus:bg-white focus:border-teal-600 focus:ring-4 focus:ring-teal-500/10 sm:px-5 sm:py-4"
                />
              </div>

              <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">City</label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e)=> setCity(e.target.value)}
                    placeholder="e.g. Galle"
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 px-4 py-3.5 outline-none transition-all focus:bg-white focus:border-teal-600 sm:px-5 sm:py-4"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Address</label>
                  <input
                    type="text"
                    value={address}
                    onChange={(e)=> setAddress(e.target.value)}
                    placeholder="Full street address"
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 px-4 py-3.5 outline-none transition-all focus:bg-white focus:border-teal-600 sm:px-5 sm:py-4"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Description</label>
                <textarea
                  value={description}
                  onChange={(e)=> setDescription(e.target.value)}
                  placeholder="Describe what makes this villa special..."
                  className="min-h-[120px] w-full rounded-2xl border border-slate-200 bg-slate-50/50 px-4 py-3.5 outline-none transition-all focus:bg-white focus:border-teal-600 sm:px-5 sm:py-4"
                />
              </div>
            </div>
          </section>

          {/* Section 2: Specs */}
          <section className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm sm:p-7 md:p-8">
            <div className="mb-6">
              <h2 className="text-sm font-bold uppercase tracking-widest text-slate-400 flex items-center gap-2">
               <HiOutlineUserGroup className="text-teal-600 text-lg" /> Specs & Capacity
              </h2>
              <p className="mt-2 text-sm text-slate-500">Set occupancy, room counts, and guest comfort basics.</p>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2">Max Guests</label>
                <div className="relative">
                  <HiOutlineUserGroup className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input type="number" value={maxGuests} onChange={(e)=> setMaxGuests(e.target.value)} className="w-full rounded-2xl border border-slate-200 bg-slate-50 pl-11 pr-4 py-3.5 outline-none transition focus:border-teal-600 focus:bg-white sm:py-4" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2">Bedrooms</label>
                <div className="relative">
                  <MdOutlineBedroomParent className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input type="number" value={bedrooms} onChange={(e)=> setBedrooms(e.target.value)} className="w-full rounded-2xl border border-slate-200 bg-slate-50 pl-11 pr-4 py-3.5 outline-none transition focus:border-teal-600 focus:bg-white sm:py-4" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2">Bathrooms</label>
                <div className="relative">
                  <MdOutlineBathtub className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input type="number" value={bathrooms} onChange={(e)=> setBathrooms(e.target.value)} className="w-full rounded-2xl border border-slate-200 bg-slate-50 pl-11 pr-4 py-3.5 outline-none transition focus:border-teal-600 focus:bg-white sm:py-4" />
                </div>
              </div>
            </div>
          </section>

          {/* Section 3: Amenities (Manual layout) */}
          <section className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm sm:p-7 md:p-8">
            <div className="mb-6">
              <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400">Villa Amenities</h3>
              <p className="mt-2 text-sm text-slate-500">Select the features available in this property.</p>
            </div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3 xl:gap-4">
              
              <label className="group flex items-center space-x-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 cursor-pointer">
                <div className="relative flex items-center">
                  <input type="checkbox" checked={hasWifi} onChange={(e)=> setHasWifi(e.target.checked)} className="peer h-6 w-6 appearance-none rounded-lg border-2 border-slate-300 checked:bg-teal-600 checked:border-teal-600 transition-all" />
                  <HiOutlineCheckCircle className="absolute left-0.5 text-white opacity-0 peer-checked:opacity-100 transition-opacity" />
                </div>
                <span className="text-sm font-semibold text-slate-600 group-hover:text-slate-900 transition-colors">Wi-Fi</span>
              </label>

              <label className="group flex items-center space-x-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 cursor-pointer">
                <div className="relative flex items-center">
                  <input type="checkbox" checked={hasPool} onChange={(e)=> setHasPool(e.target.checked)} className="peer h-6 w-6 appearance-none rounded-lg border-2 border-slate-300 checked:bg-teal-600 checked:border-teal-600 transition-all" />
                  <HiOutlineCheckCircle className="absolute left-0.5 text-white opacity-0 peer-checked:opacity-100 transition-opacity" />
                </div>
                <span className="text-sm font-semibold text-slate-600 group-hover:text-slate-900 transition-colors">Pool</span>
              </label>

              <label className="group flex items-center space-x-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 cursor-pointer">
                <div className="relative flex items-center">
                  <input type="checkbox" checked={hasKitchen} onChange={(e)=> setHasKitchen(e.target.checked)} className="peer h-6 w-6 appearance-none rounded-lg border-2 border-slate-300 checked:bg-teal-600 checked:border-teal-600 transition-all" />
                  <HiOutlineCheckCircle className="absolute left-0.5 text-white opacity-0 peer-checked:opacity-100 transition-opacity" />
                </div>
                <span className="text-sm font-semibold text-slate-600 group-hover:text-slate-900 transition-colors">Kitchen</span>
              </label>

              <label className="group flex items-center space-x-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 cursor-pointer">
                <div className="relative flex items-center">
                  <input type="checkbox" checked={hasAC} onChange={(e)=> setHasAC(e.target.checked)} className="peer h-6 w-6 appearance-none rounded-lg border-2 border-slate-300 checked:bg-teal-600 checked:border-teal-600 transition-all" />
                  <HiOutlineCheckCircle className="absolute left-0.5 text-white opacity-0 peer-checked:opacity-100 transition-opacity" />
                </div>
                <span className="text-sm font-semibold text-slate-600 group-hover:text-slate-900 transition-colors">Air Conditioning</span>
              </label>

              <label className="group flex items-center space-x-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 cursor-pointer">
                <div className="relative flex items-center">
                  <input type="checkbox" checked={hasParking} onChange={(e)=> setHasParking(e.target.checked)} className="peer h-6 w-6 appearance-none rounded-lg border-2 border-slate-300 checked:bg-teal-600 checked:border-teal-600 transition-all" />
                  <HiOutlineCheckCircle className="absolute left-0.5 text-white opacity-0 peer-checked:opacity-100 transition-opacity" />
                </div>
                <span className="text-sm font-semibold text-slate-600 group-hover:text-slate-900 transition-colors">Parking</span>
              </label>

              <label className="group flex items-center space-x-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 cursor-pointer">
                <div className="relative flex items-center">
                  <input type="checkbox" checked={isPetFriendly} onChange={(e)=> setIsPetFriendly(e.target.checked)} className="peer h-6 w-6 appearance-none rounded-lg border-2 border-slate-300 checked:bg-teal-600 checked:border-teal-600 transition-all" />
                  <HiOutlineCheckCircle className="absolute left-0.5 text-white opacity-0 peer-checked:opacity-100 transition-opacity" />
                </div>
                <span className="text-sm font-semibold text-slate-600 group-hover:text-slate-900 transition-colors">Pet Friendly</span>
              </label>

            </div>
          </section>

          {/* Section 4: Media & Pricing */}
          <section className="grid grid-cols-1 gap-6 rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm sm:p-7 md:grid-cols-2 md:gap-8 md:p-8">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-4">Villa Photo</label>
              <div className="relative rounded-[2rem] border-2 border-dashed border-slate-200 p-6 text-center transition-colors cursor-pointer group hover:bg-slate-50 sm:p-8">
                <input
                  type="file"
                  onChange={(e)=> setPhotoes(e.target.files?.[0] || null)}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                />
                <HiOutlineUpload className="mx-auto text-4xl text-slate-300 group-hover:text-teal-600 transition-colors mb-2" />
                <p className="text-xs font-bold text-slate-500 uppercase">
                  {photoes ? photoes.name : "Select property image"}
                </p>
              </div>
            </div>
            
            <div className="space-y-6">
               <div className="flex flex-col gap-2">
                  <label className="block text-sm font-bold text-slate-700">Price Per Night</label>
                  <div className="relative">
                    <HiOutlineCurrencyDollar className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input 
                      type="number" 
                      value={pricePerNight} 
                      onChange={(e)=> setPricePerNight(e.target.value)} 
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50 pl-11 pr-4 py-3.5 font-bold text-teal-600 outline-none transition focus:border-teal-600 focus:bg-white sm:py-4" 
                    />
                  </div>
               </div>

               <label className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 p-4 cursor-pointer">
                  <span className="text-sm font-bold text-slate-700">Featured Villa</span>
                  <input 
                    type="checkbox" 
                    checked={isFeatured} 
                    onChange={(e)=> setIsFeatured(e.target.checked)} 
                    className="h-6 w-11 appearance-none rounded-full bg-slate-300 checked:bg-teal-600 relative transition-all before:content-[''] before:absolute before:h-4 before:w-4 before:bg-white before:rounded-full before:top-1 before:left-1 checked:before:translate-x-5 before:transition-transform cursor-pointer" 
                  />
               </label>
               
               <button
                type="submit"
                className="group flex w-full items-center justify-center space-x-3 rounded-2xl bg-slate-900 py-4 text-sm font-bold text-white shadow-lg shadow-slate-200 transition-all hover:bg-slate-800 active:scale-[0.98] sm:py-5 sm:text-base"
              >
                <span>Add Villa listing</span>
                <HiArrowLongRight className="text-xl group-hover:translate-x-2 transition-transform" />
              </button>
            </div>
          </section>

        </form>
      </div>
    </div>
  );
}
