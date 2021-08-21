import React, { FC, useState, useEffect } from "react";
import { GetStaticProps } from "next";
import { promises as fs } from "fs";
import Link from "next/link";
import Head from "next/head";
import Dashbox from "../components/DashBox";
import { DashTabs, SubDashTabs, Subtabcontent } from "../styled/StyledTabs";
import { CATEGORIES_FILE, MENUS_FILE, Product_Catagory_List } from "../constants/file-paths";
import Menus from "../dtos/Menus.dto";
import DashboardLayout from "../components/DashboardLayout";
import CorneredBox from "../components/CorneredBox";
import Text from "../styled/Text";
import Button from "../styled/Button";
import Category from "../dtos/Category.dto";
import UploadBox from '../components/UploadBoxx';
import { RootState } from "../redux/store";
import { useSelector } from "react-redux";
import { Container, Row, Col, Tabs, Tab, Nav, Badge } from "react-bootstrap";
import backendApi from '../api/backendApi';
import { ProductStatusCount, PurchaseProductDetails } from '../constants/queries/order'
import { SelectContainer } from "react-select/src/components/containers";
import DashboardTabs from '../components/dashboardTabs'
interface DashBoardProps {
  menus: Menus;
  categories: Category[];

}
const customspan: any = {
  display: "inline-flex",
  fontSize: "14px",
  fontWeight: "normal",
};


