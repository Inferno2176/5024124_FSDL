import { useRef, useState } from 'react';

function Home() {
  const inputRef = useRef(null);
  const [items, setItems] = useState([
    { id: 1, name: 'AngularJS comparison' },
    { id: 2, name: 'React Router page' },
  ]);

  const handleAdd = () => {
    const text = inputRef.current?.value.trim();
    if (!text) return;

    setItems((current) => [
      ...current,
      { id: Date.now(), name: text },
    ]);

    if (inputRef.current) {
      inputRef.current.value = '';
      inputRef.current.focus();
    }
  };

  return (
    <section>
      <h2>Item manager</h2>
      <p className="page-note">
        Add an item with the input below. This component uses <strong>useRef</strong> and
        <strong> useState</strong>.
      </p>

      <div className="form-row">
        <input ref={inputRef} type="text" placeholder="Add a new item" />
        <button type="button" onClick={handleAdd}>
          Add
        </button>
      </div>

      <div className="item-list">
        {items.map((item) => (
          <div key={item.id} className="item-card">
            <span>{item.name}</span>
            <small>Key: {item.id}</small>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Home;
