import { AppBar, Toolbar, IconButton, InputBase, Avatar } from '@mui/material';
import { Menu, Search, VideoCall, Notifications, Mic } from '@mui/icons-material';

const Navbar = () => (
  <AppBar position="sticky" sx={{ bgcolor: 'white', color: 'black', boxShadow: 'none' }}>
    <Toolbar className="flex justify-between items-center px-4">
      <div className="flex items-center gap-4">
        <IconButton><Menu /></IconButton>
        <img src="https://upload.wikimedia.org/wikipedia/commons/b/b8/YouTube_Logo_2017.svg" 
             alt="logo" className="h-5" />
      </div>

      <div className="hidden md:flex items-center flex-grow max-w-[720px] ml-10">
        <div className="flex w-full border border-gray-300 rounded-l-full px-4 py-1 items-center">
          <InputBase placeholder="Search" className="w-full" />
        </div>
        <button className="bg-gray-100 border border-l-0 border-gray-300 rounded-r-full px-5 py-2 hover:bg-gray-200">
          <Search />
        </button>
        <IconButton className="ml-2 bg-gray-50"><Mic /></IconButton>
      </div>

      <div className="flex items-center gap-2">
        <IconButton className="hidden sm:flex"><VideoCall /></IconButton>
        <IconButton className="hidden sm:flex"><Notifications /></IconButton>
        <Avatar className="ml-2 cursor-pointer">G</Avatar>
      </div>
    </Toolbar>
  </AppBar>
);