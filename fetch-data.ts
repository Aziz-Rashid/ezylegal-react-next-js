import { promises as fs } from 'fs';
import { flatMap } from 'lodash';

import api from "./api";
import { BLOGS_FILE, BLOG_CATEGORIES_FILE, CATEGORIES_FILE, MENUS_FILE, PRODUCTS_FILE, Home_File,Product_Catagory_List,Terms_File,Privacy_File } from "./constants/file-paths";
import { BLOG_CATEGORY_QUERY, BLOG_QUERY, MENU_QUERY, PRODUCT_CATEGORY_QUERY, Home,ProductCatagoryList,Product_Catagory_Lists,Terms_Condition,Privacy_Query } from './constants/graphql';
import hierarchicalBuilder from './utils/hierarchicalBuilder';
import homepageLinkMapper from "./utils/homepageLinkMapper";

export const fetchData = async () => {
  try {
    // fetch menu
    const menuRes = await api.post('/', { query: MENU_QUERY });

    const menuData = menuRes.data.data.menus.nodes.reduce((res: any, menu: any) => {
      res[menu.slug] = hierarchicalBuilder(menu.menuItems.nodes);
      return res;
    }, {});

    await fs.writeFile(MENUS_FILE, JSON.stringify(menuData));


    const menuRes2 = await api.post('/', { query: Home });

    const homepageData = homepageLinkMapper(menuRes2.data.data);
    await fs.writeFile(Home_File, JSON.stringify(homepageData));

    const ProductCatagory = await api.post('/', { query: Product_Catagory_Lists });
    await fs.writeFile(Product_Catagory_List, JSON.stringify(ProductCatagory.data.data));

    // Terms and Condition data fetched 

    const termsdata = await api.post('/', { query: Terms_Condition });
    await fs.writeFile(Terms_File, JSON.stringify(termsdata.data.data));


    // Privacy Policy data fetched 

    const privacy = await api.post('/', { query: Privacy_Query });
    await fs.writeFile(Privacy_File, JSON.stringify(privacy.data.data));
    
    // product and categories
    const productsCategoriesRes = await api.post('/', { query: PRODUCT_CATEGORY_QUERY });

    const productsCategoriesData = productsCategoriesRes.data.data.productCategories.nodes
      .filter((productsCategory: any) => productsCategory.slug !== "uncategorized")
      .map((productsCategory: any) => {
        productsCategory.products = productsCategory.products.nodes;

        productsCategory.products = productsCategory.products.map((product: any) => {
          // productTypes mapping
          product.productTypes = product.productTypes.nodes.length && product.productTypes.nodes[0].name;

          // variations mapping
          product.variations = product.variations && product.variations.nodes.map((item: any) => {
            item.description = item.description && item.description.split(/\r?\n/);
            return item;
          });

          // Upsell product mapping
          product.upsell = product.upsell && product.upsell.nodes;
          return product;
        });
        return productsCategory;
      });

    await fs.writeFile(CATEGORIES_FILE, JSON.stringify(productsCategoriesData));

    // 
    const products = flatMap(productsCategoriesData, ({ products, ...value }) =>
      products.map((product: any) => ({ ...product, category: value }))
    );
    await fs.writeFile(PRODUCTS_FILE, JSON.stringify(products));

    // fetch blog categories
    const blogsCatRes = await api.post('/', { query: BLOG_CATEGORY_QUERY });
    const blogsCat = blogsCatRes.data.data.categories.nodes;
    await fs.writeFile(BLOG_CATEGORIES_FILE, JSON.stringify(blogsCat));

    // fetch blogs
    const blogRes = await api.post('/', { query: BLOG_QUERY });
    const blogs = blogRes.data.data.posts.nodes.map((blog: any) => {
      blog.tags = blog.tags.nodes;
      blog.categories = blog.categories.nodes;
      blog.author = blog.author && blog.author.node;
      blog.featuredImage = blog.featuredImage && blog.featuredImage.node;
      return blog;
    });
    await fs.writeFile(BLOGS_FILE, JSON.stringify(blogs));

    return "Data fetched";
  } catch (error) {
    throw error;
  }
};

fetchData()
  .then(console.log)
  .catch(console.log);