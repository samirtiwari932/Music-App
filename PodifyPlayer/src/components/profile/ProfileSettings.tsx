import { View, Text, StyleSheet, Pressable, TextInput } from 'react-native'
import React from 'react'
import colors from 'src/utilis/color'
import AppHeaders from '@components/AppHeaders'
import AvatarField from '@ui/AvatarField'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import AppButton from '@ui/AppButton'
import { getClient } from 'src/api/client'
import catchAsyncError from 'src/api/catchError'
import { useDispatch } from 'react-redux'
import { updateNotification } from 'src/store/notification'
import { Keys, removeFromAsyncStorage } from 'src/utilis/asyncStorage'
import { updateBusyState, updateLoggedInState, updateProfile } from 'src/store/auth'

interface Props { }
const ProfileSettings = (props: Props) => {
    const dispatch = useDispatch()
    const handleLogOut = async (fromAll?: boolean) => {
        dispatch(updateBusyState(true))
        try {

            const endPoint = `/auth/logout?fromAll=${fromAll ? 'yes' : ''}`;
            const client = await getClient()
            await client.post(endPoint)
            await removeFromAsyncStorage(Keys.Auth_Token)
            dispatch(updateProfile(null)),
                dispatch(updateLoggedInState(false))
        } catch (error) {
            const errorMessage = catchAsyncError(error)
            dispatch(updateNotification({
                message: errorMessage,
                type: 'error'
            }))
        }
        dispatch(updateBusyState(false))
    }

    return (
        <View style={styles.container}>
            <AppHeaders title='Settings' />

            <View style={styles.titleContainer}>
                <Text style={styles.title}>ProfileSettings</Text>
            </View>
            <View style={styles.settingOptionsContainer}>
                <View style={styles.avatarContainer}>
                    <AvatarField />
                    <Pressable style={{ paddingLeft: 15 }}>
                        <Text style={styles.linkText}>Upload Profile Image</Text>
                    </Pressable>
                </View>
                <TextInput style={styles.nameInput} value='John' />
                <View style={styles.emailContainer}>
                    <Text style={styles.email}>JohnDoe@email.com</Text>
                    <MaterialIcon name="verified" size={15} color={colors.SECONDARY} />
                </View>
            </View>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>LogOut</Text>
            </View>

            <View style={styles.settingOptionsContainer}>
                <Pressable
                    onPress={() => handleLogOut(true)}
                    style={styles.logoutBtn}>
                    <AntDesign name='logout' size={20} color={colors.CONTRAST} />
                    <Text style={styles.logoutBtnTitle}>LogOut from All</Text>
                </Pressable>
                <Pressable
                    onPress={() => handleLogOut(false)}
                    style={styles.logoutBtn}>
                    <AntDesign name='logout' size={20} color={colors.CONTRAST} />
                    <Text style={styles.logoutBtnTitle}>LogOut </Text>
                </Pressable>
            </View>
            <View style={{ marginTop: 15 }}>
                <AppButton title='Update' borderRadius={7} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 10
    },
    titleContainer: {
        borderBottomWidth: 0.5,
        borderBottomColor: colors.SECONDARY,
        paddingBottom: 5,
        marginTop: 15
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: colors.SECONDARY
    },
    settingOptionsContainer: {
        marginTop: 15,
        paddingLeft: 15
    },
    avatarContainer: {
        flexDirection: "row",
        alignItems: "center"
    },
    linkText: {
        color: colors.SECONDARY,
        fontStyle: "italic"
    },
    nameInput: {
        color: colors.CONTRAST,
        fontSize: 18,
        fontWeight: "bold",
        padding: 10,
        borderWidth: .5,
        borderColor: colors.CONTRAST,
        borderRadius: 7,
        marginTop: 15
    },
    emailContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 15
    },
    email: {
        color: colors.CONTRAST,
        marginRight: 10
    },
    logoutBtn: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 15
    },
    logoutBtnTitle: {
        color: colors.CONTRAST,
        fontSize: 18,
        marginLeft: 5
    }

})

export default ProfileSettings 