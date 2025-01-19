import Link from "next/link";

const Sidebar = () => {
  return (
    <div className="hidden border-r bg-muted/40 md:block md:p-2 lg:p-4 sticky h-screen overflow-auto">
      <div className="py-2 lg:px-2 lg:items-center justify-center flex w-full border-b">
        <Link href={"/"} className="flex items-center justify-center lg:justify-start gap-2">
          <p className="hidden lg:block text-2xl font-bold">
            Logo
          </p>
          {/* <span className="hidden lg:block">SchooLama</span> */}
        </Link>
      </div>
    </div>
  )
}

export default Sidebar;