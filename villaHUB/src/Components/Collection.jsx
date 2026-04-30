export default function Collection() {
  const images = [
    "https://res.cloudinary.com/doujmzgn3/image/upload/v1777524232/supun-batagoda-xAV7NSUeeLc-unsplash_gugum4.jpg",
    "https://res.cloudinary.com/doujmzgn3/image/upload/v1777524226/sean-oulashin-KMn4VEeEPR8-unsplash_nurucg.jpg",
    "https://res.cloudinary.com/doujmzgn3/image/upload/v1777524214/julie-ricard-n8MwfIQ596U-unsplash_t6nzrh.jpg",
    "https://res.cloudinary.com/doujmzgn3/image/upload/v1777524197/datingscout-eiWj4LDWeoc-unsplash_u7yo1b.jpg",
    "https://res.cloudinary.com/doujmzgn3/image/upload/v1777524663/miguel-alcantara-N29UIxaqmNM-unsplash_tlqn30.jpg",
    "https://res.cloudinary.com/doujmzgn3/image/upload/v1777524642/topique-sl-CfGNWroidaE-unsplash_nzgwkp.jpg",
    "https://res.cloudinary.com/doujmzgn3/image/upload/v1777524653/zoshua-colah-fAQCq3LdFxY-unsplash_zniliw.jpg",
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 py-16">
      {/* Title Section */}
      <div className="mb-12 text-center">
        <h1 className="capitalize text-3xl md:text-5xl font-extrabold tracking-tight text-slate-800">
          Easy to reach <span className="text-blue-600 underline decoration-yellow-400 underline-offset-8">anywhere</span> from here
        </h1>
        <p className="mt-4 text-slate-500 text-lg">Explore our curated collection of breathtaking destinations.</p>
      </div>

      {/* Grid Section */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 ">
        {images.map((src, index) => (
          <div 
            key={index} 
            className={`group relative overflow-hidden  shadow-lg transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl 
            ${index === 0 ? "lg:col-span-2 lg:row-span-2" : ""}`} // Makes the first image a "hero" feature
          >
            <img
              src={src}
              alt={`Collection item ${index + 1}`}
              className="h-full w-full object-cover aspect-square transition-transform duration-700 group-hover:scale-110"
            />
            {/* Soft Overlay on Hover */}
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
        ))}
      </div>
    </section>
  );
}