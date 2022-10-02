import React from "react";
import '../../assets/styles/components/modules/footer.scss'
const Footer = ()=>{
    return  <footer>
                <section className="slider">
                    <span>Stodac</span>
                    <span>Stodac</span>
                    <span>Stodac</span>
                    <span>Stodac</span>
                    <span>Stodac</span>
                    <span>Stodac</span>
                    <span>Stodac</span>
                    <span>Stodac</span>
                </section>
                <section className="infos">
                    <article>
                        <h3>Paiement</h3>
                        <ul>
                            <li>Carte bleue</li>
                            <li>Paypal</li>
                            <li>Virement</li>
                            <li>Chèque</li>
                        </ul>
                    </article>
                    <article>
                        <h3>Nous contacter</h3>
                        <ul>
                            <li>contact@stodac.fr</li>
                        </ul>
                    </article>
                    <article>
                        <h3>Droits</h3>
                        <ul>
                            <li><a href="/mentions-legales">Mentions légales</a></li>
                            <li><a href="conditions-generales-de-vente">Conditions générales de vente</a></li>
                        </ul>
                    </article>
                </section>
                <span className="copy-rights">© Stodac tous droits réservés </span>
            </footer>
}
export default Footer