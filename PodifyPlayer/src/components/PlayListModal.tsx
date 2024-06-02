import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native'
import React, { ReactNode } from 'react'
import BasicModalContainer from '@ui/BasicModalContainer'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome'
import colors from 'src/utilis/color'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { Playlist } from 'src/@types/audio'

interface Props {
    visible: boolean,
    onRequestClose?(): void,
    list: Playlist[],
    onCreateNewPress(): void,
    onPlayListPress(item: Playlist): void
}

interface ListItemProps {
    title: string,
    icon: ReactNode,
    onPress?(): void
}

const ListItem = ({ title, icon, onPress }: ListItemProps) => {
    return (
        <Pressable onPress={onPress} style={styles.listItemContainer}>
            {icon}
            <Text style={styles.listItemTitle}>{title} </Text>
        </Pressable>
    )
}
const PlayListModal = ({ onRequestClose, onPlayListPress, onCreateNewPress, visible, list }: Props) => {
    return (
        <BasicModalContainer visible={visible} onRequestClose={onRequestClose} >
            {/* we want to render playlist here */}
            <ScrollView>
                {list.map((item) => {
                    return <ListItem
                        key={item.id}
                        title={item.title}
                        icon={<FontAwesomeIcon size={20} name={item.visibility === "public" ? "globe" : "lock"}
                            color={colors.PRIMARY} />}
                        onPress={() => onPlayListPress(item)}
                    />
                })}

            </ScrollView>

            {/* create playlist new button  */}
            <ListItem
                icon={<AntDesign size={20} name='plus' color={colors.PRIMARY} />}
                title='Create new'
                onPress={onCreateNewPress} />

        </BasicModalContainer >
    )
}

const styles = StyleSheet.create({
    container: {},
    listItemContainer: {
        flexDirection: "row",
        alignItems: 'center',
        height: 45
    },
    listItemTitle: {
        fontSize: 16,
        color: colors.PRIMARY
    }
})

export default PlayListModal 