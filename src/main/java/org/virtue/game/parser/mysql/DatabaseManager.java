package org.virtue.game.parser.mysql;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.virtue.Constants;

public class DatabaseManager {

    private static Logger logger = LoggerFactory.getLogger(DatabaseManager.class);
    
	private String host;
	private String database;
	private String username;
	private String password;

	private Connection connection;
	private Statement statement;

	private boolean connected;

	public DatabaseManager() {
		this.host = Constants.DB_HOST;
		this.database = Constants.DB_NAME;
		this.username = Constants.DB_USER;
		this.password = Constants.DB_PASS;
		this.connected = false;
	}

	public void connect() {
		try {
			connection = DriverManager.getConnection("jdbc:mysql://" + host + "/" + database + "?jdbcCompliantTruncation=false", username, password);
			statement = connection.createStatement();
                        logger.info("\033[0;32m" + "Successfully connected with " + host + "/" + database + "\u001B[0m");
			connected = true;
		} catch (Exception e) {
                        logger.info("\033[0;31m" + "Unable to connect with " + host + "/" + database + "." + "\u001B[0m");
			connected = false;
		}
	}

	public ResultSet executeQuery(String query) {
		try {

			if (!connected())
				return null;

			statement = connection.createStatement();
			ResultSet results = statement.executeQuery(query);
			return results;
		} catch (Exception e) {
			logger.info("mysql executeQuery error");
		}
		return null;
	}

	public int executeUpdate(String query) {
		try {

			if (!connected())
				return 0;

			statement = connection.createStatement();
			return statement.executeUpdate(query);
		} catch (Exception e) {
			logger.info("mysql executeUpdate error");
		}

		return 0;
	}

	public boolean connected() {
		return connected;
	}

	public Statement statement() {
		return statement;
	}

}
