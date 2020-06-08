import React from "react";
import { StyleSheet, Text, View, TextInput, Button, Slider, ScrollView } from "react-native";
import moment from "moment";

import Amplify from "@aws-amplify/core";
import config from "../aws-exports";
Amplify.configure(config);

import API, { graphqlOperation } from "@aws-amplify/api";

const listDiaryEntrys = `
  query {
    listDiaryEntrys {
      items {
        id
        title
        body
        score
        createdAt
      }
    }
 }
`
const createDiaryEntry = `
  mutation($title: String!, $body: String, $score: Int!) {
    createDiaryEntry(input: {
      title: $title
      body: $body
      score: $score
  }) {
    id
    title
    body
    score
  }
}`

class App extends React.Component {
  state = {
    title: "",
    body: "",
    score: 0,
    DiaryEntrys: []
  };
  async componentDidMount() {
    try {
      const graphqldata = await API.graphql(graphqlOperation(listDiaryEntrys));
      console.log("graphqldata:", graphqldata);
      this.setState({
        DiaryEntrys: graphqldata.data.listDiaryEntrys.items,
      });
    } catch (err) {
      console.log("error: ", err);
    }
  }
  onChangeText = (key, val) => {
    this.setState({
      [key]: val,
    });
  };

  change(score) {
    this.setState(() => {
      return {
        score: parseFloat(score)
      };
    });
  }
  createDiaryEntry = async () => {
    const DiaryEntry = this.state;
    if (DiaryEntry.name === "" || DiaryEntry.description === "") return;
    const DiaryEntrys = [...this.state.DiaryEntrys, DiaryEntry];
    this.setState({
      DiaryEntrys,
      title: "",
      body: "",
      score: "",
    });
    try {
      await API.graphql(graphqlOperation(createDiaryEntry, DiaryEntry));
      console.log("Diary Entry successfully created.");
    } catch (err) {
      console.log("error creating Diary Entry...", err);
    }
  };
  render() {
    // const { value } = this.state;
    return (
      
      <View style={styles.container}>
        <Text style={styles.text}>{String(this.state.score)}</Text>
        <Slider
          step={1}
          maximumValue={10}
          onValueChange={this.change.bind(this)}
          value={this.state.score}
        />
        <TextInput
          style={styles.input}
          onChangeText={val => this.onChangeText("title", val)}
          placeholder="Entry Title"
          value={this.state.title}
        />
        <TextInput
          style={styles.input}
          onChangeText={val => this.onChangeText("body", val)}
          placeholder="Entry Body"
          value={this.state.body}
        />
        
        <Button onPress={this.createDiaryEntry} title="Add Entry" />
        <ScrollView style={styles.scrollView}>
        {
          this.state.DiaryEntrys.map((DiaryEntry, index) => (
            <View key={index} style={styles.item}>
              <Text style={styles.title}>{moment(DiaryEntry.createdAt).format('ddd MMMM Do')}</Text>
              <Text style={styles.title}>{DiaryEntry.title}</Text>
              <Text style={styles.body}>{DiaryEntry.body}</Text>
              <Text style={styles.score}>{DiaryEntry.score}</Text>
            </View>
          ))
        }
        </ScrollView>
      </View>
      
    );
  }
}

export default App

const styles = StyleSheet.create({
  input: {
    height: 45,
    borderBottomWidth: 2,
    borderBottomColor: "black",
    marginVertical: 10,
  },
  item: {
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    paddingVertical: 10,
  },
  name: {
    fontSize: 16,
  },
  description: {
    color: "rgba(0, 0, 0, .5)",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 10,
    paddingTop: 50,
  },
});
