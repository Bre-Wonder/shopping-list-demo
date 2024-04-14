import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNetInfo } from '@react-native-community/netinfo';
import { useEffect } from 'react';
import { LogBox, Alert } from 'react-native';

const Stack = createNativeStackNavigator();

import { initializeApp } from "firebase/app";
import { getFirestore, disableNetwork, enableNetwork } from "firebase/firestore";

import ShoppingLists from './components/ShoppingLists';
import Welcome from './components/Welcome';

LogBox.ignoreLogs(["AsyncStorage has been extracted from"]);

const App = () => {
  const connectionStatus = useNetInfo();

  useEffect(() => {
    if (connectionStatus.isConnected === false) {
      Alert.alert("Connection lost!"); 
      disableNetwork(db);
    } else if (connectionStatus.isConnected === true) {
      enableNetwork(db);
    }
  }, [connectionStatus.isConnected]);

  // Web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyBiWTOdCv287aYrqzqKInHAPsWSkZsbfF0",
    authDomain: "shopping-list-demo-a678c.firebaseapp.com",
    projectId: "shopping-list-demo-a678c",
    storageBucket: "shopping-list-demo-a678c.appspot.com",
    messagingSenderId: "497500707938",
    appId: "1:497500707938:web:f91612197ce0499ca7053b"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  //Initialize Cloud Firestore and get a referense to the service
  const db = getFirestore(app);

  return(
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Welcome">
        <Stack.Screen name="Welcome" component={Welcome}/>
        <Stack.Screen
          name="ShoppingLists"  
        >
          {props => <ShoppingLists isConnected={connectionStatus.isConnected} db={db} {...props} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );

}
export default App;
