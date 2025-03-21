# ONEC Frontend - Gestão de Negociações e Contratos

## 📌 Sobre o Projeto
O **ONEC Frontend** é a interface do sistema de gestão de negociações e contratos, desenvolvido para proporcionar uma experiência intuitiva e eficiente aos usuários. Este projeto faz parte de um sistema maior que automatiza e gerencia processos empresariais.

Construído com **React**, **Vite** e **TailwindCSS**, o frontend consome a API do backend para exibir informações relevantes de maneira dinâmica e responsiva.

## 🚀 Tecnologias Utilizadas

### 🔹 Principais Dependências:
- **React 19** → Biblioteca para construção de interfaces de usuário.
- **Vite** → Ferramenta de build rápida e otimizada para React.
- **TailwindCSS** → Estilização moderna e altamente customizável.
- **Zustand** → Gerenciamento de estado leve e eficiente.
- **Axios** → Requisições HTTP para comunicação com o backend.
- **React Hook Form** → Gerenciamento de formulários.
- **Zod** → Validação de dados com tipagem forte.
- **TanStack React Query** → Gerenciamento de estado assíncrono.
- **Recharts** → Gráficos e visualizações interativas.
- **Radix UI** → Componentes acessíveis e customizáveis.
- **Lucide React** → Ícones modernos e minimalistas.

### 🔹 Ferramentas de Desenvolvimento:
- **TypeScript** → Tipagem estática para maior confiabilidade no código.
- **Vitest** → Testes unitários rápidos e eficientes.
- **ESLint & Biome** → Padronização e linting do código.
- **Concurrently** → Execução simultânea de múltiplos processos.

## 📂 Estrutura do Projeto

```
📂 src
 ┣ 📂 assets          → Imagens, ícones e outros arquivos estáticos.
 ┣ 📂 components      → Componentes reutilizáveis do projeto.
 ┣ 📂 database        → Simulação de dados (se aplicável).
 ┣ 📂 hooks           → Hooks customizados para abstração de lógica.
 ┣ 📂 http            → Configuração das requisições e consumo de APIs.
 ┣ 📂 lib             → Bibliotecas auxiliares e configurações globais.
 ┣ 📂 mappers         → Transformação e adaptação de dados da API.
 ┣ 📂 pages          → Páginas principais do sistema.
 ┣ 📂 store          → Gerenciamento de estado global com Zustand.
 ┣ 📂 styles         → Estilizações globais e configurações do TailwindCSS.
 ┣ 📜 App.tsx        → Componente raiz do projeto.
 ┣ 📜 main.tsx       → Ponto de entrada da aplicação.
 ┣ 📜 vite-env.d.ts  → Definições de tipos do Vite.
```

## 🛠️ Configuração e Execução

### 🔹 1. Pré-requisitos
- **Node.js** >= 18.12
- **PNPM** >= 10.4.1

### 🔹 2. Clonar o Repositório
```sh
$ git clone https://github.com/seu-usuario/onec-frontend.git
$ cd onec-frontend
```

### 🔹 3. Instalar Dependências
```sh
$ pnpm install
```

### 🔹 4. Configurar Variáveis de Ambiente
Crie um arquivo **.env** na raiz do projeto e adicione as configurações necessárias:
```env
VITE_API_URL=https://sua-api.com
```

### 🔹 5. Rodar o Projeto em Modo de Desenvolvimento
```sh
$ pnpm dev
```

### 🔹 6. Rodar os Testes
```sh
$ pnpm test
```
Ou em modo watch:
```sh
$ pnpm test:watch
```

## ✅ Testes Automatizados
Este projeto possui testes unitários utilizando **Vitest** para garantir a estabilidade da aplicação.

## 🔗 Comunicação com o Backend
O frontend consome a API do **ONEC Backend** para obter e enviar dados relacionados à gestão de negociações e contratos. Certifique-se de que o backend esteja rodando para um funcionamento adequado.

## 📝 Licença
Este projeto foi desenvolvido como freelancer e não possui uma licença pública.

## 🤝 Contato
Caso tenha dúvidas ou precise de suporte, entre em contato:

📧 guilhermebuenoreis@gmail.com

🚀 **ONEC Frontend - Interface moderna e eficiente para gestão de negócios!**

