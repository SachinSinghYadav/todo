import { useEffect, useState } from "react";

export interface Todo {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  priority: "low" | "medium" | "high";
  createdAt: string;
  updatedAt: string;
}

interface FormData {
  title: string;
  description: string;
  priority: "low" | "medium" | "high";
}

function App() {
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

  const [todoList, setTodoList] = useState<Todo[]>([]);
  const [formData, setFormData] = useState<FormData>({
    title: "",
    description: "",
    priority: "medium",
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(`${apiBaseUrl}/api/get_todos`);
      const data = await response.json();
      setTodoList(data?.todos || []);
    } catch (err) {
      console.log(err);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    if (!formData.title.trim()) {
      alert("Please enter a title");
      return;
    }

    try {
      const response = await fetch(`${apiBaseUrl}/api/create-todo`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      setTodoList(data?.todos || []);
      setFormData({ title: "", description: "", priority: "medium" });
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeleteTodo = async (id: string) => {
    try {
      const response = await fetch(`${apiBaseUrl}/api/delete-todo/${id}`, {
        method: "DELETE",
      });

      const data = await response.json();
      setTodoList(data?.todos || []);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
      <h1>My Todos</h1>

      {/* Add Todo Form */}
      <div
        style={{
          border: "1px solid #ccc",
          padding: "15px",
          borderRadius: "5px",
          marginBottom: "20px",
          backgroundColor: "#f9f9f9",
        }}
      >
        <h3>Add New Todo</h3>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleInputChange}
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "10px",
            border: "1px solid #ddd",
            borderRadius: "4px",
            boxSizing: "border-box",
          }}
        />
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleInputChange}
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "10px",
            border: "1px solid #ddd",
            borderRadius: "4px",
            boxSizing: "border-box",
            minHeight: "80px",
          }}
        />
        <select
          name="priority"
          value={formData.priority}
          onChange={handleInputChange}
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "10px",
            border: "1px solid #ddd",
            borderRadius: "4px",
          }}
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <button
          onClick={handleSubmit}
          style={{
            width: "100%",
            padding: "10px",
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            fontSize: "16px",
            fontWeight: "bold",
          }}
        >
          Add Todo
        </button>
      </div>

      {/* Todo List */}
      <div>
        <h2>Todos ({todoList.length})</h2>
        {todoList.length === 0 ? (
          <p style={{ color: "#999" }}>No todos yet. Create one above!</p>
        ) : (
          <ul style={{ listStyle: "none", padding: 0 }}>
            {todoList.map((todo) => (
              <li
                key={todo.id}
                style={{
                  border: "1px solid #ddd",
                  padding: "15px",
                  marginBottom: "10px",
                  borderRadius: "5px",
                  backgroundColor: todo.completed ? "#f0f0f0" : "#fff",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                }}
              >
                <div style={{ flex: 1 }}>
                  <h3 style={{ margin: "0 0 5px 0" }}>{todo.title}</h3>
                  <p style={{ margin: "5px 0", color: "#666" }}>
                    {todo.description}
                  </p>
                  <small>
                    Priority: <strong>{todo.priority}</strong> | Status:{" "}
                    <strong>{todo.completed ? "✅ Done" : "⏳ Pending"}</strong>
                  </small>
                </div>
                <button
                  onClick={() => handleDeleteTodo(todo.id)}
                  style={{
                    padding: "8px 12px",
                    backgroundColor: "#f44336",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                    marginLeft: "10px",
                    whiteSpace: "nowrap",
                  }}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default App;
