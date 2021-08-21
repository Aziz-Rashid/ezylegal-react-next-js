import { FC } from "react";
import { GetStaticProps } from "next";
import { promises as fs } from 'fs';
import Link from "next/link";
import Head from "next/head";

import { CATEGORIES_FILE, MENUS_FILE, Home_File } from "../constants/file-paths";
import Menus from "../dtos/Menus.dto";
import MainLayout from "../components/MainLayout";
import CorneredBox from "../components/CorneredBox";
import Text from "../styled/Text";
import GetQouteSection from "../components/GetQouteSection";
import KeenSlider, { KeenSlide } from "../components/KeenSlider";
import ShadowCard from "../styled/ShadowCard";
import Spacer from "../styled/Spacer";
import Button from "../styled/Button";
import Category from "../dtos/Category.dto";
import HomeCategoryBox from "../components/HomeCategoryBox";
import CircledText from "../styled/CircledText";


const Home: FC<any> = ({ menus, HomePageData }) => {
  const { page: { home_page } } = HomePageData
  return (
    <MainLayout menus={menus} headerBgColorBack="skyBlue" isHome>
      <Head>
        <title>Home &#8211; EzyLeagal</title>
      </Head>
      <CorneredBox bgColor="skyBlue" bgColorBack="secondry">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-12 col-md-6">
              <Text fontSize="xxxl" fontFamily="montserrat" weight="bold">{home_page.banner.content.title}</Text>
              <Spacer size={20} direction="vertical" />
              <Text fontSize="xl" weight="semibold">{home_page.banner.content.summary}</Text>
              <Spacer size={50} direction="vertical" />
              {home_page.banner.highlightedCategories.map((el:any,i:number) => (
                <>
              <Link href={`/category/${el.link}`}  key={i}>
                <Button size="lg" as="a" rounded className="mb-2">
                  {el.name}
                </Button>
              </Link>
              <Spacer size={20} direction="horizontal" />
              </>
              ))}
            </div>
            <div className="col-12 col-md-6">
              <img src={home_page.banner.content.image.sourceUrl} className="Banner1" />
            </div>
          </div>
        </div>
      </CorneredBox>
      <GetQouteSection home_page={home_page} bgColorBack="lightSkyBlue" />
      <CorneredBox bgColor="lightSkyBlue" bgColorBack="white" paddingTop="70px" paddingBottom="70px">
        <div className="container">
          <div className="row">
            {home_page.businessMatrix.map((el:any, i:number) => (
              <div className="col-12 col-md-4 text-center" key={i}>
                <Text fontFamily="montserrat" weight="bold" fontSize="xxxl">{el.counter} <br />{el.heading}</Text>
                <Text>{el.content}</Text>
              </div>

            ))}
          </div>
        </div>
      </CorneredBox>
      <section>
        <div className="container">
          <Spacer direction="vertical" size={50} />
          {
            home_page.cardlist.map((category:any, i:number) => <HomeCategoryBox key={i} category={category} />)
          }
        </div>
      </section>
      <CorneredBox bgColor="skyBlue" bgColorBack="white" paddingTop="70px" paddingBottom="70px">
        <div className="container">
          <div className="row">
            <div className="col-12 text-center">
              <Text fontSize="xxxl" fontFamily="montserrat">Why Choose Us</Text>
              <Spacer direction="vertical" size={20} />
            </div>
            {home_page.whyChooseUs.map((el:any,i:number) => (
            <div className="col-12 col-md-4" key={i}>
              <div className="row">
                <div className="col-auto">
                  <CircledText fontSize="lg">
                    {i+1}
                  </CircledText>
                </div>
                <div className="col">
                  <Text fontSize="lg">{el.title}</Text>
                  <Text>{el.description}</Text>
                </div>
              </div>
            </div>
            ))}
          </div>
        </div>
      </CorneredBox>
      <CorneredBox bgColor="white" bgColorBack="secondry" paddingBottom="70px" paddingTop="70px">
        <div className="container">
          <Text fontFamily="montserrat" fontSize="xxxl" className="text-center">{home_page.testimonialData.testimonialHeading}</Text>
          <Text className="text-center">{home_page.testimonialData.testimonialSubHeading}</Text>
          <KeenSlider loop={true} slidesPerView={2} showArrows={true} spacing={20}>
            {home_page.testimonialData.testimonials.map((el:any,i:number) => (
            <KeenSlide key={i}>
              <ShadowCard className="text-center">
                <img src={el.profileImage.sourceUrl} alt="image" className="circle" width="100" />
                <Spacer direction="vertical" size={20} />
                <Text color="gray">{el.summary}</Text>
                <Spacer direction="vertical" size={8} />
                <Text fontSize="lg">{el.name}</Text>
                <Spacer direction="vertical" size={8} />
                <Text color="gray" fontSize="sm">{el.designation}</Text>
              </ShadowCard>
            </KeenSlide>
            ))}
          </KeenSlider>
        </div>
      </CorneredBox>
    </MainLayout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  // fetch menus
  const menuData = await fs.readFile(MENUS_FILE, { encoding: 'utf-8' });
  const menus: Menus = JSON.parse(menuData);


  // fetch categories
  // const categoriesData = await fs.readFile(CATEGORIES_FILE, { encoding: 'utf-8' });
  // const categories: Category[] = JSON.parse(categoriesData);
  // Fetched Home page data 
  const Homepage = await fs.readFile(Home_File, { encoding: 'utf-8' });
  const HomePageData: any = JSON.parse(Homepage);

  return {
    props: {
      menus,
      HomePageData
    }
  };
};

export default Home;
