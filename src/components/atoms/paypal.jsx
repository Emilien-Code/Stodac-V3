import React from "react";
import "../../assets/styles/components/atoms/paypal.scss";

const Paypal = ({commandeInfo}) => {

        const paypal = React.useRef(null)

    React.useEffect(() => {
        const script = document.createElement("script");
        // script.src = "https://www.paypal.com/sdk/js?client-id=ASOWp-_1zxWf4EXEzuc47swzhquPSB2XchEHOTMB8Ymv_KwnbQvBXRK9M6BFKqhSMTl90dMSp_qxVQxJ&currency=EUR";
        script.src = "https://www.paypal.com/sdk/js?client-id=ARd5W6m_IfEwriqF5ctXip2H-roEqrJj-VXiTonPVtZQQMQi8H8Lwwp4HeOOMXArfP5C5gh70u1j2ckW&currency=EUR";
        script.addEventListener("load", setLoaded);
        document.body.appendChild(script)
    }, [])

    const setLoaded = ()=> {
        window.paypal
            .Buttons({
              createOrder: (data, actions) => {
                return actions.order.create({
                  purchase_units: [
                    {
                      description: "this.description",
                      amount: {
                        value: 12.56
                      }
                    }
                  ]
                });
              },
              onApprove: async (data, actions) => {
                const order = await actions.order.capture();
                console.log("approuved")
                // this.data;
                // this.paidFor = true;
                // this.sc()
                // this.saveFacture(order.id)
              },
              onError: err => {
                console.log(err);
              }
            })
            .render(paypal.current);
        }
    
        return <div ref={paypal} id="paypal-button-container"></div>

}


export default Paypal
