import { View, Text, StyleSheet, FlatList, Pressable, TextInput, SafeAreaView, ScrollView, Alert } from 'react-native';
import { useState, useReducer, useEffect } from 'react';
import { useContext } from 'react/cjs/react.development';
import ItemContext from '../../contexts/GameContext';
import NewGameContext from '../../contexts/NewGameContext';

const NewGameScreenTwo = ({navigation, route}) => {
    const {create} = useContext(ItemContext);
    const {state, updateGame} = useContext(NewGameContext);
    const [competition, setCompetition] = useState(state.competition);
    const [date, setDate ] = useState(state.date);
    const [rink, setRink] = useState(state.rink);
    const [teams, setTeams] = useState(state.teams);
    const [scores, setScores] = useState(state.scores);

    console.log("Second Screen: Compet: "+competition);
    console.log("Second Screen: date "+date);
    console.log("Second Screen: rink: "+rink);
    console.log("Second Screen: teams: "+teams[0].teamName+" "+teams[1].teamName);
    console.log("Second Screen: Compet: "+scores[0].teamOne);

    console.log(competition);

    useEffect(() => {
        handleUpdateState();
    }, [state])

    const handleUpdateState = () => {
        console.log("2. change state")
        setCompetition(state.competition);
        setDate(state.date)
        setRink(state.rink)
        setTeams(state.teams)
        setScores(state.scores)
    }

    return (
        <SafeAreaView>
            <Text style={styles.Maintitle}>Add Teams</Text>
            <View style={styles.playercontainer}>
                <Text style={styles.title}>Team 1</Text>
                <Text>Enter Team Name: </Text>
                <TextInput 
                    style= {styles.playerBox}
                    placeholder='Enter Team name'
                    value={teams[0].teamName}
                    onChangeText={(text) => {
                        console.log(teams[0].teamName)
                        setTeams(teams.map( (team) => {
                            if(team.id==1)
                            {
                                return {id:team.id, teamName: text, teamPlayers: team.teamPlayers}
                            }
                            return team
                        }))
                    }}
                />
                <View style={styles.flatListContainer}> 
                    <FlatList 
                        style={styles.flatList}
                        numColumns={2}
                        scrollEnabled={false}
                        style={styles.listContainer}
                        data={teams[0].teamPlayers}
                        keyExtractor={(e) => e.id.toString()}
                        renderItem = { ({item}) => 
                            <TextInput 
                                style={styles.playerBox}
                                placeholder={`Player ${item.id}`}
                                value={teams[0].teamPlayers[item.id-1].playerName}
                                onChangeText={(text) => {
                                    setTeams(teams.map ( (team) => {
                                        console.log('Team 1')
                                        console.log(teams[0].teamPlayers[0])
                                        if (team.id==1)
                                        {
                                            const newPlayers = team.teamPlayers.map( (player) => {
                                                if(player.id==item.id)
                                                {
                                                    return {id: item.id, playerName: text}
                                                }
                                                return player
                                            })
                                            return {id:team.id, teamName: team.teamName, teamPlayers: newPlayers}
                                        }
                                        return team
                                    }))
                                }}
                            />
                        }
                    />

                </View>   
                <View style={styles.buttonContainer}>

                    {teams[0].teamPlayers.length<4 &&
                    <Pressable
                        style={styles.button}
                        onPress={ () => {
                            setTeams(teams.map( (team) => {
                                if(team.id===1)
                                {
                                    return {id:team.id, teamName:team.teamName, teamPlayers:[...team.teamPlayers, {id:team.teamPlayers.length+1, playerName: `Player ${team.teamPlayers.length+1}`}]}
                                }
                                return team
                            }))
                        }}
                    >
                        <Text>Add Player</Text>
                    </Pressable>
                    }

                    {!(teams[0].teamPlayers.length<2) &&
                        <Pressable
                            style={styles.button}
                            onPress={ () => {
                                setTeams(teams.map((team) => {
                                    if(team.id==1)
                                    {
                                        team.teamPlayers.pop();
                                    }
                                    return team
                                }))
                            }}
                        >
                            <Text>Remove Player</Text>
                        </Pressable>
                    }

                </View>  

                


            </View>

            <View style={styles.playercontainer}>
                <Text style={styles.title}>Team 2</Text>
                <View style={styles.nameContainer}>
                    <Text>Enter Team Name: </Text>
                    <TextInput 
                        style= {styles.playerBox}
                        placeholder='Enter Team name'
                        value={teams[1].teamName}
                        onChangeText={(text) => {
                            setTeams(teams.map( (team) => {
                                if(team.id==2)
                                {
                                    return {id:team.id, teamName: text, teamPlayers: team.teamPlayers}
                                }
                                return team
                            }))
                        }}
                    />
                </View>
                

                <View style={styles.flatListContainer}> 
                    <FlatList 
                        style={styles.flatList}
                        numColumns={2}
                        scrollEnabled={false}
                        style={styles.listContainer}
                        data={teams[1].teamPlayers}
                        keyExtractor={(e) => e.id.toString()}
                        renderItem = { ({item}) => 
                            <TextInput 
                                style={styles.playerBox}
                                placeholder={`Player ${item.id}`}
                                value={teams[1].teamPlayers[item.id-1].playerName}
                                onChangeText={(text) => {
                                    setTeams(teams.map ( (team) => {
                                        console.log('Team 2')
                                        console.log(teams[1].teamPlayers)
                                        if (team.id==2)
                                        {
                                            const newPlayers = team.teamPlayers.map( (player) => {
                                                if(player.id==item.id)
                                                {
                                                    return {id: item.id, playerName: text}
                                                }
                                                return player
                                            })
                                            return {id:team.id, teamName: team.teamName, teamPlayers: newPlayers}
                                        }
                                        return team
                                    }))
                                }}
                            />
                        }
                    />

                </View>   
                <View style={styles.buttonContainer}>

                    {teams[1].teamPlayers.length<4 &&
                    <Pressable
                        style={styles.button}
                        onPress={ () => {
                            setTeams(teams.map( (team) => {
                                if(team.id===2)
                                {
                                    return {id:team.id, teamName:team.teamName, teamPlayers:[...team.teamPlayers, {id:team.teamPlayers.length+1, playerName: `Player ${team.teamPlayers.length+1}`}]}
                                }
                                return team
                            }))
                        }}
                    >
                        <Text>Add Player</Text>
                    </Pressable>
                    }

                    {!(teams[1].teamPlayers.length<2) &&
                        <Pressable
                            style={styles.button}
                            onPress={ () => {
                                setTeams(teams.map((team) => {
                                    if(team.id==2)
                                    {
                                        team.teamPlayers.pop();
                                    }
                                    return team
                                }),)
                                
                            }}
                        >
                            <Text>Remove Player</Text>
                        </Pressable>
                    }

                </View>  

                


            </View>

            <View style={styles.buttonContainer}>
                <Pressable
                    style={styles.updatebutton}
                    onPress={() => {
                        updateGame(competition, date, rink, teams, scores, () => {
                            navigation.pop()})
                    }}
                >
                    <Text>Back</Text>
                </Pressable>

                <Pressable
                    style={styles.updatebutton}
                    onPress={() => {
                        if(teams[0].teamName==='Team One'||teams[1].teamName==='Team Two')
                        {
                            Alert.alert('Team Names must be updated from the default.')
                        }
                        else{
                            updateGame(competition, date, rink, teams, scores),
                        navigation.navigate('Add Games', {screen: 'NewGameScreenThree'})}
                        }
                        }       
                >
                    <Text>Next</Text>
                </Pressable>

            </View>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    Maintitle:{
        fontSize: 30,
        fontWeight: 'bold',
        color: 'black',
        marginTop: 5,
        alignSelf: 'center'
    },
    playercontainer: {
        alignItems: 'center',
        backgroundColor:'#779cab',
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 10,
        marginTop: 10,
        borderRadius: 10,
        shadowColor: '#171717',
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.4,
        shadowRadius: 3,
    },
    flatListContainer: {
        width: '90%',
        alignItems: 'center'
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    playerBox : {
        marginTop: 5,
        borderWidth: 1,
        width: 125,
        padding: 10,
        margin: 5
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        backgroundColor: '#A2E8DD',
        paddingHorizontal: 10,
        paddingVertical: 10,
        margin: 10,
        width: 125,
        shadowColor: '#171717',
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.4,
        shadowRadius: 3,
    },
    updatebutton:{
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        backgroundColor: '#779cab',
        paddingHorizontal: 10,
        paddingVertical: 10,
        margin: 5,
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
        margin: 10,
    },
    labelTitle: {
        marginBottom: 5,
        fontSize: 15,
    },
    labelContainer : {
        marginTop: 5,
        borderWidth: 1,
        width: 120,
        height: 45,
        padding: 0,
    },
    createGameContainer: {
        backgroundColor: 'lightblue',
        width: '90%',
        height: '50%',
        borderRadius: 20,
        padding: 10,
        alignItems: 'center'

    },
    inputContainer : {
        flexDirection: 'row',
    }
});

export default NewGameScreenTwo;