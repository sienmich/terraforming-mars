import {expect} from 'chai';
import {ArcticAlgae} from '../../../src/cards/base/ArcticAlgae';
import {Color} from '../../../src/Color';
import {Player} from '../../../src/Player';
import {Game} from '../../../src/Game';

describe('ArcticAlgae', function() {
  let card : ArcticAlgae; let player : Player; let player2 : Player; let game : Game;

  beforeEach(function() {
    card = new ArcticAlgae();
    player = new Player('test', Color.BLUE, false);
    player2 = new Player('test2', Color.RED, false);
    game = new Game('foobar', [player, player2], player);
  });

  it('Can\'t play', function() {
    (game as any).temperature = -10;
    expect(card.canPlay(player, game)).is.not.true;
  });

  it('Should play', function() {
    card.play(player);
    expect(player.plants).to.eq(1);
    player.playedCards.push(card);

    game.addOceanTile(player2, game.board.getAvailableSpacesForOcean(player2)[0].id);
    expect(player.plants).to.eq(3);
  });
});
