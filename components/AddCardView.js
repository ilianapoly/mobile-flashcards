import React, { Component } from "react";
import { connect } from "react-redux";
import { KeyboardAvoidingView, ScrollView, View, Text } from "react-native";
import { TextInput, Button } from 'react-native-paper';
import { addCardToDeck } from "../actions";
import { saveCardToDeck } from "../utils/api";

class AddCardView extends Component {

    state =
    {
        question: "",
        answer: ""
    };

    submitCardToDeck = async () => {

        const { navigate } = this.props.navigation;
        const { deckTitle } = this.props.navigation.state.params;

        const newCard = this.createCardToSave(this.state.question, this.state.answer);

        await saveCardToDeck(deckTitle, newCard);

        this.props.addCardToDeck(newCard, deckTitle)

        navigate("DeckView", { deckTitle });
    }

    createCardToSave(question, answer) {
        return { question, answer };
    }

    render() {

        const { deckTitle } = this.props.navigation.state.params;

        return (

            <ScrollView>
                <KeyboardAvoidingView behavior="padding">
                    <Text>
                        Add new card for deck {deckTitle}
                    </Text>
                    <TextInput
                        label='Question'
                        value={this.state.question}
                        onChangeText={question => this.setState({ question })}
                     />
                    <TextInput
                          label='Answer'
                          value={this.state.answer}
                          onChangeText={answer => this.setState({ answer })}
                    />
                    <Button mode="contained"
                        disabled={this.state.question === "" || this.state.answer === "" }
                        onPress={() => this.submitCardToDeck()}>
                        Add Card
                    </Button>
                </KeyboardAvoidingView>
            </ScrollView>
        )
    }
}

export default connect(null, { addCardToDeck })(AddCardView);