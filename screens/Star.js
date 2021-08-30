import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView
} from "react-native";
import axios from "axios";

export default class StarScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: this.props.navigation.getParam("name"),
            data: {}
        };
    }

    componentDidMount() {
        const { name } = this.state;
        this.getStarDetails(name);
    }

    getStarDetails = name => {
        const url = `http://localhost:5000/star?name=${name}`;
        axios
            .get(url)
            .then(response => {
                this.setState({ data: response.data.data });
            })
            .catch(error => {
                console.log(error.message);
            });
    };

    render() {
        const { name, data } = this.state;
        if (data) {
            return (
                <View style={styles.container}>
                    <View style={styles.upperContainer}>
                        <Text style={styles.starName}>{data.name}</Text>
                    </View>
                    <View style={styles.middleContainer}>
                        <View>
                            <Text style={styles.text}>{data.mass}</Text>
                            <Text style={styles.text}>Mass</Text>
                        </View>
                        <View>
                            <Text style={styles.text}>{Math.round(data.gravity)}</Text>
                            <Text style={styles.text}>Gravity</Text>
                        </View>
                        <View>
                            <Text style={styles.text}>{data.radius}</Text>
                            <Text style={styles.text}>Radius</Text>
                        </View>
                    </View>
                    <View style={styles.lowerContainer}>
                        <Text style={styles.text}>{data.distance}</Text>
                        <Text style={styles.text}>Distance from Earth</Text>
                    </View>
                    <SafeAreaView />
                </View>
            );
        }
        return null;
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    upperContainer: {
        flex: 0.63,
        justifyContent: "center",
        alignItems: "center"
    },
    starName: {
        fontSize: 40,
        fontWeight: "bold",
        textAlign: "center",
        color: "#fff"
    },
    middleContainer: {
        flex: 0.22,
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center"
    },
    text: {
        fontSize: 18,
        color: "#fff",
        fontWeight: "400",
        textAlign: "center"
    },
    lowerContainer: {
        flex: 0.15,
        backgroundColor: "#151F39",
        justifyContent: "center",
        alignItems: "center"
    }
});