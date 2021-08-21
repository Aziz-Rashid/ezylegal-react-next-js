import Link from "next/link";
import { FC } from "react";

import Spacer from "../../styled/Spacer";
import Button from "../../styled/Button";
import Text from "../../styled/Text";
import { BlogCardWrapper } from "./BlogCard.styled";
import Blog from "../../dtos/Blog.dto";

interface BlogCardProps {
  blog: Blog;
}

const BlogCard: FC<BlogCardProps> = ({ blog }) => {
  return (
    <BlogCardWrapper>
      {blog.featuredImage && (
        <Link href={`/blogs/${blog.slug}`}>
          <a>
            <img
              src={blog.featuredImage?.sourceUrl}
              alt={blog.featuredImage?.title}
              className="w-100"
            />
          </a>
        </Link>
      )}
      <Spacer direction="vertical" size={20} />
      {blog.tags.length ? (
        <>
          {blog.tags.map((tag) => (
            <Link key={tag.id} href="#">
              <Button
                color="black"
                backgroundColor="skyBlue"
                size="xs"
                as="a"
                className="mb-2 mr-2"
                rounded
              >
                { tag.name }
              </Button>
            </Link>
          ))}
          <Spacer direction="vertical" size={5} />
        </>
      ) : null}

      <Link href={`/blogs/${blog.slug}`}>
        <Text as="a" fontSize="lg">
          { blog.title }
        </Text>
      </Link>
      <Spacer direction="vertical" size={15} />
      <Text>
        by { blog.author.name } <Spacer as="span" direction="horizontal" size={5} /> ·{" "}
        <Spacer as="span" direction="horizontal" size={5} /> 4 min read
      </Text>
    </BlogCardWrapper>
  );
};

export default BlogCard;
