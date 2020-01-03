import React from 'react';
import {Image, Text, TouchableOpacity} from 'react-native';

const ListItem = ({item, index, setOpenRes, setSearchRes}) => {
  return (
    <TouchableOpacity
      style={{width: 150, borderColor: 'white'}}
      index={index}
      onPress={() => {
        setOpenRes(true);
        setSearchRes(item);
      }}>
      <Image
        source={{
          uri: 'https://image.tmdb.org/t/p/w200/' + item.poster_path,
        }}
        resizeMethod={'scale'}
        style={{
          height: 200,
          width: 'auto',
          borderRadius: 10,
          marginLeft: 10,
          marginTop: 5,
          marginRight: 10,
          marginBottom: 5,
        }}
      />
      <Text
        style={{
          paddingLeft: 10,
          color: 'white',
          fontFamily: 'JosefinSans-Bold',
        }}>
        {item.title}
      </Text>
    </TouchableOpacity>
  );
};

export default ListItem;
