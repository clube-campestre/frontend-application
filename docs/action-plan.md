# Plano de Ação: Correção do Frontend

## 📋 Resumo Executivo

Este documento detalha todas as correções necessárias para alinhar o frontend com o contrato Swagger, remover código duplicado, eliminar componentes não utilizados e centralizar todas as chamadas de API.

---

## 🔴 PROBLEMAS CRÍTICOS (QUEBRAM A APLICAÇÃO)

### 1. Rota Quebrada: `GET /api/ranking`
**Arquivo:** `src/components/unities-rank/UnitiesRank.jsx`
- **Problema:** Usa `fetch("/api/ranking")` que não existe
- **Correção:** Usar `api.get("/units/ranking")` do serviço `unitsService`
- **Ação:** Atualizar componente ou removê-lo se não estiver em uso

### 2. Função Não Utilizada: `updateMemberByCpf`
**Arquivo:** `src/services/membersService.js:131-139`
- **Problema:** Tenta usar `PUT /members/{cpf}` que não existe no Swagger
- **Correção:** Remover função ou usar `PUT /members` com CPF no body
- **Ação:** Verificar uso e corrigir/remover

---

## ⚠️ PROBLEMAS DE ALTO RISCO (PODEM QUEBRAR EM CERTAS CONDIÇÕES)

### 3. Parâmetros Obrigatórios Faltando

#### 3.1 `GET /statements` - Faltam `page` e `size`
**Arquivo:** `src/services/statementsService.js:4-18`
- **Problema:** Parâmetros `page` e `size` são obrigatórios mas podem não ser passados
- **Correção:** Garantir valores padrão ou validação

#### 3.2 `GET /members/filter` - Faltam `page` e `size`
**Arquivo:** `src/services/membersService.js:111-119`
- **Problema:** Parâmetros `page` e `size` são obrigatórios mas podem não ser passados
- **Correção:** Garantir valores padrão ou validação

#### 3.3 `PUT /units/score` - Faltam `surname` e `newScore`
**Arquivo:** `src/services/unitsService.js:20-37`
- **Problema:** Parâmetros são obrigatórios mas podem ser undefined
- **Correção:** Validar antes de chamar

#### 3.4 `POST /units/score` - Faltam `surname`, `score` e `isSum`
**Arquivo:** `src/services/unitsService.js:39-61`
- **Problema:** Lógica complexa pode não passar todos os parâmetros
- **Correção:** Simplificar e garantir todos os parâmetros

#### 3.5 `GET /statements/goal` - Falta `tagId`
**Arquivo:** `src/services/statementsService.js:100-108`
- **Problema:** `tagId` é obrigatório mas pode não ser passado
- **Correção:** Validar antes de chamar

---

## 🗑️ COMPONENTES NÃO UTILIZADOS (REMOVER)

### 4. Componentes para Remover

1. **`src/components/label-button/LabelButton.jsx`**
   - Não encontrado em uso no código

2. **`src/components/admin-internal/FormMember.jsx`**
   - Não encontrado em uso no código

3. **`src/components/admin-internal/ListPanel.jsx`**
   - Não encontrado em uso no código

4. **`src/components/unities-rank/UnitiesRank.jsx`**
   - Não encontrado em uso e tem rota quebrada
   - **Decisão:** Remover ou corrigir se necessário

---

## 🔄 CÓDIGO DUPLICADO (EXTRAIR PARA COMPONENTES)

### 5. Padrões Duplicados Identificados

#### 5.1 Paginação (Classes, Unities, SecretaryPage, Statement)
**Padrão duplicado:**
```jsx
<div className="flex items-center gap-2">
    <button onClick={prevPage} disabled={pageNumber === 0}>
        <FaChevronLeft />
    </button>
    <span>Pág {pageNumber + 1} de {totalPages}</span>
    <button onClick={nextPage} disabled={pageNumber + 1 === totalPages}>
        <FaChevronRight />
    </button>
</div>
```
**Solução:** Criar `src/components/pagination/Pagination.jsx`

#### 5.2 Empty State (várias páginas)
**Padrão duplicado:**
```jsx
<div className="flex flex-col items-center justify-center py-20">
    <div className="bg-gray-50 p-4 rounded-full mb-4">
        <Icon size={32} className="text-gray-300" />
    </div>
    <h3 className="text-lg font-medium">Nenhum item encontrado</h3>
    <p className="text-gray-500">Mensagem...</p>
</div>
```
**Solução:** Criar `src/components/empty-state/EmptyState.jsx`

#### 5.3 Info Cards (Classes, Unities)
**Padrão duplicado:**
```jsx
<div className="bg-white p-3 md:p-4 rounded-xl shadow-sm border border-gray-200 flex items-center gap-4">
    <div className="bg-amber-100 p-3 rounded-full text-[#FCAE2D]">
        <Icon />
    </div>
    <div>
        <p className="text-xs text-gray-500 uppercase font-bold">Label</p>
        <p className="text-lg font-bold text-gray-800">Value</p>
    </div>
</div>
```
**Solução:** Criar `src/components/info-card/InfoCard.jsx`

#### 5.4 Modal de Tags (Statement)
**Arquivo:** `src/Pages/internal-system/statement/Statement.jsx:484-573`
- **Problema:** Modal grande duplicado inline
- **Solução:** Criar `src/components/tags-modal/TagsModal.jsx`

---

## 🔧 CENTRALIZAÇÃO DE CHAMADAS API

### 6. Chamadas Diretas de API (Mover para Serviços)

