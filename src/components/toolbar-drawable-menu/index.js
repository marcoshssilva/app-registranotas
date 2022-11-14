import React from "react";
import {StyleSheet, FlatList, ScrollView} from "react-native";
import { Text, List, Divider  } from "react-native-paper"

import { GlobalStyles } from "../../GlobalStyle";
import {showModalCreateFolder} from "../modal-create-folder";
import {showModalCreateNotes} from "../modal-create-notes";
import {getAllFolders} from "../../services/firestore/folders-data";

export const ToolbarDrawableMenu = ({ navigation }) => {
    const [folders, setFolders] = React.useState([])

    React.useEffect(() => {
        getAllFolders().then(data => setFolders(data))
    }, [])

    const openCreateQuickNoteModal = () => {
        showModalCreateNotes()
        navigation.closeDrawer();
    }

    const openCreateFolderModal = () => {
        showModalCreateFolder()
        navigation.closeDrawer();
    }

    const renderCustomItems = ({ item }) => {
        return <ItemCustomFolder description={item.description} icon={item.icon} name={item.name} />
    }

    return (<ScrollView>
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

        <FlatList data={folders}
                  renderItem={renderCustomItems}
                  keyExtractor={(item) => item.key} />

        <Text
            variant="titleMedium"
            style={ToolbarDrawableMenuStyle.title}>
            Ações
        </Text>

        <List.Item
            title="Criar pasta"
            description="Adiciona uma nova pasta personalizada"
            left={props => <List.Icon {...props} icon="folder-plus-outline" />}
            onPress={openCreateFolderModal}
        />

        <List.Item
            title="Nota rápida"
            description="Cria uma nota simplificada"
            left={props => <List.Icon {...props} icon="notebook-plus" />}
            onPress={openCreateQuickNoteModal}
        />
    </ScrollView>)
}

export const ItemCustomFolder = ({ name, icon, description }) => {
    return <List.Item title={name}
                      left={props => <List.Icon {...props} icon={icon} />}
                      description={description} />
}

export const ToolbarDrawableMenuStyle = StyleSheet.create({
    ...GlobalStyles,
    title: {
        padding: 16,
    }
});