const ingresos = [
    new Dato('Salario', 2100),
    new Dato('Venta coche', 1500)
];
 
const egresos = [
    new Dato('Renta departamento', 900),
    new Dato('Ropa', 400)
];

let totalIngresos = () => {
    return ingresos.reduce((total, ingreso) => total + ingreso.valor, 0);
};

let totalEgresos = () => {
    return egresos.reduce((total, egreso) => total + egreso.valor, 0);
};

const formatoMoneda = (valor) => {
    return valor.toLocaleString('es-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2 });
};

const formatoPorcentaje = (valor) => {
    return valor.toLocaleString('en-US', { style: 'percent', minimumFractionDigits: 2 });
};

const crearElementoHTML = (elemento, tipo) => {
    const valorFormateado = (tipo === 'ingreso')
        ? formatoMoneda(elemento.valor): `- ${formatoMoneda(elemento.valor)}`;
    
    const porcentaje = (tipo === 'egreso')
        ? `<div class="elemento_porcentaje">
        ${formatoPorcentaje(elemento.valor / totalEgresos())}</div>`: '';
        const eliminarFuncion = tipo === 'ingreso' 
        ? `eliminarIngreso(${elemento.id})`
        : `eliminarEgreso(${elemento.id})`;

    return `
        <div class="elemento limpiarEstilos">
            <div class="elemento_descripcion">${elemento.descripcion}</div>
            <div class="derecha limpiarEstilos">
                <div class="elemento_valor">${valorFormateado}</div>
                ${porcentaje}
                <div class="elemento_eliminar">
                    <button class="elemento_eliminar--btn">
                        <ion-icon name="close-circle-outline" 
                        onclick='${eliminarFuncion}'>
                        </ion-icon>
                    </button>
                </div>
            </div>
        </div>`;
}

const cargarElementos = (elementos, tipo) => { 
    const elementosHTML = elementos
        .map(elemento => crearElementoHTML(elemento, tipo)).join('');  

    const contenedorId = tipo === 'ingreso' ? 'lista-ingresos' : 'lista-egresos';
    document.getElementById(contenedorId).innerHTML = elementosHTML;
}

let cargarCabecero = () => {
    let presupuesto = totalIngresos() - totalEgresos();
    let porcentajeEgreso = totalEgresos() / totalIngresos();
    document.getElementById("presupuesto").innerHTML = formatoMoneda(presupuesto);
    document.getElementById("porcentaje").innerHTML = formatoPorcentaje(porcentajeEgreso);
    document.getElementById("ingresos").innerHTML = formatoMoneda(totalIngresos());
    document.getElementById("egresos").innerHTML = formatoMoneda(totalEgresos());
};

const cargarIngresos = () => {
    cargarElementos(ingresos, 'ingreso');
}

const cargarEgresos = () => {
    cargarElementos(egresos, 'egreso');
} 

let cargarApp = () => {
    cargarCabecero();
    cargarIngresos();
    cargarEgresos();
};

let agregarDato = () => {
    let forma = document.forms["forma"];
    let tipo = forma["tipo"];
    let descripcion = forma["descripcion"];
    let valor = forma["valor"];
    if (descripcion.value && valor.value) {
        let nuevoDato = new Dato(descripcion.value, +valor.value);
        switch (tipo.value){
        case 'ingreso':
            ingresos.push(nuevoDato);
            cargarCabecero();
            cargarIngresos();
        break;
        case 'egreso':
            egresos.push(nuevoDato);
            cargarCabecero();
            cargarEgresos();
        break;
        }
    }
};

const eliminarIngreso = (id)=>{
    let indiceEleminar = ingresos.findIndex (ingreso => ingreso.id === id);
    ingresos.splice(indiceEleminar, 1);
    cargarCabecero();
    cargarIngresos();
}

const eliminarEgreso = (id)=>{
    let indiceEleminar = egresos.findIndex (egreso => egreso.id === id);
    egresos.splice(indiceEleminar, 1);
    cargarCabecero();
    cargarEgresos();
}
