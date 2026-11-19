import { useEffect, useReducer } from 'react';
import { fallbackRepos } from '../content/site.js';
import { fetchLearningRepos, formatStars } from '../lib/github.js';
import { Section } from './Section.jsx';

const initial = { status: 'loading', repos: [] };

function projectsReducer(state, action) {
  switch (action.type) {
    case 'success':
      return { status: 'success', repos: action.repos };
    case 'empty':
      return { status: 'empty', repos: [] };
    case 'error':
      return { status: 'error', repos: [] };
    default:
      return state;
  }
}

export function Projects() {
  const [state, dispatch] = useReducer(projectsReducer, initial);

  useEffect(() => {
    const controller = new AbortController();
    const timeout = AbortSignal.timeout(8000);
    const signal = AbortSignal.any([controller.signal, timeout]);

    fetchLearningRepos(signal)
      .then((repos) => {
        if (controller.signal.aborted) return;
        if (repos.length === 0) dispatch({ type: 'empty' });
        else dispatch({ type: 'success', repos });
      })
      .catch((error) => {
        if (controller.signal.aborted) return;
        if (error?.name === 'AbortError') return;
        dispatch({ type: 'error' });
      });

    return () => controller.abort();
  }, []);

  const live = state.status === 'success';
  const repos = live ? state.repos : state.status === 'loading' ? [] : fallbackRepos;

  return (
    <Section
      id="proofs"
      tint
      defer
      eyebrow="Open proofs"
      title="Repositories you could teach from."
      intro="A live search of public GitHub projects tagged for learning to code. No API key. If GitHub is quiet, a saved shelf stands in so the page still has somewhere to start."
    >
      {state.status === 'loading' ? (
        <div>
          <p className="hp-status" role="status">
            Loading public learning repositories.
          </p>
          <ul className="hp-project-grid" aria-hidden="true">
            {fallbackRepos.map((repo) => (
              <li key={repo.name} className="hp-card hp-skeleton">
                <span />
                <span />
                <span />
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {state.status === 'error' ? (
        <p className="hp-status hp-status-error" role="alert">
          Live GitHub search is unavailable right now. Showing a saved shelf of public learning
          repositories instead.
        </p>
      ) : null}

      {state.status === 'empty' ? (
        <p className="hp-status" role="status">
          No public repositories came back from that search. Showing a saved shelf instead.
        </p>
      ) : null}

      {state.status !== 'loading' ? (
        <>
          <p className="hp-shelf-label">{live ? 'Live from GitHub' : 'Saved shelf'}</p>
          <ul className="hp-project-grid">
            {repos.map((repo) => (
              <li key={repo.name} className="hp-card hp-project">
                <h3>
                  <a href={repo.url} target="_blank" rel="noopener noreferrer">
                    {repo.name}
                    <span className="hp-sr"> (opens in a new tab)</span>
                  </a>
                </h3>
                <p>{repo.description}</p>
                <p className="hp-project-meta">
                  <span>{repo.language}</span>
                  {typeof repo.stars === 'number' ? (
                    <span>{formatStars(repo.stars)} stars</span>
                  ) : null}
                </p>
              </li>
            ))}
          </ul>
        </>
      ) : null}
    </Section>
  );
}
