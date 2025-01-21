import Navbar from "@/components/common/Navbar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col min-h-screen min-w-full bg-background max-h-screen h-screen">
      <Navbar />
      <main className="flex flex-grow w-full overflow-y-auto py-4 h-fit">
        {children}
      </main>
    </div>
  );
};

export default Layout;
