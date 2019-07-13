import React, { Component } from "react";
import { connect } from "react-redux";
import { View, Text, ScrollView } from "react-native";
import { Button, Card, Headline } from 'react-native-paper';
import QuestionCard from './QuestionCard';
import { clearStudyNotification, setStudyNotification } from "../utils/api";

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

       await clearStudyNotification();
       await setStudyNotification();
    }

    submitIncorrect = async () => {

        this.setState(lastState => {
            return {
                questionId: lastState.questionId + 1,
                showQuestion: true
            };
        });

       await clearStudyNotification();
       await setStudyNotification();
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

    flipTheCard = () => {

        this.setState(lastState => {
            return { showQuestion: !lastState.showQuestion };
        });
    };

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


                    <Text>Quiz Results</Text>
                    <Text>Deck: {deck.title}</Text>
                    <Text>Score: {this.state.totalScore} out of {deck.questions.length}</Text>
                    <Button mode="contained"
                            onPress={() => this.restartQuiz()}>
                            Restart Quiz
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
              <Card style={{padding:8, margin:16, backgroundColor:'#effff7', alignSelf:'center'}} elevation={4}>

                <Text>Quiz</Text>

                <Text >Question: {this.state.questionId + 1}/{deck.questions.length}</Text>

                <Card.Title  style={{padding:20, margin:16, }} title={`Deck: ${deck.title}`} />

                    <QuestionCard
                        flipTheCard={this.flipTheCard}
                        showQuestion={this.state.showQuestion}
                        card={deck.questions[this.state.questionId]}
                        style={{fontSize:24}}
                    >
                    </QuestionCard>
                <Card.Actions style={{ justifyContent:'flex-end', marginTop:64}} elevation={2}>
                  <Button mode="contained"
                          onPress={() => this.submitCorrect()}
                          style={{ marginLeft:32, padding:4, backgroundColor:'#00bf78' }}

                  >
                          Correct
                  </Button>
                  <Button mode="contained"
                          onPress={() => this.submitIncorrect()}
                          style={{ marginLeft:24, padding:4, backgroundColor:'#ee534c'}}
                  >
                          Incorrect
                  </Button>
                </Card.Actions>
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

export default connect(mapStateToProps)(QuizView);