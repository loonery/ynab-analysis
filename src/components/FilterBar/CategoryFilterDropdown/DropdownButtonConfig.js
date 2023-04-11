import { faFloppyDisk } from "@fortawesome/free-regular-svg-icons";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// header button definitions
export const HeaderButtons = [
    {
        label: "Select None",
        onClick: () => {},
        classString: 'btn btn-sm btn-outline-dark'
    },
    {
        label: "Select All",
        onClick: () => {},
        classString: 'btn btn-sm btn-dark'
    },
];

// footer button definitions
export const FooterButtons = [
    {
        label: <FontAwesomeIcon icon={faXmark} />,
        onClick: () => {},
        classString: 'btn btn-sm btn-outline-danger'
    },
    {
        label: <FontAwesomeIcon icon={faFloppyDisk} />,
        onClick: () => {},
        classString: 'btn btn-sm btn-outline-success'
    }
];