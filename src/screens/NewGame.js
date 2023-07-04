import { useState, useReducer, useEffect } from 'react';
import {View, Text, TextInput, StyleSheet, Pressable, FlatList, SafeAreaView, ScrollViewBase, Alert} from 'react-native';
import { roundToNearestPixel } from 'react-native/Libraries/Utilities/PixelRatio';
import NewGameContext from '../../contexts/NewGameContext';
import { useContext } from 'react';

const NewGame = ({navigation, route}) => {
    const {state, updateGame} = useContext(NewGameContext);

    const [competition, setCompetition] = useState('');
    const [date, setDate] = useState(new Date());
    const [rink, setRink] = useState('');
    const [teams, setTeams] = useState(state.teams);
    const [scores, setScores] = useState(state.scores);

    console.log("STATE: "+state.competition+" "+state.date+" "+state.rink);
    console.log("STATE: "+competition+" "+date+" "+rink);

    useEffect(() => {
        handleUpdateState();
    }, [state])

    const handleUpdateState = () => {
        console.log("2. change state")
        setCompetition(state.competition);
        setDate(new Date())
        setRink(state.rink)
        setTeams(state.teams)
        setScores(state.scores)
    }

    console.log("First Screen: Compet: "+competition);
    console.log("First Screen: date "+date);
    console.log("First Screen: rink: "+rink);
    console.log("First Screen: teams: "+teams[0].teamName+" "+teams[1].teamName);
    console.log("First Screen: Compet: "+scores[0].teamOne);

    return (
        <View style={styles.container} >
            <View style={styles.createGameContainer}>
            <Text style={styles.title} >Create a New Game</Text>

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
            <Text>{date.toDateString()}</Text>

            <Text style={styles.labelTitle}>Rink Number:</Text>
            <TextInput 
                style = {styles.labelContainer}
                placeholder='Enter Rink Number here...'
                value={rink}
                keyboardType='numeric'
                onChangeText={(text) => {
                    setRink(text);
                }}
            />
            </View>

            <Pressable
                style={styles.button}
                onPress={() => {
                    //Checkk values aren't empty
                    if (competition!=''&&rink!='')
                    {
                        updateGame(competition, date, rink, teams, scores),
                        // handleUpdateState(),
                         console.log("Updated State: "+state);
                         navigation.navigate('Add Games', 
                         { 
                             screen: 'NewGameScreenTwo'
                         })
                    }
                    else if (competition==='')
                    {
                        Alert.alert('Competition is empty. Please enter competition name')
                    }
                    else if (rink==='')
                    {
                        Alert.alert('Rink is empty. Please enter rink name')
                    }
                }
                    
    
                }
            >
                <Text>Next</Text>
            </Pressable>
            

        </View>
    )
}

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

export default NewGame;