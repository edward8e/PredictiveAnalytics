import _ from "lodash";
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCartError } from '../../../actions';
import { formatMoney } from '../../../utils/Utils';

const useCartErrors = () => {
    const dispatch = useDispatch();
    const cart = useSelector(state => state.cart);
    const { deliveryMinimum, pickupMinimum } = useSelector(state => state.business.settings);
    const deliveryCheck = cart.info.cateringType === "Delivery";
    const pickupCheck = cart.info.cateringType === "Pickup";
    const subtotal = _.sumBy(cart.items, ({ amount, price }) => { return amount * price; });

    useEffect(() => {
        if (deliveryCheck && subtotal < deliveryMinimum) {
            dispatch(setCartError({ valid: false, message: `Minimum of ${formatMoney(deliveryMinimum)} subtotal for Delivery.` }))
            return;
        }
        if (pickupCheck && subtotal < pickupMinimum) {
            dispatch(setCartError({ valid: false, message: `Minimum of ${formatMoney(pickupMinimum)} subtotal for Pickup.` }))
            return;
        }
        if (cart.items.length === 0){
            dispatch(setCartError({ valid: false, message: null }))
            return;
        }
        dispatch(setCartError({ valid: true, message: null }))
    }, [subtotal, deliveryCheck, pickupCheck])
}
export default useCartErrors;