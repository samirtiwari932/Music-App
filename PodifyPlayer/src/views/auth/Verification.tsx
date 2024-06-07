import AuthFormContainer from '@components/AuthFormContainer';
import ReVerificationLink from '@components/ReVerificationLink';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import AppButton from '@ui/AppButton';
import OTPField from '@ui/OTPField';
import { FC, useEffect, useRef, useState } from 'react';
import { Keyboard, StyleSheet, TextInput, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { AuthStackParamList, ProfileNavigatorStackParamList } from 'src/@types/navigation';
import client from 'src/api/client';
import { updateNotification } from 'src/store/notification';
import colors from 'src/utilis/color';

type Props = NativeStackScreenProps<AuthStackParamList | ProfileNavigatorStackParamList, "Verification">

const otpFields = new Array(6).fill('');

type PossibleScreens = {
    ProfileSettings: undefined,
    SignIn: undefined
}

const Verification: FC<Props> = ({ route }) => {
    const navigation = useNavigation<NavigationProp<PossibleScreens>>()
    const [otp, setOtp] = useState([...otpFields]);
    const [activeOtpIndex, setActiveOtpIndex] = useState(0);
    const [submitting, setSubmitting] = useState(false)


    const { userInfo } = route.params

    const inputRef = useRef<TextInput>(null);

    const dispatch = useDispatch()
    const handleChange = (value: string, index: number) => {
        const newOtp = [...otp];

        if (value === 'Backspace') {
            // moves to the previous only if the field is empty
            if (!newOtp[index]) setActiveOtpIndex(index - 1);
            newOtp[index] = '';
        } else {
            // update otp and move to the next
            setActiveOtpIndex(index + 1);
            newOtp[index] = value;
        }

        setOtp([...newOtp]);
    };

    const handlePaste = (value: string) => {
        if (value.length === 6) {
            Keyboard.dismiss()
            const newOtp = value.split('')
            setOtp([...newOtp])
        }
    }
    const isValidOtp = otp.every(value => {
        return value.trim()
    })


    const handleSubmit = async () => {
        if (!isValidOtp) return dispatch(updateNotification({ message: "Invalid Otp", type: "error" }));
        setSubmitting(true)
        try {
            const { data } = await client.post('auth/verify-email', { userId: userInfo.id, token: otp.join('') })

            dispatch(updateNotification({ message: data.message, type: "success" }))

            const { routeNames } = navigation.getState()
            if (routeNames.includes('SignIn')) {
                //navigate back to sign In 
                navigation.navigate('SignIn')
            }
            if (routeNames.includes("ProfileSettings")) {
                //navigate to profile settings
                navigation.navigate('ProfileSettings')
            }
        } catch (error) {
            console.log("Error inside Verification ", error)
        }
        setSubmitting(false)
    }

    useEffect(() => {
        inputRef.current?.focus();
    }, [activeOtpIndex]);





    return (
        <AuthFormContainer heading="Please look at your email.">
            <View style={styles.inputContainer}>
                {otpFields.map((_, index) => {
                    return (
                        <OTPField
                            ref={activeOtpIndex === index ? inputRef : null}
                            key={index}
                            placeholder="*"
                            onKeyPress={({ nativeEvent }) => {
                                handleChange(nativeEvent.key, index);
                            }}
                            onChangeText={handlePaste}
                            keyboardType='numeric'
                            value={otp[index] || ""}

                        />
                    );
                })}
            </View>

            <AppButton busy={submitting} title="Submit" onPress={handleSubmit} />

            <View style={styles.linkContainer}>
                <ReVerificationLink linkTitle='Re-send OTP' userId={userInfo.id} />
            </View>
        </AuthFormContainer>
    );
};

const styles = StyleSheet.create({
    inputContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    linkContainer: {
        marginTop: 20,
        width: '100%',
        justifyContent: "flex-end",

    },
    countDown: {
        color: colors.SECONDARY,
        marginRight: 7

    }
});

export default Verification;
