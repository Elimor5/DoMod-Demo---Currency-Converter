let counted = 0;

  $l(".all").on("click",() => {
    $l("#chart").empty();
    const denomination = $l(".curr-denom").htmlElements[0].value;
    const targetUrl = `http://api.fixer.io/latest?base=${denomination}`;

    $l.ajax({type: 'GET', url: targetUrl})
      .then((response) =>{
        counted++;
        const obj = JSON.parse(response);
        // const currencies = Object.keys(obj.rates);
        console.log(currencies);
        currencies.forEach((currency) => {
          if (currency === denomination) {
            $l("#chart").append(`<li>${currency}: 1.00</li>`);
          } else {
            $l("#chart").append(`<li>${currency}: ${obj.rates[currency]}</li>`);
          }

          // $l("#chart").append(`<li>"${currency}",</li>`);
        });
      });
  });

  const currencies = ["USD","EUR","AUD", "BGN", "BRL", "CAD", "CHF", "CNY", "CZK", "DKK", "GBP",
  "HKD", "HRK", "HUF", "IDR", "ILS", "INR", "JPY", "KRW", "MXN", "MYR", "NOK", "NZD",
  "PHP", "PLN", "RON", "RUB", "SEK", "SGD", "THB", "TRY", "ZAR"];

  $l("select").htmlElements.forEach((dropdown) => {
    $l(dropdown).append("<option selected disabled>Select a currency</option>");
    currencies.forEach((currency,idx) => {
      $l(dropdown).append(`<option value=${currency}>${currency}</option>`);
    });
  });


  $l("select").on("change",() => {
    $l("#chart").empty();
    const mainCurrency = $l(".pri-curr").htmlElements[0].value;
    const comparedCurrency = $l(".sec-curr").htmlElements[0].value;

    if ((mainCurrency === comparedCurrency) && mainCurrency !== "Select a currency"){
        $l("#chart").append(`<li>1 ${mainCurrency} = 1 ${mainCurrency}</li>`);
    } else if (mainCurrency !== "Select a currency" && comparedCurrency !== "Select a currency") {
      compareCurrencies(mainCurrency, comparedCurrency);
    }
  });


  function compareCurrencies(mainCurrency, comparedCurrency) {
    const targetUrl = `http://api.fixer.io/latest?base=${mainCurrency}`;

    $l.ajax({type: "GET", url: targetUrl,})
      .then((response) => {
        obj = JSON.parse(response);
        const comparedRate = obj.rates[comparedCurrency];
        $l("#chart").append(`<li>1 ${mainCurrency} = ${comparedRate} ${comparedCurrency}</li>`);
        $l("#chart").append(`<button class="swap">swap</button>`);
      }).then(() => {
        $l(".swap").on("click",() => {
          $l(chart).empty();
          compareCurrencies(comparedCurrency, mainCurrency);
        });
      });

  }

  $l(".curr-denom").find("[value='USD']").attr("selected","selected");
