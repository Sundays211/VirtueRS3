package org.virtue.engine.script;

import static org.mockito.Mockito.*;

import java.io.File;
import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

import javax.script.ScriptEngine;
import javax.script.ScriptEngineManager;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.mockito.AdditionalAnswers;
import org.virtue.engine.script.JSListeners;
import org.virtue.engine.script.api.ConfigAPI;
import org.virtue.engine.script.api.ScriptAPI;
import org.virtue.game.entity.player.Player;

public class TestInvModule {
	
	ScriptAPI api = mock(ScriptAPI.class);
	
	ConfigAPI configApi = mock(ConfigAPI.class);
	
	private JSListeners scriptManager;
	
	private ScriptEngineManager engineManager = new ScriptEngineManager();
	
	private ScriptEngine engine;
	
	private Player player = mock(Player.class);

	@Before
	public void setUp() throws Exception {
		File scriptDir = new File("repository/scripts/");
		scriptManager = new JSListeners(scriptDir);
		scriptManager.setScriptApi(api);
		scriptManager.setConfigApi(configApi);
		engine = engineManager.getEngineByName("nashorn");
		scriptManager.setConstants(engine);
		scriptManager.initModuleBootstrap(engine);
		
		scriptManager.loadModules(engine, Collections.singletonList("inv"));
		
		when(api.getId(anyInt())).then(AdditionalAnswers.returnsFirstArg());
	}

	@After
	public void tearDown() throws Exception {
		
	}

	@Test
	public void testOpenBank() throws Exception {
		
		Map<String, Object> context = new HashMap<>();
		context.put("player", player);
		
		scriptManager.invokeScriptUnchecked(ScriptEventType.OPLOC2, 782, context);
		
		verify(api).openOverlaySub(player, 1017, 762, false);
	}

	@Test
	public void testOpenBankChest() throws Exception {
		Map<String, Object> context = new HashMap<>();
		context.put("player", player);
		
		scriptManager.invokeScriptUnchecked(ScriptEventType.OPLOC1, 20607, context);
		
		verify(api).openOverlaySub(player, 1017, 762, false);
	}

	@Test
	public void testAddTool() throws Exception {
		Map<String, Object> context = new HashMap<>();
		context.put("player", player);
		context.put("item", 5341);
		
		when(api.getVarBit(player, 2997)).thenReturn(0);
		
		scriptManager.invokeScriptUnchecked(ScriptEventType.OPHELD4, 5341, context);
		
		verify(api).setVarBit(player, 2997, 1);
	}

	@Test
	public void testAddExistingTool() throws Exception {
		Map<String, Object> context = new HashMap<>();
		context.put("player", player);
		context.put("item", 5341);
		
		when(api.getVarBit(player, 2997)).thenReturn(1);
		
		scriptManager.invokeScriptUnchecked(ScriptEventType.OPHELD4, 5341, context);
		
		verify(api).sendMessage(player, "That is already on your tool belt.");
	}

	@Test
	public void testAddPickaxe() throws Exception {
		Map<String, Object> context = new HashMap<>();
		context.put("player", player);
		context.put("item", 15259);
		
		when(api.getVarBit(player, 2983)).thenReturn(0);
		when(api.getVarBit(player, 18521)).thenReturn(0);
		
		scriptManager.invokeScriptUnchecked(ScriptEventType.OPHELD4, 15259, context);
		
		verify(api).setVarBit(player, 2983, 1);
		verify(api).setVarBit(player, 18521, 6);
	}

}
