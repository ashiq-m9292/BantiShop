import { StyleSheet } from "react-native";
import { moderateScale } from "react-native-size-matters";

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    avoidingContainer: {
        flex: 1,
    },
    signupContainer: {
        margin: moderateScale(10),
        flex: 1,

    },
    bodyContainer: {
        gap: moderateScale(10),
    },
});

export default styles;