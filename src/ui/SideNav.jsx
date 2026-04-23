import HomeIcon from "@mui/icons-material/Home";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import LibraryMusicIcon from "@mui/icons-material/LibraryMusic";
import { List, ListItemButton, ListItemIcon, ListItemText, Divider } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function SideNav() {
  const navigate = useNavigate();

  return (
    <div className="p-2">
      <List>
        <ListItemButton onClick={() => navigate("/")}>
          <ListItemIcon><HomeIcon /></ListItemIcon>
          <ListItemText primary="Home" />
        </ListItemButton>

        <ListItemButton onClick={() => navigate("/?q=pop")}>
          <ListItemIcon><WhatshotIcon /></ListItemIcon>
          <ListItemText primary="Trending" />
        </ListItemButton>

        <Divider className="my-2" />

        <ListItemButton onClick={() => navigate("/?q=rock")}>
          <ListItemIcon><LibraryMusicIcon /></ListItemIcon>
          <ListItemText primary="Library" />
        </ListItemButton>
      </List>
    </div>
  );
}