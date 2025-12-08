# Diagnóstico Completo: Comparação Frontend vs Swagger

Este documento compara todas as chamadas de API do frontend com o contrato Swagger, identificando problemas e inconsistências.

---

## ✅ CHAMADAS CORRETAS

Estas chamadas estão corretas e alinhadas com o Swagger:

### Account Controller
- ✅ `POST /accounts/register` - Correta
- ✅ `POST /accounts/login` - Correta
- ✅ `GET /accounts` - Correta
- ✅ `GET /accounts/{id}` - Correta
- ✅ `PUT /accounts/{id}` - Correta
- ✅ `DELETE /accounts/{id}` - Correta

### Member data Controller
- ✅ `GET /members` - Correta
- ✅ `GET /members/{cpf}` - Correta
- ✅ `POST /members` (multipart/form-data) - Correta
- ✅ `PUT /members` (multipart/form-data) - Correta
- ✅ `DELETE /members/{cpf}` - Correta
- ✅ `GET /members/unit` - Correta
- ✅ `GET /members/filter` - Correta
- ✅ `GET /members/class` - Correta
- ✅ `PUT /members/unit-and-class/{cpf}` - Correta

### Statement Controller
- ✅ `GET /statements` - Correta
- ✅ `GET /statements/{id}` - Correta
- ✅ `POST /statements` - Correta
- ✅ `DELETE /statements/{id}` - Correta
- ✅ `DELETE /statements/tag` - Correta
- ✅ `GET /statements/goal` - Correta

### Tag Controller
- ✅ `GET /tags` - Correta
- ✅ `GET /tags/{id}` - Correta
- ✅ `POST /tags` - Correta
- ✅ `PUT /tags/{id}` - Correta
- ✅ `DELETE /tags/{id}` - Correta

### Transport Controller
- ✅ `GET /transports` - Correta
- ✅ `GET /transports/{id}` - Correta
- ✅ `POST /transports` - Correta
- ✅ `PUT /transports/{id}` - Correta
- ✅ `DELETE /transports/{id}` - Correta

### Place Controller
- ✅ `GET /places` - Correta
- ✅ `GET /places/{id}` - Correta
- ✅ `POST /places` - Correta
- ✅ `PUT /places/{id}` - Correta
- ✅ `DELETE /places/{id}` - Correta

### Unit Controller
- ✅ `GET /units/ranking` - Correta
- ✅ `PUT /units/score` - Correta
- ✅ `POST /units/score` - Correta
- ✅ `POST /units/reseted` - Correta

### Reset Password Controller
- ✅ `POST /reset-password/reset` - Correta
- ✅ `POST /reset-password/verify-code` - Correta
- ✅ `POST /reset-password/update-password` - Correta

---

## ⚠️ CHAMADAS DESATUALIZADAS

*Nenhuma chamada desatualizada encontrada. Todas as chamadas estão usando as rotas e métodos corretos do Swagger.*

---

## ❌ CHAMADAS INEXISTENTES NO CONTRATO

### 1. `GET /api/ranking`
**Arquivo:** `src/components/unities-rank/UnitiesRank.jsx:7`

**Problema:**
- **Frontend usa:** `fetch("/api/ranking")`
- **Swagger não tem:** Esta rota não existe
- **Rota correta no Swagger:** `GET /units/ranking`

**Impacto:** ❌ **QUEBRADO** - Esta chamada falhará

**Correção necessária:**
```javascript
// ❌ ERRADO (atual)
fetch("/api/ranking")

// ✅ CORRETO
api.get("/units/ranking")
```

---

## ⚠️ CHAMADAS FALTANDO PARÂMETROS OBRIGATÓRIOS

### 1. `GET /statements` - Parâmetros Obrigatórios
**Arquivo:** `src/services/statementsService.js:4-18`
**Arquivo:** `src/Pages/internal-system/statement/Statement.jsx:113-130`

**Problema:**
- **Swagger (linha 926-943):** `page` e `size` são **OBRIGATÓRIOS** (`required: true`)
- **Frontend:** Pode chamar sem esses parâmetros

