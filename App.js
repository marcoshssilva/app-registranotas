import React from 'react';
import RootNavigator from "./navigation";
import {Provider as PaperProvider, MD3LightTheme as DefaultTheme} from "react-native-paper";

const theme = {
    ...DefaultTheme
};

const App = () => (
    <PaperProvider theme={theme}>
        <RootNavigator />
    </PaperProvider>
);
export default App;
