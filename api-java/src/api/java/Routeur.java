package api.java;

import com.sun.net.httpserver.HttpServer;

/**
 *
 * @author itechcydia
 */
public class Routeur {
    private HttpServer server;
    
    Routeur(HttpServer server) {
        this.server = server;
    }

    public void addRoute(String name) {
        this.server.createContext(name);
    }
}
