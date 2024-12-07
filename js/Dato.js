class Dato {
    static contador = 0;

    constructor(descripcion, valor) {
        this._descripcion = descripcion;
        this._valor = valor;
        this._id = ++Dato.contador;
    }

    get descripcion() {
        return this._descripcion;
    }

    set descripcion(descripcion) {
        this._descripcion = descripcion;
    }

    get valor() {
        return this._valor;
    }

    set valor(valor) {
        this._valor = valor;
    }

    get id() {
        return this._id;
    }
}