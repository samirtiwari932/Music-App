import { View, Text, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import AppLink from '@ui/AppLink'
import colors from 'src/utilis/color'
import { getClient } from 'src/api/client'
import { useDispatch, useSelector } from 'react-redux'
import { getAuthState } from 'src/store/auth'
import catchAsyncError from 'src/api/catchError'
import { updateNotification } from 'src/store/notification'

interface Props {
    time?: number,
    activeAtFirst?: boolean,
    linkTitle: string,
    userId?: string
}

const ReVerificationLink = ({ linkTitle, userId, activeAtFirst = false, time = 60 }: Props) => {
    const [countDown, setCountDown] = useState(time)
    const [canSendNewOtpRequest, setCanSendNewOtpRequest] = useState(activeAtFirst)

    const dispatch = useDispatch()
    const { profile } = useSelector(getAuthState)
    const requestForOtp = async () => {
        setCountDown(60),
            setCanSendNewOtpRequest(false)
        try {
            const client = await getClient()
            await client.post('/auth/re-verify-email', { userId: userId || profile?.id })
        } catch (error) {
            const errorMessage = catchAsyncError(error)
            dispatch(updateNotification({ message: errorMessage, type: "error" }))
        }
    }
    useEffect(() => {
        if (canSendNewOtpRequest) return;


        const intervalId = setInterval(() => {
            setCountDown(oldCountDown => {
                if (oldCountDown <= 0) {
                    setCanSendNewOtpRequest(true)
                    clearInterval(intervalId)
                    return 0
                }
                return oldCountDown - 1
            })
        }, 1000)


        return () => {
            clearInterval(intervalId)
        }
    }, [canSendNewOtpRequest]);

    return (
        <View style={styles.container}>
            {countDown > 0 && !canSendNewOtpRequest ?
                <Text style={styles.countDown}>{countDown} sec </Text> : null
            }
            <AppLink active={canSendNewOtpRequest} title={linkTitle} onPress={requestForOtp} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    countDown: {
        marginRight: 7,
        color: colors.SECONDARY
    }
}
)

export default ReVerificationLink 