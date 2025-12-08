# Mapeamento de Rotas de API - Frontend Application

Este documento lista todas as chamadas de API (axios, fetch e serviços) encontradas no projeto frontend, agrupadas por arquivo.

## Base URL
- Configurada em: `src/provider/api.js`
- Variável de ambiente: `VITE_API_URL`
- Base URL padrão no Swagger: `http://localhost:8080/api`

---

## 📁 SERVIÇOS (src/services/)

### `accountsService.js`
| Método | Rota | Descrição |
|--------|------|-----------|
| POST | `/accounts/register` | Registrar nova conta |
| POST | `/accounts/login` | Login de conta |
| GET | `/accounts` | Listar todas as contas |
| GET | `/accounts/{id}` | Buscar conta por ID |
| PUT | `/accounts/{id}` | Atualizar conta por ID |
| DELETE | `/accounts/{id}` | Deletar conta por ID |

### `membersService.js`
| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `/members` | Listar todos os membros |
| GET | `/members/{cpf}` | Buscar membro por CPF |
| POST | `/members` | Criar novo membro (multipart/form-data) |
| PUT | `/members` | Atualizar membro (multipart/form-data) |
| DELETE | `/members/{cpf}` | Deletar membro por CPF |
| GET | `/members/unit` | Listar membros por unidade (query: unitName, page, size) |
| GET | `/members/filter` | Filtrar membros (query: unit, classCategory, name, page, size) |
| GET | `/members/class` | Listar membros por classe (query: classCategory, page, size) |
| PUT | `/members/{cpf}` | Atualizar membro por CPF |
| PUT | `/members/unit-and-class/{cpf}` | Atualizar unidade e classe do membro |

### `statementsService.js`
| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `/statements` | Listar extratos com filtros e paginação (query: startDate, endDate, tagId, type, description, page, size) |
| GET | `/statements/{id}` | Buscar extrato por ID |
| POST | `/statements` | Criar novo extrato |
| PUT | `/statements/{id}` | Atualizar extrato por ID |
| DELETE | `/statements/{id}` | Deletar extrato por ID |
| DELETE | `/statements/tag` | Deletar extratos por tag (query: tagName) |
| GET | `/statements/goal` | Buscar meta por tag (query: tagId) |

### `tagsService.js`
| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `/tags` | Listar todas as tags |
| GET | `/tags/{id}` | Buscar tag por ID |
| POST | `/tags` | Criar nova tag |
| PUT | `/tags/{id}` | Atualizar tag por ID |
| DELETE | `/tags/{id}` | Deletar tag por ID |

### `transportsService.js`
| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `/transports` | Listar transportes ordenados por rating |
| GET | `/transports/{id}` | Buscar transporte por ID |
| POST | `/transports` | Criar novo transporte |
| PUT | `/transports/{id}` | Atualizar transporte por ID |
| DELETE | `/transports/{id}` | Deletar transporte por ID |

### `placesService.js`
| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `/places` | Listar lugares ordenados por rating |
| GET | `/places/{id}` | Buscar lugar por ID |
| POST | `/places` | Criar novo lugar |
| PUT | `/places/{id}` | Atualizar lugar por ID |
| DELETE | `/places/{id}` | Deletar lugar por ID |

### `unitsService.js`
| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `/units/ranking` | Buscar ranking de unidades |
| PUT | `/units/score` | Atualizar score da unidade (query: surname, newScore) |
| POST | `/units/score` | Aumentar/diminuir score da unidade (query: surname, score, isSum) |
| POST | `/units/reseted` | Resetar todos os scores das unidades |

### `userService.js`
| Método | Rota | Descrição |
|--------|------|-----------|
| POST | `/accounts/login` | Login de conta |
| POST | `/reset-password/reset` | Gerar código de reset de senha (query: email) |
| POST | `/reset-password/verify-code` | Verificar código de reset (query: email, code) |
| POST | `/reset-password/update-password` | Atualizar senha (query: email, code, newPassword) |
| **⚠️ OBSERVAÇÃO:** Este arquivo também contém chamadas `fetch` antigas que parecem não estar sendo usadas (linhas 81, 96) |

### `classesService.js`
| Método | Rota | Descrição |
|--------|------|-----------|
| *Este serviço é um wrapper que usa `membersService`* | | |
| - | `getMembersByClass` | Usa `/members/class` |
| - | `updateMemberUnitAndClass` | Usa `/members/unit-and-class/{cpf}` |

