

// VECTOR PARA GUARDAR LOS MOVIMIENTOS

let movimientos = [];

// SALDO INICIAL

let saldo = 0;

// ==========================================
// REALIZAR DEPOSITO O RETIRO
// ==========================================

document.getElementById("btn-realizar").addEventListener("click", function () {

    let operacion = document.getElementById("ld-id-operacion").value;

    let monto = Number(document.getElementById("txt-id-monto").value);

    // VALIDAR TIPO DE OPERACION

    if (operacion === "") {

        alert("Seleccione una operacion.");

        return;

    }

    // VALIDAR MONTO

    if (!Number.isFinite(monto) || monto <= 0) {

        alert("Ingrese un monto mayor que cero.");

        return;

    }

    // UTILIZAR SWITCH PARA DETERMINAR LA OPERACION

    switch (operacion) {

        // ==================================
        // CASO DEPOSITO
        // ==================================

        case "deposito":

            saldo = saldo + monto;

            // GUARDAR MOVIMIENTO EN EL VECTOR

            movimientos.push({

                tipo: "Deposito",

                monto: monto,

                saldo: saldo

            });

            document.getElementById("mensaje-banco").textContent =
                "Deposito realizado correctamente.";

            break;


        // ==================================
        // CASO RETIRO
        // ==================================

        case "retiro":

            // VERIFICAR SI EXISTE SALDO SUFICIENTE

            if (monto > saldo) {

                alert("Saldo insuficiente. No puede realizar el retiro.");

                document.getElementById("mensaje-banco").textContent =
                    "Operacion rechazada por falta de saldo.";

                return;

            } else {

                saldo = saldo - monto;

                // GUARDAR MOVIMIENTO EN EL VECTOR

                movimientos.push({

                    tipo: "Retiro",

                    monto: monto,

                    saldo: saldo

                });

                document.getElementById("mensaje-banco").textContent =
                    "Retiro realizado correctamente.";

            }

            break;


        default:

            alert("Operacion no valida.");

            return;

    }

    // ACTUALIZAR TABLA Y RESULTADOS

    mostrarMovimientos();

    calcularResumen();

    // LIMPIAR CAMPOS

    document.getElementById("ld-id-operacion").value = "";

    document.getElementById("txt-id-monto").value = "";

});


// ==========================================
// MOSTRAR HISTORIAL DE MOVIMIENTOS
// ==========================================

function mostrarMovimientos() {

    let tabla = document.getElementById("detalle-movimientos");

    tabla.innerHTML = "";

    // VALIDAR SI EXISTEN MOVIMIENTOS

    if (movimientos.length === 0) {

        tabla.innerHTML = `
            <tr>
                <td colspan="4" align="center">
                    No existen movimientos registrados
                </td>
            </tr>
        `;

        return;

    }

    // RECORRER EL VECTOR CON FOR

    for (let i = 0; i < movimientos.length; i++) {

        let fila = document.createElement("tr");

        fila.innerHTML = `

            <td align="center">${i + 1}</td>

            <td>${movimientos[i].tipo}</td>

            <td align="right">
                $${movimientos[i].monto.toFixed(2)}
            </td>

            <td align="right">
                $${movimientos[i].saldo.toFixed(2)}
            </td>

        `;

        tabla.appendChild(fila);

    }

}


// ==========================================
// CALCULAR RESUMEN BANCARIO
// ==========================================

function calcularResumen() {

    let totalDepositado = 0;

    let totalRetirado = 0;

    let cantidadDepositos = 0;

    let cantidadRetiros = 0;

    let sumaMovimientos = 0;

    let mayorMovimiento = 0;

    let tipoMayorMovimiento = "-";

    // RECORRER EL VECTOR UTILIZANDO WHILE

    let i = 0;

    while (i < movimientos.length) {

        let movimiento = movimientos[i];

        sumaMovimientos = sumaMovimientos + movimiento.monto;

        // IDENTIFICAR EL TIPO DE MOVIMIENTO

        if (movimiento.tipo === "Deposito") {

            totalDepositado = totalDepositado + movimiento.monto;

            cantidadDepositos++;

        } else if (movimiento.tipo === "Retiro") {

            totalRetirado = totalRetirado + movimiento.monto;

            cantidadRetiros++;

        }

        // IDENTIFICAR EL MOVIMIENTO DE MAYOR VALOR

        if (movimiento.monto > mayorMovimiento) {

            mayorMovimiento = movimiento.monto;

            tipoMayorMovimiento = movimiento.tipo;

        }

        i++;

    }

    // ======================================
    // CALCULAR PROMEDIO
    // ======================================

    let promedio = 0;

    if (movimientos.length > 0) {

        promedio = sumaMovimientos / movimientos.length;

    } else {

        promedio = 0;

    }

    // ======================================
    // MOSTRAR RESULTADOS
    // ======================================

    document.getElementById("txt-id-depositado").value =
        totalDepositado.toFixed(2);

    document.getElementById("txt-id-retirado").value =
        totalRetirado.toFixed(2);

    document.getElementById("txt-id-saldo").value =
        saldo.toFixed(2);

    // ======================================
    // MOSTRAR ESTADISTICAS
    // ======================================

    document.getElementById("txt-id-numero-movimientos").value =
        movimientos.length;

    document.getElementById("txt-id-promedio").value =
        promedio.toFixed(2);

    document.getElementById("txt-id-cantidad-depositos").value =
        cantidadDepositos;

    document.getElementById("txt-id-cantidad-retiros").value =
        cantidadRetiros;

    document.getElementById("txt-id-mayor-movimiento").value =
        movimientos.length > 0
            ? tipoMayorMovimiento + " ($" + mayorMovimiento.toFixed(2) + ")"
            : "-";

}


// ==========================================
// REINICIAR CUENTA BANCARIA
// ==========================================

document.getElementById("btn-reiniciar").addEventListener("click", function () {

    let confirmar = confirm("¿Esta seguro de reiniciar la cuenta bancaria?");

    if (confirmar) {

        // VACIAR EL VECTOR

        movimientos = [];

        // RESTABLECER SALDO

        saldo = 0;

        // ACTUALIZAR TABLA Y RESULTADOS

        mostrarMovimientos();

        calcularResumen();

        // LIMPIAR CAMPOS

        document.getElementById("ld-id-operacion").value = "";

        document.getElementById("txt-id-monto").value = "";

        document.getElementById("mensaje-banco").textContent =
            "La cuenta bancaria ha sido reiniciada correctamente.";

    }

});


// ==========================================
// INICIALIZAR CAJERO BANCARIO
// ==========================================

mostrarMovimientos();

calcularResumen();
