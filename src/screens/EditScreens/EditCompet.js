import { View, Text, StyleSheet, TextInput, Pressable } from "react-native";
import { useState, useReducer, useEffect } from 'react';
import { useContext } from "react/cjs/react.development";
import GameContext from "../../../contexts/GameContext";

const EditCompet = ({navigation, route}) => {

    const currentGame = route.params.currentGame;
    const { state, update } = useContext(GameContext);

    const [competition, setCompetition] = useState(currentGame.competition);
    const [date, setDate] = useState(currentGame.date);
    const [rink, setRink] = useState(currentGame.rink);
    const [teams, setTeams] = useState(currentGame.teams);
    const [scores, setScores] = useState(currentGame.scores);

    

    return (
        <View style={styles.container} >
            <Text style={styles.title} >Edit Game</Text>
            <View style={styles.createGameContainer}>
            

            <View style={styles.inputContainer}>
                <Text style={styles.labelTitle}>Competition Name:</Text>
                <TextInput 
                    style = {styles.labelContainer}
                    placeholder="Enter competition name here..."
                    value={competition}
                    onChangeText={(text) => {
                        setCompetition(text);
                    }}
                />
            </View>


            

            <Text style={styles.labelTitle}>Date:</Text>
            <Text>{date}</Text>

            <Text style={styles.labelTitle}>Rink Number:</Text>
            <TextInput 
                style = {styles.labelContainer}
                placeholder='Enter Rink Number here...'
                value={rink}
                onChangeText={(text) => {
                    setRink(text);
                }}
            />
            </View>

            <Pressable
                style={styles.button}
                onPress={() => {
                    update(currentGame.id, competition, date, rink, teams, scores),
                    navigation.pop() 
                    }
                }
            >
                <Text>Update Game</Text>
            </Pressable>
            

        </View>
    )
    
};

const styles = StyleSheet.create ({
    playercontainer: {
        alignItems: 'center',
    },
    flatListContainer: {
        width: '100%',
    },
    buttonContainer: {
        flexDirection: 'row'
    },
    playerBox : {
        marginTop: 5,
        borderWidth: 1,
        width: 175,
        padding: 10,
        margin: 10,
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        backgroundColor: '#779cab',
        paddingHorizontal: 10,
        paddingVertical: 10,
        margin: 30,
        width: 150,
        shadowColor: '#171717',
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.4,
        shadowRadius: 3,
    },
    container: {
        flex:1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        color: 'black',
        marginBottom: 10,
        alignSelf: 'center',
        textAlign: 'center'
    },
    labelTitle: {
        marginTop: 10,
        marginBottom: 5,
        fontSize: 20,
        color: 'white',
        alignSelf: 'center',
        textAlign: 'center'
    },
    labelContainer : {
        marginTop: 5,
        borderWidth: 1,
        width: 300,
        paddingLeft: 20,
        height: 45,
        alignSelf: 'center',
        borderRadius: 10,
    },
    createGameContainer: {
        backgroundColor: '#779cab',
        width: '90%',
        height: '50%',
        borderRadius: 20,
        padding: 10,
        alignItems: 'center',
        shadowColor: '#171717',
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.4,
        shadowRadius: 3,
    }
});

export default EditCompet;