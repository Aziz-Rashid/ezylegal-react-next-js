import { GetStaticProps } from "next";
import { FC, Fragment } from "react";
import { promises as fs } from "fs";
import Link from "next/link";
import Head from "next/head";

import MainLayout from "../../components/MainLayout";
import {
  BLOGS_FILE,
  BLOG_CATEGORIES_FILE,
  MENUS_FILE,
} from "../../constants/file-paths";
import Menus from "../../dtos/Menus.dto";
import Text from "../../styled/Text";
import CorneredBox from "../../components/CorneredBox";
import BlogCard from "../../components/BlogCard";
import BlogSearchBox from "../../components/BlogSearchBox";
import Spacer from "../../styled/Spacer";
import BlogCategory from "../../dtos/BlogCategory.dto";
import Blog from "../../dtos/Blog.dto";
import { filter, map, slice, some } from "lodash";

interface BlogProps {
  menus: Menus;
  blogCat: BlogCategory[];
}

const Blogs: FC<BlogProps> = ({ menus, blogCat }) => {
  return (
    <MainLayout menus={menus} headerBgColorBack="secondry">
      <Head>
        <title>Blogs &#8211; EzyLegal</title>
      </Head>
      <BlogSearchBox />
      <CorneredBox
        bgColor="white"
        bgColorBack="secondry"
        paddingTop="70px"
        paddingBottom="50px"
      >
        <div className="container">
          {blogCat.map((cat) => (
            <Fragment key={cat.id}>
              <div className="row align-items-center">
                <div className="col">
                  <Text fontSize="xxxl" fontFamily="montserrat">
                    {cat.name}
                  </Text>
                </div>
                <div className="col-auto">
                  <Link href={`/blog-category/${cat.slug}`}>
                    <Text as="a">
                      View More{" "}
                      <img
                        src="/icons/arrow_right_alt_24px.svg"
                        alt="View More"
                      />
                    </Text>
                  </Link>
                </div>
              </div>
              <Spacer direction="vertical" size={20} />
              <div className="row">
                {cat.blogs?.map((blog) => (
                  <div key={blog.id} className="col-12 col-md-4 d-flex">
                    <BlogCard blog={blog} />
                  </div>
                ))}
              </div>
              <Spacer direction="vertical" size={20} />
            </Fragment>
          ))}
        </div>
      </CorneredBox>
    </MainLayout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  // fetch menus
  const menuData = await fs.readFile(MENUS_FILE, { encoding: "utf-8" });
  const menus: Menus = JSON.parse(menuData);

  // fetch blog cat
  const blogCatData = await fs.readFile(BLOG_CATEGORIES_FILE, {
    encoding: "utf-8",
  });
  let blogCat: BlogCategory[] = JSON.parse(blogCatData);

  // fetch blog
  const blogsData = await fs.readFile(BLOGS_FILE, {
    encoding: "utf-8",
  });
  const blogs: Blog[] = JSON.parse(blogsData);

  blogCat = map(blogCat, (cat) => {
    cat.blogs = slice(filter(blogs, (blog) => some(blog.categories, { id: cat.id })), 0, 3);
    return cat;
  });

  return {
    props: {
      menus,
      blogCat,
    },
  };
};

export default Blogs;
