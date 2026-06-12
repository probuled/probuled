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
  Loader2,
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
  FieldError,
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
import {
  projetoSchema,
  minDeliveryDate,
  type ProjetoFieldErrors,
} from "./projeto.schema";
import { SOCIAL_NETWORKS } from "@/widgets/social-follow/social-follow.constants";
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

function Req() {
  return (
    <span className="text-red-500" aria-hidden="true">
      {" *"}
    </span>
  );
}

function StepForm({
  form,
  errors,
  sending,
  sendError,
  onChange,
  onDateChange,
  onBack,
  onSubmit,
}: {
  form: FormData;
  errors: ProjetoFieldErrors;
  sending: boolean;
  sendError: string | null;
  onChange: (name: keyof FormData, value: string) => void;
  onDateChange: (date: Date | undefined) => void;
  onBack: () => void;
  onSubmit: (e: React.FormEvent) => void;
}) {
  return (
    <form onSubmit={onSubmit} noValidate className="pb-form space-y-8">
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
                <Req />
              </FieldLabel>
              <Input
                id="razaoSocial"
                placeholder="Ex: João Silva ou Silva &amp; Cia Ltda"
                required
                aria-invalid={!!errors.razaoSocial}
                value={form.razaoSocial}
                onChange={(e) => onChange("razaoSocial", e.target.value)}
              />
              <FieldError>{errors.razaoSocial}</FieldError>
            </Field>
            <FieldGroup className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field>
                <FieldLabel htmlFor="tipoCpfCnpj">
                  Tipo de documento
                  <Req />
                </FieldLabel>
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
                  <Req />
                </FieldLabel>
                <Input
                  id="cpfCnpj"
                  placeholder={
                    form.tipoCpfCnpj === "cpf"
                      ? "000.000.000-00"
                      : "00.000.000/0000-00"
                  }
                  required
                  aria-invalid={!!errors.cpfCnpj}
                  value={form.cpfCnpj}
                  onChange={(e) => {
                    const masked =
                      form.tipoCpfCnpj === "cpf"
                        ? maskCpf(e.target.value)
                        : maskCnpj(e.target.value);
                    onChange("cpfCnpj", masked);
                  }}
                />
                <FieldError>{errors.cpfCnpj}</FieldError>
              </Field>
            </FieldGroup>
            <Field>
              <FieldLabel htmlFor="endereco">
                Endereço completo
                <Req />
              </FieldLabel>
              <Input
                id="endereco"
                placeholder="Rua, número, bairro, cidade, estado, CEP"
                required
                aria-invalid={!!errors.endereco}
                value={form.endereco}
                onChange={(e) => onChange("endereco", e.target.value)}
              />
              <FieldError>{errors.endereco}</FieldError>
            </Field>
          </FieldGroup>
        </FieldSet>

        <Separator className="bg-[#E4E1D6]" />

        <FieldSet>
          <SectionLegend icon={<Mail size={18} />}>Contato</SectionLegend>
          <FieldGroup className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field>
              <FieldLabel htmlFor="telefone">
                Telefone
                <Req />
              </FieldLabel>
              <Input
                id="telefone"
                type="tel"
                placeholder="(11) 99999-9999"
                required
                aria-invalid={!!errors.telefone}
                value={form.telefone}
                onChange={(e) =>
                  onChange("telefone", maskPhone(e.target.value))
                }
              />
              <FieldError>{errors.telefone}</FieldError>
            </Field>
            <Field>
              <FieldLabel htmlFor="email">
                E-mail
                <Req />
              </FieldLabel>
              <Input
                id="email"
                type="email"
                placeholder="seuemail@email.com"
                required
                aria-invalid={!!errors.email}
                value={form.email}
                onChange={(e) => onChange("email", e.target.value)}
              />
              <FieldError>{errors.email}</FieldError>
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
                <Req />
              </FieldLabel>
              <Textarea
                id="descricaoServico"
                rows={4}
                placeholder="Descreva o que você precisa, funcionalidades, objetivo do projeto..."
                required
                aria-invalid={!!errors.descricaoServico}
                value={form.descricaoServico}
                onChange={(e) => onChange("descricaoServico", e.target.value)}
              />
              <FieldError>{errors.descricaoServico}</FieldError>
            </Field>
            <FieldGroup className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field>
                <FieldLabel htmlFor="urlSite">
                  URL ou nome do site
                  <span className="font-normal text-muted-foreground">
                    {" (Opcional)"}
                  </span>
                </FieldLabel>
                <Input
                  id="urlSite"
                  placeholder="Ex: meusite.com.br"
                  aria-invalid={!!errors.urlSite}
                  value={form.urlSite}
                  onChange={(e) => onChange("urlSite", e.target.value)}
                />
                <FieldError>{errors.urlSite}</FieldError>
              </Field>
              <Field>
                <FieldLabel htmlFor="dataEntrega">
                  Data de entrega desejada
                  <Req />
                </FieldLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      id="dataEntrega"
                      type="button"
                      variant="outline"
                      aria-invalid={!!errors.dataEntrega}
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !form.dataEntrega && "text-muted-foreground",
                        errors.dataEntrega &&
                          "border-destructive focus-visible:ring-destructive",
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
                      disabled={(date) => date < minDeliveryDate()}
                      autoFocus
                    />
                  </PopoverContent>
                </Popover>
                <FieldError>{errors.dataEntrega}</FieldError>
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
              <FieldLabel>
                Forma de pagamento
                <Req />
              </FieldLabel>
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
              <FieldError>{errors.formaPagamento}</FieldError>
            </Field>

            {form.formaPagamento === "parcelado" && (
              <Field>
                <FieldLabel htmlFor="numeroParcelas">
                  Número de parcelas
                  <Req />
                </FieldLabel>
                <Select
                  value={form.numeroParcelas}
                  onValueChange={(v) =>
                    onChange("numeroParcelas", v as FormData["numeroParcelas"])
                  }
                >
                  <SelectTrigger
                    id="numeroParcelas"
                    className="sm:w-[280px]"
                    aria-invalid={!!errors.numeroParcelas}
                  >
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
                <FieldError>{errors.numeroParcelas}</FieldError>
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

      {sendError && (
        <div
          role="alert"
          className="rounded-lg border border-destructive/40 bg-destructive/5 px-4 py-3 text-sm text-destructive"
        >
          {sendError}
        </div>
      )}

      <div className="flex items-center justify-between gap-4">
        <Button
          variant="ghost"
          onClick={onBack}
          type="button"
          disabled={sending}
          className="text-[#534AB7] hover:bg-[#EEEDFE] hover:text-[#443C9C]"
        >
          <ChevronLeft size={18} />
          Voltar
        </Button>
        <Button
          size="lg"
          type="submit"
          disabled={sending}
          className="bg-[#534AB7] hover:bg-[#443C9C] text-white shadow-brand font-display disabled:opacity-70"
        >
          {sending ? (
            <>
              <Loader2 size={18} className="animate-spin" />
              Enviando...
            </>
          ) : (
            <>
              Enviar proposta
              <ArrowRight size={18} />
            </>
          )}
        </Button>
      </div>
    </form>
  );
}

function SuccessState() {
  return (
    <div className="shadcn-scope py-20 flex flex-col items-center text-center max-w-[520px] mx-auto px-[clamp(1.25rem,4vw,2rem)]">
      <div className="w-20 h-20 rounded-full bg-[#E3F5EE] flex items-center justify-center mb-6 ring-8 ring-[#EDF9F4]">
        <CheckCircle size={40} className="text-[#1D9E75]" />
      </div>
      <h1 className="font-display font-bold tracking-[-0.025em] text-[clamp(1.7rem,1.3rem+1.8vw,2.3rem)] text-[#2C2763]">
        Email enviado!
      </h1>

      <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-[#D9D6F6] bg-[#EEEDFE] px-4 py-2 text-sm text-[#38317E]">
        <Mail size={16} className="text-[#534AB7]" />
        Enviado para:{" "}
        <span className="font-semibold text-[#534AB7]">probuled@gmail.com</span>
      </div>

      <p className="mt-5 text-[#424039] leading-relaxed max-w-[42ch]">
        Recebemos os dados do seu projeto. A ProBuled vai analisar e responder
        em até 1 dia útil com plano, cronograma e proposta detalhada.
      </p>

      {/* Mais contato — redes sociais */}
      <div className="mt-10 w-full">
        <p className="text-[0.72rem] font-bold uppercase tracking-[0.16em] text-[#157E5E] mb-4">
          Para mais contato
        </p>
        <div className="flex items-center justify-center gap-3">
          {SOCIAL_NETWORKS.map(({ label, href, Icon, theme }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              title={label}
              className="group inline-flex items-center justify-center w-12 h-12 rounded-xl border bg-white shadow-sm transition-[transform,box-shadow] duration-200 hover:-translate-y-1 hover:shadow-md"
              style={{ borderColor: theme.borderColor }}
            >
              <Icon
                size={22}
                style={{ color: theme.ctaColor }}
                className="transition-transform group-hover:scale-110"
              />
            </a>
          ))}
        </div>
      </div>

      <div className="mt-10">
        <Button
          asChild
          className="bg-[#534AB7] hover:bg-[#443C9C] text-white shadow-brand font-display"
        >
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
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState<string | null>(null);
  const [errors, setErrors] = useState<ProjetoFieldErrors>({});
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

  function clearError(name: keyof FormData) {
    setErrors((prev) => {
      if (!prev[name]) return prev;
      const next = { ...prev };
      delete next[name];
      return next;
    });
  }

  function onChange(name: keyof FormData, value: string) {
    clearError(name);
    if (name === "tipoCpfCnpj") clearError("cpfCnpj");
    setForm((f) => {
      if (name === "tipoCpfCnpj")
        return { ...f, tipoCpfCnpj: value as "cpf" | "cnpj", cpfCnpj: "" };
      return { ...f, [name]: value };
    });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const result = projetoSchema.safeParse(form);
    if (!result.success) {
      const fieldErrors: ProjetoFieldErrors = {};
      for (const issue of result.error.issues) {
        const key = issue.path[0];
        if (typeof key === "string" && !fieldErrors[key as keyof FormData]) {
          fieldErrors[key as keyof FormData] = issue.message;
        }
      }
      setErrors(fieldErrors);
      return;
    }

    setErrors({});
    const data = result.data;

    const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;
    if (!accessKey) {
      setSendError(
        "Envio não configurado. Defina VITE_WEB3FORMS_ACCESS_KEY no .env.",
      );
      return;
    }

    const documento = data.tipoCpfCnpj.toUpperCase();
    const formaPagamento =
      data.formaPagamento === "a-vista"
        ? "À Vista (pagamento único)"
        : `Parcelado em ${data.numeroParcelas}x (30% de entrada + parcelas)`;
    const dataEntrega = format(data.dataEntrega, "dd 'de' MMMM 'de' yyyy", {
      locale: ptBR,
    });

    const mensagem = `Olá ProBuled, você tem mais um cliente querendo iniciar um projeto!

O cliente ${data.razaoSocial} (${documento}: ${data.cpfCnpj}) preencheu o formulário e quer tirar a ideia do papel.

Aqui estão os dados para você preparar a proposta:

Cliente: ${data.razaoSocial}
${documento}: ${data.cpfCnpj}
Endereço: ${data.endereco}
Telefone: ${data.telefone}
E-mail: ${data.email}
Site: ${data.urlSite || "Não informado"}
Data de entrega desejada: ${dataEntrega}
Forma de pagamento: ${formaPagamento}

O que ele precisa:
${data.descricaoServico}

Entre em contato em até 1 dia útil para enviar o plano e a proposta. Para responder, é só usar o e-mail do cliente acima.`;

    const payload = {
      access_key: accessKey,
      subject: `Novo cliente quer iniciar um projeto — ${data.razaoSocial}`,
      from_name: "ProBuled — Iniciar projeto",
      replyto: data.email,
      message: mensagem,
    };

    setSending(true);
    setSendError(null);
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });
      const json = (await res.json()) as { success: boolean; message?: string };
      if (!res.ok || !json.success) {
        throw new Error(json.message ?? "Falha no envio");
      }
      setSubmitted(true);
    } catch {
      setSendError(
        "Não foi possível enviar agora. Verifique sua conexão e tente novamente.",
      );
    } finally {
      setSending(false);
    }
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
              errors={errors}
              sending={sending}
              sendError={sendError}
              onChange={onChange}
              onDateChange={(date) => {
                clearError("dataEntrega");
                setForm((f) => ({ ...f, dataEntrega: date }));
              }}
              onBack={() => setStep(2)}
              onSubmit={handleSubmit}
            />
          )}
        </div>
      )}
    </main>
  );
}
