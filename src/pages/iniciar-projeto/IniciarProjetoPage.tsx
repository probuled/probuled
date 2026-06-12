import { useState } from "react";
import {
  Check,
  ArrowRight,
  ChevronLeft,
  Zap,
  Shield,
  Rocket,
  Layers,
  CheckCircle,
  Mail,
  CalendarIcon,
  Sparkles,
  ShieldCheck,
  User,
  CreditCard,
} from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSet,
  FieldLegend,
} from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

type Step = 1 | 2 | 3;

interface FormData {
  razaoSocial: string;
  tipoCpfCnpj: "cpf" | "cnpj";
  cpfCnpj: string;
  endereco: string;
  telefone: string;
  email: string;
  descricaoServico: string;
  urlSite: string;
  dataEntrega: Date | undefined;
  formaPagamento: "" | "a-vista" | "parcelado";
  numeroParcelas: "" | "1" | "2";
}

function maskCpf(value: string): string {
  const d = value.replace(/\D/g, "").slice(0, 11);
  if (d.length <= 3) return d;
  if (d.length <= 6) return `${d.slice(0, 3)}.${d.slice(3)}`;
  if (d.length <= 9) return `${d.slice(0, 3)}.${d.slice(3, 6)}.${d.slice(6)}`;
  return `${d.slice(0, 3)}.${d.slice(3, 6)}.${d.slice(6, 9)}-${d.slice(9)}`;
}

function maskCnpj(value: string): string {
  const d = value.replace(/\D/g, "").slice(0, 14);
  if (d.length <= 2) return d;
  if (d.length <= 5) return `${d.slice(0, 2)}.${d.slice(2)}`;
  if (d.length <= 8) return `${d.slice(0, 2)}.${d.slice(2, 5)}.${d.slice(5)}`;
  if (d.length <= 12)
    return `${d.slice(0, 2)}.${d.slice(2, 5)}.${d.slice(5, 8)}/${d.slice(8)}`;
  return `${d.slice(0, 2)}.${d.slice(2, 5)}.${d.slice(5, 8)}/${d.slice(8, 12)}-${d.slice(12)}`;
}

function maskPhone(value: string): string {
  const d = value.replace(/\D/g, "").slice(0, 11);
  if (d.length <= 2) return `(${d}`;
  if (d.length <= 7) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
}

const STEPS = [
  { n: 1 as Step, label: "Apresentação" },
  { n: 2 as Step, label: "Termos" },
  { n: 3 as Step, label: "Dados do projeto" },
];

const TERMOS = [
  "Concordo que meus dados pessoais serão usados exclusivamente para elaboração da proposta e do contrato de serviços.",
  "Estou ciente de que nenhum projeto é iniciado sem contrato formal assinado por ambas as partes.",
  "Entendo que o valor e escopo definitivos serão apresentados na proposta por e-mail, e que só assinarei após revisão.",
  "Confirmo que os dados informados são verdadeiros e correspondem ao solicitante do serviço.",
];

