


// LISTA DE PRODUCTOS DISPONIBLES

let listaProductos = [
    "Arroz",
    "Azucar",
    "Leche",
    "Pan",
    "Aceite",
    "Huevos",
    "Fideos",
    "Cafe",
    "Queso",
    "Atun"
];

// PRECIOS DE LOS PRODUCTOS

let listaPrecios = [
    2.50,  // Arroz
    1.50,  // Azucar
    1.25,  // Leche
    0.25,  // Pan
    3.50,  // Aceite
    2.75,  // Huevos
    1.00,  // Fideos
    4.50,  // Cafe
    3.25,  // Queso
    1.80   // Atun
];

// VECTORES PARA GUARDAR LA FACTURA

let productos = [];
let cantidades = [];
let precios = [];

// Vector para guardar los detalles de la factura

let facturaDetalles = [];

// ==========================================
// SELECCIONAR PRODUCTO Y MOSTRAR SU PRECIO
// ==========================================

document.getElementById("ld-id-productos").addEventListener("change", function () {

    let productoSeleccionado = this.value;
    let precioEncontrado = 0;

    // Recorrer el catalogo de productos

    for (let i = 0; i < listaProductos.length; i++) {

        if (listaProductos[i] === productoSeleccionado) {
            precioEncontrado = listaPrecios[i];
            break;
        }

    }

    document.getElementById("txt-id-precio").value =
        precioEncontrado > 0 ? precioEncontrado.toFixed(2) : "";

});


// ==========================================
// AGREGAR PRODUCTOS A LA FACTURA
// ==========================================

document.getElementById("btn-agregar").addEventListener("click", function () {

    let producto = document.getElementById("ld-id-productos").value;

    let precio = Number(document.getElementById("txt-id-precio").value);

    let cantidad = Number(document.getElementById("txt-id-cantidad").value);

    // VALIDACIONES

    if (producto === "") {
        alert("Seleccione un producto.");
        return;
    }

    if (precio <= 0 || !Number.isFinite(precio)) {
        alert("El precio no es valido.");
        return;
    }

    if (!Number.isInteger(cantidad) || cantidad <= 0) {
        alert("Ingrese una cantidad entera mayor que cero.");
        return;
    }

    // GUARDAR INFORMACION EN LOS VECTORES

    productos.push(producto);
    cantidades.push(cantidad);
    precios.push(precio);

    // GUARDAR DETALLE DE FACTURA

    facturaDetalles.push([
        producto,
        precio,
        cantidad,
        precio * cantidad
    ]);

    // ACTUALIZAR TABLA Y CALCULOS

    mostrarFactura();
    calcularFactura();

    // LIMPIAR CAMPOS

    document.getElementById("ld-id-productos").value = "";
    document.getElementById("txt-id-precio").value = "";
    document.getElementById("txt-id-cantidad").value = "";

    document.getElementById("mensaje-factura").textContent =
        "Producto agregado correctamente.";

});


// ==========================================
// MOSTRAR DETALLE DE LOS PRODUCTOS
// ==========================================

function mostrarFactura() {

    let tabla = document.getElementById("detalle-productos");

    tabla.innerHTML = "";

    if (productos.length === 0) {

        tabla.innerHTML = `
            <tr>
                <td colspan="6" align="center">
                    No hay productos agregados
                </td>
            </tr>
        `;

        return;
    }

    // CICLO FOR PARA RECORRER LOS VECTORES

    for (let i = 0; i < productos.length; i++) {

        let total = precios[i] * cantidades[i];

        let fila = document.createElement("tr");

        fila.innerHTML = `
            <td align="center">${i + 1}</td>
            <td>${productos[i]}</td>
            <td align="right">$${precios[i].toFixed(2)}</td>
            <td align="center">${cantidades[i]}</td>
            <td align="right">$${total.toFixed(2)}</td>
            <td>
                <button type="button" onclick="eliminarProducto(${i})">
                    Eliminar
                </button>
            </td>
        `;

        tabla.appendChild(fila);

    }

}


