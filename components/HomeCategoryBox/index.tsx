import Link from "next/link";
import { FC } from "react";

import Category from "../../dtos/Category.dto";
import Button from "../../styled/Button";
import Spacer from "../../styled/Spacer";
import Text from "../../styled/Text";
import { Consulation, Consulation_Width } from './HomeCatagory.styled'

const HomeCategoryBox: FC<any> = ({ category }) => {
  const className =  category.direction == "Left" ? "col-12 col-md-6" : "col-12 col-md-6 order-md-1";
  return (
    <>
      <div className="row">
        <div className={className}>
          {
            category.image && <img src={category.image?.sourceUrl} alt={category.image?.title} />
          }
        </div>
        <div className="col-12 col-md-6">
          <Text fontSize="xxxl" fontFamily="montserrat">{category.heading}</Text>
          <Spacer direction="vertical" size={15} />
          <Text>{category.content}</Text>
          <Spacer direction="vertical" size={15} />
          {
            category.links.map((product:any,i:number) => (
              <Link key={i} href={`${product.link}`}>
                <Button color="black" backgroundColor="skyBlue" size="md" as="a" className="mb-3 mr-3" rounded>{product.title}</Button>
              </Link>
            ))
          }
          <Link href={`${category.button.link}`}>
            <Button size="md" as="a" className="mb-3 mr-3" rounded>{category.button.title}</Button>
          </Link>
          <Consulation>
            <Consulation_Width>
              <Text fontSize="xl" fontFamily="montserrat">{category.subCard.title}</Text>
              <Text>{category.subCard.content} </Text>
            </Consulation_Width>
            <div>
              <Link href={`/${category.subCard.button.link}`}>
                <Button size="md" as="a" className="mb-3 mr-3" rounded>{category.subCard.button.title}</Button>
              </Link>
            </div>
          </Consulation>
        </div>
      </div>
      <Spacer direction="vertical" size={50} />
    </>
  );
};

export default HomeCategoryBox;