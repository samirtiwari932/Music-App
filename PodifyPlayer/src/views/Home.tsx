import LatestUpload from '@components/LatestUpload';
import OptionsModal from '@components/OptionsModal';
import PlayListModal from '@components/PlayListModal';
import RecommendedAudios from '@components/RecommendedAudios';
import { FC, useState } from 'react';
import { View, StyleSheet, Pressable, Text } from 'react-native';
import MaterialComIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDispatch } from 'react-redux';
import { AudioData } from 'src/@types/audio';
import catchAsyncError from 'src/api/catchError';
import client from 'src/api/client';
import { updateNotification } from 'src/store/notification';
import { Keys, getFromAsyncStorage } from 'src/utilis/asyncStorage';
import colors from 'src/utilis/color';

interface Props { }

const Home: FC<Props> = props => {
    const [showOptions, setShowOptions] = useState(false);
    const [selectedAudio, setSelectedAudio] = useState<AudioData>();

    const dispatch = useDispatch();

    const handleOnFavPress = async () => {
        if (!selectedAudio) return;
        // send request with the audio id that we want to add to fav

        try {
            const token = await getFromAsyncStorage(Keys.Auth_Token);

            const { data } = await client.post(
                `/favorite?audioId=${selectedAudio.id}`,
                null,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },
            );
            console.log(data, "This is the data")
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

    return (
        <View style={styles.container}>
            <LatestUpload
                onAudioPress={item => {
                    console.log(item);
                }}
                onAudioLongPress={handleOnLongPress}
            />
            <RecommendedAudios
                onAudioPress={item => {
                    console.log(item);
                }}
                onAudioLongPress={handleOnLongPress}
            />
            <OptionsModal
                visible={showOptions}
                onRequestClose={() => {
                    setShowOptions(false);
                }}
                options={[
                    { title: 'Add to playlist', icon: 'playlist-music' },
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
            <PlayListModal visible list={[{ title: "PlayList one", visibility: 'private', id: "1" },
            { title: "PlayList two", visibility: 'public', id: "2" }
            ]} />
        </View>
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
