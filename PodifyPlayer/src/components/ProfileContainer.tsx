import { View, Text, StyleSheet, Pressable } from 'react-native'
import React from 'react'
import { UserProfile } from 'src/store/auth'
import AvatarField from '@ui/AvatarField'
import colors from 'src/utilis/color'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import { ProfileNavigatorStackParamList } from 'src/@types/navigation'
import Octicions from 'react-native-vector-icons/Octicons'
import Octicons from 'react-native-vector-icons/Octicons'
interface Props {
    profile?: UserProfile | null
}

const ProfileContainer = ({ profile }: Props) => {
    const { navigate } = useNavigation<NavigationProp<ProfileNavigatorStackParamList>>()
    if (!profile) return null
    return (
        <View style={styles.container}>
            <AvatarField source={profile.avatar} />
            <View style={styles.profileInfoContainer}>
                <Text style={styles.profileName} >{profile.name}</Text>
                <View style={styles.flexRow}>
                    <Text style={styles.email} >{profile.email}</Text>
                    {profile.verified ?
                        <MaterialIcon name='verified' color={colors.SECONDARY} size={15} /> : <Octicons name='unverified' color={colors.SECONDARY} size={15} />}
                </View>
                <View style={styles.flexRow}>
                    <Text style={styles.profileActionLink}>{profile.followers} Followers</Text>
                    <Text style={styles.profileActionLink}>{profile.followings} Followings</Text>
                </View>
            </View>
            <Pressable onPress={() => {
                navigate("ProfileSettings")
            }} style={styles.settingsBtn}>
                <AntDesign name='setting' size={22} color={colors.CONTRAST} />
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "center",

    },
    profileInfoContainer: {
        marginLeft: 10
    },
    profileName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: colors.CONTRAST
    },
    flexRow: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    email: {
        color: colors.CONTRAST,
        fontSize: 12,
        marginRight: 5
    },
    profileActionLink: {
        backgroundColor: colors.SECONDARY,
        color: colors.PRIMARY,
        paddingHorizontal: 4,
        paddingVertical: 2,
        borderRadius: 5,
        fontSize: 12,
        margin: 5
    },
    settingsBtn: {
        padding: 10,
        width: 40,
        aspectRatio: 1,
        justifyContent: "center",
        alignItems: "center",

    }
})

export default ProfileContainer 