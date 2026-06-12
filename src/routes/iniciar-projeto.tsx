import { createFileRoute } from '@tanstack/react-router';
import { IniciarProjetoPage } from '@/pages/iniciar-projeto';

export const Route = createFileRoute('/iniciar-projeto')({
  component: IniciarProjetoPage,
});
