import React, { Component } from "react";
import { connect } from "react-redux";
import { View, Text, ScrollView } from "react-native";
import { Button } from 'react-native-paper';

class QuizView extends Component {

    state = {
        totalScore: 0,
        questionId: 0,
        showQuestion: true
    };

    submitCorrect = async () => {

        this.setState(lastState => {
            return { totalScore: lastState.totalScore + 1 };
        });

        this.setState(lastState => {
            return {
                questionId: lastState.questionId + 1,
                showQuestion: true
            };
        });
    }

    submitIncorrect = async () => {

        this.setState(lastState => {
            return {
                questionId: lastState.questionId + 1,
                showQuestion: true
            };
        });
    }

    restartQuiz = () => {
        this.setState({
            totalScore: 0,
            questionId: 0
        });
    }

    backToDeck = () => {

        const { navigate } = this.props.navigation;

        navigate("DeckView", { deckTitle: this.props.deck.title });
    }

    render() {

        const { deck } = this.props;

        if (!deck) {
            return (
                <View>
                    <Text>Loading Deck...</Text>
                </View>
          ) ;
        }

        if (deck.questions.length === 0) {
            return (
                <ScrollView>
                    <Text>No questions available.</Text>
                </ScrollView>
            );
        }

        if (this.state.questionId === deck.questions.length) {
            return (
                <ScrollView>
                    <Button mode="contained"
                            onPress={() => this.restartQuiz()}>
                            Restart
                    </Button>
                    <Button mode="contained"
                            onPress={() => this.backToDeck()}>
                            Back to Deck
                    </Button>
                </ScrollView>
            )
        }

        return (
            <ScrollView>
                <Text>{deck.title} Quiz</Text>
                <Text>Question: {this.state.questionId + 1}/{deck.questions.length}</Text>
                <Button mode="contained"
                        onPress={() => this.submitCorrect()}>
                        Correct
                </Button>
                <Button mode="contained"
                        onPress={() => this.submitIncorrect()}>
                        Incorrect
                </Button>
            </ScrollView>
        )
    }
}


const mapStateToProps = (decks, navProps) => {

  const { deckTitle } = navProps.navigation.state.params;

  const deck = decks[deckTitle];

  return { deck };
};

export default connect(mapStateToProps)(QuizView);