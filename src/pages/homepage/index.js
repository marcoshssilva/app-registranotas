import React from 'react';
import {View} from 'react-native'
import auth from "@react-native-firebase/auth";
import {createDocumentData, getDocumentData} from "../../services/firestore/document-data";
import {createDrawerNavigator} from '@react-navigation/drawer';

import {ToolbarDrawableMenu} from "../../components/toolbar-drawable-menu";
import {PrincipalPanelScreen} from "./screens/PrincipalPanelScreen";
import {AllNotesScreen} from "./screens/AllNotesScreen";
import {FavoriteNotesScreen} from "./screens/FavoriteNotesScreen";
import {FilteredFolderNotesScreen} from "./screens/FilteredFolderNotesScreen";
import {ToolbarMenuRight, ToolbarMenuRightStyle} from "../../components/toolbar-menu-right";
import {GlobalStyles} from "../../GlobalStyle";
import {showModalCreateFolder} from "../../components/modal-create-folder";
import {showModalCreateNotes} from "../../components/modal-create-notes";

const Drawer = createDrawerNavigator();

const Homepage = ({navigation, route}) => {
    getDocumentData(auth().currentUser.email).then((onComplete) => { if (!onComplete.exists) createDocumentData(auth().currentUser.email);})
    return (
        <Drawer.Navigator
            drawerContent={(props) => <ToolbarDrawableMenu {...props} />} >
            <Drawer.Screen
                name="PrincipalPanel"
                component={PrincipalPanelScreen}
                options={{
                    title: 'Painel Principal',
                    headerRight: (props) => <View style={GlobalStyles.rowItensField} {...props}>
                        <ToolbarMenuRight
                            icon={'notebook-plus'}
                            onPress={() => showModalCreateNotes()} />

                        <ToolbarMenuRight
                            style={ToolbarMenuRightStyle.marginAlignTopToolbar}
                            icon={'folder-plus-outline'}
                            onPress={() => showModalCreateFolder()} />
                    </View>
                }}
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
