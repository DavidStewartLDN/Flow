import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Button, Card, Title, TextInput } from 'react-native-paper';

import {
  Platform,
  StyleSheet,
  View,
} from 'react-native';

import { ScrollView } from 'react-native-gesture-handler';

const DiaryScreen = () => {
  const [diaryEntries, setDiaryEntries] = useState([]);
  const [formInput, setFormInput] = useState('');

  const getDiaryEntries = () => {
    axios
      .get('http://localhost:5000/diary_entries')
      .then((response) => setDiaryEntries(response.data))
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    getDiaryEntries();
  }, []);

  const postDiaryEntry = () => {
    axios
      .post('http://localhost:5000/diary_entries/1', {
        entry: formInput,
      })
      .catch((error) => {
        alert('Please try again later');
        console.error(error);
      });
  };

  const handleSubmit = () => {
    postDiaryEntry();
    getDiaryEntries();
  };

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.flatList}
      >
        <View>
          <TextInput
            label="Enter a new Diary entry..."
            value={formInput}
            onChangeText={(formInput) => setFormInput(formInput)}
          />
          <Button onPress={handleSubmit}>Submit</Button>
        </View>
        <View>
          {diaryEntries.map((diaryEntry) => {
            return (
              <Card key={diaryEntry.entry_id} style={styles.diaryContainer}>
                <Card.Content>
                  <Title children={diaryEntry.entry} />
                </Card.Content>
              </Card>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  card: {
    marginHorizontal: 20,
    height: 20,
    justifyContent: 'center',
    padding: 5,
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  diaryContainer: {
    alignItems: 'center',
    marginHorizontal: 0,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});
export default DiaryScreen;
