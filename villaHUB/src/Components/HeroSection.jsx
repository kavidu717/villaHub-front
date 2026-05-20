
import { useState, useEffect, useRef } from "react";
import { HiSearch, HiCalendar, HiUsers } from "react-icons/hi";
import { Link } from "react-router-dom";

export default function HeroSection() {
    const canvasRef = useRef(null);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const totalFrames = 240;
        const loadedImages = [];
        let loadedCount = 0;

        // Preload all frames
        for (let i = 1; i <= totalFrames; i++) {
            const img = new Image();
            const frameString = String(i).padStart(3, '0');
            img.src = `/ezgif-6b15af79d7fa79a5-jpg/ezgif-frame-${frameString}.jpg`;
            img.onload = () => {
                loadedCount++;
                if (loadedCount >= 10) {
                    // Start playing once the first 10 frames are buffered
                    setIsLoaded(true);
                }
            };
            loadedImages.push(img);
        }

        // Canvas resizing
        const canvas = canvasRef.current;
        if (!canvas) return;
        
        const ctx = canvas.getContext("2d");
        
        const handleResize = () => {
            if (canvas.parentElement) {
                canvas.width = canvas.parentElement.clientWidth;
                canvas.height = canvas.parentElement.clientHeight;
            }
        };

        handleResize();
        window.addEventListener("resize", handleResize);

        // Animation Loop
        let animationFrameId;
        let currentFrame = 0;
        let lastTime = 0;
        const fps = 24; // Play sequence at 24 frames per second
        const interval = 1000 / fps;

        const render = (timestamp) => {
            if (!lastTime) lastTime = timestamp;
            const elapsed = timestamp - lastTime;

            if (elapsed >= interval) {
                const img = loadedImages[currentFrame];
                if (img && img.complete) {
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    
                    // Cover calculation (object-cover equivalent for Canvas)
                    const imgRatio = img.width / img.height;
                    const canvasRatio = canvas.width / canvas.height;
                    let drawWidth, drawHeight, drawX, drawY;

                    if (canvasRatio > imgRatio) {
                        drawWidth = canvas.width;
                        drawHeight = canvas.width / imgRatio;
                        drawX = 0;
                        drawY = (canvas.height - drawHeight) / 2;
                    } else {
                        drawWidth = canvas.height * imgRatio;
                        drawHeight = canvas.height;
                        drawX = (canvas.width - drawWidth) / 2;
                        drawY = 0;
                    }

                    ctx.drawImage(img, drawX, drawY, drawWidth, drawHeight);
                }
                
                currentFrame = (currentFrame + 1) % totalFrames;
                lastTime = timestamp;
            }

            animationFrameId = requestAnimationFrame(render);
        };

        animationFrameId = requestAnimationFrame(render);

        return () => {
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <section className="relative h-[90vh] w-full overflow-hidden">
            {/* Animated Background Canvas / Image Sequence */}
            <div className="absolute inset-0 w-full h-full overflow-hidden">
                <canvas 
                    ref={canvasRef} 
                    className="w-full h-full object-cover scale-105"
                />
                {/* Fallback static image until animation loads */}
                {!isLoaded && (
                    <img 
                        src="/ezgif-6b15af79d7fa79a5-jpg/ezgif-frame-001.jpg"
                        alt="Luxury Villa Hero" 
                        className="absolute inset-0 h-full w-full object-cover scale-105"
                    />
                )}
                {/* Dark Gradient Overlay for Readability */}
                <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/50 to-transparent" />
            </div>

            {/* Ambient Glow Elements */}
            <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-amber-500/10 blur-3xl animate-ambient-1 pointer-events-none" />
            <div className="absolute bottom-1/4 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-yellow-600/5 blur-3xl animate-ambient-2 pointer-events-none" />

            {/* Content Container */}
            <div className="relative mx-auto flex h-full max-w-6xl flex-col justify-center px-4 sm:px-6 lg:px-8">
                <div className="max-w-2xl text-left">
                    <div className="mb-4 inline-flex items-center space-x-2 rounded-full bg-primary/20 px-4 py-1.5 backdrop-blur-md animate-fade-slide-up delay-100 opacity-init-0">
                        <span className="text-xs font-bold uppercase tracking-widest text-amber-500">Premium Villa Rentals</span>
                    </div>
                    
                    <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-7xl animate-fade-slide-up delay-200 opacity-init-0">
                        Find your next <br /> 
                        <span className="text-primary italic text-amber-500">Paradise stay. </span>
                    </h1>
                    
                    <p className="mt-6 max-w-md text-lg leading-relaxed text-slate-200 animate-fade-slide-up delay-400 opacity-init-0">
                        Explore our curated collection of luxury villas, private estates, and unique getaways designed for your ultimate comfort.
                    </p>

                    <div className="mt-10 flex flex-wrap gap-4 animate-fade-slide-up delay-600 opacity-init-0">
                        <Link 
                            to="/villas" 
                            className="rounded-2xl bg-yellow-400 px-8 py-4 text-sm font-bold text-slate-900 shadow-xl shadow-yellow-500/10 transition-all hover:bg-yellow-500 hover:scale-105 hover:shadow-yellow-500/30 active:scale-95 duration-350 ease-out"
                        >
                            Browse Villas
                        </Link>
                        <button className="rounded-2xl bg-white/10 px-8 py-4 text-sm font-bold text-white backdrop-blur-md transition-all hover:bg-white/20 hover:scale-105 active:scale-95 border border-white/20 duration-350 ease-out">
                            Learn More
                        </button>
                    </div>
                </div>
            </div>

            {/* Scroll Down Indicator */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center justify-center pointer-events-none animate-fade-slide-up delay-800 opacity-init-0">
                <span className="text-[10px] uppercase tracking-widest text-slate-400/80 mb-2 font-bold">Scroll to Explore</span>
                <div className="w-[22px] h-[36px] rounded-full border border-slate-400/30 flex justify-center p-1.5">
                    <div className="w-[3px] h-[6px] rounded-full bg-amber-500 animate-scroll" />
                </div>
            </div>
        </section>
    );
}