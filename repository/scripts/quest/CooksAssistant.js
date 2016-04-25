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
 
 
 var CookListener = Java.extend(Java.type('org.virtue.engine.script.listeners.EventListener'), {
	invoke : function (event, npcTypeId, args) {
		var player = args.player;
		var npc = args.npc;
		if (event == EventType.OPNPC1) {
			if(questApi.isFinished(player, 6)) {
			chatnpc(player, npc, "Hello, friend, how is the adventuring going?", function () {
			CookFinished.maintalk(player, npc);
			});	
			} else if(questApi.isStarted(player, 6)) {
            chatnpc(player, npc, "How are you getting on with finding the ingredients?", function () {
			CookStarted.maintalk(player, npc);
			});	
			} 
			else {
			chatnpc(player, npc, "What am I to do?", function () {
			Cook.maintalk(player, npc);
			});	
			}		  
		}
	}
});
 
 
 
  var CookFinished = {
       maintalk : function (player, npc) { 
	   multi4(player, "SELECT AN OPTION", "I'm getting strong and mighty.", function () {	
	   chatplayer(player, "I'm getting strong and mighty. Grr.", function () {
	   chatnpc(player, npc, "Glad to hear it.", function () {
	   });
	   });
	}, "I keep on dying.", function () {
	   chatplayer(player, "I keep on dying.", function () {
	   chatnpc(player, npc, "Ah, well, at least you keep coming back to life too!", function () {
	   });
	   });
    }, "Can i use your range?", function () {
	   chatplayer(player, "Can i use your range?", function () {
	   chatnpc(player, npc, "Go ahead! It's a very good range;it's better than most<br> other ranges.", function () {
	   chatnpc(player, npc, "It's called the Cook-o-Matic 25 and it uses a combination<br> of state-of-the-art temperature regulation and magic.", function () {
	   chatplayer(player, "will it mean my food will burn less often?", function () {
	   chatnpc(player, npc, "As long as the food is fairly easy to cook in the first place!", function () {
		   
	 if(api.itemTotal(player, Inv.BACKPACK, 15411)) {
		 chatnpc(player, npc, "The manual you have in your inventory should tell you<br> more.", function () {
	     chatplayer(player, "Thanks!", function () {		
	     });
	     });
		 }
	else {
		chatnpc(player, npc, "Here, take this manual. It should tell you everything you<br> need to know about this range.", function () {
	  //  chatitem(player, 15411, "The cook hands you a manual.", function () {//and add item to inv
		//	  });
		chatplayer(player, "Thanks!", function () {		
	    });
		});
	}
	   });
	   });
	   });
	   });
	   });
	   }, "What happened to the castle?", function () {
		chatnpc(player, npc, "The castle really did suffer in the battle of Lumbridge. I'm<br> glad it's over", function () {
		chatnpc(player, npc, "People came from all over the world to help rebuild, and<br> now things are getting back to normal. I'm glad - I have<br> important things to cook and I'm not letting anything get<br> in the way!", function () {
		});	
		});	
		});
	},
}



  var CookStarted = {
	  
       maintalk : function (player, npc) {
		   
	},
}



 
 var Cook = {
		
	maintalk : function (player, npc) {
		multi5(player, "SELECT AN OPTION", "What's wrong?", function () {		
		Cook.Whatswrong(player, npc);
		}, "Can you make me a cake?", function () {
		chatnpc(player, npc, "*sniff* Don't talk to me about cakes...", function () {
		Cook.Whatswrong(player, npc);
		});	
		}, "You don't look very happy.", function () {	
		chatnpc(player, npc, "No, I'm not. The world is caving in around me. I'm<br> overcome with dark feelings of impending doom.", function () {
		multi2(player, "SELECT AN OPTION", "What's wrong?", function () {	
		Cook.Whatswrong(player, npc);
		}, "I'd take the rest of the day off, if I were you.", function () {	
	    chatnpc(player, npc, "No, that's the worst thing I could do. I'd get in terrible<br> trouble.", function () {
		chatplayer(player, "Well, maybe you need to take a holiday...", function () {
		chatnpc(player, npc, "That would be nice, but the Duke doesn't allow holidays<br> for core staff.", function () {
        chatplayer(player, "Hmm, why not run away to the sea and start a new life as<br> a pirate?", function () {
        chatnpc(player, npc, "My wife gets seasick and I have an irrational fear of<br> eyepatches. I don't see it working.", function () {		
		chatplayer(player, "I'm afraid I've run out of ideas.", function () {	
		chatnpc(player, npc, "I know, I'm doomed.", function () {	
		Cook.Whatswrong(player, npc);	
		}); 	
		}); 
		}); 	
		}); 
		});		
		}); 
		});	
	    }); 
		}); 
		}, "Nice hat!", function () {
		chatnpc(player, npc, "Er, thank you. It's a pretty ordinary cook's hat, really.", function () {
		chatplayer(player, "Still, it suits you. The trousers are pretty special too.", function () {
		chatnpc(player, npc, "It's all standard-issue cook's uniform.", function () {
		chatplayer(player, "The whole hat, apron and stripy trousers ensemble...it<br> works. It makes you look like a real cook.", function () {
		chatnpc(player, npc, "I AM a real cook! I haven't got time to be chatting about culinary fashion, I'm in desperate need of help!", function () {
		Cook.Whatswrong(player, npc);
		}); 
		}); 
		}); 
		}); 
		});
		}, "What happened to the castle?", function () {
		chatnpc(player, npc, "The castle really did suffer in the battle of Lumbridge. I'm<br> glad it's over", function () {
		chatnpc(player, npc, "People came from all over the world to help rebuild, and<br> now things are getting back to normal. I'm glad - I have<br> important things to cook and I'm not letting anything get<br> in the way!", function () {
		chatnpc(player, npc, "In fact, even now I'm preparing a cake for the Duke's<br> birthday! Although...umm...", function () {
		multi2(player, "SELECT AN OPTION", "What's the problem?", function () {
		Cook.Whatswrong(player, npc);
		}, "I'll let you get on with it!", function () {
		});	
		});	
		});	
		});	
		});	
	},
	
	
	
	Whatswrong : function (player, npc) {
		chatnpc(player, npc, "Oh dear, oh dear, oh dear, I'm in a terrible, terrible mess!<br> It's the Duke's birthday today, and I should be making him<br> a lovely, big birthday cake using special ingredients...", function () {	
		chatnpc(player, npc, "...but I've forgotten to get the ingredients. I'll never get<br> them in time now. He'll sack me! Whatever will I do? I have<br> four children and a goat to look after. Would you help me?<br> Please?", function () {
        //start quest			
		}); 
		});
	}
	
	
}


