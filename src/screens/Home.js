import { Text, View, Button, StyleSheet, Pressable, Image, SafeAreaView } from 'react-native';

const Home = ({navigation}) => {
    return (
        <SafeAreaView style={styles.container}>
            <Image style ={styles.image} source={require('../../assets/bowls.jpg')}/>
            <Pressable style={styles.button} onPress={() => navigation.navigate('Add Games', {screen: 'NewGame'})} >
                <Text style={styles.text}>Create a New Game</Text>
            </Pressable>
            <Pressable style={styles.button} onPress={() => navigation.navigate('View Games', {screen: 'ListAllGames'})}>
                <Text style={styles.text}>View all Games</Text>
            </Pressable>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        backgroundColor: '#779CAB',
        paddingHorizontal: 20,
        paddingVertical: 20,
        marginTop: 50,
        shadowColor: '#171717',
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.4,
        shadowRadius: 3,
    },
    text: {
        color: 'white',
        fontSize: 20,
    },
    image: {
        height: 250,
        width: 350,
        marginTop: 100,
    },
    container: {
        justifyContent: 'center',
        alignItems:'center',
    }
});

export default Home;