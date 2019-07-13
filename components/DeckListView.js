import React, { Component } from "react";
import { connect } from "react-redux";
import { View, ScrollView, TouchableOpacity, Text } from 'react-native';
import { Card } from 'react-native-paper';
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
                    <TouchableOpacity key={deckTitle} onPress={() => this.navigateToDeckView(deckTitle)}>
                        <Card >
                            <Text>{deck.title}</Text>
                            <Text>{deck.questions.length}</Text>
                        </Card>
                   </TouchableOpacity>
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