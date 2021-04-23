import React, { useMemo, useState, useEffect } from 'react';
import { ReactThemes, ReactTerminalStateless } from 'react-terminal-component';
import { CommandMapping, defaultCommandMapping, Outputs, OutputFactory, EmulatorState, Emulator } from 'javascript-terminal';

const stub = (type: string) => ({
  'function': (_state, _opts) => {
    return {
      output: OutputFactory.makeErrorOutput({ source: 'Command not found', type: type, }),
    };
  },
  'optDef': {}
});

export const Application = () => {
  const [defaultState, setState] = useState({
    emulatorState: EmulatorState.create({
      commandMapping: CommandMapping.create({
        ...defaultCommandMapping,
        'cat': stub('cat'),
        'cd': stub('cd'),
        'clear': stub('clear'),
        'cp': stub('cp'),
        'echo': stub('echo'),
        'head': stub('head'),
        'history': stub('history'), 
        'ls': stub(''),
        'mkdir': stub('mkdir'),
        'printenv': stub('printenv'),
        'pwd': stub('pwd'),
        'rm': stub('rm'),
        'rmdir': stub('rmdir'),
        'tail': stub('tail'),
        'touch': stub('touch'),
        'whoami': stub('whoami'),
      }),
    }),
    windowHeight: '0px',
    inputStr: '',
    user: 'nameless',
  });
  const whoami = useMemo(
    () => ({
      'function': (_state, _opts) => {
        const { user } = defaultState;
        return {
          output: OutputFactory.makeTextOutput(user),
        };
      },
      'optDef': {},
    }),
    [defaultState.user]
  );
  const state = useMemo(
    () => {
      const s = defaultState.emulatorState;
      const defaultCommandMapping = s.commandMapping;
      return {
        ...defaultState,
        emulatorState: s.setCommandMapping(CommandMapping.create({
          ...defaultCommandMapping, 
          'whoami': whoami,
        })),
      };
    }, 
    [whoami, defaultState]
  );
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
      promptSymbol={`\/\/${state.user} \$ `}
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