var CooksAssistant = {
		showQuestJournal : function (player, questLog) {
			if(questApi.isFinished(player, 6)) {
				questLog.setJournalLine(player, 1, "");
				questLog.setJournalLine(player, 2, "<col=999999>It was the Duke of Lumbridge's birthday, but his cook had forgotten to buy the");
				questLog.setJournalLine(player, 3, "<col=999999>ingredients he needed to bake a birthdat cake. I brought the cook an egg, a pot");
				questLog.setJournalLine(player, 4, "<col=999999>of flour and a bucket of milk and the cook made a delicious-looking cake with");
				questLog.setJournalLine(player, 5, "<col=999999>them");
				questLog.setJournalLine(player, 6, "");
				questLog.setJournalLine(player, 7, "<col=FFFFFF>QUEST COMPLETE!");
				questLog.setJournalLine(player, 8, "<col=EB981F>I gained <col=EBE076>1 Quest Point<col=EB981F>, <col=EBE076>20 sardines<col=EB981F>, <col=EBE076>500 coins <col=EB981F>and <col=EBE076> 300 Cooking XP<col=EB981F>.");
				questLog.setJournalLine(player, 9, "<col=EB981F>I have also gained <col=EBE076>two prize keys<col=EB981F> for <col=EBE076>Treasure Hunter<col=EB981F>!");
				questLog.setJournalLine(player, 10, "<col=EB981F>The cook now also lets me use his high-quality <col=EBE076>range<col=EB981F>, which burns certain low-");
				questLog.setJournalLine(player, 11, "<col=EB981F>level dishes less often thsn other ranges.");
			} else {
				questLog.setJournalLine(player, 1, "");
				questLog.setJournalLine(player, 2, "<col=EB981F>I can start this quest by speaking to the <col=EBE076>Cook<col=EB981F> in the <col=EBE076>kitchen<col=EB981F> of <col=EBE076>Lumbridge");
				questLog.setJournalLine(player, 3, "<col=EBE076>Castle<col=EB981F>.");
			}
		}
}



var LocationListener = Java.extend(Java.type('org.virtue.engine.script.listeners.EventListener'), {
	invoke : function (event, locTypeId, args) {
		var player = args.player;
		var location = args.location;
		
		switch (locTypeId) {	
		case 47721:
			if(questApi.isStarted(player, 6) && !questApi.isFinished(player, 6)) {	
				if(api.itemTotal(player, Inv.BACKPACK, 15413)) {
					if(api.itemTotal(player, Inv.BACKPACK, 1925)) {
						api.sendMessage(player, "You've already got some top-quality milk; you should take it to the cook.");
					} else {
						api.sendMessage(player, "You'll need an empty bucket to collect the milk.");
					}
				} else {
					if(api.itemTotal(player, Inv.BACKPACK, 1925)) {
						api.runAnimation(player, 2305);
						//todo wait till end off anim then add items
						api.delCarriedItem(player, 1925,1);
						api.addCarriedItem(player, 15413,1);
						api.sendMessage(player, "You milk the cow for top-quality milk.");
					} else {
						api.sendMessage(player, "You'll need an empty bucket to collect the milk.");
					}
				}
			} else {	
				if(api.itemTotal(player, Inv.BACKPACK, 1925)) {
					mesbox(player, "If you're after ordinary milk, you should use an ordinary dairy cow.");
				} else {
					api.sendMessage(player, "You'll need an empty bucket to collect the milk.");
				}			
			}
			return;
		default:
			return;
		}		
	}
});

/* Listen to the npc ids specified */
var listen = function(scriptManager) {
	var listener = new CookListener();
	scriptManager.registerListener(EventType.OPNPC1, 278, listener);
	
	var locs = [47721];
	var listener = new LocationListener();
	for (var i in locs) {
		scriptManager.registerListener(EventType.OPLOC1, locs[i], listener);
	}
};
