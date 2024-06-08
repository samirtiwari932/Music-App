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
      url: item.file,
      title: item.title,
      artist: item.owner.name,
      artwork: item.poster || require('../assets/music.jpg'),
      isLiveStream: true,
    };
  });
  await TrackPlayer.add([...lists]);
};

const useAudioController = () => {
  const playbackState = usePlaybackState();
  const {onGoingAudio} = useSelector(getPlayerState);
  const dispatch = useDispatch();

  const isPlayerReady = playbackState.state !== State.None;

  const onAudioPress = async (item: AudioData, data: AudioData[]) => {
    if (!isPlayerReady) {
      // Playing audio for the first time
      console.log('playing for the first time ');

      await updateQueue(data);
      const index = data.findIndex(audio => audio.id === item.id);
      await TrackPlayer.skip(index);
      await TrackPlayer.play();
      dispatch(updateOnGoingAudio(item));
      dispatch(updateOnGoingList(data));
    }

    if (playbackState.state === State.Playing && onGoingAudio?.id === item.id) {
      // Same audio is already playing (handle pause)
      await TrackPlayer.pause();
    }

    if (playbackState.state === State.Paused && onGoingAudio?.id === item.id) {
      // Same audio no need to load (handle resume)
      await TrackPlayer.play();
    }

    if (onGoingAudio?.id !== item.id) {
      console.log('playing new audio ');
      //palying new audio from the same list
      //playing audio from the different list
    }
  };

  return {onAudioPress};
};

export default useAudioController;