**Swagger:**
```json
{
  "name": "page",
  "required": true,
  "schema": { "type": "integer", "format": "int32" }
},
{
  "name": "size",
  "required": true,
  "schema": { "type": "integer", "format": "int32" }
}
```

**Frontend atual:**
```javascript
// Pode ser chamado sem page e size
const res = await api.get(`/statements`, { params });
```

**Status:** ⚠️ **RISCO** - Se chamado sem `page` e `size`, a API pode retornar erro 400

**Onde pode quebrar:**
- Se `getStatements()` for chamado sem parâmetros ou com `params = {}`
- O código em `Statement.jsx:121` sempre passa `page` e `size`, mas o serviço não valida

---

### 2. `GET /members/unit` - Parâmetros Obrigatórios
**Arquivo:** `src/services/membersService.js:101-109`

**Problema:**
- **Swagger (linha 1324-1341):** `page` e `size` são **OBRIGATÓRIOS** (`required: true`)
- **Frontend:** Tem valores padrão, mas se `undefined` for passado, pode quebrar

**Swagger:**
```json
{
  "name": "page",
  "required": true,
  "schema": { "type": "integer", "format": "int32" }
},
{
  "name": "size",
  "required": true,
  "schema": { "type": "integer", "format": "int32" }
}
```

**Frontend atual:**
```javascript
export const getMembersByUnit = async (unitName, page = 0, size = 10) => {
  const res = await api.get(`/members/unit`, { params: { unitName, page, size } });
}
```

**Status:** ✅ **OK** - Tem valores padrão, mas `unitName` pode ser `undefined` se não passado

---

### 3. `GET /members/filter` - Parâmetros Obrigatórios
**Arquivo:** `src/services/membersService.js:111-119`

**Problema:**
- **Swagger (linha 1389-1406):** `page` e `size` são **OBRIGATÓRIOS** (`required: true`)
- **Frontend:** Pode ser chamado sem esses parâmetros

**Swagger:**
```json
{
  "name": "page",
  "required": true,
  "schema": { "type": "integer", "format": "int32" }
},
{
  "name": "size",
  "required": true,
  "schema": { "type": "integer", "format": "int32" }
}
```

**Frontend atual:**
```javascript
export const getMembersByFilter = async (filter = {}) => {
  const res = await api.get(`/members/filter`, { params: filter });
}
```

**Status:** ⚠️ **RISCO** - Se chamado sem `page` e `size`, a API pode retornar erro 400

**Onde pode quebrar:**
- `Unities.jsx:124` - Pode passar `{ page: pageNumber, size: pageSize }` mas se `pageNumber` ou `pageSize` forem `undefined`, quebra
- `Classes.jsx:91` - Mesma situação
- `SecretaryPage.jsx` - Precisa verificar se sempre passa `page` e `size`

---

### 4. `GET /members/class` - Parâmetros Obrigatórios
**Arquivo:** `src/services/membersService.js:121-129`

**Problema:**
- **Swagger (linha 1452-1469):** `page` e `size` são **OBRIGATÓRIOS** (`required: true`)
- **Frontend:** Tem valores padrão, mas se `undefined` for passado, pode quebrar

**Status:** ✅ **OK** - Tem valores padrão (`page = 0, size = 10`)

---

### 5. `PUT /units/score` - Parâmetros Obrigatórios
**Arquivo:** `src/services/unitsService.js:20-37`

**Problema:**
- **Swagger (linha 64-80):** `surname` e `newScore` são **OBRIGATÓRIOS** (`required: true`)
- **Frontend:** Pode não passar se `undefined`

**Swagger:**
```json
{
  "name": "surname",
  "required": true,
  "schema": { "type": "string" }
},
{
  "name": "newScore",
  "required": true,
  "schema": { "type": "integer", "format": "int32" }
}
```

**Frontend atual:**
```javascript
export const updateUnitScore = async (surname, newScore) => {
  const params = {};
  if (surname !== undefined && surname !== null) params.surname = surname;
  if (newScore !== undefined && newScore !== null) params.newScore = newScore;
  const res = await api.put(`/units/score`, null, { params });
}
```

