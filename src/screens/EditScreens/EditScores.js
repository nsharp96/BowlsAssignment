import { View, Text, StyleSheet, TextInput, Pressable, FlatList, SafeAreaView } from "react-native";
import { useState, useReducer, useEffect } from 'react';
import { useContext } from "react/cjs/react.development";
import GameContext from "../../../contexts/GameContext";
import SelectDropdown from 'react-native-select-dropdown';
import { Ionicons } from '@expo/vector-icons';

const EditScores = ({navigation, route}) => {

    const currentGame = route.params.currentGame;
    const { state, update, handleTeamsPoints } = useContext(GameContext);

    const [competition, setCompetition] = useState(currentGame.competition);
    const [date, setDate] = useState(currentGame.date);
    const [rink, setRink] = useState(currentGame.rink);
    const [teams, setTeams] = useState(currentGame.teams);
    const [scores, setScores] = useState(currentGame.scores);

    const teamNames = [ currentGame.teams[0].teamName, currentGame.teams[1].teamName ];
    const points = [1,2,3,4,5,6,7,8];

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Edit Scores</Text>
            <View style={styles.gameDetails}>
                <Text style={styles.compet}>Competition Name: {competition}</Text>
                <Text style={styles.detail}>{teams[0].teamName} VS {teams[1].teamName}</Text>
                <Text style={styles.detail}>Date: {date}</Text>
                <Text style={styles.detail}>Rink: {rink}</Text>
                
            </View>

            <View style={styles.teamScores}>
                <View >
                    <Text style={styles.teamName}>{teams[0].teamName}</Text>
                    <Text style={styles.teamPoint}>{handleTeamsPoints(1, scores)}</Text>
                </View>
                <View>
                    <Text style={styles.teamName}>{teams[1].teamName}</Text>
                    <Text style={styles.teamPoint}>{handleTeamsPoints(2, scores)}</Text>
                </View>
            </View>

            <View style={styles.addPoint}>
                <FlatList 
                    style={styles.flatList}
                    data={scores}
                    keyExtractor={(e) => e.id.toString()}
                    renderItem={ ({item}) => 
                        <View style={styles.scoreContainer}>
                            <Text style={styles.endTitle}> End {item.id} </Text>
                            <SelectDropdown 
                                data={teamNames}
                                style = {styles.selection}
                                defaultValue={item.selectedTeam}
                                renderDropdownIcon={isOpened => {
                                    return <Ionicons name={isOpened ? 'chevron-up-outline' : 'chevron-down-outline'} color={'black'} size={18} />;
                                  }}
                                defaultButtonText='Select Team'
                                onSelect={(selectedItem, index) => {
                                    setScores(scores.map( (end) => {
                                        if(end.id === item.id)
                                        {
                                            //Check if item.selectedpoint is not null - if not null change that team with said point and change selected team to selected one
                                            if(item.selectedPoint!="")
                                            {
                                                if(selectedItem===teams[0].teamName)
                                                {
                                                    console.log("Points given to team 1");
                                                    return { id: item.id, teamOne: item.selectedPoint, teamTwo: 0, selectedTeam: selectedItem, selectedPoint: item.selectedPoint};
                                                }
                                                else(selectedItem===teams[1].teamName)
                                                {
                                                    console.log("Points given to team 2");
                                                   return { id: item.id, teamOne: 0, teamTwo: item.selectedPoint, selectedTeam: selectedItem, selectedPoint: item.selectedPoint};
                                                }  
                                            }
                                            //If null just change selected team to selected one
                                            return { id: item.id, teamOne: item.teamOne, teamTwo: item.teamTwo, selectedTeam: selectedItem, selectedPoint: item.selectedPoint};
                                        }
                                        else{
                                            return end;
                                        }
                                    })) 
                               }}
                            />
                            <SelectDropdown 
                                data={points}
                                buttonStyle = {styles.selection}
                                renderDropdownIcon={isOpened => {
                                    return <Ionicons name={isOpened ? 'chevron-up-outline' : 'chevron-down-outline'} color={'black'} size={18} />;
                                  }}
                                defaultButtonText='Select Points'
                                defaultValue={item.selectedPoint}
                                onSelect={(selectedItem, index) => {
                                    setScores(scores.map( (end) => {
                                        if(end.id === item.id)
                                        {
                                            //Check if item.selectedpoint is not null - if not null change that team with said point and change selected team to selected one
                                            if(item.selectedTeam!="")
                                            {
                                                if(item.selectedTeam===teams[0].teamName)
                                                {
                                                    console.log("Points given to team 1");
                                                    return { id: item.id, teamOne: selectedItem, teamTwo: 0, selectedTeam: item.selectedTeam, selectedPoint: selectedItem};
                                                }
                                                else(item.selectedTeam===teams[1].teamName)
                                                {
                                                    console.log("Points given to team 2");
                                                   return { id: item.id, teamOne: 0, teamTwo: selectedItem, selectedTeam: item.selectedTeam, selectedPoint: selectedItem};
                                                }  
                                            }
                                            //If null just change selected Point to selected one
                                            return { id: item.id, teamOne: item.teamOne, teamTwo: item.teamTwo, selectedTeam: item.selectedTeam, selectedPoint: selectedItem};
                                        }
                                        else{
                                            return end;
                                        }
                                    })) 
                                }}
                            />   
                        </View>
                    }
                />    
            </View>

            <View style={styles.buttonContainer}>
                <Pressable style={styles.button} onPress={ () => {
                    console.log("Before set "+scores.length);
                    setScores([...scores, {id:scores.length+1, teamOne: 0, teamTwo: 0, selectedTeam: '', selectedPoint: '',photo:''}]);
                    console.log("After set"+scores.length+1);
                }}>
                        <Text>Add End</Text>
                </Pressable>

                {
                    scores.length!=1 &&
                    <Pressable style={styles.button} onPress={ () => {
                        console.log("Before set "+scores.length);
                        setScores(scores.filter( (e) => e.id != scores.length ));
                        console.log("After set"+scores.length+1);
                        }}>
                        <Text>Delete End</Text>
                    </Pressable>
                }

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

            


            
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    title:{
        fontSize: 30,
        textAlign: 'center',
        marginTop: 10,
        fontWeight: 'bold'
    },
    gameDetails: {
        backgroundColor:'#779cab',
        width: 350,
        alignSelf: 'center',
        marginTop: 10,
        borderRadius: 10,
        padding: 20,
        shadowColor: '#171717',
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.4,
        shadowRadius: 3,
    },
    teams: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginTop: 10,
    },
    compet: {
        fontSize: 18,
        alignSelf: 'center',
        marginBottom: 5,
    },
    detail: {
        fontSize: 15,
        alignSelf: 'center',
        margin: 1,
    },
    teamScores: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginTop: 20,
    },
    teamName : {
        alignSelf: 'center',
        fontSize: 20,
        fontWeight: 'bold'
    },
    teamPoint: {
        fontSize: 40,
        alignSelf: 'center',
    },
    addPoint : {
        backgroundColor: '#779cab',
        height: 325,
        width: 350,
        alignSelf: 'center',
        marginTop: 20,
        borderRadius: 20,
        shadowColor: '#171717',
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.4,
        shadowRadius: 3,
    },
    scoreContainer: {
        backgroundColor:'#a2e8dd',
        width: 300,
        margin: 20,
        alignSelf: 'center',
        borderRadius: 20,
        padding: 10,
        alignItems: 'center',
        shadowColor: '#171717',
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.4,
        shadowRadius: 3,

    },
    selection: {
        margin: 10,
    },
    endTitle: {
        fontSize:20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        backgroundColor: '#779cab',
        paddingHorizontal: 10,
        paddingVertical: 10,
        margin: 10,
        width: 150,
        shadowColor: '#171717',
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.4,
        shadowRadius: 3,
    },
    buttonContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        marginTop: 10,
    }

});

export default EditScores;