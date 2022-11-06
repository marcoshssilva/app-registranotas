import React from 'react';
import { Avatar } from 'react-native-paper';
import * as AppAlert from '../../services/utils/app-alert';
import * as AppMessages from '../../services/utils/app-default-messages';
import { Styles } from "./style";
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

import {
    View,
    TouchableOpacity,
    SafeAreaView
} from "react-native";

import {
    Text,
    TextInput,
    Button
} from 'react-native-paper';

const LoginPage = ({ navigation, route }) => {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const voidFunction = () => { };

    const onClickRegisterButton = () => navigation.navigate('Register');

    const onClickForgotMyPassword = () => navigation.navigate('Forgot');

    const canLogin = () => {
        let regexEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        let regexPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/
        if (password.includes(" ") || username.includes(" ")) return false
        if (password.length < 6 || username.length < 6 || !username.match(regexEmail) || !password.match(regexPassword)) return false
        return true
    }

    const onLogin = () => {
        auth().signInWithEmailAndPassword(username, password)
            .then(success => voidFunction())
            .catch(err => {
                AppAlert.showWithConfirmationOnly("Autenticação falhou!", "Verifique suas credenciais corretamente.", voidFunction)
            })
    }

    const onContinueWithGoogle = async () => {
        // Check if your device supports Google Play
        await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
        // Get the users ID token
        const { idToken } = await GoogleSignin.signIn().catch((reason) => AppAlert.showWithConfirmationOnly(AppMessages.CANNOT_PROCEED, AppMessages.CANNOT_PROCEED_DESCRIBE, () => {}))
        if (idToken == null || idToken == undefined) return;

        // Create a Google credential with the token
        const googleCredential = auth.GoogleAuthProvider.credential(idToken);

        // Sign-in the user with the credential
        return auth().signInWithCredential(googleCredential)
    }

    return (
        <SafeAreaView>
            <View style={{ ...Styles.containerCentered }}>
                <Avatar.Icon icon={'folder'} size={92} style={{ ...Styles.headerLogo }} />

                <Text variant='headlineLarge' style={{ ...Styles.headerTitle, ...Styles.boxField }}>
                    Olá, {'\n'}
                    Seja Bem-vindo!
                </Text>

                <TextInput label={"E-mail:"} style={{ ...Styles.boxField }} onChangeText={text => setUsername(text)} />

                <TextInput 
                    label={"Senha:"} 
                    style={{ ...Styles.boxField }} 
                    onChangeText={text => setPassword(text)}
                    secureTextEntry 
                    />

                <Button mode='contained' style={{ ...Styles.boxField }} onPress={onLogin} disabled={!canLogin()}>
                    Logar-se
                </Button>

                <TouchableOpacity style={{ ...Styles.boxField }} onPress={onClickForgotMyPassword}>
                    <Text style={{ ...Styles.textEnd, ...Styles.textEmphasis }}>
                        Esqueceu sua senha?
                    </Text>
                </TouchableOpacity>

                <Button mode='outlined' style={{ ...Styles.boxField }} onPress={onContinueWithGoogle} icon={"google"}>
                    Continuar com Google
                </Button>

                <View style={{ ...Styles.boxField, ...Styles.rowItensField }}>
                    <Text>
                        Não possui uma conta? {" "}
                    </Text>
                    <TouchableOpacity onPress={onClickRegisterButton}>
                        <Text style={{ ...Styles.textEmphasis }} >
                            Cadastre-se
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default LoginPage;
