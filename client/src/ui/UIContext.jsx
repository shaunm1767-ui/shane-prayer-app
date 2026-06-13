const playTrack = (track, index) => {
  playlistController.load(playlist, index);
  playlistController.play(index);

  setCurrentTrack(track);
  setIsPlaying(true);
};
const handlePause = () => {
  playlistController.pause();
  setIsPlaying(false);
};