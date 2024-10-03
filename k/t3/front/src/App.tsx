import { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Box,
  ThemeProvider,
  createTheme,
} from '@mui/material';
import { Delete, Check, Save, Edit } from '@mui/icons-material';
import { yellow } from '@mui/material/colors';

const URI = "http://127.0.0.1:42069/todo";

interface Todo {
  id: string;
  name: string;
  priority: number;
  createdAt: number;
  updatedAt: number | undefined;
  deleted: boolean;
  completed: boolean;
}

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState('');
  const [nameIndex, setNameIndex] = useState(-1);
  const [name, setName] = useState('');

  const fetchTodos = () => {
    fetch(URI + "/")
      .then((res) => res.json())
      .then((data) => setTodos(data));
  };

  const addTodo = () => {
    if (input.trim() !== '') {
      fetch(URI + "/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: input,
        }),
      }).then(fetchTodos);
    }

    setInput("");
  };

  const deleteTodo = (index: number) => {
    fetch(URI + "/", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: todos[index].id,
      }),
    }).then(fetchTodos);
  };

  const toggleComplete = (index: number) => {
    fetch(URI + "/", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: todos[index].id,
        completed: !todos[index].completed,
      }),
    }).then(fetchTodos);
  };

  const startEdit = (index: number) => {
    setNameIndex(index);
    setName(todos[index].name);
  };

  const saveEdit = () => {
    if (name.trim() !== '') {
      fetch(URI + "/", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: todos[nameIndex].id,
          name: name,
        }),
      }).then(fetchTodos);

      setNameIndex(-1);
    }
  };

  const handleKeyPress = (event: any, action: any) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      action();
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const theme = createTheme({
    palette: {
      primary: {
        main: yellow[300],
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="sm">
        <Typography variant="h2" component="h1">
          Todo
        </Typography>
        <Box sx={{ display: 'flex', mb: 2 }}>
          <TextField
            fullWidth
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyUp={(e) => handleKeyPress(e, addTodo)}
            label="Add a new task"
            variant="outlined"
          />
          <Button
            variant="contained"
            color="primary"
            onClick={addTodo}
            sx={{ ml: 1 }}
          >
            Add
          </Button>
        </Box>
        <List>
          {todos.map((todo, index) => (
            <ListItem
              key={index}
              sx={{
                textDecoration: todo.completed ? 'line-through' : 'none',
              }}
              secondaryAction={
                <>
                  {nameIndex === index ? (
                    <IconButton edge="end" aria-label="save" onClick={saveEdit}>
                      <Save />
                    </IconButton>
                  ) : (
                    <IconButton edge="end" aria-label="edit" onClick={() => startEdit(index)}>
                      <Edit />
                    </IconButton>
                  )}
                  <IconButton
                    edge="end"
                    aria-label="complete"
                    onClick={() => toggleComplete(index)}
                  >
                    <Check />
                  </IconButton>
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => deleteTodo(index)}
                  >
                    <Delete />
                  </IconButton>
                </>
              }
            >
              {nameIndex === index ? (
                <TextField
                  fullWidth
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onKeyUp={(e) => handleKeyPress(e, saveEdit)}
                  variant="standard"
                  autoFocus
                />
              ) : (
                <ListItemText
                  primary={todo.name}
                  onClick={() => startEdit(index)}
                  sx={{ cursor: 'pointer' }}
                />
              )}
            </ListItem>
          ))}
        </List>
      </Container>
    </ThemeProvider>
  );
}

export default App;