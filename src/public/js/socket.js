const socket = io();

socket.on('nuevoServicio', (servicio) => {
    console.log("¡Llegó un servicio nuevo en tiempo real!", servicio);
    
   
    const lista = document.getElementById('services-list');
    
    
    const tarjeta = document.createElement('div');
    tarjeta.className = 'card';
    
   
    tarjeta.innerHTML = `
        <h3>${servicio.name}</h3>
        <p><strong>Descripción:</strong> ${servicio.description}</p>
        <p><strong>Categoría:</strong> ${servicio.category}</p>
        <p><strong>Duración:</strong> ${servicio.duration} minutos</p>
        <p><strong>Precio:</strong> $${servicio.price}</p>
        <p><strong>Disponibilidad:</strong> <span style="color: green;">Disponible</span></p>
    `;
    
    
    lista.appendChild(tarjeta);
});