package org.virtue;

import java.util.HashMap;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.virtue.model.entity.player.Player;
import org.virtue.model.entity.player.PrivilegeLevel;
import org.virtue.model.entity.player.dialog.InputEnteredHandler;
import org.virtue.model.entity.region.DynamicRegion;
import org.virtue.model.entity.region.RegionTools;
import org.virtue.model.entity.region.Tile;
import org.virtue.network.event.context.impl.out.MessageEventContext.ChannelType;
import org.virtue.script.JSListeners;
import org.virtue.script.ScriptEventType;
import org.virtue.script.listeners.CommandListener;

public class Commands {

	/**
	 * The {@link Logger} Instance
	 */
	private static Logger logger = LoggerFactory.getLogger(Commands.class);
	
	/**
	 * Runs the specified command.
	 * @param player The player invoking the command
	 * @param command The full command text (including any arguments)
	 * @param console True if the command was invoked from the developer console, false if invoked from the chatbox
	 * @param clientCommand Whether the command is a client command or not.
	 * @return True if the command was caught and processed, false otherwise
	 */
	public static boolean processCommand(Player player, String command,
			boolean console, boolean clientCommand) {
		if (command.length() == 0) // if they used ::(nothing) there's no command
			return false;
		String[] cmd = command.toLowerCase().split(" ");
		if (cmd.length == 0) {
			return false;
		}
		
		String syntax = command.split(" ")[0].toLowerCase();
		String[] cmdArgs = command.replace(syntax + " ", "").split(" ");
		return processCommand(player, syntax, cmdArgs, console, clientCommand);
	}

	/**
	 * Runs the specified command.
	 * @param player The player invoking the command
	 * @param syntax The command name
	 * @param cmdArgs The arguments for the command
	 * @param console True if the command was invoked from the developer console, false if invoked from the chatbox
	 * @param clientCommand Whether the command is a client command or not.
	 * @return True if the command was caught and processed, false otherwise
	 */
	public static boolean processCommand(Player player, String syntax, String[] cmdArgs,
			boolean console, boolean clientCommand) {
		
		JSListeners scripts = Virtue.getInstance().getScripts();
		
		ScriptEventType scriptType = null;		
		
		if (player.getPrivilegeLevel().getRights() >= 2) {
			//Try the restricted commands first
			boolean success = processBuiltinCommand(player, syntax, cmdArgs, console, clientCommand);
			if (success) {
				return true;
			} else if (scripts.hasBinding(ScriptEventType.COMMAND_ADMIN, syntax)) {
				scriptType = ScriptEventType.COMMAND_ADMIN;
			}
		}
		
		if (scriptType == null && player.getPrivilegeLevel().getRights() >= 1) {
			if (scripts.hasBinding(ScriptEventType.COMMAND_MOD, syntax)) {
				scriptType = ScriptEventType.COMMAND_MOD;
			}
		}
		
		if (scriptType == null) {
			//Does a regular command binding exist?
			if (scripts.hasBinding(ScriptEventType.COMMAND, syntax)) {
				scriptType = ScriptEventType.COMMAND;
			} else {
				//Try with the old command listeners
				boolean handled = processLegacy(player, syntax, cmdArgs, console, clientCommand);
				if (!handled) {
					String message = "Unknown developer command: "+syntax;
					player.getDispatcher().sendMessage(message, console ? ChannelType.CONSOLE : ChannelType.GAME);
				}
				return true;
			}
		}
		
		Map<String, Object> scriptArgs = new HashMap<>();
		scriptArgs.put("player", player);
		scriptArgs.put("cmdArgs", cmdArgs);
		scriptArgs.put("console", console);
		scriptArgs.put("clientCommand", clientCommand);
		try {
			scripts.invokeScriptUnchecked(scriptType, syntax, scriptArgs);
		} catch (Exception ex) {
			logger.warn("Error processing command "+syntax, ex);
			String errorMessage = "Error processing developer command "+syntax;
			if (player.getPrivilegeLevel().getRights() >= 2) {
				errorMessage += ": "+ex.getMessage();
			}
			player.getDispatcher().sendMessage(errorMessage, console ? ChannelType.CONSOLE : ChannelType.GAME);
		}
		return true;
	}
	
