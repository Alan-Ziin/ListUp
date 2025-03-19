import { useState, useEffect } from "react";
import { SafeAreaView, Text, StyleSheet, View, FlatList } from "react-native";
import { Button } from "@/components/button";
import { Input } from "@/components/input";
import { db, collection, addDoc, getDocs } from "../../../firebaseConfig";
import { getAuth } from "firebase/auth";
import { Timestamp } from "firebase/firestore";

interface List {
  id: string;
  name: string;
  createdAt: Date;
}

export default function HomeScreen() {
  const [listName, setListName] = useState("");
  const [lists, setLists] = useState<List[]>([]);
  const [isListCreated, setIsListCreated] = useState(false);
  const user = getAuth().currentUser;

  const createList = async () => {
    if (listName.trim() === "") {
      alert("Por favor, digite um nome para a lista.");
      return;
    }

    try {
      await addDoc(collection(db, "users", user.email.replace(".", "_"), "listas"), {
        name: listName,
        createdAt: Timestamp.now(),
      });

      setListName("");
      setIsListCreated(true);
      fetchLists();
    } catch (error) {
      console.error("Erro ao criar lista: ", error);
      alert("Erro ao criar lista.");
    }
  };

  const fetchLists = async () => {
    if (!user) {
      console.error("Usuário não autenticado.");
      return;
    }

    try {
      const querySnapshot = await getDocs(
        collection(db, "users", user.email.replace(".", "_"), "listas")
      );

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
        setLists(userLists);
      } else {
        setLists([]);
      }
    } catch (error) {
      console.error("Erro ao buscar listas: ", error);
    }
  };

  useEffect(() => {
    if (user) {
      fetchLists();
    }
  }, [user]);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Comece por aqui, dê um nome a ela.
      </Text>

      <Input
        style={styles.input}
        placeholder="Nome da Lista"
        value={listName}
        onChangeText={setListName}
      />

      <Button title="Criar Lista" onPress={createList} />

      {isListCreated && (
        <Text style={styles.successText}>Lista criada com sucesso!</Text>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: "80%",
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    fontSize: 16,
  },
  successText: {
    color: "green",
    marginTop: 10,
    fontSize: 16,
  },
  subTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 10,
  },
  listItem: {
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    marginVertical: 5,
    width: "80%",
    borderRadius: 5,
  },
});
