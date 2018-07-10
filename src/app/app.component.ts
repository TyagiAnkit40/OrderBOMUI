import { Component } from '@angular/core';
import { AngularFirestore} from 'angularfire2/firestore';
import { Observable} from 'rxjs';

export interface OrderBom {
  inEntity:string;
  orderNo: string;
  lineNo:string;
  subLineNo:string;
  bmSeq:string;
  parentPart:string;
  component:string;
  compQty:string;
  indentStr:string;
  dimQty:string;
  dimInst:string;
  attrStr:string;
  finalMatchAttrStr:string;
  loosePart:string;
  looseQty:string;
  prodDate:string;
  orderStatus:string;
  orderPart:string;
  finalAssy:string;
  finarPart:string;
  finalMatchAttr: string;
}

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css']
})
export class AppComponent {
  results$: Observable<OrderBom[]>;
  orderNumber:string;
  component:string;
  orderPart:string;
  
  constructor(public db: AngularFirestore) {
    
  }

  ngOnInit() {

  }
  clearFilters(){
    this.orderNumber = null;
    this.component = null;
    this.orderPart = null;
    this.results$ = null;
  }
  filterRecords() {
    if (this.orderNumber){this.searchByOrder()}
    else if (this.component){this.searchByComp()}
    else if (this.orderPart){this.searchByOrderPart()}; 
  }

  searchByOrder(){
    this.results$ = this.db.collection<OrderBom>('OrderBom', ref => {
      let query : firebase.firestore.Query = ref;
      query = query.where('orderNo', '==', this.orderNumber);
      return query;
    }).valueChanges() 
     // ,tap(data => console.log('data: ' + JSON.stringify(data)))
    ;
  }

  searchByComp(){
    this.results$ = this.db.collection<OrderBom>('OrderBom', ref => {
      let query : firebase.firestore.Query = ref;
      query = query.where('componentLC', '==', this.component);
      return query;
    }).valueChanges() 
     // ,tap(data => console.log('data: ' + JSON.stringify(data)))
    ;
  }

  searchByOrderPart(){
    this.results$ = this.db.collection<OrderBom>('OrderBom', ref => {
      let query : firebase.firestore.Query = ref;
      query = query.where('orderPartLC', '==', this.orderPart);
      return query;
    }).valueChanges() 
     // ,tap(data => console.log('data: ' + JSON.stringify(data)))
    ;
  }
}
