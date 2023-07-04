import React, {useReducer} from 'react';
import { actionTypes } from '../helpers/actionTypes';

const NewGameContext = React.createContext();

let initialState = {
    competition: '',
    date: '',
    rink: '',
    teams: 
    [
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
    ],
    scores: 
    [
        {
            id: 1,
            teamOne: 0,
            teamTwo: 0,
            selectedTeam: '',
            selectedPoint: 0,
            photo: ''
        }
    ]
};

const reducer = (state, action) => {
    switch(action.type){
        case actionTypes.update:
            return action.payload;     
            
        case 'Refresh':
            return action.payload;
        default:
            return state;
            
    }
};

export const NewGameContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const updateGame = (competition, date, rink, teams, scores, callback) => {
        dispatch({type:actionTypes.update, payload:{competition, date, rink, teams, scores}});
        //dispatch({type:actionTypes.update, payload: initialState});
        console.log(state);
        console.log("UPDATE  old state:"+state.competition+" new state: "+competition+" "+state.date+" "+rink+" "+teams[0].teamName+"uri"+state.scores[0].photo);
        if (callback)
        {
            callback();
        }
    };

    const refreshGame = (competition, date, rink, teams, scores, callback) => {
        // dispatch({type:actionTypes.update, payload:{competition, date, rink, teams, scores}});
        dispatch({type:actionTypes.update, payload: initialState});
        console.log(state);
        console.log("UPDATE  old state:"+state.competition+" new state: "+competition+" "+state.date+" "+rink+" "+teams[0].teamName+"uri"+state.scores[0].photo);
        if (callback)
        {
            callback();
        }
    };

    return (
        <NewGameContext.Provider value={{
            state: state,
            updateGame: updateGame,
            refreshGame: refreshGame,
        }}>
            {children}
        </NewGameContext.Provider>
    );
};

export default NewGameContext;

