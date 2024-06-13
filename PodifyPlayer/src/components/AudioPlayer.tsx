import { View, Text, StyleSheet, Image, Pressable } from 'react-native';

import React, { useState } from 'react';
import AppModal from '@ui/AppModal';
import useAudioController from 'src/hooks/useAudioController';
import { useDispatch, useSelector } from 'react-redux';
import { getPlayerState, updatePlayBackRate } from 'src/store/player';
import colors from 'src/utilis/color';
import AppLink from '@ui/AppLink';
import { useProgress } from 'react-native-track-player';
import formatDuration from 'format-duration';
import Slider from '@react-native-community/slider';
import AntDesign from 'react-native-vector-icons/AntDesign';
import PlayPauseBtn from '@ui/PlayPauseBtn';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import PlayerController from '@ui/PlayerController';
import Loader from '@ui/Loader';
import PlayBackRateSelector from '@ui/PlayBackRateSelector';
import AudioInfoContainer from './AudioInfoContainer';
import MaterialComIcon from 'react-native-vector-icons/MaterialCommunityIcons'

interface Props {
    visible: boolean,
    onRequestClose: () => void
    onListOptionPress?(): void
}

const formattedDuration = (duration = 0) => {
    return formatDuration(duration, {
        leading: true,
    });
}

const AudioPlayer = ({ visible, onRequestClose, onListOptionPress }: Props) => {

    //useState showAudioInfo with default state false
    const [showAudioInfo, setShowAudioInfo] = useState(false)

    const { onGoingAudio, playbackRate } = useSelector(getPlayerState);

    const dispatch = useDispatch()

    const { onPreviousPress, isPlaying, onNextPress, isBuffering, seekTo, skipTo, togglePlayPause, setPlayBackRate } = useAudioController();

    const poster = onGoingAudio?.poster;
    const source = poster ? { uri: poster } : require('../assets/music.jpg');

    const { duration, position } = useProgress();

    const updateSeek = async (value: number) => {
        await seekTo(value);
    }

    const handleSkipTo = async (skipType: "forward" | "reverse") => {
        if (skipType === "forward") {
            await skipTo(10);
        }
        if (skipType === "reverse") {
            await skipTo(-10);
        }
    }

    const handleOnNextPress = async () => {
        await onNextPress();
    }

    const handleOnPrevPress = async () => {
        await onPreviousPress();
    }

    //function onPlayBackPress 
    const onPlayBackPress = async (rate: number) => {
        await setPlayBackRate(rate);
        dispatch(updatePlayBackRate(rate))
    }

    if (showAudioInfo) return <AppModal animation visible={visible} onRequestClose={onRequestClose}>
        <View style={styles.container}>
            <AudioInfoContainer visible={showAudioInfo} closeHandler={setShowAudioInfo} />

        </View>
    </AppModal>

    return (
        <AppModal animation visible={visible} onRequestClose={onRequestClose}>
            <View style={styles.container}>
                <Pressable
                    onPress={() => setShowAudioInfo(true)}
                    style={styles.infoBtn}>
                    <AntDesign name='infocirlceo' size={24} color={colors.CONTRAST} />
                </Pressable>
                <Image source={source} style={styles.poster} />
                <View style={styles.contentContainer}>
                    <Text style={styles.title}>{onGoingAudio?.title}</Text>
                    <AppLink title={onGoingAudio?.owner.name || ""} onPress={() => { }} />

                    <View style={styles.durationContainer}>
                        <Text style={styles.duration}>{formattedDuration(position * 1000)}</Text>
                        <Text style={styles.duration}>{formattedDuration(duration * 1000)}</Text>
                    </View>
                    <Slider
                        minimumValue={0}
                        maximumValue={duration}
                        minimumTrackTintColor={colors.CONTRAST}
                        maximumTrackTintColor={colors.INACTIVE_CONTRAST}
                        value={position}
                        onSlidingComplete={updateSeek}
                    />
                    <View style={styles.controles}>
                        <PlayerController onPress={handleOnPrevPress} ignoreContainer>
                            <AntDesign name='stepbackward'
                                size={24}
                                color={colors.CONTRAST}
                            />
                        </PlayerController>
                        {/* skip time left  */}
                        <PlayerController onPress={() => handleSkipTo("reverse")} ignoreContainer >
                            <FontAwesome name='rotate-left'
                                size={18}
                                color={colors.CONTRAST}
                            />
                            <Text style={styles.skipText}>-10s</Text>
                        </PlayerController>

                        {/* play pause btn  */}
                        <PlayerController>
                            {isBuffering ? <Loader color={colors.PRIMARY} /> : <PlayPauseBtn playing={isPlaying} onPress={togglePlayPause} color={colors.PRIMARY} />}
                        </PlayerController>
                        {/* rotate right btn  */}
                        <PlayerController onPress={() => handleSkipTo("forward")} ignoreContainer >
                            <FontAwesome name='rotate-right'
                                size={18}
                                color={colors.CONTRAST}
                            />
                            <Text style={styles.skipText}>+10s</Text>
                        </PlayerController>

                        {/* next audio btn  */}
                        <PlayerController onPress={handleOnNextPress} ignoreContainer>
                            <AntDesign name='stepforward'
                                size={24}
                                color={colors.CONTRAST}
                            />
                        </PlayerController>

                    </View>

                    <PlayBackRateSelector
                        onPress={onPlayBackPress}
                        activeRate={playbackRate.toString()}
                        containerStyle={{ marginTop: 20 }} />

                    <View style={styles.listOptionBtnContainer}>
                        <PlayerController onPress={onListOptionPress} ignoreContainer>
                            <MaterialComIcon name='playlist-music' size={24} color={colors.CONTRAST} />
                        </PlayerController>
                    </View>
                </View>
            </View>
        </AppModal>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        padding: 20,
    },
    infoBtn: {
        alignSelf: 'flex-end',
    },
    poster: {
        width: 200,
        height: 200,
        borderRadius: 10
    },
    contentContainer: {
        flex: 1,
        width: '100%',
        marginTop: 20,
    },
    title: {
        fontSize: 18,
        fontWeight: '700',
        color: colors.CONTRAST
    },
    durationContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 10
    },
    duration: {
        color: colors.CONTRAST
    },
    controles: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 20
    },
    skipText: {
        color: colors.CONTRAST,
        marginTop: 2,
        fontSize: 12
    },
    listOptionBtnContainer: {
        alignItems: 'flex-end'
    }
});

export default AudioPlayer;
