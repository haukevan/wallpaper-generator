"use client";

import { useRef, useState, useEffect } from "react";
import exportAsImage from "../utils/exportAsImage";
import { ChromePicker } from "react-color";
import rgbHex from "rgb-hex";

import Image from "next/image";
import upload from "../public/assets/icons/upload.svg";
import download from "../public/assets/icons/download.svg";
import leftJustify from "../public/assets/icons/align-left.svg";
import rightJustify from "../public/assets/icons/align-right.svg";
import centerJustify from "../public/assets/icons/align-center.svg";
import close from "../public/assets/icons/close.svg";
import align from "../public/assets/icons/align.svg";
import palette from "../public/assets/icons/palette.svg";
import borderRadius from "../public/assets/icons/border-radius.svg";
import info from "../public/assets/icons/info.svg";
import iphone from "../public/assets/images/iphone14wallpaper.jpg";

export default function Home() {
  //export image button ref
  const exportRef = useRef();

  //upload image click ref
  const inputRef = useRef(null);
  const uploadRef = useRef(null);

  //upload image state holder from user
  const [image, setImage] = useState(null);
  const [phone, setPhone] = useState(null);
  const [background, setBackground] = useState("rbga(0, 0, 0, 0)");
  const [newImage, setnewImage] = useState(null);
  const [menuSelect, setmenuSelect] = useState(0); //default no show items
  const [menuText, setmenuText] = useState("Select below to edit");
  const [borderSize, setborderSize] = useState(null);

  //iphone stats
  const phoneList = [
    {
      id: "iphone13Default",
      width: "285px",
      height: "617px",
      topWidgets: "162px",
      widgetWidth: "257px",
      widgetHeight: "62px",
      widgetBorderRadiusSmall: "5px",
      widgetBorderRadiusMedium: "13px",
      widgetBorderRadiusLarge: "25px",
    },
    {
      id: "iphone13Mini",
      width: "1125px",
      height: "2436px",
      topWidgets: "729px",
      widgetWidth: "1000px",
      widgetHeight: "279px",
      widgetBorderRadiusSmall: "5px",
      widgetBorderRadiusMedium: "13px",
      widgetBorderRadiusLarge: "25px",
    },
    {
      id: "iphone13",
      width: "1170px",
      height: "2532px",
      topWidgets: "729px",
      widgetWidth: "1000px",
      widgetHeight: "279px",
      widgetBorderRadiusSmall: "5px",
      widgetBorderRadiusMedium: "13px",
      widgetBorderRadiusLarge: "25px",
    },
    {
      id: "iphone13Pro",
      width: "1170px",
      height: "2532px",
      topWidgets: "729px",
      widgetWidth: "1000x",
      widgetHeight: "279px",
      widgetBorderRadiusSmall: "5px",
      widgetBorderRadiusMedium: "13px",
      widgetBorderRadiusLarge: "25px",
    },
    {
      id: "iphone13ProMax",
      width: "1284px",
      height: "2778px",
      topWidgets: "729px",
      widgetWidth: "1158px",
      widgetHeight: "279px",
      widgetBorderRadiusSmall: "23px", //4.6 increase from default
      widgetBorderRadiusMedium: "60px",
      widgetBorderRadiusLarge: "115px",
    },
    {
      id: "iphone14",
      width: "1170px",
      height: "2532px",
      topWidgets: "729px",
      widgetWidth: "1000px",
      widgetHeight: "279px",
      widgetBorderRadiusSmall: "23px", //4.6 increase from default
      widgetBorderRadiusMedium: "60px",
      widgetBorderRadiusLarge: "115px",
    },
    {
      //same as 13 pro max
      id: "iphone14Plus",
      width: "1284px",
      height: "2778px",
      topWidgets: "729px",
      widgetWidth: "1158px",
      widgetHeight: "279px",
      widgetBorderRadiusSmall: "23px", //4.6 increase from default
      widgetBorderRadiusMedium: "60px",
      widgetBorderRadiusLarge: "115px",
    },
    {
      id: "iphone14Pro",
      width: "1179px",
      height: "2556px",
      topWidgets: "729px",
      widgetWidth: "1050px",
      widgetHeight: "279px",
      widgetBorderRadiusSmall: "23px", //4.6 increase from default
      widgetBorderRadiusMedium: "60px",
      widgetBorderRadiusLarge: "115px",
    },
    {
      id: "iphone14ProMax",
      width: "1290px",
      height: "2796px",
      topWidgets: "729px",
      widgetWidth: "1158px",
      widgetHeight: "279px",
      widgetBorderRadiusSmall: "23px", //4.6 increase from default
      widgetBorderRadiusMedium: "60px",
      widgetBorderRadiusLarge: "115px",
    },
  ];

  //set initial scale of preview phone on load
  useEffect(() => {
    const exportImage = document.getElementById("exportImage");
    const exportWidget = document.getElementById("widgets");

    exportImage.style.width = phoneList.find(
      (phoneDefault) => phoneDefault.id === "iphone13Default"
    ).width;
    exportImage.style.height = phoneList.find(
      (phoneDefault) => phoneDefault.id === "iphone13Default"
    ).height;
    exportWidget.style.top = phoneList.find(
      (phoneDefault) => phoneDefault.id === "iphone13Default"
    ).topWidgets;
    exportWidget.style.width = phoneList.find(
      (phoneDefault) => phoneDefault.id === "iphone13Default"
    ).widgetWidth;
    exportWidget.style.height = phoneList.find(
      (phoneDefault) => phoneDefault.id === "iphone13Default"
    ).widgetHeight;
  });

  useEffect(() => {
    document.getElementById("widgets").style.background = background;
  }, [background]);

  const handleChangeComplete = (c) => {
    //setBackground(color.rgb);
    //console.log(background);
    setBackground("#" + rgbHex(c.rgb.r, c.rgb.g, c.rgb.b, c.rgb.a));
  };

  const handleUploadClick = () => {
    inputRef.current.click();
  };

  const handleDownloadClick = () => {
    uploadRef.current.click();
  };

  //set image selected to screen background
  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      const imgHolder = event.target.files[0];
      setImage(imgHolder);
    }
  };

  const prepareImage = async () => {
    //set full resolution styles before export, then set back to original for preview
    const exportImage = document.getElementById("exportImage");
    const borderRad = `widgetBorderRadius${borderSize}`;

    //set wallpaper image dimensions
    exportImage.style.width = phoneList.find(
      (phoneSelected) => phoneSelected.id === phone
    ).width;
    exportImage.style.height = phoneList.find(
      (phoneSelected) => phoneSelected.id === phone
    ).height;

    //set widget styles
    const exportWidget = document.getElementById("widgets");
    exportWidget.style.top = phoneList.find(
      (phoneSelected) => phoneSelected.id === phone
    ).topWidgets;
    exportWidget.style.width = phoneList.find(
      (phoneSelected) => phoneSelected.id === phone
    ).widgetWidth;
    exportWidget.style.height = phoneList.find(
      (phoneSelected) => phoneSelected.id === phone
    ).widgetHeight;
    exportWidget.style.borderRadius = phoneList.find(
      (phoneSelected) => phoneSelected.id === phone
    )[borderRad]; //[] to send variable as prop

    exportWidget.style.border = 0;
    exportWidget.innerHTML = null;

    console.log("width:" + exportImage.style.width);
    console.log("height:" + exportImage.style.height);

    //save image as objectURL and set to newImage, this will be updated on the newImage displayer
    setnewImage(await exportAsImage(exportRef.current, "test"));

    document.getElementById("saveImageBox").style.visibility = "visible";

    //set styles back for UI viewing
    exportImage.style.width = phoneList.find(
      (phoneSelected) => phoneSelected.id === "iphone13Default"
    ).width;
    exportImage.style.height = phoneList.find(
      (phoneSelected) => phoneSelected.id === "iphone13Default"
    ).height;
    exportWidget.style.borderRadius = phoneList.find(
      (phoneSelected) => phoneSelected.id === "iphone13Default"
    )[borderRad];
    exportWidget.style.border = "1px solid white";
    exportWidget.innerHTML = "select to edit";
  };

  const alignClick = (e) => {
    switch (e.target.id) {
      case "leftBtn":
        document.getElementById("output").style.backgroundPosition = "left";
        break;
      case "centerBtn":
        document.getElementById("output").style.backgroundPosition = "center";
        break;
      case "rightBtn":
        document.getElementById("output").style.backgroundPosition = "right";
        break;
    }
  };

  const borderResize = (e) => {
    switch (e.target.id) {
      case "smallBtn":
        document.getElementById("widgets").style.borderRadius = phoneList.find(
          (phoneSelected) => phoneSelected.id === "iphone13Default"
        ).widgetBorderRadiusSmall;
        setborderSize("Small");
        break;
      case "mediumBtn":
        document.getElementById("widgets").style.borderRadius = phoneList.find(
          (phoneSelected) => phoneSelected.id === "iphone13Default"
        ).widgetBorderRadiusMedium;
        setborderSize("Medium");
        break;
      case "largeBtn":
        document.getElementById("widgets").style.borderRadius = phoneList.find(
          (phoneSelected) => phoneSelected.id === "iphone13Default"
        ).widgetBorderRadiusLarge;
        setborderSize("Large");
        break;
    }
  };

  //updates selected phone on change
  const handleChangePhone = (event) => {
    setPhone((currentPhone) => event.target.value);
  };

  //save preview functions
  const closeSavePreview = () => {
    document.getElementById("saveImageBox").style.visibility = "hidden";
  };

  const openHelpModal = () => {
    document.querySelector("[data-modal]").showModal();
  };

  const closeHelpModal = () => {
    document.querySelector("[data-modal]").close();
  };

  const openInfoModal = () => {
    document.getElementById("info-modal").showModal();
  };

  const closeInfoModal = () => {
    document.getElementById("info-modal").close();
  };

  //design menus
  const openDesignBottom = () => {
    document.getElementById("designBoxBottom").style.bottom = "0";
  };

  const closeDesignBoxBottom = () => {
    document.getElementById("designBoxBottom").style.bottom = "-400px";
  };

  const menuSelectHandler = (selected) => {
    setmenuSelect(selected);
    setmenuText(selected);
  };

  //-----------------------RETURN----------------------------//

  return (
    <main className="mainApp relative gap-2 overflow-scroll w-screen h-screen flex flex-col items-center justify-start bg-gradient-to-b from-grays-900 to-blue-200">
      <div
        info-open-modal
        className=" absolute top-4 right-4"
        onClick={openInfoModal}
      >
        <Image src={info} alt="information"></Image>
      </div>
      <h1 className="titleText text-white text-2xl pt-4">
        Wallpaper Generator
      </h1>
      <p className="text-s text-center text-white">for iPhone</p>
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
        className=" flex flex-col justify-center align-middle p-1"
      >
        <div className=" flex flex-row justify-center align-middle p-1">
          <div
            className="uploadButton w-fit h-fit m-1 p-3 flex flex-row justify-center align-middle rounded-xl bg-blue-200 text-slate-900"
            onClick={handleUploadClick}
          >
            <Image
              className="uploadImage"
              priority
              src={upload}
              alt="Upload an image"
            />
            <h3 className=" text-xl font-normal">Upload</h3>
            <input
              type="file"
              onChange={onImageChange}
              className="filetype"
              ref={inputRef}
              style={{ display: "none" }}
            />
          </div>
          <div
            className="uploadButton w-fit h-fit m-1 p-3 flex flex-row justify-center align-middle rounded-xl bg-blue-200 text-slate-900"
            onClick={handleDownloadClick}
          >
            <Image
              className=""
              priority
              src={download}
              alt="Download your image"
            />
            <h3 className=" text-xl font-normal">Download</h3>{" "}
            <input
              className="uploadButton w-fit h-fit m-1 p-3 flex flex-row justify-center align-middle rounded-xl bg-emerald-800 text-slate-100 text-xl font-normal"
              onClick={prepareImage}
              type="submit"
              ref={uploadRef}
              style={{ display: "none" }}
            ></input>
          </div>
        </div>
        <div className="p-2">
          <div className="select">
            <select
              onChange={handleChangePhone}
              id="phoneSelect"
              defaultValue={""}
              required
            >
              <option value="" disabled>
                Phone Model
              </option>
              <option value="iphone14ProMax">iPhone 14 Pro Max</option>
              <option value="iphone14Pro">iPhone 14 Pro</option>
              <option value="iphone14Plus">iPhone 14 Plus</option>
              <option value="iphone14">iPhone 14</option>
              <option value="iphone13ProMax">iPhone 13 Pro Max</option>
              <option value="iphone13Pro">iPhone 13 Pro</option>
              <option value="iphone13">iPhone 13</option>
              <option value="iphone13Mini">iPhone 13 Mini</option>
            </select>
            <span class="focus"></span>
          </div>
        </div>
      </form>
      <div className=" relative w-full h-full flex justify-center align-middle">
        <div
          ref={exportRef}
          id="exportImage"
          className="buildImage absolute top-0 flex align-middle justify-center rounded-3xl"
        >
          {image ? (
            <div
              style={{
                backgroundImage: `url(${URL.createObjectURL(image)})`,
                backgroundPosition: "center",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
              }}
              className="bkg-img"
              id="output"
            ></div>
          ) : (
            <Image
              src={iphone}
              width={400}
              height={400}
              alt="iphone default photo"
              className="bkg-img"
              id="output"
            />
          )}
          <div className="widgets" id="widgets" onClick={openDesignBottom}>
            select to edit
          </div>
        </div>
      </div>

      {/* Design Menu to open up bottom up or top down for elements */}
      <div className="designBoxBottom" id="designBoxBottom">
        <div className=" flex flex-row align-middle justify-between">
          <div className=" absolute top-5 left-1/2 transform -translate-x-1/2">
            {menuText}
          </div>
          <div
            className=" absolute top-5 right-5 cursor-pointer"
            id="closeDesignBoxBottom"
            onClick={closeDesignBoxBottom}
          >
            <Image src={close} alt="Close design menu" />
          </div>
        </div>
        <div
          id="menuSelect"
          className=" flex flex-row align-middle justify-center p-2 absolute top-10 left-1/2 transform -translate-x-1/2"
        >
          <input
            type="radio"
            className="radio_item"
            value="AlignImage"
            name="item"
            id="radio1"
            checked={menuSelect === "Align Image"}
            onChange={(e) => menuSelectHandler("Align Image")}
          />
          <label className="label_item cursor-pointer" htmlFor="radio1">
            <Image src={align} alt="Align image" />
          </label>
          <input
            type="radio"
            className="radio_item"
            value="SelectColor"
            name="item"
            id="radio2"
            checked={menuSelect === "Select Color"}
            onChange={(e) => menuSelectHandler("Select Color")}
          />
          <label className="label_item cursor-pointer" htmlFor="radio2">
            <Image src={palette} alt="Pick color" />
          </label>
          <input
            type="radio"
            className="radio_item"
            value="BorderRadius"
            name="item"
            id="radio3"
            checked={menuSelect === "Border Radius"}
            onChange={(e) => menuSelectHandler("Border Radius")}
          />
          <label className="label_item cursor-pointer" htmlFor="radio3">
            <Image src={borderRadius} alt="Border Radius" />
          </label>
        </div>
        {menuSelect === "Align Image" && (
          <div className=" flex justify-center align-middle flex-row">
            <input
              type="radio"
              className="radio_item"
              value="leftAlign"
              name="align"
              id="leftBtn"
              onChange={alignClick}
            />
            <label className="label_item cursor-pointer" htmlFor="leftBtn">
              <Image id="leftBtnPic" src={leftJustify} alt="Align image left" />
            </label>

            <input
              type="radio"
              className="radio_item"
              value="centerAlign"
              name="align"
              id="centerBtn"
              onChange={alignClick}
            />
            <label className="label_item cursor-pointer" htmlFor="centerBtn">
              <Image
                id="centerBtnPic"
                src={centerJustify}
                alt="Align image center"
              />
            </label>

            <input
              type="radio"
              className="radio_item"
              value="rightAlign"
              name="align"
              id="rightBtn"
              onChange={alignClick}
            />
            <label className="label_item cursor-pointer" htmlFor="rightBtn">
              <Image
                id="rightBtnPic"
                src={rightJustify}
                alt="Align image right"
              />
            </label>
          </div>
        )}
        {menuSelect === "Select Color" && (
          <div className=" w-full h-1/4 flex justify-center align-bottom">
            <ChromePicker
              width={"200px"}
              color={background}
              onChangeComplete={handleChangeComplete}
            />
          </div>
        )}
        {menuSelect === "Border Radius" && (
          <div className=" flex justify-center align-middle flex-row gap-4">
            <div
              id="smallBtn"
              className=" cursor-pointer"
              onClick={borderResize}
            >
              Small
            </div>
            <div
              id="mediumBtn"
              className=" cursor-pointer"
              onClick={borderResize}
            >
              Med
            </div>
            <div
              id="largeBtn"
              className=" cursor-pointer"
              onClick={borderResize}
            >
              Large
            </div>
          </div>
        )}
      </div>

      {/* Save box that will pop up fixed ontop of design area */}
      <div id="saveImageBox" className="saveImageBox">
        <div className="saveImageBoxHeader">
          <div onClick={closeSavePreview}>Close</div>
          <div data-open-modal onClick={openHelpModal}>
            Help
          </div>
        </div>
        <div className="saveImagePhone">
          {newImage ? (
            <img id="" alt="" src={newImage} className="save-img" />
          ) : (
            <img
              width="200"
              height="200"
              alt=""
              src="/assets/images/iphone13.png"
              className="bkg-img"
            />
          )}
        </div>
      </div>
      <dialog data-modal>
        <h2>Mobile</h2>
        <li>Press and hold on image</li>
        <li>Select `save to photos` option</li>
        <li>Navigate to saved photo and set to wallpaper</li>
        <h2>Desktop</h2>
        <li>Right click on image</li>
        <li>Choose `save image as` option</li>
        <button data-close-modal onClick={closeHelpModal}>
          Close
        </button>
      </dialog>
      <dialog id="info-modal" className=" w-3/4 rounded-md bg-gray-200">
        <h2 className="text-center text-2xl">What is Wallpaper Generator?</h2>
        <br></br>
        <p>
          Wallpaper Generator lets you personalize your iPhone lockscreen
          wallpaper by giving you the tools to customize the area around your
          widgets, and more!
        </p>
        <br></br>
        <p>
          Upload a photo and adjust the design to your liking, select your phone
          size, and download!
        </p>
        <br />
        <button info-close-modal onClick={closeInfoModal}>
          Close
        </button>
      </dialog>
      <footer className=" opacity-50 bg-grays-900 w-screen fixed z-10 bottom-0">
        <p className=" text-white text-center text-xs p-1">
          Created by: Evan Hauk - 2023 all rights reserved.
        </p>
      </footer>
    </main>
  );
}
