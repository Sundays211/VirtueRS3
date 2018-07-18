import { Player } from "engine/models";

var Render = Java.type('org.virtue.game.entity.player.PlayerModel.Render');

export default class {

    public static isFemale(player: Player): boolean {
        return ENGINE.isFemale(player);
    }

    public static getBaseColour(player: Player, slot: number): number {
        return ENGINE.getPlayerColour(player, slot);
    }

    public static getBaseKit(player: Player, slot: number): number {
        return ENGINE.getPlayerKit(player, slot);
    }

    public static renderNpc(player: Player, npcId: number) {
        player.getModel().setRender(Render.NPC);
     	player.getModel().setNPCId(npcId);
     	player.getModel().refresh();
    }

    public static renderInvisible(player: Player) {
        player.getModel().setRender(Render.INVISBLE);
 		player.getModel().refresh();
    }

    public static clearRender(player: Player) {
        player.getModel().setRender(Render.PLAYER);
 		player.getModel().refresh();
    }

    public static getPrefixTitle(player: Player): string {
        return player.getModel().getPrefixTitle();
    }
}
