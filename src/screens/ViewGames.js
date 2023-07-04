import { View, Text, FlatList, StyleSheet, TouchableWithoutFeedbackBase, Pressable, SafeAreaView } from 'react-native';
import React, { useContext, useEffect, useReducer } from 'react';
import GameContext from '../../contexts/GameContext';
import { Ionicons } from '@expo/vector-icons';

const teamsPoints = (number, scores) => {
    var outcome = 0;
    scores.map( (round) => {
             if (number===1)
             {
                 outcome = outcome + round.teamOne;
                 return outcome;
             }
             else (number ===2)
             {
                 outcome = outcome + round.teamTwo;
                 return outcome;
             }
         })
     
     return outcome;
 };
 
 const whoWon = (item) => {
     var teamOne = teamsPoints(1, item.scores);
     var teamTwo = teamsPoints(2, item.scores);
     var winner;
     if(teamOne>teamTwo)
     {
         winner=item.teams[0].teamName;
     }
     else if (teamTwo>teamOne){
         winner=item.teams[1].teamName;
     }
     else {
         winner='Draw'
     }
     return winner;
 };

const ViewGames = ({navigation}) => {
    
    const {state, remove} = useContext(GameContext);
    console.log(state);
    return(
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>View all Games</Text>
            <FlatList 
                data={state}
                keyExtractor={(e) => e.id.toString()}
                renderItem = { ({item}) =>
            {
                return (
                    <Pressable onPress={() => navigation.navigate('View Games', {screen: 'SingularGame', params: {id: item.id}})}>

                        <View style={styles.gameContainer}>
                            <View style={styles.infoContainer}>
                                <Text style={styles.text}>{item.competition}</Text>
                                <Text style={styles.date}>Date: {item.date}</Text>
                                <Text style={styles.rink}>Rink: {item.rink}</Text>
                            </View>
                            <View style={styles.vsContainer}>
                                <View style={styles.team}>
                                    <Text style={styles.teamName}>{item.teams[0].teamName}</Text>
                                    <Text style={styles.score}>{teamsPoints(1, item.scores)}</Text>
                                </View>
                                <View style={styles.VS}>
                                    <Text style={styles.score}>-</Text>
                                </View>
                                <View style={styles.team}>
                                    <Text style={styles.teamName}>{item.teams[1].teamName}</Text>
                                    <Text style={styles.score}>{teamsPoints(2, item.scores)}</Text>
                                </View> 
                            </View>
                            <Text style={styles.winner}>Winner:   {whoWon(item)}</Text>
                            <View style={styles.buttonContainer}>
                            <Ionicons 
                                style={styles.button} 
                                name={'trash-outline'} 
                                color={'black'} 
                                size={30} 
                                onPress={()=>{remove(item.id)}}
                            />
                            </View>
                        </View>

                    </Pressable>


                    
                    
                )
            }}

            />

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    text: {
        fontSize: 25,
        color: 'black',
        margin: 10,
        fontWeight: 'bold'
    },
    winner: {
        borderWidth: 2,
        borderColor: 'white',
        borderRadius: 10,
        height: 50,
        margin: 10,
        padding: 10,
        alignSelf: 'center',
        textAlign: 'center',
        fontSize: 20,
        fontWeight:'bold',
        color: 'black',

    },
    date: {
        color: 'black',
        fontSize: 15,
        marginBottom: 5
    },
    rink: {
        color: 'black',
        fontSize: 15,

    },
    title: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: 30,
        margin: 10,

    },
    container: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 40,

    },
    gameContainer: {
        width: 375,
        backgroundColor: '#779cab',
        borderRadius: 20,
        padding: 10,
        margin: 10,
        shadowColor: '#171717',
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.4,
        shadowRadius: 3,
    },
    team: {
        alignItems: 'center'

    },
    VS: {

    },
    vsContainer: {
        flexDirection: 'row',
        margin: 10,
        justifyContent: 'space-evenly'

    },
    score: {
        fontSize: 40,
        color:'black',
        fontWeight: 'bold'
    },
    teamName: {
        color: 'black',
        fontSize:15,
    },
    infoContainer: {
        alignItems: 'center'
    },
    button: {
        margin: 10,
        width: 30,

    }
})


export default ViewGames;