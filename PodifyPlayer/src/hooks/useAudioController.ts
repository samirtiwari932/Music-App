import TrackPlayer, {
  Track,
  usePlaybackState,
  State,
} from 'react-native-track-player';
import {useDispatch, useSelector} from 'react-redux';
import {AudioData} from 'src/@types/audio';
import {getPlayerState, updateOnGoingAudio} from 'src/store/player';
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
  const {state: playbackState} = usePlaybackState() as {state?: State};
  const {onGoingAudio} = useSelector(getPlayerState);
  const dispatch = useDispatch();

  const isPlayerReady = playbackState !== State.None;

  const onAudioPress = async (item: AudioData, data: AudioData[]) => {
    if (!isPlayerReady) {
      //playing audio for the first time
      await updateQueue(data);
      const index = data.findIndex(audio => audio.id === item.id);
      await TrackPlayer.skip(index);
      await TrackPlayer.play();
      dispatch(updateOnGoingAudio(item));
    }
    if (playbackState === State.Playing || onGoingAudio?.id === item.id) {
      //same audio is already (handle pause )
      await TrackPlayer.pause();
    }
    if (playbackState === State.Paused && onGoingAudio?.id === item.id) {
      //same audio no need to load handle resume
      await TrackPlayer.play();
    }
  };

  return {onAudioPress};
};

export default useAudioController;
