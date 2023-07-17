import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {EventSourceService} from "../shared/_services/event-source.service";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {SelectionModel} from "@angular/cdk/collections";
import {Router} from "@angular/router";
import {Everification} from "../shared/model/everification";

@Component({
  selector: 'app-echannel-verification',
  templateUrl: './echannel-verification.component.html',
  styleUrls: ['./echannel-verification.component.css']
})
export class EchannelVerificationComponent implements OnInit, AfterViewInit {
  loading = false;
  displayedColumns: string[] = [
    'select',
    'createdOn',
    'priority',
    'sourceBu',
    'businessKey',
    'dcpReference',
    'accountName',
    'transactionCurrency',
    'transactionAmount',
    'lockedBy',
  ];

  colName = {
    'select': '',
    'createdOn': 'Created Time',
    'priority': 'Priority',
    'sourceBu': 'Source BU',
    'businessKey': 'Reference',
    'dcpReference': 'DCP Reference',
    'accountName': 'Account Name',
    'transactionCurrency': 'Trans. Ccy',
    'transactionAmount': 'Trans. Amt',
    'lockedBy': 'Locked By'
  };

  dataSource = new MatTableDataSource<Everification>([]);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  // @ViewChild(MatSort) sort: MatSort;
  selection = new SelectionModel<any>(true, []);
  isOpenAllowed = true;
  isViewOnlyAllowed = true;


  constructor(private readonly eventSourceService: EventSourceService,
              private readonly router: Router) {
    this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    this.loading = true;
    this.eventSourceService.getEventSourceByStatus()
      .subscribe(res => {
        console.log({res});
        this.dataSource.data = res.everifications;
        this.loading = false;
      }, err => {
        console.error('Error occurred while loading es data');
        this.loading = false;
      });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  selectHandler(row: any) {
    console.log('Row selected: ', row);
    this.selection.toggle(row);
    let selectedRowsCount = this.selection.selected.length;
    this.isOpenAllowed = !(selectedRowsCount === 1);
    this.isViewOnlyAllowed = !(selectedRowsCount > 0);
  }

  getColumnName(el: string) {
    // @ts-ignore
    return this.colName[el];
  }

  onRowSelect(row: any) {
    console.log('Row clicked: ', row);
    this.router.navigateByUrl(`/echannel-verification/${row.id}`);
  }
}
