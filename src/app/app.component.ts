import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { TExchangeData, TProductItem } from './types';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'burger';
  currency = '$';
  exchangeData: TExchangeData = [
    {
      symbol: 'USD',
      token: '$',
    },
    {
      symbol: 'RUB',
      token: '₽',
    },
    {
      symbol: 'UAH',
      token: '₴',
    },
    {
      symbol: 'JPY',
      token: '¥',
    },
    {
      symbol: 'EUR',
      token: '€',
    },
  ];
  query = `https://api.exchangerate.host/latest?base=USD&symbols=${this.exchangeData
    .map((item) => item.symbol)
    .join()}`;
  rates = null;

  constructor(private fb: FormBuilder, private appService: AppService) {
    this.getRates();
  }

  productsData: any;

  form = this.fb.group({
    order: ['', Validators.required],
    name: ['', Validators.required],
    phone: ['', Validators.required],
  });

  getRates = async () => {
    try {
      const res = await fetch(this.query);
      const { rates } = await res.json();
      console.log(rates);
      this.rates = rates;
      this.exchangeData = [...this.exchangeData].map((item) => ({
        ...item,
        rate: rates[item.symbol],
      }));
    } catch (error: any) {
      throw new Error(error.message);
    }
  };
  ngOnInit() {
    this.appService.getData().subscribe(data => this.productsData = data);
  }
  scrollTo = (e: MouseEvent, target?: HTMLElement, burger?: TProductItem) => {
    e.preventDefault();
    target?.scrollIntoView({ behavior: 'smooth' });

    if (burger) {
      const { title, price } = burger;
      this.form.patchValue({ order: `${title} (${price} ${this.currency})` });
    }
  };

  changeCurrency = () => {
    let newCurrency: string;

    switch (this.currency) {
      case '$':
        newCurrency = '₽';
        break;
      case '₽':
        newCurrency = '₴';
        break;
      case '₴':
        newCurrency = '¥';
        break;
      case '¥':
        newCurrency = '€';
        break;
      case '€':
        newCurrency = '$';
        break;
      default:
        newCurrency = '$';
        break;
    }

    this.currency = newCurrency;
    const obj = this.exchangeData.find((item) => item.token === newCurrency);
    console.log();
    // this.productsData?.map((item) => {
    //   let coef = 1;

    //   if (obj?.rate) {
    //     coef = obj.rate;
    //   }

    //   item.price = (item.basePrice * coef).toFixed(0);
    // });
  };

  confirmOrder = () => {
    if (this.form.valid) {
      this.appService.sendOrder(this.form.value).subscribe({
        next: (response: any) => {
          alert(response.message);
          this.form.reset();
        },
        error: (response) => {
          throw new Error(response.message);
        },
      });
    }
  };
}