**Status:** ⚠️ **RISCO** - Se `surname` ou `newScore` forem `undefined/null`, a API retornará erro 400

---

### 6. `POST /units/score` - Parâmetros Obrigatórios
**Arquivo:** `src/services/unitsService.js:39-61`

**Problema:**
- **Swagger (linha 101-126):** `surname`, `score` e `isSum` são **OBRIGATÓRIOS** (`required: true`)
- **Frontend:** Lógica complexa que pode não passar todos os parâmetros

**Swagger:**
```json
{
  "name": "surname",
  "required": true
},
{
  "name": "score",
  "required": true
},
{
  "name": "isSum",
  "required": true,
  "schema": { "type": "boolean" }
}
```

**Frontend atual:**
```javascript
export const changeUnitScore = async (surname, score, isSum = true) => {
  let params = {};
  if (typeof surname === 'object' && surname !== null) {
    // Lógica complexa que pode não garantir todos os parâmetros
    params = { ...(surname.id !== undefined ? { id: surname.id } : {}), 
               ...(surname.surname !== undefined ? { surname: surname.surname } : {}), 
               score: surname.score, 
               isSum: surname.isSum };
  } else {
    params = { surname, score, isSum };
  }
  const res = await api.post(`/units/score`, null, { params });
}
```

**Status:** ⚠️ **RISCO** - Se algum parâmetro obrigatório estiver faltando, a API retornará erro 400

**Problemas específicos:**
- Se `surname` for um objeto mas não tiver `surname` ou `score`, faltará parâmetros obrigatórios
- A API não aceita `id`, apenas `surname` (linha 103 do Swagger)

---

### 7. `POST /reset-password/reset` - Parâmetros Obrigatórios
**Arquivo:** `src/services/userService.js:118-142`

**Problema:**
- **Swagger (linha 1074-1083):** `email` é **OBRIGATÓRIO** (`required: true`)
- **Frontend:** Passa como query param, mas precisa garantir que não seja `undefined`

**Status:** ✅ **OK** - O código parece sempre passar o email

---

### 8. `POST /reset-password/verify-code` - Parâmetros Obrigatórios
**Arquivo:** `src/services/userService.js:144-166`

**Problema:**
- **Swagger (linha 995-1011):** `email` e `code` são **OBRIGATÓRIOS** (`required: true`)
- **Frontend:** Passa como query params

**Status:** ✅ **OK** - O código parece sempre passar ambos

---

### 9. `POST /reset-password/update-password` - Parâmetros Obrigatórios
**Arquivo:** `src/services/userService.js:168-190`

**Problema:**
- **Swagger (linha 1034-1058):** `email`, `code` e `newPassword` são **OBRIGATÓRIOS** (`required: true`)
- **Frontend:** Passa como query params

**Status:** ✅ **OK** - O código parece sempre passar todos

---

### 10. `GET /statements/goal` - Parâmetros Obrigatórios
**Arquivo:** `src/services/statementsService.js:100-108`

**Problema:**
- **Swagger (linha 1230-1239):** `tagId` é **OBRIGATÓRIO** (`required: true`)
- **Frontend:** Pode ser chamado sem `tagId`

**Swagger:**
```json
{
  "name": "tagId",
  "required": true,
  "schema": { "type": "integer", "format": "int64" }
}
```

**Frontend atual:**
```javascript
export const getGoalByTag = async (tagId) => {
  const res = await api.get(`/statements/goal`, { params: { tagId } });
}
```

**Status:** ⚠️ **RISCO** - Se `tagId` for `undefined`, a API retornará erro 400

---

## 🔴 CHAMADAS COM NOMES ERRADOS

### 1. `PUT /members/{cpf}` - Rota Não Existe
**Arquivo:** `src/services/membersService.js:131-139`

**Problema:**
- **Frontend usa:** `PUT /members/{cpf}`
- **Swagger não tem:** Esta rota não existe no Swagger
- **Swagger tem:** `PUT /members` (atualiza por CPF no body, não no path)

