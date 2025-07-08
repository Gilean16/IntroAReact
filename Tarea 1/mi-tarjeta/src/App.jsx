import React, { useState } from 'react';

function Tarjeta() {
  const nombre = "Ana Pérez";
  const profesion = "Desarrolladora Web";
  const mensaje = "¡Bienvenido a mi tarjeta de presentación!";

  return (
    <div style={{ border: '1px solid #ccc', padding: '20px', width: '300px', textAlign: 'center', margin: '20px auto' }}>
      <h2>{nombre}</h2>
      <h4>{profesion}</h4>
      <p>{mensaje}</p>
    </div>
  );
}

function App() {
  return (
    <div>
      <h1>Tarjeta de Presentación</h1>
      <Tarjeta />
    </div>
  );
}

export default App;