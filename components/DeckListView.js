import React, { Component } from "react";
import { connect } from "react-redux";
import { View, ScrollView, Text } from 'react-native';
import { Avatar, Card, TouchableRipple } from 'react-native-paper';
import { getDecks } from "../utils/api";
import { receiveDecks } from "../actions";


class DeckListView extends Component {
  state = {
    decksRetrieved: false
  };

  async componentDidMount() {
    let decks = await getDecks();
    this.props.receiveDecks(decks);

    this.setState({
      decksRetrieved: true
    });
  }

  navigateToDeckView = (deckTitle) => {
    const { navigate } = this.props.navigation;
    navigate("DeckView", { deckTitle });
  };

  render() {

    if (!this.state.decksRetrieved) {
      return (
        <View>
          <Text>Retrieving Decks...</Text>
        </View>
      );
    }

    const { decks } = this.props;

    return (
      <ScrollView>
        {Object.keys(decks).map(deckTitle => {
          const deck = decks[deckTitle];

          return (
            <Card key={deckTitle} style={{padding:8, margin:16, backgroundColor:'#ffffff', flex:1, justifyContent:'space-around'}} elevation={2}>
              <TouchableRipple rippleColor="rgba(0, 0, 255, .32)"  onPress={() => this.navigateToDeckView(deckTitle)}>
                <Card.Title style={{padding:20, margin:16, }} title={deck.title} subtitle={`${deck.questions.length} cards`} left={(props) => <Avatar.Icon {...props} icon="folder" />}>
                </Card.Title>
              </TouchableRipple>
            </Card>
          );
        })}
      </ScrollView>
    );
  }
}

const mapStateToProps = decks => {
  return { decks };
};

export default connect( mapStateToProps, {receiveDecks} )(DeckListView);
