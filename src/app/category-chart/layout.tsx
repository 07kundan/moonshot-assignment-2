import { SideBar } from "@/components";
import Navbar from "@/components/Navbar";

export default function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <section className=" w-screen h-screen flex">
      <aside>
        <SideBar className="w-[20vw] h-screen" />
      </aside>
      <section className="w-full ">
        <Navbar className="w-full px-24 py-3 justify-between flex" />
        <section className="w-full pt-3">{children}</section>
      </section>
    </section>
  );
}
