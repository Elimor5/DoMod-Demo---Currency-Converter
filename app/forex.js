
$l("button").on("click",() => {

  const targetUrl = 'http://api.fixer.io/latest?base=USD';
  $l.ajax({type: 'GET', url: targetUrl})
    .then((response) => console.log(response))
    .catch((error) => console.log(error.status, error.statusText))



});
