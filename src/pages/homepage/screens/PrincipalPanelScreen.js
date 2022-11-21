import React from "react";
import {
    ScrollView
} from "react-native-gesture-handler";

import {
    Card,
    Avatar, Divider
} from "react-native-paper";
import {FlatList} from "react-native";
import {ListItemNote} from "../../../components/list-item-note";
import {favoritesIds, fixedIds, getAllNotes} from "../../../services/firestore/notes-data";
import {ItemCustomFolder} from "../../../components/toolbar-drawable-menu";
import {getAllFolders} from "../../../services/firestore/folders-data";


const LeftContentPin = props => <Avatar.Icon {...props} icon="pin" />
const LeftContentFolder = props => <Avatar.Icon {...props} icon="folder" />

export const PrincipalPanelScreen = () => {

    const [favorites, setFavorites] = React.useState([])
    const [fixeds, setFixeds] = React.useState([])
    const [notes, setNotes] = React.useState([])
    const [folders, setFolders] = React.useState([])

    const renderListItem = ({ item }) => {
        return <ListItemNote
            note={item}
            isFavorite={favorites.includes(item.key)}
            isFixed={fixeds.includes(item.key)}
        />
    }

    const renderCustomItemsOfFolders = ({ item }) => {
        return <ItemCustomFolder description={item.description} icon={item.icon} name={item.name} item={item} />
    }

    const reloadAllData = () => {
        favoritesIds()
            .then(data => setFavorites(data))
        fixedIds()
            .then(data => setFixeds(data))
        getAllNotes()
            .then(data => setNotes(data.filter(item => fixeds.includes(item.key))))
        getAllFolders()
            .then(data => setFolders(data))
    }

    React.useEffect( () => {
        reloadAllData()
    }, [notes])

    return <ScrollView>
        <Card>
            <Card.Title title="Fixados" subtitle="Suas notas fixadas" left={LeftContentPin} />
            <Card.Content>
                <FlatList data={notes} renderItem={renderListItem} />
            </Card.Content>
        </Card>

        <Divider />

        <Card>
            <Card.Title title="Pastas" subtitle="Pastas personalizadas com suas notas" left={LeftContentFolder} />
            <Card.Content>
                <FlatList data={folders} renderItem={renderCustomItemsOfFolders} />
            </Card.Content>
        </Card>

    </ScrollView>
}
