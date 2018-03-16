import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as jsPDF from 'jspdf'

@Injectable()
export class ClienteService {

    url = 'http://10.77.1.10:6002';


    logo = 'data:image/jpeg;base64,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';

    constructor(public http: HttpClient) { }

    getDataEmpresa(json) {
        return new Promise((resolve, reject) => {
            this.http.post(this.url + '/cliente/empresa/obtener', json)
                .subscribe(res => {
                    resolve(res)
                }, (err) => {
                    reject(err)
                })
        })
    }

    updateDataEmpresa(json) {
        return new Promise((resolve, reject) => {
            this.http.post(this.url + '/cliente/empresa/actualizar', json)
                .subscribe(res => {
                    resolve(res)
                }, (err) => {
                    reject(err)
                })
        })
    }

    getRepresentante(json) {
        return new Promise((resolve, reject) => {
            this.http.post(this.url + '/cliente/representante/obtener', json)
                .subscribe(res => {
                    resolve(res)
                }, (err) => {
                    reject(err)
                })
        })
    }

    getListDocuments(json) {
        return new Promise((resolve, reject) => {
            this.http.post(this.url + '/cliente/documento/lista', json)
                .subscribe(res => {
                    resolve(res)
                }, (err) => {
                    reject(err)
                })
        })
    }

    downloadDocument(json) {
        return new Promise((resolve, reject) => {
            this.http.post(this.url + '/cliente/documento/obtener', json)
                .subscribe(res => {
                    resolve(res)
                }, (err) => {
                    reject(err)
                })
        })
    }

    deleteDocument(json) {
        return new Promise((resolve, reject) => {
            this.http.post(this.url + '/cliente/documento/borrar', json)
                .subscribe(res => {
                    resolve(res)
                }, (err) => {
                    reject(err)
                })
        })
    }

    solicitarOferta(json) {
        return new Promise((resolve, reject) => {
            this.http.post(this.url + '/cliente/oferta/solicitar', json)
                .subscribe(res => {
                    resolve(res)
                }, (err) => {
                    reject(err)
                })
        })
    }

    getOferta(json) {
        return new Promise((resolve, reject) => {
            this.http.post(this.url + '/cliente/oferta/obtener', json)
                .subscribe(res => {
                    resolve(res)
                }, (err) => {
                    reject(err)
                })
        })
    }

    uploadFile(json) {
        return new Promise((resolve, reject) => {
            this.http.post(this.url + '/cliente/documento/subir', json)
                .subscribe(res => {
                    resolve(res)
                }, (err) => {
                    reject(err)
                })
        })
    }

    finalizarCliente(json) {
        return new Promise((resolve, reject) => {
            this.http.post(this.url + '/cliente/oferta/actualizar', json)
                .subscribe(res => {
                    resolve(res)
                }, (err) => {
                    reject(err)
                })
        })
    }

    getTable(json) {
        return new Promise((resolve, reject) => {
            this.http.post(this.url + '/gestiona/calcular', json)
                .subscribe(res => {
                    resolve(res)
                }, (err) => {
                    reject(err)
                })
        })
    }

    createTable(items) {

        var doc = new jsPDF('L');
        doc.addImage(this.logo, 'JPEG', 20, 15, 75, 15);

        doc.setFontType('normal')
        doc.setFontSize(9)
        doc.text(110, 19, 'Los valores indicados en la presente simulación son solo referenciales, es decir, son estimativos, no vinculantes y no exactos.');
        var split = doc.splitTextToSize('La aprobación y condiciones definitivas de un crédito están sujetas a confirmación de antecedentes financieros y comerciales y al resultado de la evaluación practicada por el Banco.', 160);
        doc.text(110, 25, split);

        doc.setFontType('bold')
        doc.setFontSize(11)
        doc.text(40, 50, 'N° DE CUOTA')
        doc.text(70, 50, 'INTERÉS')
        doc.text(120, 50, 'AMORTIZACIÓN')
        doc.text(165, 50, 'VALOR CUOTA')
        doc.text(200, 50, 'SALDO CAPITAL')

        doc.setFontType('normal')
        doc.setFontSize(9);
        //cuotas
        let h = 63;

        for (let item of items) {
            doc.text(43, h, item[0].toString())
            doc.text(73, h, item[1].toString())
            doc.text(123, h, item[2].toString())
            doc.text(168, h, item[3].toString())
            doc.text(203, h, item[4].toString())

            h = h + 2;
            doc.setLineWidth(200);
            doc.setDrawColor(200);
            doc.line(140, h, 140, h + 0.3);
            h = h + 4;
        }

        doc.autoPrint();
        window.open(doc.output('bloburl'), '_blank');
    }

