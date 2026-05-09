import { useState, useEffect } from "react";

export default function App() {
  const [ht, setHt] = useState(0);
  const [tvaRate, setTvaRate] = useState(0.2); // 20%
  
  const [ttc, setTtc] = useState(0);
  const [tva, setTva] = useState(0);

  useEffect(() => {
    const htNum = Number(ht);
    const rate = Number(tvaRate);

    const calculatedTva = htNum * rate;
    const calculatedTtc = htNum + calculatedTva;

    setTva(calculatedTva);
    setTtc(calculatedTtc);

  }, [ht, tvaRate]);

  return (
    <div style={{ padding: 20 }}>
      <input
        type="number"
        placeholder="HT"
        onChange={(e) => setHt(e.target.value)}
      />

      <br />

      <input
        type="number"
        placeholder="TVA rate (ex: 0.2)"
        onChange={(e) => setTvaRate(e.target.value)}
      />


      <input
        type="number"
        placeholder="TVA rate (ex: 0.2)"
        value={ttc}
        onChange={(e) => setTtc(e.target.value)}
      />

      <table border={1}>
        <thead>
          <tr>
            <th>HT</th>
            <th>TVA</th>
            <th>TTC</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>{ht}</td>
            <td>{tva}</td>
            <td>{ttc}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}