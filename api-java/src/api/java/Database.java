/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package api.java;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.sql.Statement;

/**
 *
 * @author itechcydia
 */
public class Database {
    private Connection conn;
    private Statement stmt;
    private String sql;

    Database() {
        this.connect();
        this.createTables();
    }

    public void connect() {
        this.conn = null;

        try {
            // Database parameters
            String url = "jdbc:sqlite:db.sqlite";
            this.conn = DriverManager.getConnection(url);
            this.stmt = this.conn.createStatement();
            System.out.println("Connection to SQLite has been established.");
        } catch (SQLException e) {
            System.out.println(e.getMessage());
        }
    }

    private void createTables() {
        this.sql = "CREATE TABLE IF NOT EXISTS users ("
                + "id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,"
                + "email TEXT NOT NULL,"
                + "password TEXT NOT NULL,"
                + "image TEXT);";
        this.prepare(sql);
        this.execute();
    }

    public void prepare(String query) {
        this.sql = query;
    }

    public String execute() {
        try {
            this.stmt.execute(this.sql);
        } catch (SQLException e) {
            System.out.println(e.getMessage());
        }
        return "";
    }
}
