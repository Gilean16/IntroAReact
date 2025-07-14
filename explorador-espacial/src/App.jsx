import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Rocket, Fuel, Globe, MapPin, Star, Trash2, Camera, Save } from 'lucide-react';

// Estilos CSS
const styles = {
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
    padding: '24px',
    fontFamily: 'Arial, sans-serif'
  },
  maxWidth: {
    maxWidth: '1200px',
    margin: '0 auto'
  },
  header: {
    textAlign: 'center',
    marginBottom: '32px'
  },
  title: {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    color: 'white',
    marginBottom: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '12px'
  },
  subtitle: {
    color: '#d1d5db',
    fontSize: '1.1rem'
  },
  mainPanel: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: '12px',
    padding: '24px',
    marginBottom: '24px',
    border: '1px solid #3b82f6'
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '24px',
    marginBottom: '24px'
  },
  card: {
    borderRadius: '12px',
    padding: '16px',
    border: '1px solid'
  },
  cardBlue: {
    backgroundColor: 'rgba(30, 58, 138, 0.5)',
    borderColor: '#60a5fa'
  },
  cardYellow: {
    backgroundColor: 'rgba(146, 64, 14, 0.5)',
    borderColor: '#fbbf24'
  },
  cardPurple: {
    backgroundColor: 'rgba(88, 28, 135, 0.5)',
    borderColor: '#a855f7'
  },
  cardHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginBottom: '8px'
  },
  cardTitle: {
    fontWeight: '600',
    fontSize: '1rem'
  },
  cardValue: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: 'white'
  },
  fuelBar: {
    width: '100%',
    backgroundColor: '#374151',
    borderRadius: '9999px',
    height: '8px',
    marginTop: '8px',
    overflow: 'hidden'
  },
  fuelBarFill: {
    height: '100%',
    borderRadius: '9999px',
    transition: 'all 0.3s ease'
  },
  controlsContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '16px',
    justifyContent: 'center'
  },
  button: {
    padding: '12px 24px',
    borderRadius: '8px',
    fontWeight: '600',
    border: 'none',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    fontSize: '1rem'
  },
  buttonGreen: {
    backgroundColor: '#059669',
    color: 'white'
  },
  buttonGreenHover: {
    backgroundColor: '#047857'
  },
  buttonBlue: {
    backgroundColor: '#2563eb',
    color: 'white'
  },
  buttonBlueHover: {
    backgroundColor: '#1d4ed8'
  },
  buttonYellow: {
    backgroundColor: '#d97706',
    color: 'white'
  },
  buttonYellowHover: {
    backgroundColor: '#b45309'
  },
  buttonPurple: {
    backgroundColor: '#7c3aed',
    color: 'white'
  },
  buttonPurpleHover: {
    backgroundColor: '#6d28d9'
  },
  buttonDisabled: {
    backgroundColor: '#4b5563',
    cursor: 'not-allowed'
  },
  sectionPanel: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: '12px',
    padding: '24px',
    marginBottom: '24px',
    border: '1px solid #a855f7'
  },
  sectionTitle: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: 'white',
    marginBottom: '16px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  },
  planetsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '16px'
  },
  planetCard: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(88, 28, 135, 0.5)',
    padding: '12px',
    borderRadius: '8px',
    border: '1px solid #a855f7'
  },
  planetInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  },
  planetName: {
    color: '#e9d5ff'
  },
  deleteButton: {
    color: '#f87171',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: '4px',
    borderRadius: '4px',
    transition: 'color 0.3s ease'
  },
  deleteButtonHover: {
    color: '#fca5a5'
  },
  emptyState: {
    color: '#9ca3af',
    textAlign: 'center',
    padding: '32px 0',
    fontSize: '1.1rem'
  },
  formContainer: {
    marginBottom: '24px'
  },
  formGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '16px',
    marginBottom: '16px'
  },
  input: {
    backgroundColor: '#1f2937',
    border: '1px solid #4b5563',
    borderRadius: '8px',
    padding: '12px 16px',
    color: 'white',
    fontSize: '1rem',
    outline: 'none',
    transition: 'border-color 0.3s ease'
  },
  inputFocus: {
    borderColor: '#10b981'
  },
  textarea: {
    backgroundColor: '#1f2937',
    border: '1px solid #4b5563',
    borderRadius: '8px',
    padding: '12px 16px',
    color: 'white',
    fontSize: '1rem',
    outline: 'none',
    transition: 'border-color 0.3s ease',
    width: '100%',
    resize: 'vertical',
    minHeight: '80px'
  },
  bitacoraGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '16px'
  },
  bitacoraCard: {
    backgroundColor: '#1f2937',
    borderRadius: '8px',
    padding: '16px',
    border: '1px solid #4b5563'
  },
  bitacoraHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '8px'
  },
  bitacoraTitle: {
    fontSize: '1.125rem',
    fontWeight: '600',
    color: 'white'
  },
  bitacoraDesc: {
    color: '#d1d5db',
    marginBottom: '8px'
  },
  bitacoraDate: {
    fontSize: '0.875rem',
    color: '#9ca3af'
  },
  bitacoraImage: {
    width: '100%',
    height: '128px',
    objectFit: 'cover',
    borderRadius: '8px',
    marginTop: '8px'
  }
};

