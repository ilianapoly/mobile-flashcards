import React, { Component } from "react";
import { connect } from "react-redux";
import { View, Text, ScrollView } from "react-native";
import { Button, Surface } from 'react-native-paper';

class QuestionCard extends Component {

      showQuestion(flipTheCard) {

            const { card } = this.props;

            return (
              <Surface>
                  <View style={{alignItems:'center'}}>
                        <Text style={{fontSize:48, alignSelf: 'center', alignItems:'center'}}>
                          {card.question}
                        </Text>
                        <Button mode="outlined" onPress={flipTheCard} >
                          <Text style={{color:'#ee0001'}}>Show Answer</Text>

                        </Button>
                  </View>
              </Surface>
            );
      }

      showAnswer(flipTheCard) {

            const { card } = this.props;

            return (
                  <View>
                        <Text>{card.answer}</Text>
                        <Button mode="contained"
                            onPress={flipTheCard}>
                            Show Question
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