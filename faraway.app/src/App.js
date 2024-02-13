import { useState } from "react";
import "./App.css";
import { Logo } from "./Logo";
// const initialItems = [
//   { id: 1, description: "Passports", quantity: 2, packed: false },
//   { id: 2, description: "socks", quantity: 12, packed: true },
//   { id: 3, description: "Charger", quantity: 2, packed: false },
// ];
function App() {
  const [items, setItems] = useState([]);

  function handleadditem(item) {
    setItems((items) => [...items, item]);
  }
  function handledeleteitem(id) {
    setItems((items) => items.filter((item) => item.id !== id));
  }
  function handletoggleitem(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }

  function handleclear() {
    const confirmed = window.confirm(
      "Are you sure you want to delete all items?"
    );

    if (confirmed) setItems([]);
  }
  return (
    <div className="app">
      <Logo />
      <Form additems={handleadditem} />
      <PackingList
        items={items}
        deleteitems={handledeleteitem}
        ontoggleitem={handletoggleitem}
        onclear={handleclear}
      />
      <Stats items={items} />
    </div>
  );
}

function Form({ additems }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  function handlesubmit(e) {
    e.preventDefault();

    if (!description) return;

    const newitem = { description, quantity, packed: false, id: Date.now() };
    console.log(newitem);
    additems(newitem);
    setDescription("");
    setQuantity(1);
  }

  return (
    <form className="add-form" onSubmit={handlesubmit}>
      <h3>What do you need for your trip?</h3>
      <select
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      >
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Item..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button>Add</button>
    </form>
  );
}

function PackingList({ items, deleteitems, ontoggleitem, onclear }) {
  const [sort, setsorted] = useState("input");
  let sorteditems;
  if (sort === "input") sorteditems = items;

  if (sort === "description")
    sorteditems = items
      .slice()
      .sort((a, b) => a.description.localcompare(b.description));

  if (sort === "packed")
    sorteditems = items
      .slice()
      .sort((a, b) => Number(a.packed) - Number(b.packed));

  return (
    <div className="list">
      <ul>
        {items.map((item) => (
          <Item
            item={item}
            deleteitems={deleteitems}
            key={item.id}
            ontoggleitem={ontoggleitem}
          />
        ))}
      </ul>
      <div className="actions">
        <select value={sort} onChange={(e) => setsorted(e.target.value)}>
          <option value="input">Sort by input order</option>
          <option value="description">Sort by description</option>
          <option value="packed">Sort by pacled status</option>
        </select>

        <button onClick={onclear}>Clear all</button>
      </div>
    </div>
  );
}

function Item({ item, deleteitems, ontoggleitem }) {
  return (
    <li>
      <input
        type="checkbox"
        value={item.packed}
        onChange={() => ontoggleitem(item.id)}
      />
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </span>
      <button onClick={() => deleteitems(item.id)}>❌</button>
    </li>
  );
}

function Stats({ items }) {
  const numItems = items.length;
  const numpacked = items.filter((item) => item.packed).length;
  const percentage = Math.round((numpacked / numItems) * 100);
  return (
    <footer className="stats">
      <em>
        {percentage === 100
          ? "You got everything ! Ready to go "
          : ` you have packed ${numItems} items on your list, and you already packed ${numpacked} (${percentage}%)`}
      </em>
    </footer>
  );
}
export default App;
