import React from 'react';
import { Avatar } from 'react-native-paper';
import * as AppAlert from '../../services/utils/app-alert';
import * as AppMessages from '../../services/utils/app-default-messages';
import Styles from "./style";
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

import {
    View,
    TouchableOpacity,
    ScrollView
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

    const onClickForgotMyPassword = () => AppAlert.showWithConfirmationOnly(AppMessages.NOT_WORK_YET, AppMessages.NOT_WORK_YET_DESCRIBE, voidFunction)

    const canLogin = () => {
        if (password.includes(" ") || username.includes(" ")) return false
        if (password.length < 6 || username.length < 6) return false
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
        const { idToken } = await GoogleSignin.signIn();

        // Create a Google credential with the token
        const googleCredential = auth.GoogleAuthProvider.credential(idToken);

        // Sign-in the user with the credential
        return auth().signInWithCredential(googleCredential)
            .then(res => {})
    }

    const onContinueWithFacebook = () => AppAlert.showWithConfirmationOnly(AppMessages.NOT_WORK_YET, AppMessages.NOT_WORK_YET_DESCRIBE, voidFunction)

    return (
        <ScrollView>
            <View style={{ ...Styles.container }}>
                <Avatar.Icon icon={'folder'} size={92} style={{ ...Styles.headerLogo }} />

                <Text variant='displaySmall' style={{ ...Styles.headerTitle, ...Styles.boxField }}>
                    Bem-vindo!
                </Text>

                <TextInput label={"E-mail:"} style={{ ...Styles.boxField }} onChangeText={text => setUsername(text)} />

                <TextInput label={"Senha:"} style={{ ...Styles.boxField }} onChangeText={text => setPassword(text)} />

                <TouchableOpacity style={{ ...Styles.boxField }} onPress={onClickForgotMyPassword}>
                    <Text style={{ ...Styles.forgotPasswordText }}>
                        Esqueceu sua senha?
                    </Text>
                </TouchableOpacity>

                <Button mode='contained' style={{ ...Styles.boxField }} onPress={onLogin} disabled={!canLogin()}>
                    Logar-se
                </Button>

                <Button mode='outlined' style={{ ...Styles.boxField }} onPress={onContinueWithGoogle} icon={"google"}>
                    Continuar com Google
                </Button>

                <Button mode='outlined' style={{ ...Styles.boxField }} onPress={onContinueWithFacebook} icon={"facebook"} disabled={true}>
                    Continuar com Facebook
                </Button>

                <View style={{ ...Styles.boxField, ...Styles.registrationField }}>
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
        </ScrollView>
    )
}

export default LoginPage;
