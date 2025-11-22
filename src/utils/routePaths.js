const paths = {
    "/internal-home": "Início",
    "/admin": "Administração",
    "/add-member": "Adicionar Membro",
    "/add-event": "Adicionar Evento",
    "/add-transport": "Adicionar Transporte",
    "/add-place": "Adicionar Local",
    "/secretary": "Secretaria",
    "/statement": "Tesouraria",
    "/unities": "Unidades",
    "/classes": "Classes",
    "/events": "Eventos",
    "/configurations": "Configurações",
    "/user-management": "Gerenciamento de Usuários",
};

export function getSectionTitle(path) {
    // 1. Verificação de segurança para evitar erro se rodar no servidor (Next.js/Node)
    if (typeof window !== 'undefined') {
        // 2. Define o que é mobile (ex: menor que 768px)
        const isMobile = window.innerWidth < 768;

        // 3. Se for mobile E o caminho estiver na lista 'paths', retorna null (some)
        if (isMobile && paths[path]) {
            return null; 
        }
    }

    // 4. Comportamento normal (Desktop ou caminhos não listados)
    return paths[path] || path.split("/").pop().replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}