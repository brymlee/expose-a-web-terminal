import React, { useMemo, useState, useEffect } from 'react';
import { ReactThemes, ReactTerminalStateless } from 'react-terminal-component';
import { CommandMapping, defaultCommandMapping, Outputs, OutputFactory, EmulatorState, Emulator } from 'javascript-terminal';

export const Application = () => {
  const [state, setState] = useState({
    emulatorState: EmulatorState.create({
      commandMapping: CommandMapping.create({
        ...defaultCommandMapping,
      }),
    }),
    windowHeight: '0px',
    inputStr: '',
  });
  useEffect(() => {
    setState((i) => ({
      ...i,
      windowHeight: `${window.innerHeight}px`,
    }));
    window.addEventListener('resize', (_e) => {
      setState((i) => ({
        ...i,
        windowHeight: `${window.innerHeight}px`,
      }));
    });
  }, [setState]);
  return (
    <ReactTerminalStateless 
      theme={{ ...ReactThemes.hacker, height: state.windowHeight, }}
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
        setState((i) => { 
          return { ...i, inputStr: '', emulatorState: emulatorState, };
        });
      }}
    />
  );
};
