import {expect} from 'chai';
import {CupolaCity} from '../../../src/cards/base/CupolaCity';
import {Color} from '../../../src/Color';
import {Player} from '../../../src/Player';
import {Game} from '../../../src/Game';
import {SelectSpace} from '../../../src/inputs/SelectSpace';
import {TileType} from '../../../src/TileType';
import {Resources} from '../../../src/Resources';

describe('CupolaCity', function() {
  let card : CupolaCity; let player : Player; let game : Game;

  beforeEach(function() {
    card = new CupolaCity();
    player = new Player('test', Color.BLUE, false);
    game = new Game('foobar', [player, player], player);
  });

  it('Can\'t play without energy production', function() {
    expect(card.canPlay(player, game)).is.not.true;
  });

  it('Can\'t play if oxygen level too high', function() {
    player.addProduction(Resources.ENERGY);
    (game as any).oxygenLevel = 10;
    expect(card.canPlay(player, game)).is.not.true;
  });

  it('Should play', function() {
    player.addProduction(Resources.ENERGY);
    expect(card.canPlay(player, game)).is.true;

    const action = card.play(player, game);
    expect(action instanceof SelectSpace).is.true;

    action.cb(action.availableSpaces[0]);
    expect(player.getProduction(Resources.ENERGY)).to.eq(0);
    expect(player.getProduction(Resources.MEGACREDITS)).to.eq(3);
    expect(action.availableSpaces[0].tile && action.availableSpaces[0].tile.tileType).to.eq(TileType.CITY);
  });
});
