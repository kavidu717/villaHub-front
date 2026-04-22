import { HiOutlineUserGroup, HiOutlineHome, HiOutlineCurrencyDollar } from "react-icons/hi";

export default function AdminDashboard() {
  const stats = [
    { label: "Total Users", value: "1,250", icon: <HiOutlineUserGroup />, color: "bg-blue-500" },
    { label: "Total Villas", value: "48", icon: <HiOutlineHome />, color: "bg-teal-500" },
    { label: "Total Revenue", value: "$12,400", icon: <HiOutlineCurrencyDollar />, color: "bg-primary" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {stats.map((stat, i) => (
        <div key={i} className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-200/50 flex items-center space-x-6">
          <div className={`${stat.color} p-4 rounded-2xl text-white text-3xl`}>
            {stat.icon}
          </div>
          <div>
            <p className="text-xs font-bold uppercase text-slate-400 tracking-widest">{stat.label}</p>
            <p className="text-3xl font-black text-slate-900 mt-1">{stat.value}</p>
          </div>
        </div>
      ))}
    </div>
  );
}