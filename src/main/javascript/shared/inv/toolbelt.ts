import { Player } from 'engine/models';
import { varbit } from 'engine/var';


export function hasTool (player: Player, toolId: number) {
    switch (toolId) {
    /* Dungeoneering Tools */
    case 16295://Novite pickaxe
        return varbit(player, 3008) > 0;
    case 16297://Bathus pickaxe
        return varbit(player, 3008) > 1;
    case 16299://Marmaros pickaxe
        return varbit(player, 3008) > 2;
    case 16301://Kratonite pickaxe
        return varbit(player, 3008) > 3;
    case 16303://Fractite pickaxe
        return varbit(player, 3008) > 4;
    case 16305://Zephyrium pickaxe
        return varbit(player, 3008) > 5;
    case 16307://Argonite pickaxe
        return varbit(player, 3008) > 6;
    case 16309://Katagon pickaxe
        return varbit(player, 3008) > 7;
    case 16311://Gorgonite pickaxe
        return varbit(player, 3008) > 8;
    case 16313://Promethium pickaxe
        return varbit(player, 3008) > 9;
    case 16315://Primal pickaxe
        return varbit(player, 3008) > 10;
    case 16361://Novite hatchet
        return varbit(player, 3009) > 0;
    case 16363://Bathus hatchet
        return varbit(player, 3009) > 1;
    case 16365://Marmaros hatchet
        return varbit(player, 3009) > 2;
    case 16367://Kratonite hatchet
        return varbit(player, 3009) > 3;
    case 16369://Fractite hatchet
        return varbit(player, 3009) > 4;
    case 16371://Zephyrium hatchet
        return varbit(player, 3009) > 5;
    case 16373://Argonite hatchet
        return varbit(player, 3009) > 6;
    case 16375://Katagon hatchet
        return varbit(player, 3009) > 7;
    case 16377://Gorgonite hatchet
        return varbit(player, 3009) > 8;
    case 16379://Promethium hatchet
        return varbit(player, 3009) > 9;
    case 16381://Primal hatchet
        return varbit(player, 3009) > 10;
    case 17883://Hammer
        return varbit(player, 3010) == 1;
    case 17678://Tinderbox
        return varbit(player, 3011) == 1;
    case 17794://Fly fishing rod
        return varbit(player, 3012) == 1;
    case 17754://Knife
        return varbit(player, 3013) == 1;
    case 17446://Needle
        return varbit(player, 3014) == 1;
    case 17444://Chisel
        return varbit(player, 3015) == 1;

    /* Regular Tools */
    case 946://Knife
        return varbit(player, 2968) == 1;
    case 1735://Shears
        return varbit(player, 2969) == 1;
    case 1595://Amulet mould
        return varbit(player, 2970) == 1;
    case 1755://Chisel
        return varbit(player, 2971) == 1;
    case 1599://Holy mould
        return varbit(player, 2972) == 1;
    case 1597://Necklace mould
        return varbit(player, 2973) == 1;
    case 1733://Needle
        return varbit(player, 2974) == 1;
    case 1592://Ring mould
        return varbit(player, 2975) == 1;
    case 5523://Tiara mould
        return varbit(player, 2976) == 1;
    case 13431://Crayfish cage
        return varbit(player, 2977) == 1;
    case 307://Fishing rod
        return varbit(player, 2978) == 1;
    case 309://Fly fishing rod
        return varbit(player, 2979) == 1;
    case 311://Harpoon
        return varbit(player, 2980) == 1;
    case 301://Lobster pot
        return varbit(player, 2981) == 1;
    case 303://Small fishing net
        return varbit(player, 2982) == 1;
    case 1265://Bronze pickaxe
        return varbit(player, 2983) == 1;
    case 1267://Iron pickaxe
        return (varbit(player, 2983) + varbit(player, 18521)) > 1;
    case 1269://Steel pickaxe
        return (varbit(player, 2983) + varbit(player, 18521)) > 2;
    case 1273://Mithril pickaxe
        return (varbit(player, 2983) + varbit(player, 18521)) > 3;
    case 1271://Adamant pickaxe
        return (varbit(player, 2983) + varbit(player, 18521)) > 4;
    case 1275://Rune pickaxe
        return (varbit(player, 2983) + varbit(player, 18521)) > 5;
    case 15259://Dragon pickaxe
        return (varbit(player, 2983) + varbit(player, 18521)) > 6;
    case 32646://Crystal pickaxe
        return (varbit(player, 2983) + varbit(player, 18521)) > 7;
    case 2347://Hammer
        return varbit(player, 2984) == 1;
    case 1351://Bronze hatchet
        return varbit(player, 2985) == 1;
    case 1349://Iron hatchet
        return (varbit(player, 2985) + varbit(player, 18522)) > 1;
    case 1353://Steel hatchet
        return (varbit(player, 2985) + varbit(player, 18522)) > 2;
    case 1355://Mithril hatchet
        return (varbit(player, 2985) + varbit(player, 18522)) > 3;
    case 1357://Adamant hatchet
        return (varbit(player, 2985) + varbit(player, 18522)) > 4;
    case 1359://Rune hatchet
        return (varbit(player, 2985) + varbit(player, 18522)) > 5;
    case 6739://Dragon hatchet
        return (varbit(player, 2985) + varbit(player, 18522)) > 6;
    case 32645://Crystal hatchet
        return (varbit(player, 2985) + varbit(player, 18522)) > 7;
    case 590://Tinderbox
        return varbit(player, 2986) == 1;
    case 8794://Saw
        return varbit(player, 2988) == 1;
    case 4://Ammo mould
        return varbit(player, 2989) == 1;
    case 9434://Bolt mould
        return varbit(player, 2990) == 1;
    case 11065://Bracelet mould
        return varbit(player, 2991) == 1;
    case 1785://Glassblowing pipe
        return varbit(player, 2992) == 1;
    case 2976://Sickle mould
        return varbit(player, 2993) == 1;
    case 1594://Unholy mould
        return varbit(player, 2994) == 1;
    case 5343://Seed dibber
        return varbit(player, 2995) == 1;
    case 5325://Gardening trowel
        return varbit(player, 2996) == 1;
    case 5341://Rake
        return varbit(player, 2997) == 1;
    case 5329://Secateurs
        return varbit(player, 2998) == 1;
    case 233://Pestle and mortar
        return varbit(player, 2999) == 1;
    case 952://Spade
        return varbit(player, 3000) == 1;
    case 305://Big fishing net
        return varbit(player, 3001) == 1;
    case 975://Machete
        return varbit(player, 3002) == 1;
    case 6313://Opal machete
        return (varbit(player, 3002) + varbit(player, 4935)) > 1;
    case 6315://Jade machete
        return (varbit(player, 3002) + varbit(player, 4935)) > 2;
    case 6317://Red topaz machete
        return (varbit(player, 3002) + varbit(player, 4935)) > 3;
    case 11323://Barbarian rod
        return varbit(player, 3003) == 1;
    case 2575://Watch
        return varbit(player, 3004) == 1;
    case 2576://Chart
        return varbit(player, 3005) == 1;
    case 13153://Chain link mould
        return varbit(player, 3006) == 1;
    case 10150://Noose wand
        return varbit(player, 3007) == 1;
    case 2574://Sextant
        return varbit(player, 685) == 1;
    case 7409://Magic secateurs
        return varbit(player, 27430) == 1;
    case 18682://Magic watering can
        return varbit(player, 27431) == 1;
    case 20565://Tongs
        return varbit(player, 28410) == 1;
    case 4162://Rock hammer
        return varbit(player, 28219) == 1;
    case 34960://Salt shaker
        return varbit(player, 28220) == 1;
    case 34961://Ice shaker
        return varbit(player, 28221) == 1;
    case 34962://Fungicide shaker
        return varbit(player, 28222) == 1;
    case 10952://Slayer bell
        return varbit(player, 28223) == 1;
    case 32644://Crystal chime
        return varbit(player, 28224) == 1;
    case 34963://Explosive shaker
        return varbit(player, 28225) > 0;
    case 34964://Super explosive shaker
        return varbit(player, 28225) == 2;
    case 18337://Bonecrusher
        return varbit(player, 28226) == 1;
    case 31188://Seedicide
        return varbit(player, 28227) == 1;
    case 27996://Charming imp
        return varbit(player, 28228) == 1;
    case 19675://Herbicide
        return varbit(player, 28229) == 1;
    case 21451://Ouroboros pouch
        return varbit(player, 28230) == 1;
    case 36367://Inventor's Tools
    case 36368://Bag of materials
        return varbit(player, 30224) == 1;
    case 36389://Charge Pack
        return varbit(player, 30225) == 1;
    default:
        return false;
    }
}
