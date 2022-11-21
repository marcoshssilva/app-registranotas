import React from "react";
import {List} from "react-native-paper";

export const ListItemFolder = ({ title, onPress, checked }) => {
    return <List.Item title={title}
                      left={ (props) => <List.Icon {...props} icon="folder-multiple-outline" /> }
                      onPress={onPress}
                      right={ (props) => checked ? <List.Icon {...props} icon={'folder'} /> : <></> }
                      />

}