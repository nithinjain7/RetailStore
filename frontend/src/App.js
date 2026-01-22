import { useEffect, useState } from 'react';

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/products')
      .then(res => res.json())
      .then(setProducts);
  }, []);

  return (
    <div>
      <h1>Retail Store</h1>
      <ul>
        {products.map(p => (
          <li key={p.id}>
            {p.name} - ₹{p.price} - Stock: {p.stock}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
