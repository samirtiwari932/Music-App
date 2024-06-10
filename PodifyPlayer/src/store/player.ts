import {PayloadAction, createSelector, createSlice} from '@reduxjs/toolkit';
import {RootState} from '.';
import {AudioData} from 'src/@types/audio';

interface Player {
  onGoingAudio: AudioData | null;
  onGoingList: AudioData[];
}

const initialState: Player = {
  onGoingAudio: null,
  onGoingList: [],
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
      console.log(playerState.onGoingList, 'this is the checker function');
    },
  },
});

// export const getPlayerState = createSelector(
//   (state: RootState) => state.player,
//   playerState => playerState,
// );

export const getPlayerState = (state: RootState) => state.player;
export const {updateOnGoingAudio, updateOnGoingList} = slice.actions;

export default slice.reducer;
