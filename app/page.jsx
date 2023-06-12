"use client";

import { useRef, useState, useEffect } from "react";
import exportAsImage from "../utils/exportAsImage";
import { createElement } from "react";
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
  const [background, setBackground] = useState("#fff");
  const [newImage, setnewImage] = useState(null);

  useEffect(() => {
    console.log("new Image: " + newImage);
  }, [newImage]);

  //iphone stats
  const phoneList = [
    {
      id: "iphone13Default",
      width: "428px",
      height: "926px",
    },
    {
      id: "iphone13ProMax",
      width: "1284px",
      height: "2778px",
    },
  ];

  const handleChangeComplete = (color) => {
    setBackground(color.hex);
    document.getElementById("widgets").style.background = background;
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
    exportImage.style.width = phoneList.find(
      (phoneSelected) => phoneSelected.id === phone
    ).width;
    exportImage.style.height = phoneList.find(
      (phoneSelected) => phoneSelected.id === phone
    ).height;

    ////////////
    //set styles back for UI viewing
    exportImage.style.width = phoneList.find(
      (phoneSelected) => phoneSelected.id === "iphone13Default"
    ).width;
    exportImage.style.height = phoneList.find(
      (phoneSelected) => phoneSelected.id === "iphone13Default"
    ).height;
    //////////

    console.log("1st: " + newImage);

    //save image
    setnewImage(await exportAsImage(exportRef.current, "test"));

    console.log("2nd: " + newImage);

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

  const handleChangePhone = (event) => {
    setPhone((currentPhone) => event.target.value);
  };

  return (
    <main className=" gap-2 w-full h-fit overflow-hidden flex flex-col items-center justify-start bg-gradient-to-b from-blue-600 to-cyan-600">
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
        className=" w-[428px] h-[926px] overflow-hidden relative flex align-middle justify-center rounded-3xl"
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
          <img
            width="200"
            height="200"
            alt=""
            src="/assets/images/iphone13.png"
            className="bkg-img"
          />
        )}
        <div className="widgets" id="widgets"></div>
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
      {newImage ? (
        <img
          width="200"
          height="200"
          alt=""
          src={newImage}
          className="bkg-img"
        />
      ) : (
        <img
          width="200"
          height="200"
          alt=""
          src="/assets/images/iphone13.png"
          className="bkg-img"
        />
      )}
    </main>
  );
}
