# ListUp 📜

Este é um aplicativo de listas desenvolvido para facilitar o gerenciamento de listas de tarefas ou qualquer tipo de lista que você queira organizar. Você pode criar novas listas, visualizar as listas existentes e interagir com elas diretamente na interface do aplicativo.

## Funcionalidades ⚒️

- **Criar Listas**: Permite ao usuário criar novas listas diretamente no aplicativo.
- **Visualizar Listas**: Exibe todas as listas criadas, mostrando o nome e a data de criação.
- **Listas Clicáveis**: Você pode clicar nas listas para visualizar mais detalhes.
- **Ordenação de Listas**: As listas são ordenadas pela data de criação, da mais recente para a mais antiga.

## Tecnologias Usadas 💻

Este projeto utiliza as seguintes tecnologias:

- **React Native**: Framework para desenvolver aplicativos móveis nativos.
- **Firebase**: Utilizado para autenticação de usuários e armazenamento de dados no Firestore.
- **React Navigation**: Biblioteca de navegação entre telas no aplicativo.
- **Expo**: Para facilitar o desenvolvimento e testes no dispositivo.
- **Ionicons**: Biblioteca de ícones utilizada para o botão de recarregar as listas e outros ícones.
- **Firestore (Firebase)**: Banco de dados em tempo real para armazenar as listas criadas pelos usuários.

## Como Usar 🤔

### 1. Clonando o Repositório

Para começar a trabalhar com o projeto, clone este repositório para o seu computador com o seguinte comando:

```bash
git clone (https://github.com/Alan-Ziin/ListUp.git)
```

## 2. Instalando Dependências

Depois de clonar o repositório, entre no diretório do projeto e instale as dependências necessárias:

```bash
cd seu-repositorio
npm install
```

## 3. Configurando o Firebase

Antes de rodar o aplicativo, você precisa configurar o Firebase. Siga os passos abaixo:

  - Crie um projeto no Firebase:
      - Acesse Firebase Console.
      - Crie um novo projeto e ative a autenticação e o Firestore.

  - Obtenha as credenciais do Firebase:
      - No Firebase Console, vá até Configurações do Projeto > Configurações da Web.
      - Copie as credenciais do seu projeto.

  - Configure o Firebase no seu projeto:
      - Substituia os valores com as credenciais do seu projeto Firebase:

```firebaseConfig
const firebaseConfig = {
  apiKey: "SUA_API_KEY",
  authDomain: "SEU_AUTH_DOMAIN",
  projectId: "SEU_PROJECT_ID",
  storageBucket: "SEU_STORAGE_BUCKET",
  messagingSenderId: "SEU_MESSAGING_SENDER_ID",
  appId: "SEU_APP_ID",
};
```

## 4. Rodando o Projeto 🤓

Depois de configurar o Firebase, você pode rodar o aplicativo no seu dispositivo ou emulador. Use um dos seguintes comandos para rodar:

  - Para Android:
```
npx react-native run-android
```
  - Para iOS (caso esteja usando um Mac com Xcode instalado):
```
npx react-native run-ios
```
  - Ou, se estiver usando o Expo, use:
```
expo start
```
## 5. Interagindo com o Aplicativo

Quando o aplicativo abrir, você verá uma tela onde pode criar uma lista fornecendo um nome para ela. As listas criadas aparecerão na tela principal, com informações sobre quando foram criadas.
Clique em uma lista para ver mais detalhes sobre ela.

## Licença

Este projeto está licenciado sob a Licença MIT. Consulte o arquivo LICENSE para mais informações.

Se você quiser personalizar ou modificar o aplicativo, fique à vontade para contribuir e fazer pull requests!
