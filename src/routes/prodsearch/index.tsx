import { component$, $, useSignal, useVisibleTask$, useStore } from "@builder.io/qwik";
import { Form, type DocumentHead } from "@builder.io/qwik-city";
import axios from "axios";

const api = axios.create({
    baseURL: "https://localhost:7292",
    headers: {'Accept': 'application/json',
              'Content-Type': 'application/json'}
  })

export interface Productdata {
    totpage: string,
    page: string,
    products: Product
  }
  
  export interface Product {
    id: number;
    category: string;
    descriptions: string
    qty: number;
    unit: string;
    costPrice: number;
    sellPrice: number;
    salePrice: number;
    productpicture: string;
    alertstocks: number;
    criticalstocks: number;
  }  

  export interface ProductApiResponse {
    data: Product[]; // Assuming the API returns an array of products
  }

export default component$(() => {
  const message = useSignal('');
  const search = useSignal('');
  const state = useStore<Productdata>({
    items: [],
  });

  function toDecimal(x1: any) {
    const formatter = new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2, // Ensures at least two decimal places
      maximumFractionDigits: 2, // Limits to two decimal places
    });
    // Format the number
    return formatter.format(x1);
  };
  
  const getProdsearch = $(async(event: Event) => {
    event.preventDefault();
    message.value = "please wait...";
    const data = JSON.stringify({ search: search.value});
    await api.post<Productdata>("/api/searchproducts",data)
    .then((res: any) => {
        const data: Product = res.data;
        message.value = res.data.message;
        state.items = data.products;
        setTimeout(() => {
          message.value = '';      
        }, 3000);
    
    }, (error: any) => {
      message.value = error.response.data.message;
      setTimeout(() => {
        message.value = '';      
      }, 3000);
      return;
    });  

  });

  return (
    <div class="container mb-10">
        <h2>Products Search</h2>

        <Form class="row g-3" onSubmit$={getProdsearch} autocomplete="off">
            <div class="col-auto">
              <input type="text" required  onInput$={(e) => (search.value = (e.target as HTMLInputElement).value)}
              value={search.value} class="form-control-sm" id="search" name="search" placeholder="enter Product keyword"/>
              <div class='text-danger searcMsg'>{message.value}</div>
            </div>
            <div class="col-auto">
              <button type="submit" class="btn btn-primary btn-sm mb-3">search</button>
            </div>

        </Form>
        <div class="container mb-10">
          <div class="card-group">
              {state.items.map((item) => (
                <div class='col-md-4'>
                  <div key={item.id} class="card card-fixed-height mx-3 mt-3">
                    <img src={item.productPicture} class="card-img-top" alt=""/>
                    <div class="card-body">
                      <h5 class="card-title">Descriptions</h5>
                      <p class="card-text">{item.descriptions}</p>
                    </div>
                    <div class="card-footer">
                      <p class="card-text text-danger"><span class="text-dark">PRICE :</span>&nbsp;<strong>&#8369;${toDecimal(item.sellPrice)}</strong></p>
                    </div>  
                  </div>                
                </div>
              ))}
          </div>          
        </div>
    </div>
    
  );
});

export const contact: DocumentHead = {
  title: "Pepsi Cola Botlers Inc.",
  meta: [
    {
      name: "description",
      content: "Pepsi Cola Home Page",
    },
  ],
};
