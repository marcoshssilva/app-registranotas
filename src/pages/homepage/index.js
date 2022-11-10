import React from 'react';
import {Styles} from "./style";

import auth from "@react-native-firebase/auth";
import {createDocumentData, getDocumentData} from "../../services/firestore/document-data";
import {createDrawerNavigator} from '@react-navigation/drawer';

import {ToolbarDrawableMenu} from "../../components/toolbar-drawable-menu";
import {PrincipalPanelScreen} from "./screens/PrincipalPanelScreen";
import {AllNotesScreen} from "./screens/AllNotesScreen";
import {FavoriteNotesScreen} from "./screens/FavoriteNotesScreen";
import {FilteredFolderNotesScreen} from "./screens/FilteredFolderNotesScreen";

const Drawer = createDrawerNavigator();

const Homepage = ({navigation, route}) => {
    getDocumentData(auth().currentUser.email).then((onComplete) => { if (!onComplete.exists) createDocumentData(auth().currentUser.email);})
    return (
        <Drawer.Navigator
            drawerContent={(props) => <ToolbarDrawableMenu {...props} />} >
            <Drawer.Screen
                name="PrincipalPanel"
                component={PrincipalPanelScreen}
                options={{title: 'Painel Principal'}}
            />

            <Drawer.Screen
                name="AllNotes"
                component={AllNotesScreen}
                options={{title: 'Todas as notas'}}
            />

            <Drawer.Screen
                name="FavoriteNotes"
                component={FavoriteNotesScreen}
                options={{title: 'Favoritos'}}
            />

            <Drawer.Screen
                name="Filtered"
                component={FilteredFolderNotesScreen}
            />
        </Drawer.Navigator>
    )
}

export default Homepage;