### `financeService.js`
| Método | Rota | Descrição |
|--------|------|-----------|
| *Este serviço é um wrapper que usa `statementsService`* | | |
| - | Todas as funções delegam para `statementsService` | |

### `calendarService.js`
| Método | Rota | Descrição |
|--------|------|-----------|
| *⚠️ NÃO IMPLEMENTADO* | | Este serviço retorna valores vazios/placeholders |

---

## 📄 PÁGINAS E COMPONENTES

### `src/Pages/internal-system/admin/Admin.jsx`
| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `/transports` | Buscar transportes |
| GET | `/places` | Buscar lugares |
| PUT | `/transports/{id}` | Atualizar transporte |
| PUT | `/places/{id}` | Atualizar lugar |
| DELETE | `/transports/{id}` | Deletar transporte |
| DELETE | `/places/{id}` | Deletar lugar |

### `src/Pages/internal-system/admin/AddPlace.jsx`
| Método | Rota | Descrição |
|--------|------|-----------|
| POST | `/places` | Criar novo lugar |

### `src/Pages/internal-system/admin/AddTransport.jsx`
| Método | Rota | Descrição |
|--------|------|-----------|
| POST | `/transports` | Criar novo transporte (via `createTransport` service) |

### `src/Pages/internal-system/admin/AddMemberPage.jsx`
| Método | Rota | Descrição |
|--------|------|-----------|
| POST | `/members` | Criar novo membro (via `createMember` service) |
| PUT | `/members` | Atualizar membro (via `updateMember` service) |

### `src/Pages/internal-system/statement/Statement.jsx`
| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `/statements` | Buscar extratos (via `getStatements` service) |
| POST | `/statements` | Criar extrato (via `createStatement` service) |
| PUT | `/statements/{id}` | Atualizar extrato (via `updateStatement` service) |
| DELETE | `/statements/{id}` | Deletar extrato (via `deleteStatement` service) |
| GET | `/statements/goal` | Buscar meta por tag (via `getGoalByTag` service) |
| GET | `/tags` | Buscar tags (via `fetchTagsService`) |
| POST | `/tags` | Criar tag (via `createTagService`) |
| PUT | `/tags/{id}` | Atualizar tag (via `updateTagService`) |
| DELETE | `/tags/{id}` | Deletar tag (via `deleteTagService`) |

### `src/Pages/internal-system/unities/Unities.jsx`
| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `/members` | Buscar todos os membros (via `getAllMembers` service) |
| GET | `/members/filter` | Filtrar membros (via `getMembersByFilter` service) |
| GET | `/members/unit` | Buscar membros por unidade (via `getMembersByUnit` service) |
| PUT | `/members/unit-and-class/{cpf}` | Atualizar unidade e classe (via `updateMemberUnitAndClass` service) |

### `src/Pages/internal-system/classe/Classes.jsx`
| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `/members` | Buscar todos os membros (via `getAllMembers` service) |
| GET | `/members/filter` | Filtrar membros (via `getMembersByFilter` service) |
| GET | `/members/class` | Buscar membros por classe (via `getMembersByClass` service) |
| PUT | `/members/unit-and-class/{cpf}` | Atualizar unidade e classe (via `updateMemberUnitAndClass` service) |

### `src/Pages/internal-system/secretary/SecretaryPage.jsx`
| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `/members/filter` | Filtrar membros (via `getMembersByFilter` service) |

### `src/Pages/internal-system/internal-home/InternalHome.jsx`
| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `/units/ranking` | Buscar ranking de unidades (via `getUnitsRanking` service) |
| POST | `/units/reseted` | Resetar scores (via `resetAllUnitScores` service) |
| GET | `/statements/goal` | Buscar meta por tag (via `getGoalByTag` service) |
| GET | `/tags` | Buscar tags (via `fetchTagsService`) |

### `src/Pages/internal-system/configurations/UserManagement.jsx`
| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `/accounts` | Buscar todas as contas |
| PUT | `/accounts/{id}` | Atualizar conta |
| POST | `/accounts/register` | Registrar nova conta |
| DELETE | `/accounts/{id}` | Deletar conta |

### `src/Pages/internal-system/configurations/Configurations.jsx`
| Método | Rota | Descrição |
|--------|------|-----------|
| PUT | `/accounts/{id}` | Atualizar conta própria |
| POST | `/accounts/register` | Registrar nova conta (não usado normalmente) |

