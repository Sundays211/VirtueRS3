package org.virtue.config;

public class ConfigNotFoundException extends RuntimeException {

	private static final long serialVersionUID = -6671532492589207828L;

	public ConfigNotFoundException(Js5ConfigGroup group, int id) {
		super("Config item "+group.name().toLowerCase()+" "+id+" does not exist");
	}

}
