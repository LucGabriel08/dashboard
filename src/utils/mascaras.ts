export function mascararTelefone(valor: string): string {
  const apenasNumeros = valor.replace(/\D/g, "");
  const numerosLimitados = apenasNumeros.slice(0, 11);

  if (numerosLimitados.length <= 2) {
    return numerosLimitados.replace(/(\d{0,2})/, "($1");
  }

  if (numerosLimitados.length <= 7) {
    return numerosLimitados.replace(/(\d{2})(\d{0,5})/, "($1) $2");
  }

  return numerosLimitados.replace(/(\d{2})(\d{5})(\d{0,4})/, "($1) $2-$3");
}
