import React, { useState, useEffect, useMemo } from 'react';

function App() {
  const [tareas, setTareas] = useState([]);
  const [nuevaTarea, setNuevaTarea] = useState('');
  const [duracion, setDuracion] = useState('');

  // Cálculo de tiempo total optimizado con useMemo
  const calcularTiempoTotal = useMemo(() => {
    console.log("Calculando tiempo total...");
    return tareas.reduce((total, tarea) => total + tarea.duracion, 0);
  }, [tareas]); // Solo se recalcula cuando cambian las tareas

  // Efecto secundario: Actualizar el título del documento cada vez que cambia el total
  useEffect(() => {
    document.title = `Total: ${calcularTiempoTotal} minutos`;
  }, [calcularTiempoTotal]);  // Se ejecuta cada vez que cambia el tiempo total

  // Función para agregar una nueva tarea
  const agregarTarea = () => {
    if (nuevaTarea.trim() && duracion && parseInt(duracion) > 0) {
      const nuevaTareaObj = {
        id: Date.now(), // Agregamos un ID único
        nombre: nuevaTarea.trim(),
        duracion: parseInt(duracion)
      };
      setTareas([...tareas, nuevaTareaObj]);
      setNuevaTarea('');
      setDuracion('');
    }
  };

  // Función para eliminar una tarea
  const eliminarTarea = (id) => {
    setTareas(tareas.filter(tarea => tarea.id !== id));
  };

  // Función para manejar el Enter en los inputs
  const manejarEnter = (e) => {
    if (e.key === 'Enter') {
      agregarTarea();
    }
  };

  return (
    <div style={{ 
      maxWidth: '600px', 
      margin: '20px auto', 
      padding: '20px',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h1 style={{ textAlign: 'center', color: '#333' }}>Contador de Tareas</h1>
      
      <div style={{ 
        display: 'flex', 
        gap: '10px', 
        marginBottom: '20px',
        flexWrap: 'wrap'
      }}>
        <input 
          type="text" 
          value={nuevaTarea} 
          onChange={(e) => setNuevaTarea(e.target.value)} 
          onKeyPress={manejarEnter}
          placeholder="Nombre de la tarea" 
          style={{
            flex: '1',
            padding: '8px',
            border: '1px solid #ddd',
            borderRadius: '4px',
            minWidth: '200px'
          }}
        />
        <input 
          type="number" 
          value={duracion} 
          onChange={(e) => setDuracion(e.target.value)} 
          onKeyPress={manejarEnter}
          placeholder="Duración en minutos" 
          min="1"
          style={{
            width: '150px',
            padding: '8px',
            border: '1px solid #ddd',
            borderRadius: '4px'
          }}
        />
        <button 
          onClick={agregarTarea}
          style={{
            padding: '8px 16px',
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Agregar tarea
        </button>
      </div>

      <h2 style={{ color: '#333' }}>Tareas ({tareas.length})</h2>
      
      {tareas.length === 0 ? (
        <p style={{ 
          textAlign: 'center', 
          color: '#666',
          fontStyle: 'italic',
          padding: '20px'
        }}>
          No hay tareas registradas. ¡Agrega tu primera tarea!
        </p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {tareas.map((tarea) => (
            <li 
              key={tarea.id} 
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '10px',
                margin: '5px 0',
                backgroundColor: '#f5f5f5',
                borderRadius: '4px',
                border: '1px solid #ddd'
              }}
            >
              <span>
                <strong>{tarea.nombre}</strong>: {tarea.duracion} minutos
              </span>
              <button 
                onClick={() => eliminarTarea(tarea.id)}
                style={{
                  padding: '4px 8px',
                  backgroundColor: '#f44336',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '12px'
                }}
              >
                Eliminar
              </button>
            </li>
          ))}
        </ul>
      )}

      <div style={{
        backgroundColor: '#e3f2fd',
        padding: '15px',
        borderRadius: '8px',
        marginTop: '20px',
        textAlign: 'center'
      }}>
        <h3 style={{ 
          margin: 0, 
          color: '#1976d2',
          fontSize: '1.2em'
        }}>
          Total de tiempo: {calcularTiempoTotal} minutos
        </h3>
        <p style={{ 
          margin: '5px 0 0 0', 
          color: '#666',
          fontSize: '0.9em'
        }}>
          Equivale a {Math.floor(calcularTiempoTotal / 60)} horas y {calcularTiempoTotal % 60} minutos
        </p>
      </div>
    </div>
  );
}

export default App;
