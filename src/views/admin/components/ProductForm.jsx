/* eslint-disable jsx-a11y/label-has-associated-control */
import { CheckOutlined, LoadingOutlined } from "@ant-design/icons";
import { ImageLoader } from "@/components/common";
import {
  CustomCreatableSelect,
  CustomInput,
  CustomTextarea,
} from "@/components/formik";
import { Field, FieldArray, Form, Formik } from "formik";
import PropType from "prop-types";
import React from "react";
import * as Yup from "yup";

const brandOptions = [
  { value: "Showroom & Shop", label: "Showroom & Shop" },
  { value: "Đồ nội thất", label: "Đồ nội thất" },
  { value: "Bàn ghế", label: "Bàn ghế" },
  { value: "Giường - tủ", label: "Giường - tủ" },
  { value: "Đồ Kinh Doanh", label: "Đồ Kinh Doanh" },
];

const category = [
  { value: "HY", label: "HY" },
  { value: "ĐG", label: "ĐG" },
  { value: "QH", label: "QH" },
  { value: "TGDC", label: "TGDC" },
];

const FormSchema = Yup.object().shape({
  name: Yup.string()
    .required("Bắt buộc phải có tên sản phẩm.")
    .max(60, "Tên sản phẩm không được vượt quá 60 ký tự."),
  brand: Yup.string()
    .required("Vui lòng chọn danh mục sản phẩm."),
  category: Yup.string()
    .required("Bắt buộc phải có kho sản phẩm.")
    .max(60, "Tên kho không được vượt quá 60 ký tự."),
  price: Yup.number()
    .positive("Giá không hợp lệ.")
    .integer("Giá phải là một số nguyên dương.")
    .min(1000, "Giá tối thiểu là 1.000 VNĐ")
    .required("Bắt buộc phải có giá sản phẩm."),
  description: Yup.string().required("Vui lòng nhập mô tả sản phẩm."),
  maxQuantity: Yup.number()
    .positive("Số lượng không hợp lệ.")
    .integer("Số lượng phải là một số nguyên.")
    .required("Bắt buộc phải có số lượng."),
  keywords: Yup.array().of(Yup.string()),
  sizes: Yup.array().of(Yup.number()),
  isFeatured: Yup.boolean(),
  isRecommended: Yup.boolean(),
  availableColors: Yup.array().of(Yup.string().required()),
  image: Yup.string().required("Vui lòng nhập link ảnh sản phẩm."),
  imageCollection: Yup.array().of(Yup.string())
});

