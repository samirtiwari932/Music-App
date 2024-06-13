import AppView from '@components/AppView';

import LatestUpload from '@components/LatestUpload';
import OptionsModal from '@components/OptionsModal';
import PlayListModal from '@components/PlayListModal';
import RecommendedAudios from '@components/RecommendedAudios';
import PlayListForm, { PlayListInfo } from '@components/form/PlayListForm';
import { FC, useEffect, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text } from 'react-native';
import TrackPlayer from 'react-native-track-player';
import MaterialComIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDispatch } from 'react-redux';
import { AudioData, Playlist } from 'src/@types/audio';
import catchAsyncError from 'src/api/catchError';
import { getClient } from 'src/api/client';
import { useFetchPlayList } from 'src/hooks/query';
import useAudioController from 'src/hooks/useAudioController';
import { updateNotification } from 'src/store/notification';
import colors from 'src/utilis/color';

interface Props { }

const Home: FC<Props> = props => {
    const { data } = useFetchPlayList()
    const [showOptions, setShowOptions] = useState(false);
    const [selectedAudio, setSelectedAudio] = useState<AudioData>();
    const [showPlaylistModal, setShowPlaylistModal] = useState(false);
    const [showPlaylistForm, setShowPlaylistForm] = useState(false);


    const dispatch = useDispatch();

    const { onAudioPress } = useAudioController();


    const handleOnFavPress = async () => {
        if (!selectedAudio) return;
        // send request with the audio id that we want to add to fav

        try {
            const client = await getClient()

            const { data } = await client.post(
                `/favorite?audioId=${selectedAudio.id}`,
            );
            // console.log(data, "This is the data")
        } catch (error) {
            const errorMessage = catchAsyncError(error);
            dispatch(updateNotification({ message: errorMessage, type: 'error' }));
        }

        setSelectedAudio(undefined);
        setShowOptions(false);
    };

    const handleOnLongPress = (audio: AudioData) => {
        setSelectedAudio(audio);
        setShowOptions(true);
    };

    const handleOnAddToPlaylist = () => {
        setShowOptions(false);
        setShowPlaylistModal(true)
    }

    const handlePlaylistSubmit = async (value: PlayListInfo) => {
        if (!value.title.trim()) return;

        try {
            const client = await getClient()
            const { data } = await client.post(
                '/playlist/create',
                {
                    resId: selectedAudio?.id,
                    title: value.title,
                    visibility: value.private ? 'private' : 'public',
                },

            );
            // console.log(data);
        } catch (error) {
            const errorMessage = catchAsyncError(error);
            console.log(errorMessage);
        }
    };



    const updatePlayList = async (item: Playlist) => {
        try {
            const client = await getClient()
            const { data } = await client.patch('/playlist',
                {
                    id: item.id,
                    item: selectedAudio?.id,
                    title: item.title,
                    visibility: item.visibility
                },

            )
            setSelectedAudio(undefined)
            setShowPlaylistModal(false)
            dispatch(updateNotification({ message: "New audio added.", type: "success" }))
            // console.log(data)
        } catch (error) {
            const errorMessage = catchAsyncError(error);
            console.log(errorMessage);
        }

    }




    return (
        <AppView>
            <ScrollView contentContainerStyle={styles.container}>
                <LatestUpload
                    onAudioPress={onAudioPress}
                    onAudioLongPress={handleOnLongPress}
                />
                <RecommendedAudios
                    onAudioPress={onAudioPress}
                    onAudioLongPress={handleOnLongPress}
                />
                <OptionsModal
                    visible={showOptions}
                    onRequestClose={() => {
                        setShowOptions(false);
                    }}
                    options={[
                        { title: 'Add to playlist', icon: 'playlist-music', onPress: handleOnAddToPlaylist },
                        {
                            title: 'Add to favorite',
                            icon: 'cards-heart',
                            onPress: handleOnFavPress,
                        },
                    ]}
                    renderItem={item => {
                        return (
                            <Pressable onPress={item.onPress} style={styles.optionContainer}>
                                <MaterialComIcon
                                    size={24}
                                    color={colors.PRIMARY}
                                    name={item.icon}
                                />
                                <Text style={styles.optionLabel}>{item.title}</Text>
                            </Pressable>
                        );
                    }}
                />
                <PlayListModal visible={showPlaylistModal} onRequestClose={() => setShowPlaylistModal(false)} list={data || []} onCreateNewPress={() => {
                    setShowPlaylistModal(false)
                    setShowPlaylistForm(true)
                }}
                    onPlayListPress={updatePlayList} />
                <PlayListForm visible={showPlaylistForm} onRequestClose={() => setShowPlaylistForm(false)}
                    onSubmit={handlePlaylistSubmit} />
            </ScrollView>
        </AppView>

    );
};

const styles = StyleSheet.create({
    container: {
        padding: 10,
    },
    optionContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
    },
    optionLabel: { color: colors.PRIMARY, fontSize: 16, marginLeft: 5 },
});

export default Home;



