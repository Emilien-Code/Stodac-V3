import React from "react";
import "../../../../assets/styles/components/modules/filters/admin/filtersCommande.scss"
import Button from "../../../atoms/Button"
const Filters = ()=> {



    return <div className="admin-filters">
        <h4>Ordoner</h4>
        <div>
            <form>
                <Button type="radio" value="newer" content="Plus récent"/>
                <Button type="radio" value="older" content="Plus ancien"/>
            </form>
        </div>
        <h4>Filtres</h4>
        <div>
            <form>
                <Button type="radio" value="paypal" content="Paypal"/>
                <Button type="radio" value="cheque" content="Cheque"/>
                <Button type="radio" value="virement" content="Virement"/>
                <Button type="radio" value="Enattentedepaiement" content="En attente de paiement"/>
                <Button type="radio" value="Evoyée" content="Evoyée"/>
                <Button type="radio" value="Payée" content="Payée"/>
            </form>
        </div>

    </div >

}

export default Filters 