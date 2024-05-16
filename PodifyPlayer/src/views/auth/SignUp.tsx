import AuthFormContainer from '@components/AuthFormContainer';
import AuthInputField from '@components/form/AuthInputField';
import Form from '@components/form/Index';
import SubmitBtn from '@components/form/SubmitBtn';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import AppLink from '@ui/AppLink';
import CircleUi from '@ui/CircleUi';
import PasswordVisibilityIcon from '@ui/PasswordVisibilityIcon';
import { FC, useState } from 'react';
import {
    Image,
    StyleSheet,
    Text,
    View
} from 'react-native';
import { AuthStackParamList } from 'src/@types/navigation';
import colors from 'src/utilis/color';
import * as yup from "yup";


const signupSchema = yup.object({
    name: yup.string().trim("Name is missing!").min(3, "Name is too short!").required("Name is required!"),
    email: yup.string().trim("Email is missing!").email("Invalid email !").required("Email  is required!"),
    password: yup.string()
        .trim("password  is missing!")
        .min(8, "password is too short!")
        .matches(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#\$%\^&\*])[a-zA-Z\d!@#\$%\^&\*]+$/, "Password is too simple!")
        .required("Password is required!")
})

interface Props { }

const initialValues = {
    name: '',
    email: '',
    password: '',
};

const SignUp: FC<Props> = props => {

    const [secureEntry, setSecureEntry] = useState(true)


    const navigation = useNavigation<NavigationProp<AuthStackParamList>>()


    const togglePasswordView = () => {
        setSecureEntry(!secureEntry)
    }

    return (

        <Form
            onSubmit={values => {
                console.log(values);
            }}
            initialValues={initialValues}
            validationSchema={signupSchema}
        >
            <AuthFormContainer heading='Welcome' subHeading="Let's get started by creating your accountS">

                <View style={styles.formContainer}>
                    <AuthInputField
                        name='name'
                        placeholder="John Doe"
                        label="Name"
                        containerStyle={styles.marginBottom}
                    />
                    <AuthInputField
                        name='email'
                        placeholder="john@email.com"
                        label="Email"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        containerStyle={styles.marginBottom}

                    />
                    <AuthInputField
                        name='password'
                        placeholder="********"
                        label="Password"
                        autoCapitalize="none"
                        secureTextEntry={secureEntry}
                        containerStyle={styles.marginBottom}
                        rightIcon={<PasswordVisibilityIcon privateIcon={secureEntry} />}
                        onRightIconPress={togglePasswordView}
                    />
                    <SubmitBtn title='Sign up' />
                    <View style={styles.linkContainer}>
                        <AppLink title='Forget Password ?'
                            onPress={() => {
                                navigation.navigate("LostPassword")
                            }}
                        />
                        <AppLink title='Sign In' onPress={() => {
                            navigation.navigate("SignIn")
                        }} />
                    </View>
                </View>

            </AuthFormContainer>
        </Form>
    );
};

const styles = StyleSheet.create({

    formContainer: {
        width: "100%",

    },
    marginBottom: {
        marginBottom: 20,
    },
    linkContainer: {
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: 20
    }
});

export default SignUp;
