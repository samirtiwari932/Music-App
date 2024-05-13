import AppInput from '@ui/AppInput';
import { FC } from 'react';
import {
    View,
    StyleSheet,
    Text,
    TextInputProps,
    StyleProp,
    ViewStyle,
} from 'react-native';
import colors from 'src/utilis/color';

interface Props {
    label?: string;
    value?: string
    placeholder?: string;
    errorMsg?: string
    keyboardType?: TextInputProps['keyboardType'];
    autoCapitalize?: TextInputProps['autoCapitalize'];
    secureTextEntry?: boolean;
    containerStyle?: StyleProp<ViewStyle>;
    onChange: (text: string) => void
}

const AuthInputField: FC<Props> = props => {
    const {
        label,
        value,
        placeholder,
        autoCapitalize,
        keyboardType,
        secureTextEntry,
        containerStyle,
        errorMsg,
        onChange
    } = props;
    return (
        <View style={[styles.container, containerStyle]}>
            <View style={styles.labelContainer}>
                <Text style={styles.label}>{label}</Text>
                <Text style={styles.errorMsg}>{errorMsg}</Text>
            </View>
            <AppInput
                placeholder={placeholder}
                keyboardType={keyboardType}
                autoCapitalize={autoCapitalize}
                secureTextEntry={secureTextEntry}
                onChangeText={onChange}
                value={value}
            />
        </View>

    );
};

const styles = StyleSheet.create({
    container: {},
    labelContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 5,
    },
    label: {
        color: colors.CONTRAST,
    },
    errorMsg: {
        color: colors.ERROR,
    },
});

export default AuthInputField;
