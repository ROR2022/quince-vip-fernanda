import React from 'react'
import GuestDetails from '@/components/sections/GuestsManagement/components/GuestDetails';
import ErrorDisplay from '@/components/sections/GuestsManagement/components/ErrorDisplay';

/**
 * 
 * Esta ruta debera aceptar como parametro el id 
 * del invitado que se desea ver.
 * Consultar la API para obtener los detalles del invitado.
 * y renderizar la información en la página.
 */

const page = async ({params}: {params: {id: string}}) => {
  try {
    const {id} = await params;
    
    // Validar que el ID sea válido (formato básico)
    if (!id || id.trim() === '' || id === 'undefined' || id === 'null') {
        console.error('❌ ID de invitado inválido:', id);
      return <ErrorDisplay type="invalid-id" guestId={id} />;
    }

    // Realizar la consulta a la API
    const response = await fetch(`${process.env.API_URL}/guests/${id}`, {
      // Agregar headers y configuración adicional
      headers: {
        'Content-Type': 'application/json',
      },
      // Cache para mejorar performance
      next: { revalidate: 60 } // Revalidar cada 60 segundos
    });

    // Manejar errores de red/servidor
    if (!response.ok) {
      if (response.status === 404) {
        console.error('❌ Invitado no encontrado:', id);
        return <ErrorDisplay type="not-found" guestId={id} />;
      } else if (response.status >= 500) {
        console.error('❌ Error en el servidor:', response.statusText);
        return <ErrorDisplay 
          type="server" 
          message={`Error ${response.status}: ${response.statusText}`}
          guestId={id}
        />;
      } else {
        console.error('❌ Error desconocido:', response.statusText);
        return <ErrorDisplay 
          type="unknown" 
          message={`Error ${response.status}: ${response.statusText}`}
          guestId={id}
        />;
      }
    }

    const guest = await response.json();
    const {data, success, error} = guest;

    // Manejar respuesta de API con error
    if (!success) {
        console.error('❌ Error en la respuesta de la API:', error);
      return <ErrorDisplay 
        type="unknown" 
        message={error || 'Error en la respuesta de la API'}
        guestId={id}
      />;
    }

    // Verificar que existan los datos del invitado
    if (!data) {
        console.error('❌ Datos del invitado no encontrados:', id);
      return <ErrorDisplay type="not-found" guestId={id} />;
    }

    // Renderizar el componente exitoso
    console.log('✅ Datos del invitado cargados:', data);
    return <GuestDetails dataGuest={data} />;

  } catch (error) {
    // Manejar errores de red u otros errores inesperados
    console.error('Error loading guest details:', error);
    
    return <ErrorDisplay 
      type="network" 
      message={error instanceof Error ? error.message : 'Error desconocido'}
      guestId={params?.id}
    />;
  }
}

export default page