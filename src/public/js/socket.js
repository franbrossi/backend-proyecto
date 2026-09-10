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

// --- EVENTOS DE SERVICIOS ---

//  cuando se borra un servicio
socket.on('servicioEliminado', (id) => {
    const tarjeta = document.getElementById(`service-${id}`);
    if (tarjeta) tarjeta.remove(); // Hace desaparecer la tarjeta de la pantalla
});

// actualizacion de un servicio
socket.on('servicioActualizado', () => {
    window.location.reload();
});

// --- EVENTOS DE RESERVAS ---

//  nueva reserva
socket.on('nuevaReserva', () => {
    window.location.reload();
});

//  reserva borrada
socket.on('reservaEliminada', (id) => {
    const tarjeta = document.getElementById(`booking-${id}`);
    if (tarjeta) tarjeta.remove();
});

//  reserva actualizada
socket.on('reservaActualizada', () => {
    window.location.reload();
});