import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";

export default component$(() => {
  return (
  <div class="container border-0">
    <div class="card mb-3 mt-5 border-0">
      <div class="row g-0">
      <h3>Contact Us</h3>

        <div class="col-md-4">
          <img src="/images/contact.jpg" class="img-fluid rounded-start" alt="..."/>
        </div>
        <div class="col-md-8">
          <div class="card-body">
            <h5 class="card-title">Office Information</h5>
            <p class="card-text">
            Pepsi, originally created in 1893 by Caleb Bradham and named "Brad's Drink," was first sold in his drugstore in New Bern, North Carolina. Renamed Pepsi-Cola in 1898 due to its supposed digestive benefits, it was shortened to Pepsi in 1961              
              </p>
            <p class="card-text"><small class="text-body-secondary">
            Our main office is located at 700 Anderson Hill Road, Purchase, New York 10577, United States. Our global website at <a href="www.pepsico.com">www.pepsico.com</a>              
              </small></p>

              <p class="card-text"><small class="text-body-secondary">
              For customer inquiries, you can contact PepsiCo by phone at (800) 433-2652. 

              </small></p>

          </div>

        </div>
        <div class="container my-4">
            <div class="ratio ratio-16x9">
              <video autoplay loop controls class="no-controls w-100">
                <source src="/images/explosion.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>          

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
