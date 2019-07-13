import React, { Component } from "react";
import { connect } from "react-redux";
import { KeyboardAvoidingView, ScrollView, View } from "react-native";
import { TextInput, Button } from 'react-native-paper';
import { addNewDeck } from "../actions";
import { saveNewDeck } from "../utils/api";

class AddDeckView extends Component {
  state = {
    deckTitle: ""
  };

  submitDeck = async () => {
    const deckTitle = this.state.deckTitle;

    const { navigate } = this.props.navigation;

    const newDeck = this.createDeckToSave(deckTitle);

    await saveNewDeck(newDeck);

    this.props.addNewDeck(newDeck)

    this.setState({ deckTitle: "" });

    navigate("DeckView", { deckTitle: deckTitle });
  }

  createDeckToSave(deckTitle) {
    return {
      [deckTitle]: {
        title: deckTitle,
        questions: []
      }
    };
  }

  render() {

    return (

      <ScrollView>
        <KeyboardAvoidingView behavior="padding">
          <View style={{padding:8, margin:16, backgroundColor:'#fff',  }}>
            <TextInput
              label='Title'
              value={this.state.deckTitle}
              onChangeText={deckTitle => this.setState({ deckTitle })}
            />
            <Button mode="contained" style={{marginTop:16}}

                    disabled={this.state.deckTitle === "" }
                    onPress={() => this.submitDeck()}
            >
              Create Deck
            </Button>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    )
  }
}

export default connect(null, { addNewDeck })(AddDeckView);
