import { component$, $, useSignal, useVisibleTask$, useStore } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
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
  const page = useSignal(0);
  const totpage = useSignal(0);
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
  

   const fetchProducts = $(async(pg: any) => {
     api.get<Productdata>(`/api/listproducts/${pg}`)
    .then((res: any) => {
      const data: Product = res.data;
      state.items = data.products;
      totpage.value = res.data.totpage;
      page.value = res.data.page;
    }, (error: any) => {
      console.log(error.response.data.message);
            // message.value = error.response.data.message;
    }); 
  });


  useVisibleTask$(() => {
    fetchProducts(1);
  });

  const firstPage =  $(async(event: any) => {
    event.preventDefault();    
    let pg = 1;
    page.value = pg;
    fetchProducts(pg);
    return;    
  });

  const nextPage = $(async(event: Event) => {
    event.preventDefault();    
    if (page.value === totpage.value) {
        return;
    }
    let pg  = page.value + 1;
    fetchProducts(pg);
    return;
  });

  const prevPage =  $(async(event: any) => {
    event.preventDefault();    
    if (page.value === 1) {
      return;
      }
      page.value--;
      fetchProducts(page.value);
      return;    
  });

  const lastPage = $(async(event: any) => {
    event.preventDefault();
    let pg = totpage.value;
    page.value = pg;
    fetchProducts(page.value);
    return;    
  });


  return (
    <>
    <div class="container mt=5">
            <h1>Products List</h1>

            <table class="table">
            <thead>
                <tr>
                <th scope="col">#</th>
                <th scope="col">Descriptions</th>
                <th scope="col">Qty</th>
                <th scope="col">Unit</th>
                <th scope="col">Price</th>
                </tr>
            </thead>
            <tbody>
            {state.items.map((item) => (
              <tr key={item.id}>
                 <td>{item.id}</td>
                 <td>{item.descriptions}</td>
                 <td>{item.qty}</td>
                 <td>{item.unit}</td>
                 <td>&#8369;${toDecimal(item.sellPrice)}</td>
               </tr>
            ))}

            </tbody>
            </table>

        <nav aria-label="Page navigation example">
        <ul class="pagination">
          <li class="page-item"><button type="button" onClick$={lastPage} class="page-link">Last</button></li>
          <li class="page-item"><button type="button" onClick$={prevPage} class="page-link">Previous</button></li>
          <li class="page-item"><button type="button" onClick$={nextPage} class="page-link">Next</button></li>
          <li class="page-item"><button type="button" onClick$={firstPage} class="page-link">First</button></li>
          <li class="page-item page-link text-danger">Page&nbsp;{page.value} of&nbsp;{totpage.value}</li>
        </ul>
      </nav>
  </div>    

    </>
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
