import React, {Component} from 'react';
import { createStore } from "redux";
import { Provider as PaperProvider } from 'react-native-paper';
import { Provider as StoreProvider } from 'react-redux';
import { StyleSheet, Text, View } from 'react-native';
import { createAppContainer, createStackNavigator } from "react-navigation";
import { createMaterialTopTabNavigator } from "react-navigation-tabs";
import reducer from "./reducers";
import { setStudyNotification } from "./utils/api";
import DeckListView from "./components/DeckListView";
import DeckView from "./components/DeckView";
import AddCardView from "./components/AddCardView";
import QuizView from "./components/QuizView";
import AddDeckView from "./components/AddDeckView";

const store = createStore(reducer);

const router = {
    DeckListView: {
      screen: DeckListView,
      navigationOptions: {
        tabBarLabel: "Decks"
      }
    },
    AddDeckView: {
      screen: AddDeckView,
      navigationOptions: {
        tabBarLabel: "Create Deck"
      }
    }
};

const navigationOptions = {
  tabBarOptions: {

  }
};

const MainNavigator = createStackNavigator({

    DeckListView: {
        screen:
        createMaterialTopTabNavigator(
            router,
            navigationOptions)
    },
    DeckView: {
        screen: DeckView,
    },
    AddCardView: {
        screen: AddCardView,
    },
    QuizView: {
        screen: QuizView,
    },
});

const AppContainer = createAppContainer(MainNavigator);


export default class App extends Component {

  async componentDidMount() {

    await setStudyNotification();
  }

  render() {
    return (
        <StoreProvider store={store}>
          <PaperProvider>
            <View style={{ flex: 1 }}>
              <AppContainer />
            </View>
         </PaperProvider>
       </StoreProvider>
    );
  }
}