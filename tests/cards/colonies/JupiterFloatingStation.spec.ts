import {expect} from 'chai';
import {JupiterFloatingStation} from '../../../src/cards/colonies/JupiterFloatingStation';
import {Color} from '../../../src/Color';
import {Player} from '../../../src/Player';
import {Game} from '../../../src/Game';
import {OrOptions} from '../../../src/inputs/OrOptions';

describe('JupiterFloatingStation', function() {
  let card : JupiterFloatingStation; let player : Player; let game : Game;

  beforeEach(function() {
    card = new JupiterFloatingStation();
    player = new Player('test', Color.BLUE, false);
    game = new Game('foobar', [player, player], player);
  });

  it('Should play', function() {
    const action = card.play();
    expect(action).is.undefined;
  });

  it('Should act', function() {
    player.playedCards.push(card);
    expect(card.canAct()).is.true;

    player.addResourceTo(card, 7);
    const orOptions = card.action(player, game) as OrOptions;
    expect(orOptions instanceof OrOptions).is.true;
        orOptions!.options[1].cb();
        expect(player.megaCredits).to.eq(4);
  });
});
