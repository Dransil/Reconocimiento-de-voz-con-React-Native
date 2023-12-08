import React from 'react';
import './styles.css';
const SpeechRecognitionComponent = () => {
  const startRecognition = () => {
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
      const transcriptListElement = document.getElementById('transcriptList');

      recognition.continuous = false;
      recognition.lang = 'es-ES';

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        const listItem = document.createElement('li');
        listItem.textContent = 'Texto reconocido: ' + transcript;
        transcriptListElement.appendChild(listItem);

        if (transcript.toLowerCase().includes('fuego')) {
          habla('Manten la calma y busca una alarma de incendios, llama a emergencias inmediatamente, busca un extintor y evacua el área inmediatamente, intenta evitar el humo y sal del lugar');
        }
        if (transcript.toLowerCase().includes('terremoto')) {
          habla('Manten la calma y alejate de estantes, vitrinas o alguna repisa que pueda hacer que te caigan objetos, si estás en casa ponte debajo de un mueble, si estás fuera alejate de los edificios');
        }
        if (transcript.toLowerCase().includes('inundación')) {
          habla('Intenta desconectar o cortar la electricidad y busca terreno alto, si es un edificio sube al último piso y espera ayuda de las autoridades');
        }
        if (transcript.toLowerCase().includes('secuestro')) {
          alert('Estamos proporcionando tu ubicación a las autoridades, mantén la calma y colabora con los secuestradores ');
          localizacion();
        }
      };

      recognition.onerror = (event) => {
        console.error('Error en el reconocimiento:', event.error);
      };

      recognition.start();
      console.log('Habla...');
    } else {
      console.error('Tu navegador no soporta la API de reconocimiento de voz.');
    }
  };

  const habla = (text) => {
    const voz = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(voz);
  };

  const localizacion = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          alert(`Ubicación actual: Latitud: ${latitude}, Longitud: ${longitude}`);
        },
        (error) => {
          console.error('Error al obtener la ubicación:', error.message);
        }
      );
    } else {
      console.error('Tu navegador no soporta la API de geolocalización.');
    }
  };
  return (
    <div>
      <h1>Botón de emergencia</h1>
      <h2>Haz clic en el botón y empieza a hablar</h2>
      <button onClick={startRecognition}>Iniciar reconocimiento de voz</button>
      <ul id="transcriptList"></ul>
    </div>
  );
};

export default SpeechRecognitionComponent;
