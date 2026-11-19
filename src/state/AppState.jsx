import { createContext, useCallback, useContext, useEffect, useMemo, useReducer } from 'react';
import {
  applyTheme,
  persistTheme,
  readStoredTheme,
  resolveTheme,
  systemTheme,
} from '../lib/theme.js';
import { invalidFields, validateWaitlist } from '../lib/validateWaitlist.js';

const emptyWaitlist = {
  name: '',
  email: '',
  teach: '',
  learn: '',
  format: 'either',
};

export const initialState = {
  theme: 'light',
  menuOpen: false,
  faqOpenId: 'expert',
  waitlist: {
    values: emptyWaitlist,
    attempted: false,
    succeeded: false,
  },
};

/**
 * @param {typeof initialState} state
 * @param {{ type: string, theme?: 'light' | 'dark', id?: string, field?: string, value?: string }} action
 */
export function appReducer(state, action) {
  switch (action.type) {
    case 'theme/set':
      return { ...state, theme: action.theme === 'dark' ? 'dark' : 'light' };
    case 'menu/open':
      return { ...state, menuOpen: true };
    case 'menu/close':
      return { ...state, menuOpen: false };
    case 'faq/toggle':
      return { ...state, faqOpenId: state.faqOpenId === action.id ? null : (action.id ?? null) };
    case 'waitlist/change':
      return {
        ...state,
        waitlist: {
          ...state.waitlist,
          values: { ...state.waitlist.values, [action.field]: action.value },
        },
      };
    case 'waitlist/submit': {
      const ok = invalidFields(validateWaitlist(state.waitlist.values)).length === 0;
      return {
        ...state,
        waitlist: { ...state.waitlist, attempted: true, succeeded: ok },
      };
    }
    case 'waitlist/edit':
      return { ...state, waitlist: { ...state.waitlist, succeeded: false } };
    default:
      return state;
  }
}

const AppStateContext = createContext(null);

export function AppStateProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState, (base) => ({
    ...base,
    theme: resolveTheme(),
  }));

  useEffect(() => {
    applyTheme(state.theme);
  }, [state.theme]);

  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const onChange = () => {
      if (readStoredTheme()) return;
      dispatch({ type: 'theme/set', theme: systemTheme() });
    };
    media.addEventListener('change', onChange);
    return () => media.removeEventListener('change', onChange);
  }, []);

  const toggleTheme = useCallback(() => {
    const next = state.theme === 'dark' ? 'light' : 'dark';
    persistTheme(next);
    dispatch({ type: 'theme/set', theme: next });
  }, [state.theme]);

  const openMenu = useCallback(() => dispatch({ type: 'menu/open' }), []);
  const closeMenu = useCallback(() => dispatch({ type: 'menu/close' }), []);
  const toggleFaq = useCallback((id) => dispatch({ type: 'faq/toggle', id }), []);
  const updateWaitlist = useCallback(
    (field, value) => dispatch({ type: 'waitlist/change', field, value }),
    [],
  );
  const submitWaitlist = useCallback(() => dispatch({ type: 'waitlist/submit' }), []);
  const editWaitlist = useCallback(() => dispatch({ type: 'waitlist/edit' }), []);

  const value = useMemo(
    () => ({
      ...state,
      toggleTheme,
      openMenu,
      closeMenu,
      toggleFaq,
      updateWaitlist,
      submitWaitlist,
      editWaitlist,
    }),
    [
      state,
      toggleTheme,
      openMenu,
      closeMenu,
      toggleFaq,
      updateWaitlist,
      submitWaitlist,
      editWaitlist,
    ],
  );

  return <AppStateContext.Provider value={value}>{children}</AppStateContext.Provider>;
}

export function useAppState() {
  const context = useContext(AppStateContext);
  if (!context) {
    throw new Error('useAppState must be used within AppStateProvider');
  }
  return context;
}
