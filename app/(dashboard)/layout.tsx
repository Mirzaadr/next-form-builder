import Link from "next/link";
import Navbar from "./_components/Navbar";
import Sidebar from "./_components/Sidebar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col min-h-screen min-w-full bg-background max-h-screen">
      <Navbar />
      <main className="flex flex-grow h-full w-full overflow-y-auto">
        {children}
      </main>
    </div>
  );
};

export default Layout;
