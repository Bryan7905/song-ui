import { useState } from "react";
import { searchSongs } from "../lib/songApi";
import { TextField } from "@mui/material";

export default function SongSearch({ onResults }) {
  const [q, setQ] = useState("");

  async function onChange(e) {
    const next = e.target.value;
    setQ(next);

    if (!next.trim()) {
      onResults(null); // let parent decide (e.g., show home list)
      return;
    }

    const results = await searchSongs(next.trim());
    onResults(results);
  }

  return (
    <TextField
      value={q}
      onChange={onChange}
      placeholder="Search songs..."
      size="small"
      className="w-full"
    />
  );
}