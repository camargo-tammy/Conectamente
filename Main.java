import com.sun.net.httpserver.HttpServer;
import com.sun.net.httpserver.HttpHandler;
import com.sun.net.httpserver.HttpExchange;

import java.io.IOException;
import java.io.OutputStream;
import java.io.InputStream;
import java.net.InetSocketAddress;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

public class Main {

    // Configure sua chave da API do Gemini como variável de ambiente ou constante
    private static final String GEMINI_API_KEY = System.getenv().getOrDefault("GEMINI_API_KEY", "SUA_CHAVE_API_AQUI");

    public static void main(String[] args) throws IOException {
        int porta = 8080;
        HttpServer server = HttpServer.create(new InetSocketAddress(porta), 0);

        // Rotas para arquivos estáticos
        server.createContext("/", new FileHandler("index.html", "text/html"));
        server.createContext("/style.css", new FileHandler("style.css", "text/css"));
        server.createContext("/script.js", new FileHandler("script.js", "application/javascript"));

        // Rota da API do Chat em Java
        server.createContext("/api/chat", new ChatApiHandler());

        server.setExecutor(null);
        System.out.println("Servidor ConectaMente com Chat IA rodando em: http://localhost:" + porta);
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

    // Handler da API de Chat que integra com o Gemini
    static class ChatApiHandler implements HttpHandler {
        @Override
        public void handle(HttpExchange exchange) throws IOException {
            if (!"POST".equalsIgnoreCase(exchange.getRequestMethod())) {
                exchange.sendResponseHeaders(405, -1);
                return;
            }

            // Ler corpo da requisição
            InputStream is = exchange.getRequestBody();
            String body = new String(is.readAllBytes(), StandardCharsets.UTF_8);
            
            // Extrair mensagem de forma simples
            String mensagemUsuario = extrairMensagemJson(body);

            // Chamar API da IA
            String respostaIa = chamarGeminiApi(mensagemUsuario);

            // Montar JSON de resposta
            String jsonResposta = String.format("{\"resposta\": \"%s\"}", escaparJson(respostaIa));

            byte[] bytes = jsonResposta.getBytes(StandardCharsets.UTF_8);
            exchange.getResponseHeaders().set("Content-Type", "application/json; charset=UTF-8");
            exchange.sendResponseHeaders(200, bytes.length);
            OutputStream os = exchange.getResponseBody();
            os.write(bytes);
            os.close();
        }

        private String extrairMensagemJson(String json) {
            int inicio = json.indexOf("\"mensagem\":");
            if (inicio == -1) return "Olá";
            int aspasInicio = json.indexOf("\"", inicio + 11) + 1;
            int aspasFim = json.indexOf("\"", aspasInicio);
            return json.substring(aspasInicio, aspasFim);
        }

        private String escaparJson(String texto) {
            return texto.replace("\\", "\\\\")
                        .replace("\"", "\\\"")
                        .replace("\n", " ")
                        .replace("\r", "");
        }

        private String chamarGeminiApi(String mensagem) {
            try {
                HttpClient client = HttpClient.newHttpClient();
                String promptSystem = "Você é um assistente virtual acolhedor focado em saúde mental e bem-estar chamado ConectaMente. "
                        + "Responda com empatia, frases curtas e dicas úteis de autocuidado. "
                        + "Caso identifique sinais graves ou pedido de socorro, lembre sempre a pessoa do atendimento gratuito do CVV pelo telefone 188.";

                String payload = String.format("""
                    {
                      "contents": [{
                        "parts": [{ "text": "%s \\n\\n Mensagem do usuário: %s" }]
                      }]
                    }
                    """, promptSystem, mensagem);

                HttpRequest request = HttpRequest.newBuilder()
                        .uri(URI.create("https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=" + GEMINI_API_KEY))
                        .header("Content-Type", "application/json")
                        .POST(HttpRequest.BodyPublishers.ofString(payload))
                        .build();

                HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());

                // Extração básica do texto da resposta JSON
                String respBody = response.body();
                int idxText = respBody.indexOf("\"text\": \"");
                if (idxText != -1) {
                    int start = idxText + 9;
                    int end = respBody.indexOf("\"", start);
                    return respBody.substring(start, end);
                }

                return "Estou aqui para te ouvir. Lembre-se que você sempre pode ligar gratuitamente para o CVV no número 188.";
            } catch (Exception e) {
                return "Não consegui processar a mensagem agora. Em momentos difíceis, ligue 188 para falar com o CVV.";
            }
        }
    }
}