import React from "react";
import {FlatList, ScrollView} from "react-native";
import {favoritesIds, fixedIds, getAllNotes} from "../../../services/firestore/notes-data";
import {ListItemNote} from "../../../components/list-item-note";

export const AllNotesScreen = ({ navigation }) => {

    const [notes, setNotes] = React.useState([])
    const [favorites, setFavorites] = React.useState([])
    const [fixeds, setFixeds] = React.useState([])

    const reloadAllData = () => {
        favoritesIds()
            .then(data => setFavorites(data))
        fixedIds()
            .then(data => setFixeds(data))
        getAllNotes()
            .then(data => setNotes(data))
    }

    React.useEffect( () => {
        reloadAllData()
    }, [notes])

    const renderListItem = ({ item }) => {
        return <ListItemNote
                        note={item}
                        isFavorite={favorites.includes(item.key)}
                        isFixed={fixeds.includes(item.key)}
                        />
    }

    return <ScrollView>

            <FlatList data={notes}
                      renderItem={renderListItem}
                      keyExtractor={(item, index) => item.key}
                      />

        </ScrollView>
}