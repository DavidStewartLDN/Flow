import React from "react";
import { StyleSheet, View, ScrollView, Text } from "react-native";
import * as WebBrowser from 'expo-web-browser';
import ChatBot from 'react-native-chatbot-expo';
import DiaryEntryForm from '../components/DiaryEntryForm'

function ChatScreen(){

  const steps = [
    {
      id: 'welcome',
      message: "Hello, how are you feeling now?",
      trigger: 'welcomeOptions',
    },
    {
      id: 'welcomeOptions',
      options: [
        { value: 1, label: 'happy', trigger: 'happy' },
        { value: 2, label: 'sad', trigger: 'sad' },
      ],
    },
    {
      id: 'happy',
      message: 'Glad to hear that',
      trigger: 'diaryQuestion'
    },
    {
      id: 'sad',
      message: 'I am sorry to hear that, what describes your emotions better?',
      trigger: 'sadOptions'
    },
    {
      id: 'sadOptions',
      options: [
        { value: 1, label: 'anxious', trigger: 'anxious' },
        { value: 2, label: 'depressed', trigger: 'depressed' },
        { value: 3, label: 'stressed', trigger: 'stressed' },
      ],
    },
    {
      id: 'anxious',
      component:<Text
      onPress={() => WebBrowser.openBrowserAsync('https://www.youtube.com/watch?v=Wdbbtgf05Ek')}>
        Click on this message to watch breathing techniques video
      </Text>,
      asMessage: true,
      trigger: 'diaryQuestion'
    },
    {
      id: 'depressed',
      component:<Text
      onPress={() => WebBrowser.openBrowserAsync('https://unleashyourpotential.org.uk/how-i-let-go-of-depression-with-time-line-therapy/')}>
        Click on this message to read about using Time Line Therpay for easing depression but letting go of negative emotions
      </Text>,
      asMessage: true,
      trigger: 'diaryQuestion'
    },
    {
      id: 'stressed',
      component:<Text
      onPress={() => WebBrowser.openBrowserAsync('https://www.globalnlptraining.com/blog/5-easy-ways-reduce-stress-using-nlp/')}>
        Click on this message to read about reducing stress by dissociating from the stress
      </Text>,
      asMessage: true,
      trigger: 'diaryQuestion'
    },
    {
      id: 'diaryQuestion',
      message: "Would you like to make a diary entry?",
      trigger: 'diaryQuestionOptions',
    },
    {
      id: 'diaryQuestionOptions',
      options: [
        { value: 1, label: 'Yes', trigger: 'diaryEntry' },
        { value: 2, label: 'No, just here to talk', trigger: 'talk' },
      ],
    },
    {
      id: 'diaryEntry',
      message: 'Fill in your diary with however you are feeling at the moment!',
      trigger: 'scoreForDay',
    },
    // {
    //   id: 'scoreForDay',
    //   user: true,
    //   validator: (value) => {
    //     if (isNaN(value)) {
    //       return 'value should be a number';
    //     }
    //     return true;
    //   },
    //   trigger: 'test',
    // },
    {
      id: 'scoreForDay',
      component: <DiaryEntryForm/>,
      // waitAction: true,
      trigger: 'thanks',
    },
    {
      id: 'talk',
      message: 'I am just learning to speak at the moment, please come back soon',
      end: true,
    },
    {
      id: 'thanks',
      message: "Let's stop there for now",
      end: true,
    },
    // {
    //   id: 'happy-options',

    //   options: [
    //     {
    //       value: 1,
    //       label: 'Yes',
    //       trigger: 'happy-resources',
    //     },
    //     { value: 2, label: 'No Thanks :)', trigger: 'happy-end' },
    //   ],
    // },
    // {
    //   id: 'happy-end',
    //   message:
    //     'Thanks for coming to talk today, looking forward to speaking soon :)',
    //   end: true,
    // },
    // {
    //   id: 'happy-resources',
    //   message:
    //     'Check out these self care tips from Mind UK for keeping your mood up:\nMind uk (mind.org.uk) suggest some self care tips\nSelf-care\nDoing little things to look after your wellbeing can be really important.\nIt might be:\n* getting enough sleep\n* doing something you find relaxing, like listening to music or watching your favourite film\n* doing something you enjoy, like a favourite hobby or spending time with people you love * spending time in nature, like going for a walk or visiting a local park \n* getting active by going for a run, bike ride or playing a sport you enjoy.',
    //   end: true,
    // },
    // {
    //   id: 'unhappy',
    //   message:
    //     "I'm sorry to hear that, which of the following best describes how you're feeling?",
    //   trigger: 'unhappyOptions',
    // },
    // {
    //   id: 'unhappyOptions',
    //   options: [
    //     { value: 1, label: "I'm Anxious", trigger: 'anxiousResources' },
    //     { value: 2, label: 'Feeling Low', trigger: 'low' },
    //   ],
    // },
    // {
    //   id: 'anxiousResources',
    //   message: 'Would you like self help resources or someone to talk to?',
    //   trigger: 'anxious',
    // },
    // {
    //   id: 'anxious',
    //   options: [
    //     { value: 1, label: 'Self Help', trigger: 'anxious-self-help' },
    //     {
    //       value: 2,
    //       label: 'Someone to talk to',
    //       trigger: 'anxious-someone-to-talk-to',
    //     },
    //   ],
    // },
    // {
    //   id: 'anxious-someone-to-talk-to',
    //   message: `Checkout Anxiety UK:  
    //     http://www.anxietyuk.org.uk
    //     Phone: 03444 775 774 (Monday to Friday, 9.30am to 10pm; Saturday to Sunday, 10am to 8pm)`,
    //   end: true,
    // },
    // {
    //   id: 'anxious-self-help',
    //   message:
    //     'Corona Virus induced anxiety is common check out this blog on how to cope with anxiety in these trying times-https://www.anxietyuk.org.uk/blog/covid-19-and-anxiety-part2/',
    //   end: true,
    // },
    // {
    //   id: 'low',
    //   message: 'Would you like self help resources or someone to talk to?',
    //   trigger: 'low-options',
    // },
    // {
    //   id: 'low-options',
    //   options: [
    //     { value: '1', label: 'Self Help', trigger: 'low-self-help' },
    //     {
    //       value: '2',
    //       label: 'Someone to talk to',
    //       trigger: 'low-someone-to-talk-to',
    //     },
    //   ],
    // },
    // {
    //   id: 'low-self-help',
    //   message:
    //     'Mind uk (mind.org.uk) suggest some self care tips\nSelf-care\nDoing little things to look after your wellbeing can be really important. It might be:\n* getting enough sleep\n* doing something you find relaxing, like listening to music or watching your favourite film\n* doing something you enjoy, like a favourite hobby or spending time with people you love\n* spending time in nature, like going for a walk or visiting a local park\n* getting active by going for a run, bike ride or playing a sport you enjoy.\nThe nhs also has some good tips that can be found here:https://www.nhs.uk/conditions/stress-anxiety-depression/feel-better-and-happy/',
    //   end: true,
    // },
    // {
    //   id: 'low-someone-to-talk-to',
    //   message:
    //     'Below is from NHS:\ntry talking about your feelings to a friend, family member, health professional or counsellor.\nYou could also contact Samaritans, call: 116 123 or email: jo@samaritans.org if you need someone to talk to\nBelow is from NHS:\ntry talking about your feelings to a friend, family member, health professional or counsellor.\nYou could also contact Samaritans, call: 116 123 or email: jo@samaritans.org if you need someone to talk to',
    //   end: true,
    // },
  ];

    return (
      
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.contentContainer}>
            <ChatBot steps={steps} />
          </View>
        </ScrollView>
      </View>
  );
}


export default ChatScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
  },
  contentContainer: {
    height: '100%',
  },
  optionIconContainer: {
    marginRight: 12,
  },
  option: {
    backgroundColor: '#fdfdfd',
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: 0,
    borderColor: '#ededed',
  },
  lastOption: {
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  optionText: {
    fontSize: 15,
    alignSelf: 'flex-start',
    marginTop: 1,
  },
});