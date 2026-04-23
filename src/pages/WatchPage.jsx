import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Alert,
  CircularProgress,
  Paper,
  Typography,
  Divider,
  List,
  ListItemButton,
  ListItemText,
  Chip,
  Avatar,
  Box
} from "@mui/material";
import { getSong, listSongs } from "../lib/songApi.js";

function getYouTubeId(url) {
  if (!url) return null;
  try {
    const u = new URL(url);
    if (u.hostname.includes("youtu.be")) return u.pathname.replace("/", "") || null;
    if (u.hostname.includes("youtube.com")) return u.searchParams.get("v");
    return null;
  } catch {
    return null;
  }
}

export default function WatchPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [song, setSong] = useState(null);
  const [upNext, setUpNext] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;
    async function run() {
      setLoading(true);
      setError("");
      try {
        const [songData, allSongs] = await Promise.all([getSong(id), listSongs()]);
        if (cancelled) return;
        setSong(songData);
        const filtered = (Array.isArray(allSongs) ? allSongs : [])
          .filter((s) => String(s.id) !== String(id))
          .slice(0, 10);
        setUpNext(filtered);
      } catch (e) {
        if (!cancelled) setError(e.message || String(e));
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    run();
    return () => (cancelled = true);
  }, [id]);

  const ytId = useMemo(() => getYouTubeId(song?.url), [song?.url]);

  if (loading) return (
    <div className="h-[80vh] flex flex-col items-center justify-center gap-4">
      <CircularProgress size={40} thickness={4} />
      <Typography variant="body2" className="text-gray-500 animate-pulse">Loading Song...</Typography>
    </div>
  );

  if (error) return <div className="p-10"><Alert severity="error" variant="filled">{error}</Alert></div>;
  if (!song) return null;

  return (
    <div className="bg-gray-50 min-h-screen w-full">
      <div className="flex flex-col lg:flex-row max-w-[1600px] mx-auto gap-6 p-4 lg:p-6">
        
        {/* LEFT COLUMN (Player & Details) */}
        <div className="flex-1 min-w-0">
          <Paper elevation={1} className="rounded-xl overflow-hidden">
            <div className="w-full aspect-video bg-black">
              {ytId ? (
                <iframe
                  className="w-full h-full"
                  src={`https://www.youtube.com/embed/${ytId}`}
                  title={song.title}
                  frameBorder="0"
                  allowFullScreen
                />
              ) : (
                <div className="h-full flex items-center justify-center text-white">Audio Player Here</div>
              )}
            </div>
          </Paper>

          {/* Title & Artist Info */}
          <div className="mt-4">
            <h1 className="text-2xl font-extrabold text-gray-900 leading-tight">{song.title}</h1>
            
            <div className="flex items-center justify-between mt-4 flex-wrap gap-4">
              <div className="flex items-center gap-3">
                <Avatar sx={{ width: 48, height: 48, bgcolor: 'primary.main' }}>{song.artist?.[0]}</Avatar>
                <div>
                  <p className="font-semibold text-base leading-none">{song.artist}</p>
                  <p className="text-xs text-gray-500">1.2M Subscribers</p>
                </div>
                <button className="ml-2 bg-black text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-gray-800 transition">
                  Subscribe
                </button>
              </div>
            </div>

            {/* Description Box */}
            <Paper className="mt-4 p-4 bg-white/70 rounded-xl" elevation={0}>
              <div className="flex gap-3 text-sm font-semibold mb-2 text-gray-700">
                <span>2.4M views</span>
                <span>Oct 24, 2026</span>
              </div>
              <p className="text-sm text-gray-800 whitespace-pre-wrap">
                Album: <span className="text-blue-600"> {song.album}</span> <br />
                Genre: {song.genre} <br />
                Source: {song.url}
              </p>
            </Paper>
          </div>
        </div>

        {/* RIGHT COLUMN (Up Next) */}
        <aside className="w-full lg:w-[400px] flex-shrink-0">
          <div className="flex gap-2 mb-4 overflow-x-auto pb-1">
            {['All', 'Related', 'Live'].map(tag => (
              <Chip key={tag} label={tag} size="small" className="cursor-pointer" />
            ))}
          </div>

          <div className="flex flex-col gap-3">
            {upNext.map((s) => (
              <Paper
                key={s.id}
                onClick={() => navigate(`/watch/${s.id}`)}
                className="flex gap-3 cursor-pointer group p-3 hover:bg-gray-100"
                elevation={0}
                component="div"
                square
              >
                <div className="w-40 h-24 flex-shrink-0 bg-zinc-800 rounded-lg flex items-center justify-center relative overflow-hidden">
                  <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">SongTube</span>
                </div>
                
                <div className="flex flex-col min-w-0">
                  <h3 className="text-sm font-semibold line-clamp-2 leading-tight group-hover:text-blue-600">
                    {s.title}
                  </h3>
                  <p className="text-xs text-gray-600 mt-1">{s.artist}</p>
                  <p className="text-xs text-gray-500">140K views • 1 year ago</p>
                </div>
              </Paper>
            ))}
          </div>
        </aside>

      </div>
    </div>
  );
}
