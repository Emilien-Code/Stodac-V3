import React from "react";
const PntRelais = () => {
    const widgetContainer = React.useRef(null)

    React.useEffect(()=>{

        callColissimo()

    }, [])
    
    const callColissimo = ()=>{
        fetch('https://stodac.fr/api/utils/token')
        .then((response) => response.json())
        .then((response) => {
            window.$('#widget-container').frameColissimoOpen({
            "ceLang" : "fr",
            "URLColissimo": " https://ws.colissimo.fr",
            "ceCountryList": "FR",
            "callBackFrame": "noCallBack",
            "ceCountry": "FR",
            "dyPreparationTime": 1,
            "token": response.token,
          })
        }).catch(()=>{
            // callColissimo()
        })
      }


    return (
        <div id="ptnrelais">
            <div id="widget-container" ref={widgetContainer}></div>
            <input type="hidden" id="pudoWidgetErrorCode"/>
            <input type="hidden" id="pudoWidgetAddress1"/>
            <input type="hidden" id="pudoWidgetTown"/>
            <input type="hidden" id="pudoWidgetZipCode"/>
        </div>
    )
}

export default PntRelais