    createPdf() {
        var doc = new jsPDF();

        doc.addImage(this.logo, 'JPEG', 20, 17, 75, 15);

        doc.setDrawColor(119, 119, 119);
        doc.setFillColor(119, 119, 119);
        doc.rect(100, 19, 85, 12, 'F');

        doc.setFontSize(12);
        doc.setFontType('bold')
        doc.setTextColor(255, 255, 255);
        doc.text(103, 24, 'ANEXO N° 1')
        doc.text(103, 29, 'CARTA OFERTA A FIRME')

        doc.setFontType('normal')
        doc.setTextColor(90);
        doc.setFontSize(9);
        var splitTitle = doc.splitTextToSize('Los abajo firmantes, actuando en la representación que invisten, declaramos bajo juramento que la institución financiera BANCO DEL ESTADO DE CHILE, con fecha 01/03/2018 ha aprobado el otorgamiento de una operación de financiamiento con la cobertura FOGAIN en las condiciones que más abajo se señalan a XXXXXXXXXXXXX RUT 12346578-9, cuyo domicilio se encuentra en XXXXXXXX 0000000 en la comuna de  XXXXX', 170);
        doc.text(20, 45, splitTitle);

        doc.text(20, 62, 'Características del financiamiento:')
        doc.text(20, 67, 'Monto de la operación (en moneda de origen)')
        doc.text(20, 72, 'Plazo de la Operación (en meses):')
        doc.text(20, 77, 'Período de Gracia estipulado (en meses):')

        doc.setLineWidth(80);
        doc.setDrawColor(200);
        doc.line(130, 62, 130, 62.3);
        doc.line(130, 67, 130, 67.3);
        doc.line(130, 72, 130, 72.3);
        doc.line(130, 77, 130, 77.3);

        doc.setFontSize(10);
        doc.text(20, 90, 'De Capital:                                           De Intereses:                                           De Capital e Intereses')

        doc.setFontSize(9);
        doc.text(20, 100, 'Periodicidad de Pago contemplado:')
        doc.text(20, 105, 'Tasa de interés de la Operación:')
        var splitTitle = doc.splitTextToSize('Monto total de todos los gastos y comisiones directos o indirectos asociados a la operación de financiamiento (en moneda de origen):', 170)
        doc.text(20, 110, splitTitle)

        doc.setLineWidth(80);
        doc.setDrawColor(200);
        doc.line(130, 100, 130, 100.3);
        doc.line(130, 105, 130, 105.3);

        doc.setFontSize(10);
        doc.text(20, 125, 'Impuestos:                                            Seguros Tomados:')
        doc.text(20, 130, 'Otros gastos:                                        Gastos Notariales:')

        doc.setFontSize(9);
        doc.text(20, 140, 'Número de cuotas pactadas:')

        doc.setLineWidth(80);
        doc.setDrawColor(200);
        doc.line(105, 141, 105, 141.3);

        doc.text(20, 145, 'Crédito de cuotas (señalar con una cruz): si es fija, señalar monto en moneda de origen:')

        doc.setFontSize(10);
        doc.text(20, 155, 'Fijas:                                                      Variables:')
        doc.text(20, 160, 'Monto Cuota (solo si es fija)')

        doc.setFontSize(9);
        var splitTitle = doc.splitTextToSize('El financiamiento señalado se encuentra aprobado por un período de 7 días hábiles, contado desde la presente fecha, para los objetos previstos en la normativa de la Cobertura FOGAIN', 170)
        doc.text(20, 170, splitTitle)
        var splitTitle = doc.splitTextToSize('Autorizamos a CORFO o a quienes ésta designe, para realizar las revisiones y auditorías que correspondan, según  lo  estipulado  en  el  Reglamento  de  la  Cobertura  respectiva.', 170)
        doc.text(20, 180, splitTitle)

        doc.setFontType('bold')
        doc.text(20, 190, 'En:                                                   , a                    de                            de')
        doc.text(20, 195, 'Nombre intermediario:  BANCO DEL ESTADO DE CHILE ')
        doc.text(20, 200, 'RUT intermediario: 97.030.000-7')
        doc.text(20, 205, 'Nombre Jefe Plataforma:')
        doc.text(20, 210, 'RUT Jefe Plataforma:')


        doc.setFontType('normal')
        doc.setFontSize(8);
        doc.text(30, 250, 'Firma Jefe / Agente de Plataforma o Jefe Zona')
        doc.text(110, 250, 'Firma Empresario(a) (Persona Natural) o Apoderado (s)')

        doc.setLineWidth(80);
        doc.setDrawColor(200);
        doc.line(60, 245, 60, 245.3);
        doc.line(145, 245, 145, 245.3);

        doc.setFontSize(8);
        doc.text(120, 260, 'Apoderado 1:')
        doc.text(120, 265, 'Rut:')
        doc.text(120, 270, 'Apoderado 2')
        doc.text(120, 275, 'Rut:')

        doc.autoPrint();
        window.open(doc.output('bloburl'), '_blank');
    }
}
