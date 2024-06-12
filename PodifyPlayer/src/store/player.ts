import {PayloadAction, createSelector, createSlice} from '@reduxjs/toolkit';
import {RootState} from '.';
import {AudioData} from 'src/@types/audio';

interface Player {
  onGoingAudio: AudioData | null;
  onGoingList: AudioData[];
  playbackRate: number;
}

const initialState: Player = {
  onGoingAudio: null,
  onGoingList: [],
  playbackRate: 1,
};
const slice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    updateOnGoingAudio(
      playerState,
      {payload}: PayloadAction<AudioData | null>,
    ) {
      playerState.onGoingAudio = payload;
    },
    updateOnGoingList(playerState, {payload}: PayloadAction<AudioData[]>) {
      playerState.onGoingList = payload;
      // console.log(playerState.onGoingList, 'this is the checker function');
    },
    updatePlayBackRate(playerState, {payload}: PayloadAction<number>) {
      playerState.playbackRate = payload;
      //   console.log(playerState.onGoingList, 'this is the checker function');
      //
    },
  },
});

// export const getPlayerState = createSelector(
//   (state: RootState) => state.player,
//   playerState => playerState,
// );

export const getPlayerState = (state: RootState) => state.player;
export const {updateOnGoingAudio, updateOnGoingList, updatePlayBackRate} =
  slice.actions;

export default slice.reducer;
