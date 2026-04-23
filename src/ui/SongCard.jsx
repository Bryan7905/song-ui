import { Card, CardActionArea, CardContent, Typography, CardMedia, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

function initials(title = "") {
  return title
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase())
    .join("");
}

export default function SongCard({ song }) {
  const navigate = useNavigate();
  const thumb = song.thumbnail || song.thumb || song.image || null;

  return (
    <Card className="shadow-sm hover:shadow-md transition-shadow">
      <CardActionArea onClick={() => navigate(`/watch/${song.id}`)}>
        {thumb ? (
          <CardMedia
            component="img"
            image={thumb}
            alt={song.title}
            sx={{ height: 140, objectFit: "cover" }}
          />
        ) : (
          <Box
            sx={{
              height: 140,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "linear-gradient(180deg,#f3f4f6,#e5e7eb)",
            }}
          >
            <Box
              sx={{
                width: 64,
                height: 64,
                borderRadius: "50%",
                bgcolor: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 700,
                color: "text.secondary",
              }}
            >
              {initials(song.title)}
            </Box>
          </Box>
        )}

        <CardContent className="px-4 py-3">
          <Typography variant="subtitle1" noWrap title={song.title} className="font-semibold">
            {song.title}
          </Typography>
          <Typography variant="body2" color="text.secondary" noWrap className="mt-1">
            {song.artist || "Unknown artist"}
          </Typography>
          <Typography variant="caption" color="text.secondary" noWrap className="block mt-1">
            {song.album || "Unknown album"} • {song.genre || "Unknown genre"}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
