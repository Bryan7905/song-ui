const VideoCard = () => (
  <div className="flex flex-col gap-3 cursor-pointer">
    <img src="https://picsum.photos/seed/picsum/300/170" alt="thumbnail" className="rounded-xl w-full" />
    <div className="flex gap-3">
      <Avatar sx={{ width: 36, height: 36 }} />
      <div className="flex flex-col">
        <h3 className="font-semibold text-sm leading-tight line-clamp-2">Building a YouTube UI with React and Tailwind</h3>
        <p className="text-gray-600 text-xs mt-1">Gemini AI • 1.2M views • 2 hours ago</p>
      </div>
    </div>
  </div>
);

const VideoGrid = () => (
  <main className="flex-1 bg-white p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-8">
    {[...Array(12)].map((_, i) => <VideoCard key={i} />)}
  </main>
);