	private static boolean processLegacy (Player player, String syntax, String[] args, boolean console, boolean clientCommand) {
		CommandListener listener = Virtue.getInstance().getScripts().forSyntax(syntax);
		if (listener == null) {
			return false;
		}
		if (listener.adminCommand() && !PrivilegeLevel.ADMINISTRATOR.equals(player.getPrivilegeLevel())) {
			player.getDispatcher().sendMessage(
					"This command is restricted to admins only.",
					ChannelType.CONSOLE);
			return true;
		}
		try {
			listener.handle(player, syntax, args, false);
		} catch (Exception ex) {
			logger.warn("Error processing command "+syntax, ex);
			String errorMessage = "Error processing developer command "+syntax;
			if (player.getPrivilegeLevel().getRights() >= 2) {
				errorMessage += ": "+ex.getMessage();
			}
			player.getDispatcher().sendMessage(errorMessage, console ? ChannelType.CONSOLE : ChannelType.GAME);
		}
		return true;
	}

	private static boolean processBuiltinCommand(Player player, String syntax, String[] args,
			boolean console, boolean clientCommand) {
		if (clientCommand) {
			switch (syntax) {
			default:
				return false;
			}
		} else {
			switch (syntax) {
			case "bscript":
				player.getDispatcher().sendCS2Script(Integer.parseInt(args[0]),
						new Object[] {});
				player.getDispatcher().sendGameMessage("Bscript sent");
				return true;
			case "reboot":
			case "update":
				if (args.length < 1) {
					player.getDispatcher().sendGameMessage("Usage: reboot {delay}");
					return true;
				}
				processRebootCommand(player, Integer.parseInt(args[0]));
				return true;
			case "script":
				player.getDispatcher().sendCS2Script(6722,
						new Object[] { Integer.parseInt(args[0]) });
				player.getDispatcher().sendGameMessage("script sent");
				return true;
			case "setvarp":
				if (args.length < 2) {
					player.getDispatcher().sendGameMessage("Usage: setvarp {id} {value}");
					return true;
				}
				player.getVars().setVarValueInt(Integer.parseInt(args[0]),
						Integer.parseInt(args[1]));
				player.getDispatcher().sendGameMessage(
						"varp=" + Integer.parseInt(args[0]) + ", value="
								+ Integer.parseInt(args[1]));
				return true;
			case "createregion":
				try {
					int startX = Integer.parseInt(args[0]);
					int startY = Integer.parseInt(args[1]);
					int widthRegions = Integer.parseInt(args[2]);
					int heightRegions = Integer.parseInt(args[3]);
					DynamicRegion region = RegionTools.createRegion();
					for (int xOffSet = 0; xOffSet < widthRegions; xOffSet++) {
						for (int yOffSet = 0; yOffSet < heightRegions; yOffSet++) {
							RegionTools
									.setChunk(
											region,
											xOffSet,
											yOffSet,
											player.getCurrentTile().getPlane(),
											new Tile(
													startX
															+ (xOffSet * widthRegions),
													startY
															+ (yOffSet * heightRegions),
													player.getCurrentTile()
															.getPlane()), 0);
						}
					}
					RegionTools.buildRegion(region);
					player.getMovement().teleportTo(region.getBaseTile());
					player.setArmarDynamicRegion(region);

				} catch (Exception e) {
					player.getDispatcher().sendGameMessage("Wrong usage!");
				}
				return true;
			case "destroy":
				DynamicRegion region = player.getArmarDynamicRegion();
				RegionTools.destroyRegion(region);
				return true;
			default:
				return false;
			}
		}
	}
	
	public static void processRebootCommand (final Player player, final int delay) {
		if (player.getPrivilegeLevel().getRights() < 2) {
			player.getDispatcher().sendGameMessage("You must be an administrator to run this command.");
			return;
		}
		InputEnteredHandler handler = new InputEnteredHandler() {
			@Override
			public void handle(Object value) {
				int option = (Integer) value;
				if (option == 1) {
					Virtue.getInstance().runUpdate(Math.abs(delay));
				}
				player.getWidgets().closeWidgets(true);
			}			
		};
		player.getDialogs().sendMultichoice("Are you sure you want to restart the server in "+delay+" ticks?", new String[]{"Yes", "No"}, new int[] {1, 0});
		player.getDialogs().setInputHandler(handler);
	}
}
