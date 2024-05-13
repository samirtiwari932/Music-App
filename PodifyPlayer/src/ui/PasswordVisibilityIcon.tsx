import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/Entypo';

interface Props {
    privateIcon: boolean
}
const PasswordVisibilityIcon = ({ privateIcon }: Props) => {
    return (
        privateIcon ? <Icon name="eye" color="white" size={16} /> : <Icon name="eye-with-line" color="white" size={16} />
    )
}



export default PasswordVisibilityIcon 