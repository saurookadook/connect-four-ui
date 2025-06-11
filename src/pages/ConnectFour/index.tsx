import { FlexColumn, FlexRow } from '@src/layouts';
import { useAppStore } from '@src/store';
import { Board } from './components';
import './styles.css';

export function ConnectFour() {
  const { appState } = useAppStore();

  return (
    <section id="connect-four">
      <h2>{`🔴 ⚫ Connect Four 🔴 ⚫`}</h2>

      <FlexRow>
        <FlexColumn id="game-details">
          <h3>{`Active player: ${appState.connectFour.activePlayer}`}</h3>
        </FlexColumn>

        <FlexColumn id="game-board-container">
          <Board />
        </FlexColumn>
      </FlexRow>
    </section>
  );
}
