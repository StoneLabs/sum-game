import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Button } from 'react-native';

function Square(props) {
    return (
        <View style={styles.square}>
            <Button style={styles.button} onClick={props.onClick} 
                    title={props.value} />
        </View>
    );
}

export default class Board extends Component {
    handleClick(i) {
        
    }

    renderRow(offset) {
        const squares = [];
        for (var i = 0; i < 5; i++) {
            squares.push(
                <Square value={(i+offset).toString()} 
                        onClick={() => this.handleClick(i)}/>
                );
        }

        return (
            <View style={styles.row}>
                {squares}
            </View>
        );
    }

    render() {
        const rows = [];
        for (var i = 0; i < 5; i++) {
            rows.push(this.renderRow(5*i));
        }

        return (
            <View style={styles.board}>
                {rows}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    board: {
        overflow: 'hidden',
        height: 40*5,
        alignSelf: 'center',
    },
    row: {
        flex: 1,
        flexDirection: 'row',
        width: '100%',
        height: 40,
    },
    square: {
        alignSelf: 'stretch',
        width: '30%',
        height: 40,
        width: 40,
    },
    button: {
        alignSelf: 'stretch',
        height: '100%',
    }
});