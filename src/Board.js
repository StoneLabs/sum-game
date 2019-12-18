import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Button } from 'react-native';

const size = 5;

function Square(props) {
    return (
        <View style={styles.square}>
            <Button title={props.value} style={styles.button}
                    onPress={props.handler}>
                <Text>{props.value}</Text>
            </Button>
        </View>
    );
}

export default class Board extends Component {
    state = {
        orderIndex: 0,
        order: Array(size*size).fill(null),
    }

    handlePress(i) {
        const newOrder = this.state.order.slice();
        newOrder[this.state.orderIndex] = i;
        this.setState({order: newOrder, orderIndex: this.state.orderIndex + 1})
    }
    commit() {
        this.setState({
            orderIndex: 0,
            order: Array(size*size).fill(null),
        })
    }

    renderSquare(i) {
        return <Square value={(i).toString()} 
        handler={() => this.handlePress(i)}/>
    }

    renderRow(offset) {
        const squares = [];
        for (var i = offset; i < offset+size; i++)
            squares.push(this.renderSquare(i));

        return (
            <View style={styles.row}>
                {squares}
            </View>
        );
    }

    render() {
        const rows = [];
        for (var i = 0; i < size; i++) {
            rows.push(this.renderRow(size*i));
        }

        return (
            <View>
                <Text>Debug: Order: {this.state.order.toString()}</Text>
                <View style={styles.board}>
                    {rows}
                    <Text/>
                    <Button title='Commit' onPress={() => this.commit()}></Button>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    board: {
        overflow: 'hidden',
        height: 40*size,
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
        backgroundColor: '#f00',
    }
});