import AudioListLoadingUI from '@ui/AudioListLoadingUI';
import EmptyRecords from '@ui/EmptyRecords';
import { FC, useEffect, useState } from 'react';
import { View, StyleSheet, Text, Pressable, ScrollView, RefreshControl } from 'react-native';
import { useFetchHistories } from 'src/hooks/query';
import AntDesing from 'react-native-vector-icons/AntDesign';
import { getClient } from 'src/api/client';
import { useMutation, useQueryClient } from 'react-query';
import { HistoryType, historyAudio } from '../../../../server/src/@types/audio';
import colors from 'src/utilis/color';
import { useNavigation } from '@react-navigation/native';


interface Props { }

const HistoryTab: FC<Props> = props => {
    const { data, isLoading, isFetching } = useFetchHistories();
    const queryClient = useQueryClient();
    const [selectedHistories, setSelectedHistories] = useState<string[]>([]);

    const noData = !data?.length

    const removeMutate = useMutation({
        mutationFn: async (histories) => removeHistories(histories),
        onMutate: (histories: string[]) => {
            queryClient.setQueryData<HistoryType[]>(['histories'], (oldData) => {
                let newData: HistoryType[] = []
                if (!oldData) return newData

                for (let data of oldData) {
                    const filterData = data.audios.filter(item => !histories.includes(item.id))
                    if (filterData.length) newData.push({ date: data.date, audios: filterData })
                }
                return newData
            })
        }
    })
    const navigation = useNavigation()

    const removeHistories = async (histories: string[]) => {
        const client = await getClient();
        await client.delete('/history?histories=' + JSON.stringify(histories));
        queryClient.invalidateQueries({ queryKey: ['histories'] });
    };

    const handleSingleHistoryRemove = async (history: historyAudio) => {
        removeMutate.mutate([history.id])
    };

    const handleMultipleHistoryRemove = async () => {
        setSelectedHistories([]);
        removeMutate.mutate([...selectedHistories])
    };

    const handleOnLongPress = (history: historyAudio) => {
        setSelectedHistories([history.id]);
    };

    const handleOnPress = (history: historyAudio) => {
        setSelectedHistories(old => {
            if (old.includes(history.id)) {
                return old.filter(item => item !== history.id);
            }

            return [...old, history.id];
        });
    };

    const handleOnRefresh = () => {
        queryClient.invalidateQueries({ queryKey: ['histories'] });
    };

    useEffect(() => {
        const unselectHistories = () => setSelectedHistories([])
        navigation.addListener('blur', unselectHistories)

        return () => {
            navigation.removeListener('blur', unselectHistories)
        }
    }, [])

    if (isLoading) return <AudioListLoadingUI />;



    return (
        <>
            {selectedHistories.length ? (
                <Pressable
                    onPress={handleMultipleHistoryRemove}
                    style={styles.removeBtn}>
                    <Text style={styles.removeBtnText}>Remove</Text>
                </Pressable>
            ) : null}
            <ScrollView
                refreshControl={<RefreshControl
                    refreshing={isFetching}
                    onRefresh={handleOnRefresh}
                    tintColor={colors.CONTRAST} //only for ios 
                />}
                style={styles.container}>
                {noData ? <EmptyRecords title='There is no history!' /> : null}
                {data?.map((item, mainIndex) => {
                    return (
                        <View key={item.date + mainIndex}>
                            <Text style={styles.date}>{item.date}</Text>
                            <View style={styles.listContainer}>
                                {item.audios.map((audio, index) => {
                                    return (
                                        <Pressable
                                            onLongPress={() => handleOnLongPress(audio)}
                                            onPress={() => handleOnPress(audio)}
                                            key={audio.id + index}
                                            style={[
                                                styles.history,
                                                {
                                                    backgroundColor: selectedHistories.includes(audio.id)
                                                        ? colors.INACTIVE_CONTRAST
                                                        : colors.OVERLAY,
                                                },
                                            ]}>
                                            <Text style={styles.historyTitle}>{audio.title}</Text>
                                            <Pressable
                                                onPress={() => handleSingleHistoryRemove(audio)}>
                                                <AntDesing name="close" color={colors.CONTRAST} />
                                            </Pressable>
                                        </Pressable>
                                    );
                                })}
                            </View>
                        </View>
                    );
                })}
            </ScrollView>
        </>
    );
};

const styles = StyleSheet.create({
    container: {},
    removeBtn: {
        padding: 10,
        alignSelf: 'flex-end',
    },
    removeBtnText: {
        color: colors.CONTRAST,
    },
    listContainer: {
        marginTop: 10,
        paddingLeft: 10,
    },
    date: {
        color: colors.SECONDARY,
    },
    historyTitle: {
        color: colors.CONTRAST,
        paddingHorizontal: 5,
        fontWeight: '700',
        flex: 1,
    },
    history: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.OVERLAY,
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
    },
});

export default HistoryTab;
