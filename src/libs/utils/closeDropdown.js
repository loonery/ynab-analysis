import { Dropdown } from "bootstrap";

export const closeDropdown = (id) => {
    const dropdown = document.getElementById(id);
    console.log(dropdown);
    $(".dropdown-menu a").click(function() {
        $(this).closest(".dropdown-menu").prev().dropdown("toggle");
    });
}