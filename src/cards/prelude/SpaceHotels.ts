import {IProjectCard} from '../IProjectCard';
import {Tags} from '../Tags';
import {Card} from '../Card';
import {CardType} from '../CardType';
import {Player} from '../../Player';
import {Resources} from '../../Resources';
import {CardName} from '../../CardName';
import {CardRequirements} from '../CardRequirements';
import {CardRenderer} from '../render/CardRenderer';

export class SpaceHotels extends Card implements IProjectCard {
  constructor() {
    super({
      cardType: CardType.AUTOMATED,
      name: CardName.SPACE_HOTELS,
      tags: [Tags.SPACE, Tags.EARTH],
      cost: 12,

      metadata: {
        cardNumber: 'P42',
        requirements: CardRequirements.builder((b) => b.tag(Tags.EARTH, 2)),
        renderData: CardRenderer.builder((b) => {
          b.production((pb) => {
            pb.megacredits(4);
          });
        }),
        description: 'Requires 2 Earth tags. Increase MC production 4 steps.',
      },
    });
  }

  protected canPlayAdditionalChecks(player: Player): boolean {
    return player.getTagCount(Tags.EARTH) >= 2;
  }

  public play(player: Player) {
    player.addProduction(Resources.MEGACREDITS, 4);
    return undefined;
  }
}
