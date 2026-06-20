import React from 'react';
import { Dimensions, FlatList, Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';


const screentWidth = Dimensions.get('window').width;
const Carousel = ({ autoPlay, data, carouselContainer, carouselImageContainer, dotsContainer }: any) => {
  const safeMode = Array.isArray(data) ? data : [];
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const flatListRef = React.useRef<FlatList>(null);

  React.useEffect(() => {
    if (!autoPlay) return;
    if (safeMode.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex(prev => {
        const next =
          prev === safeMode.length - 1 ? 0 : prev + 1;

        return next;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [autoPlay, safeMode.length]);

  React.useEffect(() => {
    if (!flatListRef.current) return;
    const timer = setTimeout(() => {
      flatListRef.current?.scrollToOffset({
        offset: currentIndex * screentWidth,
        animated: true,
      });
    }, 50);

    return () => clearTimeout(timer);
  }, [currentIndex]);


  return (
    <>
      <FlatList
        ref={flatListRef}
        horizontal={true}
        pagingEnabled={true}
        keyExtractor={(item, index) => item?.id ? String(item.id) : String(index)}
        onMomentumScrollEnd={(event) => {
          const offsetX = event.nativeEvent.contentOffset.x;
          const index = Math.round(offsetX / screentWidth)
          setCurrentIndex(index)
        }}
        data={safeMode}
        renderItem={({ item }) => (
          <TouchableOpacity activeOpacity={0.6} style={[styles.carouselContainer, carouselContainer]}>
            <Image
              source={{ uri: item?.image?.url || item?.url }}
              style={[styles.carouselImageContainer, carouselImageContainer]}
            />
          </TouchableOpacity>
        )}
      />

      {/* dots */}
      <View style={[styles.dotsContainer, dotsContainer]}>
        {
          safeMode.map((_, index) => (
            <View key={index} style={[styles.dot, { backgroundColor: currentIndex === index ? 'red' : '#ccc' }]} />
          ))
        }
      </View>
    </>
  );
}

export default Carousel;

const styles = StyleSheet.create({
  carouselContainer: {
    width: screentWidth,
  },
  carouselImageContainer: {
    width: '100%',
    height: verticalScale(220),
    resizeMode: 'cover',
  },
  dotsContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: scale(8),
  },
  dot: {
    width: scale(10),
    height: scale(10),
    borderRadius: scale(5),
    backgroundColor: '#ccc',
  },
})
