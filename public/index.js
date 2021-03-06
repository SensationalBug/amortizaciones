let calcular = document.getElementById("calcular");
let borrar = document.getElementById("borrar");
let tabla = document.getElementById("tabla");
let pagos = document.getElementById("pagos");

borrar.onclick = () => {
  document.getElementById("periodos").value = "";
  document.getElementById("interes").value = "";
  document.getElementById("monto").value = "";

  tabla.innerHTML = "";
  pagos.innerHTML = "";
  calcular.disabled = false;
};

calcular.onclick = renta = () => {
  let periodos = document.getElementById("periodos").value;
  let interes = document.getElementById("interes").value / 100;
  let montoActual = document.getElementById("monto").value;

  if (periodos && interes && montoActual) {

    let renta = (montoActual * interes) / (1 - Math.pow(1 + interes, -periodos));

    console.log(`Renta: ${(montoActual * interes)} ${(1 - Math.pow(1 + interes, -periodos))} ${renta}`);

    periodosPor = periodos * 12;
    interesEntre = interes / 12;

    let mensualidades =
      (montoActual * (interes / 12)) /
      (1 - Math.pow(interesEntre + 1, -periodosPor));

      console.log(`Mensualidades: ${(montoActual * (interes / 12))} ${(1 - Math.pow(interesEntre + 1, -periodosPor))}`)

    pagos.textContent = roundTo(mensualidades).toLocaleString("en");

    for (let i = 1; i <= periodos; i++) {
      let interesMonetario = montoActual * interes;
      let amortizacion = renta - interesMonetario;
      let saldo = montoActual - amortizacion;

      montoActual = saldo;

      tabla.innerHTML += /* html */ `
        <tr>
          <td>${i}</td>
          <td>${roundTo(renta).toLocaleString("en")}</td>
          <td>${roundTo(interesMonetario).toLocaleString("en")}</td>
          <td>${roundTo(amortizacion).toLocaleString("en")}</td>
          <td>${roundTo(saldo).toLocaleString("en")}</td>
        </tr>
        `;
    }
    calcular.disabled = true;
  } else {
    alert("Ingresa algunos datos");
  }
};

const roundTo = (value) => {
  let power = Math.pow(10, 3);
  return Math.round(value * power) / power;
};
