import React, { Component } from "react";
import { connect } from "react-redux";
import { View, ScrollView, Text } from "react-native";
import { Button, Card, Surface} from 'react-native-paper';
import { StyleSheet } from 'react-native';

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


          <Card style={{padding:8, margin:16, backgroundColor:'#fff',  }} elevation={2}>
            <Card.Title style={{padding:20, margin:16, }} title={deck.title} subtitle={`${deck.questions.length} cards`} />

            <Card.Actions style={{ justifyContent:'flex-end'}}>
              <Button mode="outlined" onPress={() => this.navigateToAddCardView()} >
                Add Card
              </Button>
              <Button
                style={{marginLeft:16}}
                mode="contained" onPress={() => this.navigateToQuiz()} >
                Start Quiz
              </Button>
            </Card.Actions>

          </Card>





      </ScrollView>
    )

  }
}

const styles = StyleSheet.create({
  surface: {
    padding: 8,
    height:'100%',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    backgroundColor: '#d67eff' ,
  },
});


const mapStateToProps = (decks, navProps) => {

  const { deckTitle } = navProps.navigation.state.params;

  const deck = decks[deckTitle];

  return { deck };
};

export default connect(mapStateToProps)(DeckView);