import React from "react";
import {FlatList, ScrollView} from "react-native";
import {Avatar, Card, Paragraph} from "react-native-paper";
import {ListItemNote} from "../../../components/list-item-note";
import {favoritesIds, fixedIds, getAllNotes, getAllNotesByFolderKey} from "../../../services/firestore/notes-data";

const LeftContent = props => <Avatar.Icon {...props} icon="folder" />

export const FilteredFolderNotesScreen = ({ route, key }) => {

    const [favorites, setFavorites] = React.useState([])
    const [fixeds, setFixeds] = React.useState([])
    const [notes, setNotes] = React.useState([])

    const renderListItem = ({ item }) => {
        return <ListItemNote
            note={item}
            isFavorite={favorites.includes(item.key)}
            isFixed={fixeds.includes(item.key)}
        />
    }

    const reloadAllData = () => {
        favoritesIds()
            .then(data => setFavorites(data))
        fixedIds()
            .then(data => setFixeds(data))
        getAllNotesByFolderKey(route.params.folder.key)
            .then(data => setNotes(data))
    }

    React.useEffect( () => {
        reloadAllData()
    }, [notes])

    return <ScrollView>

        <Card>
            <Card.Title title={route.params.folder.name} left={LeftContent} />
            <Card.Content>
                <Paragraph>
                    { route.params.folder.description ? route.params.folder.description : 'Sem descrição da pasta personalizada.'}
                </Paragraph>
            </Card.Content>
        </Card>

        <FlatList data={notes} renderItem={renderListItem} keyExtractor={(item, index) => item.key} />

    </ScrollView>
}