/* eslint-disable react/jsx-props-no-spreading */
import { LoadingOutlined } from '@ant-design/icons';
import { Boundary, MessageDisplay } from '@/components/common';
import { ProductGrid } from '@/components/product';
import { useDidMount } from '@/hooks';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { setRequestStatus } from '@/redux/actions/miscActions';
import { searchProduct } from '@/redux/actions/productActions';

const Search = () => {
  const { searchKey } = useParams();
  const dispatch = useDispatch();
  const didMount = useDidMount(true);
  const store = useSelector((state) => ({
    isLoading: state.app.loading,
    products: state.products.searchedProducts.items,
    basket: state.basket,
    requestStatus: state.app.requestStatus
  }));

  useEffect(() => {
    if (didMount && !store.isLoading && searchKey) {
      dispatch(searchProduct(searchKey));
    }
  }, [searchKey]);

  useEffect(() => () => {
    dispatch(setRequestStatus(''));
  }, []);

  if (store.requestStatus && !store.isLoading) {
    return (
      <main className="content">
        <MessageDisplay
          message={store.requestStatus}
          desc="Thử sử dụng từ khóa khác."
        />
      </main>
    );
  }

  if (!store.requestStatus && !store.isLoading) {
    return (
      <Boundary>
        <main className="content">
          <section className="product-list-wrapper product-list-search">
            {!store.requestStatus && searchKey && (
              <div className="product-list-header">
                <div className="product-list-header-title">
                  <h5>
                    {`Tìm thấy ${store.products.length} ${store.products.length > 1 ? 'sản phẩm' : 'sản phẩm'} với từ khóa "${searchKey}"`}
                  </h5>
                </div>
              </div>
            )}
            <ProductGrid products={store.products} />
          </section>
        </main>
      </Boundary>
    );
  }

  return (
    <main className="content">
      <div className="loader">
        <h4>Đang tìm kiếm sản phẩm...</h4>
        <br />
        <LoadingOutlined style={{ fontSize: '3rem' }} />
      </div>
    </main>
  );
};

export default Search;
