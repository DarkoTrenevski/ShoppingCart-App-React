import {Button, Card} from "react-bootstrap";
import {formatCurrency} from "../utilities/formatCurrency.ts";
import {useShoppingCart} from "../context/ShoppingCartContext.tsx";

type StoreItemProps = {
    id: number
    name: string
    price: number
    imgUrl: string
}

export function StoreItem({id, name, price, imgUrl}: StoreItemProps) {

    const {getItemQuantity,
        increaseCartQuantity,
        decreaseCartQuantity,
        removeFromCart} = useShoppingCart()

    const quantity = getItemQuantity(id)

    return <Card className="h-100">
            <Card.Img variant="top" src={imgUrl} height="350px" style={{objectFit:"cover"}}/>
            <Card.Body className="d-flex flex-column">
                <Card.Title className="d-flex justify-content-baseline align-items-center mb-4">
                    <span className="fs-2">{name}</span>
                    <span className="ms-auto text-muted">{formatCurrency(price)}</span>
                </Card.Title>
            <div className="mt-auto">
                {quantity === 0 ? (<Button onClick={() => increaseCartQuantity(id)} className="w-100">+ Add to Cart</Button>) : <div className="d-flex align-items-center justify-content-center flex-column" style={{gap:".5rem"}}>
                    <div className="d-flex align-items-center justify-content-center " style={{gap:".5rem"}}>
                    <Button onClick={() => decreaseCartQuantity(id)}>-</Button>
                        <div>
                            <span className="fs-3">{quantity}</span> in cart
                        </div>
                    <Button onClick={() => increaseCartQuantity(id)}>+</Button>
                    </div>
                    <Button onClick={() => removeFromCart(id)} size="sm" variant="danger">Remove Item</Button>
                </div>
                }
            </div>
        </Card.Body>
    </Card>
}