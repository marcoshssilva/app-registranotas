import { Component } from "react";
import { firestore } from "@react-native-firebase/firestore";

import { FAB } from 'react-native-paper';
import { SafeAreaView, TextInput } from "react-native";

import { ViewNotePageStyles } from "./style";

export class ViewNotePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            note: {
                key: null,
                title: '',
                data: '',
                foldersKeys: [],
                isFavorite: false,
                createAt: null,
                lastUpdate: null,
            },
            editable: false,
        }

        this.toogleEditable = () => {
            let editable = this.state.editable
            this.setState({ editable: !editable })
        }
    }

    componentDidCatch() { }

    componentDidMount() { }
    
    componentDidUpdate() { }
    
    componentWillUnmount() { }

    render() {
        return <SafeAreaView style={{...ViewNotePageStyles.container}}>

            <TextInput 
                style={{...ViewNotePageStyles.noteTextAreaTitle}}
                placeholder={'Título'}
                onChangeText={(text) => this.setState({'note.title': text })}
                editable={this.state.editable}
                defaultValue={this.state.note.title}
                />

            <TextInput 
                style={{...ViewNotePageStyles.noteTextAreaDescription}}
                multiline={true}
                placeholder={'Digite aqui sua nota...'}
                onChange={(e) => this.setState({'note.description': e.target.value })}
                editable={this.state.editable}
                defaultValue={this.state.note.data}
                />

            <FAB
                style={{...ViewNotePageStyles.fabEditableIcon}}
                icon={this.state.editable ? 'pencil' : 'pencil-off-outline'}
                onPress={this.toogleEditable}
                />

            <FAB
                style={{...ViewNotePageStyles.fabSaveNote}}
                icon={'content-save-all-outline'}
                onPress={this.toogleEditable}
                />

        </SafeAreaView>
    }
}