import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    firstcontaier: {
        flexDirection: 'row',
        gap: 20,
        margin: 10,
        padding: 8,
        borderRadius: 10,
        elevation: 2
    },
    imageStyle: {
        width: 100,
        height: 100,
        borderRadius: 10,
        resizeMode: 'cover',
    },
    firstcontainerChild: {
        flex: 1,
        gap: 2,
    },
    secondcontainer: {
        flex: 1,
        gap: 6,
        margin: 10,
        padding: 8,
        borderRadius: 10,
        elevation: 2
    },
    thirdcontainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 6,
        padding: 10,
        borderRadius: 10,
        elevation: 2
    },
    fourthContainer: {
        flex: 1,
        margin: 10,
        gap: 10
    }
});


export default styles;