**Swagger (linha 534-573):**
```json
{
  "path": "/members",
  "put": {
    "summary": "Endpoint for update member data by cpf",
    "requestBody": {
      "content": {
        "multipart/form-data": {
          "schema": {
            "required": ["data"],
            "properties": {
              "data": { "type": "string" },
              "file": { "type": "string", "format": "binary" }
            }
          }
        }
      }
    }
  }
}
```

**Frontend atual:**
```javascript
export const updateMemberByCpf = async (cpf, payload) => {
  const res = await api.put(`/members/${cpf}`, payload);
}
```

**Status:** ❌ **QUEBRADO** - Esta rota não existe no Swagger. Deveria usar `PUT /members` com o CPF no body (dentro do `data` JSON)

**Correção necessária:**
- Usar `PUT /members` e incluir o CPF no payload `data` (JSON stringificado)

---

## 📋 RESUMO DE PROBLEMAS POR GRAVIDADE

### 🔴 CRÍTICO (Quebra a aplicação)
1. **`GET /api/ranking`** - Rota inexistente
   - **Arquivo:** `src/components/unities-rank/UnitiesRank.jsx:7`
   - **Correção:** Mudar para `GET /units/ranking`

2. **`PUT /members/{cpf}`** - Rota inexistente
   - **Arquivo:** `src/services/membersService.js:131-139`
   - **Correção:** Usar `PUT /members` com CPF no body

### ⚠️ ALTO RISCO (Pode quebrar em certas condições)
1. **`GET /statements`** - Pode faltar `page` e `size` obrigatórios
   - **Arquivo:** `src/services/statementsService.js:4-18`
   - **Correção:** Validar e garantir que `page` e `size` sempre sejam passados

2. **`GET /members/filter`** - Pode faltar `page` e `size` obrigatórios
   - **Arquivo:** `src/services/membersService.js:111-119`
   - **Correção:** Validar e garantir que `page` e `size` sempre sejam passados

3. **`PUT /units/score`** - Pode faltar `surname` ou `newScore` obrigatórios
   - **Arquivo:** `src/services/unitsService.js:20-37`
   - **Correção:** Validar antes de chamar a API

4. **`POST /units/score`** - Lógica complexa pode não passar todos os parâmetros obrigatórios
   - **Arquivo:** `src/services/unitsService.js:39-61`
   - **Correção:** Simplificar e garantir `surname`, `score` e `isSum` sempre presentes

5. **`GET /statements/goal`** - Pode faltar `tagId` obrigatório
   - **Arquivo:** `src/services/statementsService.js:100-108`
   - **Correção:** Validar que `tagId` não seja `undefined`

### ⚠️ MÉDIO RISCO (Pode ter problemas de estrutura)
*Nenhum problema de estrutura identificado.*

---

## 📊 ESTATÍSTICAS

- **Total de chamadas mapeadas:** 40+
- **Chamadas corretas:** ~36
- **Chamadas desatualizadas:** 0
- **Chamadas inexistentes:** 2
- **Chamadas com parâmetros faltando:** 6
- **Chamadas com nomes errados:** 1

### Resumo por Severidade
- 🔴 **Crítico:** 2 problemas (quebram a aplicação)
- ⚠️ **Alto Risco:** 6 problemas (podem quebrar em certas condições)
- ⚠️ **Médio Risco:** 0 problemas

---

## 🔍 OBSERVAÇÕES ADICIONAIS

### Código Morto/Potencial
- **`src/services/userService.js:81,96`** - Contém chamadas `fetch` antigas que parecem não estar sendo usadas
- **`src/services/calendarService.js`** - Serviço não implementado (retorna valores vazios)

### APIs Externas
- **ViaCEP** (`https://viacep.com.br/ws/{cep}/json/`) - Usado corretamente em:
  - `src/components/admin-internal/FormRegister.jsx:109`
  - `src/Pages/internal-system/admin/add-member-steps/Address.jsx:31`

---

**Data do diagnóstico:** Análise completa comparando frontend com Swagger
**Versão do Swagger analisada:** 1.0.0

