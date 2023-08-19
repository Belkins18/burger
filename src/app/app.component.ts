import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { TExchangeData, TProductData } from './types';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})



export class AppComponent {
  
  title = 'burger';
  currency = '$'
  exchangeData: TExchangeData = [
    {
      symbol: 'USD',
      token: '$'
    },
    {
      symbol: 'RUB',
      token: '₽'
    },
    {
      symbol: 'UAH',
      token: '₴'
    },
    {
      symbol: 'JPY',
      token: '¥'
    },
    {
      symbol: 'EUR',
      token: '€'
    },
  ]
  query = `https://api.exchangerate.host/latest?base=USD&symbols=${this.exchangeData.map(item => item.symbol).join()}`
  rates = null

  constructor(private fb: FormBuilder) {
    this.getRates()
  }
  
  productsData: TProductData = [
    {
      image: '1.png',
      title: 'Бургер чеддер & бекон',
      text: 'Котлета из говядины криспи, булочка, томат, сыр Чеддер, грудинка, лук красный, салат айсбер, майонез, кетчуп, сырный соус',
      basePrice: 8,
      price: 8,
      grams: 360
    },
    {
      image: '2.png',
      title: 'BBQ с беконом и курицей',
      text: 'Булочка бриошь с кунжутом, куриная котлета, сыр чеддер, томат, огурец маринованный, лук маринованный, салат Ромен, бекон, соус BBQ',
      basePrice: 7,
      price: 7,
      grams: 390
    },
    {
      image: '3.png',
      title: 'Дабл биф бургер',
      text: 'Две говяжьи котлеты, сыр чеддер, салат романо, маринованные огурцы, свежий томат, бекон, красный лук, соус бургер, горчица',
      basePrice: 10,
      price: 10,
      grams: 420
    },
    {
      image: '4.png',
      title: 'Баварский бургер',
      text: 'Булочка для бургера, говяжья котлета, красный лук, сыр, охотничья колбаска, соус барбекю, соус сырный, салат айсберг',
      basePrice: 7,
      price: 7,
      grams: 220
    },
    {
      image: '5.png',
      title: 'Бекон чизбургер',
      text: 'Булочка для бургера, говяжья котлета, грудинка, помидор, огурец маринованный, сыр, сырный соус, кетчуп, зелень',
      basePrice: 8,
      price: 8,
      grams: 220
    },
    {
      image: '6.png',
      title: 'Индиана бургер',
      text: 'Булочка для бургера, котлета куриная, грудинка, яйцо, огурец маринованный, криспи лук, кетчуп, соус сырный, горчица, зелень',
      basePrice: 9,
      price: 9,
      grams: 320
    },
    {
      image: '7.png',
      title: 'Вегги бургер',
      text: 'Булочка для бургера, вегетарианская котлета, красный лук, сыр, свежий томат, соус барбекю, соус сырный, салат айсберг',
      basePrice: 8,
      price: 8,
      grams: 280
    },
    {
      image: '8.png',
      title: 'Плаксивый Джо',
      text: 'Булочка для бургера, говяжья котлета, грудинка, помидор, огурец маринованный, красный лук, сыр, перец халапеньо, кетчуп, зелень',
      basePrice: 7,
      price: 7,
      grams: 380
    },
    {
      image: '9.png',
      title: 'Двойной чиз бургер',
      text: 'Булочка для бургера, две говяжьи котлеты, двойной сыр чеддар, огурец маринованный, криспи лук, кетчуп, соус сырный, горчица, зелень',
      basePrice: 11,
      price: 11,
      grams: 400
    },
    {
      image: '10.png',
      title: 'Фрешбургер',
      text: 'Булочка для бургера, говяжья котлета, бекон, сыр чеддар, яйцо, салями, соус барбекю, соус сырный, салат айсберг, свежий томат',
      basePrice: 9,
      price: 9,
      grams: 300
    },
    {
      image: '11.png',
      title: 'Цуккини бургер',
      text: 'Булочка для бургера, вегетарианская котлета из нута, цуккини на гриле, помидор, огурец маринованный, сыр, горчичный соус, кетчуп, зелень',
      basePrice: 8,
      price: 8,
      grams: 320
    },
    {
      image: '12.png',
      title: 'Двойной бургер чеддар',
      text: 'Булочка для бургера, котлета говяжья, грудинка, красный лук, огурец маринованный, томат, кетчуп, двойной сыр чеддар, горчица, зелень',
      basePrice: 9,
      price: 9,
      grams: 360
    },
  ];

  form = this.fb.group({
    order: ['', Validators.required],
    name: ['', Validators.required],
    phone: ['', Validators.required],
  });

  getRates = async () => {
    try {
      const res = await fetch(this.query)
      const {rates} = await res.json()
      console.log(rates)
      this.rates = rates
      this.exchangeData = [...this.exchangeData].map(item => ({
        ...item, 
        rate: rates[item.symbol]
      }))
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  scrollTo = (e: MouseEvent, target?: HTMLElement) => {
    e.preventDefault();
    target?.scrollIntoView({ behavior: 'smooth' });
  };

  changeCurrency = () => {
		let newCurrency: string
		
		switch (this.currency) {
			case '$':
				newCurrency = '₽'
				break;
			case '₽':
				newCurrency = '₴'
				break;
			case '₴':
				newCurrency = '¥'
				break;
			case '¥':
				newCurrency = '€'
				break;
			case '€':
				newCurrency = '$'
				break;
      default:
        newCurrency = '$'
        break;
		}

		this.currency = newCurrency
		const obj = this.exchangeData.find(item => item.token === newCurrency)
    console.log()
    this.productsData.map(item => {
      let coef = 1

      if (obj?.rate) {
        coef = obj.rate
      }
      
      item.price = (item.basePrice * coef).toFixed(0)
    })

		// cardExtraPrices.forEach(item => {
		// 	item.innerText = `${(parseInt(item.dataset.price) * rate).toFixed(0)} ${newCurrency}`
		// })
  };

  confirmOrder = () => {
    if (this.form.valid) {
      alert('Спасибо за заказ!');
      this.form.reset();
    }
  };
}
