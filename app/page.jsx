"use client";

import { useRef, useState, useEffect } from "react";
import exportAsImage from "../utils/exportAsImage";
import { SketchPicker } from "react-color";

import Image from "next/image";
import upload from "../public/assets/icons/upload.svg";

export default function Home() {
  //export image button ref
  const exportRef = useRef();

  //upload image click ref
  const inputRef = useRef(null);

  //upload image state holder from user
  const [image, setImage] = useState(null);
  const [phone, setPhone] = useState(null);
  const [background, setBackground] = useState("");
  const [newImage, setnewImage] = useState(null);

  //iphone stats --NOTE: image dimensions are multiplied by 3 when using dataURL objects
  const phoneList = [
    {
      id: "iphone13Default",
      width: "428px",
      height: "926px",
      topWidgets: "243px",
      widgetWidth: "386px",
      widgetHeight: "93px",
      widgetBorderRadius: "20px",
    },
    {
      id: "iphone13ProMax",
      width: "428px", //"1284px"
      height: "926px", // "2778px"
      topWidgets: "243px",
      widgetWidth: "386px",
      widgetHeight: "93px",
      widgetBorderRadius: "20px",
    },
  ];

  //set initial scale of preview phone on load
  useEffect(() => {
    const exportImage = document.getElementById("exportImage");
    exportImage.style.width = phoneList.find(
      (phoneSelected) => phoneSelected.id === "iphone13Default"
    ).width;
    exportImage.style.height = phoneList.find(
      (phoneSelected) => phoneSelected.id === "iphone13Default"
    ).height;
  });

  useEffect(() => {
    document.getElementById("widgets").style.background = background;
  }, [background]);

  const handleChangeComplete = (color) => {
    setBackground(color.hex);
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

    console.log("width:" + exportImage.style.width);

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
    document.getElementById("designBoxBottom").style.visibility = "visible";
  };

  const closeDesignBoxBottom = () => {
    document.getElementById("designBoxBottom").style.visibility = "hidden";
  };

  //-----------------------RETURN----------------------------//

  return (
    <main className=" relative gap-2 w-full h-fit overflow-hidden flex flex-col items-center justify-start bg-gradient-to-b from-blue-600 to-cyan-600">
      <h1>Wallpaper Creator</h1>
      <div
        className="uploadButton w-fit h-fit p-3 flex flex-row justify-center align-middle rounded-xl bg-emerald-800 text-slate-100 font-bold font-large"
        onClick={handleUploadClick}
      >
        <Image
          className="uploadImage"
          priority
          src={upload}
          alt="Upload an image"
        />
        <h3 className=" text-4xl font-normal">Upload</h3>
        <input
          type="file"
          onChange={onImageChange}
          className="filetype"
          ref={inputRef}
          style={{ display: "none" }}
        />
      </div>
      <div
        ref={exportRef}
        id="exportImage"
        className="buildImage w-[428px] h-[926px] overflow-hidden relative flex align-middle justify-center rounded-3xl"
      >
        {image ? (
          <div
            style={{
              backgroundImage: `url(${URL.createObjectURL(image)})`,
              width: "100%",
              height: "100%",
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
        <div className="widgets" id="widgets" onClick={openDesignBottom}></div>
      </div>
      <button onClick={prepareImage}>Capture Image</button>
      <select
        onChange={handleChangePhone}
        id="phoneSelect"
        defaultValue={"select"}
      >
        <option value="select" disabled>
          Choose here
        </option>
        <option value="13reg">iPhone 13</option>
        <option value="13pro">iPhone 13 Pro</option>
        <option value="iphone13ProMax">iPhone 13 Pro Max</option>
      </select>

      {/* Design Menu to open up bottom up or top down for elements */}
      <div className="designBoxBottom" id="designBoxBottom">
        <div className=" flex flex-row align-middle justify-between">
          <div>Menu Area</div>
          <div id="closeDesignBoxBottom" onClick={closeDesignBoxBottom}>
            Close
          </div>
        </div>
        <div className=" flex justify-center align-middle flex-col">
          <button id="leftBtn" onClick={alignClick}>
            Left
          </button>
          <button id="centerBtn" onClick={alignClick}>
            Center
          </button>
          <button id="rightBtn" onClick={alignClick}>
            Right
          </button>
          <SketchPicker
            color={background}
            onChangeComplete={handleChangeComplete}
          />
        </div>
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
        <div>Modals</div>
        <button data-close-modal onClick={closeHelpModal}>
          Close
        </button>
      </dialog>
    </main>
  );
}
