import Navbar from "@/components/common/Navbar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col min-h-screen min-w-full bg-background max-h-screen h-full">
      <Navbar />
      <main className="flex flex-grow h-full w-full overflow-y-auto">
        {children}
      </main>
    </div>
  );
};

export default Layout;
