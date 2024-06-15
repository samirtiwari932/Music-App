import { View, Text, StyleSheet, Pressable, TextInput, PermissionsAndroid, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import colors from 'src/utilis/color'
import AppHeaders from '@components/AppHeaders'
import AvatarField from '@ui/AvatarField'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import AppButton from '@ui/AppButton'
import client, { getClient } from 'src/api/client'
import catchAsyncError from 'src/api/catchError'
import { useDispatch, useSelector } from 'react-redux'
import { updateNotification } from 'src/store/notification'
import { Keys, removeFromAsyncStorage } from 'src/utilis/asyncStorage'
import { getAuthState, updateBusyState, updateLoggedInState, updateProfile } from 'src/store/auth'
import deepEqual from 'deep-equal'
import ImagePicker from 'react-native-image-crop-picker';
import { getPremissionToReadImages } from 'src/utilis/helper'
import ReVerificationLink from '@components/ReVerificationLink'
import MaterialComIcon from "react-native-vector-icons/MaterialCommunityIcons"
import { useQueryClient } from 'react-query'


interface Props { }
interface ProfileInfo {
    name: string
    avatar?: string
}
const ProfileSettings = (props: Props) => {
    const [userInfo, setUserInfo] = useState<ProfileInfo>({
        name: ""
    })
    const [busy, setBusy] = useState(false)
    const dispatch = useDispatch()
    const { profile } = useSelector(getAuthState)
    const queryClient = useQueryClient()

    const isSame = deepEqual(userInfo, {
        name: profile?.name,
        avatar: profile?.avatar
    })
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
    const handleSubmit = async () => {
        setBusy(true);
        try {
            if (!userInfo.name.trim())
                return dispatch(
                    updateNotification({
                        message: 'Profile name is require!',
                        type: 'error',
                    }),
                );
            const formData = new FormData();
            formData.append('name', userInfo.name);
            const client = await getClient({ 'Content-Type': 'multipart/form-data;' });
            const { data } = await client.post('/auth/update-profile', formData);
            dispatch(updateProfile(data.profile));
            dispatch(
                updateNotification({
                    message: 'Your profile is updated.',
                    type: 'success',
                }),
            );
        } catch (error) {
            const errorMessage = catchAsyncError(error);
            dispatch(updateNotification({ message: errorMessage, type: 'error' }));
        }
        setBusy(false);
    };

    const handleImageSelect = async () => {
        try {
            await getPremissionToReadImages()
            const res = await ImagePicker.openPicker({
                cropping: true,
                width: 300,
                height: 300,

            })
            console.log(res)
        } catch (error) {
            console.log(error)
        }
    }

    const clearHistory = async () => {
        console.log("Clearing history")
        try {
            const client = await getClient();
            await client.delete('/history?all=yes');
            queryClient.invalidateQueries({ queryKey: ['histories'] });
            dispatch(updateNotification({
                message: 'History cleared!',
                type: 'success'
            }));
        } catch (error) {
            const errorMessage = catchAsyncError(error)
            dispatch(updateNotification({
                message: errorMessage,
                type: 'error'
            }));
        }
    };


    const handleOnHistoryClear = () => {
        Alert.alert("Are you sure ?", "This action will clear out all the history!", [
            {
                text: "Clear",
                style: "destructive",
                onPress() {
                    clearHistory()
                }
            },
            {
                text: "Cancel",
                style: "cancel",

            },

        ],
            {
                cancelable: true
            }
        )
    }

    useEffect(() => {
        if (profile) setUserInfo({
            name: profile?.name,
            avatar: profile?.avatar
        })
    }, [profile])

    return (
        <View style={styles.container}>
            <AppHeaders title='Settings' />

            <View style={styles.titleContainer}>
                <Text style={styles.title}>ProfileSettings</Text>
            </View>
            <View style={styles.settingOptionsContainer}>
                <View style={styles.avatarContainer}>
                    <AvatarField source={userInfo.avatar} />
                    <Pressable onPress={handleImageSelect} style={{ paddingLeft: 15 }}>
                        <Text style={styles.linkText}>Upload Profile Image</Text>
                    </Pressable>
                </View>
                <TextInput
                    onChangeText={(text) => setUserInfo({
                        ...userInfo,
                        name: text
                    })}
                    style={styles.nameInput} value={userInfo.name} />
                <View style={styles.emailContainer}>
                    <Text style={styles.email}>{profile?.email}</Text>

                    {profile?.verified ? <MaterialIcon name="verified" size={15} color={colors.SECONDARY} /> : <ReVerificationLink linkTitle='Verify' activeAtFirst />}
                </View>
            </View>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>History</Text>
            </View>

            <View style={styles.settingOptionsContainer}>
                <Pressable
                    onPress={handleOnHistoryClear}
                    style={styles.buttonContainer}>
                    <MaterialComIcon name='broom' size={20} color={colors.CONTRAST} />
                    <Text style={styles.buttonTitle}>Clear All</Text>
                </Pressable>
            </View>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>LogOut</Text>
            </View>

            <View style={styles.settingOptionsContainer}>
                <Pressable
                    onPress={() => handleLogOut(true)}
                    style={styles.buttonContainer}>
                    <AntDesign name='logout' size={20} color={colors.CONTRAST} />
                    <Text style={styles.buttonTitle}>LogOut from All</Text>
                </Pressable>
                <Pressable
                    onPress={() => handleLogOut(false)}
                    style={styles.buttonContainer}>
                    <AntDesign name='logout' size={20} color={colors.CONTRAST} />
                    <Text style={styles.buttonTitle}>LogOut </Text>
                </Pressable>
            </View>
            {!isSame ?
                <View style={{ marginTop: 15 }}>
                    <AppButton onPress={handleSubmit} title='Update' borderRadius={7} busy={busy} />
                </View>
                : null}
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
    buttonContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 15
    },
    buttonTitle: {
        color: colors.CONTRAST,
        fontSize: 18,
        marginLeft: 5
    }

})

export default ProfileSettings 