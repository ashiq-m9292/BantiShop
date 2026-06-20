import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    bodyContainer: {
        borderRadius: 8,
        elevation: 2,
        padding: 16,
        margin: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    textContainer: {
        flex: 1,
        gap: 4,
    },
    iconContainer: {
        justifyContent: 'space-between',
        marginLeft: 10,
    },
    plusIconContainer: {
        position: 'absolute',
        bottom: 80,
        right: 40,
        width: 80,
        height: 80,
        borderRadius: 40,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    }
});

export default styles;