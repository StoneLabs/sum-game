import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Button, addons } from 'react-native';

const size = 5;

function isNeightbor(a, b) {
    // Next to each other in same row?
    if ((a == b + 1 || a == b - 1) && a-(a%size) == b-(b%size)) return true;

    // Above each other
    if (a == b + size || a == b - size) return true;

    // Not neighbors
    return false;
}
function newNumber() {
    return 1 + Math.floor(Math.random() * 3)
}

function Square(props) {
    return (
        <View style={styles.square}>
            <Button title={props.value.toString()} style={styles.button}
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
        values: Array.from({length: size*size}, () => newNumber()),
    }

    handlePress(id) {
        // If already pressed in current queue: jump back to that state
        if (this.state.order.includes(id))
        {
            var newOrder = Array(size*size).fill(null);
            var newOrderIndex = this.state.order.indexOf(id) + 1;

            // If id clicked is last in order, remove it too
            if (newOrderIndex == this.state.orderIndex)
                newOrderIndex -= 1;

            for (var i = 0; i < newOrderIndex; i++) 
                newOrder[i] = this.state.order[i];
            this.setState({order: newOrder, orderIndex: newOrderIndex});
        }
        // Else add new entry
        else
        {
            // Abort if not neighbors
            if (this.state.orderIndex > 0 && !isNeightbor(this.state.order[this.state.orderIndex-1], id))
                return;

            // If not same value: return
            if (this.state.orderIndex > 0 && this.state.values[this.state.order[this.state.orderIndex-1]] != this.state.values[id])
                return;

            // Add new value
            const newOrder = this.state.order.slice();
            newOrder[this.state.orderIndex] = id;
            this.setState({order: newOrder, orderIndex: this.state.orderIndex + 1});
        }
    }
    commit() {
        var sum = 0;
        const newOrder = this.state.order.slice();
        const newValues = this.state.values.slice();
        for (var i = 0; i < this.state.orderIndex; i++)
        {
            sum += newValues[newOrder[i]];
            newValues[newOrder[i]] = newNumber();
        }
        newValues[newOrder[this.state.orderIndex - 1]] = sum;
        this.setState({
            orderIndex: 0,
            order: Array(size*size).fill(null),
            values: newValues,
        })
    }

    renderSquare(id) {
        return <Square id={id}
                        value={this.state.values[id]} 
                        handler={() => this.handlePress(id)}/>
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
                <Text>[Debug] Order: {this.state.order.toString()} ({this.state.order.length})</Text>
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