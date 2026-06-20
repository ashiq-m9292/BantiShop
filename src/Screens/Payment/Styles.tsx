import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    text: {
      
    },
    bodyContainer: {
        margin: 10,
        gap: 30
    },
    Codcontainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 16,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
    },
    bottomContainer: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderTopColor: '#ccc',
    },
});

export default styles;