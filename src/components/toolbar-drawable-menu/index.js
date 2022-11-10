import React from "react";
import { StyleSheet, SafeAreaView } from "react-native";
import { Text, List, Divider  } from "react-native-paper"

import { GlobalStyles } from "../../GlobalStyle";

export const ToolbarDrawableMenu = ({ navigation, route, options }) => {
    return (<SafeAreaView>
        <Text
            variant="headlineMedium"
            style={ToolbarDrawableMenuStyle.title}>
            Pastas
        </Text>

        <List.Item
            title="Painel Principal"
            left={props => <List.Icon {...props} icon="home-outline" />}
            onPress={() => navigation.navigate("PrincipalPanel")}
        />

        <Divider />

        <List.Item
            title="Favoritos"
            left={props => <List.Icon {...props} icon="heart-outline" />}
            onPress={() => navigation.navigate("FavoriteNotes")}
        />

        <Divider />

        <List.Item
            title="Todas as Notas"
            left={props => <List.Icon {...props} icon="folder-open-outline" />}
            onPress={() => navigation.navigate("AllNotes")}
        />

        <Text
            variant="titleMedium"
            style={ToolbarDrawableMenuStyle.title}>
            Meus Personalizados
        </Text>

        <Text
            variant="titleMedium"
            style={ToolbarDrawableMenuStyle.title}>
            Ações
        </Text>

        <List.Item
            title="Criar pasta"
            description="Adiciona uma nova pasta personalizada"
            left={props => <List.Icon {...props} icon="folder-plus-outline" />}
        />

        <List.Item
            title="Nota rápida"
            description="Cria uma nota simplificada"
            left={props => <List.Icon {...props} icon="notebook-plus" />}
        />
    </SafeAreaView>)
}

export const ToolbarDrawableMenuStyle = StyleSheet.create({
    ...GlobalStyles,
    title: {
        padding: 16,
    }
});