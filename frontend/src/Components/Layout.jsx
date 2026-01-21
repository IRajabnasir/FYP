import Navbar from "./Navbar";

export default function Layout({ children }) { return ( <> <Navbar />

  {/* Page Content Wrapper */}
  <main className="max-w-7xl mx-auto px-6 py-10">
    {children}
  </main>
</>
); } 