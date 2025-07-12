import React, { ReactNode, useState } from 'react';
import {
  useFloating,
  useClick,
  useDismiss,
  useInteractions,
  useRole,
  useHover,
  FloatingPortal,
  shift,
  flip,
  offset,
  autoUpdate,
  Placement,
  Middleware
} from '@floating-ui/react';
import { useTransitionStyles } from '@floating-ui/react';
import { OffsetOptions } from '@floating-ui/dom';

/**
 * Props para el componente WFloating.
 */
export interface WFloatingProps {
  /** Funcion renderOpenner que renderiza el disparador del popup. Recibe una ref y demas props */
  renderOpenner: (args: { ref: React.Ref<HTMLDivElement>; [key: string]: any }) => ReactNode;
  /** Contenido del popup */
  children: React.ReactNode;
  /** Clase de animacion al abrir el popup (opcional) */
  openAnimation?: string;
  /** Clase de animacion al cerrar el popup (opcional) */
  closeAnimation?: string;
  /** Posicion del popup respecto al disparador (por defecto 'center') */
  placement?: Placement;
  /** Middleware para ajustar la posicion (opcional) */
  middleware?: Middleware[];
  /** Si se abre el popup con hover en lugar de click (por defecto false) */
  hover?: boolean;
  /** Si se abre el popup con click (por defecto true) */
  click?: boolean;
  /** Rol del popup (por defecto 'dialog') */
  role?: 'tooltip' | 'dialog' | 'alertdialog' | 'menu' | 'listbox' | 'grid' | 'tree' | undefined;
  /** Estado controlado externamente para abrir/cerrar el popup (opcional) */
  isOpen?: boolean;
  /** Updater para el estado controlado externamente (opcional) */
  setIsOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  /** Clase personalizada para el contenedor (opcional) */
  customClassName?: string;
  /** Si se permite cerrar el popup con la tecla Escape (por defecto true) */
  escapeKey?: boolean;
  /** z-index del popup (por defecto 1054) */
  zIndex?: number;
  /** Offset del popup respecto al disparador (por defecto 5) */
  offsetValue?: OffsetOptions;
  /** Padding para el shift middleware (por defecto 5) */
  shiftPadding?: number;
  /** si es verdader el popup no se cierra al hacer click afuera, para controlarlo externamente  */
  disableOutsideDismiss?: boolean;
}

/**
 * Componente WFloating.
 *
 * Este componente es una migracion del Floating original a TypeScript, con valores por defecto para
 * openAnimation, closeAnimation, placement, etc.
 *
 * @param props WFloatingProps
 * @returns JSX.Element
 */
export const WFloating = ({
  renderOpenner,
  children,
  openAnimation = '',
  closeAnimation = '',
  placement = 'bottom-start',
  hover = false,
  click = true,
  role = 'dialog',
  isOpen: controlledIsOpen,
  setIsOpen: controlledSetIsOpen,
  customClassName,
  escapeKey = true,
  zIndex = 1054,
  offsetValue = 5,
  shiftPadding = 5,
  middleware, // opcional
  disableOutsideDismiss
}: WFloatingProps) => {
  /**
   * Manejamos estado interno si no se controla externamente
   */
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const isOpen = controlledIsOpen !== undefined ? controlledIsOpen : internalIsOpen;
  const setIsOpen = controlledSetIsOpen !== undefined ? controlledSetIsOpen : setInternalIsOpen;

  // Si no se paso middleware, usamos uno por defecto
  const usedMiddleware = middleware || [
    offset(offsetValue),
    flip({ fallbackAxisSideDirection: 'end' }),
    shift({ padding: shiftPadding })
  ];

  const { x, y, strategy, floating, reference, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    placement,
    middleware: usedMiddleware,
    whileElementsMounted: autoUpdate
  });

  // Interacciones: click, hover, rol y dismiss
  const clickInteraction = useClick(context, { enabled: click });
  const hoverInteraction = useHover(context, { enabled: hover });
  const roleInteraction = useRole(context, { role });
  const dismiss = useDismiss(context, {
    escapeKey,
    outsidePress: (event) => {
      if (disableOutsideDismiss) return false;
      // Evita cerrar si el clic ocurre dentro de un SweetAlert (por ejemplo)
      if (event.target instanceof HTMLElement && event.target.closest('.swal2-container')) {
        return false;
      }
      return true;
    }
  });

  const { getReferenceProps, getFloatingProps } = useInteractions([
    click ? clickInteraction : hoverInteraction,
    dismiss,
    roleInteraction
  ]);

  const { isMounted, styles } = useTransitionStyles(context, { duration: 300 });

  // Seleccion de clase de animacion segun estado
  const animationClass = isOpen ? openAnimation : closeAnimation;

  return (
    <>
      {renderOpenner({ ref: reference, ...getReferenceProps() })}
      {isMounted && (
        <FloatingPortal>
          <div
            ref={floating}
            {...getFloatingProps()}
            style={{
              ...styles,
              position: strategy,
              top: y ?? 0,
              left: x ?? 0,
              zIndex
            }}
            className={animationClass || customClassName}
          >
            {children}
          </div>
        </FloatingPortal>
      )}
    </>
  );
};
