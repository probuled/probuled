import { useState } from 'react';
import {
  Check, ArrowRight, ChevronLeft, Zap, Shield, Rocket,
  Layers, CheckCircle, ArrowUpRight,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button }   from '@/components/ui/button';
import { Input }    from '@/components/ui/input';
import { Label }    from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select';

type Step = 1 | 2 | 3;

interface FormData {
  razaoSocial:      string;
  cpfCnpj:          string;
  endereco:         string;
  telefone:         string;
  email:            string;
  descricaoServico: string;
  urlSite:          string;
  dataEntrega:      string;
  formaPagamento:   '' | 'a-vista' | 'parcelado';
  numeroParcelas:   '' | '1' | '2';
}

const STEPS = [
  { n: 1 as Step, label: 'Apresentação'     },
  { n: 2 as Step, label: 'Contrato'         },
  { n: 3 as Step, label: 'Dados do projeto' },
];

function Stepper({ current }: { current: Step }) {
  return (
    <div className="flex items-start justify-center w-full max-w-[460px] mx-auto">
      {STEPS.map(({ n, label }, i) => {
        const done   = current > n;
        const active = current === n;
        return (
          <div key={n} className="flex items-center">
            <div className="flex flex-col items-center gap-1.5 shrink-0">
              <div
                className={cn(
                  'w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-all duration-300',
                  done   ? 'bg-[#1D9E75] border-[#1D9E75] text-white' :
                  active ? 'bg-primary border-primary text-primary-foreground shadow-[0_4px_16px_-4px_rgba(83,74,183,0.5)]' :
                           'bg-card border-border text-muted-foreground'
                )}
              >
                {done ? <Check size={16} /> : n}
              </div>
              <span
                className={cn(
                  'text-xs font-medium whitespace-nowrap transition-colors',
                  active ? 'text-primary' : done ? 'text-[#1D9E75]' : 'text-muted-foreground'
                )}
              >
                {label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div
                className={cn(
                  'h-[2px] w-[72px] mx-3 mb-5 rounded-full transition-all duration-500',
                  current > n ? 'bg-[#1D9E75]' : 'bg-border'
                )}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

function StepApresentacao({ onNext }: { onNext: () => void }) {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display font-bold text-[clamp(1.8rem,1.4rem+2vw,2.5rem)] text-[#2C2763] leading-tight">
          Vamos construir algo pro.
        </h1>
        <p className="mt-3 text-muted-foreground text-lg max-w-[52ch]">
          Preencha o formulário e a ProBuled entra em contato em até um dia útil com plano, cronograma e proposta detalhada.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { Icon: Zap,    title: 'Rápido',       text: 'Resposta em até 1 dia útil com proposta detalhada.'  },
          { Icon: Shield, title: 'Transparente',  text: 'Contrato claro, prazos definidos e marcos fechados.' },
          { Icon: Rocket, title: 'Profissional',  text: 'Entrega de qualidade com código limpo e escalável.'  },
        ].map(({ Icon, title, text }) => (
          <div key={title} className="bg-card rounded-2xl p-5 border border-border shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center text-primary mb-3">
              <Icon size={20} />
            </div>
            <h3 className="font-semibold text-foreground mb-1">{title}</h3>
            <p className="text-sm text-muted-foreground">{text}</p>
          </div>
        ))}
      </div>

      <div className="bg-accent rounded-2xl p-6 border border-[#D4D0F8]">
        <h3 className="font-semibold text-accent-foreground mb-4 flex items-center gap-2">
          <Layers size={18} />
          Como funciona
        </h3>
        <ol className="space-y-3">
          {[
            'Você preenche o formulário com os dados do projeto.',
            'A ProBuled analisa e prepara uma proposta personalizada.',
            'Você revisa, aprova e o projeto começa com marcos definidos.',
          ].map((text, i) => (
            <li key={i} className="flex items-start gap-3 text-sm text-accent-foreground">
              <span className="w-5 h-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center shrink-0 mt-0.5 font-bold">
                {i + 1}
              </span>
              {text}
            </li>
          ))}
        </ol>
      </div>

      <div className="flex justify-end pt-2">
        <Button size="lg" onClick={onNext}>
          Próximo: ler o contrato
          <ArrowRight size={18} />
        </Button>
      </div>
    </div>
  );
}

function StepContrato({
  accepted, onToggle, onBack, onNext,
}: {
  accepted: boolean;
  onToggle: () => void;
  onBack:   () => void;
  onNext:   () => void;
}) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display font-bold text-[clamp(1.5rem,1.2rem+1.5vw,2rem)] text-[#2C2763]">
          Contrato de Prestação de Serviços
        </h2>
        <p className="mt-2 text-muted-foreground">
          Leia o contrato antes de prosseguir. Ele estabelece as responsabilidades de ambas as partes, prazo, pagamento e entregáveis.
        </p>
      </div>

      <div className="bg-card rounded-2xl border border-border overflow-hidden">
        <div className="p-5 border-b border-border flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center shrink-0">
              <Shield size={20} className="text-primary" />
            </div>
            <div>
              <p className="font-semibold text-foreground">Contrato de Prestação de Serviços</p>
              <p className="text-sm text-muted-foreground">ProBuled — Versão atual</p>
            </div>
          </div>
          <a
            href="/contrato-probuled.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-accent-foreground transition-colors underline underline-offset-2 shrink-0"
          >
            <ArrowUpRight size={15} />
            Abrir PDF
          </a>
        </div>

        <ul className="p-5 space-y-3">
          {[
            'Definição clara dos serviços, escopo e entregáveis.',
            'Cronograma com datas de início, marcos e entrega final.',
            'Condições de pagamento: à vista ou parcelado (30% de entrada).',
            'Propriedade intelectual transferida ao contratante após quitação.',
            'Cláusulas de revisão, suporte pós-entrega e rescisão.',
          ].map((item) => (
            <li key={item} className="flex items-start gap-2.5 text-sm text-muted-foreground">
              <CheckCircle size={16} className="text-[#1D9E75] shrink-0 mt-0.5" />
              {item}
            </li>
          ))}
        </ul>
      </div>

      <div className="flex items-start gap-3">
        <Checkbox
          id="contrato"
          checked={accepted}
          onCheckedChange={() => onToggle()}
          className="mt-0.5"
        />
        <Label htmlFor="contrato" className="text-sm text-muted-foreground leading-relaxed cursor-pointer font-normal">
          Li e concordo com os termos do{' '}
          <a
            href="/contrato-probuled.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary underline underline-offset-2 font-semibold"
          >
            Contrato de Prestação de Serviços
          </a>{' '}
          da ProBuled.
        </Label>
      </div>

      <div className="flex items-center justify-between gap-4 pt-2">
        <Button variant="ghost" onClick={onBack}>
          <ChevronLeft size={18} />
          Voltar
        </Button>
        <Button size="lg" disabled={!accepted} onClick={onNext}>
          Próximo: dados do projeto
          <ArrowRight size={18} />
        </Button>
      </div>
    </div>
  );
}

function StepForm({
  form, onChange, onBack, onSubmit,
}: {
  form:     FormData;
  onChange: (name: keyof FormData, value: string) => void;
  onBack:   () => void;
  onSubmit: (e: React.FormEvent) => void;
}) {
  return (
    <form onSubmit={onSubmit} className="space-y-8">
      <div>
        <h2 className="font-display font-bold text-[clamp(1.5rem,1.2rem+1.5vw,2rem)] text-[#2C2763]">
          Dados do projeto
        </h2>
        <p className="mt-2 text-muted-foreground">
          Preencha todos os campos. Essas informações serão usadas para elaborar a proposta e o contrato.
        </p>
      </div>

      <section className="space-y-4">
        <h3 className="text-[0.7rem] font-bold uppercase tracking-widest text-muted-foreground">Identificação</h3>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <Label htmlFor="razaoSocial">Razão Social / Nome completo *</Label>
            <Input
              id="razaoSocial"
              placeholder="Ex: João Silva ou Silva &amp; Cia Ltda"
              required
              value={form.razaoSocial}
              onChange={(e) => onChange('razaoSocial', e.target.value)}
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="cpfCnpj">CPF ou CNPJ *</Label>
            <Input
              id="cpfCnpj"
              placeholder="000.000.000-00"
              required
              value={form.cpfCnpj}
              onChange={(e) => onChange('cpfCnpj', e.target.value)}
            />
          </div>
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="endereco">Endereço completo *</Label>
          <Input
            id="endereco"
            placeholder="Rua, número, bairro, cidade, estado, CEP"
            required
            value={form.endereco}
            onChange={(e) => onChange('endereco', e.target.value)}
          />
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="text-[0.7rem] font-bold uppercase tracking-widest text-muted-foreground">Contato</h3>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <Label htmlFor="telefone">Telefone *</Label>
            <Input
              id="telefone"
              type="tel"
              placeholder="(11) 99999-9999"
              required
              value={form.telefone}
              onChange={(e) => onChange('telefone', e.target.value)}
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="email">E-mail *</Label>
            <Input
              id="email"
              type="email"
              placeholder="seuemail@email.com"
              required
              value={form.email}
              onChange={(e) => onChange('email', e.target.value)}
            />
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="text-[0.7rem] font-bold uppercase tracking-widest text-muted-foreground">Projeto</h3>
        <div className="space-y-1.5">
          <Label htmlFor="descricaoServico">Descrição do serviço *</Label>
          <Textarea
            id="descricaoServico"
            rows={4}
            placeholder="Descreva o que você precisa, funcionalidades, objetivo do projeto..."
            required
            value={form.descricaoServico}
            onChange={(e) => onChange('descricaoServico', e.target.value)}
          />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <Label htmlFor="urlSite">
              URL ou nome do site{' '}
              <span className="font-normal text-muted-foreground">(opcional)</span>
            </Label>
            <Input
              id="urlSite"
              placeholder="Ex: meusite.com.br"
              value={form.urlSite}
              onChange={(e) => onChange('urlSite', e.target.value)}
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="dataEntrega">Data de entrega desejada *</Label>
            <Input
              id="dataEntrega"
              type="date"
              required
              value={form.dataEntrega}
              onChange={(e) => onChange('dataEntrega', e.target.value)}
            />
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="text-[0.7rem] font-bold uppercase tracking-widest text-muted-foreground">Pagamento</h3>
        <div className="space-y-1.5">
          <Label>Forma de pagamento *</Label>
          <RadioGroup
            value={form.formaPagamento}
            onValueChange={(v) => onChange('formaPagamento', v as FormData['formaPagamento'])}
            className="grid grid-cols-2 gap-3"
          >
            {([
              { value: 'a-vista',   label: 'À Vista',   sub: undefined                },
              { value: 'parcelado', label: 'Parcelado', sub: '30% entrada + parcelas' },
            ] as const).map(({ value, label, sub }) => {
              const selected = form.formaPagamento === value;
              return (
                <Label
                  key={value}
                  htmlFor={`pay-${value}`}
                  className={cn(
                    'flex flex-col gap-0.5 p-4 rounded-xl border-2 cursor-pointer transition-all font-normal',
                    selected
                      ? 'border-primary bg-accent'
                      : 'border-border bg-card hover:border-primary/40'
                  )}
                >
                  <RadioGroupItem value={value} id={`pay-${value}`} className="sr-only" />
                  <span className={cn('font-semibold text-sm', selected ? 'text-accent-foreground' : 'text-foreground')}>
                    {label}
                  </span>
                  {sub && <span className="text-xs text-muted-foreground">{sub}</span>}
                </Label>
              );
            })}
          </RadioGroup>
        </div>

        {form.formaPagamento === 'parcelado' && (
          <div className="space-y-1.5">
            <Label htmlFor="numeroParcelas">Número de parcelas *</Label>
            <Select
              value={form.numeroParcelas}
              onValueChange={(v) => onChange('numeroParcelas', v as FormData['numeroParcelas'])}
            >
              <SelectTrigger id="numeroParcelas">
                <SelectValue placeholder="Selecione" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1 parcela</SelectItem>
                <SelectItem value="2">2 parcelas</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}
      </section>

      <div className="flex items-center justify-between gap-4 pt-2">
        <Button variant="ghost" onClick={onBack} type="button">
          <ChevronLeft size={18} />
          Voltar
        </Button>
        <Button size="lg" type="submit">
          Enviar proposta
          <ArrowRight size={18} />
        </Button>
      </div>
    </form>
  );
}

function SuccessState() {
  return (
    <div className="py-24 flex flex-col items-center text-center max-w-[480px] mx-auto">
      <div className="w-20 h-20 rounded-full bg-accent flex items-center justify-center mb-6">
        <CheckCircle size={40} className="text-primary" />
      </div>
      <h1 className="font-display font-bold text-[clamp(1.6rem,1.2rem+2vw,2.2rem)] text-[#2C2763]">
        Proposta enviada!
      </h1>
      <p className="mt-3 text-muted-foreground max-w-[40ch] mx-auto">
        A ProBuled vai analisar seu projeto e responder em até 1 dia útil com um plano e cronograma.
      </p>
      <div className="mt-8">
        <Button asChild>
          <a href="/">Voltar ao início</a>
        </Button>
      </div>
    </div>
  );
}

export function IniciarProjetoPage() {
  const [step,            setStep]            = useState<Step>(1);
  const [contratoAceito,  setContratoAceito]  = useState(false);
  const [submitted,       setSubmitted]       = useState(false);
  const [form,            setForm]            = useState<FormData>({
    razaoSocial:      '',
    cpfCnpj:          '',
    endereco:         '',
    telefone:         '',
    email:            '',
    descricaoServico: '',
    urlSite:          '',
    dataEntrega:      '',
    formaPagamento:   '',
    numeroParcelas:   '',
  });

  function onChange(name: keyof FormData, value: string) {
    setForm(f => ({ ...f, [name]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.formaPagamento) return;
    if (form.formaPagamento === 'parcelado' && !form.numeroParcelas) return;

    const parcelas = form.formaPagamento === 'parcelado'
      ? `Número de Parcelas: ${form.numeroParcelas}\n`
      : '';
    const body = [
      `Razão Social / Nome: ${form.razaoSocial}`,
      `CPF / CNPJ: ${form.cpfCnpj}`,
      `Endereço: ${form.endereco}`,
      `Telefone: ${form.telefone}`,
      `E-mail: ${form.email}`,
      `Descrição do serviço: ${form.descricaoServico}`,
      `URL / Nome do site: ${form.urlSite || 'Não definida'}`,
      `Data de entrega: ${form.dataEntrega}`,
      `Forma de pagamento: ${form.formaPagamento === 'a-vista' ? 'À Vista' : 'Parcelado (30% entrada + parcelas)'}`,
      parcelas,
    ].filter(Boolean).join('\n');

    window.location.href = `mailto:probuled@gmail.com?subject=${encodeURIComponent(`Novo Projeto – ${form.razaoSocial}`)}&body=${encodeURIComponent(body)}`;
    setSubmitted(true);
  }

  return (
    <main className="min-h-screen pt-[74px] bg-[#F1EFE8]">
      {submitted ? (
        <SuccessState />
      ) : (
        <div className="w-full max-w-[720px] mx-auto px-[clamp(1.25rem,4vw,2rem)] py-[clamp(2.5rem,5vw,4rem)]">
          <div className="mb-10">
            <a
              href="/"
              className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors mb-6"
            >
              <ChevronLeft size={16} />
              Voltar ao site
            </a>
            <Stepper current={step} />
          </div>

          {step === 1 && <StepApresentacao onNext={() => setStep(2)} />}
          {step === 2 && (
            <StepContrato
              accepted={contratoAceito}
              onToggle={() => setContratoAceito(v => !v)}
              onBack={() => setStep(1)}
              onNext={() => setStep(3)}
            />
          )}
          {step === 3 && (
            <StepForm
              form={form}
              onChange={onChange}
              onBack={() => setStep(2)}
              onSubmit={handleSubmit}
            />
          )}
        </div>
      )}
    </main>
  );
}
