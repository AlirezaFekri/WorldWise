// Uses the same styles as Product
import useTitle from "../hooks/useTitle";
import styles from "./Product.module.css";
import pricingImg from "./../assets/img/img-2.jpg"

export default function Product() {
  useTitle("Pricing")
  return (
    <main className={styles.product}>
      <section>
        <div>
          <h2>
            Simple pricing.
            <br />
            Just $9/month.
          </h2>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vitae vel
            labore mollitia iusto. Recusandae quos provident, laboriosam fugit
            voluptatem iste.
          </p>
        </div>
        <img src={pricingImg} alt="overview of a large city with skyscrapers" />
      </section>
    </main>
  );
}