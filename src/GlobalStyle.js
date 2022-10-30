import { StyleSheet } from "react-native";
import theme from './theme';

export const GlobalStyles = StyleSheet.create({
    containerCentered: {
        marginHorizontal: 48,
        marginVertical: '40%'
    },
    headerLogo: {
        alignSelf: 'center'
    },
    headerTitle: {
        textAlign: 'left'
    },
    boxField: {
        marginBottom: 16
    },
    textEnd: {
        textAlign: 'right',
        paddingEnd: 16
    },
    rowItensField: {
        flexDirection: 'row',
        justifyContent: "center",
        alignItems: 'center'
    },
    alignEnd: {
        justifyContent: 'flex-end',
    },
    alignCenter: {
        justifyContent: 'center',
    },
    alignLeft: {
        justifyContent: 'flex-start'
    },
    textEmphasis: {
        fontWeight: 'bold',
        color: theme.colors.primary
    }
});
