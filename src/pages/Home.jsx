import { useEffect, useState } from "react";
import { listSongs } from "../lib/songApi";
import { Card, CardContent, Typography, CardMedia, Grid } from "@mui/material";

export default function Home() {
  const [songs, setSongs] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    listSongs()
      .then(setSongs)
      .catch((e) => setError(e.message || String(e)));
  }, []);

  if (error) return <div className="p-4 text-red-600">{error}</div>;

  return (
    <div className="p-4">
      <Grid container spacing={2}>
        {songs.map((s) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={s.id}>
            <Card className="cursor-pointer">
              {s.thumbnailUrl ? (
                <CardMedia component="img" height="140" image={s.thumbnailUrl} />
              ) : (
                <div className="h-[140px] bg-gray-200" />
              )}
              <CardContent>
                <Typography variant="subtitle1" noWrap>
                  {s.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" noWrap>
                  {s.artist ?? "Unknown artist"}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}