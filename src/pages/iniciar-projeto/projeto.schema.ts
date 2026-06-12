import { z } from "zod";

/** Remove tudo que não for dígito. */
function onlyDigits(value: string): string {
  return value.replace(/\D/g, "");
}

/** Validação de CPF com dígitos verificadores. */
export function isValidCPF(value: string): boolean {
  const cpf = onlyDigits(value);
  if (cpf.length !== 11) return false;
  // Rejeita sequências repetidas (000.000.000-00, etc).
  if (/^(\d)\1{10}$/.test(cpf)) return false;

  let sum = 0;
  for (let i = 0; i < 9; i++) sum += Number(cpf[i]) * (10 - i);
  let check = (sum * 10) % 11;
  if (check === 10) check = 0;
  if (check !== Number(cpf[9])) return false;

  sum = 0;
  for (let i = 0; i < 10; i++) sum += Number(cpf[i]) * (11 - i);
  check = (sum * 10) % 11;
  if (check === 10) check = 0;
  return check === Number(cpf[10]);
}

/** Validação de CNPJ com dígitos verificadores. */
export function isValidCNPJ(value: string): boolean {
  const cnpj = onlyDigits(value);
  if (cnpj.length !== 14) return false;
  if (/^(\d)\1{13}$/.test(cnpj)) return false;

  const digit = (length: number): number => {
    const weights =
      length === 12
        ? [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]
        : [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
    let sum = 0;
    for (let i = 0; i < length; i++) sum += Number(cnpj[i]) * weights[i];
    const rest = sum % 11;
    return rest < 2 ? 0 : 11 - rest;
  };

  if (digit(12) !== Number(cnpj[12])) return false;
  return digit(13) === Number(cnpj[13]);
}

/** Antecedência mínima para a data de entrega, em dias. */
export const MIN_DELIVERY_DAYS = 14;

/** Primeira data de entrega permitida (hoje + MIN_DELIVERY_DAYS, à meia-noite). */
export function minDeliveryDate(): Date {
  const date = new Date();
  date.setHours(0, 0, 0, 0);
  date.setDate(date.getDate() + MIN_DELIVERY_DAYS);
  return date;
}

/** Telefone fixo (10 dígitos) ou celular (11 dígitos). */
function isValidPhone(value: string): boolean {
  const digits = onlyDigits(value);
  return digits.length === 10 || digits.length === 11;
}

export const projetoSchema = z
  .object({
    razaoSocial: z
      .string()
      .trim()
      .min(3, "Informe ao menos 3 caracteres.")
      .max(120, "Máximo de 120 caracteres."),
    tipoCpfCnpj: z.enum(["cpf", "cnpj"]),
    cpfCnpj: z.string().trim().min(1, "Campo obrigatório."),
    endereco: z
      .string()
      .trim()
      .min(5, "Informe o endereço completo.")
      .max(200, "Máximo de 200 caracteres."),
    telefone: z
      .string()
      .trim()
      .refine(isValidPhone, "Telefone inválido. Use DDD + número."),
    email: z
      .email("E-mail inválido.")
      .max(160, "Máximo de 160 caracteres."),
    descricaoServico: z
      .string()
      .trim()
      .min(10, "Descreva com ao menos 10 caracteres.")
      .max(2000, "Máximo de 2000 caracteres."),
    urlSite: z.string().trim().max(200, "Máximo de 200 caracteres."),
    dataEntrega: z.date({ error: "Selecione uma data de entrega." }),
    formaPagamento: z.enum(["a-vista", "parcelado"], {
      error: "Selecione a forma de pagamento.",
    }),
    numeroParcelas: z.union([z.enum(["1", "2"]), z.literal("")]),
  })
  .superRefine((data, ctx) => {
    // CPF/CNPJ — valida de acordo com o tipo escolhido.
    if (data.tipoCpfCnpj === "cpf" && !isValidCPF(data.cpfCnpj)) {
      ctx.addIssue({
        code: "custom",
        path: ["cpfCnpj"],
        message: "CPF inválido.",
      });
    }
    if (data.tipoCpfCnpj === "cnpj" && !isValidCNPJ(data.cpfCnpj)) {
      ctx.addIssue({
        code: "custom",
        path: ["cpfCnpj"],
        message: "CNPJ inválido.",
      });
    }

    // Data de entrega exige no mínimo 14 dias de antecedência.
    if (data.dataEntrega < minDeliveryDate()) {
      ctx.addIssue({
        code: "custom",
        path: ["dataEntrega"],
        message: "A data deve ter no mínimo 14 dias de antecedência.",
      });
    }

    // Número de parcelas é obrigatório quando parcelado.
    if (
      data.formaPagamento === "parcelado" &&
      data.numeroParcelas !== "1" &&
      data.numeroParcelas !== "2"
    ) {
      ctx.addIssue({
        code: "custom",
        path: ["numeroParcelas"],
        message: "Selecione o número de parcelas.",
      });
    }
  });

export type ProjetoInput = z.infer<typeof projetoSchema>;
export type ProjetoFieldErrors = Partial<
  Record<keyof ProjetoInput, string>
>;
