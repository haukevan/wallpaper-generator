"use client";

import { useRef, useState, useEffect } from "react";
import exportAsImage from "../utils/exportAsImage";
import { ChromePicker } from "react-color";
import rgbHex from "rgb-hex";

import Image from "next/image";
import upload from "../public/assets/icons/upload.svg";
import leftJustify from "../public/assets/icons/align-left.svg";
import rightJustify from "../public/assets/icons/align-right.svg";
import centerJustify from "../public/assets/icons/align-center.svg";
import close from "../public/assets/icons/close.svg";
import align from "../public/assets/icons/align.svg";
import palette from "../public/assets/icons/palette.svg";
import borderRadius from "../public/assets/icons/border-radius.svg";

export default function Home() {
  //export image button ref
  const exportRef = useRef();

  //upload image click ref
  const inputRef = useRef(null);

  //upload image state holder from user
  const [image, setImage] = useState(null);
  const [phone, setPhone] = useState(null);
  const [background, setBackground] = useState("rbga(0, 0, 0, 0)");
  const [newImage, setnewImage] = useState(null);
  const [menuSelect, setmenuSelect] = useState(0); //default no show items
  const [menuText, setmenuText] = useState("Select below to edit");

  //iphone stats
  const phoneList = [
    {
      id: "iphone13Default",
      width: "285px",
      height: "617px",
      topWidgets: "162px",
      widgetWidth: "257px",
      widgetHeight: "62px",
      widgetBorderRadius: "13px",
    },
    {
      id: "iphone13Mini",
      width: "1125px",
      height: "2436px",
      topWidgets: "729px",
      widgetWidth: "1000px",
      widgetHeight: "279px",
      widgetBorderRadius: "60px",
    },
    {
      id: "iphone13",
      width: "1170px",
      height: "2532px",
      topWidgets: "729px",
      widgetWidth: "1000px",
      widgetHeight: "279px",
      widgetBorderRadius: "60px",
    },
    {
      id: "iphone13Pro",
      width: "1170px",
      height: "2532px",
      topWidgets: "729px",
      widgetWidth: "1000x",
      widgetHeight: "279px",
      widgetBorderRadius: "60px",
    },
    {
      id: "iphone13ProMax",
      width: "1284px",
      height: "2778px",
      topWidgets: "729px",
      widgetWidth: "1158px",
      widgetHeight: "279px",
      widgetBorderRadius: "60px",
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
    exportWidget.style.borderRadius = phoneList.find(
      (phoneDefault) => phoneDefault.id === "iphone13Default"
    ).widgetBorderRadius;
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
    ).widgetBorderRadius;
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
    <main className=" relative gap-2 overflow-scroll w-screen h-screen flex flex-col items-center justify-start bg-gradient-to-b from-blue-600 to-cyan-600">
      <h1 className=" text-white text-4xl pt-2">Wallpaper Creator</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
        className=" flex flex-col justify-center align-middle p-1"
      >
        <div className=" flex flex-row justify-center align-middle p-1">
          <div
            className="uploadButton w-fit h-fit m-1 p-3 flex flex-row justify-center align-middle rounded-xl bg-emerald-800 text-slate-100"
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
          <input
            className="uploadButton w-fit h-fit m-1 p-3 flex flex-row justify-center align-middle rounded-xl bg-emerald-800 text-slate-100 text-xl font-normal"
            onClick={prepareImage}
            type="submit"
            value={"Download"}
          ></input>
        </div>
        <select
          onChange={handleChangePhone}
          id="phoneSelect"
          defaultValue={""}
          required
        >
          <option value="" disabled>
            Phone Model
          </option>
          <option value="iphone13ProMax">iPhone 13 Pro Max</option>
          <option value="iphone13Pro">iPhone 13 Pro</option>
          <option value="iphone13">iPhone 13</option>
          <option value="iphone13Mini">iPhone 13 Mini</option>
        </select>
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
            <div className="bkg-img" id="output"></div>
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
            className=" absolute top-5 right-5"
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
          <label className="label_item" htmlFor="radio1">
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
          <label className="label_item" htmlFor="radio2">
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
          <label className="label_item" htmlFor="radio3">
            <Image src={borderRadius} alt="Border Radius" />
          </label>
        </div>
        {menuSelect === "Align Image" && (
          <div className=" flex justify-center align-middle flex-row">
            <div onClick={alignClick}>
              <Image id="leftBtn" src={leftJustify} alt="Align image left" />
            </div>
            <div onClick={alignClick}>
              <Image
                id="centerBtn"
                src={centerJustify}
                alt="Align image center"
              />
            </div>
            <div onClick={alignClick}>
              <Image id="rightBtn" src={rightJustify} alt="Align image right" />
            </div>
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
          <div className=" flex justify-center align-middle flex-row">
            Border Radius Selector
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
    </main>
  );
}
