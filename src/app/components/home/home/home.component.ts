import { Component, OnInit } from '@angular/core';
import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper';
import { ClienteService } from '../../../services/cliente.service';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    config: DropzoneConfigInterface = {
        url: 'http://10.77.1.10:6002/cliente/documento/subir',
        maxFilesize: 8,
        method: 'POST',
        params: {
            cuenta: localStorage.getItem('_c'),
            pertenece: 'coco#',
            asociado: 'empresa',
            tipo: 'default'
        }
    };

    ofertaRecibida: boolean = false;
    ofertaFinalizada: boolean = false;
    modalFinalizar: boolean = false;
    isLoading: boolean = false;
    loaderHide: boolean = false;
    isEditable: boolean = false;
    tab: number = 1;
    actividad: string;
    jsonEmpresa = { cuenta: localStorage.getItem('_c'), nombre: '', constitucion: '', regimen: '', formalidad: true, actividadeconomica: [], giro: '', nivel: '', iva: '', pais: '', email: '', direccion: '', numero: '', oficina: '', comuna: '', ciudad: '', region: '', fono: '', celular: '', codigoactividad: [], paisimpuesto: '', notaria: '' }
    jsonRepresentante = { rut: '', nacimiento: '', nacionalidad: '', nombre: '', paterno: '', materno: '' };
    jsonDocumentDefault = [];
    jsonSolicitud = {
        Moneda: 'Pesos',
        Motivo: '', Monto: 0,
        Objetivo: {
            Capital: false, Inversion: false, Compra: false, Refinanciamientos: false
        },
        Productos: {
            Credito: false, Leasing: false, Factoring: false, Boleta: false, PAE: false, Venta: false, Lineas: false, Carta: false
        }
    }
    jsonOferta = { rangoMin: 0, rangoMax: 0, rango: 0, cuotaMin: 0, cuotaMax: 0, cuota: 0, garantia: '', comision: 0, motivo: '', objetivo: '', valorcuota: '', valorgarantia: 0 }
    today: any;
    vence: any;
    ultimo: any;
    data: any;
    producto: any;
    jsonCondicion = [];
    calendario = [];

    constructor(
        public router: Router,
        public snackBar: MatSnackBar,
        public clienteService: ClienteService
    ) { }

    ngOnInit() {
        this.clienteService.getDataEmpresa({ cuenta: localStorage.getItem('_c') }).then((response) => {
            if (response['data'] != false) {
                this.jsonEmpresa.nombre = response['data']['Nombre'];
                this.jsonEmpresa.constitucion = response['data']['Constitucion'];
                this.jsonEmpresa.regimen = response['data']['Regimen'];
                this.jsonEmpresa.formalidad = response['data']['Formalidad'];
                this.actividad = 'ASESORES Y CONSULTORES EN INFORMÁTICA (SOFTWARE)';
                this.jsonEmpresa.giro = response['data']['Giro'];
                this.jsonEmpresa.nivel = response['data']['NivelVenta'];
                this.jsonEmpresa.iva = response['data']['IvaVntsAutomaticos'];
                this.jsonEmpresa.pais = response['data']['Pais'];
                this.jsonEmpresa.email = response['data']['Email'];
                this.jsonEmpresa.direccion = response['data']['Direccion'];
                this.jsonEmpresa.numero = response['data']['Numero'];
                this.jsonEmpresa.oficina = response['data']['Oficina'];
                this.jsonEmpresa.comuna = response['data']['Comuna'];
                this.jsonEmpresa.ciudad = response['data']['Ciudad'];
                this.jsonEmpresa.region = response['data']['Region'];
                this.jsonEmpresa.fono = response['data']['Telefono'];
                this.jsonEmpresa.celular = response['data']['Celular'];
            }

        })

        this.clienteService.getRepresentante({ cuenta: localStorage.getItem('_c') }).then((response => {
            if (response['data'] != null) {
                this.jsonRepresentante.rut = response['data']['Rut']
                this.jsonRepresentante.nacimiento = response['data']['Nacimiento']
                this.jsonRepresentante.nacionalidad = response['data']['Nacionalidad']
                this.jsonRepresentante.nombre = response['data']['Nombre']
                this.jsonRepresentante.paterno = response['data']['Paterno']
                this.jsonRepresentante.materno = response['data']['Materno']
            }
        }))

        this.clienteService.getListDocuments({ cuenta: localStorage.getItem('_c') }).then((response) => {
            if (response['data'] != null) {
                for (let item of response['data']) {
                    this.jsonDocumentDefault.push({ Archivo: item['Documento'], Filename: item['Filename'] })
                }
            }
        })

        this.clienteService.getOferta({ cuenta: localStorage.getItem('_c') }).then((response) => {
            if (response['data'] != false) {
                this.isEditable = true;
                this.producto = response['data']['_id'];
                this.data = response['data'];
                this.jsonSolicitud.Moneda = response['data']['Solicitud']['Moneda'];
                this.jsonSolicitud.Motivo = response['data']['Solicitud']['Motivo'];
                this.jsonSolicitud.Monto = response['data']['Solicitud']['Monto'];
                this.jsonSolicitud.Objetivo.Capital = response['data']['Solicitud']['Objetivo']['Capital de trabajo'];
                this.jsonSolicitud.Objetivo.Inversion = response['data']['Solicitud']['Objetivo']['Inversión'];
                this.jsonSolicitud.Objetivo.Compra = response['data']['Solicitud']['Objetivo']['Compra de cartera'];
                this.jsonSolicitud.Objetivo.Refinanciamientos = response['data']['Solicitud']['Objetivo']['Refinanciamientos'];
                this.jsonSolicitud.Productos.Credito = response['data']['Solicitud']['Productos']['Credito'];
                this.jsonSolicitud.Productos.Leasing = response['data']['Solicitud']['Productos']['Leasing'];
                this.jsonSolicitud.Productos.Factoring = response['data']['Solicitud']['Productos']['Factoring'];
                this.jsonSolicitud.Productos.Boleta = response['data']['Solicitud']['Productos']['Boleta de Garantía'];
                this.jsonSolicitud.Productos.PAE = response['data']['Solicitud']['Productos']['PAE'];
                this.jsonSolicitud.Productos.Venta = response['data']['Solicitud']['Productos']['Venta contado'];
                this.jsonSolicitud.Productos.Lineas = response['data']['Solicitud']['Productos']['Líneas de Creditos'];
                this.jsonSolicitud.Productos.Carta = response['data']['Solicitud']['Productos']['Carta de Creditos'];
                this.jsonCondicion = response['data']['Condicion'];

                if (response['data']['Proceso'] == 'Oferta Aceptada por cliente') {
                    this.ofertaFinalizada = true;

                } else if (response['data']['Proceso'] == 'Oferta generada') {
                    this.ofertaRecibida = true;
                    this.jsonOferta.rango = response['data']['Cobertura']['RangoMin'];
                    this.jsonOferta.rangoMin = response['data']['Cobertura']['RangoMin'];
                    this.jsonOferta.rangoMax = response['data']['Cobertura']['RangoMax'];
                    this.jsonOferta.cuota = response['data']['PlazoCuotas']['Minimo'];
                    this.jsonOferta.cuotaMin = response['data']['PlazoCuotas']['Minimo'];
                    this.jsonOferta.cuotaMax = response['data']['PlazoCuotas']['Maximo'];
                    this.jsonOferta.garantia = response['data']['Garantia'];
                    this.jsonOferta.comision = response['data']['Comision'];
                    this.jsonOferta.motivo = response['data']['Solicitud']['Motivo'];
                    let aux = [];
                    for (let x of Object.keys(response['data']['Solicitud']['Objetivo'])) {
                        if (response['data']['Solicitud']['Objetivo'][x] == true) {
                            aux.push(x)
                        }
                    }
                    this.jsonOferta.objetivo = aux.join(', ');
                    this.today = new Date();
                    this.vence = new Date().setMonth(new Date().getMonth() + this.jsonOferta.cuota);
                    this.ultimo = new Date().setMonth(new Date().getMonth() + this.jsonOferta.cuota);

                    var cubre = 0;
                    if (response['data']['Cobertura']['Cobertura']) {
                        cubre = response['data']['Cobertura']['Cobertura'];
                    } else {
                        for (let item of response['data']['Cobertura']['Porcentajes']) {
                            if (this.jsonOferta.cuota >= item['RangoMin'] && this.jsonOferta.cuota <= item['RangoMax']) {
                                cubre = item['Cubre'];
                            }
                        }
                    }

                    this.jsonOferta.valorcuota = ((this.jsonOferta.rango / this.jsonOferta.cuota) + (this.jsonOferta.rango * this.jsonOferta.comision) / cubre).toFixed(1);
                    this.jsonOferta.valorgarantia = (this.jsonOferta.rango * this.jsonOferta.comision) / cubre;
                }


            }

            this.loaderHide = true;
        })
    }

    updateValorCuota() {
        var cubre = 0;
        if (this.data['Cobertura']['Cobertura']) {
            cubre = this.data['Cobertura']['Cobertura'];
        } else {
            for (let item of this.data['Cobertura']['Porcentajes']) {
                if (this.jsonOferta.cuota >= item['RangoMin'] && this.jsonOferta.cuota <= item['RangoMax']) {
                    cubre = item['Cubre'];
                }
            }
        }

        this.jsonOferta.valorcuota = ((this.jsonOferta.rango / this.jsonOferta.cuota) + (this.jsonOferta.rango * this.jsonOferta.comision) / cubre).toFixed(1);
        this.jsonOferta.valorgarantia = Math.round((this.jsonOferta.rango * this.jsonOferta.comision) / cubre);
    }

    updateDateVencimiento() {
        this.ultimo = new Date().setMonth(new Date().getMonth() + this.jsonOferta.cuota);
    }

    updateDataEmpresa() {
        this.clienteService.updateDataEmpresa(this.jsonEmpresa).then((response) => {
            if (response['data'] != false) {
                let snackBarRef = this.snackBar.open('Los datos fueron actualizados exitosamente', '', {
                    duration: 3500
                });
            }
        })
    }

    onBeforeSend(e) {
        this.config.params.mimetype = e[0].type
        this.config.params.filename = e[0].name
        this.config.params.size = e[0].size
        this.config.params.content = e[0].dataURL;
    }

    onUploadSuccess(e) {
        this.jsonDocumentDefault.push({ Archivo: e[1]['data'], Filename: e[1]['nombre'] })
    }

    onUploadError(e) { }

    downloadFile(item) {
        this.isLoading = true;
        this.clienteService.downloadDocument({ cuenta: localStorage.getItem('_c'), documento: item['Archivo'] }).then((response) => {
            if (response['data'] != false) {
                var hiddenElement = document.createElement('a');
                hiddenElement.href = response['data'][0]['Content'];
                hiddenElement.target = '_blank';
                hiddenElement.download = item['Filename'];
                hiddenElement.click();
            }
            this.isLoading = false;
        })
    }

    deleteFile(item) {
        this.isLoading = true;
        this.clienteService.deleteDocument({ cuenta: localStorage.getItem('_c'), documento: item['Archivo'] }).then((response) => {
            if (response['data'])
                this.jsonDocumentDefault = this.jsonDocumentDefault.filter(x => x.Archivo !== item['Archivo']);
            this.isLoading = false;
        })
    }

    sendSolicitud() {
        this.clienteService.solicitarOferta({
            cuenta: localStorage.getItem('_c'),
            "solicitud": {
                "Moneda": this.jsonSolicitud.Moneda,
                "Motivo": this.jsonSolicitud.Motivo,
                "Monto": this.jsonSolicitud.Monto,
                "Objetivo": {
                    "Capital de trabajo": this.jsonSolicitud.Objetivo.Capital,
                    "Inversión": this.jsonSolicitud.Objetivo.Inversion,
                    "Compra de cartera": this.jsonSolicitud.Objetivo.Compra,
                    "Refinanciamientos": this.jsonSolicitud.Objetivo.Refinanciamientos
                },
                "Productos": {
                    "Credito": this.jsonSolicitud.Productos.Credito,
                    "Leasing": this.jsonSolicitud.Productos.Leasing,
                    "Factoring": this.jsonSolicitud.Productos.Factoring,
                    "Boleta de Garantía": this.jsonSolicitud.Productos.Boleta,
                    "PAE": this.jsonSolicitud.Productos.PAE,
                    "Venta contado": this.jsonSolicitud.Productos.Venta,
                    "Líneas de Creditos": this.jsonSolicitud.Productos.Lineas,
                    "Carta de Creditos": this.jsonSolicitud.Productos.Carta
                }
            }
        }).then((response) => {
            if (response['data'] != false) {
                let snackBarRef = this.snackBar.open('La solicitud fue eviada exitosamente', '', {
                    duration: 3500
                });
                this.router.navigate(['/refresh']);
            }
        })
    }

    formatNumber(num) {
        num = num.toString().split('').reverse().join('').replace(/(?=\d*\.?)(\d{3})/g, '$1.');
        num = num.split('').reverse().join('').replace(/^[\.]/, '');
        return num;
    }

    downloadAnexo1() {
        this.clienteService.createPdf();
    }

    downloadTabla() {
        this.clienteService.getTable({ monto: this.jsonOferta.rango, cuotas: this.jsonOferta.cuota }).then((response) => {
            this.clienteService.createTable(response['items']);
        })
    }

    uploadFile(e, tipo) {
        var file: File = e.target.files[0];
        if (e.target.files.length > 0) {
            var myReader: FileReader = new FileReader();
            var that = this;
            myReader.onloadend = (loadEvent: any) => {
                this.clienteService.uploadFile({ cuenta: localStorage.getItem('_c'), pertenece: 'empresa', asociado: 'documento_obligatorio', tipo: tipo, files: loadEvent.target.result }).then((response) => {
                    if (response['data'] != false) {
                        let snackBarRef = this.snackBar.open('El documento fue enviado exitosamente', '', {
                            duration: 3500
                        });
                    }
                })
            }
            myReader.readAsDataURL(file);
        }
    }

    sendEvaluacion() {
        this.clienteService.finalizarCliente({
            cuenta: localStorage.getItem('_c'), producto: this.producto, proceso: "Oferta Aceptada por cliente",
            estado: true, eleccion: [{ Monto: this.jsonOferta.rango, Cuotas: this.jsonOferta.cuota, ValorCuota: this.jsonOferta.valorcuota, Comision: this.jsonOferta.comision }]
        }).then((response) => {
            if (response['data'] != false) {
                let snackBarRef = this.snackBar.open('Los datos fueron enviados exitosamente', '', {
                    duration: 3500
                });
            }
            this.router.navigate(['/refresh']);
        })
    }
}
