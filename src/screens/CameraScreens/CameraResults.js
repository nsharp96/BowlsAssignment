import React from "react";
import { View, Image, StyleSheet, Pressable, Text } from 'react-native';
import { useContext, useEffect, useState } from 'react';
import NewGameContext from '../../../contexts/NewGameContext'


const CameraResults = ({navigation, route}) => {
    
    const item = route.params.item;
    const uri = route.params.uri;
    const { state, updateGame} = useContext(NewGameContext);
    const [scores, setScores] = useState(state.scores);

    return (
        <View style={styles.container}>
            <Image style={styles.imageStyle} source={{uri:uri}}/>
            <Text>  </Text>
            <View style={styles.cameraButtons}>

                <Pressable style={styles.button} onPress={() => {
                    navigation.navigate('Add Games', {screen: 'NewGameScreenThree', params:{photo: uri, item: item}});
                }}>

                    <Text>Add Photo</Text>
                </Pressable>
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    imageStyle: {
        flex: 1,
        alignSelf: "stretch",
    },
    cameraButtons: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        margin: 10,
        borderRadius: 10,
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
    }
});

export default CameraResults;