import { PayPalButtons } from "@paypal/react-paypal-js";

interface PayPalButtonInterface {
    totalValue: number;
    paymentMade: () => void;
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
                                    value: props.totalValue.toString(),
                                }
                            },
                        ],
                    });
                }}
                onApprove={async (data, actions) => {
                    const order = await actions.order?.capture();
                    console.log(order);
                    props.paymentMade();
                }}
                onError={(err) => {
                    console.error('Error in payment process:', err);
                }}
            />
        </>
    );
}

export default Paypal;
