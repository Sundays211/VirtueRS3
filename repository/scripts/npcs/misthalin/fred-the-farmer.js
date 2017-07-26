/**
 * Copyright (c) 2016 Virtue Studios
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions\:
 * 
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
/* globals EventType */

var dialog = require('dialog');
var varp = require('engine/var/player');
var inv = require('inv');
var quest = require('../../quest');
module.exports = (function () {
	return {
	init : init
	};
	
	function init (scriptManager) {
		//173{name=Sheep Shearer, progressVarps=[[2163, 1, 21]], questPoints=0, spriteId=26127}
	   scriptManager.bind(EventType.OPNPC1, 758, function (ctx) {
	        var player = ctx.player;
	        var npc = ctx.npc;
			var msg = ""
		    dialog.builder(player).chatnpc(npc, "What are you doing on my land? You're not the one who<br> keeps leaving all my gates open and letting out all my<br> chickens are you?")
			.then(function () {	
			if(quest.hasFinished(player, 173)) {		
			    dialog.builder(player).multi3("CHOOSE AN OPTION", "I'm looking for something to kill.", function () {
	                somethingtokill(player,npc);
	            }, "I'm lost.", function () { 
			        imlost(player,npc); 
		        }, "Can you tell me about the battlefield?", function () {   
			        aboutbattlefield(player,npc); 
	            });	
			} else if(quest.hasStarted(player, 173)) {	
			    if(inv.has(player, 15416)) {
					dialog.builder(player).multi3("CHOOSE AN OPTION", "I have some balls of black wool for you.", function () {
					dialog.builder(player).chatnpc(npc, "Give'em here then.") 	
					.finish();
				    }, "Can you remind me how to get balls of wool?", function () { 
				        rememberhow(player,npc);
		            }, "Can you tell me about the battlefield?", function () {   
			            aboutbattlefield(player,npc); 
	                });	
			    } else {
                    dialog.builder(player).multi3("CHOOSE AN OPTION", "How meny more balls of black wool do you need?", function () {
					    dialog.builder(player).chatnpc(npc, "You need to collect "+ wool(player,msg) +" more balls of wool")
						.then(function () {
						    if(inv.has(player, 15415)) {
								dialog.builder(player).chatplayer("I've got some wool. I've not managed to make it into a<br> ball' though.")
					            .chatnpc(npc, "Well, go find a spinning wheel then. You can find one on<br> the first floor of Lumbridge Castle; just turn right and<br> follow the path when leaving my house and you'll find<br> Lumbridge.") 
					            .finish();  
							} else {	
							    dialog.builder(player).chatplayer("I haven't got any at the moment.")
					            .chatnpc(npc, "Ah, well, at least you haven't been eaten.")  
					            .finish(); 	
							}		
					    });	
				    }, "Can you remind me how to get balls of wool?", function () { 
				        rememberhow(player,npc);	
		            }, "Can you tell me about the battlefield?", function () {   
			            aboutbattlefield(player,npc); 
	                });
			    }
			} else {
                 dialog.builder(player).multi4("CHOOSE AN OPTION", "I'm looking for something to kill.", function () {
	                somethingtokill(player,npc);
	            }, "I'm lost.", function () { 
			        imlost(player,npc); 
                }, "I'm looking for work.", function () {
				    dialog.builder(player).chatnpc(npc,"Oh? Well, I could do with a bit of help, since you're<br>offering.") 
				    .chatnpc(npc,"I need to collect some black wool from my sheep and I'd<br> be much obliged if you could shear them for me. While<br> you're at it, spin the wool into balls for me too.")
				    .chatplayer("Dose it have to be black wool?")
				    .chatnpc(npc,"Has to be. I'm doing business with some guy after black<br> clothing - something to do with black looking 'cool'.")
				    .multi2("SELECT AN OPTION", "It takes all sorts, I suppose.", function () {
						dialog.builder(player).chatplayer("It takes all sorts, I suppose.") 	
                        .chatnpc(npc,"Indeed. So if you bring me twenty balls of black wool, I'm<br> sure I could sort out some sort of payment.") 
						.then(function () {
						startquest(player,npc);
					    });
					}, "Black clothing cool? I'm not sure that's true.", function () { 	
					    dialog.builder(player).chatplayer("Black clothing cool? I'm not sure that's true.") 
						.chatnpc(npc,"That's what I thought, but I'm certainly not going to turn<br> down the business. So if you bring me twenty balls of <br> black wool, I'm sure I could sort out some sort of<br> payment.")
						.then(function () {
						startquest(player,npc);
					    });
					});    
		        }, "Can you tell me about the battlefield?", function () {   
			        aboutbattlefield(player,npc); 
	            });	
			}
            });
			
	   });	
	}
	
	function startquest (player, npc) {
	    dialog.builder(player).chatplayer("So is this a quest?") 
		.chatnpc(npc,"No, it isn't. It's work.<br> You do what I say, then you get paid.") 
		.multi2("SELECT AN OPTION", "That doesn't sound very exciting.", function () {
		    dialog.builder(player).chatnpc(npc,"Well, what do you expect if you ask a farmer?") 
            .finish(); 	
		}, "I'll take the job.", function () { 
		    dialog.builder(player).chatnpc(npc,"Good. Hopefully, you be safe from 'The Thing'! Do you<br> actually know how to shear sheep?") 
			.multi3("SELECT AN OPTION", "Of course!", function () {
				shearsheepyes(player,npc);    
			}, "Actually, no I don't.", function () { 
			    shearsheepno(player,npc); 
            }, "What do you mean, 'The Thing'?", function () {
				dialog.builder(player).chatnpc(npc,"Well, now, no one has ever seen 'The Thing'. That's why we<br> call it 'The Thing', 'cos we don't know what it is.")  
				.chatnpc(npc,"Some say it's a black-hearted shape-shifter, hungering for<br> the souls of decent, hardworking folk like me. Others say<br> it's just a sheep.") 
			    .chatnpc(npc,"Well, I don't have all day to stand around and gossip. Did<br> you say you know how to shear sheep?") 
				.multi2("SELECT AN OPTION", "Of course!", function () {
					shearsheepyes(player,npc);   
				}, "Actually, no I don't.", function () { 
                     shearsheepno(player,npc); 				
				});
			});		
		});	
	}
	
	function wool (player, msg) {
		if (varp(player, 2163) == 1) {
			return msg = "20";
		} else if (varp(player, 2163) == 2) {
			return msg = "19";
		} else if (varp(player, 2163) == 3) {
			return msg = "18";	
		} else if (varp(player, 2163) == 4) {
			return msg = "17";	
		} else if (varp(player, 2163) == 5) {
			return msg = "16";	
		} else if (varp(player, 2163) == 6) {
			return msg = "15";	
		} else if (varp(player, 2163) == 7) {
			return msg = "14";
		} else if (varp(player, 2163) == 8) {
			return msg = "13";
		} else if (varp(player, 2163) == 9) {
			return msg = "12";
		} else if (varp(player, 2163) == 10) {
			return msg = "11";
		} else if (varp(player, 2163) == 11) {
			return msg = "10";
		} else if (varp(player, 2163) == 12) {
			return msg = "9";	
		} else if (varp(player, 2163) == 13) {
			return msg = "8";	
		} else if (varp(player, 2163) == 14) {
			return msg = "7";	
		} else if (varp(player, 2163) == 15) {
			return msg = "6";	
		} else if (varp(player, 2163) == 16) {
			return msg = "5";	
		} else if (varp(player, 2163) == 17) {
			return msg = "4";	
		} else if (varp(player, 2163) == 18) {
			return msg = "3";	
		} else if (varp(player, 2163) == 19) {
			return msg = "2";	
		} else if (varp(player, 2163) == 20) {
			return msg = "1";									
		} else {
            chat.sendMessage(player, "error");
		}
	}
	
	function rememberhow (player, npc) {
		dialog.builder(player).chatnpc(npc,"Sure.You need to shear sheep and then spin the wool on a<br> spinning wheel. Anything else?")   
		.multi3("SELECT AN OPTION", "Can you tell me how to shear sheep?", function () {
			shearsheepno(player,npc); 
		}, "Can you tell me how to spin wool?", function () {
			spinwoolno(player,npc); 
		}, "That's all, thanks.", function () {	
		}); 
	}
	
	function shearsheepno (player, npc) {
		//maby it cheaks if has shears
	    dialog.builder(player).chatnpc(npc,"Well, you're halfway there already. You have some shears<br> in you inventory. Just use those on a sheep to shear it.")
		.chatplayer("That's all I have to do?") 
		.chatnpc(npc,"Well, once you've collected some wool you'll need to spin it<br> into balls.")
		.chatnpc(npc,"Do you know to spin wool?")
		.multi2("SELECT AN OPTION", "I don't know how to spin wool, sorry.", function () {  
		    spinwoolno(player,npc);  
		}, "I'm something of an expert, actually.", function () { 
		    spinwoolyes(player,npc);  
		});  
	}
	
	function shearsheepyes (player, npc) {
	    dialog.builder(player).chatnpc(npc,"And you know how to spin wool into balls?")
		.multi2("SELECT AN OPTION", "I'm something of an expert, actually.", function () {  
		    spinwoolyes(player,npc);  
		}, "I don't know how to spin wool, sorry.", function () { 
		    spinwoolno(player,npc);  
		});
	}
	
	function spinwoolno (player, npc) { 
	    dialog.builder(player).chatnpc(npc,"Don't worry, it's quite simple.")
		.chatnpc(npc,"The nearest spinning wheel can be found on the first floor<br> of Lumbridge Castle, South-east of here.")
		.chatplayer("Thank you.") 
		.finish(); 
	}
	
	function spinwoolyes (player, npc) {
		dialog.builder(player).chatnpc(npc,"Well, you can stop grinning and get to work then.")
		.chatnpc(npc,"I'm not paying you by the hour!")
		.finish(); 
	}
	
	function aboutbattlefield (player, npc) {
		dialog.builder(player).chatnpc(npc,"Hmph. Yes, a great big portal appears not far from my<br> farm and Saradomin and Zamorak come traipsing over my<br> land, happy as you please.")
		.chatnpc(npc,"Blooming' soldiers everywhere, spooking my chickens and<br> telling everyone they should join up with some army or<br> other.")
		.chatnpc(npc,"Then, without a warning, Saradomin himself plonks a war<br> camp on top of my house. Well, I was angry, I'll tell you.")
		.chatnpc(npc,"So, I left a sternly written letter with Duke, and built<br> a new house, bringing my sheep with me.")
		.chatnpc(npc,"And you know what... The THING followed...")
		.finish();
	}
	
	function imlost (player, npc) {
		dialog.builder(player).chatnpc(npc,"How can you be losr? Just follow the road east and south.<br> You'll end up in Lumbridge fairly quickly.")
		.finish(); 
	}
	
	function somethingtokill (player, npc) {
		dialog.builder(player).chatnpc(npc,"What, on my land? Leave my livestock alone!")
		.finish(); 
	}
	
})();
