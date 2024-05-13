
import AuthInputField from '@components/AuthInputField';
import { FC, useState } from 'react';
import { Button, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native';
import colors from 'src/utilis/color';

interface Props { }

const SignUp: FC<Props> = props => {
    const [userInfo, setUserInfo] = useState({
        name: '',
        email: '',
        password: ''
    })

    return (
        <View style={styles.container}>
            <View style={styles.formContainer}>
                <AuthInputField
                    placeholder="John Doe"
                    label="Name"
                    containerStyle={styles.marginBottom}
                    onChange={(text) => {
                        setUserInfo({ ...userInfo, name: text })
                    }}
                />
                <AuthInputField
                    placeholder="john@email.com"
                    label="Email"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    containerStyle={styles.marginBottom}
                    onChange={(text) => {
                        setUserInfo({ ...userInfo, email: text })
                    }}
                />
                <AuthInputField
                    placeholder="********"
                    label="Password"
                    autoCapitalize="none"
                    containerStyle={styles.marginBottom}
                    secureTextEntry
                    onChange={(text) => {
                        setUserInfo({ ...userInfo, password: text })
                    }}
                />
                <Button
                    onPress={() => {
                        console.warn(userInfo)
                    }}
                    title='Sign up' />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.PRIMARY,
        alignItems: 'center',
        justifyContent: 'center',
    },
    formContainer: {
        width: '100%',
        paddingHorizontal: 15, // padding in the x direction (left and the right)
    },
    marginBottom: {
        marginBottom: 20,
    },
});

export default SignUp;
