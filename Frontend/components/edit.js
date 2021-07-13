import React, { useState } from "react";
import { StyleSheet, Text, View, Button, TextInput } from "react-native";

export default function Edit(props) {
  const movie = props.navigation.getParam("movie", null);
  const [title, setTitle] = useState(movie.title);
  const [description, setDescription] = useState(movie.description);

  const saveMovie = () => {
    if (movie.id) {
      fetch(`http://192.168.0.2:8000/api/movies/${movie.id}/`, {
        method: "PUT",
        headers: {
          Authorization: `Token ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title: title, description: description }),
      })
        .then((res) => res.json())
        .then((movie) => {
          props.navigation.navigate("Detail", {
            movie: movie,
            title: movie.title,
          });
        })
        .catch((error) => console.log(error));
    } else {
      fetch(`http://192.168.0.2:8000/api/movies/`, {
        method: "POST",
        headers: {
          Authorization: `Token ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title: title, description: description }),
      })
        .then((res) => res.json())
        .then((movie) => {
          props.navigation.navigate("MovieList");
        })
        .catch((error) => console.log(error));
    }
    fetch(`http://192.168.0.2:8000/api/movies/${movie.id}/`, {
      method: "PUT",
      headers: {
        Authorization: `Token ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title: title, description: description }),
    })
      .then((res) => res.json())
      .then((movie) => {
        props.navigation.navigate("MovieList");
      })
      .catch((error) => console.log(error));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Title</Text>
      <TextInput
        style={styles.input}
        placeholder="Title"
        onChangeText={(text) => setTitle(text)}
        value={title}
      />
      <Text style={styles.label}>Description</Text>
      <TextInput
        style={styles.input}
        placeholder="Description"
        onChangeText={(text) => setDescription(text)}
        value={description}
      />
      <Button onPress={() => saveMovie()} title={movie.id ? "Edit" : "Add"} />
    </View>
  );
}

Edit.navigationOptions = (screenProps) => ({
  title: screenProps.navigation.getParam("title"),
  headerStyle: {
    backgroundColor: "orange",
  },
  headerTintColor: "#fff",
  headerTitleStyle: {
    fontWeight: "bold",
    fontSize: 24,
  },
  headerRight: (
    <Button
      title="Remove"
      color="orange"
      onPress={() => removeClicked(screenProps)}
    />
  ),
});

const removeClicked = (props) => {
  const movie = props.navigation.getParam("movie");
  console.log(movie);
  fetch(`http://192.168.0.2:8000/api/movies/${movie.id}/`, {
    method: "DELETE",
    headers: {
      Authorization: `Token ${token}`,
      "Content-Type": "application/json",
    },
  })
    .then((movie) => {
      props.navigation.navigate("MovieList");
    })
    .catch((error) => console.log(error));
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#282C35",
    padding: 10,
  },
  description: {
    fontSize: 20,
    color: "white",
    padding: 10,
  },
  label: {
    fontSize: 24,
    color: "white",
    padding: 10,
  },
  input: {
    fontSize: 24,
    backgroundColor: "white",
    padding: 10,
    margin: 10,
  },
});