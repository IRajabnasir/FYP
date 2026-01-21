import { Link } from "react-router-dom";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-slate-50 px-6 py-10">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-slate-900">
          Traffic Intelligence Dashboard
        </h1>
        <p className="mt-2 text-slate-600 max-w-2xl">
          Real-time AI-powered monitoring for traffic violations, compliance,
          and intelligent enforcement insights.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {[
          { label: "Vehicles Detected", value: "12,480" },
          { label: "Total Violations", value: "5,632" },
          { label: "Helmet Violations", value: "342" },
          { label: "Seatbelt Violations", value: "419" },
        ].map((item, i) => (
          <div
            key={i}
            className="relative bg-white rounded-2xl p-6 shadow-sm border border-slate-200
            hover:shadow-lg transition"
          >
            <div className="absolute inset-x-0 top-0 h-1 rounded-t-2xl bg-gradient-to-r from-yellow-400 to-amber-500" />
            <p className="text-sm text-slate-500">{item.label}</p>
            <h3 className="mt-2 text-3xl font-bold text-slate-900">
              {item.value}
            </h3>
          </div>
        ))}
      </div>

      {/* Modules */}
      <div className="mb-12">
        <h2 className="text-xl font-semibold text-slate-900 mb-4">
          AI Detection Modules
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: "License Plate Detection",
              desc: "Automatic recognition of vehicle number plates",
              link: "/plate-detection",
            },
            {
              title: "Helmet Detection",
              desc: "AI-based helmet compliance monitoring",
              link: "/helmet-detection",
            },
            {
              title: "Seatbelt Detection",
              desc: "Seatbelt compliance using computer vision",
              link: "/seatbelt-detection",
            },
          ].map((m, i) => (
            <Link
              to={m.link}
              key={i}
              className="group bg-white rounded-2xl p-6 border border-slate-200
              hover:border-amber-400 hover:shadow-xl transition"
            >
              <div
                className="w-10 h-10 mb-4 rounded-xl bg-gradient-to-br
                from-amber-400 to-yellow-500 flex items-center justify-center
                text-white font-bold shadow"
              >
                AI
              </div>

              <h3 className="text-lg font-semibold text-slate-900">
                {m.title}
              </h3>
              <p className="mt-2 text-sm text-slate-600">{m.desc}</p>

              <p className="mt-4 text-sm font-semibold text-amber-600 group-hover:underline">
                Open Module →
              </p>
            </Link>
          ))}
        </div>
      </div>

      {/* System Status */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-900 mb-4">
          System Status
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 text-sm">
          <Status label="Monitoring Service" value="Active" />
          <Status label="AI Detection Engine" value="Running" />
          <Status label="Camera Network" value="Online" />
          <Status label="Last System Update" value="Today" />
        </div>
      </div>
    </div>
  );
}

function Status({ label, value }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-slate-600">{label}</span>
      <span className="font-semibold text-emerald-600">{value}</span>
    </div>
  );
}