const BusinessTabs: FC<any> = ({ catagorylistID, ProductCatagoriesList, setCatagoryListID, currentorder, loginuser }) => {
  const product_list = ProductCatagoriesList.productCategories.edges;
  const [productstatusdata, setProductStatusData] = useState<any>('')
  const [productstatusdata2, setProductStatusData2] = useState<any>('')
  const [productstatusdata3, setProductStatusData3] = useState<any>('')
  const [productstatusdata4, setProductStatusData4] = useState<any>('')
  const [purchaseProductData, setPurchaseProductData] = useState<any>()





  const newdata = async (id: any) => {
    const requirmentinfoUrl = await backendApi.post('/', {
      query: ProductStatusCount,
      variables: {
        catagoryid: id,
        user: loginuser._id
      }
    });
    setProductStatusData(requirmentinfoUrl.data.data.getProductStatusCount)
  }
  const newdata2 = async (id: any) => {
    const requirmentinfoUrl = await backendApi.post('/', {
      query: ProductStatusCount,
      variables: {
        catagoryid: id,
        user: loginuser._id
      }
    });
    setProductStatusData2(requirmentinfoUrl.data.data.getProductStatusCount)
  }
  const newdata3 = async (id: any) => {
    const requirmentinfoUrl = await backendApi.post('/', {
      query: ProductStatusCount,
      variables: {
        catagoryid: id,
        user: loginuser._id
      }
    });
    setProductStatusData3(requirmentinfoUrl.data.data.getProductStatusCount)
  }
  const newdata4 = async (id: any) => {
    const requirmentinfoUrl = await backendApi.post('/', {
      query: ProductStatusCount,
      variables: {
        catagoryid: id,
        user: loginuser._id
      }
    });
    setProductStatusData4(requirmentinfoUrl.data.data.getProductStatusCount)
  }

  const PurchaseProduct = async () => {
    const requirmentinfoUrl = await backendApi.post('/', {
      query: PurchaseProductDetails,
      variables: {
        category_id: currentorder.data.createOrder.category_id,
        user: loginuser._id
      }
    })
    setPurchaseProductData(requirmentinfoUrl)
  }
  useEffect(() => {
    newdata(catagorylistID[0])
    newdata2(catagorylistID[1])
    newdata3(catagorylistID[2])
    newdata4(catagorylistID[3])
  }, [catagorylistID])

  useEffect(() => {
    PurchaseProduct()
  }, [])


  const purchasedata = purchaseProductData?.data?.data?.getOrderByCategory
  return (
    <DashTabs>
      <Tab.Container id="dashtabs" defaultActiveKey={0}>
        <Row>
          <Col md={12} style={{ padding: "0px" }}>
            <Nav variant="pills" justify className="flex-row">
              {product_list.map((list: any, i: number) => {
                return (
                  <>
                    {list.node.name !== "Uncategorized" && (
                      <Nav.Item key={i}>
                        <Nav.Link eventKey={i}>
                          <Text color="black" fontSize="lg">
                            {list.node.name}
                          </Text>
                          <Text color="secondry" fontSize="sm">
                            {i == 0 ? productstatusdata.incomplete : i == 1 ? productstatusdata2.incomplete : i == 2 ? productstatusdata3.incomplete : i == 3 ? productstatusdata4.incomplete : '0'} Services in Process
                        </Text>
                        </Nav.Link>
                      </Nav.Item>
                    )}
                  </>
                )
              })}
            </Nav>
          </Col>
          <Col md={12} style={{ padding: "0px" }}>
            <Tab.Content>
              <Tab.Pane eventKey={0}>
                <SubDashTabs>
                  <Tab.Container id="subtabs" defaultActiveKey="one">
                    <Row>
                      <Col md={12} style={{ padding: "0px 30px" }}>
                        <Nav variant="pills" className="flex-row">
                          <Nav.Item>
                            <Nav.Link eventKey="one">
                              <Text color="black" fontSize="lg">
                                Ongoing Services
                              </Text>
                            </Nav.Link>
                          </Nav.Item>
                          <Nav.Item>
                            <Nav.Link eventKey="two">
                              <Text color="black" fontSize="lg">
                                Completed
                              </Text>
                            </Nav.Link>
                          </Nav.Item>
                        </Nav>
                      </Col>
                      <Col md={12}>
                        <Tab.Content>
                          <Tab.Pane eventKey="one">
                            {productstatusdata.incomplete != 0 ? <DashboardTabs purchasedata={purchasedata} currentorder={currentorder} loginuser={loginuser} /> : <DashboardTabs />}
                          </Tab.Pane>
                          <Tab.Pane eventKey="two">kumar</Tab.Pane>
                        </Tab.Content>
                      </Col>
                    </Row>
                  </Tab.Container>
                </SubDashTabs>
              </Tab.Pane>
              <Tab.Pane eventKey={1}>{productstatusdata2 && productstatusdata2.incomplete != 0 ? (
                <>
                  <SubDashTabs>
                    <Tab.Container id="subtabs" defaultActiveKey="ones">
                      <Row>
                        <Col md={12} style={{ padding: "0px 30px" }}>
                          <Nav variant="pills" className="flex-row">
                            <Nav.Item>
                              <Nav.Link eventKey="ones">
                                <Text color="black" fontSize="lg">
                                  Ongoing Services
                              </Text>
                              </Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                              <Nav.Link eventKey="twos">
                                <Text color="black" fontSize="lg">
                                  Completed
                              </Text>
                              </Nav.Link>
                            </Nav.Item>
                          </Nav>
                        </Col>
                        <Col md={12}>
                          <Tab.Content>
                            <Tab.Pane eventKey="ones">
                              <DashboardTabs purchasedata={purchasedata} currentorder={currentorder} loginuser={loginuser} />
                            </Tab.Pane>
                            <Tab.Pane eventKey="twos">seconds</Tab.Pane>
                          </Tab.Content>
                        </Col>
                      </Row>
                    </Tab.Container>
                  </SubDashTabs>
                </>
              ) : (
                  <Col md={12}>
                    <Tab.Content>
                      <Tab.Pane eventKey="ones">
                        <h1>helo world</h1>
                      </Tab.Pane>
                      <Tab.Pane eventKey="twos">seconsssds</Tab.Pane>
                    </Tab.Content>
                  </Col>
                )}
              </Tab.Pane>



              <Tab.Pane eventKey={2}>{productstatusdata3 && productstatusdata3.incomplete != 0 ? (
                <SubDashTabs>
                  <Tab.Container id="subtabs" defaultActiveKey="oness">
                    <Row>
                      <Col md={12} style={{ padding: "0px 30px" }}>
                        <Nav variant="pills" className="flex-row">
                          <Nav.Item>
                            <Nav.Link eventKey="oness">
                              <Text color="black" fontSize="lg">
                                Ongoing Services
                          </Text>
                            </Nav.Link>
                          </Nav.Item>
                          <Nav.Item>
                            <Nav.Link eventKey="twoss">
                              <Text color="black" fontSize="lg">
                                Completed
                          </Text>
                            </Nav.Link>
                          </Nav.Item>
                        </Nav>
                      </Col>
                      <Col md={12}>
                        <Tab.Content>
                          <Tab.Pane eventKey="oness">
                            <DashboardTabs purchasedata={purchasedata} currentorder={currentorder} loginuser={loginuser} />
                          </Tab.Pane>
                          <Tab.Pane eventKey="twoss">seconds</Tab.Pane>
                        </Tab.Content>
                      </Col>
                    </Row>
                  </Tab.Container>
                </SubDashTabs>
              ) : (
                  <Col md={12}>
                    <Tab.Content>
                      <Tab.Pane eventKey="ones">
                        <h1>helo world</h1>
                      </Tab.Pane>
                      <Tab.Pane eventKey="twos">seconsssds</Tab.Pane>
                    </Tab.Content>
                  </Col>
                )}</Tab.Pane>



              <Tab.Pane eventKey={3}>{productstatusdata4 && productstatusdata4.incomplete != 0 ? (
                <SubDashTabs>
                  <Tab.Container id="subtabs" defaultActiveKey="onesss">
                    <Row>
                      <Col md={12} style={{ padding: "0px 30px" }}>
                        <Nav variant="pills" className="flex-row">
                          <Nav.Item>
                            <Nav.Link eventKey="onesss">
                              <Text color="black" fontSize="lg">
                                Ongoing Services
                         </Text>
                            </Nav.Link>
                          </Nav.Item>
                          <Nav.Item>
                            <Nav.Link eventKey="twosss">
                              <Text color="black" fontSize="lg">
                                Completed
                         </Text>
                            </Nav.Link>
                          </Nav.Item>
                        </Nav>
                      </Col>
                      <Col md={12}>
                        <Tab.Content>
                          <Tab.Pane eventKey="onesss">
                            <DashboardTabs purchasedata={purchasedata} currentorder={currentorder} loginuser={loginuser} />
                          </Tab.Pane>
                          <Tab.Pane eventKey="twosss">seconds</Tab.Pane>
                        </Tab.Content>
                      </Col>
                    </Row>
                  </Tab.Container>
                </SubDashTabs>
              ) : (
                  <Col md={12}>
                    <Tab.Content>
                      <Tab.Pane eventKey="ones">
                        <h1>helo world</h1>
                      </Tab.Pane>
                      <Tab.Pane eventKey="twos">seconsssds</Tab.Pane>
                    </Tab.Content>
                  </Col>
                )}</Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </DashTabs>
  );
}

