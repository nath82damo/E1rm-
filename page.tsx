
'use client';

import { useMemo, useState } from 'react';
import Card from '../components/Card';
import {
  calculateE1RM,
  calculateReps
} from '../lib/e1rm';

export default function Home() {
  const [weight, setWeight] = useState(100);
  const [reps, setReps] = useState(5);
  const [target, setTarget] = useState(180);
  const [unit, setUnit] = useState('kg');

  const e1rm = useMemo(() => {
    return calculateE1RM(weight, reps);
  }, [weight, reps]);

  const plateBreakdown = useMemo(() => {
    const total = weight - 20;
    const perSide = total / 2;

    const plates = [25, 20, 15, 10, 5, 2.5, 1.25];
    const result = [];

    let remaining = perSide;

    for (const plate of plates) {
      let count = 0;

      while (remaining >= plate - 0.001) {
        remaining -= plate;
        count++;
      }

      if (count > 0) {
        result.push(`${count} × ${plate}${unit}`);
      }
    }

    return result;
  }, [weight, unit]);

  const combinations = useMemo(() => {
    const rows = [];

    for (let w = 60; w <= 300; w += 5) {
      const repsNeeded = calculateReps(target, w);

      if (repsNeeded >= 1 && repsNeeded <= 30) {
        rows.push({
          weight: w,
          reps: repsNeeded.toFixed(1)
        });
      }
    }

    return rows.slice(0, 15);
  }, [target]);

  return (
    <main
      style={{
        maxWidth: 700,
        margin: '0 auto',
        padding: 20
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 24
        }}
      >
        <h1 style={{
          fontSize: 42,
          margin: 0
        }}>
          E1RM Pro
        </h1>

        <select
          value={unit}
          onChange={(e) => setUnit(e.target.value)}
          style={{ width: 100 }}
        >
          <option value="kg">KG</option>
          <option value="lbs">LBS</option>
        </select>
      </div>

      <Card title="Main Calculator">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 16
          }}
        >
          <div>
            <label>Weight ({unit})</label>

            <input
              type="number"
              step="0.5"
              value={weight}
              onChange={(e) =>
                setWeight(Number(e.target.value))
              }
            />
          </div>

          <div>
            <label>Reps</label>

            <input
              type="number"
              min="1"
              max="30"
              value={reps}
              onChange={(e) =>
                setReps(Number(e.target.value))
              }
            />
          </div>
        </div>

        <div
          style={{
            marginTop: 30,
            background: '#0d0d0d',
            padding: 24,
            borderRadius: 18,
            border: '1px solid #1c1c1c'
          }}
        >
          <div
            style={{
              fontSize: 14,
              opacity: 0.7
            }}
          >
            Estimated 1RM
          </div>

          <div
            style={{
              fontSize: 48,
              fontWeight: 700,
              marginTop: 10
            }}
          >
            {e1rm.toFixed(1)} {unit}
          </div>
        </div>
      </Card>

      <Card title="Goal Mode">
        <label>Target e1RM</label>

        <input
          type="number"
          value={target}
          onChange={(e) =>
            setTarget(Number(e.target.value))
          }
        />

        <table style={{ marginTop: 20 }}>
          <thead>
            <tr>
              <th align="left">Weight</th>
              <th align="left">Reps Needed</th>
            </tr>
          </thead>

          <tbody>
            {combinations.map((combo) => (
              <tr key={combo.weight}>
                <td>{combo.weight}{unit}</td>
                <td>{combo.reps}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      <Card title="Plate Calculator">
        <div
          style={{
            fontSize: 18,
            fontWeight: 600,
            marginBottom: 16
          }}
        >
          Plates Per Side
        </div>

        {plateBreakdown.map((plate) => (
          <div
            key={plate}
            style={{
              padding: '10px 0',
              borderBottom: '1px solid #1f1f1f'
            }}
          >
            {plate}
          </div>
        ))}
      </Card>
    </main>
  );
}
