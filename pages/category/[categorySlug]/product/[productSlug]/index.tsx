import { FC } from "react";
import { GetStaticPaths, GetStaticProps } from "next";
import { promises as fs } from 'fs';
import { filter, find } from "lodash";
import { ParsedUrlQuery } from 'querystring';
import Head from "next/head";

import { MENUS_FILE, PRODUCTS_FILE } from '../../../../../constants/file-paths';
import Product from "../../../../../dtos/Product.dto";
import Menus from "../../../../../dtos/Menus.dto";
import MainLayout from "../../../../../components/MainLayout";
import Text from "../../../../../styled/Text";
import GetQouteSection from "../../../../../components/GetQouteSection";
import CorneredBox from "../../../../../components/CorneredBox";
import ProductDetail from "../../../../../components/ProductDetail";
import Breadcrumb, { BreadcrumbItem } from "../../../../../components/Breadcrumb";
import Spacer from "../../../../../styled/Spacer";
import WhyChooseUsBox from "../../../../../components/WhyChooseUsBox";
import FaqBox from "../../../../../components/FaqBox";
import StarRating from "../../../../../components/StarRating";
import Divider from "../../../../../styled/Divider";
import RelatedProductBox from "../../../../../components/RelatedProductBox";
import ContentsBox from "../../../../../components/ContentsBox";
import productSectionsFilter from "../../../../../utils/productSectionsFilter";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { emptyCart } from "../../../../../redux/cart/cart.actions";
import ProcessStepBox from "../../../../../components/ProcessStepBox";

interface ProductProps {
    product: Product;
    menus: Menus;
    sections: Array<any>;
};

const componentsMapper:any = {
    'ContentsBox': ContentsBox,
    'WhyChooseUsBox': WhyChooseUsBox,
    'FaqBox': FaqBox,
    'RelatedProductBox': RelatedProductBox,
    'ProcessStepBox': ProcessStepBox
};

