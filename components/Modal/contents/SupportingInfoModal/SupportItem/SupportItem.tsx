import { MdCheck, MdClose } from "react-icons/md";
import { SupportItemContainer } from "./SupportItem.styled";
import { ISupportItemProp } from "./SupportItem.type";

export default function SupportItem({
  name,
  icon,
  support = true,
}: ISupportItemProp) {
  return (
    <SupportItemContainer support={support}>
      <div className="icon-wrapper">
        {icon}
        <span>{name}</span>
      </div>
      <div className="status">{support ? <MdCheck /> : <MdClose />}</div>
    </SupportItemContainer>
  );
}
