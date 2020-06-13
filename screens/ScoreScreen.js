import React from "react";
import { StyleSheet, Text, View, TextInput, Button, Slider, ScrollView, Dimensions } from "react-native";
import moment from "moment";

import Amplify from "@aws-amplify/core";
import config from "../aws-exports";
Amplify.configure(config);

import API, { graphqlOperation } from "@aws-amplify/api";
import {
  LineChart,
} from "react-native-chart-kit";

const listDiaryEntrys = `
  query GetByCreatedAt {
    getDiaryEntrysByCreatedAt(type: "Set", sortDirection: DESC) {
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

class App extends React.Component {
  state = {
    DiaryEntrys: [],
    data: [0]
  };
  async componentDidMount() {
    try {
      const graphqldata = await API.graphql(graphqlOperation(listDiaryEntrys));
      console.log("graphqldata:", graphqldata);
      this.setState({
        DiaryEntrys: graphqldata.data.getDiaryEntrysByCreatedAt.items,
        data: graphqldata.data.getDiaryEntrysByCreatedAt.items.map(entry => entry.score),
        // data: DiaryEntrys.map(entry => entry.score)
      });
    } catch (err) {
      console.log("error: ", err);
    }
  }

  chooseData(){
    if (this.state.data.length === 0){
      this.state.data = [0]
    }
  }

  render() {
    this.chooseData();
    console.log(this.state.data)
    // const { value } = this.state;
    return (
      
      <View style={styles.container}>
        {/* <View> */}
          {/* <Text>Scores</Text> */}
        <LineChart
          data={{
            datasets: [
              {
                data: this.state.data.reverse()
              }
            ]
          }
          }
      
          width={Dimensions.get("window").width-8} // from react-native
          height={220}
          yAxisSuffix=""
          yAxisInterval={1} // optional, defaults to 1
          chartConfig={{
            backgroundColor: "#e26a00",
            backgroundGradientFrom: "#fb8c00",
            backgroundGradientTo: "#ffa726",
            decimalPlaces: 0, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 10
            },
            propsForDots: {
              r: "6",
              strokeWidth: "2",
              stroke: "#ffa726"
            }
          }}
          bezier
          style={{
            borderRadius: 8
          }}
        />
        {/* </View> */}
        <ScrollView>
        {
          this.state.DiaryEntrys.map((DiaryEntry, index) => (
            <View key={index} style={styles.item}>
              <View style={styles.leftFlex}>
                <Text style={styles.date}>{moment(DiaryEntry.createdAt).format('ddd MMMM Do')}</Text>
                <Text style={styles.title}>{DiaryEntry.title}</Text>
                <Text style={styles.body}>{DiaryEntry.body}</Text>
              </View>
              <View style={styles.rightFlex}>
                <Text style={styles.scoreText}>{DiaryEntry.score}</Text>
              </View>
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
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start'
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
    paddingHorizontal: 4,
    paddingTop: 40,
  },
  title: {
    fontWeight: "bold",
    fontSize: 16
  },
  date: {
    fontWeight: "bold",
    fontSize: 20
  },
  splitFlex: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
  },
  leftFlex: {
    width: '85%',
  },
  rightFlex: {
    width: '15%',
  },
  body: {
    fontStyle: 'italic',
  },
  scoreText: {
    fontSize: 50,
    textAlign: 'center',
  },
  ratingText: {
    fontSize: 36,
    textAlign: 'center',
  },
  question: {
    textAlign: 'center',
    fontSize: 20,
  },
});
