import React from 'react';
import { StyleSheet, View, Text, Pressable } from 'react-native';
import { Camera } from 'expo-camera';
import { useEffect, useState } from 'react/cjs/react.development';

const CameraScreen = ({navigation, route}) => {

    const item = route.params.item;
    const [hasPermission, setHasPermission] = useState(null);
    const getPermission = async () => {
        const { status } = await Camera.requestCameraPermissionsAsync();
        setHasPermission(status === 'granted');
    };

    let camera;
    const getPicture = async () => {
        if(camera) {
            const photo = await camera.takePictureAsync();
            navigation.navigate('Add Games', {screen: 'PhotoResult', params:{uri: photo.uri,item: item}});
        }
    }

    useEffect( () => {
        getPermission();
    }, []);

    if(hasPermission === null)
    {
        return <Text>Awaiting Permission</Text>
    }
    if(hasPermission === false)
    {
        return <Text>Access Denied!</Text>
    }

    return (
        <View style={styles.container}>
            <Camera style={styles.subContainer} ref={(ref) => {camera = ref}}>
                <Pressable style={styles.buttonStyle} onPress={() => {
                    getPicture()
                }}>
                    <Text style={styles.textStyle}>Take Picture!</Text>
                </Pressable>
            </Camera>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    subContainer: {
        flex: 1,
        backgroundColor: "transparent",
        flexDirection: "row-reverse",
        alignItems: "flex-end"
    },
    buttonStyle: {
        flex: 0.25,
        alignItems: "center",
    },
    textStyle: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        backgroundColor: '#779cab',
        paddingHorizontal: 10,
        paddingVertical: 10,
        margin: 10,
        shadowColor: '#171717',
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.4,
        shadowRadius: 3,
        textAlign: 'center',
    }
});

export default CameraScreen;