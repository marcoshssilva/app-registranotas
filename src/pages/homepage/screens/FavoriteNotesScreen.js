import React from "react";
import {FlatList, ScrollView} from "react-native";
import {ListItemNote} from "../../../components/list-item-note";
import {favoritesIds, fixedIds, getAllNotes} from "../../../services/firestore/notes-data";
export const FavoriteNotesScreen = () => {

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
        getAllNotes()
            .then(data => setNotes(data.filter(item => favorites.includes(item.key))))
    }

    React.useEffect( () => {
        reloadAllData()
    }, [notes])

    return <ScrollView>

        <FlatList data={notes}
                  renderItem={renderListItem}
                  keyExtractor={(item, index) => item.key}
                  />

    </ScrollView>
}