### `src/Pages/Login/Login.jsx`
| Método | Rota | Descrição |
|--------|------|-----------|
| POST | `/accounts/login` | Login (via `loginService`) |
| POST | `/reset-password/reset` | Resetar senha (via `forgotPasswordService`) |
| POST | `/reset-password/verify-code` | Verificar código (via `verifyCodeService`) |
| POST | `/reset-password/update-password` | Atualizar senha (via `resetPasswordService`) |

### `src/Pages/Register/Register.jsx`
| Método | Rota | Descrição |
|--------|------|-----------|
| POST | `/accounts/register` | Registrar conta (via `registerService`) |

---

## 🔧 COMPONENTES

### `src/components/unities-rank/UnitiesRank.jsx`
| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `/api/ranking` | **⚠️ PROBLEMA:** Esta rota não existe no Swagger! Deveria ser `/units/ranking` |

### `src/components/admin-internal/FormRegister.jsx`
| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `https://viacep.com.br/ws/{cep}/json/` | **API Externa:** Buscar endereço por CEP (ViaCEP) |

### `src/Pages/internal-system/admin/add-member-steps/Address.jsx`
| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `https://viacep.com.br/ws/{cep}/json/` | **API Externa:** Buscar endereço por CEP (ViaCEP) |

### `src/components/member-card/MemberCard.jsx`
| Método | Rota | Descrição |
|--------|------|-----------|
| DELETE | `/members/{cpf}` | Deletar membro (via `deleteMember` service) |

---

## ⚠️ PROBLEMAS IDENTIFICADOS

### 1. Rota Incorreta
- **Arquivo:** `src/components/unities-rank/UnitiesRank.jsx`
- **Rota atual:** `/api/ranking`
- **Rota correta (Swagger):** `/units/ranking`
- **Status:** ❌ Quebrado

### 2. Código Antigo/Incompleto
- **Arquivo:** `src/services/userService.js`
- **Linhas 81, 96:** Contém chamadas `fetch` antigas que parecem não estar sendo usadas
- **Status:** ⚠️ Possível código morto

### 3. Serviço Não Implementado
- **Arquivo:** `src/services/calendarService.js`
- **Status:** ⚠️ Retorna valores vazios/placeholders

---

## 📊 RESUMO POR CONTROLLER (Swagger)

### Account Controller
- ✅ `/accounts/register` - POST
- ✅ `/accounts/login` - POST
- ✅ `/accounts` - GET
- ✅ `/accounts/{id}` - GET, PUT, DELETE

### Member data Controller
- ✅ `/members` - GET, POST, PUT
- ✅ `/members/{cpf}` - GET, DELETE
- ✅ `/members/unit` - GET
- ✅ `/members/filter` - GET
- ✅ `/members/class` - GET
- ✅ `/members/unit-and-class/{cpf}` - PUT

### Statement Controller
- ✅ `/statements` - GET, POST
- ✅ `/statements/{id}` - GET, PUT, DELETE
- ✅ `/statements/tag` - DELETE
- ✅ `/statements/goal` - GET

### Tag Controller
- ✅ `/tags` - GET, POST
- ✅ `/tags/{id}` - GET, PUT, DELETE

### Transport Controller
- ✅ `/transports` - GET, POST
- ✅ `/transports/{id}` - GET, PUT, DELETE

### Place Controller
- ✅ `/places` - GET, POST
- ✅ `/places/{id}` - GET, PUT, DELETE

### Unit Controller
- ✅ `/units/ranking` - GET
- ✅ `/units/score` - PUT, POST
- ✅ `/units/reseted` - POST

### Reset Password Controller
- ✅ `/reset-password/reset` - POST
- ✅ `/reset-password/verify-code` - POST
- ✅ `/reset-password/update-password` - POST

---

## 🔍 APIs EXTERNAS

### ViaCEP
- **URL:** `https://viacep.com.br/ws/{cep}/json/`
- **Uso:** Buscar endereço por CEP
- **Arquivos:**
  - `src/components/admin-internal/FormRegister.jsx`
  - `src/Pages/internal-system/admin/add-member-steps/Address.jsx`

---

## 📝 NOTAS

1. Todas as rotas usam o baseURL configurado em `src/provider/api.js`
2. A maioria das chamadas passa pelo interceptor que adiciona o token Bearer automaticamente
3. Alguns serviços usam multipart/form-data (ex: criação/atualização de membros)
4. A maioria dos serviços tem tratamento de erro com Swal (SweetAlert2)

---

**Última atualização:** Análise completa do projeto frontend
**Total de rotas mapeadas:** ~40+ rotas únicas

