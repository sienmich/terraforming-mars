import {expect} from 'chai';
import {GreatEscarpmentConsortium} from '../../../src/cards/base/GreatEscarpmentConsortium';
import {Color} from '../../../src/Color';
import {Player} from '../../../src/Player';
import {Game} from '../../../src/Game';
import {Resources} from '../../../src/Resources';
import {SelectPlayer} from '../../../src/inputs/SelectPlayer';

describe('GreatEscarpmentConsortium', function() {
  let card : GreatEscarpmentConsortium; let player : Player; let player2 : Player; let game : Game;

  beforeEach(function() {
    card = new GreatEscarpmentConsortium();
    player = new Player('test', Color.BLUE, false);
    player2 = new Player('test2', Color.RED, false);
    game = new Game('foobar', [player, player2], player);
  });

  it('Cannot play without steel production', function() {
    expect(card.canPlay(player)).is.not.true;
  });

  it('Can play if player has steel production', function() {
    player.addProduction(Resources.STEEL);
    expect(card.canPlay(player)).is.true;
  });

  it('Should play - auto select if single target', function() {
    player.addProduction(Resources.STEEL);
    card.play(player, game); // can decrease own production
    const input = game.deferredActions.next()!.execute();
    expect(input).is.undefined;
    expect(player.getProduction(Resources.STEEL)).to.eq(1);
  });

  it('Should play - multiple targets', function() {
    player.addProduction(Resources.STEEL);
    player2.addProduction(Resources.STEEL);
    card.play(player, game);
    expect(player.getProduction(Resources.STEEL)).to.eq(2);

    expect(game.deferredActions).has.lengthOf(1);
    const selectPlayer = game.deferredActions.next()!.execute() as SelectPlayer;
    selectPlayer.cb(player2);
    expect(player2.getProduction(Resources.STEEL)).to.eq(0);
  });

  it('Can play in solo - won\'t reduce own production', function() {
    game = new Game('foobar', [player], player);
    player.addProduction(Resources.STEEL);
    expect(player.getProduction(Resources.STEEL)).to.eq(1);

    card.play(player, game);

    const input = game.deferredActions.next()!.execute();
    expect(input).is.undefined;
    expect(player.getProduction(Resources.STEEL)).to.eq(2); // should increase
  });
});
