import { FC } from "react";
import { find } from "lodash";
import { GetStaticPaths, GetStaticProps } from "next";
import { promises as fs } from 'fs';
import { ParsedUrlQuery } from 'querystring';
import Head from 'next/head';

import { CATEGORIES_FILE, MENUS_FILE } from "../../../constants/file-paths";
import Category from "../../../dtos/Category.dto";
import Menus from "../../../dtos/Menus.dto";
import MainLayout from "../../../components/MainLayout";
import CorneredBox from "../../../components/CorneredBox";
import Breadcrumb, { BreadcrumbItem } from "../../../components/Breadcrumb";
import Text from "../../../styled/Text";
import GetQouteSection from "../../../components/GetQouteSection";
import Spacer from "../../../styled/Spacer";
import CategoryProductBox from "../../../components/CategoryProductBox";
import BusinessOfferingsBox from "../../../components/BusinessOfferingsBox";
import WhyChooseUsBox from "../../../components/WhyChooseUsBox";
import WhyChooseUs from "../../../dtos/WhyChooseUs.dto";

const whyChooseUs: WhyChooseUs[] =  [
    {
        "description": "Every 4 mins someone completes their last will with EzyLegal",
        "title": "Trusted",
        "icon": {
            "sourceUrl": "http://cms.ezylegal.in/wp-content/uploads/2021/05/person_24px.png",
            "title": "person_24px",
            "databaseId": 277
        },
        "image": null
    },
    {
        "description": "Rely on guidance from highly-rated lawyers that you can choose from our vetted network.",
        "title": "Accessible Legal Advice",
        "icon": {
            "sourceUrl": "http://cms.ezylegal.in/wp-content/uploads/2021/05/person_24px.png",
            "title": "person_24px",
            "databaseId": 277
        },
        "image": null
    },
    {
        "description": "Rely on guidance from highly-rated lawyers that you can choose from our vetted network.",
        "title": "On Time Delivery",
        "icon": {
            "sourceUrl": "http://cms.ezylegal.in/wp-content/uploads/2021/05/people_24px.png",
            "title": "people_24px",
            "databaseId": 276
        },
        "image": null
    }
];

interface CategoryProps {
    category: Category;
    menus: Menus;
    categories: Category[];
};

const CategoryPage: FC<CategoryProps> = ({ category, menus, categories }) => {
    const breadcrumbItems: BreadcrumbItem[] = [{
        label: 'Home',
        link: '/'
    }, {
        label: category.name,
        link: null
    }];

    return (
        <MainLayout menus={menus} isHome>
            <Head>
                <title>{ category.name } &#8211; EzyLegal</title>
            </Head>
            <CorneredBox bgColor="white" bgColorBack="secondry" paddingTop="20px" paddingBottom="70px">
                <div className="container">
                    <Breadcrumb items={breadcrumbItems} />
                    <Spacer direction="vertical" size={10} />
                    <div className="row">
                        <div className="col-12 col-md-6">
                            <Text fontSize="xxxl" fontFamily="montserrat">We can help you  in your Business Registration</Text>
                        </div>
                    </div>
                    <Spacer direction="vertical" size={20} />
                    <div className="row">
                        {
                            category.products.map(product => <CategoryProductBox key={product.id} product={product} category={category} />)
                        }
                    </div>
                </div>
            </CorneredBox>
            <GetQouteSection />
            <BusinessOfferingsBox categories={categories} />
            <CorneredBox bgColor="skyBlue" bgColorBack="darkBlue" paddingTop="70px" paddingBottom="70px">
                <WhyChooseUsBox data={whyChooseUs}/>
            </CorneredBox>
        </MainLayout>
    );
};

interface Params extends ParsedUrlQuery {
    categorySlug: string;
}
 
export const getStaticProps: GetStaticProps = async ({ params }) => {
    // fetch menus
    const menuData = await fs.readFile(MENUS_FILE, { encoding: 'utf-8' });
    const menus: Menus = JSON.parse(menuData);

    // fetch categories
    const categorisData = await fs.readFile(CATEGORIES_FILE, { encoding: 'utf-8' });
    const categories: Category[] = JSON.parse(categorisData);

    const category = find(categories, (category: Category) => category.slug === (params as Params).categorySlug);
    return {
        props: {
            category,
            menus,
            categories
        }
    };
};

export const getStaticPaths: GetStaticPaths = async () => {
    // fetch categories
    const categoryData = await fs.readFile(CATEGORIES_FILE, { encoding: 'utf-8' });
    const categories: Category[] = JSON.parse(categoryData);

    const paths = categories.map((category: any) => ({ params: { categorySlug: category.slug } }));

    return {
        paths,
        fallback: false
    };
};

export default CategoryPage;