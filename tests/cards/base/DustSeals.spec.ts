import {expect} from 'chai';
import {DustSeals} from '../../../src/cards/base/DustSeals';
import {Color} from '../../../src/Color';
import {Player} from '../../../src/Player';
import {Game} from '../../../src/Game';
import {maxOutOceans} from '../../TestingUtils';

describe('DustSeals', function() {
  let card : DustSeals; let player : Player; let game : Game;

  beforeEach(function() {
    card = new DustSeals();
    player = new Player('test', Color.BLUE, false);
    game = new Game('foobar', [player, player], player);
  });

  it('Can\'t play', function() {
    maxOutOceans(player, game, 4);
    expect(card.canPlay(player, game)).is.not.true;
  });

  it('Should play', function() {
    expect(card.canPlay(player, game)).is.true;
    card.play();
    player.victoryPointsBreakdown.setVictoryPoints('victoryPoints', card.getVictoryPoints());
    expect(player.victoryPointsBreakdown.victoryPoints).to.eq(1);
  });
});

