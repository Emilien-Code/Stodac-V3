import React from "react";
import '../../assets/styles/components/modules/footer.scss'
import { Link } from "react-router-dom"


const Footer = (props)=>{
    return  <footer>
        <div className="marquee">
            
                <p>
                Stodac : Spécialiste de la pièce détachée de poêle à granules.
                </p>
                <p>
                    Stodac : Spécialiste de la pièce détachée de poêle à granules.
                </p>

        </div>
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
                            <li><Link to="/mentions-legales">Mentions légales</Link></li>
                            <li><Link to="/conditions-generales-de-vente">Conditions générales de vente</Link></li>
                        </ul>
                    </article>
                </section>
                <span className="copy-rights">© Stodac tous droits réservés </span>
            </footer>
}
export default Footer