import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";

export default component$(() => {
  return (
    <>
    <div class="container border-0">

     <div class="card border-0">
      <div class="card-header">
        <h1>About Us</h1>
        <div class="card-body">
          <div class="card-text">
          <div class="card mb-3 border-0">
              <div class="row g-0">
                <div class="col-md-4">
                  <img src="/images/about.jpg" class="img-fluid rounded-start" alt="..."/>
                </div>
                <div class="col-md-8">
                  <div class="card-body">
                    <h5 class="card-title">Overview</h5>
                    <p class="card-text" style="text-align: justify;">
                      Founded in 1898 by pharmacist Caleb Bradham, the brand and its parent company have expanded from their namesake soda to a diverse portfolio of beverages and convenient foods, including brands like Mountain Dew, Lay's, and Doritos. PepsiCo's products are sold in over 200 countries and territories worldwide, competing with Coca-Cola in the long-standing "cola wars".
                    </p>                  
                  </div>
                </div>
                <p class="card-text">
                  <strong>Origins and Evolution</strong>
                </p>
                <p class="card-text">
                  <strong>Inventor:</strong><br/>
                  Pharmacist Caleb Bradham invented the drink in 1898, initially selling it as "Brad's Drink" from his soda fountain. 
                </p>
                <p class="card-text">
                <strong>Renaming:</strong><br/>
                It was later renamed Pepsi-Cola and marketed as a digestive aid and a health tonic. 

                </p>
              </div>
          </div>            
          </div>
        </div>
      </div>
     </div>




    </div>
    </>
  );
});

export const about: DocumentHead = {
  title: "Pepsi Cola Botlers Inc.",
  meta: [
    {
      name: "description",
      content: "Pepsi Cola Home Page",
    },
  ],
};
