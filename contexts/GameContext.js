import React, { useReducer, useEffect } from 'react';
import { actionTypes } from '../helpers/actionTypes';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';

const STORAGE_KEY = "my_super_secret_key";

const GameContext = React.createContext();

let initialState = []

const reducer = (state, action) => {
    switch (action.type) {
        case actionTypes.create:
            return [
                ...state,
                {
                    id: uuid.v4(),
                    competition: action.payload.competition,
                    date: action.payload.date,
                    rink: action.payload.rink,
                    teams: action.payload.teams,
                    scores: action.payload.scores
                }
            ];
        case actionTypes.update:
            return state.map( (e) => {
                if (e.id === action.payload.id) {
                    return {
                        id: action.payload.id,
                        competition: action.payload.competition,
                        date: action.payload.date,
                        rink: action.payload.rink,
                        teams: action.payload.teams,
                        scores: action.payload.scores
                    }
                }
                else {
                    return e;
                }
            });
        case actionTypes.delete:
            return state.filter( (e) => e.id !== action.payload.id);
        case actionTypes.save:
            try 
            {
                AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(state));
            }
            catch(e)
            {
                console.log(e);
            }
            finally{
                return state;
            }
        case actionTypes.load:
            return [
                ...state, {
                    id: state.length+1,
                    competition: action.payload.competition,
                    date: action.payload.date,
                    rink: action.payload.rink,
                    teams: action.payload.teams,
                    scores: action.payload.scores
                }
            ]
        default:
            return state;
    }
};

export const GameProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect( () => {
        const loadStorage = async () => {
            const storage = await AsyncStorage.getItem(STORAGE_KEY);
            console.log(JSON.parse(storage));
            if(storage !== null && state.length === 0) {
                initialState = JSON.parse(storage);
                initialState.forEach(game => {
                    dispatch({type: actionTypes.load, payload: game});
                })
            }
        }
        loadStorage();
    }, [STORAGE_KEY])

    const addGame = (competition, date, rink, teams, scores, callback) => {
        dispatch( {type: actionTypes.create, payload: {competition, date, rink, teams, scores}});
        dispatch({type:actionTypes.save});
        console.log(state);
        if (callback){
            callback();
        }
    };

    const deleteGame = (id, callback) => {
        dispatch({type:actionTypes.delete, payload: {id:id}});
        dispatch({type:actionTypes.save});
        if (callback){
            callback();
        }
    };

    const updateGame = (id, competition, date, rink, teams, scores, callback) => {
        dispatch( {type: actionTypes.update, payload: {id, competition, date, rink, teams, scores}});
        dispatch({type:actionTypes.save});
        if(callback)
        {
            callback();
        }
    }

    const handleTeamsPoints = (number, scores) => {
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
        <GameContext.Provider value={{
            state:state,
            create: addGame,
            remove: deleteGame,
            update: updateGame,
            handleTeamsPoints: handleTeamsPoints,
            }}>
            {children}
        </GameContext.Provider>
    );
};

export default GameContext;