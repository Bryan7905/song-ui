import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Grid, Alert, CircularProgress, Typography, Box } from "@mui/material";
import SongCard from "../ui/SongCard.jsx";
import { listSongs, searchSongs } from "../lib/songApi.js";

export default function HomePage() {
  const [params] = useSearchParams();
  const q = (params.get("q") || "").trim();

  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;
    const run = async () => {
      setLoading(true);
      try {
        const data = q ? await searchSongs(q) : await listSongs();
        if (!cancelled) setSongs(Array.isArray(data) ? data : []);
      } catch (e) {
        if (!cancelled) setError(e.message || String(e));
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    run();
    return () => { cancelled = true; };
  }, [q]);

  if (loading) return (
    <div className="flex h-[50vh] w-full items-center justify-center">
      <CircularProgress />
    </div>
  );

  return (
    <main className="flex-1 bg-transparent min-h-screen">
      {/* Header */}
      <Box className="flex items-center justify-between mb-6 gap-4">
        <Typography variant="h5" className="!font-bold !text-gray-800">
          {q ? `Search results for "${q}"` : "Recommended"}
        </Typography>
        {/* small hint / count */}
        <Typography variant="body2" color="textSecondary" className="hidden sm:block">
          {songs.length} results
        </Typography>
      </Box>

      {error && <Alert severity="error" className="mb-4">{error}</Alert>}

      {/* Grid: use Tailwind utilities for spacing and responsive layout */}
      <div className="w-full">
        <Grid container spacing={3}>
          {songs.map((song) => (
            <Grid item key={song.id} xs={12} sm={6} md={4} lg={3}>
              <div className="transform hover:-translate-y-1 transition duration-200">
                <SongCard song={song} />
              </div>
            </Grid>
          ))}
        </Grid>
      </div>

      {songs.length === 0 && !loading && (
        <div className="text-center py-20 text-gray-500">
          No songs found. Try a different search!
        </div>
      )}
    </main>
  );
}