function Stepper({ current }: { current: Step }) {
  return (
    <div className="flex items-start justify-center w-full max-w-[460px] mx-auto">
      {STEPS.map(({ n, label }, i) => {
        const done = current > n;
        const active = current === n;
        return (
          <div key={n} className="flex items-center">
            <div className="flex flex-col items-center gap-1.5 shrink-0">
              <div
                className={cn(
                  "w-9 h-9 rounded-full flex items-center justify-center text-sm font-medium border transition-colors",
                  done
                    ? "bg-[#1D9E75] border-[#1D9E75] text-white"
                    : active
                      ? "bg-[#534AB7] border-[#534AB7] text-white"
                      : "bg-background border-border text-muted-foreground",
                )}
              >
                {done ? <Check size={16} /> : n}
              </div>
              <span
                className={cn(
                  "text-xs font-medium whitespace-nowrap transition-colors",
                  done
                    ? "text-[#157E5E]"
                    : active
                      ? "text-[#534AB7]"
                      : "text-muted-foreground",
                )}
              >
                {label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div
                className={cn(
                  "h-px w-[72px] mx-3 mb-5 transition-colors",
                  current > n ? "bg-[#1D9E75]" : "bg-border",
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
    <div className="space-y-10">
      {/* Hero — ProBuled brand language: Poppins display, gradient accent, teal eyebrow, soft blob */}
      <div className="relative">
        <div className="absolute -top-12 -right-8 w-64 h-64 rounded-full blur-[64px] opacity-40 bg-[radial-gradient(circle_at_30%_30%,#8F86DC,#534AB7)] pointer-events-none" />
        <div className="absolute -bottom-16 -left-10 w-52 h-52 rounded-full blur-[64px] opacity-30 bg-[radial-gradient(circle_at_50%_50%,#63CDA6,#1D9E75)] pointer-events-none" />
        <div className="relative space-y-3">
          <span className="inline-flex items-center gap-2 text-[0.72rem] font-bold tracking-[0.16em] uppercase text-[#157E5E]">
            <Sparkles size={13} />
            Iniciar um projeto
          </span>
          <h1 className="font-display font-bold tracking-[-0.03em] leading-[1.05] text-[clamp(2.1rem,1.5rem+2.6vw,3rem)] text-[#2C2763]">
            Vamos construir algo <span className="text-grad">pro</span>.
          </h1>
          <p className="text-[#424039] text-lg leading-relaxed max-w-[52ch]">
            Preencha o formulário e a ProBuled entra em contato em até um dia
            útil com plano, cronograma e proposta detalhada.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          {
            Icon: Zap,
            title: "Rápido",
            text: "Resposta em até 1 dia útil com proposta detalhada.",
          },
          {
            Icon: Shield,
            title: "Transparente",
            text: "Contrato claro, prazos definidos e marcos fechados.",
          },
          {
            Icon: Rocket,
            title: "Profissional",
            text: "Entrega de qualidade com código limpo e escalável.",
          },
        ].map(({ Icon, title, text }) => (
          <div
            key={title}
            className="group bg-white border border-[#E4E1D6] rounded-lg shadow-sm p-6 transition-[transform,box-shadow,border-color] duration-200 hover:-translate-y-1 hover:shadow-lg hover:border-[#B9B3ED]"
          >
            <span className="inline-flex items-center justify-center w-12 h-12 rounded-md mb-4 bg-[#EEEDFE] text-[#534AB7] transition-colors group-hover:bg-[#E0DDFB]">
              <Icon size={22} />
            </span>
            <h3 className="font-display font-semibold text-lg tracking-[-0.015em] text-[#2C2763] mb-1.5">
              {title}
            </h3>
            <p className="text-sm text-neutral-600 leading-relaxed">{text}</p>
          </div>
        ))}
      </div>

      {/* "Como funciona" — signature ProBuled gradient panel */}
      <div className="relative overflow-hidden rounded-lg bg-gradient-to-br from-[#534AB7] to-[#38317E] text-white shadow-brand p-7">
        <div className="absolute -bottom-16 -right-10 w-52 h-52 rounded-full bg-[radial-gradient(circle,#63CDA6,transparent_70%)] opacity-40 blur-2xl pointer-events-none" />
        <h3 className="relative font-display font-semibold text-xl tracking-[-0.015em] flex items-center gap-2 mb-5">
          <Layers size={20} />
          Como funciona
        </h3>
        <ol className="relative space-y-4">
          {[
            "Você preenche o formulário com os dados do projeto.",
            "A ProBuled analisa e prepara uma proposta personalizada.",
            "Você revisa, aprova e o projeto começa com marcos definidos.",
          ].map((text, i) => (
            <li
              key={i}
              className="flex items-start gap-3.5 text-[0.95rem] text-white/85 leading-relaxed"
            >
              <span className="w-6 h-6 rounded-full bg-white/15 ring-1 ring-white/25 text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                {i + 1}
              </span>
              {text}
            </li>
          ))}
        </ol>
      </div>

      <div className="flex justify-end pt-2">
        <Button
          size="lg"
          onClick={onNext}
          className="bg-[#534AB7] hover:bg-[#443C9C] text-white shadow-brand font-display"
        >
          Próximo: termos
          <ArrowRight size={18} />
        </Button>
      </div>
    </div>
  );
}

function StepTermos({
  aceitos,
  onToggle,
  onBack,
  onNext,
}: {
  aceitos: boolean[];
  onToggle: (i: number) => void;
  onBack: () => void;
  onNext: () => void;
}) {
  const todos = aceitos.every(Boolean);
  const count = aceitos.filter(Boolean).length;
  return (
    <div className="space-y-8">
      {/* Header — ProBuled brand language */}
      <div className="relative">
        <div className="absolute -top-10 -right-8 w-56 h-56 rounded-full blur-[64px] opacity-30 bg-[radial-gradient(circle_at_30%_30%,#8F86DC,#534AB7)] pointer-events-none" />
        <div className="relative space-y-3">
          <span className="inline-flex items-center gap-2 text-[0.72rem] font-bold tracking-[0.16em] uppercase text-[#157E5E]">
            <ShieldCheck size={13} />
            Termos &amp; condições
          </span>
          <h2 className="font-display font-bold tracking-[-0.025em] leading-[1.1] text-[clamp(1.7rem,1.3rem+1.8vw,2.3rem)] text-[#2C2763]">
            Termos de <span className="text-grad">concordância</span>.
          </h2>
          <p className="text-[#424039] leading-relaxed max-w-[54ch]">
            Leia e confirme cada item abaixo antes de prosseguir.
          </p>
        </div>
      </div>

      {/* Term cards — purple tint when accepted */}
      <div className="space-y-3">
        {TERMOS.map((termo, i) => {
          const checked = aceitos[i];
          return (
            <label
              key={i}
              htmlFor={`termo-${i}`}
              className={cn(
                "flex items-start gap-3.5 p-4 rounded-lg border cursor-pointer transition-[border-color,background-color,box-shadow] duration-200",
                checked
                  ? "border-[#534AB7] bg-[#EEEDFE] shadow-sm"
                  : "border-[#E4E1D6] bg-white hover:border-[#B9B3ED]",
              )}
            >
              <Checkbox
                id={`termo-${i}`}
                checked={checked}
                onCheckedChange={() => onToggle(i)}
                className="mt-0.5 shrink-0 border-[#534AB7] data-[state=checked]:bg-[#534AB7] data-[state=checked]:border-[#534AB7] data-[state=checked]:text-white"
              />
              <span
                className={cn(
                  "text-sm leading-relaxed select-none",
                  checked ? "text-[#38317E]" : "text-neutral-600",
                )}
              >
                {termo}
              </span>
            </label>
          );
        })}
      </div>

      {/* Progress hint */}
      <div
        className={cn(
          "inline-flex items-center gap-2 text-xs font-semibold transition-colors",
          todos ? "text-[#157E5E]" : "text-neutral-500",
        )}
      >
        {todos && <Check size={14} />}
        {todos
          ? "Tudo confirmado, você pode prosseguir."
          : `${count} de ${TERMOS.length} termos confirmados`}
      </div>

      <div className="flex items-center justify-between gap-4">
        <Button
          variant="ghost"
          onClick={onBack}
          className="text-[#534AB7] hover:bg-[#EEEDFE] hover:text-[#443C9C]"
        >
          <ChevronLeft size={18} />
          Voltar
        </Button>
        <Button
          size="lg"
          disabled={!todos}
          onClick={onNext}
          className="bg-[#534AB7] hover:bg-[#443C9C] text-white shadow-brand font-display disabled:shadow-none"
        >
          Próximo: dados do projeto
          <ArrowRight size={18} />
        </Button>
      </div>
    </div>
  );
}

function SectionLegend({
  icon,
  children,
}: {
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <FieldLegend className="flex items-center gap-3 mb-4 text-[0.92rem] font-bold uppercase tracking-[0.16em] text-[#157E5E]">
      <span className="inline-flex items-center justify-center w-9 h-9 rounded-md bg-[#EEEDFE] text-[#534AB7]">
        {icon}
      </span>
      {children}
    </FieldLegend>
  );
}

function StepForm({
  form,
  onChange,
  onDateChange,
  onBack,
  onSubmit,
}: {
  form: FormData;
  onChange: (name: keyof FormData, value: string) => void;
  onDateChange: (date: Date | undefined) => void;
  onBack: () => void;
  onSubmit: (e: React.FormEvent) => void;
}) {
  return (
    <form onSubmit={onSubmit} className="pb-form space-y-8">
      {/* Header — ProBuled brand language */}
      <div className="relative">
        <div className="absolute -top-10 -right-8 w-56 h-56 rounded-full blur-[64px] opacity-30 bg-[radial-gradient(circle_at_30%_30%,#8F86DC,#534AB7)] pointer-events-none" />
        <div className="relative space-y-3">
          <span className="inline-flex items-center gap-2 text-[0.72rem] font-bold tracking-[0.16em] uppercase text-[#157E5E]">
            <Rocket size={13} />
            Dados do projeto
          </span>
          <h2 className="font-display font-bold tracking-[-0.025em] leading-[1.1] text-[clamp(1.7rem,1.3rem+1.8vw,2.3rem)] text-[#2C2763]">
            Conte sobre o seu <span className="text-grad">projeto</span>.
          </h2>
          <p className="text-[#424039] leading-relaxed max-w-[54ch]">
            Preencha todos os campos. Essas informações serão usadas para
            elaborar a proposta e o contrato.
          </p>
        </div>
      </div>

      <Card className="border-[#E4E1D6] p-6 sm:p-7 space-y-8">
        <FieldSet>
          <SectionLegend icon={<User size={18} />}>Identificação</SectionLegend>
          <FieldGroup className="gap-4">
            <Field>
              <FieldLabel htmlFor="razaoSocial">
                Razão Social / Nome completo
              </FieldLabel>
              <Input
                id="razaoSocial"
                placeholder="Ex: João Silva ou Silva &amp; Cia Ltda"
                required
                value={form.razaoSocial}
                onChange={(e) => onChange("razaoSocial", e.target.value)}
              />
            </Field>
            <FieldGroup className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field>
                <FieldLabel htmlFor="tipoCpfCnpj">Tipo de documento</FieldLabel>
                <Select
                  value={form.tipoCpfCnpj}
                  onValueChange={(v) => onChange("tipoCpfCnpj", v)}
                >
                  <SelectTrigger id="tipoCpfCnpj">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cpf">CPF - Pessoa física</SelectItem>
                    <SelectItem value="cnpj">CNPJ - Pessoa jurídica</SelectItem>
                  </SelectContent>
                </Select>
              </Field>
              <Field>
                <FieldLabel htmlFor="cpfCnpj">
                  {form.tipoCpfCnpj === "cpf" ? "CPF" : "CNPJ"}
                </FieldLabel>
                <Input
                  id="cpfCnpj"
                  placeholder={
                    form.tipoCpfCnpj === "cpf"
                      ? "000.000.000-00"
                      : "00.000.000/0000-00"
                  }
                  required
                  value={form.cpfCnpj}
                  onChange={(e) => {
                    const masked =
                      form.tipoCpfCnpj === "cpf"
                        ? maskCpf(e.target.value)
                        : maskCnpj(e.target.value);
                    onChange("cpfCnpj", masked);
                  }}
                />
              </Field>
            </FieldGroup>
            <Field>
              <FieldLabel htmlFor="endereco">Endereço completo</FieldLabel>
              <Input
                id="endereco"
                placeholder="Rua, número, bairro, cidade, estado, CEP"
                required
                value={form.endereco}
                onChange={(e) => onChange("endereco", e.target.value)}
              />
            </Field>
          </FieldGroup>
        </FieldSet>

        <Separator className="bg-[#E4E1D6]" />

        <FieldSet>
          <SectionLegend icon={<Mail size={18} />}>Contato</SectionLegend>
          <FieldGroup className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field>
              <FieldLabel htmlFor="telefone">Telefone</FieldLabel>
              <Input
                id="telefone"
                type="tel"
                placeholder="(11) 99999-9999"
                required
                value={form.telefone}
                onChange={(e) =>
                  onChange("telefone", maskPhone(e.target.value))
                }
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="email">E-mail</FieldLabel>
              <Input
                id="email"
                type="email"
                placeholder="seuemail@email.com"
                required
                value={form.email}
                onChange={(e) => onChange("email", e.target.value)}
              />
            </Field>
          </FieldGroup>
        </FieldSet>

        <Separator className="bg-[#E4E1D6]" />

        <FieldSet>
          <SectionLegend icon={<Layers size={18} />}>Projeto</SectionLegend>
          <FieldGroup className="gap-4">
            <Field>
              <FieldLabel htmlFor="descricaoServico">
                Descrição do serviço
              </FieldLabel>
              <Textarea
                id="descricaoServico"
                rows={4}
                placeholder="Descreva o que você precisa, funcionalidades, objetivo do projeto..."
                required
                value={form.descricaoServico}
                onChange={(e) => onChange("descricaoServico", e.target.value)}
              />
            </Field>
            <FieldGroup className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field>
                <FieldLabel htmlFor="urlSite">URL ou nome do site</FieldLabel>
                <Input
                  id="urlSite"
                  placeholder="Ex: meusite.com.br"
                  value={form.urlSite}
                  onChange={(e) => onChange("urlSite", e.target.value)}
                />
                <FieldDescription>Opcional.</FieldDescription>
              </Field>
              <Field>
                <FieldLabel htmlFor="dataEntrega">
                  Data de entrega desejada
                </FieldLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      id="dataEntrega"
                      type="button"
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !form.dataEntrega && "text-muted-foreground",
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {form.dataEntrega
                        ? format(form.dataEntrega, "PPP", { locale: ptBR })
                        : "Selecione uma data"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={form.dataEntrega}
                      onSelect={onDateChange}
                      disabled={(date) => date < new Date()}
                      autoFocus
                    />
                  </PopoverContent>
                </Popover>
              </Field>
            </FieldGroup>
          </FieldGroup>
        </FieldSet>

        <Separator className="bg-[#E4E1D6]" />

        <FieldSet>
          <SectionLegend icon={<CreditCard size={18} />}>
            Pagamento
          </SectionLegend>
          <FieldGroup className="gap-4">
            <Field>
              <FieldLabel>Forma de pagamento</FieldLabel>
              <RadioGroup
                value={form.formaPagamento}
                onValueChange={(v) =>
                  onChange("formaPagamento", v as FormData["formaPagamento"])
                }
              >
                <Field orientation="horizontal" className="gap-3">
                  <RadioGroupItem value="a-vista" id="pay-a-vista" />
                  <FieldLabel htmlFor="pay-a-vista" className="font-normal">
                    À Vista - pagamento único
                  </FieldLabel>
                </Field>
                <Field orientation="horizontal" className="gap-3">
                  <RadioGroupItem value="parcelado" id="pay-parcelado" />
                  <FieldLabel htmlFor="pay-parcelado" className="font-normal">
                    Parcelado - 30% de entrada + parcelas
                  </FieldLabel>
                </Field>
              </RadioGroup>
            </Field>

            {form.formaPagamento === "parcelado" && (
              <Field>
                <FieldLabel htmlFor="numeroParcelas">
                  Número de parcelas
                </FieldLabel>
                <Select
                  value={form.numeroParcelas}
                  onValueChange={(v) =>
                    onChange("numeroParcelas", v as FormData["numeroParcelas"])
                  }
                >
                  <SelectTrigger id="numeroParcelas" className="sm:w-[280px]">
                    <SelectValue placeholder="Selecione o número de parcelas" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">
                      1 parcela - 30% + 70% na entrega
                    </SelectItem>
                    <SelectItem value="2">
                      2 parcelas - 30% + 35% + 35%
                    </SelectItem>
                  </SelectContent>
                </Select>
              </Field>
            )}
          </FieldGroup>
        </FieldSet>
      </Card>

      {/* Email notice — signature ProBuled two-tone panel */}
      <div className="overflow-hidden rounded-lg border border-[#D9D6F6] shadow-sm">
        <div className="flex items-center gap-2.5 px-5 py-3.5 bg-gradient-to-r from-[#534AB7] to-[#443C9C]">
          <Mail size={17} className="text-white shrink-0" />
          <p className="font-display font-semibold text-white text-sm tracking-tight">
            Contrato enviado por e-mail
          </p>
        </div>
        <div className="px-5 py-4 bg-[#EEEDFE]">
          <p className="text-sm text-[#38317E] leading-relaxed">
            Após o envio, a ProBuled analisa sua solicitação e envia o contrato
            completo para o e-mail informado. Você terá tempo para ler tudo com
            calma antes de assinar.{" "}
            <span className="font-semibold text-[#534AB7]">
              Nenhum pagamento é cobrado sem sua aprovação.
            </span>
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between gap-4">
        <Button
          variant="ghost"
          onClick={onBack}
          type="button"
          className="text-[#534AB7] hover:bg-[#EEEDFE] hover:text-[#443C9C]"
        >
          <ChevronLeft size={18} />
          Voltar
        </Button>
        <Button
          size="lg"
          type="submit"
          className="bg-[#534AB7] hover:bg-[#443C9C] text-white shadow-brand font-display"
        >
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
      <div className="w-20 h-20 rounded-full bg-secondary flex items-center justify-center mb-6">
        <CheckCircle size={40} className="text-foreground" />
      </div>
      <h1 className="text-3xl font-semibold tracking-tight">
        Proposta enviada!
      </h1>
      <p className="mt-3 text-muted-foreground max-w-[40ch] mx-auto">
        A ProBuled vai analisar seu projeto e responder em até 1 dia útil com um
        plano e cronograma.
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
  const [step, setStep] = useState<Step>(1);
  const [termosAceitos, setTermosAceitos] = useState([
    false,
    false,
    false,
    false,
  ]);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState<FormData>({
    razaoSocial: "",
    tipoCpfCnpj: "cpf",
    cpfCnpj: "",
    endereco: "",
    telefone: "",
    email: "",
    descricaoServico: "",
    urlSite: "",
    dataEntrega: undefined,
    formaPagamento: "",
    numeroParcelas: "",
  });

  function onChange(name: keyof FormData, value: string) {
    setForm((f) => {
      if (name === "tipoCpfCnpj")
        return { ...f, tipoCpfCnpj: value as "cpf" | "cnpj", cpfCnpj: "" };
      return { ...f, [name]: value };
    });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.formaPagamento) return;
    if (form.formaPagamento === "parcelado" && !form.numeroParcelas) return;

    const parcelas =
      form.formaPagamento === "parcelado"
        ? `Número de Parcelas: ${form.numeroParcelas}\n`
        : "";
    const body = [
      `Razão Social / Nome: ${form.razaoSocial}`,
      `${form.tipoCpfCnpj.toUpperCase()}: ${form.cpfCnpj}`,
      `Endereço: ${form.endereco}`,
      `Telefone: ${form.telefone}`,
      `E-mail: ${form.email}`,
      `Descrição do serviço: ${form.descricaoServico}`,
      `URL / Nome do site: ${form.urlSite || "Não definida"}`,
      `Data de entrega: ${form.dataEntrega ? format(form.dataEntrega, "dd/MM/yyyy") : "Não definida"}`,
      `Forma de pagamento: ${form.formaPagamento === "a-vista" ? "À Vista" : "Parcelado (30% entrada + parcelas)"}`,
      parcelas,
    ]
      .filter(Boolean)
      .join("\n");

    window.location.href = `mailto:probuled@gmail.com?subject=${encodeURIComponent(`Novo Projeto – ${form.razaoSocial}`)}&body=${encodeURIComponent(body)}`;
    setSubmitted(true);
  }

  return (
    <main className="shadcn-scope min-h-screen bg-background text-foreground">
      <header className="flex justify-center py-6 border-b">
        <a
          href="/"
          className="flex items-center gap-[0.7rem] font-semibold text-xl tracking-tight"
        >
          <img
            src="/assets/logo/probuled-mark.png"
            alt="ProBuled"
            className="w-[38px] h-[38px] rounded-md"
          />
          <span>ProBuled</span>
        </a>
      </header>

      {submitted ? (
        <SuccessState />
      ) : (
        <div className="w-full max-w-[720px] mx-auto px-[clamp(1.25rem,4vw,2rem)] py-[clamp(2.5rem,5vw,4rem)]">
          <div className="mb-10">
            <a
              href="/"
              className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
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
              onToggle={(i) =>
                setTermosAceitos((v) =>
                  v.map((val, idx) => (idx === i ? !val : val)),
                )
              }
              onBack={() => setStep(1)}
              onNext={() => setStep(3)}
            />
          )}
          {step === 3 && (
            <StepForm
              form={form}
              onChange={onChange}
              onDateChange={(date) =>
                setForm((f) => ({ ...f, dataEntrega: date }))
              }
              onBack={() => setStep(2)}
              onSubmit={handleSubmit}
            />
          )}
        </div>
      )}
    </main>
  );
}
