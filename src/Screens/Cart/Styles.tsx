import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    cartContainer: {
        flex: 1,
    },
    bodyContainer: {
        flex: 1,
    },
    footerContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 10,
        borderTopWidth: 1,
        borderTopColor: '#ccc',
        zIndex: 0,
    }
});
export default styles;