const Dashboard: FC<any> = ({ menus, ProductCatagoriesList }) => {
  const [catagorylistID, setCatagoryListID] = useState<any>([])
  const loginuser = useSelector((store: RootState) => store.loggedInUser);
  const currentorder = useSelector((store: RootState) => store.currentOrders);
  console.log(ProductCatagoriesList)
  useEffect(() => {
    const newstate = ProductCatagoriesList?.productCategories?.edges?.map((el: any, i: number) => {
      return el.node.id
    })
    setCatagoryListID(newstate)

  }, [])
  return (
    <DashboardLayout menus={menus} headerBgColorBack="skyBlue">
      <Head>
        <title>Dashboard</title>
      </Head>

      <CorneredBox
        bgColor="white"
        bgColorBack="secondry"
        paddingBottom="70px"
        paddingTop="70px"
      >
        <Container>
          <Row>
            <Col className="mb-5">
              <Text fontSize="md" color="black">
                Welcome
              </Text>
              <Text fontSize="xl" color="black">
                <b>{loginuser.name}</b>
              </Text>
            </Col>
          </Row>
          <Row>
            <Col md={9} xs={12}>
              {catagorylistID?.length && <BusinessTabs catagorylistID={catagorylistID} loginuser={loginuser} currentorder={currentorder} ProductCatagoriesList={ProductCatagoriesList} setCatagoryListID={setCatagoryListID} />}
            </Col>
            <Col md={3} xs={12}>
              <Dashbox />
              <Dashbox />
            </Col>
          </Row>
        </Container>
      </CorneredBox>
    </DashboardLayout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  // fetch menus
  const menuData = await fs.readFile(MENUS_FILE, { encoding: "utf-8" });
  const menus: Menus = JSON.parse(menuData);

  const productCatagories = await fs.readFile(Product_Catagory_List, { encoding: "utf-8" });
  const ProductCatagoriesList = JSON.parse(productCatagories);

  // fetch categories
  const categoriesData = await fs.readFile(CATEGORIES_FILE, {
    encoding: "utf-8",
  });
  const categories: Category[] = JSON.parse(categoriesData);

  return {
    props: {
      menus,
      categories,
      ProductCatagoriesList
    },
  };
};

export default Dashboard;
