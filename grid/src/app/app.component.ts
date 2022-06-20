import { Component, OnInit } from '@angular/core';
import { exportDataGrid } from 'devextreme/excel_exporter';
import * as Excel from 'exceljs'
import {saveAs} from 'file-saver';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {


  title = 'grid';

  dataSource: any[] = [];

  ngOnInit(): void {

    this.dataSource = [
      {name: 'vasanth', lastName: 'krishnan'},
      {name: 'vasanth', lastName: 'krishnan'},
    ]
  }



  onExporting(e: any) {
    e.component.beginUpdate();
    e.component.columnOption('ID', 'visible', true);
    const workbook = new Excel.Workbook();
    const worksheet = workbook.addWorksheet('Employees');

    exportDataGrid({
        component: e.component,
        worksheet: worksheet
    }).then(function() {
        workbook.xlsx.writeBuffer().then(function(buffer: BlobPart) {
            saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'DataGrid.xlsx');
        });
    }).then(function() {
        e.component.columnOption('ID', 'visible', false);
        e.component.endUpdate();
    });

    e.cancel = true;
}
}

