import React from "react";
const PntRelais = () => {
    React.useEffect(()=>{
        const script = document.createElement("script");
        script.src = "https://ws.colissimo.fr/widget-colissimo/js/jquery.plugin.colissimo.min.js";
        script.setAttribute("id", "ColissimoPDR")
        document.body.appendChild(script);

        script.addEventListener("load", ()=>{
             console.log('script chargé')
             callColissimo()
        })

        setTimeout(()=> {
            const a = document.querySelector("#widget-container").getBoundingClientRect()
            console.log("GBR", a)
            document.querySelector(".pnt-relais-container").style.height = a.height
        }, 1000)


        return () => {
            document.querySelector("#ColissimoPDR").remove()
        }
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
                "ceAddress" : "",
                "ceZipCode" : "54000",
                "ceTown" : "Nancy",
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
        </div>
    )
}

export default PntRelais