import { useState } from 'react';
import {
  Check, ArrowRight, ChevronLeft, ChevronDown, Zap, Shield, Rocket,
  Layers, CheckCircle, Mail,
} from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { cn } from '@/lib/utils';
import { Button }   from '@/components/ui/button';
import { Input }    from '@/components/ui/input';
import { Label }    from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Field, FieldGroup, FieldLabel, FieldSet, FieldLegend,
} from '@/components/ui/field';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

type Step = 1 | 2 | 3;

interface FormData {
  razaoSocial:      string;
  tipoCpfCnpj:      'cpf' | 'cnpj';
  cpfCnpj:          string;
  endereco:         string;
  telefone:         string;
  email:            string;
  descricaoServico: string;
  urlSite:          string;
  dataEntrega:      Date | undefined;
  formaPagamento:   '' | 'a-vista' | 'parcelado';
  numeroParcelas:   '' | '1' | '2';
}

function maskCpf(value: string): string {
  const d = value.replace(/\D/g, '').slice(0, 11);
  if (d.length <= 3) return d;
  if (d.length <= 6) return `${d.slice(0,3)}.${d.slice(3)}`;
  if (d.length <= 9) return `${d.slice(0,3)}.${d.slice(3,6)}.${d.slice(6)}`;
  return `${d.slice(0,3)}.${d.slice(3,6)}.${d.slice(6,9)}-${d.slice(9)}`;
}

function maskCnpj(value: string): string {
  const d = value.replace(/\D/g, '').slice(0, 14);
  if (d.length <= 2)  return d;
  if (d.length <= 5)  return `${d.slice(0,2)}.${d.slice(2)}`;
  if (d.length <= 8)  return `${d.slice(0,2)}.${d.slice(2,5)}.${d.slice(5)}`;
  if (d.length <= 12) return `${d.slice(0,2)}.${d.slice(2,5)}.${d.slice(5,8)}/${d.slice(8)}`;
  return `${d.slice(0,2)}.${d.slice(2,5)}.${d.slice(5,8)}/${d.slice(8,12)}-${d.slice(12)}`;
}

function maskPhone(value: string): string {
  const d = value.replace(/\D/g, '').slice(0, 11);
  if (d.length <= 2)  return `(${d}`;
  if (d.length <= 7)  return `(${d.slice(0,2)}) ${d.slice(2)}`;
  return `(${d.slice(0,2)}) ${d.slice(2,7)}-${d.slice(7)}`;
}

const STEPS = [
  { n: 1 as Step, label: 'Apresentação'     },
  { n: 2 as Step, label: 'Termos'           },
  { n: 3 as Step, label: 'Dados do projeto' },
];

const TERMOS = [
  'Concordo que meus dados pessoais serão usados exclusivamente para elaboração da proposta e do contrato de serviços.',
  'Estou ciente de que nenhum projeto é iniciado sem contrato formal assinado por ambas as partes.',
  'Entendo que o valor e escopo definitivos serão apresentados na proposta por e-mail, e que só assinarei após revisão.',
  'Confirmo que os dados informados são verdadeiros e correspondem ao solicitante do serviço.',
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
          Próximo: termos
          <ArrowRight size={18} />
        </Button>
      </div>
    </div>
  );
}

function StepTermos({
  aceitos, onToggle, onBack, onNext,
}: {
  aceitos: boolean[];
  onToggle: (i: number) => void;
  onBack:   () => void;
  onNext:   () => void;
}) {
  const todos = aceitos.every(Boolean);
  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display font-bold text-[clamp(1.5rem,1.2rem+1.5vw,2rem)] text-[#2C2763]">
          Termos de concordância
        </h2>
        <p className="mt-2 text-muted-foreground">
          Leia e confirme cada item abaixo antes de prosseguir.
        </p>
      </div>

      <div className="space-y-3">
        {TERMOS.map((termo, i) => (
          <label
            key={i}
            htmlFor={`termo-${i}`}
            className={cn(
              'flex items-start gap-3 p-4 rounded-2xl border-2 cursor-pointer transition-all',
              aceitos[i]
                ? 'border-primary bg-accent'
                : 'border-border bg-card hover:border-primary/40'
            )}
          >
            <Checkbox
              id={`termo-${i}`}
              checked={aceitos[i]}
              onCheckedChange={() => onToggle(i)}
              className="mt-0.5 shrink-0"
            />
            <span className="text-sm text-muted-foreground leading-relaxed select-none">
              {termo}
            </span>
          </label>
        ))}
      </div>

      <div className="flex items-center justify-between gap-4 pt-2">
        <Button variant="ghost" onClick={onBack}>
          <ChevronLeft size={18} />
          Voltar
        </Button>
        <Button size="lg" disabled={!todos} onClick={onNext}>
          Próximo: dados do projeto
          <ArrowRight size={18} />
        </Button>
      </div>
    </div>
  );
}