#### 6.1 Admin.jsx
- `api.get("/transports")` → `transportsService.getAllTransports()`
- `api.put("/transports/{id}")` → `transportsService.updateTransport()`
- `api.delete("/transports/{id}")` → `transportsService.deleteTransport()`
- `api.get("/places")` → `placesService.getAllPlaces()`
- `api.put("/places/{id}")` → `placesService.updatePlace()`
- `api.delete("/places/{id}")` → `placesService.deletePlace()`

#### 6.2 AddPlace.jsx
- `api.post("/places")` → `placesService.createPlace()`

#### 6.3 UserManagement.jsx
- `api.get("/accounts")` → `accountsService.getAllAccounts()`
- `api.put("/accounts/{id}")` → `accountsService.updateAccount()`
- `api.post("/accounts/register")` → `accountsService.registerAccount()`
- `api.delete("/accounts/{id}")` → `accountsService.deleteAccount()`

#### 6.4 Configurations.jsx
- `api.put("/accounts/{id}")` → `accountsService.updateAccount()`
- `api.post("/accounts/register")` → `accountsService.registerAccount()`

#### 6.5 userService.js
- **Problema:** Linhas 81 e 96 têm `fetch` antigo não utilizado
- **Correção:** Remover código morto

---

## 📝 DETALHAMENTO DAS CORREÇÕES

### Correção 1: UnitiesRank.jsx
```javascript
// ANTES
fetch("/api/ranking")

// DEPOIS
import { getUnitsRanking } from "../../services/unitsService";
const ranking = await getUnitsRanking();
```

### Correção 2: membersService.js - updateMemberByCpf
```javascript
// REMOVER ou CORRIGIR
// A rota PUT /members/{cpf} não existe
// Usar PUT /members com CPF no body (data)
```

### Correção 3: statementsService.js - getStatements
```javascript
// GARANTIR page e size
export const getStatements = async (params = {}) => {
  const defaultParams = { page: 0, size: 10, ...params };
  // ...
};
```

### Correção 4: membersService.js - getMembersByFilter
```javascript
// GARANTIR page e size
export const getMembersByFilter = async (filter = {}) => {
  const params = { page: 0, size: 10, ...filter };
  // ...
};
```

### Correção 5: unitsService.js - updateUnitScore
```javascript
// VALIDAR parâmetros obrigatórios
export const updateUnitScore = async (surname, newScore) => {
  if (!surname || newScore === undefined) {
    throw new Error("surname e newScore são obrigatórios");
  }
  // ...
};
```

### Correção 6: unitsService.js - changeUnitScore
```javascript
// SIMPLIFICAR e VALIDAR
export const changeUnitScore = async (surname, score, isSum = true) => {
  if (!surname || score === undefined || isSum === undefined) {
    throw new Error("surname, score e isSum são obrigatórios");
  }
  // ...
};
```

### Correção 7: statementsService.js - getGoalByTag
```javascript
// VALIDAR tagId obrigatório
export const getGoalByTag = async (tagId) => {
  if (!tagId) {
    throw new Error("tagId é obrigatório");
  }
  // ...
};
```

---

## 📦 NOVOS COMPONENTES A CRIAR

### 1. Pagination.jsx
```jsx
// src/components/pagination/Pagination.jsx
// Props: pageNumber, totalPages, onPageChange
```

### 2. EmptyState.jsx
```jsx
// src/components/empty-state/EmptyState.jsx
// Props: icon, title, message
```

### 3. InfoCard.jsx
```jsx
// src/components/info-card/InfoCard.jsx
// Props: icon, label, value, iconBgColor
```

### 4. TagsModal.jsx
```jsx
// src/components/tags-modal/TagsModal.jsx
// Extrair modal de tags do Statement.jsx
```

---

## ✅ CHECKLIST DE IMPLEMENTAÇÃO

### Fase 1: Correções Críticas
- [ ] Corrigir rota `/api/ranking` → `/units/ranking`
- [ ] Remover/corrigir `updateMemberByCpf`
- [ ] Adicionar validação de parâmetros obrigatórios

### Fase 2: Centralização de API
- [ ] Mover chamadas diretas de `Admin.jsx` para serviços
- [ ] Mover chamadas diretas de `AddPlace.jsx` para serviços
- [ ] Mover chamadas diretas de `UserManagement.jsx` para serviços
- [ ] Mover chamadas diretas de `Configurations.jsx` para serviços
- [ ] Remover código morto de `userService.js`

### Fase 3: Refatoração de Componentes
- [ ] Criar componente `Pagination.jsx`
- [ ] Criar componente `EmptyState.jsx`
- [ ] Criar componente `InfoCard.jsx`
- [ ] Criar componente `TagsModal.jsx`
- [ ] Substituir código duplicado pelos novos componentes

### Fase 4: Limpeza
- [ ] Remover `LabelButton.jsx`
- [ ] Remover `FormMember.jsx`
- [ ] Remover `ListPanel.jsx`
- [ ] Remover ou corrigir `UnitiesRank.jsx`

### Fase 5: Testes
- [ ] Testar todas as rotas corrigidas
- [ ] Testar paginação
- [ ] Testar validação de parâmetros
- [ ] Verificar responsividade

---

## 🎯 PRIORIDADES

1. **URGENTE:** Correções críticas (Fase 1)
2. **ALTA:** Centralização de API (Fase 2)
3. **MÉDIA:** Refatoração de componentes (Fase 3)
4. **BAIXA:** Limpeza (Fase 4)

---

## 📊 ESTIMATIVA

- **Fase 1:** 2-3 horas
- **Fase 2:** 3-4 horas
- **Fase 3:** 4-5 horas
- **Fase 4:** 1 hora
- **Total:** ~10-13 horas

---

**Data de Criação:** 2024
**Status:** Aguardando aprovação para implementação

