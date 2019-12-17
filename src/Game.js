import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import Board from "./Board";

export default class Game extends Component {
    render() {
        return (
            <View style={styles.game}>
                <Text style={styles.text}>Sample Board!</Text>
                <Text style={styles.text}>Current points: XX</Text>
                <Board />
            </View>
        );
    }
} 

const styles = StyleSheet.create({
    game: {
        marginTop: 40,
        alignContent: 'center',
    },
    text: {
        alignSelf: 'center',
    }
});