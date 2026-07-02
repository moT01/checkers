import type { Board as BoardType, Mode, Player } from '../gameLogic'
import { Square } from './Square'
import './Board.css'

interface Props {
  board: BoardType
  selectedIndex: number | null
  validMoveDestinations: number[]
  jumpDestinations: number[]
  currentTurn: Player
  onSquareClick: (index: number) => void
  disabled: boolean
  flipped?: boolean
  mode: Mode
  playerSide: Player
}

export function Board({ board, selectedIndex, validMoveDestinations, jumpDestinations, currentTurn, onSquareClick, disabled, flipped, mode, playerSide }: Props) {
  const indices = flipped
    ? Array.from({ length: 64 }, (_, i) => 63 - i)
    : Array.from({ length: 64 }, (_, i) => i)

  function getPlayerLabel(player: Player): string {
    if (mode === 'vs-computer') {
      return player === playerSide ? 'Your' : "Opponent's"
    }
    return player === 'Light' ? "Player 1's" : "Player 2's"
  }

  return (
    <div className={`board${disabled ? ' board--disabled' : ''} board--turn-${currentTurn.toLowerCase()}`}>
      {indices.map((index, visualPos) => {
        const row = Math.floor(index / 8)
        const col = index % 8
        const isDark = (row + col) % 2 === 1
        const visualRow = Math.floor(visualPos / 8) + 1
        const visualCol = (visualPos % 8) + 1
        return (
          <Square
            key={index}
            piece={board[index]}
            isDark={isDark}
            isSelected={index === selectedIndex}
            isValidDestination={validMoveDestinations.includes(index)}
            isJumpDestination={jumpDestinations.includes(index)}
            onClick={() => onSquareClick(index)}
            row={visualRow}
            col={visualCol}
            getPlayerLabel={getPlayerLabel}
          />
        )
      })}
    </div>
  )
}