const ProductPage: FC<ProductProps> = ({ menus, product, sections }) => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(emptyCart());
    });

    const breadcrumbItems: BreadcrumbItem[] = [{
        label: 'Home',
        link: '/'
    }, {
        label: product.category?.name || '',
        link: `/category/${product.category?.slug}`
    }, {
        label: product.name,
        link: null
    }];

    return (
        <MainLayout menus={menus}>
            <Head>
                <title>{ product.name } &#8211; EzyLegal</title>
                {
                    product.seo && (
                        <>
                        <meta name="robots" content={product.seo.robot} />
                        <meta name="description" content={product.seo.description}/>
                        <meta name="keywords" content={product.seo.keywords} />
                        </>
                    )
                }
            </Head>
            <CorneredBox bgColor="white" bgColorBack="secondry" paddingTop="20px" paddingBottom="70px">
                <div className="container">
                    <Breadcrumb items={breadcrumbItems} />
                    <Spacer direction="vertical" size={10} />
                    <ProductDetail product={product} />
                </div>
            </CorneredBox>
            <GetQouteSection bgColorBack={sections.length % 2 ? "skyBlue" : "white"} />
            {
                sections.map((section, i) => {
                    const Component = componentsMapper[section.component];
                    return (
                        <CorneredBox key={i} bgColor={section.bgColor} bgColorBack={section.bgColorBack} paddingTop="70px" paddingBottom="70px">
                            <Component data={section.data}/>
                        </CorneredBox>
                    )
                })
            }
            <CorneredBox bgColor="white" bgColorBack="darkBlue" paddingTop="70px" paddingBottom="70px">
                <div className="container">
                    <Text fontFamily="montserrat" fontSize="xxxl" >Reviews</Text>
                    <Spacer direction="vertical" size={5} />
                    <div className="d-flex align-items-center">
                        <StarRating readonly initialRating={product.averageRating} />
                        <Spacer direction="horizontal" size={8} />
                        <Text inline fontSize="sm" color="gray">{product.reviewCount} reviews</Text>
                    </div>
                    <Spacer direction="vertical" size={10} />
                    <Divider color="black" margin="20px" />
                    <ul className="list-unstyled">
                        <li className="mb-4">
                            <div className="d-flex">
                                <Text weight="bold">Abhilash Nair</Text>
                                <Spacer direction="horizontal" size={8} />
                                <StarRating readonly initialRating={product.averageRating} />
                                <Spacer direction="horizontal" size={8} />
                                <Text color="gray" fontSize="sm">1 month ago</Text>
                            </div>
                            <Text>Etiam cursus sem eu vehicula posuere. Nulla eleifend massa at nisi convallis eleifend. In nec semper nibh. Pellentesque eu consequat mauris.</Text>
                        </li>
                        <li className="mb-4">
                            <div className="d-flex">
                                <Text weight="bold">Abhilash Nair</Text>
                                <Spacer direction="horizontal" size={8} />
                                <StarRating readonly initialRating={product.averageRating} />
                                <Spacer direction="horizontal" size={8} />
                                <Text color="gray" fontSize="sm">1 month ago</Text>
                            </div>
                            <Text>Etiam cursus sem eu vehicula posuere. Nulla eleifend massa at nisi convallis eleifend. In nec semper nibh. Pellentesque eu consequat mauris.</Text>
                        </li>
                        <li className="mb-4">
                            <div className="d-flex">
                                <Text weight="bold">Abhilash Nair</Text>
                                <Spacer direction="horizontal" size={8} />
                                <StarRating readonly initialRating={product.averageRating} />
                                <Spacer direction="horizontal" size={8} />
                                <Text color="gray" fontSize="sm">1 month ago</Text>
                            </div>
                            <Text>Etiam cursus sem eu vehicula posuere. Nulla eleifend massa at nisi convallis eleifend. In nec semper nibh. Pellentesque eu consequat mauris.</Text>
                        </li>
                        <li className="mb-4">
                            <div className="d-flex">
                                <Text weight="bold">Abhilash Nair</Text>
                                <Spacer direction="horizontal" size={8} />
                                <StarRating readonly initialRating={product.averageRating} />
                                <Spacer direction="horizontal" size={8} />
                                <Text color="gray" fontSize="sm">1 month ago</Text>
                            </div>
                            <Text>Etiam cursus sem eu vehicula posuere. Nulla eleifend massa at nisi convallis eleifend. In nec semper nibh. Pellentesque eu consequat mauris.</Text>
                        </li>
                    </ul>
                </div>
            </CorneredBox>
        </MainLayout>
    );
};

interface Params extends ParsedUrlQuery {
    categorySlug: string;
    productSlug: string;
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
    // fetch menus
    const menuData = await fs.readFile(MENUS_FILE, { encoding: 'utf-8' });
    const menus: Menus = JSON.parse(menuData);

    // fetch products
    const productsData = await fs.readFile(PRODUCTS_FILE, { encoding: 'utf-8' });
    const products: Product[] = JSON.parse(productsData);

    const product = find(products, (p) => p.slug === (params as Params).productSlug && p.category?.slug === (params as Params).categorySlug);

    if (!product) {
        return {
            notFound: true,
        };
    }

    const relatedProducts: Product[] = filter(products, (p) => p.category?.slug === (params as Params).categorySlug);

    const sections: any = productSectionsFilter(product, relatedProducts);

    return {
        props: {
            product,
            sections,
            menus
        }
    };
};

export const getStaticPaths: GetStaticPaths = async () => {
    // fetch products
    const productsData = await fs.readFile(PRODUCTS_FILE, { encoding: 'utf-8' });
    const products: Product[] = JSON.parse(productsData);

    const paths = products.map((product: Product) => ({ params: { productSlug: product.slug, categorySlug: product.category?.slug } }));

    return {
        paths,
        fallback: false
    };
};

export default ProductPage;