import React from "react";
const PntRelais = () => {
    React.useEffect(()=>{
        const script = document.createElement("script");
        script.src = "https://ws.colissimo.fr/widget-point-retrait/resources/js/jquery.plugin.colissimo.min.js";
        document.body.appendChild(script);

        script.addEventListener("load", ()=>{
             console.log('script chargé')
             callColissimo()
        })
    }, [])

    function callColissimo  (){
        fetch('https://stodac.fr/api/utils/token')
        .then((response) => response.json())
        .then((response) => {
            window.$('#widget-container').frameColissimoOpen({
                "ceLang" : "fr",
                "URLColissimo": " https://ws.colissimo.fr",
                "ceCountryList": "FR",
                "callBackFrame": "test",
                "ceCountry": "FR",
                "dyPreparationTime": 1,
            "token": response.token,
          })
        }).catch(err=>{
            console.log(err)
        })

      }


    return (
        <div id="ptnrelais">
            <div id="widget-container">
                
            </div>
            <input type="hidden" id="pudoWidgetErrorCode" onChange={(e)=>test(e)}/>
            <input type="hidden" id="pudoWidgetAddress1" onChange={(e)=>test(e)}/>
            <input type="hidden" id="pudoWidgetTown" onChange={(e)=>test(e)}/>
            <input type="hidden" id="pudoWidgetCountry" onChange={(e)=>test(e)}/>
            <input type="hidden" id="pudoWigdetType" onChange={(e)=>test(e)}/>
            <input type="hidden" id="pudoWidgetZipCode" onChange={(e)=>test(e)}/>
        </div>
    )
}

export default PntRelais