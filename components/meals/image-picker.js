'use client';
import classes from "./image-picker.module.css"
import {useRef, useState} from "react";
import Image from "next/image";

export default function ImagePicker({label, name}) {

    const [imageSet, setImageSet] = useState(null);
    const ref = useRef(null);

    function ClickHandle() {
        ref.current.click();
    }

    function onChangeImage(e) {
        const file = e.currentTarget.files[0];

        if (!file) {
            setImageSet(null)
            return;
        }

        const fileReader = new FileReader();
        fileReader.onload= () => {
            setImageSet(fileReader.result)
        }
        fileReader.readAsDataURL(file);
    }

    return <div className={classes.picker}>
        <label htmlFor={"name"}>{label}</label>
        <div className={classes.controls}>
            <div className={classes.preview}>
                {!imageSet && <p>No image picked yet.</p>}
                {imageSet && <Image src={imageSet} alt={"the image by user"} fill/> }
            </div>

            <input
                className={classes.input}
                type={"file"}
                id={name}
                accept={"image/png, image/jpeg"}
                name={name}
                ref={ref}
                onChange={onChangeImage}
                required
            />
            <button className={classes.button} type={"button"} onClick={ClickHandle}>Pick image</button>
        </div>
    </div>
}