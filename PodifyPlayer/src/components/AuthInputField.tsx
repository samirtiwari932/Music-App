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
    placeholder?: string;
    keyboardType?: TextInputProps['keyboardType'];
    autoCapitalize?: TextInputProps['autoCapitalize'];
    secureTextEntry?: boolean;
    containerStyle?: StyleProp<ViewStyle>;
    onChange: (text: string) => void
}

const AuthInputField: FC<Props> = props => {
    const {
        label,
        placeholder,
        autoCapitalize,
        keyboardType,
        secureTextEntry,
        containerStyle,
        onChange
    } = props;
    return (
        <View style={[styles.container, containerStyle]}>
            <Text style={styles.label}>{label}</Text>
            <AppInput
                placeholder={placeholder}
                keyboardType={keyboardType}
                autoCapitalize={autoCapitalize}
                secureTextEntry={secureTextEntry}
                onChangeText={onChange}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {},
    label: {
        color: colors.CONTRAST,
        padding: 5,
    },
});

export default AuthInputField;
