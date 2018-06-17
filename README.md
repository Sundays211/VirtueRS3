# VirtueRS3

VirtueRS3 is a RS3 emulation framework originally developed for the 823 protocol, then progressively updated to 865. It aims to ease the development, testing, and integration of content by using the Java 8 Nashorn engine for content scripts, interacting with the engine via a series of APIs.

## Running

To run the framework, place an 865 cache in the folder `repostiory/cache_865/` then run `./gradlew run` in the root folder (or `gradlew.bat run` in Windows). This will download Gradle and all the libraries needed to run the server (if you don't already have them) before starting.

## Contributing

To contribute to the project, fork it to your own repository using the link at the top of the screen, commit your changes, then create a pull request to have it merged back into the main branch. Anyone is free to contribute, whether they're changing one line of one file or contributing an entire skill system.

## Script System

All content scripts are located under scr/main/javascripts/. The [CommonJS module structure](http://wiki.commonjs.org/wiki/Modules/1.1) is used to organise scripts into modules which declare dependencies on other modules using `require(<relative path to module>)`. 

NOTE: you must use the _relative path to the module_ when requiring modules, which usually involves stepping up one or more levels first. For example, if your module was in the folder `/skill/mining` and you wanted to import the `/core/var/bit` module, you would need to use `var varbit = require('../../core/var/bit');`

### Dynamically Reloading Modules

Scripts are built and loaded automatically when you start the server.

To avoid restarting the server every time you change a script, you can run `./gradlew watchScripts` in a _separate_ terminal window/tab to automatically rebuild the bundle any time a file.

You must also use the `::scripts` command in-game (while logged into an Admin account) to cause the server to load the updated module.

*Note:* The `::reload <module>` command has not yet been updated to work with the new build script. For now, you must use `::scripts` to reload all modules instead.

### Creating and Registering Modules

Each module must contain an `index.js` file which exports at least an `init()` function. When the module is loaded, the `global-bootstrap.js` file will call it's `init()` function with the `scriptManager` argument, which can be used to bind events as outlined in the next section. 

To register a module, it's relative path from the root script directory must be declared in the `getAllModules()` function in `global-bootstrap.js`. This allows the module to be loaded both when the server is launched and when the `::reload <module>` command is used (`<module>` is the name provided in the `getAllModules()` function).

### Registering Events

Registering event requires the following line to be used within the `init` function: `scriptManager.bind(eventType, binding, listener);`, where: 
+ `eventType` is the type of event which triggers the function (eg `EventType.OPHELD1` for the first inventory option on an item). For a list of possibile event types, see the [Script Event Bindings wiki page](https://github.com/Sundays211/VirtueRS3/wiki/Script-Event-Bindings);
+ `binding` is the specific item which triggers the command (eg 1962 for `EventType.OPLOC1` would be the first option on a location with the ID 1962). Note: You can also provide an array of ids to bind to (eg [ 20, 822, 400 ] would bind the same listener to items with IDs of either 20, 822, or 400).
+ `listener` is the function to call when the event is triggered. The function is provided with a `ctx` argument, providing the event context object which can be used to gather useful event parameters (eg `ctx.player`)

### Core Modules

There are a handful of core modules you can require in your module to perform useful functions. Doing so is preferable to interacting directly with the game engine.
For a list of core modules, see the [Core Modules wiki page](https://github.com/Sundays211/VirtueRS3/wiki/Core-Modules)

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

