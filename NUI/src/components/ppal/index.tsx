import { PayPalButtons } from "@paypal/react-paypal-js";

interface PayPalButtonInterface {
    totalValue: number;
}

const Paypal: React.FC<PayPalButtonInterface> = (props) => {
    return (
        <>
            <PayPalButtons
                style={{
                    layout: 'horizontal',
                    color: 'gold',
                    shape: 'rect',
                    label: 'pay',
                    tagline: false,
                    fundingicons: false,
                    height: 40
                }}
                createOrder={(data, actions) => {
                    return actions.order.create({
                        purchase_units: [
                            {
                                amount: {
                                    value: props.totalValue,
                                }
                            },
                        ],
                    });
                }}
                onApprove={async (data, actions) => {
                    const order = await actions.order?.capture()
                    console.log(order);
                }}
            />
        </>
    )
}

export default Paypal;