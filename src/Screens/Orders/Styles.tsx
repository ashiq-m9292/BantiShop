import { StyleSheet } from "react-native";
import { moderateScale, scale } from "react-native-size-matters";

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    mainContainer: {
        margin: moderateScale(10),
        padding: moderateScale(10),
        elevation: 2,
        borderRadius: 8,
        gap: moderateScale(20)

    },
    bodyContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    leftContainer: {
        // flex: 1,
        width: '70%',
        // alignItems: 'flex-start',
        marginRight: scale(10),
        gap: moderateScale(20)
    },
    rightContainer: {
        flex: 1,
        alignItems: 'flex-end',
        gap: moderateScale(20)
    }
});
export default styles;