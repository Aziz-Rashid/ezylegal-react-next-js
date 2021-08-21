import { FC, useMemo } from "react";

import Upsell from "../../../dtos/Upsell.dto";
import CrossedText from "../../../styled/CrossedText";
import Spacer from "../../../styled/Spacer";
import Text from "../../../styled/Text";
import savePercentage from "../../../utils/savePercentage";
import CheckBox from "../../CheckBox";

interface AddonItemProps {
    addon: Upsell;
    selected: Upsell[];
    setSelected: Function;
}

const AddonItem:FC<AddonItemProps> = ({ addon, selected, setSelected }) => {
    const onCheckboxClick = (e: any) => {
        if (e.target.checked) {
            setSelected([...selected, addon]);
        } else {
            const filtered = selected.filter(item => item.id !== addon.id);
            setSelected(filtered);
        }
    };

    const isSelected: boolean = useMemo(() => (selected.findIndex(item => item.id === addon.id) >= 0), [selected, addon]);

    return (
        <div>
            <CheckBox name={addon.name} checked={isSelected} onChange={onCheckboxClick}>
                <Spacer direction="horizontal" size={12} />
                <Text inline>{addon.name}</Text>
                <Spacer direction="horizontal" size={12} />
                <Text fontSize="sm" inline>&#8377; {addon.salePrice} /- </Text>
            </CheckBox>
            {
                addon.regularPrice && (
                    <>
                        <Spacer direction="horizontal" size={12} />
                        <CrossedText fontSize="sm" inline>&#8377; {addon.regularPrice} /-</CrossedText>
                        <Spacer direction="horizontal" size={12} />
                        <Text fontSize="sm" inline>{savePercentage(Number(addon.regularPrice), Number(addon.salePrice))}% off </Text>
                    </>
                )
            }
        </div>
    );
};

export default AddonItem;