import { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  IconButton,
  InputBase,
  Paper,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import MusicNoteIcon from "@mui/icons-material/MusicNote";

export default function TopBar() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const qParam = params.get("q") || "";

  const [q, setQ] = useState(qParam);

  useEffect(() => setQ(qParam), [qParam]);

  const onSubmit = (e) => {
    e.preventDefault();
    const next = q.trim();
    navigate(next ? `/?q=${encodeURIComponent(next)}` : "/");
  };

  return (
    <AppBar position="sticky" elevation={0} sx={{ backgroundColor: "white", color: "black", borderBottom: "1px solid #e5e7eb" }}>
      <Toolbar className="gap-2">
        <button
          type="button"
          onClick={() => navigate("/")}
          className="flex items-center gap-2"
        >
          <MusicNoteIcon />
          <Typography variant="h6" className="select-none">
            SongTube
          </Typography>
        </button>

        <div className="flex-1" />

        <form onSubmit={onSubmit} className="w-full max-w-[640px]">
          <Paper
            variant="outlined"
            className="flex items-center overflow-hidden"
            sx={{ borderRadius: 9999 }}
          >
            <InputBase
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search"
              className="px-4 py-2 flex-1"
              inputProps={{ "aria-label": "search songs" }}
            />
            <IconButton type="submit" aria-label="search">
              <SearchIcon />
            </IconButton>
          </Paper>
        </form>

        <div className="flex-1" />
      </Toolbar>
    </AppBar>
  );
}