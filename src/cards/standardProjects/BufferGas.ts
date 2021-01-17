import {Player} from '../../Player';
import {CardName} from '../../CardName';
import {CardMetadata} from '../CardMetadata';
import {CardRenderer} from '../render/CardRenderer';
import {REDS_RULING_POLICY_COST} from '../../constants';
import {StandardProjectCard} from './StandardProjectCard';
import {PartyHooks} from '../../turmoil/parties/PartyHooks';
import {PartyName} from '../../turmoil/parties/PartyName';

export class BufferGas extends StandardProjectCard {
  public name = CardName.STANDARD_BUFFER_GAS;
  public cost = 16;

  public canAct(player: Player): boolean {
    if (player.game.isSoloMode() === false || player.game.gameOptions.soloTR === false) {
      return false;
    }

    let cost = this.cost;
    if (PartyHooks.shouldApplyPolicy(player.game, PartyName.REDS)) cost += REDS_RULING_POLICY_COST;

    return player.canAfford(cost);
  }

  actionEssence(player: Player): void {
    player.increaseTerraformRating(player.game);
  }

  public metadata: CardMetadata = {
    cardNumber: 'SP3',
    renderData: CardRenderer.builder((b) =>
      b.standardProject('Spend 16 MC to increase your TR 1 step. Solo games only.', (eb) => {
        eb.megacredits(16).startAction.tr(1);
      }),
    ),
  };
}
