import {expect} from 'chai';
import {EosChasmaNationalPark} from '../../../src/cards/base/EOSChasmaNationalPark';
import {Color} from '../../../src/Color';
import {Player} from '../../../src/Player';
import {Game} from '../../../src/Game';
import {SelectCard} from '../../../src/inputs/SelectCard';
import {Birds} from '../../../src/cards/base/Birds';
import {Fish} from '../../../src/cards/base/Fish';
import {Resources} from '../../../src/Resources';

describe('EosChasmaNationalPark', function() {
  let card : EosChasmaNationalPark; let player : Player; let game : Game;

  beforeEach(function() {
    card = new EosChasmaNationalPark();
    player = new Player('test', Color.BLUE, false);
    game = new Game('foobar', [player, player], player);
  });

  it('Can\'t play', function() {
    expect(card.canPlay(player, game)).is.not.true;
  });

  it('Should play', function() {
    (game as any).temperature = -12;
    const birds = new Birds();
    const fish = new Fish();
    player.playedCards.push(birds, fish);

    expect(card.canPlay(player, game)).is.true;
    const action = card.play(player, game);
    expect(action instanceof SelectCard).is.true;
    player.playedCards.push(card);
        action!.cb([birds]);

        expect(player.getResourcesOnCard(birds)).to.eq(1);
        expect(player.plants).to.eq(3);
        expect(player.getProduction(Resources.MEGACREDITS)).to.eq(2);

        player.getVictoryPoints(game);
        expect(player.victoryPointsBreakdown.victoryPoints).to.eq(2);
  });

  it('Should play - single target', function() {
    (game as any).temperature = -12;
    const birds = new Birds();
    player.playedCards.push(birds);

    expect(card.canPlay(player, game)).is.true;
    card.play(player, game);
    player.playedCards.push(card);

    expect(player.getResourcesOnCard(birds)).to.eq(1);
    expect(player.plants).to.eq(3);
    expect(player.getProduction(Resources.MEGACREDITS)).to.eq(2);

    player.getVictoryPoints(game);
    expect(player.victoryPointsBreakdown.victoryPoints).to.eq(2);
  });
});

