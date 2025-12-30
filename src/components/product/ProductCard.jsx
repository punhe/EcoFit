import { useDidMount } from '@/hooks';
import { Card, CardBody, CardFooter, Image, Button, Skeleton } from '@nextui-org/react';
import PropType from 'prop-types';
import React from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '@/redux/actions/cartActions';
import { formatVND } from '@/helpers/utils';

const ProductCardSkeleton = () => (
  <Card className="w-full" shadow="sm">
    <Skeleton className="rounded-lg">
      <div className="h-48 w-full bg-default-300" />
    </Skeleton>
    <CardBody className="overflow-visible p-4">
      <Skeleton className="rounded-lg">
        <div className="h-4 w-3/4 mb-2" />
      </Skeleton>
      <Skeleton className="rounded-lg">
        <div className="h-3 w-1/2 mb-2" />
      </Skeleton>
      <Skeleton className="rounded-lg">
        <div className="h-4 w-1/3" />
      </Skeleton>
    </CardBody>
    <CardFooter className="pt-0">
      <Skeleton className="rounded-lg">
        <div className="h-10 w-full" />
      </Skeleton>
    </CardFooter>
  </Card>
);

const ProductCard = ({ product, isLoading }) => {
  const dispatch = useDispatch();
  const didMount = useDidMount();

  const handleAddToCart = () => {
    if (product.quantity > 0) {
      dispatch(addToCart(product));
    }
  };

  if (!didMount || isLoading) {
    return <ProductCardSkeleton />;
  }

  return (
    <Card 
      className="w-full hover:scale-105 transition-transform duration-200" 
      shadow="sm"
      isPressable
      onPress={() => window.location.href = `/product/${product.id}`}
    >
      <CardBody className="overflow-visible p-0">
        <Image
          shadow="sm"
          radius="lg"
          width="100%"
          alt={product.name}
          className="w-full object-cover h-[200px]"
          src={product.image}
        />
      </CardBody>
      <CardFooter className="text-small flex flex-col items-start gap-2 p-4">
        <div className="w-full">
          <h4 className="font-semibold text-lg mb-1 line-clamp-2">{product.name}</h4>
          <p className="text-default-500 text-sm mb-2">{product.brand}</p>
          <p className="text-primary font-bold text-xl">{formatVND(product.price)}</p>
        </div>
        <Button
          color="primary"
          variant="flat"
          className="w-full"
          onClick={(e) => {
            e.stopPropagation();
            handleAddToCart();
          }}
          isDisabled={product.quantity < 1}
          isLoading={isLoading}
        >
          {product.quantity < 1 ? 'Hết hàng' : 'Thêm vào giỏ hàng'}
        </Button>
      </CardFooter>
    </Card>
  );
};

ProductCard.propTypes = {
  product: PropType.object.isRequired,
  isLoading: PropType.bool.isRequired,
};

export default ProductCard; 