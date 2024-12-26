import React from 'react'

import {PayPalScriptProvider,PayPalButtons} from "@paypal/react-paypal-js"

const FormPaypal=({Total})=> {
    const totalFormatted = parseFloat(Total);
   
    
    // const totalDolares = totalFormatted / 512
   ` if (isNaN(totalFormatted) || totalFormatted <= 0) {
        console.error("Total inválido:", Total);
        return <div>Error: Total inválido.</div>; // Muestra un mensaje si el total es incorrecto
    }`



    const initianlOptions ={
        "clientId":"AXgyHom9ZRQg-BUdg0WjNVAtCvbfXqnoeAxAd4twXMek1iQrl2iYpnjtNt_9CJWEme4odWjQ1jZ_ga1c",
         currency:"USD",
         intent:"capture"
    }
    const createOrder = (data,actions)=> {
          return actions.order.create({
            purchase_units:[
                {
                    amount:{
                        currency:"USD",
                        value:totalFormatted.toFixed(2)
                    }
                }
            ]

        })
    }

    const onApprove = (data,actions)=> {
      return actions.order.capture().then(function(details){
        alert("Pago Completado " + details.payer.name.given_name)
      })
    }

    const onCancel = () => {
        alert("Pago Cancelado");
    };


  return (

    <div>
        <PayPalScriptProvider options={initianlOptions} >

            <PayPalButtons

            style={{
                layout: "horizontal",
                color: "blue",
                shape:"rect",
                label: "paypal"
            }}
            createOrder={(data,actions)=>createOrder(data,actions)}
            onApprove={(data,actions)=> onApprove(data,actions)}
            onCancel={onCancel}
            
            />

        </PayPalScriptProvider>
    </div>
  )

}



export default FormPaypal
﻿