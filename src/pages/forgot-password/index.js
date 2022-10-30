import React from "react";
import { Styles } from "./style";
import * as AppAlert from '../../services/utils/app-alert';

import auth from "@react-native-firebase/auth";

import { 
    Avatar,
    TextInput,
    Button,
    Text
} from 'react-native-paper';

import Icon from 'react-native-vector-icons/Ionicons';

import {
    SafeAreaView, TouchableOpacity, View
} from "react-native";

const ForgotPasswordPage = ({navigation, route}) => {
    const [email, setEmail] = React.useState('');
    const sendEmailRecoverPassword = () => auth().sendPasswordResetEmail(email).then(() => AppAlert.showWithConfirmationOnly('Enviado', 'Mensagem de recuperação enviada. Verifique sua caixa de e-mail para resetar sua senha.', () => {}))
    const disableFieldWhenEmpty = () => {
        let regexEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        if (email.length < 6 || !email.match(regexEmail)) return true
        return false
    }

    const onClickBackToLogin = () => navigation.navigate('Login');

    return (
        <SafeAreaView>
            <View style={{...Styles.containerCentered}}>
                <Avatar.Icon 
                    icon={'folder'} 
                    size={92} 
                    style={{ ...Styles.headerLogo, ...Styles.boxField }} />

                <Text 
                    variant='headlineLarge' 
                    style={{ ...Styles.headerTitle, ...Styles.boxField }}>
                        Preencha com seu e-mail:
                </Text>

                <TextInput 
                    label={"E-mail:"} 
                    style={{ ...Styles.boxField }} 
                    onChangeText={text => setEmail(text)} />

                <Button 
                    mode='contained' 
                    onPress={sendEmailRecoverPassword} 
                    disabled={disableFieldWhenEmpty()}
                    style={{ ...Styles.boxField }}>
                        Solicitar alteração por e-mail.
                </Button>

                <TouchableOpacity 
                    style={{ ...Styles.rowItensField, ...Styles.alignEnd }}
                    onPress={onClickBackToLogin}>

                    <Icon name="arrow-back" size={23} />
                     
                    <Text style={{...Styles.textEmphasis}}>
                        {" "}
                        Voltar para Login.
                    </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default ForgotPasswordPage;