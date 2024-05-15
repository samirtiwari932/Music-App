import AuthFormContainer from '@components/AuthFormContainer';
import AuthInputField from '@components/form/AuthInputField';
import Form from '@components/form/Index';
import SubmitBtn from '@components/form/SubmitBtn';
import AppButton from '@ui/AppButton';
import AppLink from '@ui/AppLink';
import OTPField from '@ui/OTPField';
import PasswordVisibilityIcon from '@ui/PasswordVisibilityIcon';
import { FC, useState } from 'react';
import {
    StyleSheet,
    View
} from 'react-native';
import colors from 'src/utilis/color';
import * as yup from "yup";

interface Props { }

const otpFields = new Array(6).fill('s')

const Verification: FC<Props> = props => {
    return (
        <AuthFormContainer heading='Please look at your email'  >
            <View style={styles.inputContainer}>
                {otpFields.map((_, index) => {
                    return <OTPField key={index} placeholder='*' style={{}} />
                })}
            </View>

            <AppButton title='Submit' />
            <View style={styles.linkContainer}>
                <AppLink title='Re-send OTP' />

            </View>
        </AuthFormContainer>
    );
};

const styles = StyleSheet.create({
    inputContainer: {
        width: "100%",
        flexDirection: "row",
        justifyContent: 'space-between',
        alignItems: "center",
        marginBottom: 20
    },
    linkContainer: {
        marginTop: 20,
        alignItems: "flex-end",
        width: "100%"
    }
});

export default Verification;
