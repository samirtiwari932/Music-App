import { FC, useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from 'react-native-reanimated';
import { useDispatch, useSelector } from 'react-redux';
import {
    getNotificationState,
    updateNotification,
} from 'src/store/notification';
import colors from 'src/utilis/color';

interface Props { }

const AppNotification: FC<Props> = props => {
    const { message, type } = useSelector(getNotificationState);
    const height = useSharedValue(0);

    const dispatch = useDispatch();

    const heightStyle = useAnimatedStyle(() => {
        return {
            height: height.value,
        };
    });

    let backgroundColor = colors.ERROR;
    let textColor = colors.CONTRAST;

    switch (type) {
        case 'success':
            backgroundColor = colors.SUCCESS;
            textColor = colors.SECONDARY;
            break;
    }

    useEffect(() => {
        let timer: ReturnType<typeof setTimeout>;
        const performAnimation = () => {
            height.value = withTiming(45, {
                duration: 150,
            });

            timer = setTimeout(() => {
                height.value = withTiming(0, {
                    duration: 150,
                });

                dispatch(updateNotification({ message: '', type }));
            }, 3000);
        };
        if (message) {
            performAnimation();
        }

        return () => {
            clearTimeout(timer)
        };
    }, [message]);

    return (
        <Animated.View style={[styles.container, { backgroundColor }, heightStyle]}>
            <Text style={[styles.message, { color: textColor }]}>{message}</Text>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    message: {
        fontSize: 18,
        alignItems: 'center',
    },
});

export default AppNotification;