const sectionLabelClass = 'text-[0.7rem] font-bold uppercase tracking-widest text-muted-foreground';

function StepForm({
  form, onChange, onDateChange, onBack, onSubmit,
}: {
  form:           FormData;
  onChange:       (name: keyof FormData, value: string) => void;
  onDateChange:   (date: Date | undefined) => void;
  onBack:         () => void;
  onSubmit:       (e: React.FormEvent) => void;
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

      <FieldSet className="space-y-4">
        <FieldLegend className={sectionLabelClass}>Identificação</FieldLegend>
        <FieldGroup className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field className="gap-1.5">
            <FieldLabel htmlFor="razaoSocial">Razão Social / Nome completo *</FieldLabel>
            <Input
              id="razaoSocial"
              placeholder="Ex: João Silva ou Silva &amp; Cia Ltda"
              required
              value={form.razaoSocial}
              onChange={(e) => onChange('razaoSocial', e.target.value)}
            />
          </Field>
          <Field className="gap-2">
            <FieldLabel>CPF ou CNPJ *</FieldLabel>
            <RadioGroup
              value={form.tipoCpfCnpj}
              onValueChange={(v) => onChange('tipoCpfCnpj', v)}
              className="grid grid-cols-2 gap-2"
            >
              {([
                { value: 'cpf',  label: 'CPF',  sub: 'Pessoa física'   },
                { value: 'cnpj', label: 'CNPJ', sub: 'Pessoa jurídica' },
              ] as const).map(({ value, label, sub }) => {
                const selected = form.tipoCpfCnpj === value;
                return (
                  <Label
                    key={value}
                    htmlFor={`tipo-${value}`}
                    className={cn(
                      'flex flex-col items-center gap-0.5 p-3 rounded-xl border-2 cursor-pointer transition-all font-normal',
                      selected
                        ? 'border-primary bg-accent'
                        : 'border-border bg-card hover:border-primary/40'
                    )}
                  >
                    <RadioGroupItem value={value} id={`tipo-${value}`} className="sr-only" />
                    <span className={cn('font-semibold text-sm', selected ? 'text-accent-foreground' : 'text-foreground')}>
                      {label}
                    </span>
                    <span className="text-xs text-muted-foreground">{sub}</span>
                  </Label>
                );
              })}
            </RadioGroup>
            <Input
              id="cpfCnpj"
              placeholder={form.tipoCpfCnpj === 'cpf' ? '000.000.000-00' : '00.000.000/0000-00'}
              required
              value={form.cpfCnpj}
              onChange={(e) => {
                const masked = form.tipoCpfCnpj === 'cpf'
                  ? maskCpf(e.target.value)
                  : maskCnpj(e.target.value);
                onChange('cpfCnpj', masked);
              }}
            />
          </Field>
        </FieldGroup>
        <Field className="gap-1.5">
          <FieldLabel htmlFor="endereco">Endereço completo *</FieldLabel>
          <Input
            id="endereco"
            placeholder="Rua, número, bairro, cidade, estado, CEP"
            required
            value={form.endereco}
            onChange={(e) => onChange('endereco', e.target.value)}
          />
        </Field>
      </FieldSet>

      <FieldSet className="space-y-4">
        <FieldLegend className={sectionLabelClass}>Contato</FieldLegend>
        <FieldGroup className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field className="gap-1.5">
            <FieldLabel htmlFor="telefone">Telefone *</FieldLabel>
            <Input
              id="telefone"
              type="tel"
              placeholder="(11) 99999-9999"
              required
              value={form.telefone}
              onChange={(e) => onChange('telefone', maskPhone(e.target.value))}
            />
          </Field>
          <Field className="gap-1.5">
            <FieldLabel htmlFor="email">E-mail *</FieldLabel>
            <Input
              id="email"
              type="email"
              placeholder="seuemail@email.com"
              required
              value={form.email}
              onChange={(e) => onChange('email', e.target.value)}
            />
          </Field>
        </FieldGroup>
      </FieldSet>

      <FieldSet className="space-y-4">
        <FieldLegend className={sectionLabelClass}>Projeto</FieldLegend>
        <Field className="gap-1.5">
          <FieldLabel htmlFor="descricaoServico">Descrição do serviço *</FieldLabel>
          <Textarea
            id="descricaoServico"
            rows={4}
            placeholder="Descreva o que você precisa, funcionalidades, objetivo do projeto..."
            required
            value={form.descricaoServico}
            onChange={(e) => onChange('descricaoServico', e.target.value)}
          />
        </Field>
        <FieldGroup className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field className="gap-1.5">
            <FieldLabel htmlFor="urlSite">
              URL ou nome do site{' '}
              <span className="font-normal text-muted-foreground">(opcional)</span>
            </FieldLabel>
            <Input
              id="urlSite"
              placeholder="Ex: meusite.com.br"
              value={form.urlSite}
              onChange={(e) => onChange('urlSite', e.target.value)}
            />
          </Field>
          <Field className="gap-1.5">
            <FieldLabel>Data de entrega desejada *</FieldLabel>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    'w-full justify-between text-left font-normal bg-card border-input',
                    form.dataEntrega ? 'text-foreground' : 'text-muted-foreground'
                  )}
                >
                  {form.dataEntrega
                    ? format(form.dataEntrega, 'PPP', { locale: ptBR })
                    : 'Selecione uma data'}
                  <ChevronDown className="h-4 w-4 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={form.dataEntrega}
                  onSelect={onDateChange}
                  disabled={(date) => date < new Date()}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </Field>
        </FieldGroup>
      </FieldSet>

      <FieldSet className="space-y-4">
        <FieldLegend className={sectionLabelClass}>Pagamento</FieldLegend>
        <Field className="gap-2">
          <FieldLabel>Forma de pagamento *</FieldLabel>
          <RadioGroup
            value={form.formaPagamento}
            onValueChange={(v) => onChange('formaPagamento', v as FormData['formaPagamento'])}
            className="grid grid-cols-2 gap-2"
          >
            {([
              { value: 'a-vista',   label: 'À Vista',   sub: 'Pagamento único'         },
              { value: 'parcelado', label: 'Parcelado', sub: '30% entrada + parcelas'  },
            ] as const).map(({ value, label, sub }) => {
              const selected = form.formaPagamento === value;
              return (
                <Label
                  key={value}
                  htmlFor={`pay-${value}`}
                  className={cn(
                    'flex flex-col items-center gap-0.5 p-3 rounded-xl border-2 cursor-pointer transition-all font-normal',
                    selected
                      ? 'border-primary bg-accent'
                      : 'border-border bg-card hover:border-primary/40'
                  )}
                >
                  <RadioGroupItem value={value} id={`pay-${value}`} className="sr-only" />
                  <span className={cn('font-semibold text-sm', selected ? 'text-accent-foreground' : 'text-foreground')}>
                    {label}
                  </span>
                  <span className="text-xs text-muted-foreground">{sub}</span>
                </Label>
              );
            })}
          </RadioGroup>
        </Field>

        {form.formaPagamento === 'parcelado' && (
          <Field className="gap-2">
            <FieldLabel>Número de parcelas *</FieldLabel>
            <RadioGroup
              value={form.numeroParcelas}
              onValueChange={(v) => onChange('numeroParcelas', v as FormData['numeroParcelas'])}
              className="grid grid-cols-2 gap-2"
            >
              {([
                { value: '1', label: '1 parcela',  sub: '30% + 70% na entrega' },
                { value: '2', label: '2 parcelas', sub: '30% + 35% + 35%'      },
              ] as const).map(({ value, label, sub }) => {
                const selected = form.numeroParcelas === value;
                return (
                  <Label
                    key={value}
                    htmlFor={`parcela-${value}`}
                    className={cn(
                      'flex flex-col items-center gap-0.5 p-3 rounded-xl border-2 cursor-pointer transition-all font-normal',
                      selected
                        ? 'border-primary bg-accent'
                        : 'border-border bg-card hover:border-primary/40'
                    )}
                  >
                    <RadioGroupItem value={value} id={`parcela-${value}`} className="sr-only" />
                    <span className={cn('font-semibold text-sm', selected ? 'text-accent-foreground' : 'text-foreground')}>
                      {label}
                    </span>
                    <span className="text-xs text-muted-foreground">{sub}</span>
                  </Label>
                );
              })}
            </RadioGroup>
          </Field>
        )}
      </FieldSet>

      <div className="rounded-[5px] border-2 border-primary overflow-hidden">
        <div className="bg-primary px-4 py-3 flex items-center gap-2.5">
          <Mail size={17} className="text-white shrink-0" />
          <p className="font-bold text-white text-sm tracking-wide">Contrato enviado por e-mail</p>
        </div>
        <div className="bg-accent px-4 py-3.5">
          <p className="text-sm text-accent-foreground leading-relaxed">
            Após o envio, a ProBuled analisa sua solicitação e envia o contrato completo para o e-mail informado. Você terá tempo para ler tudo com calma antes de assinar.{' '}
            <span className="font-semibold text-primary">Nenhum pagamento é cobrado sem sua aprovação.</span>
          </p>
        </div>
      </div>

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
  const [step,         setStep]         = useState<Step>(1);
  const [termosAceitos, setTermosAceitos] = useState([false, false, false, false]);
  const [submitted,       setSubmitted]       = useState(false);
  const [form,            setForm]            = useState<FormData>({
    razaoSocial:      '',
    tipoCpfCnpj:      'cpf',
    cpfCnpj:          '',
    endereco:         '',
    telefone:         '',
    email:            '',
    descricaoServico: '',
    urlSite:          '',
    dataEntrega:      undefined,
    formaPagamento:   '',
    numeroParcelas:   '',
  });

  function onChange(name: keyof FormData, value: string) {
    setForm(f => {
      if (name === 'tipoCpfCnpj') return { ...f, tipoCpfCnpj: value as 'cpf' | 'cnpj', cpfCnpj: '' };
      return { ...f, [name]: value };
    });
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
      `${form.tipoCpfCnpj.toUpperCase()}: ${form.cpfCnpj}`,
      `Endereço: ${form.endereco}`,
      `Telefone: ${form.telefone}`,
      `E-mail: ${form.email}`,
      `Descrição do serviço: ${form.descricaoServico}`,
      `URL / Nome do site: ${form.urlSite || 'Não definida'}`,
      `Data de entrega: ${form.dataEntrega ? format(form.dataEntrega, 'dd/MM/yyyy') : 'Não definida'}`,
      `Forma de pagamento: ${form.formaPagamento === 'a-vista' ? 'À Vista' : 'Parcelado (30% entrada + parcelas)'}`,
      parcelas,
    ].filter(Boolean).join('\n');

    window.location.href = `mailto:probuled@gmail.com?subject=${encodeURIComponent(`Novo Projeto – ${form.razaoSocial}`)}&body=${encodeURIComponent(body)}`;
    setSubmitted(true);
  }

  return (
    <main className="min-h-screen bg-[#F1EFE8]">
      <header className="flex justify-center py-6 border-b border-[#E4E1D6]">
        <a href="/" className="flex items-center gap-[0.7rem] font-display font-bold text-[1.35rem] tracking-[-0.02em]">
          <img
            src="/assets/logo/probuled-mark.png"
            alt="ProBuled"
            className="w-[38px] h-[38px] rounded-[10px] shadow-sm"
          />
          <span className="text-[#2C2763]">ProBuled</span>
        </a>
      </header>

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
            <StepTermos
              aceitos={termosAceitos}
              onToggle={(i) => setTermosAceitos(v => v.map((val, idx) => idx === i ? !val : val))}
              onBack={() => setStep(1)}
              onNext={() => setStep(3)}
            />
          )}
          {step === 3 && (
            <StepForm
              form={form}
              onChange={onChange}
              onDateChange={(date) => setForm(f => ({ ...f, dataEntrega: date }))}
              onBack={() => setStep(2)}
              onSubmit={handleSubmit}
            />
          )}
        </div>
      )}
    </main>
  );
}
