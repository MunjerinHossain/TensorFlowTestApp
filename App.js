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

// const App: () => React$Node = () => {

// };

// export class App extends React.Component {
// constructor(props) {
//     super(props);
//     this.state = {
//       isTfReady: false,
//     };
// }

// async componentDidMount() {
//     // Wait for tf to be ready.
//     await tf.ready();
//     // Signal to the app that tensorflow.js can now be used.
//     this.setState({
//       isTfReady: true,
//     });
// }

// render() {
//     //
// }
// }

export default function App() {
  const [isTfReady, setIsTfReady] = useState(false);
  const [isModelReady, setIsModelReady] = useState(false);
  const [text, setText] = useState('');
  const [prediction, setPrediction] = useState(null);

  // will test here for the sentiment analysis
  useEffect(() => {
    const TFReady = tf.ready();
    setIsTfReady(true);
    // console.warn('tf is ready');

    {
      toxicity.load()
        ? setIsModelReady(true)
        : '';
    }

    // if(model == toxicity.load()){
    //   setIsModelReady(true);
    //   console.warn('model is ready');
    // }
  });

  // The minimum prediction confidence.
  const threshold = 0.9;

  // Load the model. Users optionally pass in a threshold and an array of
  // labels to include.
  toxicity.load(threshold).then((model) => {
    // const sentences = ['you suck'];

    model.classify(text).then((predictions) => {
      // `predictions` is an array of objects, one for each prediction head,
      // that contains the raw probabilities for each input along with the
      // final prediction in `match` (either `true` or `false`).
      // If neither prediction exceeds the threshold, `match` is `null`.

      console.log('prediction: ', predictions);
    });
  });

  return (
    <>
      <View style={styles.container}>
        <Text>Sentiment Analysis</Text>
        <Text>
          TF ready?{' '}
          {isTfReady ? (
            <Text>Yes, TF loaded</Text>
          ) : (
            <Text>Loading TF...</Text>
          )}
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
            setPrediction(val.predictions)
          }}
        />

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
