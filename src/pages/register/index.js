import React from 'react';
import { Avatar, Text, TextInput, Button } from 'react-native-paper';
import { Styles } from "./style";
import auth from '@react-native-firebase/auth';
import {showWithConfirmationOnly} from "../../services/utils/app-alert";

import {
    SafeAreaView,
    TouchableOpacity,
    View
} from "react-native";

const RegisterPage = ({ navigation, route }) => {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [passwordConfirmation, setPasswordConfirmation] = React.useState("");

    const onClickLoginButton = () => {
        navigation.navigate("Login")
    }

    const onCLickRegisterButton = () => {
        if (password !== passwordConfirmation) showWithConfirmationOnly("Erro", "Sua senha e confirmação não conferem.", () => {})
        auth().createUserWithEmailAndPassword(email, password)
            .catch((reason) => {
                showWithConfirmationOnly("Não foi possível continuar", "Já existe um usuário com este e-mail e/ou senha fraca.", () => {})
            })
    }

    const checkFieldsAreOk = () => {
        let regexEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        let regexPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/

        if (email.length < 6 || !email.match(regexEmail)) return false
        if (password.length < 6 || !password.match(regexPassword)) return false;
        return password === passwordConfirmation;
    }

    return (
        <SafeAreaView>
            <View style={{ ...Styles.containerCentered }}>
                <Avatar.Icon icon="folder" size={92} style={{ ...Styles.headerLogo }} />

                <Text variant="headlineLarge" style={{ ...Styles.headerTitle, ...Styles.boxField }}>
                    Registre-se com seu email:
                </Text>

                <TextInput 
                    returnKeyType="next" 
                    label="Seu e-mail:" 
                    style={{ ...Styles.boxField }} 
                    onChangeText={text => setEmail(text)}
                    />

                <TextInput 
                    returnKeyType="next" 
                    label="Sua senha:" 
                    style={{ ...Styles.boxField }} 
                    onChangeText={text => setPassword(text)}
                    secureTextEntry
                    />

                <TextInput 
                    returnKeyType="next" 
                    label="Confirme sua senha:" 
                    style={{ ...Styles.boxField }} 
                    onChangeText={text => setPasswordConfirmation(text)}
                    secureTextEntry
                    />

                <Button 
                    mode="contained" 
                    style={{ ...Styles.boxField }} 
                    onPress={onCLickRegisterButton} 
                    disabled={!checkFieldsAreOk()}
                    >
                        Cadastrar-se
                </Button>

                <View style={{ ...Styles.boxField, ...Styles.rowItensField }}>
                    <Text >
                        Já possui uma conta? {" "}
                    </Text>
                    <TouchableOpacity onPress={onClickLoginButton}>
                        <Text style={{...Styles.textEmphasis}}>
                            Logar-se
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default RegisterPage;
