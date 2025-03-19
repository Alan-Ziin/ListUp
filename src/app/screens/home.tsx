import { useState, useEffect } from "react";
import { SafeAreaView, Text, StyleSheet, FlatList, View, ScrollView, TouchableOpacity } from "react-native";
import { db, collection, getDocs } from "../../../firebaseConfig";
import { getAuth } from "firebase/auth";
import { Timestamp, query, orderBy } from "firebase/firestore";
import { Ionicons } from '@expo/vector-icons'

interface List {
  id: string;
  name: string;
  createdAt: Date;
}

export default function HomeScreen() {
  const [lists, setLists] = useState<List[]>([]);
  const user = getAuth().currentUser;

  const fetchLists = async () => {
    if (!user) {
      console.error("Usuário não autenticado.");
      return;
    }

    try {
      const q = query(
        collection(db, "users", user.email.replace(".", "_"), "listas"),
        orderBy("createdAt", "desc")
      );

      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const userLists = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          const createdAt = data.createdAt instanceof Timestamp ? data.createdAt.toDate() : new Date();

          return {
            id: doc.id,
            name: data.name,
            createdAt,
          };
        });
        setLists(userLists); // Atualiza o estado com as listas ordenadas
      } else {
        setLists([]);
      }
    } catch (error) {
      console.error("Erro ao buscar listas: ", error);
    }
  };

  useEffect(() => {
    if (user) {
      fetchLists(); // Carrega as listas do Firestore quando o usuário estiver autenticado
    }
  }, [user]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Minhas Listas</Text>
      </View>

      <ScrollView contentContainerStyle={styles.contentContainer}>
        <FlatList
          data={lists}
          renderItem={({ item }) => (
            <TouchableOpacity activeOpacity={0.5} style={styles.listItem}>
              <Text style={styles.listName}>{item.name}</Text>
              <Text style={styles.listDate}>
                Criada em: {item.createdAt.toLocaleString()}
              </Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer} 
          ListEmptyComponent={<Text style={styles.noListsText}>Você ainda não tem listas criadas.</Text>} 
        />
      </ScrollView>
      <TouchableOpacity activeOpacity={0.5} style={styles.floatingButton} onPress={fetchLists}>
        <Ionicons name="reload" size={30} color="white" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
    paddingBottom: 20,
  },
  header: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    paddingTop: 30,
    paddingBottom: 15,
    zIndex: 1,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  contentContainer: {
    marginTop: 80,
    paddingBottom: 80,
    paddingHorizontal: 16,
  },
  listItem: {
    padding: 15,
    borderWidth: 1,
    borderColor: "#ccc",
    marginVertical: 8,
    width: "100%",
    borderRadius: 10,
    backgroundColor: "#fff",
  },
  listName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  listDate: {
    fontSize: 14,
    color: "#777",
    marginTop: 5,
  },
  noListsText: {
    marginTop: 20,
    fontSize: 16,
    color: "#777",
  },
  listContainer: {
    flexGrow: 1,
    alignItems: "center",
  },

  floatingButton: {
    position: "absolute",
    top: 40,
    left: 16,
    backgroundColor: "#010d23",
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 2,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 4 },
    elevation: 5,
  },
  floatingButtonText: {
    fontSize: 24,
    color: "#fff",
  },
});