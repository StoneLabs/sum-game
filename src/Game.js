import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import Board from "./Board";

export default class Game extends Component {
    state = {
        points: 0
    }

    addPoints(points)
    {
        this.setState({points: this.state.points + points});
    }

    render() {
        return (
            <View style={styles.game}>
                <Text style={styles.text}>Sample Board!</Text>
                <Text style={styles.text}>Current points: {this.state.points}</Text>
                <Board pointHandler={(points) => this.addPoints(points)}/>
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