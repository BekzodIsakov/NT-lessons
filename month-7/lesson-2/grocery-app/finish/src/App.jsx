import Header from "./components/Header";
import SearchItem from "./components/SearchItem";
import AddItem from "./components/AddItem";
import Content from "./components/Content";
import Footer from "./components/Footer";
import { useState, useEffect } from "react";

function App() {
  const API_URL = "http://localhost:3000/items";

  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState("");
  const [search, setSearch] = useState("");
  const [fetchError, setFetchError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Network response was not ok: ${errorText}`);
        }
        const listItems = await response.json();
        setItems(listItems);
        setFetchError(null);
      } catch (error) {
        console.error("Error fetching items:", error);
        setFetchError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    setTimeout(() => fetchItems(), 2000);
  }, []);

  const addItem = async (item) => {
    const id = String(
      items.length ? Number(items[items.length - 1].id) + 1 : 1
    );
    const myNewItem = { id, checked: false, item };
    const postOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(myNewItem),
    };

    try {
      const response = await fetch(API_URL, postOptions);
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Network response was not ok:${errorText}`);
      }

      const listItems = [...items, myNewItem];
      setItems(listItems);
    } catch (error) {
      console.error("Error creating item:", error);
      setFetchError(error.message);
    }
  };

  const handleCheck = async (id) => {
    try {
      const updatedItem = items.find((item) => item.id === id);
      if (!updatedItem) throw new Error(`Item with id:${id} not found`);

      const updateOptions = {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ checked: !updatedItem.checked }),
      };
      const reqUrl = `${API_URL}/${id}`;

      const response = await fetch(reqUrl, updateOptions);
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Network response was not ok: ${errorText}`);
      }

      const result = await response.json();
      const listItems = items.map((item) =>
        item.id === id ? { ...result } : item
      );
      setItems(listItems);
    } catch (error) {
      console.error("Error updating item:", error);
      setFetchError(error.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      const deletedItem = items.find((item) => item.id === id);
      if (!deletedItem) throw new Error(`Item with id${id} not found`);

      const deleteOptions = { method: "DELETE" };
      const reqUrl = `${API_URL}/${id}`;
      const response = await fetch(reqUrl, deleteOptions);
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Network response was not ok: ${errorText}`);
      }

      const filteredItems = items.filter((item) => item.id !== id);
      setItems(filteredItems);
    } catch (error) {
      console.error("Error deleting item:", error);
      setFetchError(error.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newItem) return;
    addItem(newItem);
    setNewItem("");
  };

  return (
    <div className='App'>
      <Header title='Grocery List' />
      <AddItem
        newItem={newItem}
        setNewItem={setNewItem}
        handleSubmit={handleSubmit}
      />
      <SearchItem search={search} setSearch={setSearch} />
      <main>
        {isLoading && <p>Loading Items...</p>}
        {fetchError && <p style={{ color: "red" }}>{`Error: ${fetchError}`}</p>}
        {!fetchError && !isLoading && (
          <Content
            items={items.filter((item) =>
              item.item.toLowerCase().includes(search.toLowerCase())
            )}
            handleCheck={handleCheck}
            handleDelete={handleDelete}
          />
        )}
      </main>
      <Footer length={items.length} />
    </div>
  );
}

export default App;
