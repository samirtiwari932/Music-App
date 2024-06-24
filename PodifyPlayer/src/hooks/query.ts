import {HistoryType} from './../../../server/src/@types/audio';
import {PlayListInfo} from '@components/form/PlayListForm';
import {useQueries, useQuery} from 'react-query';
import {useDispatch} from 'react-redux';
import {AudioData, Playlist} from 'src/@types/audio';
import catchAsyncError from 'src/api/catchError';
import {getClient} from 'src/api/client';
import {updateNotification} from 'src/store/notification';
import {Keys, getFromAsyncStorage} from 'src/utilis/asyncStorage';

const fetchLatest = async (): Promise<AudioData[]> => {
  const client = await getClient();
  const {data} = await client('/audio/latest');
  return data.audios;
};

export const useFetchLatestAudios = () => {
  const dispatch = useDispatch();
  return useQuery(['latest-uploads'], {
    queryFn: fetchLatest,
    onError(err) {
      const errorMessage = catchAsyncError(err);
      dispatch(updateNotification({message: errorMessage, type: 'error'}));
    },
  });
};
const fetchRecommended = async (): Promise<AudioData[]> => {
  const client = await getClient();

  const {data} = await client('/profile/recommended');
  return data.audios;
};
export const useFetchRecommendedtAudios = () => {
  const dispatch = useDispatch();
  return useQuery(['recommended'], {
    queryFn: fetchRecommended,
    onError(err) {
      const errorMessage = catchAsyncError(err);
      dispatch(updateNotification({message: errorMessage, type: 'error'}));
    },
  });
};
const fetchPlayList = async (): Promise<Playlist[]> => {
  const client = await getClient();
  const token = await getFromAsyncStorage(Keys.Auth_Token);
  const {data} = await client('/playlist/by-profile', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data.playlist;
};
export const useFetchPlayList = () => {
  const dispatch = useDispatch();
  return useQuery(['playlist'], {
    queryFn: fetchPlayList,
    onError(err) {
      const errorMessage = catchAsyncError(err);
      dispatch(updateNotification({message: errorMessage, type: 'error'}));
    },
  });
};
const fetchUploadsByProfile = async (): Promise<AudioData[]> => {
  const client = await getClient();

  const {data} = await client('/profile/uploads');
  return data.audios;
};
export const useFetchUploadsByProfile = () => {
  const dispatch = useDispatch();
  return useQuery(['uploads-by-profile'], {
    queryFn: fetchUploadsByProfile,
    onError(err) {
      const errorMessage = catchAsyncError(err);
      dispatch(updateNotification({message: errorMessage, type: 'error'}));
    },
  });
};
const fetchFavorites = async (): Promise<AudioData[]> => {
  const client = await getClient();

  const {data} = await client('/favorite');
  return data.audios;
};
export const useFetchFavorite = () => {
  const dispatch = useDispatch();
  return useQuery(['favorite'], {
    queryFn: fetchFavorites,
    onError(err) {
      const errorMessage = catchAsyncError(err);
      dispatch(updateNotification({message: errorMessage, type: 'error'}));
    },
  });
};
const fetchHistories = async (): Promise<HistoryType[]> => {
  const client = await getClient();
  const {data} = await client('/history');
  return data.histories;
};
export const useFetchHistories = () => {
  const dispatch = useDispatch();
  return useQuery(['histories'], {
    queryFn: fetchHistories,
    onError(err) {
      const errorMessage = catchAsyncError(err);
      dispatch(updateNotification({message: errorMessage, type: 'error'}));
    },
  });
};
const fetchRecentlyPlayed = async (): Promise<AudioData[]> => {
  const client = await getClient();
  const {data} = await client('/history/recently-played');
  return data.audios;
};
export const useFetchRecentlyPlayed = () => {
  const dispatch = useDispatch();
  return useQuery(['recently-played'], {
    queryFn: fetchRecentlyPlayed,
    onError(err) {
      const errorMessage = catchAsyncError(err);
      dispatch(updateNotification({message: errorMessage, type: 'error'}));
    },
  });
};
