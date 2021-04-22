import React, { useState } from 'react';
import { ReactThemes, ReactTerminalStateless } from 'react-terminal-component';
import { Outputs, OutputFactory, EmulatorState } from 'javascript-terminal';

export const Application = () => {
  const [isChangingState, setIsChangingState] = useState(false);
  const [state, setState] = useState({
    emulatorState: EmulatorState.createEmpty(),
    inputStr: '',
  });
  return (
    <div onKeyPress={(e) => { 
      if(!isChangingState){
        setIsChangingState(true);
        const { key } = e;
        setState((i) => {
          return {
            ...i,
            emulatorState: key === 'Enter' ? i.emulatorState.setOutputs(
              Outputs.addRecord(
                i.emulatorState.getOutputs(), 
                OutputFactory.makeTextOutput('')
              )
            ) : i.emulatorState,
          };
        });
        setIsChangingState(false);
      }
    }}>
      <ReactTerminalStateless 
        theme={{ ...ReactThemes.hacker, height: `${window.innerHeight}px`, }}
        emulatorState={state.emulatorState}
        inputStr={state.inputStr}
        onInputChange={(inputStr) => { 
          setState((i) => 
            ({ 
              ...i, 
              inputStr: inputStr, 
            })
          ); 
        }}
        onStateChange={(emulatorState) => {
          setState((i) => ({ ...i, emulatorState: emulatorState, }));
        }}
      />
    </div>
  );
};
