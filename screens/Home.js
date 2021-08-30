import React, { Component } from "react";
import { View, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { Card } from "react-native-elements";
import axios from "axios";

export default class HomeScreen extends Component {
    constructor() {
        super();
        this.state = {
            data: []
        };
    }

    componentDidMount() {
        this.getData();
    }

    getData = async () => {
        const url = "http://localhost:5000/";
        axios
            .get(url)
            .then(response => {
                this.setState({ data: response.data.data });
            })
            .catch(error => {
                console.log(error.message);
            });
    };

    renderItems = ({ item, index }) => (
        <TouchableOpacity
            onPress={() => {
                this.props.navigation.navigate("Star", { name: item.name });
            }}
        >
            <Card
                imageStyle={{ marginTop: 30 }}
                featuredTitle={item.name}
                featuredTitleStyle={styles.cardTitle}
                containerStyle={styles.cardContainer}
            ></Card>
        </TouchableOpacity>
    );

    keyExtractor = (item, index) => index.toString();

    render() {
        const { data } = this.state;
        return (
            <View style={styles.container}>
                {data.length > 0 ? (
                    <View style={styles.upperContainer}>
                        <FlatList
                            data={data}
                            renderItem={this.renderItems}
                            keyExtractor={this.keyExtractor}
                        />
                    </View>
                ) : null}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    upperContainer: {
        flex: 0.88,
        backgroundColor: "#1A2D5F"
    },
    cardTitle: {
        fontSize: 25,
        textAlign: "center"
    },
    cardContainer: {
        backgroundColor: "#1A2D5F",
        borderWidth: 0
    }
});