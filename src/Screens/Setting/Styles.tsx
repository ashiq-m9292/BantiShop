import { StyleSheet } from "react-native";
import { moderateScale, scale } from "react-native-size-matters";

const styles = StyleSheet.create({
    settingContainer:  {
        flex: 1,
    },
    bodyContainer: {
        flex: 1,
        gap: moderateScale(14),
        paddingHorizontal: scale(10),
    }
});
export default styles;