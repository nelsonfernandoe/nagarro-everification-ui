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
  // @ViewChild(MatPaginator) paginator: MatPaginator;
  // @ViewChild(MatSort) sort: MatSort;
  selection = new SelectionModel<any>(true, []);
  isOpenAllowed = true;
  isViewOnlyAllowed = true;
  showNotification = false;
  successNotification: string;
  failedNotification: string;

  constructor(private readonly eventSourceService: EventSourceService,
              private readonly router: Router) {
    // this.dataSource.paginator = this.paginator;
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
    // this.dataSource.paginator = this.paginator;
  }

  selectHandler(row: any) {
    console.log('Row selected: ', row);
    this.selection.toggle(row);
    this.checkAndEnableActions();
  }

  private checkAndEnableActions() {
    let selectedRowsCount = this.selection.selected.length;
    this.isOpenAllowed = !(selectedRowsCount === 1);
    this.isViewOnlyAllowed = !(selectedRowsCount > 0);
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
    this.checkAndEnableActions();
  }

  getColumnName(el: string) {
    // @ts-ignore
    return this.colName[el];
  }

  onRowSelect(row: any) {
    console.log('Row clicked: ', row);
    this.router.navigateByUrl(`/echannel-verification/${row.id}`);
  }

  onOpenAction() {
    const selectedRow = this.selection.selected[0];
    const id = selectedRow['id'];
    this.loading = true;
    this.eventSourceService.assignToMyself(id)
      .subscribe(res => {
        console.log({res});
        this.showInlineNotification('Successfully assigned the request to yourself!',
          true, 2000);
        this.loading = false;
      }, err => {
        console.error('Error occurred while loading es data');
        this.showInlineNotification('Failed to assign the request to yourself! Please Try again later.',
          false, 2000);
        this.loading = false;
      });
  }

  private showInlineNotification(msg: string, success: boolean, duration: number) {
    this.showNotification = true;
    this.successNotification = '';
    this.failedNotification = '';
    if (success) {
      this.successNotification = msg;
    } else {
      this.failedNotification = msg;
    }

    setTimeout(() => this.showNotification = false, duration);
  }

  onViewOnlyAction() {
    this.selection.selected.forEach(s => {
      window.open(`echannel-verification/${s['id']}?viewOnly=true`);
    });
  }
}
