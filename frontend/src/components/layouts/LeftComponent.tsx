import React from 'react'
import { TbDeviceAnalytics } from "react-icons/tb";
import { BsJournalBookmark } from "react-icons/bs";
import { FaRegHeart } from "react-icons/fa6";
import { MdNoteAlt } from "react-icons/md";
import { PiMedal } from "react-icons/pi";
import { GiMedallist } from "react-icons/gi";
import { IoSettingsOutline } from "react-icons/io5";
import { IoLogOutOutline } from "react-icons/io5";

import { NavLink } from 'react-router-dom';

const LeftComponent = (props: any) => {
    const Navlinks = [
        {
            title: "Home",
            link: "/dashboard",
            icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7.24487 14.7815L10.238 10.8913L13.6522 13.5732L16.5813 9.79291" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                <circle cx="19.9954" cy="4.20023" r="1.9222" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M14.9245 3.12014H7.65676C4.64532 3.12014 2.77805 5.25286 2.77805 8.2643V16.3467C2.77805 19.3581 4.60871 21.4817 7.65676 21.4817H16.2609C19.2723 21.4817 21.1396 19.3581 21.1396 16.3467V9.30778" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            </svg>


        },
        {
            title: "My Courses",
            link: "/courses",
            icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M16.8 5.76H11.04C10.7749 5.76 10.56 5.97491 10.56 6.24V10.08C10.56 10.3451 10.7749 10.56 11.04 10.56H16.8C17.0651 10.56 17.28 10.3451 17.28 10.08V6.24C17.28 5.97491 17.0651 5.76 16.8 5.76ZM16.32 9.6H11.52V6.72H16.32V9.6Z" fill="#A3A3A5" />
                <path d="M11.52 9.6H11.27C11.27 9.73807 11.3819 9.85 11.52 9.85V9.6ZM16.32 9.6V9.85C16.4581 9.85 16.57 9.73807 16.57 9.6H16.32ZM11.52 6.72V6.47C11.3819 6.47 11.27 6.58193 11.27 6.72H11.52ZM16.32 6.72H16.57C16.57 6.58193 16.4581 6.47 16.32 6.47V6.72ZM11.04 6.01H16.8V5.51H11.04V6.01ZM10.81 6.24C10.81 6.11298 10.913 6.01 11.04 6.01V5.51C10.6368 5.51 10.31 5.83683 10.31 6.24H10.81ZM10.81 10.08V6.24H10.31V10.08H10.81ZM11.04 10.31C10.913 10.31 10.81 10.207 10.81 10.08H10.31C10.31 10.4832 10.6368 10.81 11.04 10.81V10.31ZM16.8 10.31H11.04V10.81H16.8V10.31ZM17.03 10.08C17.03 10.207 16.927 10.31 16.8 10.31V10.81C17.2032 10.81 17.53 10.4832 17.53 10.08H17.03ZM17.03 6.24V10.08H17.53V6.24H17.03ZM16.8 6.01C16.927 6.01 17.03 6.11298 17.03 6.24H17.53C17.53 5.83683 17.2032 5.51 16.8 5.51V6.01ZM11.52 9.85H16.32V9.35H11.52V9.85ZM11.27 6.72V9.6H11.77V6.72H11.27ZM16.32 6.47H11.52V6.97H16.32V6.47ZM16.57 9.6V6.72H16.07V9.6H16.57Z" fill="#A3A3A5" />
                <path fill-rule="evenodd" clip-rule="evenodd" d="M18.72 1.92H5.28C4.48471 1.92 3.84 2.56471 3.84 3.36V18.72C3.84 20.5757 5.34432 22.08 7.2 22.08H16.8C18.6557 22.08 20.16 20.5757 20.16 18.72V3.36C20.16 2.56471 19.5153 1.92 18.72 1.92ZM7.68 2.88H5.28C5.0149 2.88 4.8 3.0949 4.8 3.36V18.72C4.8 20.0455 5.87451 21.12 7.2 21.12H7.68V2.88ZM8.64 2.88V21.12H16.8C18.1255 21.12 19.2 20.0455 19.2 18.72V3.36C19.2 3.0949 18.9851 2.88 18.72 2.88H8.64Z" fill="#A3A3A5" />
                <path d="M7.68 2.88H7.93C7.93 2.74193 7.81807 2.63 7.68 2.63V2.88ZM7.68 21.12V21.37C7.81807 21.37 7.93 21.2581 7.93 21.12H7.68ZM8.64 21.12H8.39C8.39 21.2581 8.50193 21.37 8.64 21.37V21.12ZM8.64 2.88V2.63C8.50193 2.63 8.39 2.74193 8.39 2.88H8.64ZM5.28 2.17H18.72V1.67H5.28V2.17ZM4.09 3.36C4.09 2.70278 4.62278 2.17 5.28 2.17V1.67C4.34664 1.67 3.59 2.42664 3.59 3.36H4.09ZM4.09 18.72V3.36H3.59V18.72H4.09ZM7.2 21.83C5.48239 21.83 4.09 20.4376 4.09 18.72H3.59C3.59 20.7137 5.20625 22.33 7.2 22.33V21.83ZM16.8 21.83H7.2V22.33H16.8V21.83ZM19.91 18.72C19.91 20.4376 18.5176 21.83 16.8 21.83V22.33C18.7937 22.33 20.41 20.7137 20.41 18.72H19.91ZM19.91 3.36V18.72H20.41V3.36H19.91ZM18.72 2.17C19.3772 2.17 19.91 2.70278 19.91 3.36H20.41C20.41 2.42664 19.6534 1.67 18.72 1.67V2.17ZM5.28 3.13H7.68V2.63H5.28V3.13ZM5.05 3.36C5.05 3.23297 5.15297 3.13 5.28 3.13V2.63C4.87683 2.63 4.55 2.95683 4.55 3.36H5.05ZM5.05 18.72V3.36H4.55V18.72H5.05ZM7.2 20.87C6.01258 20.87 5.05 19.9074 5.05 18.72H4.55C4.55 20.1836 5.73644 21.37 7.2 21.37V20.87ZM7.68 20.87H7.2V21.37H7.68V20.87ZM7.43 2.88V21.12H7.93V2.88H7.43ZM8.89 21.12V2.88H8.39V21.12H8.89ZM16.8 20.87H8.64V21.37H16.8V20.87ZM18.95 18.72C18.95 19.9074 17.9874 20.87 16.8 20.87V21.37C18.2636 21.37 19.45 20.1836 19.45 18.72H18.95ZM18.95 3.36V18.72H19.45V3.36H18.95ZM18.72 3.13C18.847 3.13 18.95 3.23297 18.95 3.36H19.45C19.45 2.95683 19.1232 2.63 18.72 2.63V3.13ZM8.64 3.13H18.72V2.63H8.64V3.13Z" fill="#A3A3A5" />
            </svg>


        },
        {
            title: "Classroom",
            link: "/classroom",
            icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16.2381 1C14.2381 1 12.5238 2.04762 11.4762 3.57143C10.4286 2.04762 8.71429 1 6.71429 1C3.57143 1 1 3.57143 1 6.71429C1 12.4286 11.4762 21 11.4762 21C11.4762 21 21.9524 12.4286 21.9524 6.71429C21.9524 3.57143 19.381 1 16.2381 1Z" stroke="#A3A3A5" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
            </svg>

        },
        {
            title: "Test",
            link: "/test",
            icon: <svg width="22" height="24" viewBox="0 0 22 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 12H16" stroke="#A3A3A5" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M6 17H16" stroke="#A3A3A5" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M19 3H21V23H1V3H3" stroke="#A3A3A5" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M6 1V7H9C9 5.895 9.895 5 11 5C12.105 5 13 5.895 13 7H16V1H6Z" stroke="#A3A3A5" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
            </svg>

        },
        {
            title: "Test Result",
            link: "/testresult",
            icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M17 12.899V22L12 19L7 22V12.898" stroke="#A3A3A5" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M12 15C15.866 15 19 11.866 19 8C19 4.13401 15.866 1 12 1C8.13401 1 5 4.13401 5 8C5 11.866 8.13401 15 12 15Z" stroke="#A3A3A5" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
            </svg>

        },
        {
            title: "Standings",
            link: "/standings",
            icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12.4286 19.2857H3V3H18.4286V9" stroke="#A3A3A5" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M21 14.6786V21L18.4286 20.1428L15.8571 21V14.6786" stroke="#A3A3A5" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M18.4286 15.8571C20.3221 15.8571 21.8571 14.3221 21.8571 12.4286C21.8571 10.535 20.3221 9 18.4286 9C16.535 9 15 10.535 15 12.4286C15 14.3221 16.535 15.8571 18.4286 15.8571Z" stroke="#A3A3A5" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M6.42856 7.28571H14.1428" stroke="#A3A3A5" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M6.42856 10.7143H11.5714" stroke="#A3A3A5" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M6.42856 14.1429H11.5714" stroke="#A3A3A5" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
            </svg>

        },
        {
            title: "Settings",
            link: "/setting",
            icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g opacity="0.4">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M20.8066 7.62358L20.1842 6.54349C19.6576 5.62957 18.4907 5.31429 17.5755 5.83869V5.83869C17.1399 6.09531 16.6201 6.16812 16.1307 6.04106C15.6413 5.91399 15.2226 5.59749 14.9668 5.16134C14.8023 4.88412 14.7139 4.56836 14.7105 4.24601V4.24601C14.7254 3.72919 14.5304 3.22837 14.17 2.85764C13.8096 2.48691 13.3145 2.27783 12.7975 2.27805H11.5435C11.0369 2.27804 10.5513 2.47988 10.194 2.83891C9.83666 3.19795 9.63714 3.68456 9.63958 4.19109V4.19109C9.62457 5.23689 8.77245 6.07678 7.72654 6.07667C7.40418 6.07332 7.08843 5.98491 6.8112 5.82038V5.82038C5.89603 5.29598 4.72908 5.61126 4.20251 6.52519L3.53432 7.62358C3.00838 8.53636 3.31937 9.70258 4.22997 10.2323V10.2323C4.82187 10.574 5.1865 11.2056 5.1865 11.889C5.1865 12.5725 4.82187 13.204 4.22997 13.5458V13.5458C3.32053 14.0719 3.0092 15.2353 3.53432 16.1453V16.1453L4.16589 17.2346C4.41262 17.6798 4.82657 18.0083 5.31616 18.1474C5.80575 18.2866 6.33061 18.2249 6.77459 17.976V17.976C7.21105 17.7213 7.73116 17.6515 8.21931 17.7822C8.70746 17.9128 9.12321 18.233 9.37413 18.6716C9.53867 18.9489 9.62708 19.2646 9.63043 19.587V19.587C9.63043 20.6435 10.4869 21.5 11.5435 21.5H12.7975C13.8505 21.5 14.7055 20.6491 14.7105 19.5961V19.5961C14.7081 19.088 14.9088 18.6 15.2681 18.2407C15.6274 17.8814 16.1154 17.6806 16.6236 17.6831C16.9451 17.6917 17.2596 17.7797 17.5389 17.9394V17.9394C18.4517 18.4653 19.6179 18.1543 20.1476 17.2437V17.2437L20.8066 16.1453C21.0617 15.7075 21.1317 15.186 21.0012 14.6963C20.8706 14.2067 20.5502 13.7893 20.111 13.5366V13.5366C19.6717 13.2839 19.3514 12.8665 19.2208 12.3769C19.0902 11.8873 19.1602 11.3658 19.4153 10.9279C19.5812 10.6383 19.8213 10.3982 20.111 10.2323V10.2323C21.0161 9.70286 21.3264 8.54346 20.8066 7.63274V7.63274V7.62358Z" stroke="#1B1D21" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    <circle cx="12.175" cy="11.889" r="2.63616" stroke="#1B1D21" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                </g>
            </svg>

        },

    ]



    return (
        <div style={props.style} className='border-r-2 border-gray-300' >
            <div className=" flex w-full text-center  justify-center items-baseline">
                <h1 className=' text-5xl font-bold'>aether</h1>
                <span className='color-ece text-5xl'>.</span>
            </div>

            <div className="pt-14 text-base flex flex-col gap-2  " >

                {
                    Navlinks.map((item, index) => {
                        return (
                            <NavLink
                                key={index}
                                to={item.link}
                                className={({ isActive }) =>
                                    ` fg flex font-semibold pl-5  justify-start items-center text-gray-500 gap-3 py-3 mr-10  ${isActive ? "actvg" : ""}`
                                }
                                style={{ borderTopRightRadius: '15px', borderBottomRightRadius: '15px' }}
                            >
                                <div className="icon ">{item.icon}</div>
                                <div className="name">{item.title}</div>

                            </NavLink>
                        )
                    })
                }

            </div>


            <button className="fg pt-10 text-base flex font-semibold pl-5  justify-start items-center text-gray-500 gap-3 py-3 mr-10">
                <div className="icon ">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M14.1022 15.3125V16.875C14.1022 18.5982 12.7003 20 10.977 20H3.12514C1.40189 20 0 18.5982 0 16.875V3.125C0 1.40182 1.40189 0 3.12514 0H10.977C12.7003 0 14.1022 1.40182 14.1022 3.125V4.6875C14.1022 5.11902 13.7524 5.46875 13.3209 5.46875C12.8894 5.46875 12.5396 5.11902 12.5396 4.6875V3.125C12.5396 2.26349 11.8386 1.5625 10.977 1.5625H3.12514C2.26359 1.5625 1.56257 2.26349 1.56257 3.125V16.875C1.56257 17.7365 2.26359 18.4375 3.12514 18.4375H10.977C11.8386 18.4375 12.5396 17.7365 12.5396 16.875V15.3125C12.5396 14.881 12.8894 14.5312 13.3209 14.5312C13.7524 14.5312 14.1022 14.881 14.1022 15.3125ZM19.4288 8.65799L17.6793 6.90857C17.3741 6.60339 16.8794 6.60339 16.5744 6.90857C16.2692 7.21359 16.2692 7.70828 16.5744 8.01331L17.8188 9.25781H8.43787C8.00633 9.25781 7.65659 9.60754 7.65659 10.0391C7.65659 10.4706 8.00633 10.8203 8.43787 10.8203H17.8188L16.5744 12.0648C16.2692 12.3698 16.2692 12.8645 16.5744 13.1696C16.727 13.3221 16.9269 13.3984 17.1268 13.3984C17.3268 13.3984 17.5267 13.3221 17.6793 13.1696L19.4288 11.4201C20.1904 10.6586 20.1904 9.41956 19.4288 8.65799Z" fill="#808191" />
                    </svg>

                </div>
                <div className="name">Logout</div>
            </button>

        </div>
    )
}

export default LeftComponent
