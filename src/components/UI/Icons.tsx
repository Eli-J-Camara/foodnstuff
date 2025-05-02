import { IconType } from "react-icons";
import PropTypes from "prop-types";

interface IconStar {
    icon: IconType;
}

const Icon: React.FC<IconStar> = ({ icon: IconComponent }) => {
return <IconComponent />;
};

Icon.propTypes = {
icon: PropTypes.func.isRequired,
};

export default Icon;