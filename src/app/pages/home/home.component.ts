import { Component, OnInit } from '@angular/core';
import { EventsService } from 'src/app/services/events.service';
import { ITimeline, IShoppingBuy, IProduct } from 'src/app/models/timeline.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  timeline = {} as ITimeline;
  dataMap = new Map<string, IShoppingBuy[]>();

  constructor(public eventsService: EventsService) { }

  ngOnInit(): void {
    this._groupTimeline();
  }

  private _groupTimeline() : void {
    this.eventsService.getEvents().subscribe(events => {
      this.timeline.timeline = [];
      let products = new Map<string, IProduct[]>();
      events.events.map(event => {
        let transaction_id: string = event.custom_data.find(data => data.key.toLowerCase() == 'transaction_id').value;
        if (event.event.toLowerCase() == "comprou-produto") {
          let product: IProduct = {
            name: event.custom_data.find(data => data.key.toLowerCase() == 'product_name').value,
            price: +event.custom_data.find(data => data.key.toLowerCase() == 'product_price').value
          }
          if (products.get(transaction_id)) {
            products.get(transaction_id).push(product);
          } else {
            let prod_temp: IProduct[] = [];
            prod_temp.push(product);
            products.set(transaction_id, prod_temp);
          }
        } else {
          let shoppingBuy: IShoppingBuy = {
            timestamp: event.timestamp,
            revenue: +event.revenue.toFixed(1),
            transaction_id: transaction_id,
            store_name: event.custom_data.find(data => data.key.toLowerCase() == 'store_name').value,
            products: products.get(transaction_id)
          }
          if (this.dataMap.get(transaction_id)) {
            this.dataMap.get(transaction_id).push(shoppingBuy);
          } else {
            let shop_temp: IShoppingBuy[] = [];
            shop_temp.push(shoppingBuy);
            this.dataMap.set(transaction_id, shop_temp);
          }
          this.timeline.timeline.push(shoppingBuy);
        }
      });
      this.timeline.timeline.sort((a,b) => (a.timestamp > b.timestamp) ? -1 : ((b.timestamp > a.timestamp) ? 1 : 0));
    });
  }
}