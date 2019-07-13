import React, { Component } from "react";
import { connect } from "react-redux";
import { View, ScrollView, Text } from "react-native";
import { Button, Card } from 'react-native-paper';

class DeckView extends Component {

  navigateToAddCardView = () => {
    const { navigate } = this.props.navigation;
    const { deckTitle } = this.props.navigation.state.params;
    navigate("AddCardView", { deckTitle });
  };

  navigateToQuiz = () => {
    const { navigate } = this.props.navigation;
    const { deckTitle } = this.props.navigation.state.params;
    navigate("QuizView", { deckTitle });
  };

  render() {

    const { deck } = this.props;

    if (!deck) {
      return (
        <View>
          <Text>Loading Deck...</Text>
        </View>
      );
    }

    return (

      <ScrollView>
         <Card >
            <Text>{deck.title}</Text>
            <Text>{deck.questions.length}</Text>
            <Button mode="contained" onPress={() => this.navigateToAddCardView()}>
                Add Card
            </Button>
            <Button mode="contained" onPress={() => this.navigateToQuiz()}>
                Start Quiz
            </Button>
        </Card>
      </ScrollView>
    )

  }
}

const mapStateToProps = (decks, navProps) => {

  const { deckTitle } = navProps.navigation.state.params;

  const deck = decks[deckTitle];

  return { deck };
};

export default connect(mapStateToProps)(DeckView);