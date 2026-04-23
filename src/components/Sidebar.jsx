import { Home, Explore, Subscriptions, VideoLibrary, History } from '@mui/icons-material';

const SidebarItem = ({ Icon, title, active }) => (
  <div className={`flex items-center gap-5 p-3 rounded-lg cursor-pointer hover:bg-gray-100 ${active && 'bg-gray-100 font-bold'}`}>
    <Icon fontSize="medium" />
    <span className="text-sm">{title}</span>
  </div>
);

const Sidebar = () => (
  <aside className="w-64 p-3 hidden md:block h-[calc(100vh-64px)] sticky top-16 overflow-y-auto">
    <SidebarItem Icon={Home} title="Home" active />
    <SidebarItem Icon={Explore} title="Shorts" />
    <SidebarItem Icon={Subscriptions} title="Subscriptions" />
    <hr className="my-3 border-gray-200" />
    <SidebarItem Icon={VideoLibrary} title="Library" />
    <SidebarItem Icon={History} title="History" />
  </aside>
);