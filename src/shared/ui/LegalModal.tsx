import { useEffect, useRef } from 'react';
import { IoClose } from 'react-icons/io5';

interface LegalModalProps {
  title: string;
  children: React.ReactNode;
  onClose: () => void;
}

export function LegalModal({ title, children, onClose }: LegalModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const el = dialogRef.current;
    if (!el) return;
    el.showModal();

    const handleCancel = (e: Event) => {
      e.preventDefault();
      onClose();
    };

    el.addEventListener('cancel', handleCancel);
    return () => el.removeEventListener('cancel', handleCancel);
  }, [onClose]);

  function handleBackdrop(e: React.MouseEvent<HTMLDialogElement>) {
    if (e.target === dialogRef.current) onClose();
  }

  return (
    <dialog
      ref={dialogRef}
      onClick={handleBackdrop}
      className="
        m-auto w-full max-w-2xl max-h-[85dvh]
        bg-[#1A1915] text-white/70
        border border-white/[0.08] rounded-2xl
        shadow-[0_32px_80px_-16px_rgba(0,0,0,0.8)]
        backdrop:bg-black/60 backdrop:backdrop-blur-sm
        p-0 overflow-hidden
        open:flex open:flex-col
      "
    >
      {/* Header */}
      <div className="flex items-center justify-between px-8 py-5 border-b border-white/[0.08] shrink-0">
        <h2 className="font-display font-bold text-white text-lg leading-tight">{title}</h2>
        <button
          onClick={onClose}
          aria-label="Fechar"
          className="flex items-center justify-center w-8 h-8 rounded-lg text-white/40 hover:text-white hover:bg-white/5 [transition:color_150ms_ease,background_150ms_ease]"
        >
          <IoClose size={20} />
        </button>
      </div>

      {/* Body */}
      <div className="overflow-y-auto px-8 py-6 flex-1 text-[0.9rem] leading-relaxed space-y-5 [&_h3]:text-white [&_h3]:font-semibold [&_h3]:text-[1rem] [&_h3]:mt-6 [&_h3]:mb-2">
        {children}
      </div>

      {/* Footer */}
      <div className="px-8 py-4 border-t border-white/[0.08] shrink-0">
        <button
          onClick={onClose}
          className="px-5 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/60 hover:text-white text-sm font-medium [transition:background_150ms_ease,color_150ms_ease]"
        >
          Fechar
        </button>
      </div>
    </dialog>
  );
}
