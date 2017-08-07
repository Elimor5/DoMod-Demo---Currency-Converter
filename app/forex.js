let counted = 0;
//

//Add a Dates accurate as of...
  $l(".all").on("click",() => {
    $l("#chart").empty();
    const denomination = $l(".curr-denom").htmlElements[0].value;
    const targetUrl = `https://api.fixer.io/latest?base=${denomination}`;

    $l.ajax({type:'GET', url: targetUrl})
      .then((response) =>{
        // counted++;
        const obj = JSON.parse(response);
        // const currencies = Object.keys(obj.rates);
        // console.log(currencies);
        //
        $l("#chart-title").html(`1 ${denomination} =`);
        currencies.forEach((currency) => {
          if (currency === denomination) {
            $l("#chart").append(`<li>${currency}: 1.00</li>`);
          } else {
            $l("#chart").append(`<li>${currency}: ${obj.rates[currency]}</li>`);
          }
          // $l("#chart").append(`<li>"${currency}",</li>`);
        });

        $l("#footer").html(`All prices are accurate as of ${obj.date}. Prices are updated daily at 11:00 AM EST.
           Data provided using fixer.io currency conversion API`);
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
    $l("#comparison").empty();
    const mainCurrency = $l(".pri-curr").htmlElements[0].value;
    const comparedCurrency = $l(".sec-curr").htmlElements[0].value;

    if ((mainCurrency === comparedCurrency) && mainCurrency !== "Select a currency"){
        $l("#comparison").append(`<li class="compare-result">1 ${mainCurrency} = 1 ${mainCurrency}</li>`);
    } else if (mainCurrency !== "Select a currency" && comparedCurrency !== "Select a currency") {
      compareCurrencies(mainCurrency, comparedCurrency);
    }
  });


  function compareCurrencies(mainCurrency, comparedCurrency) {
    const targetUrl = `https://api.fixer.io/latest?base=${mainCurrency}`;

    $l.ajax({type: "GET", url: targetUrl,})
      .then((response) => {
        obj = JSON.parse(response);
        const comparedRate = obj.rates[comparedCurrency];
        $l("#comparison").append(`<li class="compare-result">1 ${mainCurrency} = ${comparedRate} ${comparedCurrency}</li>`);
        $l("#comparison").append(`<button class="swap"><i class="fa fa-exchange" aria-hidden="true"></i></button>`);
      }).then(() => {
        $l(".swap").on("click",() => {
          $l(comparison).empty();
          compareCurrencies(comparedCurrency, mainCurrency);
        });
      });

  }

  $l(".curr-denom").find("[value='USD']").attr("selected","selected");