// Componente Planeta
function Planeta({ nombre, onRemove, index }) {
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    console.log(`¡El planeta ${nombre} ha aparecido!`);
    
    return () => {
      console.log(`¡El planeta ${nombre} ha desaparecido!`);
    };
  }, [nombre]);

  return (
    <div style={styles.planetCard}>
      <div style={styles.planetInfo}>
        <Globe size={20} color="#e9d5ff" />
        <span style={styles.planetName}>{nombre}</span>
      </div>
      <button 
        onClick={() => onRemove(index)}
        style={{
          ...styles.deleteButton,
          ...(isHovered ? styles.deleteButtonHover : {})
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Trash2 size={16} />
      </button>
    </div>
  );
}

// Componente principal
function App() {
  // Estado principal
  const [distancia, setDistancia] = useState(0);
  const [combustible, setCombustible] = useState(100);
  const [estadoNave, setEstadoNave] = useState("En órbita");
  const [planetasVisitados, setPlanetasVisitados] = useState([]);
  
  // Estado para bitácora de planetas
  const [bitacoraPlanetas, setBitacoraPlanetas] = useState([]);
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [imagen, setImagen] = useState(null);
  const inputImagenRef = useRef(null);
  
  // Estado para mostrar/ocultar bitácora
  const [mostrarBitacora, setMostrarBitacora] = useState(false);

  // Estados para hover de botones
  const [hoveredButton, setHoveredButton] = useState(null);

  // Efecto de montaje y simulación de vuelo
  useEffect(() => {
    console.log("¡El panel de control está listo!");
    
    const intervalo = setInterval(() => {
      setCombustible(prev => {
        if (prev <= 0) return 0;
        return prev - 1;
      });
      setDistancia(prev => prev + 10);
    }, 1000);

    return () => {
      clearInterval(intervalo);
      console.log("El panel de control se ha apagado.");
    };
  }, []);

  // Efecto para actualización de combustible
  useEffect(() => {
    console.log("¡Combustible actualizado!");
  }, [combustible]);

  // Cargar bitácora desde memoria al montar
  useEffect(() => {
    const bitacoraGuardada = JSON.parse(localStorage.getItem('bitacoraPlanetas') || '[]');
    setBitacoraPlanetas(bitacoraGuardada);
  }, []);

  // Guardar bitácora en memoria cuando cambie
  useEffect(() => {
    localStorage.setItem('bitacoraPlanetas', JSON.stringify(bitacoraPlanetas));
  }, [bitacoraPlanetas]);

  // Mensaje de estado memoizado
  const mensajeEstado = useMemo(() => {
    return `Estado: ${estadoNave}`;
  }, [estadoNave]);

  // Función para aterrizar
  const aterrizar = () => {
    const nombresPlanetas = ['Kepler-442b', 'Proxima b', 'TRAPPIST-1e', 'K2-18b', 'TOI-715b', 'Gliese 667Cc'];
    const planetaAleatorio = nombresPlanetas[Math.floor(Math.random() * nombresPlanetas.length)];
    
    setEstadoNave("Aterrizando");
    setPlanetasVisitados(prev => [...prev, planetaAleatorio]);
    
    setTimeout(() => {
      setEstadoNave("En superficie");
      setCombustible(prev => Math.max(0, prev - 10));
    }, 2000);
  };

  // Función para despegar
  const despegar = () => {
    setEstadoNave("Despegando");
    setCombustible(prev => Math.max(0, prev - 15));
    
    setTimeout(() => {
      setEstadoNave("En órbita");
    }, 2000);
  };

  // Función para repostar
  const repostar = () => {
    setCombustible(100);
    setEstadoNave("Repostando");
    
    setTimeout(() => {
      setEstadoNave("En órbita");
    }, 1500);
  };

  // Función para eliminar planeta visitado
  const eliminarPlaneta = (index) => {
    setPlanetasVisitados(prev => prev.filter((_, i) => i !== index));
  };

  // Función para agregar planeta a bitácora
  const agregarPlanetaBitacora = () => {
    if (!nombre || !descripcion) return;
    
    const nuevoPlaneta = {
      nombre,
      descripcion,
      imagen: imagen ? URL.createObjectURL(imagen) : null,
      fechaDescubrimiento: new Date().toLocaleDateString()
    };

    setBitacoraPlanetas(prev => [...prev, nuevoPlaneta]);
    setNombre('');
    setDescripcion('');
    setImagen(null);
    
    if (inputImagenRef.current) {
      inputImagenRef.current.value = '';
    }
  };

  // Función para eliminar planeta de bitácora
  const eliminarPlanetaBitacora = (index) => {
    setBitacoraPlanetas(prev => prev.filter((_, i) => i !== index));
  };

  // Función para obtener estilo de botón
  const getButtonStyle = (baseStyle, hoverStyle, buttonName, disabled = false) => {
    if (disabled) return { ...styles.button, ...styles.buttonDisabled };
    return {
      ...styles.button,
      ...baseStyle,
      ...(hoveredButton === buttonName ? hoverStyle : {})
    };
  };

  // Función para obtener color y estilo del combustible
  const getFuelStyle = () => {
    if (combustible > 50) return { color: '#10b981', backgroundColor: '#10b981' };
    if (combustible > 20) return { color: '#f59e0b', backgroundColor: '#f59e0b' };
    return { color: '#ef4444', backgroundColor: '#ef4444' };
  };

  const fuelStyle = getFuelStyle();

  return (
    <div style={styles.container}>
      <div style={styles.maxWidth}>
        {/* Header */}
        <div style={styles.header}>
          <h1 style={styles.title}>
            <Rocket size={40} color="#60a5fa" />
            Panel de Control - Explorador Espacial
            <Star size={40} color="#fbbf24" />
          </h1>
          <p style={styles.subtitle}>Comandante, el sistema está operativo</p>
        </div>

        {/* Panel Principal */}
        <div style={styles.mainPanel}>
          <div style={styles.grid}>
            {/* Distancia */}
            <div style={{ ...styles.card, ...styles.cardBlue }}>
              <div style={styles.cardHeader}>
                <MapPin size={20} color="#60a5fa" />
                <h3 style={{ ...styles.cardTitle, color: '#60a5fa' }}>Distancia</h3>
              </div>
              <p style={styles.cardValue}>{distancia.toLocaleString()} km</p>
            </div>

            {/* Combustible */}
            <div style={{ ...styles.card, ...styles.cardYellow }}>
              <div style={styles.cardHeader}>
                <Fuel size={20} color="#fbbf24" />
                <h3 style={{ ...styles.cardTitle, color: '#fbbf24' }}>Combustible</h3>
              </div>
              <p style={{ ...styles.cardValue, color: fuelStyle.color }}>{combustible}%</p>
              <div style={styles.fuelBar}>
                <div 
                  style={{
                    ...styles.fuelBarFill,
                    width: `${combustible}%`,
                    backgroundColor: fuelStyle.backgroundColor
                  }}
                />
              </div>
            </div>

            {/* Estado */}
            <div style={{ ...styles.card, ...styles.cardPurple }}>
              <div style={styles.cardHeader}>
                <Globe size={20} color="#a855f7" />
                <h3 style={{ ...styles.cardTitle, color: '#a855f7' }}>Estado</h3>
              </div>
              <p style={styles.cardValue}>{mensajeEstado.replace('Estado: ', '')}</p>
            </div>
          </div>

          {/* Controles */}
          <div style={styles.controlsContainer}>
            <button 
              onClick={aterrizar}
              disabled={estadoNave === "Aterrizando" || combustible < 10}
              style={getButtonStyle(styles.buttonGreen, styles.buttonGreenHover, 'aterrizar', estadoNave === "Aterrizando" || combustible < 10)}
              onMouseEnter={() => setHoveredButton('aterrizar')}
              onMouseLeave={() => setHoveredButton(null)}
            >
              Aterrizar
            </button>
            <button 
              onClick={despegar}
              disabled={estadoNave !== "En superficie" || combustible < 15}
              style={getButtonStyle(styles.buttonBlue, styles.buttonBlueHover, 'despegar', estadoNave !== "En superficie" || combustible < 15)}
              onMouseEnter={() => setHoveredButton('despegar')}
              onMouseLeave={() => setHoveredButton(null)}
            >
              Despegar
            </button>
            <button 
              onClick={repostar}
              disabled={combustible === 100}
              style={getButtonStyle(styles.buttonYellow, styles.buttonYellowHover, 'repostar', combustible === 100)}
              onMouseEnter={() => setHoveredButton('repostar')}
              onMouseLeave={() => setHoveredButton(null)}
            >
              Repostar
            </button>
            <button 
              onClick={() => setMostrarBitacora(!mostrarBitacora)}
              style={getButtonStyle(styles.buttonPurple, styles.buttonPurpleHover, 'bitacora')}
              onMouseEnter={() => setHoveredButton('bitacora')}
              onMouseLeave={() => setHoveredButton(null)}
            >
              {mostrarBitacora ? 'Ocultar' : 'Mostrar'} Bitácora
            </button>
          </div>
        </div>

        {/* Planetas Visitados */}
        <div style={styles.sectionPanel}>
          <h2 style={styles.sectionTitle}>
            <Globe size={24} color="#a855f7" />
            Planetas Visitados ({planetasVisitados.length})
          </h2>
          
          {planetasVisitados.length === 0 ? (
            <p style={styles.emptyState}>No has visitado ningún planeta aún. ¡Comienza tu exploración!</p>
          ) : (
            <div style={styles.planetsGrid}>
              {planetasVisitados.map((planeta, index) => (
                <Planeta 
                  key={index} 
                  nombre={planeta} 
                  onRemove={eliminarPlaneta}
                  index={index}
                />
              ))}
            </div>
          )}
        </div>

        {/* Bitácora de Planetas */}
        {mostrarBitacora && (
          <div style={{ ...styles.sectionPanel, borderColor: '#10b981' }}>
            <h2 style={styles.sectionTitle}>
              <Camera size={24} color="#10b981" />
              Bitácora de Exploración
            </h2>

            {/* Formulario */}
            <div style={styles.formContainer}>
              <div style={styles.formGrid}>
                <input
                  type="text"
                  placeholder="Nombre del planeta"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  style={styles.input}
                />
                <input
                  type="file"
                  onChange={(e) => setImagen(e.target.files[0])}
                  ref={inputImagenRef}
                  accept="image/*"
                  style={styles.input}
                />
              </div>
              <textarea
                placeholder="Descripción del planeta"
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
                style={styles.textarea}
              />
              <button 
                onClick={agregarPlanetaBitacora}
                style={getButtonStyle(styles.buttonGreen, styles.buttonGreenHover, 'guardar')}
                onMouseEnter={() => setHoveredButton('guardar')}
                onMouseLeave={() => setHoveredButton(null)}
              >
                <Save size={16} style={{ marginRight: '8px' }} />
                Guardar Planeta
              </button>
            </div>

            {/* Lista de Planetas */}
            <div>
              <h3 style={{ ...styles.sectionTitle, fontSize: '1.25rem' }}>
                Planetas Registrados ({bitacoraPlanetas.length})
              </h3>
              {bitacoraPlanetas.length === 0 ? (
                <p style={styles.emptyState}>No hay planetas registrados en la bitácora.</p>
              ) : (
                <div style={styles.bitacoraGrid}>
                  {bitacoraPlanetas.map((planeta, index) => (
                    <div key={index} style={styles.bitacoraCard}>
                      <div style={styles.bitacoraHeader}>
                        <h4 style={styles.bitacoraTitle}>{planeta.nombre}</h4>
                        <button 
                          onClick={() => eliminarPlanetaBitacora(index)}
                          style={styles.deleteButton}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                      <p style={styles.bitacoraDesc}>{planeta.descripcion}</p>
                      <p style={styles.bitacoraDate}>Descubierto: {planeta.fechaDescubrimiento}</p>
                      {planeta.imagen && (
                        <img 
                          src={planeta.imagen} 
                          alt={planeta.nombre}
                          style={styles.bitacoraImage}
                        />
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;