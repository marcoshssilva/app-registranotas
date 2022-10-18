import React from 'react';
import { Avatar, Text, TextInput, Button } from 'react-native-paper';
import Styles from "./style";

import {
    ScrollView,
    TouchableOpacity,
    View
} from "react-native";

const RegisterPage = ({ navigation, route }) => {
    const [name, setName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [passwordConfirmation, setPasswordConfirmation] = React.useState("");
    const onClickLoginButton = () => navigation.navigate("Login")

    return (
        <ScrollView>
            <View style={{ ...Styles.container }}>
                <Avatar.Icon icon="folder" size={92} style={{ ...Styles.headerLogo }} />

                <Text variant="displaySmall" style={{ ...Styles.headerTitle, ...Styles.boxField }}>
                    Criar uma conta
                </Text>

                <TextInput returnKeyType="next" label="Seu nome:" style={{ ...Styles.boxField }} onChangeText={text => setName(text)} />

                <TextInput returnKeyType="next" label="Seu e-mail:" style={{ ...Styles.boxField }} onChangeText={text => setEmail(text)}/>

                <TextInput returnKeyType="next" label="Sua senha:" style={{ ...Styles.boxField }} onChangeText={text => setPassword(text)}/>

                <TextInput returnKeyType="next" label="Confirme sua senha:" style={{ ...Styles.boxField }} onChangeText={text => setPasswordConfirmation(text)}/>

                <Button mode="contained" style={{ ...Styles.boxField }}>Cadastrar-se</Button>

                <View style={{ ...Styles.boxField, ...Styles.registrationField }}>
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
        </ScrollView>
    )
}

export default RegisterPage;
