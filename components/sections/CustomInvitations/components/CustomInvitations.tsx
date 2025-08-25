// ================================================================
// COMPONENTE PRINCIPAL
// ================================================================

"use client"

import { useRef } from "react";
import { useInvitationForm } from "../hooks/use-invitation-form-hook";
import { DownloadService } from "../services/download.service";
import { AuthPanel } from "./auth-panel-component";
import { InvitationForm } from "./invitation-form-component";
import { ActionButtons } from "./action-buttons-component";
import { InvitationPreview } from "./invitation-preview-component";
import { EVENT_INFO } from "../constants/invitation.constants";


const CustomInvitations: React.FC = () => {
  const invitationRef = useRef<HTMLDivElement>(null);
  
  const {
    formData,
    authState,
    uiState,
    updateFormData,
    updateAuthState,
    updateUIState,
    handleAuthentication,
  } = useInvitationForm();

  const handleDownload = async () => {
    if (!formData.guestName || !formData.personalMessage || !formData.numberOfGuests) {
      alert("Por favor completa todos los campos obligatorios antes de descargar");
      return;
    }

    if (!uiState.showPreview) {
      updateUIState({ showPreview: true });
      await new Promise(resolve => setTimeout(resolve, 500));
    }

    if (!invitationRef.current) return;

    await DownloadService.downloadInvitation(
      invitationRef.current,
      formData,
      {
        onStart: () => updateUIState({ isDownloading: true, downloadError: "" }),
        onSuccess: () => updateUIState({ isDownloading: false }),
        onError: (error: string) => updateUIState({ isDownloading: false, downloadError: error })
      }
    );
  };

  if(!authState.isAuthenticated){
    return (
      <div
      style={{
        position: "relative",
        minHeight: "80px",
        background: "linear-gradient(135deg, var(--color-marfil) 0%, var(--color-marfil-suave) 100%)"
      }}
      className="my-4 border border-dorado/20 rounded-2xl"
      >
      <div 
      style={{
        zIndex: 8000,
      }}
      className="absolute top-4 right-4 z-50">
        <div className="flex justify-center items-center">
        <h4 className="text-lg font-semibold text-red-400 text-center" >Invitaciones Personalizadas VIP</h4>
        </div>
        {/* Panel de autenticación VIP */}
        <AuthPanel
          authState={authState}
          onUpdateAuth={updateAuthState}
          onAuthenticate={handleAuthentication}
        />
        
      </div>
      </div>
    )
  }


  return (
    <section 
    
    className="py-8 px-4 relative min-h-screen overflow-hidden bg-gradient-to-br from-marfil via-marfil-suave to-white">
      {/* Elementos decorativos VIP */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-40 h-40 rounded-full bg-verde-esmeralda"></div>
        <div className="absolute bottom-20 right-20 w-32 h-32 rounded-full bg-rojo-vino"></div>
        <div className="absolute top-1/2 left-1/3 w-24 h-24 rounded-full bg-dorado"></div>
        <div className="absolute top-1/4 right-1/4 w-16 h-16 rounded-full bg-oro-antiguo"></div>
      </div>

      <div className="max-w-4xl mx-auto mt-32 text-center relative z-10">
        {/* <h1 className="bg-gradient-to-r from-green-700 via-green-500 to-green-700 bg-clip-text text-transparent text-4xl md:text-5xl font-bold mb-6 drop-shadow-sm">
          Invitaciones Personalizadas Quinceañera
        </h1>
        <p className="text-lg text-green-700 mb-8 max-w-2xl mx-auto">
          Crea invitaciones mágicas y personalizadas para la fiesta de XV años, con mensajes especiales y envío directo por WhatsApp.
        </p>
        
        {!authState.isAuthenticated && (
          <div className="mt-12 p-6 bg-white/90 rounded-2xl border-2 border-green-200 shadow-lg max-w-xl mx-auto relative z-20">
            <div className="text-green-500 font-semibold mb-4">🔐 Acceso Restringido</div>
            <p className="text-gray-600 text-sm">Esta herramienta es exclusiva para la creación de invitaciones personalizadas. Accede como administrador para comenzar.</p>
            <div className="mt-4 p-3 bg-green-50 rounded-lg">
              <p className="text-xs text-green-600">💡 <strong>Tip:</strong> Haz clic en el ícono ⚙️ en la esquina superior derecha</p>
            </div>
          </div>
        )} */}

        {authState.isAuthenticated && (
          <div className="max-w-4xl mx-auto mt-12 space-y-8 relative z-10">
            {/* Formulario principal VIP */}
            <div className="bg-gradient-to-br from-marfil to-white rounded-2xl p-8 border-2 border-dorado/30 shadow-2xl relative z-20">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-r from-verde-esmeralda to-rojo-vino rounded-full flex items-center justify-center">
                  <span className="text-white text-lg">📝</span>
                </div>
                <h2 className="text-2xl font-bold text-verde-oscuro">
                  Crear Invitación Personalizada VIP
                </h2>
              </div>
              
              <InvitationForm
                formData={formData}
                onUpdateFormData={updateFormData}
              />

              {/* Mensaje de error de descarga VIP */}
              {uiState.downloadError && (
                <div className="mt-4 p-4 bg-gradient-to-r from-rojo-vino/10 to-rojo-cardenal/10 border-2 border-rojo-vino/30 rounded-xl">
                  <p className="text-sm text-rojo-vino font-medium">❌ Error: {uiState.downloadError}</p>
                </div>
              )}

              <ActionButtons
                formData={formData}
                uiState={uiState}
                onTogglePreview={() => updateUIState({ showPreview: !uiState.showPreview })}
                onDownload={handleDownload}
              />

              {/* Instrucciones de descarga VIP */}
              <div className="mt-6 p-6 bg-gradient-to-r from-dorado/10 to-oro-antiguo/10 border-2 border-dorado/30 rounded-xl">
                <h4 className="text-sm font-semibold text-verde-oscuro mb-3 flex items-center gap-2">
                  <span className="w-6 h-6 bg-dorado rounded-full flex items-center justify-center text-white text-xs">💡</span>
                  Consejos VIP para la descarga:
                </h4>
                <ul className="text-xs text-verde-bosque space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-dorado">•</span>
                    <span>La imagen se descargará en formato PNG de alta calidad premium</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-dorado">•</span>
                    <span>Asegúrate de completar todos los campos obligatorios</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-dorado">•</span>
                    <span>La descarga puede tardar unos segundos en procesarse</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-dorado">•</span>
                    <span>El archivo se guardará con el nombre del invitado</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Vista previa */}
            {uiState.showPreview && formData.guestName && formData.personalMessage && (
              <InvitationPreview ref={invitationRef} formData={formData} />
            )}

            {/* Información adicional VIP */}
            <div className="bg-gradient-to-r from-marfil to-marfil-suave rounded-2xl p-8 border-2 border-verde-esmeralda/20 shadow-xl relative z-20">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-r from-dorado to-oro-antiguo rounded-full flex items-center justify-center">
                  <span className="text-verde-oscuro text-lg">ℹ️</span>
                </div>
                <h3 className="text-lg font-bold text-verde-oscuro">
                  Información del Evento VIP
                </h3>
              </div>
              <div className="grid md:grid-cols-2 gap-6 text-sm">
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-verde-esmeralda/10 rounded-lg border border-verde-esmeralda/20">
                    <span className="w-8 h-8 bg-verde-esmeralda rounded-full flex items-center justify-center text-white text-xs">📅</span>
                    <div>
                      <p className="font-semibold text-verde-oscuro">Fecha:</p>
                      <p className="text-verde-bosque">{EVENT_INFO.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-rojo-vino/10 rounded-lg border border-rojo-vino/20">
                    <span className="w-8 h-8 bg-rojo-vino rounded-full flex items-center justify-center text-white text-xs">🕖</span>
                    <div>
                      <p className="font-semibold text-verde-oscuro">Hora:</p>
                      <p className="text-verde-bosque">{EVENT_INFO.time}</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-dorado/10 rounded-lg border border-dorado/20">
                    <span className="w-8 h-8 bg-dorado rounded-full flex items-center justify-center text-verde-oscuro text-xs">📍</span>
                    <div>
                      <p className="font-semibold text-verde-oscuro">Lugar:</p>
                      <p className="text-verde-bosque">{EVENT_INFO.venue}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-oro-antiguo/10 rounded-lg border border-oro-antiguo/20">
                    <span className="w-8 h-8 bg-oro-antiguo rounded-full flex items-center justify-center text-verde-oscuro text-xs">👗</span>
                    <div>
                      <p className="font-semibold text-verde-oscuro">Código de vestimenta:</p>
                      <p className="text-verde-bosque">{EVENT_INFO.dressCode}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default CustomInvitations;