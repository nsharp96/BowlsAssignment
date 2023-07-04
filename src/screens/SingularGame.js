import { View, Text, FlatList, Pressable, StyleSheet, Image, SafeAreaView, ScrollView } from "react-native"
import { useContext } from "react/cjs/react.development";
import GameContext from "../../contexts/GameContext";
import EditCompet from "./EditScreens/EditCompet";

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

const SingularGame = ({navigation, route}) => {

    const { id } = route.params;
    const { state } = useContext(GameContext);
    const currentGame = state.find( (e) => e.id === id);

    return (
        <SafeAreaView style={styles.container}>
   
                <View style={styles.competContainer}>
                    <Text style={styles.title}> {currentGame.competition} </Text>
                    <Text style={styles.compDet}> Date: {currentGame.date} </Text>
                    <Text style={styles.compDet}> Rink: {currentGame.rink} </Text>
                </View>

                <View style={styles.teamContainer}>
                    <View style={styles.teamWinnerContainer}>
                        <View style={styles.team}>
                            <Text style={styles.teamName}>{currentGame.teams[0].teamName}</Text>
                            <Text style={styles.score}>{teamsPoints(1, currentGame.scores)}</Text>
                        </View>
                        <View style={styles.VS}>
                            <Text style={styles.score}>-</Text>
                        </View>
                        <View style={styles.team}>
                                <Text style={styles.teamName}>{currentGame.teams[1].teamName}</Text>
                                <Text style={styles.score}>{teamsPoints(2, currentGame.scores)}</Text>
                        </View> 
                    </View>
                </View>

                <View style={styles.teamPlayerContainer}>
                    <Text style={styles.playerTitle}> Players </Text>
                    <View style={styles.teamPlayerContainerDirection}>

                        <View style={styles.teamPlayers}>
                            {
                                currentGame.teams[0].teamPlayers.map( (player) => {
                                    return <Text key={player.id} style={styles.player}>{player.id} - {player.playerName}</Text>
                                })
                            }
                        </View>

                        <View style={styles.teamPlayers}>
                            {
                                currentGame.teams[1].teamPlayers.map( (player) => {
                                    return <Text key={player.id} style={styles.player}>{player.id} - {player.playerName}</Text>
                                })
                            }
                        </View>
                        
                    </View>
                    
                </View>

                <View style={styles.scoreContainer}>
                    <Text style={styles.playerTitle}>Scores</Text>

                    <FlatList 
                        data={currentGame.scores}
                        keyExtractor={(e) => e.id.toString()}
                        renderItem = { ({item}) =>
                            {
                                return (
                                    <View style={styles.endContainer}>
                                        <Text style={styles.roundTitle}> Round {item.id}</Text>
                                        <View style={styles.teamWinnerContainer}>
                                            <View>
                                                <Text style={styles.teamName}>{currentGame.teams[0].teamName}</Text>
                                                <Text style={styles.score}> {item.teamOne}</Text>
                                            </View>
                                            <View>
                                                <Text style={styles.teamName}></Text>
                                                <Text style={styles.score}>-</Text>
                                            </View>
                                            <View>
                                                <Text style={styles.teamName}>{currentGame.teams[1].teamName}</Text>
                                                <Text style={styles.score}> {item.teamTwo} </Text>
                                            </View>
                                        </View>

                                        {item.photo &&
                                            <Image style={styles.imageStyle} source={{uri:item.photo}}/>
                                        }
                                        
                                        
                                    </View>
                                )
                            }}

                    />

                </View>

                <View style={styles.buttonContainer}>

                    <Pressable
                        style={styles.button}
                        onPress={ () => {
                            navigation.navigate('View Games', {screen: 'EditCompet', params: {currentGame: currentGame}})
                        }}
                    >
                        <Text>Edit Details</Text>
                    </Pressable>

                    <Pressable
                        style={styles.button}
                        onPress={ () => {
                            navigation.navigate('View Games', {screen: 'EditTeams', params: {currentGame: currentGame}})
                        }}
                    >
                        <Text>Edit Teams</Text>
                    </Pressable>

                    <Pressable
                        style={styles.button}
                        onPress={ () => {
                            navigation.navigate('View Games', {screen: 'EditScores', params: {currentGame: currentGame}})
                        }}
                    >
                        <Text>Edit Scores</Text>
                    </Pressable>

                </View>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#779CAB',
        padding: 8,
        alignSelf: 'flex-start',
        margin: 8,
        borderRadius: 10,
        shadowColor: '#171717',
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.4,
        shadowRadius: 3,
    },
    container: {
        flex: 1
    },
    competContainer:
    {
        backgroundColor: '#779CAB',
        margin: 20,
        borderRadius: 10,
        padding: 10,
        shadowColor: '#171717',
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.4,
        shadowRadius: 3,
    },
    title: {
        alignSelf: 'center',
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    compDet: {
        marginLeft: 10,
        margin: 2,
        fontSize: 15,
    },
    teamContainer: {
        backgroundColor: '#779CAB',
        marginLeft: 20,
        marginRight: 20,
        borderRadius: 10,
        padding: 10,
        shadowColor: '#171717',
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.4,
        shadowRadius: 3,
    },
    teamWinnerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        margin: 10,
        shadowColor: '#171717',
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.4,
        shadowRadius: 3,
    },
    team: {
        alignItems: 'center'
    },
    teamName: {
        fontSize: 15,
        fontWeight: 'bold'
    },
    score: {
        fontSize: 40
    },
    teamPlayerContainer: {
        backgroundColor: '#779CAB',
        margin: 20,
        borderRadius: 10,
        padding: 10,
        shadowColor: '#171717',
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.4,
        shadowRadius: 3,
    },
    teamPlayerContainerDirection: {
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    },
    playerTitle: {
        alignSelf: 'center',
        fontSize: 20,
        fontWeight: 'bold'
    },
    teamPlayers: {
        alignItems:'center',
        backgroundColor: '#A2E8DD',
        padding: 10,
        borderRadius: 10,
        width: 150,
        margin: 10,
        shadowColor: '#171717',
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.4,
        shadowRadius: 3,
    },
    player: {
        margin: 2.5,
        fontSize: 17.5,
    },
    winner: {
        fontSize: 20,
        alignSelf: 'center',
        textAlign: 'center',
        padding: 10,
        fontWeight: 'bold'
    },
    scoreContainer: {
        backgroundColor: '#779CAB',
        height: 200,
        marginLeft: 20,
        marginRight: 20,
        borderRadius: 20,
        padding: 10,
        shadowColor: '#171717',
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.4,
        shadowRadius: 3,
    },
    endContainer: {
        backgroundColor: '#A2E8DD',
        margin: 10,
        borderRadius: 10,
        padding: 10,
        shadowColor: '#171717',
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.4,
        shadowRadius: 3,
    },
    roundTitle: {
        fontSize: 17.5,
        alignSelf: 'center',
        fontWeight: 'bold',
        marginBottom: 10,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        margin: 10,
    },
    imageStyle: {
        backgroundColor:'#779CAB',
        height: 100,
        width: 100,
        resizeMode: 'contain',
        alignSelf:'center'


    }

})

export default SingularGame;