function guidGenerator() {
    var S4 = function() {
       return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
    };
    return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
}

let todos = [];

exports.addTodo = (req, res) => {
  const { title, description } = req.body;

  if (!title) {
    return res.status(400).json({ error: "Le titre est obligatoire !" });
  }
  const newTask = {
    id: guidGenerator(),
    title: title,
    description: description,
    completed: false,
    createdAt: new Date(),
  };
  todos.push(newTask);
  return res.status(201).json(newTask);
};

exports.getTodos = (req, res) => {
  return res.status(200).json(todos);
};

exports.getTodoById = (req, res) => {
  const idToFind = req.params.id;

  const task = todos.find((t) => t.id === idToFind);

  if (!task) {
    return res.status(404).json({ error: "Tache non trouvée" });
  } else {
    return res.status(200).json(task);
  }
};

exports.markToDoAsComplete = (req, res) => {
  const currentTodoId = req.params.id;

  const currentTodo = todos.find((t) => t.id === currentTodoId);

  if (!currentTodo) {
    return res.status(404).json({ error: "ce todo n'existe pas" });
  }

  currentTodo.completed = true;
  return res.json({ message: "todo marqué comme terminé", currentTodo });
};

exports.deleteTodo = (req, res) => {
  const currentTodoId = req.params.id;

  const index = todos.findIndex((t) => t.id === currentTodoId);

  if (index === -1) {
    return res.status(404).json({ error: "tache inexistante" });
  }

  const deletedTask = todos.splice(index, 1);
  return res.status(200).json({ message: "tache supprimée", deletedTask });
};

exports.updateTodo = (req, res) => {
  const currentTodoId = req.params.id;
  const { title, description } = req.body;

  const currentTodo = todos.find((t) => t.id === currentTodoId);

  if (!currentTodo) {
    return res.status(404).json({ error: "ce todo n'existe pas" });
  }

  currentTodo.title = title;
  currentTodo.description = description;
  return res.json({ message: "todo modifié", currentTodo });
};
