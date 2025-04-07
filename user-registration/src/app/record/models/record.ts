export interface Record {
    id: number;
    nombre: string;
    email: string;
    mensaje: string;
    tipo_comprobante: string,
    metodo_pago: string,
    comprobante_pago?: string,
    fecha_creacion: string;
}