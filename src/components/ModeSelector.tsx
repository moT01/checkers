import { useState } from 'react'
import type { Mode, Player } from '../gameLogic'
import './ModeSelector.css'

interface Props {
  onStart: (mode: Mode, playerSide: Player) => void
  onResume: () => void
  hasSavedGame: boolean
  wins: number
}

export function ModeSelector({ onStart, onResume, hasSavedGame, wins }: Props) {
  const [mode, setMode] = useState<Mode>('vs-computer')
  const [playerSide, setPlayerSide] = useState<Player>('Light')

  function handleTabKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
    const tabs = Array.from(e.currentTarget.querySelectorAll<HTMLButtonElement>('[role="tab"]'))
    const currentIndex = tabs.findIndex(t => t === document.activeElement)
    if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
      e.preventDefault()
      const dir = e.key === 'ArrowRight' ? 1 : -1
      const next = tabs[(currentIndex + dir + tabs.length) % tabs.length]
      next.focus()
      setMode(next.dataset.mode as Mode)
    }
  }

  return (
    <div className="home-body">
      <div role="tablist" className="mode-tabs" onKeyDown={handleTabKeyDown}>
        <button
          role="tab"
          id="tab-vs-computer"
          aria-selected={mode === 'vs-computer'}
          aria-controls="tabpanel-mode"
          tabIndex={mode === 'vs-computer' ? 0 : -1}
          className={`tab-btn${mode === 'vs-computer' ? ' tab-btn--active' : ''}`}
          onClick={() => setMode('vs-computer')}
          data-mode="vs-computer"
        >
          vs Computer
        </button>
        <button
          role="tab"
          id="tab-vs-player"
          aria-selected={mode === 'vs-player'}
          aria-controls="tabpanel-mode"
          tabIndex={mode === 'vs-player' ? 0 : -1}
          className={`tab-btn${mode === 'vs-player' ? ' tab-btn--active' : ''}`}
          onClick={() => setMode('vs-player')}
          data-mode="vs-player"
        >
          2 Player
        </button>
      </div>

      <div role="tabpanel" id="tabpanel-mode" aria-labelledby={`tab-${mode}`} className="mode-tabpanel">
        {mode === 'vs-computer' && (
          <>
            <div className="wins-row">
              <span className="wins-row-label">Wins</span>
              <span className="wins-num">{wins}</span>
            </div>
            <div className="pill-toggle">
              <button
                className={`pill-btn${playerSide === 'Light' ? ' pill-btn--active' : ''}`}
                aria-pressed={playerSide === 'Light'}
                onClick={() => setPlayerSide('Light')}
              >
                Go First
              </button>
              <button
                className={`pill-btn${playerSide === 'Dark' ? ' pill-btn--active' : ''}`}
                aria-pressed={playerSide === 'Dark'}
                onClick={() => setPlayerSide('Dark')}
              >
                Go Second
              </button>
            </div>
          </>
        )}
      </div>

      <div className="home-actions">
        <button className="primary-btn" onClick={() => onStart(mode, playerSide)}>
          New Game
        </button>
        {hasSavedGame && (
          <button className="secondary-btn" onClick={onResume}>
            Resume Game
          </button>
        )}
      </div>
    </div>
  )
}
