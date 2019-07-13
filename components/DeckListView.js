import React, { Component } from "react";
import { connect } from "react-redux";
import { View, ScrollView, TouchableOpacity, Text } from 'react-native';
import { Avatar, Card } from 'react-native-paper';
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
                        <Card style={{padding:8, margin:16, backgroundColor:'#ffffff'}} elevation={2}>
                            <Card.Title style={{padding:20, margin:16, }} title={deck.title} subtitle={`${deck.questions.length} cards`} left={(props) => <Avatar.Icon {...props} icon="folder" />} />
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