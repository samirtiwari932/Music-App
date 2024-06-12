import deepEqual from 'deep-equal';
import TrackPlayer, {
  Track,
  usePlaybackState,
  State,
} from 'react-native-track-player';
import {useDispatch, useSelector} from 'react-redux';
import {AudioData} from 'src/@types/audio';
import {
  getPlayerState,
  updateOnGoingAudio,
  updateOnGoingList,
} from 'src/store/player';

const updateQueue = async (data: AudioData[]) => {
  const lists: Track[] = data.map(item => {
    return {
      id: item.id,
      title: item.title,
      url: item.file,
      artwork: item.poster || require('../assets/music.jpg'),
      artist: item.owner.name,
      genre: item.category,
      isLiveStream: true,
    };
  });
  await TrackPlayer.add([...lists]);
};

const useAudioController = () => {
  const {state: playbackState} = usePlaybackState() as {state?: State};

  const {onGoingAudio, onGoingList} = useSelector(getPlayerState);
  const dispatch = useDispatch();

  const isPalyerReady = playbackState !== State.None;
  const isPlaying = playbackState === State.Playing;
  const isPaused = playbackState === State.Paused;
  const isBuffering =
    playbackState === State.Buffering || playbackState === State.Loading;
  const onAudioPress = async (item: AudioData, data: AudioData[]) => {
    if (!isPalyerReady) {
      // Playing audio for the first time.
      await updateQueue(data);
      const index = data.findIndex(audio => audio.id === item.id);
      await TrackPlayer.skip(index);
      await TrackPlayer.play();
      dispatch(updateOnGoingAudio(item));
      return dispatch(updateOnGoingList(data));
    }

    if (playbackState === State.Playing && onGoingAudio?.id === item.id) {
      // same audio is already playing (handle pause)
      return await TrackPlayer.pause();
    }

    if (playbackState === State.Paused && onGoingAudio?.id === item.id) {
      // same audio no need to load handle resume
      return await TrackPlayer.play();
    }

    if (onGoingAudio?.id !== item.id) {
      const fromSameList = deepEqual(onGoingList, data);

      await TrackPlayer.pause();
      const index = data.findIndex(audio => audio.id === item.id);

      if (!fromSameList) {
        // playing new audio from different list
        await TrackPlayer.reset();
        await updateQueue(data);
        dispatch(updateOnGoingList(data));
      }

      await TrackPlayer.skip(index);
      await TrackPlayer.play();
      dispatch(updateOnGoingAudio(item));
    }
  };
  const togglePlayPause = async () => {
    if (isPlaying) {
      await TrackPlayer.pause();
    } else {
      await TrackPlayer.play();
    }
  };

  const seekTo = async (position: number) => {
    await TrackPlayer.seekTo(position);
  };

  const skipTo = async (sec: number) => {
    const position = await TrackPlayer.getPosition();
    const newPosition = position + sec;
    await TrackPlayer.seekTo(newPosition);
  };

  const onNextPress = async () => {
    const currentList = await TrackPlayer.getQueue(); //give us the current list
    const currentIndex = await TrackPlayer.getActiveTrackIndex();
    if (currentIndex === null || currentIndex === undefined) return;
    const nextIndex = currentIndex + 1;
    const nextAudio = currentList[nextIndex];
    if (nextAudio) {
      await TrackPlayer.skipToNext();
      dispatch(updateOnGoingAudio(onGoingList[nextIndex]));
    }
  };
  const onPreviousPress = async () => {
    const currentList = await TrackPlayer.getQueue(); // Get the current list
    const currentIndex = await TrackPlayer.getActiveTrackIndex();
    if (currentIndex === null || currentIndex === undefined) return;
    const previousIndex = currentIndex - 1;
    const previousAudio = currentList[previousIndex];
    if (previousAudio) {
      await TrackPlayer.skipToPrevious();
      dispatch(updateOnGoingAudio(onGoingList[previousIndex]));
    }
  };

  const setPlayBackRate = async (rate: number) => {
    await TrackPlayer.setRate(rate);
  };

  return {
    onAudioPress,
    seekTo,
    skipTo,
    onNextPress,
    setPlayBackRate,
    onPreviousPress,
    isPalyerReady,
    isPlaying,
    isBuffering,
    togglePlayPause,
  };
};

export default useAudioController;
