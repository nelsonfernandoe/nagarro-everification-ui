import {Component, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {EventSourceService} from "../shared/_services/event-source.service";

@Component({
  selector: 'app-echannel-verification-data',
  templateUrl: './echannel-verification-data.component.html',
  styleUrls: ['./echannel-verification-data.component.css']
})
export class EchannelVerificationDataComponent {
  loading = false;
  displayedColumns: string[] = [
    'status',
    'count'
  ];
  dataSource = new MatTableDataSource([]);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  colName = {
    'status': 'Label',
    'count': 'Count'
  };

  constructor(private readonly eventSourceService: EventSourceService) {
    // this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    this.loading = true;
    this.eventSourceService.getEventSourceCountByStatus()
      .subscribe((res: any) => {
        console.log({res});
        this.dataSource.data = res.everificationData;
        this.loading = false;
      }, err => {
        console.error('Error occurred while loading es data');
        this.loading = false;
      });
  }

  getColumnName(el: string) {
    // @ts-ignore
    return this.colName[el];
  }
}
