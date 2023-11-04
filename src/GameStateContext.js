import React, { createContext, useContext, useReducer, useEffect } from 'react';

const GameStateContext = createContext();

export function useGameState() {
  return useContext(GameStateContext);
}

const initialState = {
  squares: Array(9).fill(null),
};

function gameStateReducer(state, action) {
  switch (action.type) {
    case 'RESET':
      return initialState;
    case 'UPDATE_SQUARES':
      return { ...state, squares: action.payload };
    default:
      return state;
  }
}

export function GameStateProvider({ children }) {
  const [state, dispatch] = useReducer(gameStateReducer, initialState);

  useEffect(() => {
    // Load saved state from localStorage
    const savedState = localStorage.getItem('ticTacToeState');
    if (savedState) {
      dispatch({ type: 'UPDATE_SQUARES', payload: JSON.parse(savedState) });
    }
  }, []);

  // Save state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('ticTacToeState', JSON.stringify(state.squares));
  }, [state.squares]);

  return (
    <GameStateContext.Provider value={{ state, dispatch }}>
      {children}
    </GameStateContext.Provider>
  );
}
