import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

import UploadTabs from '@components/profile/UploadsTab';
import PlayListTab from '@components/profile/PlayListTab';
import FavoriteTab from '@components/profile/FavoriteTab';
import HistoryTab from '@components/profile/HistoryTab';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import colors from 'src/utilis/color';
import { useSelector } from 'react-redux';
import { getAuthState } from 'src/store/auth';
import ProfileContainer from '@components/ProfileContainer';
import AppView from '@components/AppView';

interface Props { }

const Tab = createMaterialTopTabNavigator();
const Profile = (props: Props) => {


    const { profile } = useSelector(getAuthState)
    return <AppView>
        <View style={styles.container} >
            <ProfileContainer profile={profile} />
            <Tab.Navigator screenOptions={
                {
                    tabBarStyle: styles.tabBarStyle,
                    tabBarLabelStyle: styles.tabBarLabelStyle
                }
            }>
                <Tab.Screen name="Upload" component={UploadTabs} />
                <Tab.Screen name="Playlist" component={PlayListTab} />
                <Tab.Screen name="Favorite" component={FavoriteTab} />
                <Tab.Screen name="History" component={HistoryTab} />
            </Tab.Navigator>
        </View>
    </AppView>

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10
    },
    tabBarStyle: {
        marginBottom: 20,
        backgroundColor: "transparent",
        elevation: 0,
        //for ios 
        // shadowRadius: 0,
        // shadowColor: 'transparent',
        // shadowOffset: { width: 0, height: 0 },
        // shadowOpacity: 0
    },
    tabBarLabelStyle: {
        color: colors.CONTRAST,
        fontSize: 12
    }
}
)

export default Profile 