async function buscarCotacoes() {
  const url = "https://economia.awesomeapi.com.br/json/last/USD-BRL,EUR-BRL";
  const erroElemento = document.getElementById("erro");

  try {
    erroElemento.textContent = "🔄 Atualizando...";
    const resposta = await fetch(url);

    if (!resposta.ok) throw new Error("Erro ao buscar dados");

    const dados = await resposta.json();

    // Dólar
    const dolar = dados.USDBRL;
    document.getElementById("valorDolar").textContent = `R$ ${parseFloat(dolar.bid).toFixed(2)}`;
    document.getElementById("variacaoDolar").textContent = `${parseFloat(dolar.pctChange).toFixed(2)}%`;
    document.getElementById("variacaoDolar").className =
      dolar.pctChange > 0 ? "variacaoPositiva" : "variacaoNegativa";

    // Euro
    const euro = dados.EURBRL;
    document.getElementById("valorEuro").textContent = `R$ ${parseFloat(euro.bid).toFixed(2)}`;
    document.getElementById("variacaoEuro").textContent = `${parseFloat(euro.pctChange).toFixed(2)}%`;
    document.getElementById("variacaoEuro").className =
      euro.pctChange > 0 ? "variacaoPositiva" : "variacaoNegativa";

    erroElemento.textContent = "";
  } catch (erro) {
    erroElemento.textContent = "⚠️ Falha ao carregar as cotações. Tente novamente.";
  }
}

// Ele atualiza ao carregar e a cada 30 segundos
buscarCotacoes();
setInterval(buscarCotacoes, 30000);

