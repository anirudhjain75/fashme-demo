import React from 'react';
import {SafeAreaView, Image, Text, TouchableOpacity, View} from 'react-native';

const ItemMainPage = ({item, closeFunc}) => {
  return (
    <SafeAreaView style={styles.ContainerStyle}>
      <View style={styles.ViewStyle}>
        <Image
          source={{uri: 'https://image.tmdb.org/t/p/w200/' + item.poster_path}}
          resizeMethod={'scale'}
          style={styles.ImageStyle}
        />
        <View style={styles.TextContainer}>
          <Text style={styles.TextHeaderStyle}>{item.title}</Text>
          <Text style={styles.TextBodyStyle}>{item.overview}</Text>
        </View>
      </View>
      <TouchableOpacity
        onPress={closeFunc}
        style={{
          alignSelf: 'center',
          marginTop: 10,
          paddingTop: 10,
          marginBottom: 10,
          paddingRight: 20,
          paddingLeft: 20,
          borderWidth: 1,
          borderColor: 'grey',
          borderRadius: 10,
        }}>
        <Text style={{...styles.TextHeaderStyle, fontSize: 20}}>{'Close'}</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = {
  ContainerStyle: {
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 20,
    marginBottom: 10,
    marginLeft: 5,
    marginRight: 5,
  },
  ImageStyle: {
    height: 300,
    width: 200,
    borderRadius: 20,
    marginTop: 10,
  },
  ViewStyle: {
    paddingTop: 20,
    flexDirection: 'row',
    marginLeft: 20,
  },
  TextHeaderStyle: {
    color: 'white',
    fontSize: 25,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
    fontFamily: 'Pacifico',
  },
  TextBodyStyle: {
    color: 'white',
    fontSize: 15,
    paddingLeft: 10,
    paddingRight: 10,
    fontFamily: 'JosefinSans-Regular',
  },
  TextContainer: {
    width: 190,
  },
};

export default ItemMainPage;
