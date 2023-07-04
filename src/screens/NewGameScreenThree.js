import { View, Text, StyleSheet, FlatList, TextInput, Pressable, Image, SafeAreaView, Alert } from 'react-native';
import { useContext, useEffect, useState } from 'react';
import NewGameContext from '../../contexts/NewGameContext';
import SelectDropdown from 'react-native-select-dropdown';
import { Ionicons } from '@expo/vector-icons';
import GameContext from '../../contexts/GameContext';


const NewGameScreenThree = ({navigation, route}) => {

    const { state, updateGame, refreshGame} = useContext(NewGameContext);
    const {create} = useContext(GameContext);
    const [competition, setCompetition] = useState(state.competition);
    const [date, setDate] = useState(state.date);
    const [rink, setRink] = useState(state.rink);
    const [teams, setTeams] = useState(state.teams);
    const [scores, setScores] = useState(state.scores);


    useEffect(() => {
        handleUpdateState();
    }, [state])

    const handleUpdateState = () => {
        console.log("2. change state")
        setCompetition(state.competition);
       // setDate(state.date)
        setRink(state.rink)
        setTeams(state.teams)
        setScores(state.scores)
    }

    const handlePhotoUpdate = (id,uri) => {
        setScores(scores.map( (end) => {
            if (end.id===id)
            {
                console.log("update photo in scores")
                return { id: end.id, teamOne: end.teamOne, teamTwo: end.teamTwo, selectedTeam: end.selectedTeam, selectedPoint: end.selectedPoint, photo: uri};
            }
            else{
                return end
            }
        }))
    }

    useEffect(() => {
        if(route.params?.photo)
        {
            handlePhotoUpdate(route.params.item.id, route.params.photo);
            console.log("wooo"+route.params.photo)
        }
        else {
            console.log("no photo")
        }
    }, [route.params?.photo]);

    const emptyTeam = [
        {
            id:1,
            teamName: 'Team One',
            teamPlayers: 
            [
                {
                    id: 1,
                    playerName: 'Player 1'
                    },
                  
            ]
        },
        {
            id:2,
            teamName: 'Team 2',
            date: '',
            rink: '',
            teamPlayers: 
            [
                {
                    id: 1,
                    playerName: 'Player 1'
                }
            ]
        }
    ];

    const emptyScores = [
        {
            id: 1,
            teamOne: 0,
            teamTwo: 0,
            selectedTeam: '',
            selectedPoint: 0,
            photo: ''
        }
    ];
    


    console.log("Third Screen: Compet: "+competition);
    console.log("Third Screen: date "+date);
    console.log("Third Screen: rink: "+rink);
    console.log("Third Screen: teams: "+teams[0].teamName+" "+teams[1].teamName);
    console.log("Third Screen: Compet: "+scores[0].teamOne);
    console.log("Third Screen: photo: "+scores[0].photo);

    const teamNames = [ teams[0].teamName, teams[1].teamName ];
    const points = [1,2,3,4,5,6,7,8];


    const teamsPoints = (number, scores) => {
        var outcome = 0;
        if(scores.length!=0)
        {
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
        }
         return outcome;
     };

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Add Scores</Text>
            <View style={styles.gameDetails}>
                <Text style={styles.compet}>Competition Name: {competition}</Text>
                <Text style={styles.detail}>{teams[0].teamName} VS {teams[1].teamName}</Text>
                <Text style={styles.detail}>Date: {date.toLocaleString()}</Text>
                <Text style={styles.detail}>Rink: {rink}</Text>
                
            </View>

            <View style={styles.teamScores}>
                <View >
                    <Text style={styles.teamName}>{teams[0].teamName}</Text>
                    <Text style={styles.teamPoint}>{teamsPoints(1, scores)}</Text>
                </View>
                <View>
                    <Text style={styles.teamName}>{teams[1].teamName}</Text>
                    <Text style={styles.teamPoint}>{teamsPoints(2, scores)}</Text>
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
                                                    return { id: item.id, teamOne: item.selectedPoint, teamTwo: 0, selectedTeam: selectedItem, selectedPoint: item.selectedPoint, photo: item.photo};
                                                }
                                                else(selectedItem===teams[1].teamName)
                                                {
                                                    console.log("Points given to team 2");
                                                   return { id: item.id, teamOne: 0, teamTwo: item.selectedPoint, selectedTeam: selectedItem, selectedPoint: item.selectedPoint, photo:item.photo};
                                                }  
                                            }
                                            //If null just change selected team to selected one
                                            return { id: item.id, teamOne: item.teamOne, teamTwo: item.teamTwo, selectedTeam: selectedItem, selectedPoint: item.selectedPoint, photo: item.photo};
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
                                                    return { id: item.id, teamOne: selectedItem, teamTwo: 0, selectedTeam: item.selectedTeam, selectedPoint: selectedItem, photo: item.photo};
                                                }
                                                else(item.selectedTeam===teams[1].teamName)
                                                {
                                                    console.log("Points given to team 2");
                                                   return { id: item.id, teamOne: 0, teamTwo: selectedItem, selectedTeam: item.selectedTeam, selectedPoint: selectedItem, photo: item.photo};
                                                }  
                                            }
                                            //If null just change selected Point to selected one
                                            return { id: item.id, teamOne: item.teamOne, teamTwo: item.teamTwo, selectedTeam: item.selectedTeam, selectedPoint: selectedItem, photo:item.photo};
                                        }
                                        else{
                                            return end;
                                        }
                                    })) 
                                }}
                            />   
                            {item.photo &&
                                <Image style={styles.imageStyle} source={{uri:item.photo}}/>
                            }
                            
                            
                                
                            <Pressable style={styles.button} onPress={() => {
                                navigation.navigate('Add Games', {screen: 'TakePhoto', params: {item: item}})
                                }}> 
                                <Text>Add Photo to End</Text>
                            </Pressable>
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
                
                

                <Pressable style={styles.button} onPress={ () => {
                    if (scores[0].selectedTeam===''||scores[0].selectedPoint==='')
                    {
                        Alert.alert('At least one end must be played to create a game. Please enter the winner and points scored of the end.')
                    }
                    else{
                        create(competition, date.toDateString(), rink, teams, scores, () => {
                            refreshGame('', '', '', emptyTeam, emptyScores),
                            navigation.pop(),
                            navigation.pop()             
                        })

                    }   
                }}>
                        <Text>Create Game</Text>
                </Pressable>

                <Pressable
                    style={styles.button}
                    onPress={() => {
                        updateGame(competition, date, rink, teams, scores),
                        navigation.pop()
                    }
                        }
                >
                    <Text>Back</Text>
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
        height: 290,
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
        margin: 10,
        flexWrap: 'wrap',
        justifyContent: 'center'
    },
    imageStyle: {
        backgroundColor:'#779cab',
        height: 100,
        width: 100,
        resizeMode: 'contain'

    }

});

export default NewGameScreenThree;