export type RootStackParamList = {
  Home: undefined; // Home não tem parâmetros
  ListDetail: { listId: string }; // ListDetail recebe listId
  Tabs: undefined; // Tabs não tem parâmetros
};