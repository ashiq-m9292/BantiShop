import { StyleSheet } from "react-native";
import { scale, verticalScale } from "react-native-size-matters";

const styles = StyleSheet.create({
    searchScreenContainer: {
        flex: 1
    },
    headerContainer: {
        marginHorizontal: scale(10),
        marginVertical: verticalScale(20)
    }
});

export default styles;