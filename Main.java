import com.sun.net.httpserver.HttpServer;
import com.sun.net.httpserver.HttpHandler;
import com.sun.net.httpserver.HttpExchange;

import java.io.IOException;
import java.io.OutputStream;
import java.net.InetSocketAddress;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

public class Main {

    public static void main(String[] args) throws IOException {
        int porta = 8080;
        HttpServer server = HttpServer.create(new InetSocketAddress(porta), 0);

        // Serve os arquivos do projeto
        server.createContext("/", new FileHandler("index.html", "text/html"));
        server.createContext("/style.css", new FileHandler("style.css", "text/css"));
        server.createContext("/script.js", new FileHandler("script.js", "application/javascript"));

        server.setExecutor(null);
        System.out.println("Servidor Java rodando em: http://localhost:" + porta);
        server.start();
    }

    static class FileHandler implements HttpHandler {
        private final String filePath;
        private final String contentType;

        public FileHandler(String filePath, String contentType) {
            this.filePath = filePath;
            this.contentType = contentType;
        }

        @Override
        public void handle(HttpExchange exchange) throws IOException {
            Path path = Paths.get(filePath);
            if (Files.exists(path)) {
                byte[] bytes = Files.readAllBytes(path);
                exchange.getResponseHeaders().set("Content-Type", contentType + "; charset=UTF-8");
                exchange.sendResponseHeaders(200, bytes.length);
                OutputStream os = exchange.getResponseBody();
                os.write(bytes);
                os.close();
            } else {
                String response = "Erro 404: Arquivo nao encontrado";
                exchange.sendResponseHeaders(404, response.length());
                OutputStream os = exchange.getResponseBody();
                os.write(response.getBytes());
                os.close();
            }
        }
    }
}