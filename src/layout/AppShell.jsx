import { Outlet } from "react-router-dom";
import TopBar from "../ui/TopBar.jsx";
import SideNav from "../ui/SideNav.jsx";

export default function AppShell() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <TopBar />

      <div className="mx-auto max-w-[1600px]">
        <div className="flex">
          <aside className="hidden md:block w-64 border-r border-gray-200 min-h-[calc(100vh-56px)] bg-white">
            <SideNav />
          </aside>

          <main className="flex-1 min-h-[calc(100vh-56px)]">
            {/* add inner container so pages are aligned and padded consistently */}
            <div className="px-4 md:px-8 py-6">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}