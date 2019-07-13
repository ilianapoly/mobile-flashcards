import React, { Component } from "react";
import { connect } from "react-redux";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { Button, Surface } from 'react-native-paper';

const styles = StyleSheet.create({
  flipBtn:{
    color:'#ee0001',
    margin:16
  },
  questionText:{
    fontSize:32,
    alignSelf: 'center',
    alignItems:'center',
    marginBottom:16
  }

})

class QuestionCard extends Component {

      showQuestion(flipTheCard) {

            const { card } = this.props;

            return (
              <Surface>
                <View style={{alignItems:'center',}}>
                  <Text style={styles.questionText}>
                    {card.question}
                  </Text>
                  <Button mode="outlined" onPress={flipTheCard} >
                    <Text style={styles.flipBtn}>Show Answer</Text>
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

                    <Button mode="outlined" onPress={flipTheCard} >
                      <Text style={{color:'#ee0001'}}>
                        Show Question
                      </Text>
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