# VirtueRS3

VirtueRS3 is a RS3 emulation framework originally developed for the 823 protocol, then progressively updated to 865. It aims to ease the development, testing, and integration of content by using the Java 8 Nashorn engine for content scripts, interacting with the engine via a series of APIs. 

## Contributing

To contribute to the project, fork it to your own repository using the link at the top of the screen, commit your changes, then create a pull request to have it merged back into the main branch. Anyone is free to contribute, whether they're changing one line of one file or contributing an entire skill system.

## Script System

All content scripts are located under repository/scripts/. These scripts are loaded automatically when the server is first started, and they can be reloaded using the "::scripts" or "::reload <folder>" command in-game (while logged into an Admin account) if you want to test a change without restarting the entire server. While scripts are organised into folders of related scripts, the folder used for each script only affects the "reload" command and the debug output when scripts are loaded.

### Script File Requirements

Each script file must contain a "listen" function which takes one argument, "scriptManager", representing the script execution environment instance. Within this function, event listeners should be bound to their respective event types, so the server knows which functions to call when an event is triggered. Note: All scripts registered on the server share a single scope/context, so you can call functions from different files within your script. Also make sure you don't re-use a function or global variable name which has already been used in another script - if a function/variable name is used multiple times, one of the function/variable definitions will replace the other, which will cause issues when its events are run.

### Registering Events

Registering event requires the following line to be used within the "listen" function: "scriptManager.registerListener(eventType, binding, listener);", where "eventType" is the type of event which triggers the function (eg EventType.OPHELD1 for the first inventory option on an item), "binding" is the specific item which triggers the command (eg 1962 for EventType.OPLOC1 would be the first option on a location with the ID 1962), and "listener" is the function to call when the event is triggered. 

### Script APIs

While it's possible to use existing Java methods to integrate with the engine, it's highly recommended to use one of the various script APIs instead. Using these APIs ensures your script won't break if the internal structure of the engine changes, and it creates a clear separation between the content and the engine itself. 

The main API uses the variable "api" within scripts. It's used for most interaction methods, including getting & setting variables (eg api.getVarp(player, 1823) to return the value of varp 1823), managing player inventories, opening & closing interfaces, running animations, etc. 

There are two additional specialist APIs. "clanAPI" is used for functions relating to the clan system (eg "clanAPI.isBanned(clanHash, userHash)" to find out whether a player is banned from the clan), while "mapAPI" handles some of the map-related functions, particularly those used in dynamic maps like player-owned-houses.

## Terminology

VirtueRS3 generally uses the actual names for variables, where known. Some of the most common ones are listed below:
+ Locations - Often known as "objects" within RSPS, these are the interactive scenery items within the game. They have blue text when right-clicked, and do not have a minimap dot.
+ Objects - Also refered to as items in many places, these are things that can be held by players, traded, dropped on the ground, etc. They appear with a red minimap dot when dropped, and orange/brown text when right-clicked.
+ Inventories - No, this doesn't just mean that thing with 28 slots you stuff things in when travelling. Inventories refer to almost *anything* that holds items within the game, including the bank, trade screen, worn equipment, shop stock, grand exchange slots, etc. 
+ Enums - Sometimes refered to as "ClientScriptMaps", these are config files stored in archive 17 of the cache, formatted in a similar way to C Enumerations. Each enum contains a range of possible values for whatever it's used for (eg options on a drop-down menu).
+ Structs - Like enums, these are based on C Structures. Sometimes called "GeneralMaps", they contain sets of related data about various features in-game, such as outfits, skill guide entries, spell/ability information, etc
+ Varps - Short for "Player Variables", and often called "configs" within RSPS. They store information about the current player, such as their chat filter settings, farming patch status, quest progress, etc
+ Varcs - Short for "Client Variables", sometimes called "global configs" by RSPS. These store information used only by the client where the server does not need to know the information. Usage includes favourite worlds, interface layouts, text entered by the user before they submit it, etc.
+ Varbits - Variable bits, or parts of a larger integer variable. Sometimes called "configsByFile". These are used to pack multiple data variables into a single 32-bit variable to save space. For example, rather than using a single int varp for each farming patch status, a single varp holds 4 different patches by using bits 0-7 for patch one, 8-15 for patch two, 16-23 for patch three, and 24-31 for patch four.

## Changing player rights
One of the most common requests in any RSPS is granting an account administrative rights. There are two ways of doing this in VirtueRS3: the manual method, and the command method.

### Manual method
This method is required for the first account you set as administrator (and to revoke admin rights).
1. Create the account you wish to give admin rights to, using the account creation process in-game
2. *Shut down the server* (if the server is running, changes will be overwritten). 
3. Open the character index file (located in /repository/character/index.xml).
4. Look for the XML "account" element containing the "display" for your desired account
5. Change the "type" element from 0 to 2 (2 being ADMINISTRATOR)
6. Save the index and restart the server

### Command method
This method should be used for all other accounts, beyond the first admin, since it's a lot easier to do.
1. Log into the game with an Administrative account.
2. Either type the command "playertype" into the developer console or type "::playertype" into the chatbox
3. Type the display name of the account you wish to change the type of
4. Select the desired account type

