import {IProjectCard} from '../IProjectCard';
import {Tags} from '../Tags';
import {Card} from '../Card';
import {CardType} from '../CardType';
import {Player} from '../../Player';
import {CardName} from '../../CardName';
import {CardRenderer} from '../render/CardRenderer';
import {StandardProject} from '../standardProjects/StandardProject';

export class StandardTechnology extends Card implements IProjectCard {
  constructor() {
    super({
      cardType: CardType.ACTIVE,
      name: CardName.STANDARD_TECHNOLOGY,
      tags: [Tags.SCIENCE],
      cost: 6,
      metadata: {
        cardNumber: '156',
        renderData: CardRenderer.builder((b) => {
          b.effect('After you pay for a standard project, except selling patents, you gain 3 MC.', (eb) => {
            eb.plate('Standard projects').startEffect.megacredits(3);
          });
        }),
      },
    });
  }
  public onStandardProject(player: Player, projectType: StandardProject) {
    if (projectType.name !== CardName.STANDARD_SELL_PATENTS) {
      player.megaCredits += 3;
    }
  }
  public play() {
    return undefined;
  }
}
