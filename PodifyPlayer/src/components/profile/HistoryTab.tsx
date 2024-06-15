import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native'
import React from 'react'
import { useFetchHistories } from 'src/hooks/query'
import { string } from 'yup'
import EmptyRecords from '@ui/EmptyRecords'
import colors from 'src/utilis/color'
import AntDesign from 'react-native-vector-icons/AntDesign'
import AudioListLoadingUI from '@ui/AudioListLoadingUI'
import { getClient } from 'src/api/client'
import { useQueryClient } from 'react-query'
import { historyAudio } from '../../../../server/src/@types/audio'

interface Props { }
const HistoryTab = (props: Props) => {
    const { data, isLoading } = useFetchHistories()

    const queryClient = useQueryClient()


    const removeHistories = async (histories: string[]) => {
        const client = await getClient()
        await client.delete('/history?histories=' + JSON.stringify(histories))
        queryClient.invalidateQueries({ queryKey: ['histories'] })

    }

    const handleSingleHistoryRemove = async (history: historyAudio) => {
        await removeHistories([history.id])
    }

    if (isLoading) return <AudioListLoadingUI />

    if (!data || !data[0]?.audios.length)
        return <EmptyRecords title='There is no history  ' />

    return (
        <ScrollView style={styles.container}>
            {data.map((item, index) => {
                return <View key={item.date + index}>

                    <Text style={styles.date}>
                        {item.date}
                    </Text>
                    <View style={styles.listContainer}>
                        {item.audios.map((audio, i) => {
                            return <View key={audio.id + i} style={styles.history}>
                                <Text style={styles.historyTitle}>
                                    {audio.title}
                                </Text>
                                <Pressable onPress={() => handleSingleHistoryRemove(audio)}>
                                    <AntDesign name="close" color={colors.CONTRAST} />
                                </Pressable>
                            </View>
                        })}
                    </View>

                </View>
            })}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {},
    listContainer: {
        marginTop: 10,
        paddingLeft: 10
    },
    date: {
        color: colors.SECONDARY
    },
    historyTitle: {
        color: colors.CONTRAST,
        paddingHorizontal: 5,
        fontWeight: "700",
        flex: 1
    },
    history: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.OVERLAY,
        padding: 10,
        borderRadius: 5,
        marginBottom: 10
    }
})

export default HistoryTab 