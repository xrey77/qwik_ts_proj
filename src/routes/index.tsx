import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";

export default component$(() => {
  return (
    <>
<div id="carouselExampleCaptions" class="carousel slide">
  <div class="carousel-indicators">
    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
  </div>
  <div class="carousel-inner">
    <div class="carousel-item active">
      <img src="/images/1.png" class="d-block w-100" alt="..."/>
      <div class="carousel-caption d-none d-md-block">
      </div>
    </div>
    <div class="carousel-item">
      <img src="/images/2.png" class="d-block w-100" alt="..."/>
      <div class="carousel-caption d-none d-md-block">
      </div>
    </div>
    <div class="carousel-item">
      <img src="/images/3.png" class="d-block w-100" alt="..."/>
      <div class="carousel-caption d-none d-md-block">
      </div>
    </div>
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>    
<div class="card mx-3 border-0">
  <div class="card-header border-0">
    <h4 class="text-center emboss-menu">
    Pepsi Marketing Strategy: How the Brand Stays Ahead of the Competition      
    </h4>
  </div>
  <div class="card-body">
    <p class="card-text align-justify">
    Renowned all over the world, Pepsi is definitely a necessary component of people’s gatherings and meals! But have you ever wondered how this company came to be, given its evident success? Beginning as a small operation in North Carolina in 1893, Pepsi has grown into a global phenomenon, with distribution in over 200 countries. As one of the largest food and beverage companies in the world, PepsiCo has had a significant impact on the marketing industry. PepsiCo’s marketing strategy is one that every marketer ought to look at to gain insight from because it has an extensive record of effective marketing campaigns and creative approaches.<br/><br/>
    In 2020, despite the global challenges posed by the pandemic, PepsiCo reported a net revenue of over $70 billion, underscoring its resilience and the effectiveness of its diversified portfolio strategy. This figure not only reflects the brand’s financial health but also its ability to adapt and thrive in changing market conditions.    
    </p>
  </div>
</div>
    </>
  );
});

export const head: DocumentHead = {
  title: "Pepsi Cola Botlers Inc.",
  meta: [
    {
      name: "description",
      content: "Pepsi Cola Home Page",
    },
  ],
};
