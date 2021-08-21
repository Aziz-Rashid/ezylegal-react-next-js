import { FC, Fragment } from "react";

import MenuItem from "../../dtos/MenuItem.dto";
import Spacer from "../../styled/Spacer";
import Text from "../../styled/Text";
import ActiveLink from "../ActiveLink";

interface DropDownContainerProps {
  menu: MenuItem;
}

const DropDownContainer: FC<DropDownContainerProps> = ({ menu }) => {
  return (
    <div className="container d-block py-4">
      <div className="row">
        {menu.children.map((menu: MenuItem) => (
          <Fragment key={menu.id}>
            {menu.children.length ? (
              <div className="col-12 col-md-3">
                <Text fontSize="xxl" fontFamily="montserrat">
                  {menu.label}
                </Text>
                <Spacer direction="vertical" size={10}/>
                <ul className="list-unstyled">
                  {menu.children.map((menu: MenuItem) => (
                    <li className="mb-2" key={menu.id}>
                      <ActiveLink key={menu.id} href={menu.url}>
                        <Text as="a" fontSize="md">
                          {menu.label}
                        </Text>
                      </ActiveLink>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </Fragment>
        ))}
      </div>
    </div>
  );
};

export default DropDownContainer;