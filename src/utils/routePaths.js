export function getSectionTitle(path) {
    return paths[path] || path.split("/").pop().replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

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
}