const ProductForm = ({ product, onSubmit, isLoading }) => {
  const initFormikValues = {
    name: product?.name || "",
    brand: product?.brand || "",
    category: product?.category || "",
    price: product?.price || 0,
    maxQuantity: product?.maxQuantity || 0,
    description: product?.description || "",
    keywords: product?.keywords || [],
    sizes: product?.sizes || [],
    isFeatured: product?.isFeatured || false,
    isRecommended: product?.isRecommended || false,
    availableColors: product?.availableColors || [],
    image: product?.image || "",
    imageCollection: product?.imageCollection || []
  };

  const onSubmitForm = (form) => {
    if (form.image) {
      onSubmit({
        ...form,
        quantity: 1,
        name_lower: form.name.toLowerCase(),
        dateAdded: new Date().getTime(),
        image: form.image,
        imageCollection: form.imageCollection
      });
    } else {
      alert("Vui lòng nhập link ảnh sản phẩm.");
    }
  };

  const handleFeaturedChange = (e, setValues, values) => {
    setValues({ ...values, isFeatured: e.target.checked });
  };

  const handleRecommendedChange = (e, setValues, values) => {
    setValues({ ...values, isRecommended: e.target.checked });
  };

  const renderImageCollection = ({ push, remove }, values) => (
    <div>
      {values.imageCollection.map((url, index) => (
        <div key={`image-${url}-${index}`} className="d-flex">
          <Field
            name={`imageCollection.${index}`}
            type="text"
            placeholder="https://example.com/image.jpg"
            component={CustomInput}
            className="flex-grow-1"
            label={`Ảnh ${index + 1}`}
          />
          <button
            type="button"
            onClick={() => remove(index)}
            className="button button-small"
          >
            Xóa
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={() => push("")}
        className="button button-small"
      >
        Thêm ảnh
      </button>
    </div>
  );

  return (
    <div>
      <Formik
        initialValues={initFormikValues}
        validateOnChange
        validationSchema={FormSchema}
        onSubmit={onSubmitForm}
      >
        {({ values, setValues }) => (
          <Form className="product-form">
            <div className="product-form-inputs">
              <div className="d-flex">
                <div className="product-form-field">
                  <Field
                    disabled={isLoading}
                    name="name"
                    type="text"
                    label="* Tên sản phẩm"
                    placeholder="Gago"
                    style={{ textTransform: "capitalize" }}
                    component={CustomInput}
                  />
                </div>
                &nbsp;
                <div className="product-form-field">
                  <CustomCreatableSelect
                    defaultValue={{ label: values.brand, value: values.brand }}
                    name="brand"
                    id="brand"
                    options={brandOptions}
                    disabled={isLoading}
                    placeholder="Chọn/Tạo danh mục"
                    label="* Danh mục sản phẩm"
                  />
                </div>
              </div>
              <div className="product-form-field">
                <CustomCreatableSelect
                  defaultValue={{ label: values.brand, value: values.brand }}
                  name="category"
                  iid="category"
                  options={category}
                  disabled={isLoading}
                  placeholder="Select/Create category"
                  label="* Kho sản phẩm"
                />
              </div>
              <div className="product-form-field">
                <Field
                  disabled={isLoading}
                  name="description"
                  id="description"
                  rows={3}
                  label="* Mô tả sản phẩm"
                  component={CustomTextarea}
                />
              </div>
              <div className="d-flex">
                <div className="product-form-field">
                  <Field
                    disabled={isLoading}
                    name="price"
                    id="price"
                    type="number"
                    label="* Giá (VNĐ)"
                    component={CustomInput}
                    placeholder="Nhập giá sản phẩm"
                  />
                </div>
                &nbsp;
                <div className="product-form-field">
                  <Field
                    disabled={isLoading}
                    name="maxQuantity"
                    type="number"
                    id="maxQuantity"
                    label="* Số lượng"
                    component={CustomInput}
                  />
                </div>
              </div>
              <div className="d-flex">
                <div className="product-form-field">
                  <CustomCreatableSelect
                    defaultValue={values.keywords.map((key) => ({
                      value: key,
                      label: key,
                    }))}
                    name="keywords"
                    id="keywords"
                    isMulti
                    disabled={isLoading}
                    placeholder="Tạo/Chọn từ khóa"
                    label="Từ khóa"
                  />
                </div>
                &nbsp;
                <div className="product-form-field">
                  <CustomCreatableSelect
                    defaultValue={values.sizes.map((size) => ({
                      value: size,
                      label: size,
                    }))}
                    name="sizes"
                    id="sizes"
                    type="number"
                    isMulti
                    disabled={isLoading}
                    placeholder="Tạo/Chọn kích thước"
                    label="Kích thước (mm)"
                  />
                </div>
              </div>
              <div className="product-form-field">
                <Field
                  disabled={isLoading}
                  name="image"
                  type="text"
                  label="* Link ảnh chính"
                  placeholder="https://example.com/image.jpg"
                  component={CustomInput}
                />
              </div>
              <div className="product-form-field">
                <span className="d-block padding-s">Bộ sưu tập ảnh (Links)</span>
                <FieldArray name="imageCollection">
                  {(arrayHelpers) => renderImageCollection(arrayHelpers, values)}
                </FieldArray>
              </div>
              <br />
              <div className="d-flex">
                <div className="product-form-field">
                  <input
                    checked={values.isFeatured}
                    className=""
                    id="featured"
                    onChange={(e) => handleFeaturedChange(e, setValues, values)}
                    type="checkbox"
                  />
                  <label htmlFor="featured">
                    <h5 className="d-flex-grow-1 margin-0">
                      &nbsp; Thêm vào sản phẩm nổi bật &nbsp;
                    </h5>
                  </label>
                </div>
                <div className="product-form-field">
                  <input
                    checked={values.isRecommended}
                    className=""
                    id="recommended"
                    onChange={(e) => handleRecommendedChange(e, setValues, values)}
                    type="checkbox"
                  />
                  <label htmlFor="recommended">
                    <h5 className="d-flex-grow-1 margin-0">
                      &nbsp; Thêm vào sản phẩm đề xuất &nbsp;
                    </h5>
                  </label>
                </div>
              </div>
              <br />
              <br />
              <br />
              <div className="product-form-field product-form-submit">
                <button className="button" disabled={isLoading} type="submit">
                  {isLoading ? <LoadingOutlined /> : <CheckOutlined />}
                  &nbsp;
                  {isLoading ? "Đang lưu..." : "Lưu sản phẩm"}
                </button>
              </div>
            </div>
            {/* Preview section */}
            <div className="product-form-file">
              <div className="product-form-field">
                <span className="d-block padding-s">* Xem trước ảnh</span>
              </div>
              <div className="product-form-image-wrapper">
                {values.image && (
                  <ImageLoader
                    alt="Preview"
                    className="product-form-image-preview"
                    src={values.image}
                  />
                )}
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

ProductForm.propTypes = {
  product: PropType.shape({
    name: PropType.string,
    brand: PropType.string,
    price: PropType.number,
    maxQuantity: PropType.number,
    description: PropType.string,
    keywords: PropType.arrayOf(PropType.string),
    imageCollection: PropType.arrayOf(PropType.string),
    sizes: PropType.arrayOf(PropType.number),
    image: PropType.string,
    isFeatured: PropType.bool,
    isRecommended: PropType.bool,
    availableColors: PropType.arrayOf(PropType.string),
  }).isRequired,
  onSubmit: PropType.func.isRequired,
  isLoading: PropType.bool.isRequired,
};

export default ProductForm;