// ==========================================
// ELIMINAR PRODUCTO DE LA FACTURA
// ==========================================

function eliminarProducto(indice) {

    // ELIMINAR EL MISMO INDICE DE LOS VECTORES

    productos.splice(indice, 1);
    cantidades.splice(indice, 1);
    precios.splice(indice, 1);
    facturaDetalles.splice(indice, 1);

    mostrarFactura();
    calcularFactura();

    document.getElementById("mensaje-factura").textContent =
        "Producto eliminado correctamente.";

}


// ==========================================
// CALCULAR SUBTOTAL, IVA Y DESCUENTO
// ==========================================

function calcularFactura() {

    let subtotal = 0;
    let totalUnidades = 0;

    let maximo = 0;
    let productoMaximo = "-";

    // RECORRER LOS VECTORES CON FOR

    for (let i = 0; i < productos.length; i++) {

        let totalProducto = precios[i] * cantidades[i];

        subtotal = subtotal + totalProducto;

        totalUnidades = totalUnidades + cantidades[i];

        // IDENTIFICAR EL PRODUCTO DE MAYOR VALOR

        if (totalProducto > maximo) {

            maximo = totalProducto;
            productoMaximo = productos[i];

        }

    }

    // CALCULAR DESCUENTO

    let descuento = 0;

    if (subtotal > 20) {

        descuento = subtotal * 0.05;

    } else if (subtotal > 0 && subtotal <= 20) {

        descuento = 0;

    } else {

        descuento = 0;

    }

    // CALCULAR IVA DEL 15%

    let iva = subtotal * 0.15;

    // CALCULAR TOTAL A PAGAR

    let totalPagar = subtotal + iva - descuento;

    // MOSTRAR RESULTADOS

    document.getElementById("txt-id-subtotal").value =
        subtotal.toFixed(2);

    document.getElementById("txt-id-descuento").value =
        descuento.toFixed(2);

    document.getElementById("txt-id-iva").value =
        iva.toFixed(2);

    document.getElementById("txt-id-total-pagar").value =
        totalPagar.toFixed(2);

    // ======================================
    // ESTADISTICAS DE LA FACTURA
    // ======================================

    let promedio = 0;

    if (productos.length > 0) {

        promedio = subtotal / productos.length;

    }

    document.getElementById("total-productos").value =
        productos.length;

    document.getElementById("total-unidades").value =
        totalUnidades;

    document.getElementById("promedio-producto").value =
        promedio.toFixed(2);

    document.getElementById("maximo-producto").value =
        productos.length > 0
            ? productoMaximo + " ($" + maximo.toFixed(2) + ")"
            : "-";

}


// ==========================================
// GENERAR NUEVA FACTURA
// ==========================================

document.getElementById("btn-nueva-factura").addEventListener("click", function () {

    let confirmar = confirm("¿Desea generar una nueva factura?");

    if (confirmar) {

        // VACIAR LOS VECTORES

        productos = [];
        cantidades = [];
        precios = [];
        facturaDetalles = [];

        // LIMPIAR DATOS DEL CLIENTE

        document.getElementById("txt-id-cliente").value = "";

        document.getElementById("txt-id-fecha").value =
            new Date().toLocaleDateString("en-CA");

        document.getElementById("ld-id-productos").value = "";

        document.getElementById("txt-id-precio").value = "";

        document.getElementById("txt-id-cantidad").value = "";

        // ACTUALIZAR TABLA Y RESULTADOS

        mostrarFactura();
        calcularFactura();

        document.getElementById("mensaje-factura").textContent =
            "Nueva factura creada correctamente.";

    }

});


// ==========================================
// INICIALIZAR EL SIMULADOR
// ==========================================

document.getElementById("txt-id-fecha").value =
    new Date().toLocaleDateString("en-CA");

mostrarFactura();
calcularFactura();
