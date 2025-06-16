# ONEC Frontend - Gestão de Negociações e Contratos

O **ONEC Frontend** é a interface do sistema de gestão de negociações e contratos, desenvolvido para proporcionar uma experiência intuitiva e eficiente aos usuários. Este projeto faz parte de um sistema maior que automatiza e gerencia processos empresariais.

---

## 🚀 Tecnologias Utilizadas

**Principais Dependências:**

* **React** 19
* **Vite**
* **TailwindCSS**
* **Zustand**
* **Axios**
* **React Hook Form**
* **Zod**
* **TanStack React Query**
* **Recharts**
* **Radix UI**
* **Lucide React**
* **React Calendar**
* **React Day Picker**
* **React Cookie**
* **React Helmet**
* **Sonner**
* **xlsx**
* **Tailwind Merge**
* **LightningCSS**

**Ferramentas de Desenvolvimento:**

* **TypeScript**
* **Vitest**
* **ESLint & Biome**
* **Concurrently**
* **Orval**

---

## 📂 Estrutura do Projeto

```
src/
├─ assets/           # Imagens, ícones e arquivos estáticos
├─ data/             # Serviços de API e adaptadores (dto ↔ entity)
│  ├─ client-receipt/  # APIs e services para client-receipt
│  │  ├─ clientReceiptApi.ts
│  │  └─ clientReceiptService.ts
├─ domain/           # Entidades, schemas e cases de uso (use-cases)
├─ hooks/            # Hooks customizados (filtros, lógica adicional)
├─ http/             # Configuração do Orval e modelos gerados
├─ lib/              # Utils e helpers globais (e.g. shadcn-ui utils)
├─ mappers/          # Funções de transformação de dados
├─ pages/            # Páginas da aplicação + componentes específicos por página
│  ├─ client-receipt/
│  │  ├─ ui/         # Componentes de UI da página
│  │  └─ index.tsx   # Entrada da página
│  └─ ...            # Outras páginas
├─ store/            # Estado global (Zustand)
├─ styles/           # Configurações globais do TailwindCSS
├─ utils/            # Funções utilitárias usadas em várias partes
├─ App.tsx           # Componente raiz
└─ main.tsx          # Ponto de entrada da aplicação
```

---

## 🛠️ Configuração e Execução

### 1. Pré-requisitos

* Node.js >= 18.12
* PNPM >= 10.4.1

### 2. Clonar o Repositório

```bash
$ git clone https://github.com/GuilhermeBuenoReis/Onec-frellancer.git
$ cd onec-frontend
```

### 3. Instalar Dependências

```bash
$ pnpm install
```

### 4. Configurar Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto e adicione:

```env
VITE_API_URL=https://sua-api.com
```

### 5. Rodar o Projeto em Modo de Desenvolvimento

```bash
$ pnpm dev
```

### 6. Gerar e Atualizar Modelos de API (Orval)

```bash
$ pnpm run dev:orval
```

(*Orval em modo watch gera os modelos em `src/http/generated`*)

### 7. Build e Preview

```bash
$ pnpm build
$ pnpm preview
```

### 8. Testes

```bash
$ pnpm test
# modo watch:
$ pnpm test:watch
```

---

## 🔗 Comunicação com o Backend

O frontend consome a API do **ONEC Backend** para obter e enviar dados relacionados à gestão de negociações e contratos. Garanta que o backend esteja em execução para testes e desenvolvimento.

---

## 📝 Licença

Este projeto foi desenvolvido como freelancer e não possui licença pública.

---

## 🤝 Contato

Para dúvidas ou suporte:

📧 [guilhermebuenoreis@gmail.com](mailto:guilhermebuenoreis@gmail.com)
