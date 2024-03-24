import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

import ShoppingLists from './components/ShoppingLists';
import Welcome from './components/Welcome';

const App = () => {

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
          {props => <ShoppingLists db={db} {...props} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );

}
export default App;
