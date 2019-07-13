import React, { Component } from "react";
import { connect } from "react-redux";
import { View, Text, ScrollView } from "react-native";
import { Button } from 'react-native-paper';

class QuestionCard extends Component {

      showQuestion(flipTheCard) {

            const { card } = this.props;

            return (
                  <View>
                        <Text>{card.question}</Text>
                        <Button mode="contained"
                            onPress={flipTheCard}>
                            View Answer
                        </Button>
                  </View>
            );
      }

      showAnswer(flipTheCard) {

            const { card } = this.props;

            return (
                  <View>
                        <Text>{card.answer}</Text>
                        <Button mode="contained"
                            onPress={flipTheCard}>
                            View Question
                        </Button>
                  </View>
            );
      }

      render() {

            const { showQuestion, flipTheCard } = this.props;

            return showQuestion ?
                this.showQuestion(flipTheCard)
              : this.showAnswer(flipTheCard);

      }

}

export default QuestionCard;