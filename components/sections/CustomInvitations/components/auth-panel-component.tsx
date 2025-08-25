// ================================================================
// 📁 components/AuthPanel.tsx
// ================================================================

import React from 'react';
import { AuthPanelProps } from '../types/invitation.types';
import { UI_MESSAGES } from '../constants/invitation.constants';

/**
 * Componente para el panel de autenticación de administrador
 */
export const AuthPanel: React.FC<AuthPanelProps> = ({
  authState,
  onUpdateAuth,
  onAuthenticate,
}) => {
  const { isAuthenticated, showAuthPopover, password, showPassword, authError } = authState;

  // Debug log
  //console.log('AuthPanel render - showAuthPopover:', showAuthPopover);

  // Si está autenticado, mostrar badge de admin VIP
  if (isAuthenticated) {
    return (
      <div className="flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-verde-esmeralda to-rojo-vino rounded-full shadow-xl border border-dorado/30">
        <div className="w-3 h-3 bg-dorado rounded-full animate-pulse shadow-lg"></div>
        <span className="text-white text-sm font-semibold">
          {UI_MESSAGES.ADMIN_AUTHENTICATED} VIP
        </span>
        <div className="w-6 h-6 bg-dorado rounded-full flex items-center justify-center">
          <span className="text-verde-oscuro text-xs">👑</span>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Botón de configuración - Fijo en esquina superior derecha */}
      <div 
        style={{
          position: 'fixed',
          bottom: '4rem',
          left: '1rem',
          zIndex: 999999,
        }}
        className=""
      >
        <button
          onClick={() => {
            //console.log('Admin button clicked, current showAuthPopover:', showAuthPopover);
            onUpdateAuth({ showAuthPopover: !showAuthPopover });
          }}
          className="p-3 bg-gradient-to-r from-dorado to-oro-antiguo hover:from-oro-antiguo hover:to-dorado rounded-full shadow-xl transition-all duration-300 hover:scale-110 border-2 border-verde-esmeralda/30"
          title="Panel de administración VIP"
          aria-label="Abrir panel de administración VIP"
        >
          <span role="img" aria-label="settings" className="text-verde-oscuro text-xl">
            ⚙️</span>
        </button>
      </div>

      {/* Modal de autenticación */}
      {showAuthPopover && (
        <div 
          style={{ 
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 2147483647,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          }}
        >
          {/* Overlay de fondo */}
          <div
            style={{ 
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'linear-gradient(135deg, rgba(13, 107, 75, 0.3), rgba(139, 28, 38, 0.3))',
              backdropFilter: 'blur(8px)',
            }}
            onClick={() => {
              //console.log('Overlay clicked, closing modal');
              onUpdateAuth({ showAuthPopover: false });
            }}
            aria-hidden="true"
          />

          {/* Contenido del Modal VIP */}
          <div 
            style={{ 
              position: 'relative',
              background: 'linear-gradient(135deg, var(--color-marfil), var(--color-marfil-suave))',
              borderRadius: '16px',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.4)',
              border: '3px solid',
              borderImage: 'linear-gradient(45deg, var(--color-dorado), var(--color-oro-antiguo), var(--color-dorado)) 1',
              padding: '32px',
              width: '100%',
              maxWidth: '32rem',
              margin: '0 16px',
              zIndex: 2147483647,
            }}
          >
            {/* Header del modal VIP */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ 
                  width: '40px', 
                  height: '40px',
                  background: 'linear-gradient(45deg, var(--color-verde-esmeralda), var(--color-rojo-vino))',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <span style={{ color: 'white', fontSize: '20px' }}>👑</span>
                </div>
                <h3 style={{ fontWeight: 'bold', color: 'var(--color-verde-oscuro)', fontSize: '24px', margin: 0 }}>
                  Panel VIP
                </h3>
              </div>
              <button
                onClick={() => {
                  //console.log('Close button clicked');
                  onUpdateAuth({ showAuthPopover: false });
                }}
                style={{ 
                  padding: '8px', 
                  background: 'linear-gradient(45deg, var(--color-rojo-vino), var(--color-rojo-cardenal))',
                  border: 'none',
                  borderRadius: '50%',
                  color: 'white',
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                  boxShadow: '0 4px 12px rgba(139, 28, 38, 0.3)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.1) rotate(90deg)';
                  e.currentTarget.style.boxShadow = '0 6px 20px rgba(139, 28, 38, 0.5)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1) rotate(0deg)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(139, 28, 38, 0.3)';
                }}
                aria-label="Cerrar panel VIP"
              >
                <span style={{ fontSize: '16px' }}>✖️</span>
              </button>
            </div>

            {/* Formulario de autenticación VIP */}
            <form onSubmit={onAuthenticate} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {/* Campo de contraseña VIP */}
              <div style={{ position: 'relative' }}>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => onUpdateAuth({ password: e.target.value })}
                  placeholder="Contraseña VIP"
                  style={{
                    width: '100%',
                    padding: '16px 50px 16px 16px',
                    border: authError ? '2px solid var(--color-rojo-vino)' : '2px solid var(--color-dorado)',
                    borderRadius: '12px',
                    fontSize: '16px',
                    color: 'var(--color-verde-oscuro)',
                    background: 'var(--color-marfil-suave)',
                    outline: 'none',
                    transition: 'all 0.3s',
                    fontWeight: '500'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = authError ? 'var(--color-rojo-cardenal)' : 'var(--color-verde-esmeralda)';
                    e.target.style.boxShadow = authError ? '0 0 0 3px rgba(139, 28, 38, 0.2)' : '0 0 0 3px rgba(13, 107, 75, 0.2)';
                    e.target.style.transform = 'scale(1.02)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = authError ? 'var(--color-rojo-vino)' : 'var(--color-dorado)';
                    e.target.style.boxShadow = 'none';
                    e.target.style.transform = 'scale(1)';
                  }}
                  required
                  autoComplete="current-password"
                  autoFocus
                />
                
                {/* Botón para mostrar/ocultar contraseña VIP */}
                <button
                  type="button"
                  onClick={() => onUpdateAuth({ showPassword: !showPassword })}
                  style={{
                    position: 'absolute',
                    right: '16px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    width: '32px',
                    height: '32px',
                    background: 'linear-gradient(45deg, var(--color-dorado), var(--color-oro-antiguo))',
                    border: 'none',
                    borderRadius: '50%',
                    color: 'var(--color-verde-oscuro)',
                    cursor: 'pointer',
                    transition: 'all 0.3s',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(194, 168, 120, 0.4)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                  aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                >
                  {showPassword ? "🙈" : "👁️"}
                </button>
              </div>

              {/* Mensaje de error VIP */}
              {authError && (
                <div style={{ 
                  padding: '16px', 
                  background: 'linear-gradient(135deg, rgba(139, 28, 38, 0.1), rgba(193, 32, 43, 0.1))', 
                  border: '2px solid var(--color-rojo-vino)', 
                  borderRadius: '12px',
                  boxShadow: '0 4px 12px rgba(139, 28, 38, 0.2)'
                }}>
                  <p style={{ 
                    fontSize: '14px', 
                    color: 'var(--color-rojo-vino)', 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '12px',
                    margin: 0,
                    fontWeight: '500'
                  }}>
                    <span style={{ 
                      width: '24px', 
                      height: '24px',
                      background: 'var(--color-rojo-vino)',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white'
                    }}>⚠️</span>
                    {authError}
                  </p>
                </div>
              )}

              {/* Botón de acceso VIP */}
              <button
                type="submit"
                style={{
                  width: '100%',
                  background: password.trim() ? 'linear-gradient(135deg, var(--color-verde-esmeralda), var(--color-rojo-vino))' : 'linear-gradient(135deg, #ccc, #999)',
                  color: 'white',
                  padding: '16px',
                  borderRadius: '12px',
                  fontWeight: 'bold',
                  fontSize: '16px',
                  border: 'none',
                  cursor: password.trim() ? 'pointer' : 'not-allowed',
                  opacity: password.trim() ? 1 : 0.6,
                  transition: 'all 0.3s',
                  boxShadow: password.trim() ? '0 8px 24px rgba(13, 107, 75, 0.3)' : 'none',
                  position: 'relative',
                  overflow: 'hidden'
                }}
                onMouseEnter={(e) => {
                  if (password.trim()) {
                    e.currentTarget.style.background = 'linear-gradient(135deg, var(--color-rojo-vino), var(--color-verde-esmeralda))';
                    e.currentTarget.style.boxShadow = '0 12px 32px rgba(139, 28, 38, 0.4)';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (password.trim()) {
                    e.currentTarget.style.background = 'linear-gradient(135deg, var(--color-verde-esmeralda), var(--color-rojo-vino))';
                    e.currentTarget.style.boxShadow = '0 8px 24px rgba(13, 107, 75, 0.3)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }
                }}
                disabled={!password.trim()}
              >
                <span style={{ position: 'relative', zIndex: 1 }}>Acceder VIP 👑</span>
              </button>
            </form>

            {/* Información adicional VIP */}
            <div style={{ 
              marginTop: '20px', 
              padding: '16px', 
              background: 'linear-gradient(135deg, var(--color-dorado)/10, var(--color-oro-antiguo)/10)', 
              borderRadius: '12px',
              border: '1px solid var(--color-dorado)/30'
            }}>
              <p style={{ 
                fontSize: '13px', 
                color: 'var(--color-verde-oscuro)', 
                textAlign: 'center',
                margin: 0,
                fontWeight: '500',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px'
              }}>
                <span style={{ 
                  width: '20px', 
                  height: '20px',
                  background: 'linear-gradient(45deg, var(--color-dorado), var(--color-oro-antiguo))',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>🔒</span>
                Panel exclusivo para administradores VIP
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};