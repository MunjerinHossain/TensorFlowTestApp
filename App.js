/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Settings,
  Button,
  TouchableOpacity,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import {TextInput} from 'react-native';

import * as tf from '@tensorflow/tfjs';
import '@tensorflow/tfjs-react-native';
import * as toxicity from '@tensorflow-models/toxicity';

export default function App() {
  const [isTfReady, setIsTfReady] = useState(false);
  const [isModelReady, setIsModelReady] = useState(false);
  const [text, setText] = useState('');
  const [prediction, setPrediction] = useState([]);

  // will test here for the sentiment analysis
  useEffect(() => {
    const TFReady = tf.ready();
    setIsTfReady(true);
    // console.warn('tf is ready');

    {
      toxicity.load() ? setIsModelReady(true) : '';
    }
  });

  // useEffect(() => {
  //   // The minimum prediction confidence.
  //   const threshold = 0.9;

  //   // Load the model. Users optionally pass in a threshold and an array of
  //   // labels to include.
  //   try {
  //     toxicity.load(threshold).then((model) => {
  //       const textArray = new Array(text);
  //       console.log('text array', textArray);

  //       model.classify(textArray).then((predictions) => {
  //         // `predictions` is an array of objects, one for each prediction head,
  //         // that contains the raw probabilities for each input along with the
  //         // final prediction in `match` (either `true` or `false`).
  //         // If neither prediction exceeds the threshold, `match` is `null`.
  //         // const sentimentResult = predictions;
  //         console.log('prediction: ', predictions);
  //         // setPrediction(predictions);
  //       });
  //     });
  //   } catch (error) {
  //     console.log('could not predict', error);
  //   }
  // });

  const result = ()=>{
    alert('working');
    const threshold = 0.9;

    // Load the model. Users optionally pass in a threshold and an array of
    // labels to include.
   console.log(text);
  //  console.log('prediction: ', predictions);
    try {
      toxicity.load(threshold).then((model) => {
        const textArray = new Array(text);
        console.log('text array', textArray);

        model.classify(textArray).then((predictions) => {
          // `predictions` is an array of objects, one for each prediction head,
          // that contains the raw probabilities for each input along with the
          // final prediction in `match` (either `true` or `false`).
          // If neither prediction exceeds the threshold, `match` is `null`.
          // const sentimentResult = predictions;
          console.log('prediction: ', predictions);
          setPrediction(predictions);
        });
      });
    } catch (error) {
      console.log('could not predict', error);
    }
  }

  return (
    <>
      <View style={styles.container}>
        <Text>Sentiment Analysis</Text>
        <Text>
          TF ready?{' '}
          {isTfReady ? <Text>Yes, TF loaded</Text> : <Text>Loading TF...</Text>}
        </Text>
        <Text>
          Model ready?{' '}
          {isModelReady ? (
            <Text>Yes, model loaded</Text>
          ) : (
            <Text>Loading Model...</Text>
          )}
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Write your text here"
          onChangeText={(val) => {
            setText(val);
          }}
          value={text}
        />

        <TouchableOpacity onPress={()=>{result()}}>
          <Text style={{color: '#ffffff', backgroundColor: '#ff0000'}}>Analyze</Text>
        </TouchableOpacity>

        <Text>Written Text: {text}</Text>
        <Text>Prediction: {prediction}</Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
  input: {
    borderWidth: 1,
    borderColor: '#777',
    padding: 8,
    margin: 10,
    width: 200,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

// export default App;
