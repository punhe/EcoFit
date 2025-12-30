import { ImageLoader } from '@/components/common';
import { Card, CardBody, CardFooter, Image, Skeleton } from '@nextui-org/react';
import PropType from 'prop-types';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const ProductFeatured = ({ product }) => {
  const navigate = useNavigate();
  const onClickItem = () => {
    if (!product || !product.id) return;
    navigate(`/product/${product.id}`);
  };

  if (!product || !product.id) {
    return (
      <Card className="w-full" shadow="sm">
        <Skeleton className="rounded-lg">
          <div className="h-48 w-full bg-default-300" />
        </Skeleton>
        <CardBody className="overflow-visible p-4">
          <Skeleton className="rounded-lg">
            <div className="h-4 w-3/4 mb-2" />
          </Skeleton>
          <Skeleton className="rounded-lg">
            <div className="h-3 w-1/2" />
          </Skeleton>
        </CardBody>
      </Card>
    );
  }

  return (
    <Card 
      className="w-full hover:scale-105 transition-transform duration-200" 
      shadow="sm"
      isPressable
      onPress={onClickItem}
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
      <CardFooter className="text-small flex flex-col items-start gap-1 p-4">
        <h2 className="font-semibold text-lg line-clamp-2">{product.name}</h2>
        <p className="text-default-500 text-sm italic">{product.brand}</p>
      </CardFooter>
    </Card>
  );
};

ProductFeatured.propTypes = {
  product: PropType.shape({
    image: PropType.string,
    name: PropType.string,
    id: PropType.string,
    brand: PropType.string
  }).isRequired
};

export default ProductFeatured;
