import { StyleSheet } from "react-native";
import { scale, verticalScale } from "react-native-size-matters";

const styles = StyleSheet.create({
    productContainer: {
        flex: 1,
    }, 
    bodyContainer: {
        flex: 1,
    },
    similarProduct: {
        marginHorizontal: scale(10),
        marginTop: verticalScale(24),
        marginBottom: verticalScale(8),
        fontWeight: 'bold',
    }
});
export default styles;