import React from 'react';
import {
  SafeAreaView,
  TextInput,
  Text,
  ScrollView,
  FlatList,
} from 'react-native';
import ListItem from './components/ListItem';
import ItemMainPage from './components/ItemMainPage';

const App = () => {
  let [text, setText] = React.useState('');
  let [searchRes, setSearchRes] = React.useState({});
  let [openRes, setOpenRes] = React.useState(false);
  let [popular, setPopular] = React.useState([]);
  let [weekly, setWeekly] = React.useState([]);
  let [daily, setDaily] = React.useState([]);
  let [dailyCount, setDailyCount] = React.useState(2);
  let [weeklyCount, setWeeklyCount] = React.useState(2);
  let [popularCount, setPopularCount] = React.useState(2);
  React.useEffect(() => {
    fetch(
      'https://api.themoviedb.org/3/movie/popular?api_key=a907a1c2ad903ae8fd64573003d9ea0b&language=en-US&page=1',
    )
      .then(response => response.json())
      .then(data => {
        setPopular(data.results);
      });
    fetch(
      'https://api.themoviedb.org/3/movie/now_playing?api_key=a907a1c2ad903ae8fd64573003d9ea0b&language=en-US&page=1',
    )
      .then(response => response.json())
      .then(data => {
        setDaily(data.results);
      });
    fetch(
      'https://api.themoviedb.org/3/movie/top_rated?api_key=a907a1c2ad903ae8fd64573003d9ea0b&language=en-US&page=1',
    )
      .then(response => response.json())
      .then(data => {
        setWeekly(data.results);
      });
  }, []);
  return (
    <SafeAreaView style={styles.mainView}>
      <ScrollView>
        <TextInput
          placeholder={'Search For Movies'}
          placeholderTextColor={'black'}
          onChangeText={e => {
            setText(e);
          }}
          onSubmitEditing={() => {
            fetch(
              'https://api.themoviedb.org/3/search/movie?api_key=a907a1c2ad903ae8fd64573003d9ea0b&language=en-US&query=' +
                text +
                '&page=1&include_adult=false',
            )
              .then(response => response.json())
              .then(result => {
                setSearchRes(result.results[0]);
                setOpenRes(true);
              });
          }}
          value={text}
          style={styles.search}
        />
        {openRes && searchRes ? (
          <ItemMainPage item={searchRes} closeFunc={() => setOpenRes(false)} />
        ) : null}
        <Text style={{...styles.headings, fontFamily: 'Pacifico'}}>
          {'Trending Daily'}
        </Text>
        <FlatList
          horizontal={true}
          data={daily}
          style={styles.horizontalList}
          keyExtractor={item => item.id.toString()}
          onEndReached={() => {
            fetch(
              'https://api.themoviedb.org/3/movie/now_playing?api_key=a907a1c2ad903ae8fd64573003d9ea0b&language=en-US&page=' +
                dailyCount,
            )
              .then(response => response.json())
              .then(data => {
                if (data.results.length > 0) {
                  setDaily(daily.concat(data.results));
                }
              });
            setDailyCount(dailyCount + 1);
          }}
          onEndReachedThreshold={0.5}
          renderItem={({item}) => (
            <ListItem
              item={item}
              index={item.id}
              setOpenRes={setOpenRes}
              setSearchRes={setSearchRes}
            />
          )}
        />
        <Text style={{...styles.headings, fontFamily: 'Pacifico'}}>
          {'Trending Weekly'}
        </Text>
        <FlatList
          horizontal={true}
          data={weekly}
          style={styles.horizontalList}
          keyExtractor={item => item.id.toString()}
          onEndReached={() => {
            fetch(
              'https://api.themoviedb.org/3/movie/top_rated?api_key=a907a1c2ad903ae8fd64573003d9ea0b&language=en-US&page=' +
                weeklyCount,
            )
              .then(response => response.json())
              .then(data => {
                if (data.results.length > 0) {
                  setWeekly(weekly.concat(data.results));
                }
              });
            setWeeklyCount(weeklyCount + 1);
          }}
          onEndReachedThreshold={0.5}
          renderItem={({item}) => (
            <ListItem
              item={item}
              index={item.id}
              setOpenRes={setOpenRes}
              setSearchRes={setSearchRes}
            />
          )}
        />
        <Text style={{...styles.headings, fontFamily: 'Pacifico'}}>
          {'Popular'}
        </Text>
        <FlatList
          horizontal={true}
          data={popular}
          style={styles.horizontalList}
          keyExtractor={item => item.id.toString()}
          onEndReached={() => {
            fetch(
              'https://api.themoviedb.org/3/movie/popular?api_key=a907a1c2ad903ae8fd64573003d9ea0b&language=en-US&page=' +
                popularCount,
            )
              .then(response => response.json())
              .then(data => {
                if (data.results.length > 0) {
                  setPopular(popular.concat(data.results));
                }
              });
            setPopularCount(popularCount + 1);
          }}
          onEndReachedThreshold={0.5}
          renderItem={({item}) => (
            <ListItem
              item={item}
              index={item.id}
              setOpenRes={setOpenRes}
              setSearchRes={setSearchRes}
            />
          )}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = {
  search: {
    paddingLeft: 10,
    marginLeft: 20,
    paddingTop: 5,
    marginTop: 10,
    paddingBottom: 5,
    marginBottom: 10,
    paddingRight: 10,
    marginRight: 20,
    borderWidth: 2,
    height: 50,
    backgroundColor: 'white',
    borderRadius: 20,
  },
  horizontalList: {
    height: 260,
    borderWidth: 2,
    marginLeft: 10,
    marginRight: 10,
  },
  mainView: {
    backgroundColor: '#000',
  },
  headings: {
    color: 'white',
    fontWeight: '700',
    fontSize: 25,
    marginLeft: 15,
    marginBottom: 10,
    fontStyle: 'italic',
  },
};

export default App;
