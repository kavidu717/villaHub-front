import Header from "../Common/Header";
import { Outlet } from "react-router-dom";
import Footer from "../Common/Footer";

export default function UserLayout() {
    return (
        <div className="min-h-screen bg-slate-100 text-slate-900">
         <Header />
         <main className="mt-20">
        <Outlet />
      </main>
      <Footer />

        </div>
    )
}
