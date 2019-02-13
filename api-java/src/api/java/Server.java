/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package api.java;

import java.io.IOException;
import java.io.OutputStream;
import java.net.InetSocketAddress;

import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import com.sun.net.httpserver.HttpServer;
/**
 *
 * @author itechcydia
 */
public class Server {
    private Routeur routeur;
    private HttpServer server;
    private static Handler handler;
    
    Server() throws Exception  {
        this.handler = new Handler();
        this.server = HttpServer.create(new InetSocketAddress(8000), 0);
        this.routeur = new Routeur(this.server);
    }
    
    public static void main(String[] args) throws Exception {
        HttpServer server = HttpServer.create(new InetSocketAddress(8000), 0);
        server.createContext("/test", new Handler());
        server.setExecutor(null); // creates a default executor
        server.start();
    }
    
    public Routeur getRouteur() {
        return this.routeur;
    }
    
    static class Handler implements HttpHandler {
        @Override
        public void handle(HttpExchange t) throws IOException {
            String response = "This is the response";
            t.sendResponseHeaders(200, response.length());
            OutputStream os = t.getResponseBody();
            os.write(response.getBytes());
            os.close();
        }
    }
}
